import { createFormUseCase } from '@kurocado-studio/formkit-ui-store';
import { useCallback, useMemo } from 'react';

import { useReadForm } from '@/domains/form/application/hooks/useReadForm';
import type { UseCreateForm } from '@/domains/form/domain/types';
import { useFormKitStoreApi } from '@/processes/form-designer/state/useFormKitStore';

export const useCreateForm: UseCreateForm = () => {
  const formKitStoreApi = useFormKitStoreApi();

  const { handleCreateForm } = useMemo(
    () => createFormUseCase({ formikStore: formKitStoreApi }),
    [formKitStoreApi],
  );
  const { handleReadForm } = useReadForm();

  const composeCreateForm: ReturnType<UseCreateForm>['handleCreateForm'] =
    useCallback(() => {
      handleCreateForm();
      const { formIdBeingEdited } = formKitStoreApi.getState();

      handleReadForm({ id: formIdBeingEdited });
    }, [handleReadForm, formKitStoreApi, handleCreateForm]);

  return { handleCreateForm: composeCreateForm };
};
