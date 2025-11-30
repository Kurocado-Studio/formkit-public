import { ReactTestingLibrary } from '@kurocado-studio/qa';
import { formKitStore } from '@kurocado-studio/formkit-ui';
import { get } from 'lodash-es';

import { useUpdateQuestionUseCase } from './useUpdateQuestion.usecase';

const { act, renderHook } = ReactTestingLibrary;

describe('useUpdateQuestionUseCase', () => {
  const handleUpdateFormsNodeTree = vi.fn();

  const initialNodeTree = {
    form1: {
      sections: {
        section1: {
          questions: {
            q1: {
              id: 'q1',
              title: 'Original Title',
              description: 'Original description',
            },
          },
        },
      },
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();

    vi.spyOn(formKitStore, 'getState').mockReturnValue({
      formsNodeTree: initialNodeTree,
      handleUpdateFormsNodeTree,
      composePaths: () => ({
        toCurrentQuestion: ['form1', 'sections', 'section1', 'questions', 'q1'],
      }),
    } as unknown as ReturnType<typeof formKitStore.getState>);
  });

  it('should update question properties in formsNodeTree', () => {
    const { result } = renderHook(() => useUpdateQuestionUseCase());

    const updatedProperties = {
      title: 'Updated Title',
      description: 'Updated description',
    };

    act(() => {
      result.current.executeUpdateQuestion({
        updatedQuestionProperties: updatedProperties,
      });
    });

    expect(handleUpdateFormsNodeTree).toHaveBeenCalledTimes(1);

    const updatedNodeTree = get(handleUpdateFormsNodeTree, [
      'mock',
      'calls',
      0,
      0,
    ]);
    const updatedQuestion = get(
      updatedNodeTree,
      'form1.sections.section1.Questions.q1',
    );

    expect(updatedQuestion).toEqual({
      id: 'q1',
      title: 'Updated Title',
      description: 'Updated description',
    });
  });

  it('should not call handleUpdateFormsNodeTree if current question is undefined', () => {
    vi.spyOn(formKitStore, 'getState').mockReturnValue({
      formsNodeTree: initialNodeTree,
      handleUpdateFormsNodeTree,
      composePaths: () => ({
        toCurrentQuestion: ['form1', 'sections', 'section1', 'questions', 'q2'],
      }),
    } as unknown as ReturnType<typeof formKitStore.getState>);

    const { result } = renderHook(() => useUpdateQuestionUseCase());

    act(() => {
      result.current.executeUpdateQuestion({
        updatedQuestionProperties: { title: 'Won’t update' },
      });
    });

    expect(handleUpdateFormsNodeTree).not.toHaveBeenCalled();
  });
});
