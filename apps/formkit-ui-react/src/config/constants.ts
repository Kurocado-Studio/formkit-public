import type { GridProperties } from '@kurocado-studio/ui-react-research-and-development';

export {
  KUROCADO_STUDIO_ORGANIZATION_ID_FORMKIT,
  KUROCADO_STUDIO_DEMO_FORM_ID,
  DEFAULT_API_STATE,
  EMPTY_NODE_TREE,
} from '@kurocado-studio/formkit-ui';

export const CONTAINER_MAX_WIDTH = 'w-full mx-auto max-w-[2440px]';

export const VIEWPORT_WIDTH_TO_TRIGGER_MOBILE_PANEL = 1024;

export const GRID_LAYOUT: GridProperties = {
  gap: '1',
  columns: {
    base: '12',
  },
};
