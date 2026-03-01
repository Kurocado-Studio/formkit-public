import type { StoryObj } from '@storybook/react-vite';

import { Header } from '../src/processes/form-designer/presentation/components/Header';

const meta = {
  title: 'Example/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {
  args: {
    user: {
      name: 'Jane Doe',
    },
  },
};

export const LoggedOut: Story = {};

export default meta;
