import { get } from 'lodash-es';
import { type StoreApi, createStore } from 'zustand/vanilla';

import { formsStore } from './stores/forms.store';
import { questionsStore } from './stores/questions.store';
import { sectionsStore } from './stores/sections.store';
import type { FormKitStore } from './types';

export type {
  ApiState,
  FormKitStore,
  FormsNodeTree,
  FormsStore,
  FormsStoreApiNames,
  QuestionStoreApiNames,
  QuestionsStore,
  SectionNodeTree,
  SectionsStore,
  StoreCreator,
} from './types';

export { formsStore } from './stores/forms.store';
export { questionsStore } from './stores/questions.store';
export { sectionsStore } from './stores/sections.store';

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

export { composeFormsNodeTree } from './composeFormsNodeTree';

export { DEFAULT_API_STATE, EMPTY_NODE_TREE } from './constants';
