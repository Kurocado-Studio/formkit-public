import {
  type FormKitNodeVariantMap,
  VariantEnum,
  formRendererComposer,
} from '@kurocado-studio/formkit-ui-react-renderer';

import { TextFieldVariant } from './TextFieldVariant';

const nodeComponentMap: FormKitNodeVariantMap = {
  [VariantEnum.TEXT]: TextFieldVariant,
};

export const VariantRenderer = formRendererComposer(nodeComponentMap);
