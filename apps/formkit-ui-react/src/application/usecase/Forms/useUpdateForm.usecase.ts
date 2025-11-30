import { updateFormByIdUseCase, formKitStore } from '@kurocado-studio/formkit-ui';

import { UseUpdateFormUseCase } from '../../../types';

export const useUpdateFormUseCase: UseUpdateFormUseCase = () => {
  const { executeUpdateForm } = updateFormByIdUseCase({
    store: formKitStore,
  });

  return { executeUpdateForm };
};
