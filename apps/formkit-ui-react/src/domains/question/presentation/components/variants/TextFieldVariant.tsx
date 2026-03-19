import {
  InputFieldTypeEnum,
  type Question,
  VariantEnum,
} from '@kurocado-studio/formkit-ui-models';
import { InputTextField } from '@kurocado-studio/shadcn-systemhaus-react';
import { get } from 'lodash-es';
import React from 'react';

export function TextFieldVariant(properties: {
  question: Question;
}): React.ReactNode {
  const { question, variant, variants, description } = properties.question;
  const name = get(variants, [variant, 'id'], 'unknown');
  const required = get(variants, [variant, 'required']);

  return (
    <InputTextField
      required={required}
      {...get(variants, [VariantEnum.TEXT])}
      type={InputFieldTypeEnum.TEXT}
      name={name}
      label={question}
      description={description}
    />
  );
}

export function EmailFieldVariant(properties: {
  question: Question;
}): React.ReactNode {
  const { question, variant, variants, description } = properties.question;
  const name = get(variants, [variant, 'id'], 'unknown');
  const required = get(variants, [variant, 'required']);

  return (
    <InputTextField
      required={required}
      type={InputFieldTypeEnum.EMAIL}
      name={name}
      label={question}
      description={description}
    />
  );
}

export function PhoneFieldVariant(properties: {
  question: Question;
}): React.ReactNode {
  const { question, variant, variants, description } = properties.question;
  const name = get(variants, [variant, 'id'], 'unknown');
  const required = get(variants, [variant, 'required']);

  return (
    <InputTextField
      required={required}
      type={'tel'}
      name={name}
      label={question}
      description={description}
    />
  );
}

export function PasswordFieldVariant(properties: {
  question: Question;
}): React.ReactNode {
  const { question, variant, variants, description } = properties.question;
  const name = get(variants, [variant, 'id'], 'unknown');
  const required = get(variants, [variant, 'required']);

  return (
    <InputTextField
      required={required}
      type={InputFieldTypeEnum.PASSWORD}
      name={name}
      label={question}
      description={description}
    />
  );
}
