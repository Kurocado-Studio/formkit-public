import { updateQuestionUseCase } from '@kurocado-studio/formkit-ui-store';

import type {
  TextFieldNodeUpdaterSchema,
  UseUpdateQuestion,
} from '@/domains/question/domain/types';
import { useFormKitStoreApi } from '@/processes/form-designer/state/useFormKitStore';

export const useUpdateQuestion: UseUpdateQuestion = () => {
  const formKitStoreApi = useFormKitStoreApi();

  const { handleUpdateQuestion } = updateQuestionUseCase({
    formikStore: formKitStoreApi,
  });

  const executeUpdateQuestion: ReturnType<UseUpdateQuestion>['handleUpdateQuestion'] =
    handleUpdateQuestion as (payload: {
      updatedQuestionProperties: TextFieldNodeUpdaterSchema;
    }) => void;

  return { handleUpdateQuestion: executeUpdateQuestion };
};
