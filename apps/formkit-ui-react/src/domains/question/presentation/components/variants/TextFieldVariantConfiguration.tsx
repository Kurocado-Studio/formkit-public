import { type Question, VariantEnum } from '@kurocado-studio/formkit-ui-models';
import { composePaths } from '@kurocado-studio/formkit-ui-store';
import { PolymorphicMotionElement } from '@kurocado-studio/react-design-system';
import {
  HtmlForm,
  InputTextField,
} from '@kurocado-studio/shadcn-systemhaus-react';
import { get } from 'lodash-es';
import React from 'react';

import { textFieldNodeFormSchema } from '@/domains/question/domain/schemas/textFieldVariant.schema.ts';
import { TextFieldVariantUpdaterSchema } from '@/domains/question/domain/types';
import { JsonCardViewer } from '@/processes/form-designer/presentation/components/JsonCardViewer';
import { useFormKitStore } from '@/processes/form-designer/state/useFormKitStore';

export function TextFieldVariantConfiguration(): React.ReactNode {
  const formsNodeTree = useFormKitStore((state) => state.formsNodeTree);
  const state = useFormKitStore((state) => state);
  const { toCurrentQuestion } = composePaths(state);

  const questionBeingEdited: Question = get(
    formsNodeTree,
    toCurrentQuestion,
    {},
  );

  const defaultValue = {
    id: get(questionBeingEdited, ['variants', VariantEnum.TEXT, 'id']),
    type: get(questionBeingEdited, ['variants', VariantEnum.TEXT, 'type']),
    defaultValue: get(questionBeingEdited, [
      'variants',
      VariantEnum.TEXT,
      'defaultValue',
    ]),
    placeholder: get(questionBeingEdited, [
      'variants',
      VariantEnum.TEXT,
      'placeholder',
    ]),
    autocomplete: get(questionBeingEdited, [
      'variants',
      VariantEnum.TEXT,
      'autocomplete',
    ]),
  };

  return (
    <PolymorphicMotionElement className='space-y-2'>
      <HtmlForm<TextFieldVariantUpdaterSchema>
        schema={textFieldNodeFormSchema}
        id={defaultValue.id}
        className={'space-y-4'}
        defaultValue={defaultValue}
        shouldValidate='onInput'
        shouldRevalidate='onInput'
        onSuccess={(updatedQuestion: TextFieldVariantUpdaterSchema) => {
          console.log({ updatedQuestion });
        }}
      >
        <InputTextField name='id' disabled label='Variant Id' />
        <InputTextField name='type' disabled label='Question type' />
        <InputTextField name='autocomplete' label='Auto complete' />
        <InputTextField name='defaultValue' label='Default value' />
        <InputTextField name='placeholder' label='Placeholder' />
      </HtmlForm>
      <JsonCardViewer payload={questionBeingEdited} />
    </PolymorphicMotionElement>
  );
}
