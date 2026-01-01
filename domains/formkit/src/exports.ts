import { get } from 'lodash-es';
import { type StoreApi, createStore } from 'zustand/vanilla';

import type { FormKitStore } from './domain/types';
import { formsStore } from './infrastructure/stores/forms.store';
import { questionsStore } from './infrastructure/stores/questions.store';
import { sectionsStore } from './infrastructure/stores/sections.store';

export { formKitService } from './application/formKitService';
export type * from './domain/types';
export * from '@kurocado-studio/formkit-ui-models';

export { formsStore } from './infrastructure/stores/forms.store';
export { questionsStore } from './infrastructure/stores/questions.store';
export { sectionsStore } from './infrastructure/stores/sections.store';

export type FormKitStoreApi = StoreApi<FormKitStore>;

export const createFormKitStore = (): FormKitStoreApi =>
  createStore<FormKitStore>((...storeParameters) => ({
    ...questionsStore(...storeParameters),
    ...sectionsStore(...storeParameters),
    ...formsStore(...storeParameters),
    composeApiLoadingState: () => {
      const state = storeParameters[1]();

      const getFormById = get(state, ['getFormByIdState', 'isLoading'], false);
      const createQuestion = get(
        state,
        ['createQuestionState', 'isLoading'],
        false,
      );
      const isAnyLoading = [getFormById, createQuestion].some(Boolean);

      return {
        getFormById,
        createQuestion,
        isAnyLoading,
      };
    },
    composePaths: () => {
      const state = storeParameters[1]();

      const formId = state.formIdBeingEdited ?? '';
      const sectionId = state.sectionIdBeingEdited ?? '';
      const questionId = state.questionIdBeingEdited ?? '';

      const toCurrentForm = [formId];
      const toSections = [...toCurrentForm, 'sections'];
      const toCurrentSection = [...toSections, sectionId];
      const toQuestions = [...toCurrentSection, 'questions'];
      const toCurrentQuestion = [...toQuestions, questionId];

      return {
        toCurrentForm,
        toSections,
        toCurrentSection,
        toQuestions,
        toCurrentQuestion,
      };
    },
  }));

export const formKitStore = createFormKitStore();

export { composeFormsNodeTree } from './infrastructure/composeFormsNodeTree.ts';

export * from './domain/constants';
