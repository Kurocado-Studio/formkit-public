import {
  type Form,
  type Question,
  type Section,
  VariantEnum,
} from '@kurocado-studio/formkit-ui-models';

import type { ApiState, FormsNodeTree } from './types';
import { composeFormsNodeTree } from './utils/composeFormsNodeTree';

const createdAt = new Date().toISOString();
const updatedAt = new Date().toISOString();

export const DEFAULT_API_STATE: ApiState = {
  isLoading: false,
  error: undefined,
};

export const EMPTY_NODE_TREE: FormsNodeTree = composeFormsNodeTree([]);

export const EMPTY_QUESTION_NODE: Question = {
  hidden: false,
  id: '',
  question: 'No name provided',
  description: 'No description provided',
  required: false,
  variant: VariantEnum.TEXT,
  variants: {},
};

export const EMPTY_FORM_NODE: Form = {
  createdAt,
  description: '',
  id: '',
  sections: [],
  updatedAt,
  title: '',
};

export const EMPTY_SECTION_NODE: Section = {
  createdAt,
  description: 'No description provided',
  id: '',
  order: 0,
  questions: [],
  title: '',
  updatedAt,
};
