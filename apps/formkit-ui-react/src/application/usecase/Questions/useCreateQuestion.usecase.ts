import {
  createQuestionUseCase,
  formKitStore,
} from '@kurocado-studio/formkit-ui';
import React from 'react';

import { axiosFormKitInstance } from '../../../config/axiosFormKitInstance';
import { KUROCADO_STUDIO_ORGANIZATION_ID_FORMKIT } from '../../../config/constants';
import { useFormDesignerContext } from '../../../context/FormDesignerContext';
import { usePanelsAndModalsContext } from '../../../context/PanelsAndModalsContext';
import type { UseCreateQuestionUseCase } from '../../../types';

export const useCreateTextFieldQuestionUseCase: UseCreateQuestionUseCase =
  () => {
    const panelsAndModalsContext = usePanelsAndModalsContext();
    const formDesignerContext = useFormDesignerContext();


    const questionCreatorUseCase = React.useMemo(
      () =>
        createQuestionUseCase({
          store: formKitStore,
          httpClient: axiosFormKitInstance,
          organizationId: KUROCADO_STUDIO_ORGANIZATION_ID_FORMKIT,
          panelsAndModalsContext,
          formDesignerContext,
        }),
      [panelsAndModalsContext, formDesignerContext],
    );

    const executeCreateTextFieldQuestion: ReturnType<UseCreateQuestionUseCase>['executeCreateTextFieldQuestion'] =
      async (payload) => {
        const { question, variant } = payload;

        return questionCreatorUseCase.executeCreateTextFieldQuestion({
          question,
          variant,
        });
      };

    return { executeCreateTextFieldQuestion };
  };
