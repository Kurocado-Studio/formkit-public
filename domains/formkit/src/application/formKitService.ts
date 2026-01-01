import { FormKitService, FormkitServiceApi } from '../domain/types';
import { getFormByIdUseCase } from './usecase/Forms/getFormById.usecase';

export const formKitService: FormKitService = (payload) => {
  const { handleLoadFormById, handleGetFormById } = getFormByIdUseCase(payload);

  const handleLoadForm: FormkitServiceApi['handleLoadForm'] = async (
    payload,
    axiosHandler,
  ) => {
    if ('id' in payload) {
      return handleGetFormById({ ...payload, axiosHandler });
    }
    return handleLoadFormById(payload);
  };

  return {
    handleLoadForm,
  };
};
