import { createStore } from 'zustand/vanilla';
import { get } from 'lodash-es';
import {
  FormKitStore,
  FormKitStoreApi,
  formsStore,
  questionsStore,
  sectionsStore,
} from '../exports';

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
