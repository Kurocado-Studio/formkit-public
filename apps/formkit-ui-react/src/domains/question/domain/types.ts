import type {
  Question,
  QuestionCreatorDto,
  VariantCreatorDto,
  VariantEnum,
} from '@kurocado-studio/formkit-ui-models';
import type { ZodTypeAny } from 'zod';

export type UseReadQuestion = () => {
  handleReadQuestion: (payload: { question: Question }) => void;
};

export interface QuestionCreatorPayload {
  question: QuestionCreatorDto;
  variant: VariantCreatorDto;
  formId: string;
  sectionId: string;
}

export type UseCreateQuestion = () => {
  handleCreateQuestion: (payload: QuestionCreatorPayload) => Promise<Question>;
};

export interface TextFieldNodeUpdaterSchema
  extends Record<string, string | null | undefined | unknown> {
  question: string;
}

export type QuestionNodeUpdaterSchema = {
  [K in keyof TextFieldNodeUpdaterSchema]: ZodTypeAny;
};

export type TextFieldVariantUpdaterSchema = {
  [K in keyof Question['variants'][VariantEnum.TEXT]]: ZodTypeAny;
};

export type UseUpdateQuestion = () => {
  handleUpdateQuestion: (payload: {
    updatedQuestionProperties: QuestionNodeUpdaterSchema;
  }) => void;
};
