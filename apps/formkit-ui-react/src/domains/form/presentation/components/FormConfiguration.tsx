import type { Form } from '@kurocado-studio/formkit-ui-models';
import { PolymorphicMotionElement } from '@kurocado-studio/react-design-system';
import {
  HtmlForm,
  InputTextArea,
  InputTextField,
} from '@kurocado-studio/shadcn-systemhaus-react';
import { get } from 'lodash-es';
import React from 'react';

import {
  FormNodeUpdaterSchema,
  formNodeFormSchema,
} from '@/domains/form/domain/schemas/formNode.schema';
import { useFormKitService } from '@/processes/form-designer/application/useFormKitService';
import { useFormKitStore } from '@/processes/form-designer/state/useFormKitStore';

export function FormNodeEditor(): React.ReactNode {
  const formsNodeTree = useFormKitStore((state) => state.formsNodeTree);
  const formIdBeingEdited = useFormKitStore((state) => state.formIdBeingEdited);
  const toCurrentForm = React.useMemo(
    () => (formIdBeingEdited ? [formIdBeingEdited] : undefined),
    [formIdBeingEdited],
  );

  const { handleUpdateForm } = useFormKitService();

  const payload: Form & Omit<Form, 'sections'> = get(
    formsNodeTree,
    toCurrentForm ?? '',
    {},
  );

  return (
    <PolymorphicMotionElement key={payload.id}>
      <HtmlForm<FormNodeUpdaterSchema>
        key={`html-form-${payload.id}`}
        className={'space-y-4'}
        schema={formNodeFormSchema}
        defaultValue={payload}
        shouldValidate='onInput'
        shouldRevalidate='onInput'
        onSuccess={(updatedProperties: FormNodeUpdaterSchema) => {
          handleUpdateForm({ updatedProperties });
        }}
      >
        <InputTextField name='id' label='Form Id' disabled />
        <InputTextField
          name='title'
          label='Title'
          disabled={formIdBeingEdited === undefined}
        />
        <InputTextArea
          name='description'
          label='Description'
          disabled={formIdBeingEdited === undefined}
        />
      </HtmlForm>
    </PolymorphicMotionElement>
  );
}
