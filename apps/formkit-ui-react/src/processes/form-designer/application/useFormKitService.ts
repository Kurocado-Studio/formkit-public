import { useCreateForm } from '@/domains/form/application/hooks/useCreateForm.ts';
import { useGetFormById } from '@/domains/form/application/hooks/useGetFormById';
import { useReadForm } from '@/domains/form/application/hooks/useReadForm';
import { useUpdateForm } from '@/domains/form/application/hooks/useUpdateForm';
import { useReadQuestion } from '@/domains/question/application/hooks/useReadQuestion';
import { useUpdateQuestion } from '@/domains/question/application/hooks/useUpdateQuestion';

export const useFormKitService = () => {
  const getFormById = useGetFormById();
  const readForm = useReadForm();
  const createForm = useCreateForm();
  const readQuestion = useReadQuestion();
  const updateQuestion = useUpdateQuestion();
  const updateForm = useUpdateForm();

  const handleReadQuestion = readQuestion.handleReadQuestion;
  const handleCreateForm = createForm.handleCreateForm;
  const handleReadForm = readForm.handleReadForm;
  const handleGetForm = getFormById.handleGetForm;
  const handleUpdateQuestion = updateQuestion.handleUpdateQuestion;
  const handleUpdateForm = updateForm.handleUpdateForm;

  return {
    handleUpdateForm,
    handleUpdateQuestion,
    handleCreateForm,
    handleGetForm,
    handleReadQuestion,
    handleReadForm,
  };
};
