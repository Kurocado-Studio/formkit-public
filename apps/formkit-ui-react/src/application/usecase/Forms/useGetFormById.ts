import { useAxios } from '@kurocado-studio/axios-react';
import {
  type Form,
  type FormkitServiceApi,
  formKitService,
} from '@kurocado-studio/formkit';
import React from 'react';

import { axiosFormKitInstance } from '../../../config/axiosFormKitInstance';
import type { UseGetFormById } from '../../../types';
import { useFormKitStore } from '../../useFormikStore';

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

  const handleGetForm: FormkitServiceApi['handleLoadForm'] = async (
    payload,
  ) => {
    resetState();
    return handleLoadForm(payload, axiosHandler);
  };

  return { handleGetForm };
};
