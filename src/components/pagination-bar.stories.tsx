import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  PAGE_SIZE_OPTIONS,
  PaginationBar,
  type PaginationBarProps,
} from "./pagination-bar";

const meta: Meta<typeof PaginationBar> = {
  title: "L1/PaginationBar",
  component: PaginationBar,
  tags: ["autodocs"],
  args: {
    pageSize: 20,
    from: 1,
    to: 7,
    total: 7,
    pageSizeOptions: [...PAGE_SIZE_OPTIONS],
  },
  argTypes: {
    pageSize: {
      control: "select",
      options: [...PAGE_SIZE_OPTIONS],
    },
    disabled: { control: "boolean" },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Table/list footer bar: rows-per-page Select (default 20/30/40/50) + Previous/Next (Button secondary sm) + range text. Composes Label, Select, and Button on muted-subtle surface.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof PaginationBar>;

export const Default: Story = {
  args: {
    from: 1,
    to: 7,
    total: 7,
  },
};

export const MidPage: Story = {
  args: {
    from: 21,
    to: 40,
    total: 95,
    pageSize: 20,
  },
  render: (args) => <InteractiveBar {...args} />,
};

export const FirstPage: Story = {
  args: {
    from: 1,
    to: 20,
    total: 95,
    pageSize: 20,
  },
  render: (args) => <InteractiveBar {...args} />,
};

export const LastPage: Story = {
  args: {
    from: 81,
    to: 95,
    total: 95,
    pageSize: 20,
  },
  render: (args) => <InteractiveBar {...args} />,
};

export const Disabled: Story = {
  args: {
    from: 1,
    to: 20,
    total: 95,
    disabled: true,
  },
};

function InteractiveBar(args: PaginationBarProps) {
  const [pageSize, setPageSize] = React.useState(args.pageSize);
  const [from, setFrom] = React.useState(args.from);
  const [to, setTo] = React.useState(args.to);
  const total = args.total;

  React.useEffect(() => {
    setPageSize(args.pageSize);
    setFrom(args.from);
    setTo(args.to);
  }, [args.pageSize, args.from, args.to]);

  const goPrevious = () => {
    const nextTo = from - 1;
    const nextFrom = Math.max(1, nextTo - pageSize + 1);
    setFrom(nextFrom);
    setTo(nextTo);
  };

  const goNext = () => {
    const nextFrom = to + 1;
    const nextTo = Math.min(total, nextFrom + pageSize - 1);
    setFrom(nextFrom);
    setTo(nextTo);
  };

  const changePageSize = (size: number) => {
    setPageSize(size);
    setFrom(1);
    setTo(Math.min(size, total));
  };

  return (
    <PaginationBar
      {...args}
      pageSize={pageSize}
      from={from}
      to={to}
      total={total}
      onPageSizeChange={changePageSize}
      onPrevious={goPrevious}
      onNext={goNext}
    />
  );
}
