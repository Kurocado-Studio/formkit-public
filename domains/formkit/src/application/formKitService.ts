import { FormKitService, FormkitServiceApi } from '../domain/types';
import { getFormByIdUseCase } from './usecase/Forms/getFormById.usecase';

export const formKitService: FormKitService = (payload) => {
  const { handleLoadFormById, handleGetFormById } = getFormByIdUseCase(payload);

  const handleLoadForm: FormkitServiceApi['handleLoadForm'] = async (
    payload,
  ) => {
    if ('id' in payload && 'axiosHandler' in payload) {
      return handleGetFormById(payload);
    }
    return handleLoadFormById({ form: payload.form });
  };

  return {
    handleLoadForm,
  };
};
