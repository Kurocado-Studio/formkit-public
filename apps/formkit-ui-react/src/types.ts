// @ts-expect-error while we fix typings
import type { AxiosDataState } from '@kurocado-studio/axios-react';
import type {
  FormsNodeTree,
  SectionNodeTree,
} from '@kurocado-studio/formkit-store';
import type {
  Form,
  Question,
  QuestionCreatorDto,
  Section,
  VariantCreatorDto,
} from '@kurocado-studio/formkit-ui-models';
import type { PolymorphicMotionProperties } from '@kurocado-studio/react-design-system';
import type React from 'react';
import { type ZodTypeAny, z } from 'zod';

import type { FormDesignerPanelsEnum, ModalsAndPanelsViewsEnum } from './enums';
import type { FormNodeFormSchema } from './schemas/formNode.schema.ts';
import { textFieldNodeFormSchema } from './schemas/textFieldNode.schema.ts';

export type {
  ApiState,
  FormsNodeTree,
  FormsStore,
  FormsStoreApiNames,
  QuestionStoreApiNames,
  QuestionsStore,
  SectionNodeTree,
  SectionsStore,
  StoreCreator,
} from '@kurocado-studio/formkit-store';

export interface FormDesignerEditorDto {
  questionBeingEdited: Question;
  formBeingEdited: Form;
  sectionBeingEdited: Section;
}

export type UseReadQuestionUseCase = () => {
  executeReadQuestion: (payload: { question: Question }) => void;
};

export interface TextFieldQuestionCreatorDto {
  question: QuestionCreatorDto;
  variant: VariantCreatorDto;
}

export interface TextFieldQuestionUpdaterDto {
  formBeingEdited: Form;
  sectionBeingEdited: Section;
  questionBeingEdited: Question;
  updatedQuestion: TextFieldNodeUpdaterSchema;
}

export interface FormUpdaterDto {
  updatedProperties: FormNodeFormSchema;
}

export type UseGetFormById = () => {
  formById: AxiosDataState<Form>;
  getFormById: (id: string) => Promise<Form>;
};

export type FormsNodeTreeFallback = {
  [formId: string]: Omit<Form, 'sections'> & {
    sections: {
      [sectionId: string]: SectionNodeTree;
    };
  };
};

export type FormsNode = {
  [formId: string]: Omit<Form, 'sections'> & {
    sections: {
      [sectionId: string]: SectionNodeTree;
    };
  };
};

export interface QuestionCreatorPayload extends Record<string, unknown> {
  question: QuestionCreatorDto;
  variant: VariantCreatorDto;
}

export type UseCreateQuestionUseCase = () => {
  executeCreateTextFieldQuestion: (
    payload: TextFieldQuestionCreatorDto,
  ) => Promise<Question>;
};

export interface FormViewContextType {
  panelsAndModalsState: PanelsAndModalsMap;
  handlePanelsAndModalsState: (view: ModalsAndPanelsViewsEnum) => void;
}

export interface FormDesignerContext {
  formDesignerState: FormDesignerPanelsEnum;
  handleFormDesignerState: (view: FormDesignerPanelsEnum) => void;
}

export type UseReadFormUseCase = () => {
  executeReadForm: (payload: {
    id?: string;
    shouldOpenFormDesignerPanel?: boolean;
  }) => void;
};

export type UseUpdateFormUseCase = () => {
  executeUpdateForm: (payload: FormUpdaterDto) => void;
};

export type UseGetFormByIdUseCase = () => {
  executeGetFormById: (payload: { id: string }) => Promise<FormsNodeTree>;
};

export type PanelsAndModalsMapComponentMap = {
  [k in ModalsAndPanelsViewsEnum]: React.FC;
};

export type PanelsAndModalsMap = {
  [k in ModalsAndPanelsViewsEnum]: boolean;
};

export interface JSONViewerProperties extends PolymorphicMotionProperties {
  payload?: unknown;
}

export interface TextFieldNodeUpdaterSchema extends Record<string, unknown> {
  question: string;
}

export type TextFieldNodeUpdaterSchemaShape = {
  [K in keyof TextFieldNodeUpdaterSchema]: ZodTypeAny;
};

export type TextFieldNodeSchema = z.infer<typeof textFieldNodeFormSchema>;
