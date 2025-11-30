import { createUpdateQuestionUseCase, formKitStore } from '@kurocado-studio/formkit-ui';

import type { TextFieldNodeUpdaterSchema } from '../../../types';

export type UseUpdateQuestionUseCase = () => {
  executeUpdateQuestion: (payload: {
    updatedQuestionProperties: TextFieldNodeUpdaterSchema;
  }) => void;
};

export const useUpdateQuestionUseCase: UseUpdateQuestionUseCase = () => {
  const { executeUpdateQuestion } = createUpdateQuestionUseCase({
    store: formKitStore,
  });

  return { executeUpdateQuestion };
};
