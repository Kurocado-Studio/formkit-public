import { get, set } from 'lodash-es';

import type {
  UpdateQuestionDependencies,
  UpdateQuestionPayload,
} from '../../types';

export const createUpdateQuestionUseCase = ({
  store,
}: UpdateQuestionDependencies) => {
  const executeUpdateQuestion = ({
    updatedQuestionProperties,
  }: UpdateQuestionPayload) => {
    const { formsNodeTree, handleUpdateFormsNodeTree, composePaths } =
      store.getState();

    const { toCurrentQuestion } = composePaths();
    const nodeTree = { ...formsNodeTree };

    const currentQuestion = get(nodeTree, toCurrentQuestion);

    if (currentQuestion === undefined) return;

    for (const [key, value] of Object.entries(updatedQuestionProperties)) {
      set(currentQuestion, [key], value);
    }

    set(nodeTree, toCurrentQuestion, currentQuestion);
    handleUpdateFormsNodeTree(nodeTree);
  };

  return { executeUpdateQuestion };
};
