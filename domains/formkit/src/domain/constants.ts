import {
  type Form,
  type FormsNodeTree,
  type Question,
  type Section,
  VariantEnum,
} from '@kurocado-studio/formkit-ui-models';

import { composeFormsNodeTree } from '../infrastructure/composeFormsNodeTree.ts';
import type { ApiState } from './types';

export const DEFAULT_API_STATE: ApiState = {
  isLoading: false,
  error: undefined,
};

export const EMPTY_NODE_TREE: FormsNodeTree = composeFormsNodeTree([]);

export {
  KUROCADO_STUDIO_ORGANIZATION_ID_FORMKIT,
  KUROCADO_STUDIO_DEMO_FORM_ID,
} from '@kurocado-studio/formkit-ui-models';

export const GRID_LAYOUT = {
  gap: '1',
  columns: {
    base: '12',
  },
};

export const CONTAINER_MAX_WIDTH = 'w-full mx-auto max-w-[2440px]';

const createdAt = new Date().toISOString();
const updatedAt = new Date().toISOString();

export const VIEWPORT_WIDTH_TO_TRIGGER_MOBILE_PANEL = 1024;

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

export const EMPTY_QUESTION_NODE: Question = {
  hidden: false,
  id: '',
  question: 'No name provided',
  description: 'No description provided',
  required: false,
  variant: VariantEnum.TEXT,
  variants: {},
};
