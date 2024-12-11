import { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';

const meta = {
  title: 'Components/Modal',
  component: Modal,
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: 'Home',
    children: <div>Teste</div>,
  },
};
