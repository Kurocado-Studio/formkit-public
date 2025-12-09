import { useGetFormById } from './usecase/Forms/useGetFormById';
import { useReadFormUseCase } from './usecase/Forms/useReadForm.usecase';
import { useUpdateFormUseCase } from './usecase/Forms/useUpdateForm.usecase';
import { useCreateTextFieldQuestionUseCase } from './usecase/Questions/useCreateQuestion.usecase';
import { useReadQuestionUseCase } from './usecase/Questions/useReadQuestion.usecase';
import { useUpdateQuestionUseCase } from './usecase/Questions/useUpdateQuestion.usecase';

export const useFormKitService = () => {
  const { handleGetFormById } = useGetFormById();
  const { handleReadForm } = useReadFormUseCase();
  const { executeReadQuestion } = useReadQuestionUseCase();
  const { executeUpdateQuestion } = useUpdateQuestionUseCase();
  const { executeUpdateForm } = useUpdateFormUseCase();
  const { executeCreateTextFieldQuestion } =
    useCreateTextFieldQuestionUseCase();

  return {
    executeUpdateForm,
    executeUpdateQuestion,
    executeReadQuestion,
    handleGetFormById,
    executeCreateTextFieldQuestion,
    handleReadForm,
  };
};
