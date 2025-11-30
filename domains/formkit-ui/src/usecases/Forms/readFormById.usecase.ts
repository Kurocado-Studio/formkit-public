import type { ReadFormDependencies, ReadFormPayload } from '../../types';

export const readFormByIdUseCase = ({ store }: ReadFormDependencies) => {
  const executeReadForm = ({ id }: ReadFormPayload) => {
    if (id === undefined) return;

    const { handleSetQuestionToBeEdited, handleSetFormBeingEdited } =
      store.getState();

    handleSetQuestionToBeEdited({ id: undefined });
    handleSetFormBeingEdited({ id });
  };

  return { executeReadForm };
};
