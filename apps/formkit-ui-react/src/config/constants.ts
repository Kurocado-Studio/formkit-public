import { get } from 'lodash-es';

export {
  CONTAINER_MAX_WIDTH,
  GRID_LAYOUT,
  EMPTY_QUESTION_NODE,
  VIEWPORT_WIDTH_TO_TRIGGER_MOBILE_PANEL,
} from '@kurocado-studio/formkit';
export const formkitServiceEnvironment = get(
  import.meta,
  ['env', 'VITE_NODE_ENV'],
  '',
);
