import type { Question } from '@kurocado-studio/formkit-ui-models';
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
      type={'text'}
      name={name}
      label={question}
      description={description}
    />
  );
}
