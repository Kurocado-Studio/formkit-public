import {
  createReadQuestionUseCase,
  formKitStore,
} from '@kurocado-studio/formkit-ui';
import { useWindowSize } from '@kurocado-studio/react-utils';
import { get } from 'lodash-es';

import { VIEWPORT_WIDTH_TO_TRIGGER_MOBILE_PANEL } from '../../../config/constants';
import { useFormDesignerContext } from '../../../context/FormDesignerContext';
import { usePanelsAndModalsContext } from '../../../context/PanelsAndModalsContext';
import {
  FormDesignerPanelsEnum,
  ModalsAndPanelsViewsEnum,
} from '../../../enums';
import type { UseReadQuestionUseCase } from '../../../types';

export const useReadQuestionUseCase: UseReadQuestionUseCase = () => {
  const { handlePanelsAndModalsState } = usePanelsAndModalsContext();
  const { handleFormDesignerState } = useFormDesignerContext();
  const { FORM_DESIGNER_PANEL } = ModalsAndPanelsViewsEnum;
  const { QUESTION } = FormDesignerPanelsEnum;
  const { size } = useWindowSize();

  const shouldTriggerMobilePanel =
    size.innerWidth < VIEWPORT_WIDTH_TO_TRIGGER_MOBILE_PANEL;

  const { executeReadQuestion } = createReadQuestionUseCase({
    store: formKitStore,
    onOpenDesigner: () => handleFormDesignerState(QUESTION),
    onOpenPanels: shouldTriggerMobilePanel
      ? () => handlePanelsAndModalsState(FORM_DESIGNER_PANEL)
      : undefined,
  });

  const executeReadQuestionWithUi: ReturnType<UseReadQuestionUseCase>['executeReadQuestion'] =
    (payload) => {
      const id = get(payload, ['question', 'id']);

      executeReadQuestion({
        // @ts-expect-error narrowing question type
        question: { ...payload.question, id },
      });
    };

  return { executeReadQuestion: executeReadQuestionWithUi };
};
