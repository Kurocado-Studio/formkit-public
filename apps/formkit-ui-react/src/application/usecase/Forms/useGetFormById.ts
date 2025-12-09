import { getFormById } from '@kurocado-studio/formkit-ui';
import React from 'react';

import { axiosFormKitInstance } from '../../../config/axiosFormKitInstance';
import { KUROCADO_STUDIO_ORGANIZATION_ID_FORMKIT } from '../../../config/constants';
import { useFormKitStore } from '../../useFormikStore';

export const useGetFormById = () => {
  const store = useFormKitStore();

  const { handleGetFormById } = React.useMemo(
    () =>
      getFormById({
        store,
        httpClient: axiosFormKitInstance,
        organizationId: KUROCADO_STUDIO_ORGANIZATION_ID_FORMKIT,
      }),
    [],
  );

  return { handleGetFormById };
};
