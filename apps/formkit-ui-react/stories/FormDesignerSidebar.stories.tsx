import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { expect, userEvent, within } from 'storybook/test';

import {
  FormDesignerSidebar,
  FormDesignerSidebarCardContent,
  FormDesignerSidebarCardDescription,
  FormDesignerSidebarCardHeader,
  FormDesignerSidebarCardTitle,
} from '../src/processes/form-designer/presentation/components/FormDesignerSidebar';

const meta = {
  title: 'Form Designer/FormDesignerSidebar',
  component: FormDesignerSidebar,
  args: {
    size: 'sm',
  },
  render: (properties) => (
    <FormDesignerSidebar {...properties} className='max-w-lg'>
      <FormDesignerSidebarCardHeader>
        <FormDesignerSidebarCardTitle>
          Form configuration
        </FormDesignerSidebarCardTitle>
        <FormDesignerSidebarCardDescription>
          Story fixture for panel composition and visual regression checks.
        </FormDesignerSidebarCardDescription>
      </FormDesignerSidebarCardHeader>
      <FormDesignerSidebarCardContent>
        <div className='space-y-2 text-sm'>
          <p>Question count: 2</p>
          <p>Last edited: 2026-03-03</p>
          <button type='button'>Save Draft</button>
        </div>
      </FormDesignerSidebarCardContent>
    </FormDesignerSidebar>
  ),
} satisfies Meta<typeof FormDesignerSidebar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Save Draft' });
    await userEvent.click(button);
    await expect(button).toBeVisible();
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
  },
};
