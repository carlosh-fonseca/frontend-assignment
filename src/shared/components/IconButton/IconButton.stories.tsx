import { Meta, StoryObj } from "@storybook/react";
import { HomeIcon } from "../../assets/icons/HomeIcon";
import { IconButton } from "./IconButton";

const meta = {
  title: "Components/IconButton",
  component: IconButton,
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: "Home",
    icon: <HomeIcon />,
  },
};
