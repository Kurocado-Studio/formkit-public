import { updateFormUseCase } from '@kurocado-studio/formkit-ui-store';

import type { UseUpdateForm } from '@/domains/form/domain/types';
import { useFormKitStoreApi } from '@/processes/form-designer/state/useFormKitStore';

export const useUpdateForm: UseUpdateForm = () => {
  const formKitStoreApi = useFormKitStoreApi();

  const { handleUpdateForm } = updateFormUseCase({
    formikStore: formKitStoreApi,
  });

  const executeUpdateForm: ReturnType<UseUpdateForm>['handleUpdateForm'] =
    handleUpdateForm;

  return { handleUpdateForm: executeUpdateForm };
};
