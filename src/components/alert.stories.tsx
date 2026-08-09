import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Alert } from "./alert";

const meta: Meta<typeof Alert> = {
  title: "L1/Alert",
  component: Alert,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["info", "success", "warning", "critical", "neutral"],
    },
    appearance: {
      control: "select",
      options: ["filled", "outlined"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Info: Story = {
  args: {
    variant: "info",
    appearance: "filled",
    title: "Rollout queued",
    children: "Devices will receive the package in the next sync window.",
  },
};

export const Filled: Story = {
  render: () => (
    <div className="flex max-w-lg flex-col gap-3">
      <Alert appearance="filled" variant="info" title="Info">
        Informational banner.
      </Alert>
      <Alert appearance="filled" variant="success" title="Success">
        Campaign published.
      </Alert>
      <Alert appearance="filled" variant="warning" title="Warning">
        Cohort has offline devices.
      </Alert>
      <Alert appearance="filled" variant="critical" title="Critical">
        Signature verification failed.
      </Alert>
      <Alert appearance="filled" variant="neutral" title="Note">
        Read-only preview.
      </Alert>
    </div>
  ),
};

export const Outlined: Story = {
  render: () => (
    <div className="flex max-w-lg flex-col gap-3">
      <Alert appearance="outlined" variant="info" title="Info">
        Informational banner.
      </Alert>
      <Alert appearance="outlined" variant="success" title="Success">
        Campaign published.
      </Alert>
      <Alert appearance="outlined" variant="warning" title="Warning">
        Cohort has offline devices.
      </Alert>
      <Alert appearance="outlined" variant="critical" title="Critical">
        Signature verification failed.
      </Alert>
      <Alert appearance="outlined" variant="neutral" title="Note">
        Read-only preview.
      </Alert>
    </div>
  ),
};

export const Dismissible: Story = {
  render: function DismissibleStory() {
    const [open, setOpen] = useState(true);
    if (!open)
      return (
        <button type="button" onClick={() => setOpen(true)}>
          Show again
        </button>
      );
    return (
      <Alert
        variant="warning"
        appearance="outlined"
        title="Draft unsaved"
        onDismiss={() => setOpen(false)}
      >
        Leave without saving?
      </Alert>
    );
  },
};
