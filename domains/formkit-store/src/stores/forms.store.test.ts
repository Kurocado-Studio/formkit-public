import { VariantEnum } from '@kurocado-studio/formkit-ui-models';
import { type Form, type Question } from '@kurocado-studio/formkit-ui-models';
import { get } from 'lodash-es';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { composeFormsNodeTree } from '../composeFormsNodeTree';
import { DEFAULT_API_STATE, EMPTY_NODE_TREE } from '../constants';
import { type FormKitStoreApi, createFormKitStore } from '../exports';
import type { FormsNodeTree } from '../types';

vi.mock('../composeFormsNodeTree', () => ({
  composeFormsNodeTree: vi.fn(),
}));

describe('formsStore', () => {
  let store: FormKitStoreApi;

  beforeEach(() => {
    vi.clearAllMocks();
    store = createFormKitStore();
  });

  it('should initialize with default values', () => {
    const state = store.getState();

    expect(state.formIdBeingEdited).toBeUndefined();
    expect(state.getFormByIdState).toEqual(DEFAULT_API_STATE);
    expect(state.formsNodeTree).toEqual(EMPTY_NODE_TREE);
  });

  it('should handle setting formBeingEdited', () => {
    store.getState().handleSetFormBeingEdited({ id: 'form123' });

    expect(store.getState().formIdBeingEdited).toBe('form123');
  });

  it('should update FormsStore API state correctly', () => {
    const newApiState = { isLoading: true, error: undefined };

    store
      .getState()
      .handleUpdateFormsStoreApiState(newApiState, 'getFormByIdState');

    expect(store.getState().getFormByIdState).toEqual(newApiState);
  });

  it('should compose formsNodeTree correctly', () => {
    const fakeForms = [{ id: '1' }, { id: '2' }] as Array<Form>;

    store.getState().handleComposeFormsNodeTree({ forms: fakeForms });

    expect(composeFormsNodeTree).toHaveBeenCalledWith(fakeForms);
  });

  it('should update formsNodeTree directly', () => {
    const newTree = { form1: { sections: {} } };
    store.getState().handleUpdateFormsNodeTree(newTree);

    expect(store.getState().formsNodeTree).toEqual(newTree);
  });

  it('should add question to form using composePaths()', () => {
    const question: Question = {
      description: '',
      hidden: false,
      question: '',
      required: false,
      variant: VariantEnum.TEXT,
      variants: {},
      id: 'q1',
      label: 'Question 1',
    };

    const fakePath = ['form1', 'sections', 'section1', 'questions'];
    const formsNodeTree = {
      form1: {
        sections: {
          section1: {
            questions: {},
          },
        },
      },
    } as unknown as FormsNodeTree;

    store.setState({
      formIdBeingEdited: 'form1',
      sectionIdBeingEdited: 'section1',
    });
    store.setState({ formsNodeTree });

    // Act
    store.getState().handleAddQuestionToForm({ question });

    // Assert
    const updatedTree = store.getState().formsNodeTree;
    const questions = get(updatedTree, fakePath);

    expect(questions).toHaveProperty('q1');
    expect(questions['q1']).toEqual(question);
  });
});
