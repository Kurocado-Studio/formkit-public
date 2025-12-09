import type { ReadFormDependencies, ReadFormPayload } from '../../types';

export const readFormByIdUseCase = ({ store }: ReadFormDependencies) => {
  const handleReadForm = ({ id }: ReadFormPayload) => {
    if (id === undefined) return;

    const { handleSetQuestionToBeEdited, handleSetFormBeingEdited } =
      store.getState();

    handleSetQuestionToBeEdited({ id: undefined });
    handleSetFormBeingEdited({ id });
  };

  return { handleReadForm };
};
