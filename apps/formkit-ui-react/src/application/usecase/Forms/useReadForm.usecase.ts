import { formKitStore, readFormByIdUseCase } from '@kurocado-studio/formkit-ui';

import { useFormDesignerContext } from '../../../context/FormDesignerContext';
import { usePanelsAndModalsContext } from '../../../context/PanelsAndModalsContext';
import {
  FormDesignerPanelsEnum,
  ModalsAndPanelsViewsEnum,
} from '../../../enums';
import type { UseReadFormUseCase } from '../../../types';

export const useReadFormUseCase: UseReadFormUseCase = () => {
  const { handlePanelsAndModalsState } = usePanelsAndModalsContext();
  const { handleFormDesignerState } = useFormDesignerContext();

  const { FORM_DESIGNER_PANEL } = ModalsAndPanelsViewsEnum;
  const { FORM } = FormDesignerPanelsEnum;

  const payload = readFormByIdUseCase({ store: formKitStore });

  const handleReadForm: ReturnType<UseReadFormUseCase>['handleReadForm'] = ({
    id,
    shouldOpenFormDesignerPanel,
  }) => {
    payload.handleReadForm({ id, shouldOpenFormDesignerPanel });
    handleFormDesignerState(FORM);

    if (shouldOpenFormDesignerPanel) {
      handlePanelsAndModalsState(FORM_DESIGNER_PANEL);
    }
  };

  return { handleReadForm };
};
