import { ReactTestingLibrary } from '@kurocado-studio/qa';
import { formKitStore } from '@kurocado-studio/formkit-ui';

import { useUpdateFormUseCase } from './useUpdateForm.usecase';

const { act, renderHook } = ReactTestingLibrary;

describe('useUpdateFormUseCase', () => {
  const handleUpdateFormsNodeTree = vi.fn();
  const composePaths = vi.fn();

  const initialFormsNodeTree = {
    form1: {
      id: 'form1',
      title: 'Old Title',
      sections: {},
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();

    vi.spyOn(formKitStore, 'getState').mockReturnValue({
      formsNodeTree: initialFormsNodeTree,
      composePaths: composePaths,
      handleUpdateFormsNodeTree,
    } as unknown as ReturnType<typeof formKitStore.getState>);
  });

  it('updates form properties correctly', () => {
    composePaths.mockReturnValue({ toCurrentForm: 'form1' });

    const { result } = renderHook(() => useUpdateFormUseCase());

    act(() => {
      result.current.executeUpdateForm({
        updatedProperties: { title: 'New Title' },
      });
    });

    expect(handleUpdateFormsNodeTree).toHaveBeenCalledWith({
      form1: {
        id: 'form1',
        title: 'New Title',
        sections: {},
      },
    });
  });

  it('does nothing if the form is not found', () => {
    composePaths.mockReturnValue({ toCurrentForm: 'nonExistentForm' });

    const { result } = renderHook(() => useUpdateFormUseCase());

    act(() => {
      result.current.executeUpdateForm({
        updatedProperties: { title: 'New Title' },
      });
    });

    expect(handleUpdateFormsNodeTree).not.toHaveBeenCalled();
  });

  it('updates multiple properties at once', () => {
    composePaths.mockReturnValue({ toCurrentForm: 'form1' });

    const { result } = renderHook(() => useUpdateFormUseCase());

    act(() => {
      result.current.executeUpdateForm({
        updatedProperties: { title: 'Updated', createdAt: '2025-01-01' },
      });
    });

    expect(handleUpdateFormsNodeTree).toHaveBeenCalledWith({
      form1: {
        id: 'form1',
        title: 'Updated',
        createdAt: '2025-01-01',
        sections: {},
      },
    });
  });
});
