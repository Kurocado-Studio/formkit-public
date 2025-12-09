import type { FormsNodeTree } from '@kurocado-studio/formkit-ui';
import type {
  Question,
  QuestionCreatorDto,
  VariantCreatorDto,
} from '@kurocado-studio/formkit-ui';
import type { PolymorphicMotionProperties } from '@kurocado-studio/react-design-system';
import { type ZodTypeAny, z } from 'zod';

import type { FormNodeFormSchema } from './schemas/formNode.schema.ts';
import { textFieldNodeFormSchema } from './schemas/textFieldNode.schema.ts';

export type UseReadQuestionUseCase = () => {
  executeReadQuestion: (payload: { question: Question }) => void;
};

export interface TextFieldQuestionCreatorDto {
  question: QuestionCreatorDto;
  variant: VariantCreatorDto;
}

export interface FormUpdaterDto {
  updatedProperties: FormNodeFormSchema;
}

export type UseCreateQuestionUseCase = () => {
  executeCreateTextFieldQuestion: (
    payload: TextFieldQuestionCreatorDto,
  ) => Promise<Question>;
};

export type UseReadFormUseCase = () => {
  handleReadForm: (payload: {
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
