import { composeFormsNodeTree } from './composeFormsNodeTree';
import type { ApiState, FormsNodeTree } from './types';

export const DEFAULT_API_STATE: ApiState = {
  isLoading: false,
  error: undefined,
};

export const EMPTY_NODE_TREE: FormsNodeTree = composeFormsNodeTree([]);
