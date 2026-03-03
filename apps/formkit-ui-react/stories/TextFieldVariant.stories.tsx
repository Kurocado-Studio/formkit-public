import { FormProvider, useForm } from '@conform-to/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { expect, userEvent, within } from 'storybook/test';

import { TextFieldVariant } from '../src/domains/question/presentation/components/variants/TextFieldVariant';
import { mockedQuestion1 } from '../src/shared/utils/mocks';

const FormContextWrapper = ({ children }: { children: React.ReactNode }) => {
  const [form] = useForm({
    id: 'storybook-text-field-variant',
  });

  return (
    <FormProvider context={form.context}>
      <form id={form.id}>{children}</form>
    </FormProvider>
  );
};

const meta = {
  title: 'Questions/TextFieldVariant',
  component: TextFieldVariant,
  decorators: [
    (Story) => (
      <FormContextWrapper>
        <Story />
      </FormContextWrapper>
    ),
  ],
  args: {
    question: mockedQuestion1,
  },
} satisfies Meta<typeof TextFieldVariant>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox', {
      name: mockedQuestion1.question,
    });

    await userEvent.type(input, 'Jane Doe');
    await expect(input).toHaveValue('Jane Doe');
  },
};

export const RequiredField: Story = {
  args: {
    question: {
      ...mockedQuestion1,
      variants: {
        ...mockedQuestion1.variants,
        TEXT: {
          ...mockedQuestion1.variants.TEXT,
          required: true,
        },
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox', {
      name: mockedQuestion1.question,
    });
    await expect(input).toBeInTheDocument();
    await expect(input).not.toBeRequired();
  },
};
