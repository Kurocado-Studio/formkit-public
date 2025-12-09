import { get } from 'lodash-es';

import { EMPTY_FORM_NODE } from '../../constants';
import {
  FormByIdGetterUseCase,
  FormByIdGetterUseCaseApi,
} from '../../types';

export const getFormById: FormByIdGetterUseCase = ({
  store,
  httpClient,
  organizationId,
}) => {
  const {
    handleUpdateFormsStoreApiState,
    handleComposeFormsNodeTree,
    handleSetFormBeingEdited,
    handleUpdateSectionBeingEdited,
  } = store;

  const handleGetFormById: FormByIdGetterUseCaseApi['handleGetFormById'] =
    async ({ id }) => {
      handleUpdateFormsStoreApiState(
        { isLoading: true, error: undefined },
        'getFormByIdState',
      );

      try {
        const { data } = await httpClient({
          url: `/api/v1/organizations/${organizationId}/forms/${id}`,
          method: 'GET',
        });

        handleComposeFormsNodeTree({ forms: [data] });
        handleSetFormBeingEdited({ id: data.id });
        handleUpdateSectionBeingEdited({
          id: get(data, ['sections', 0, 'id']),
        });

        handleUpdateFormsStoreApiState(
          { isLoading: false, error: undefined },
          'getFormByIdState',
        );
        return data;
      } catch (error) {
        handleUpdateFormsStoreApiState(
          { isLoading: false, error },
          'getFormByIdState',
        );
        return EMPTY_FORM_NODE;
      }
    };

  return { handleGetFormById };
};
