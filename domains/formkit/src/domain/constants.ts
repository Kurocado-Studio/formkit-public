import { composeFormsNodeTree } from '../application/composeFormsNodeTree.ts';
import type { ApiState, FormsNodeTree } from './types.ts';

export const DEFAULT_API_STATE: ApiState = {
  isLoading: false,
  error: undefined,
};

export const EMPTY_NODE_TREE: FormsNodeTree = composeFormsNodeTree([]);
