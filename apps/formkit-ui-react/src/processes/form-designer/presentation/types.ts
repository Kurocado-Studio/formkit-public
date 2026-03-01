import type { PolymorphicMotionProperties } from '@kurocado-studio/react-design-system';

import type {
  FormDesignerPanelsEnum,
  PanelsViewsEnum,
} from '@/shared/contracts/enums';

export type PanelsMap = {
  [k in PanelsViewsEnum]: boolean;
};

export interface PanelsContextType {
  panelsState: PanelsMap;
  handlePanelsState: (payload: Partial<PanelsMap>) => void;
  handleToggleOffStateExceptFor: (
    payload: Array<Partial<PanelsViewsEnum>>,
  ) => void;
  handleTogglePanel: (view: PanelsViewsEnum) => void;
}

export interface FormDesignerContext {
  formDesignerState: FormDesignerPanelsEnum;
  handleFormDesignerState: (view: FormDesignerPanelsEnum) => void;
}

export interface JSONViewerProperties extends PolymorphicMotionProperties {
  payload?: unknown;
}
