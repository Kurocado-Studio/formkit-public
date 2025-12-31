import { get, set } from 'lodash-es';

import { DEFAULT_API_STATE } from '../../domain/constants.ts';
import type {
  QuestionStoreApiNames,
  QuestionsStore,
  StoreCreator,
} from '../../domain/types.ts';

export const questionsStore: StoreCreator<QuestionsStore> = (setState) => {
  return {
    questionIdBeingEdited: undefined,
    createQuestionState: DEFAULT_API_STATE,
    handleSetQuestionToBeEdited: ({ id }) => {
      setState({ questionIdBeingEdited: id });
    },
    handleUpdateQuestionsStoreApiState: (payload, name) => {
      const questionStoreApiMap: Record<QuestionStoreApiNames, string> = {
        createQuestionState: 'createQuestionState',
      };

      setState((previousState) => {
        const updatedQuestionsStore = { ...previousState };
        const apiStateSelected = get(questionStoreApiMap, [name]);

        set(updatedQuestionsStore, [apiStateSelected], payload);

        return updatedQuestionsStore;
      });
    },
  };
};
