import { readFormUseCase } from '@kurocado-studio/formkit-ui-store';
import { useCallback } from 'react';

import { usePanelsContext } from '@/app/context/PanelsContext';
import type { UseReadForm } from '@/domains/form/domain/types';
import {
  useFormKitStore,
  useFormKitStoreApi,
} from '@/processes/form-designer/state/useFormKitStore';
import { PanelsViewsEnum } from '@/shared/contracts/enums';

export const useReadForm: UseReadForm = () => {
  const formKitStoreApi = useFormKitStoreApi();
  const handleSetQuestionToBeEdited = useFormKitStore(
    (state) => state.handleSetQuestionToBeEdited,
  );
  const handleSetFormBeingEdited = useFormKitStore(
    (state) => state.handleSetFormBeingEdited,
  );
  const { handleToggleOffStateExceptFor } = usePanelsContext();

  const { FORM_CONFIGURATION } = PanelsViewsEnum;

  const { handleReadForm } = readFormUseCase({
    formikStore: formKitStoreApi,
  });

  const executeReadForm = useCallback(
    async (
      payload: Parameters<ReturnType<UseReadForm>['handleReadForm']>[0],
    ) => {
      handleReadForm(payload);
      handleSetQuestionToBeEdited({ id: undefined });
      handleSetFormBeingEdited({ id: payload.id });
      handleToggleOffStateExceptFor([FORM_CONFIGURATION]);
    },
    [
      handleReadForm,
      handleSetQuestionToBeEdited,
      handleSetFormBeingEdited,
      handleToggleOffStateExceptFor,
    ],
  );

  return { handleReadForm: executeReadForm };
};
