import type { Meta, StoryObj } from "@storybook/react-vite";

function TypeScale() {
  return (
    <div className="space-y-6 text-foreground">
      <div>
        <p className="text-xs text-muted-foreground">Display / page title</p>
        <h1 className="text-3xl font-bold tracking-tight text-primary">DriveStream Ops</h1>
      </div>
      <div>
        <p className="text-xs text-muted-foreground">Section title</p>
        <h2 className="text-2xl font-bold tracking-tight text-primary">Workspace</h2>
      </div>
      <div>
        <p className="text-xs text-muted-foreground">Body</p>
        <p className="text-sm leading-relaxed text-foreground">
          Body copy uses the sans stack and semantic foreground tokens. Keep product UI dense and
          readable — prefer short sentences for ops workflows.
        </p>
      </div>
      <div>
        <p className="text-xs text-muted-foreground">Muted / helper</p>
        <p className="text-sm text-muted-foreground">Secondary explanation and field hints.</p>
      </div>
      <div>
        <p className="text-xs text-muted-foreground">Mono / code</p>
        <code className="rounded-control bg-surface-alt px-2 py-1 font-mono text-xs">
          INIT-DSOPS-TENANT-ONBOARD-001
        </code>
      </div>
    </div>
  );
}

const meta: Meta<typeof TypeScale> = {
  title: "Foundations/Typography",
  component: TypeScale,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TypeScale>;

export const Scale: Story = {};
