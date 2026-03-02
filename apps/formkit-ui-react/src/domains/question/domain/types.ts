import type {
  Question,
  QuestionCreatorDto,
  VariantCreatorDto,
} from '@kurocado-studio/formkit-ui-models';
import type { ZodTypeAny } from 'zod';

export type UseReadQuestion = () => {
  handleReadQuestion: (payload: { question: Question }) => void;
};

export interface QuestionCreatorPayload {
  question: QuestionCreatorDto;
  variant: VariantCreatorDto;
}

export type UseCreateQuestion = () => {
  handleCreateQuestion: (payload: QuestionCreatorPayload) => Promise<Question>;
};

export interface TextFieldNodeUpdaterSchema
  extends Record<string, string | null | undefined | unknown> {
  question: string;
}

export type TextFieldNodeUpdaterSchemaShape = {
  [K in keyof TextFieldNodeUpdaterSchema]: ZodTypeAny;
};

export type UseUpdateQuestion = () => {
  handleUpdateQuestion: (payload: {
    updatedQuestionProperties: TextFieldNodeUpdaterSchema;
  }) => void;
};
