import {
  createQuestionUseCase,
} from '@kurocado-studio/formkit-ui-store';
import { useCallback } from 'react';

import type { UseCreateQuestion, QuestionCreatorPayload } from '@/domains/question/domain/types';
import { useFormKitStoreApi } from '@/processes/form-designer/state/useFormKitStore';
import { axiosFormKitInstance } from '@/shared/infrastructure/axiosFormKitInstance';
import { scrollToElement } from '@/shared/utils/scrollToElement';

export const useCreateQuestion: UseCreateQuestion = () => {
  const formKitStoreApi = useFormKitStoreApi();

  const { handleCreateQuestion } = createQuestionUseCase({
    formikStore: formKitStoreApi,
    axiosInstance: axiosFormKitInstance,
  });

  const createQuestionHandler: typeof handleCreateQuestion = useCallback(
    async (payload: QuestionCreatorPayload) => {
      const question = await handleCreateQuestion(payload);
      scrollToElement(question.id);
      return question;
    },
    [handleCreateQuestion],
  );

  return { handleCreateQuestion: createQuestionHandler };
};
