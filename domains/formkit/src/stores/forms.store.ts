import type { Question } from '@kurocado-studio/formkit-ui-models';
import { get, set } from 'lodash-es';

import { composeFormsNodeTree } from '../composeFormsNodeTree';
import { DEFAULT_API_STATE, EMPTY_NODE_TREE } from '../constants';
import type { FormsStore, FormsStoreApiNames, StoreCreator } from '../types';

export const formsStore: StoreCreator<FormsStore> = (setState, getState) => {
  return {
    getFormByIdState: DEFAULT_API_STATE,
    formIdBeingEdited: undefined,
    formsNodeTree: EMPTY_NODE_TREE,
    handleSetFormBeingEdited: ({ id }) => {
      setState({ formIdBeingEdited: id });
    },
    handleUpdateFormsStoreApiState: (payload, name) => {
      const formsStoreApiMap: Record<FormsStoreApiNames, string> = {
        getFormByIdState: 'getFormByIdState',
      };

      const apiStateSelected = get(formsStoreApiMap, [name]);
      setState({ [apiStateSelected]: payload });
    },
    handleComposeFormsNodeTree: ({ forms }) => {
      setState({ formsNodeTree: composeFormsNodeTree(forms) });
    },
    handleUpdateFormsNodeTree: (formsNodeTree) => {
      setState({ formsNodeTree });
    },
    handleAddQuestionToForm: (payload: { question: Question }) => {
      // @ts-expect-error for now why we test
      const { toQuestions } = getState().composePaths();
      const { question } = payload;
      const formsNodeTree = { ...getState().formsNodeTree };

      const currentQuestions = get(formsNodeTree, toQuestions, {});

      set(formsNodeTree, toQuestions, {
        ...currentQuestions,
        [question.id]: question,
      });

      setState({ formsNodeTree });
    },
  };
};
