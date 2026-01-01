import { KUROCADO_STUDIO_ORGANIZATION_ID_FORMKIT } from '@kurocado-studio/formkit-ui-models';
import { get } from 'lodash-es';

import { EMPTY_FORM_NODE } from '../../../domain/constants';
import type { GetFormByIdApi, GetFormByIdUseCase } from '../../../domain/types';

export const getFormByIdUseCase: GetFormByIdUseCase = ({ formikStore }) => {
  const {
    handleUpdateFormsStoreApiState,
    handleSetFormBeingEdited,
    handleComposeFormsNodeTree,
    handleUpdateSectionBeingEdited,
  } = formikStore;

  const requestFormById: GetFormByIdApi['handleGetFormById'] = async ({
    id,
    axiosHandler,
  }) => {
    try {
      handleUpdateFormsStoreApiState(
        { isLoading: true, error: undefined },
        'getFormByIdState',
      );
      const data = await axiosHandler({
        url: `/api/v1/organizations/${KUROCADO_STUDIO_ORGANIZATION_ID_FORMKIT}/forms/${id}`,
        method: 'GET',
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

  const handleLoadFormById: GetFormByIdApi['handleLoadFormById'] = ({
    form,
  }) => {
    handleUpdateFormsStoreApiState(
      { isLoading: true, error: undefined },
      'getFormByIdState',
    );
    handleComposeFormsNodeTree({ forms: [form] });
    handleSetFormBeingEdited({ id: form.id });
    handleUpdateSectionBeingEdited({
      id: get(form, ['sections', 0, 'id']),
    });
    handleUpdateFormsStoreApiState(
      { isLoading: false, error: undefined },
      'getFormByIdState',
    );
    return form;
  };

  const handleGetFormById: ReturnType<GetFormByIdUseCase>['handleGetFormById'] =
    async ({ id, axiosHandler }) => {
      try {
        handleUpdateFormsStoreApiState(
          { isLoading: true, error: undefined },
          'getFormByIdState',
        );
        const form = await requestFormById({ id, axiosHandler });
        handleLoadFormById({ form });
        return form;
      } catch (error) {
        handleUpdateFormsStoreApiState(
          { isLoading: false, error },
          'getFormByIdState',
        );
        return EMPTY_FORM_NODE;
      }
    };

  return {
    handleLoadFormById,
    handleGetFormById,
  };
};
