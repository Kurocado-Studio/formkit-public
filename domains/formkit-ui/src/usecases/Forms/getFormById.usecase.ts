import { get } from 'lodash-es';

import type { GetFormByIdDependencies, GetFormByIdPayload } from '../../types';

export const getFormByIdUseCase = ({
  store,
  httpClient,
  organizationId,
}: GetFormByIdDependencies) => {
  const executeGetFormById = async ({
    id,
  }: GetFormByIdPayload): Promise<unknown> => {
    const {
      handleUpdateFormsStoreApiState,
      handleComposeFormsNodeTree,
      handleSetFormBeingEdited,
      handleUpdateSectionBeingEdited,
    } = store.getState();

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
      return store.getState().formsNodeTree;
    } catch (error) {
      handleUpdateFormsStoreApiState(
        { isLoading: false, error },
        'getFormByIdState',
      );
      return store.getState().formsNodeTree;
    }
  };

  return { executeGetFormById };
};
