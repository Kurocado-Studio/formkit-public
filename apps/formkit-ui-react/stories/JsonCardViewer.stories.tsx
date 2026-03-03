import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import { JsonCardViewer } from '../src/processes/form-designer/presentation/components/JsonCardViewer';
import {
  mockedForm,
  mockedFormNodeTree,
  mockedQuestion1,
} from '../src/shared/utils/mocks';

const meta = {
  title: 'Form Designer/JsonCardViewer',
  component: JsonCardViewer,
  args: {
    payload: mockedForm,
  },
} satisfies Meta<typeof JsonCardViewer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FormPayload: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText((content) => content.includes('Welcome to FormKit')),
    ).toBeInTheDocument();
  },
};

export const QuestionPayload: Story = {
  args: {
    payload: mockedQuestion1,
  },
};

export const NodeTreePayload: Story = {
  args: {
    payload: mockedFormNodeTree,
  },
};

export const EmptyPayload: Story = {
  args: {
    payload: undefined,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText((content) => content.includes('No data available')),
    ).toBeInTheDocument();
  },
};
