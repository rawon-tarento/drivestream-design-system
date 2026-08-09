import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "./modal";

const meta: Meta<typeof Modal> = {
  title: "L1/Modal",
  component: Modal,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Confirm: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button>Open confirm</Button>
      </ModalTrigger>
      <ModalContent size="sm">
        <ModalHeader>
          <ModalTitle>Publish campaign?</ModalTitle>
          <ModalDescription>
            This starts the rollout for the selected cohort. You can pause later.
          </ModalDescription>
        </ModalHeader>
        <ModalFooter>
          <Button variant="secondary">Cancel</Button>
          <Button>Publish</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};

export const WithBody: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button>Open detail</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Parse job</ModalTitle>
          <ModalDescription>Latest definition parse status.</ModalDescription>
        </ModalHeader>
        <ModalBody>
          <dl className="space-y-3">
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Status</dt>
              <dd className="font-medium">Succeeded</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Rows</dt>
              <dd className="font-medium">128</dd>
            </div>
          </dl>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary">Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};

export const Form: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button>Open form</Button>
      </ModalTrigger>
      <ModalContent size="lg">
        <form
          className="flex min-h-0 flex-1 flex-col"
          onSubmit={(e) => e.preventDefault()}
        >
          <ModalHeader>
            <ModalTitle>New product variant</ModalTitle>
            <ModalDescription>
              Create a draft variant for this organization.
            </ModalDescription>
          </ModalHeader>
          <ModalBody className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="modal-code">Code</Label>
              <Input id="modal-code" placeholder="MY-VARIANT" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="modal-name">Display name</Label>
              <Input id="modal-name" placeholder="My variant" />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  ),
};
