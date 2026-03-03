 
import { Question } from '@kurocado-studio/formkit-ui-react-renderer';
import { useCallback } from 'react';

import { usePanelsContext } from '@/app/context/PanelsContext.tsx';
import { useCreateForm } from '@/domains/form/application/hooks/useCreateForm.ts';
import { useReadForm } from '@/domains/form/application/hooks/useReadForm';
import { useUpdateForm } from '@/domains/form/application/hooks/useUpdateForm';
import { useReadQuestion } from '@/domains/question/application/hooks/useReadQuestion';
import { useUpdateQuestion } from '@/domains/question/application/hooks/useUpdateQuestion';
import { PanelsViewsEnum } from '@/shared/contracts/enums.ts';

export const useFormKitService = () => {
  const { handleToggleOffStateExceptFor } = usePanelsContext();
  const readForm = useReadForm();
  const createForm = useCreateForm();
  const readQuestion = useReadQuestion();
  const updateQuestion = useUpdateQuestion();
  const updateForm = useUpdateForm();

  const handleReadQuestion = readQuestion.handleReadQuestion;
  const handleCreateForm = createForm.handleCreateForm;
  const handleReadForm = readForm.handleReadForm;
  const handleUpdateQuestion = updateQuestion.handleUpdateQuestion;
  const handleUpdateForm = updateForm.handleUpdateForm;

  const handleConfigureQuestionVariant = useCallback(
    ({ question }: { question: Question }) => {
      handleReadQuestion({ question });
      handleToggleOffStateExceptFor([
        PanelsViewsEnum.QUESTION_CONFIGURATION,
        PanelsViewsEnum.VARIANT_CONFIGURATION,
      ]);
    },
    [handleReadQuestion, handleToggleOffStateExceptFor],
  );

  return {
    handleConfigureQuestionVariant,
    handleUpdateForm,
    handleUpdateQuestion,
    handleCreateForm,
    handleReadQuestion,
    handleReadForm,
  };
};
