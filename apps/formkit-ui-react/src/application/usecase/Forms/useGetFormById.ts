import { formKitStore, getFormByIdUseCase } from '@kurocado-studio/formkit-ui';
import React from 'react';

import { axiosFormKitInstance } from '../../../config/axiosFormKitInstance';
import { KUROCADO_STUDIO_ORGANIZATION_ID_FORMKIT } from '../../../config/constants';

export const useGetFormById = () => {
  const { executeGetFormById } = React.useMemo(
    () =>
      getFormByIdUseCase({
        store: formKitStore,
        httpClient: axiosFormKitInstance,
        organizationId: KUROCADO_STUDIO_ORGANIZATION_ID_FORMKIT,
      }),
    [],
  );

  return { executeGetFormById };
};
