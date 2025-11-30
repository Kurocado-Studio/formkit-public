import type {
  Form,
  Question,
  QuestionCreatorPayload,
  Section,
  VariantCreatorDto,
  VariantEnum,
} from '@kurocado-studio/formkit-ui-models';
import { type AxiosRequestConfig, type AxiosResponse } from 'axios';
import type { FC } from 'react';
import type { StoreApi } from 'zustand/vanilla';

import { FormDesignerPanelsEnum, ModalsAndPanelsViewsEnum } from './enums';
import { FormKitStoreApi } from './exports';

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

export type WithRecord<T> = Record<string, unknown> & T;

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

export type HttpClient<
  T extends Record<string, unknown> = Record<string, unknown>,
  K extends Record<string, unknown> | undefined = undefined,
> = (payload: AxiosRequestConfig<T>) => Promise<AxiosResponse<K>>;

export interface GetFormByIdDependencies {
  store: FormKitStoreApi;
  httpClient: HttpClient<WithRecord<GetFormByIdPayload>, Form>;
  organizationId: string;
}

export interface UpdateFormDependencies {
  store: FormKitStoreApi;
}

export interface ReadFormDependencies {
  store: FormKitStoreApi;
}

export interface QuestionCreatorUseCaseDependencies {
  store: FormKitStoreApi;
  httpClient: HttpClient<WithRecord<QuestionCreatorPayload>, Question>;
  organizationId: string;
  panelsAndModalsContext: PanelsAndModalsContext;
  formDesignerContext: FormDesignerContext;
}

export interface QuestionCreatorUseCaseApi {
  createTextFieldQuestion: (
    payload: WithRecord<QuestionCreatorPayload<VariantEnum.TEXT>>,
  ) => Promise<Question>;
  createQuestion: <T extends VariantEnum>(
    payload: WithRecord<QuestionCreatorPayload<T>>,
  ) => Promise<Question>;
}

export interface UpdateQuestionDependencies {
  store: FormKitStoreApi;
}

export type QuestionCreatorUseCase = (
  payload: QuestionCreatorUseCaseDependencies,
) => QuestionCreatorUseCaseApi;

export interface ReadQuestionDependencies {
  store: FormKitStoreApi;
  scrollToElement?: (id: string) => void;
  onOpenDesigner?: () => void;
  onOpenPanels?: () => void;
}

export interface ReadQuestionPayload {
  question: Question;
}

export interface UpdateQuestionPayload {
  updatedQuestionProperties: Record<string, unknown>;
}

export interface UpdateFormPayload {
  updatedProperties: Record<string, unknown>;
}

export interface CreateQuestionPayload {
  question: QuestionCreatorPayload;
  variant: VariantCreatorDto;
}

export interface GetFormByIdPayload {
  id: string;
}

export interface ReadFormPayload {
  id?: string;
  shouldOpenFormDesignerPanel?: boolean;
}

export type FormKitStoreSelector<T> = (state: FormKitStore) => T;

export interface PanelsAndModalsContext {
  panelsAndModalsState: PanelsAndModalsMap;
  handlePanelsAndModalsState: (view: ModalsAndPanelsViewsEnum) => void;
}

export interface FormDesignerContext {
  formDesignerState: FormDesignerPanelsEnum;
  handleFormDesignerState: (view: FormDesignerPanelsEnum) => void;
}

export type PanelsAndModalsMapComponentMap = {
  [k in ModalsAndPanelsViewsEnum]: FC;
};

export type PanelsAndModalsMap = {
  [k in ModalsAndPanelsViewsEnum]: boolean;
};
