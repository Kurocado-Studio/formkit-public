import type { Form } from '@kurocado-studio/formkit-ui-models';
import { EMPTY_FORM_NODE } from '@kurocado-studio/formkit-ui-store';
import {
  // eslint-disable-next-line import/named -- design-system package export
  DirectionEnum,
  // eslint-disable-next-line import/named -- design-system package export
  PolymorphicMotionElement,
  // eslint-disable-next-line import/named -- design-system package export
  useFadeIn,
} from '@kurocado-studio/react-design-system';
import {
  TextSize4xl,
  TextSizeBase,
} from '@kurocado-studio/shadcn-systemhaus-react';
import { get } from 'lodash-es';
import * as React from 'react';

import { useFormKitStore } from '@/processes/form-designer/state/useFormKitStore';

export const FormTitle = () => {
  const formsNodeTree = useFormKitStore((state) => state.formsNodeTree);
  const formIdBeingEdited = useFormKitStore((state) => state.formIdBeingEdited);

  const defaultFadeInProperties = useFadeIn({
    onEnterDirection: DirectionEnum.DEFAULT,
  });

  const toCurrentForm = React.useMemo(
    () => (formIdBeingEdited ? [formIdBeingEdited] : undefined),
    [formIdBeingEdited],
  );

  const { title, description }: Form = get(
    formsNodeTree,
    toCurrentForm ?? '',
    EMPTY_FORM_NODE,
  );

  return (
    <PolymorphicMotionElement {...defaultFadeInProperties}>
      <TextSize4xl fontDisplay>
        {title.length > 0 ? title : 'Welcome to Formkit'}
      </TextSize4xl>
      <TextSizeBase>
        {typeof description === 'string' && description.length > 0
          ? description
          : 'FormKit lets you design accessible variants using your components, letting you embed variants within your product.'}
      </TextSizeBase>
    </PolymorphicMotionElement>
  );
};
