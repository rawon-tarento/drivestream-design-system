import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./button";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";

/**
 * @deprecated Prefer L1/Modal. Dialog is a compatibility alias of Modal.
 */
const meta: Meta<typeof Dialog> = {
  title: "L1/Dialog",
  component: Dialog,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Publish campaign?</DialogTitle>
          <DialogDescription>
            This starts the rollout for the selected cohort. You can pause later.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="secondary">Cancel</Button>
          <Button>Publish</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const WithBody: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open with body</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Details</DialogTitle>
          <DialogDescription>Structured body spacing.</DialogDescription>
        </DialogHeader>
        <DialogBody>
          <p>Body content uses consistent horizontal and vertical padding.</p>
        </DialogBody>
        <DialogFooter>
          <Button variant="secondary">Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
