import type {
  Form,
  FormsNodeTree,
  Question,
} from '@kurocado-studio/formkit-ui-models';
import { type AxiosRequestConfig } from 'axios';
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

export interface FormKitServiceDependencies {
  formikStore: FormKitStore;
}

export type AxiosRequestFunction<T, K = undefined> = (
  options: AxiosRequestConfig<K extends undefined ? T : K>,
) => Promise<void>;

export type AxiosHandler<
  T extends Record<string, unknown>,
  K extends Record<string, unknown> | undefined = undefined,
> = (
  ...axiosRequestConfig: Parameters<AxiosRequestFunction<T, K>>
) => Promise<K extends undefined ? T : K>;

export interface GetFormByIdApi {
  handleGetFormById: (payload: {
    id: string;
    axiosHandler: AxiosHandler<Form>;
  }) => Promise<Form>;
  handleLoadFormById: (payload: { form: Form }) => Form;
}

export type GetFormByIdUseCase = (
  payload: FormKitServiceDependencies,
) => GetFormByIdApi;

export type FormKitService = (
  payload: FormKitServiceDependencies,
) => FormkitServiceApi;

type LoadById = {
  id: string;
};

type LoadByForm = {
  form: Form;
};
export type LoadFormPayload = LoadById | LoadByForm;

export interface FormkitServiceApi {
  handleLoadForm(
    payload: LoadFormPayload,
    axiosHandler: AxiosHandler<Form>,
  ): Promise<Form>;
}
