import { Meta, StoryObj } from '@storybook/react';
import { PhotoBox } from './PhotoBox';

const meta = {
  title: 'Components/PhotoBox',
  component: PhotoBox,
} satisfies Meta<typeof PhotoBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    src: 'true',
    alt: 'Test',
    caption: 'Test',
  },
};
