import { useAxios } from '@kurocado-studio/axios-react';
import type { Form } from '@kurocado-studio/formkit-ui-models';
import {
  type LoadFormPayload,
  formKitService,
} from '@kurocado-studio/formkit-ui-store';
import React from 'react';

import { axiosFormKitInstance } from '@/shared/infrastructure/axiosFormKitInstance';
import type { UseGetFormById } from '@/domains/form/domain/types';
import { useFormKitStore } from '@/processes/form-designer/state/useFormKitStore';

export const useGetFormById: UseGetFormById = () => {
  const formikStore = useFormKitStore((state) => state);

  const [{ resetState, isLoading, error }, axiosHandler] = useAxios<Form>({
    axiosInstance: axiosFormKitInstance,
  });

  const { handleLoadForm } = formKitService({
    formikStore,
  });

  React.useEffect(() => {
    formikStore.handleUpdateFormsStoreApiState(
      { isLoading, error },
      'getFormByIdState',
    );
  }, [formikStore.handleUpdateFormsStoreApiState, error, isLoading]);

  const handleGetForm: (payload: LoadFormPayload) => Promise<Form> = async (
    payload,
  ) => {
    resetState();
    return handleLoadForm(payload, axiosHandler);
  };

  return { handleGetForm };
};
