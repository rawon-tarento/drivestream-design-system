import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

const meta: Meta<typeof Tabs> = {
  title: "L1/Tabs",
  component: Tabs,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Underline: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-96">
      <TabsList variant="underline">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="devices">Devices</TabsTrigger>
        <TabsTrigger value="logs">Logs</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">Overview panel</TabsContent>
      <TabsContent value="devices">Devices panel</TabsContent>
      <TabsContent value="logs">Logs panel</TabsContent>
    </Tabs>
  ),
};

export const Soft: Story = {
  render: () => (
    <Tabs defaultValue="a" className="w-96">
      <TabsList variant="soft">
        <TabsTrigger value="a">Active</TabsTrigger>
        <TabsTrigger value="b">Queued</TabsTrigger>
        <TabsTrigger value="c">Done</TabsTrigger>
      </TabsList>
      <TabsContent value="a">Active jobs</TabsContent>
      <TabsContent value="b">Queued jobs</TabsContent>
      <TabsContent value="c">Completed</TabsContent>
    </Tabs>
  ),
};
