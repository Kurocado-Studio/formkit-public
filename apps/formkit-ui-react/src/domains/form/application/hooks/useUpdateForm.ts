import { updateFormUseCase } from '@kurocado-studio/formkit-ui-store';

import type { UseUpdateForm } from '@/domains/form/domain/types';
import { useFormKitStore } from '@/processes/form-designer/state/useFormKitStore';

export const useUpdateForm: UseUpdateForm = () => {
  const { formsNodeTree, composePaths, handleUpdateFormsNodeTree } =
    useFormKitStore();

  const { handleUpdateForm } = updateFormUseCase({
    formikStore: { formsNodeTree, composePaths, handleUpdateFormsNodeTree },
  });

  const executeUpdateForm: ReturnType<UseUpdateForm>['handleUpdateForm'] =
    handleUpdateForm;

  return { handleUpdateForm: executeUpdateForm };
};
