import { IconBg, Svg } from "@axa-fr/design-system-look-and-feel-react";
import article from "@material-symbols/svg-400/outlined/article-fill.svg";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof IconBg> = {
  title: "Components/IconBg",
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
  component: IconBg,
};

export default meta;

export const Default: StoryObj<typeof IconBg> = {
  name: "IconBg",
  render: (args) => <IconBg {...args} />,
  args: {
    children: <Svg src={article} />,
    isDisabled: false,
    classModifier: "secondary",
  },
};
