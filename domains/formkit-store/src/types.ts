import type { Form, Question, Section } from '@kurocado-studio/formkit-ui-models';
import type { StoreApi } from 'zustand/vanilla';

export type StoreCreator<T> = (
  set: StoreApi<T>['setState'],
  get: StoreApi<T>['getState'],
  api: StoreApi<T>,
) => T;

export type ApiState = {
  isLoading: boolean;
  error?: unknown;
};

export type FormsNodeTree = Record<
  string,
  Omit<Form, 'sections'> & {
    sections: Record<string, SectionNodeTree>;
  }
>;

export interface SectionNodeTree extends Omit<Section, 'questions'> {
  questions: {
    [questionId: string]: Question;
  };
}

export type FormsStoreApiNames = 'getFormByIdState';

export type QuestionStoreApiNames = 'createQuestionState';

export interface FormsStore {
  formIdBeingEdited: string | undefined;
  formsNodeTree: FormsNodeTree;
  getFormByIdState: ApiState;
  handleUpdateFormsStoreApiState: (
    apiState: ApiState,
    name: FormsStoreApiNames,
  ) => void;
  handleUpdateFormsNodeTree: (payload: FormsNodeTree) => void;
  handleSetFormBeingEdited: (payload: { id: string | undefined }) => void;
  handleComposeFormsNodeTree: (payload: { forms: Array<Form> }) => void;
  handleAddQuestionToForm: (payload: { question: Question }) => void;
}

export interface QuestionsStore {
  createQuestionState: ApiState;
  questionIdBeingEdited: string | undefined;
  handleSetQuestionToBeEdited: (payload: { id?: string }) => void;
  handleUpdateQuestionsStoreApiState: (
    apiState: ApiState,
    name: QuestionStoreApiNames,
  ) => void;
}

export interface SectionsStore {
  sectionIdBeingEdited: string | undefined;
  handleUpdateSectionBeingEdited: (payload: { id: string }) => void;
}

export type FormKitStore = FormsStore &
  QuestionsStore &
  SectionsStore & {
    composeApiLoadingState: () => {
      getFormById: boolean;
      createQuestion: boolean;
      isAnyLoading: boolean;
    };
    composePaths: () => {
      toCurrentForm: Array<string>;
      toCurrentSection: Array<string>;
      toSections: Array<string>;
      toCurrentQuestion: Array<string>;
      toQuestions: Array<string>;
    };
  };
