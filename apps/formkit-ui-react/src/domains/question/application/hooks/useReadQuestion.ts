import { readQuestionUseCase } from '@kurocado-studio/formkit-ui-store';

import { usePanelsContext } from '@/app/context/PanelsContext.tsx';
import type { UseReadQuestion } from '@/domains/question/domain/types';
import { useFormKitStoreApi } from '@/processes/form-designer/state/useFormKitStore';
import { PanelsViewsEnum } from '@/shared/contracts/enums';
import { scrollToElement } from '@/shared/utils/scrollToElement';

export const useReadQuestion: UseReadQuestion = () => {
  const formKitStoreApi = useFormKitStoreApi();
  const { handleToggleOffStateExceptFor } = usePanelsContext();
  const { handleReadQuestion } = readQuestionUseCase({
    formikStore: formKitStoreApi,
  });

  const readQuestionHandler: ReturnType<UseReadQuestion>['handleReadQuestion'] =
    (payload) => {
      handleReadQuestion(payload);

      const questionIdBeingEdited =
        formKitStoreApi.getState().questionIdBeingEdited;

      scrollToElement(questionIdBeingEdited);
      handleToggleOffStateExceptFor([PanelsViewsEnum.QUESTION_CONFIGURATION]);
    };

  return { handleReadQuestion: readQuestionHandler };
};
