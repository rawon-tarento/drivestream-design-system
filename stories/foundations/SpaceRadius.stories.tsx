import type { Meta, StoryObj } from "@storybook/react-vite";

const RADII = [
  "rounded-control",
  "rounded-input",
  "rounded-button",
  "rounded-badge",
  "rounded-card",
  "rounded-surface",
  "rounded-modal",
];

const PADDINGS = ["p-control-xs", "p-control-sm", "p-control-md", "p-control-lg"];

function SpaceRadiusBoard() {
  return (
    <div className="space-y-8">
      <section>
        <h3 className="mb-3 text-sm font-semibold text-primary">Semantic radius</h3>
        <div className="flex flex-wrap gap-4">
          {RADII.map((r) => (
            <div
              key={r}
              className={`flex h-20 w-28 items-center justify-center border border-border bg-surface-alt text-xs ${r}`}
            >
              {r}
            </div>
          ))}
        </div>
      </section>
      <section>
        <h3 className="mb-3 text-sm font-semibold text-primary">Control spacing (token utilities)</h3>
        <div className="flex flex-wrap items-end gap-3">
          {PADDINGS.map((p) => (
            <div key={p} className={`border border-border bg-accent-subtle ${p}`}>
              <span className="text-xs text-accent">{p}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const meta: Meta<typeof SpaceRadiusBoard> = {
  title: "Foundations/Space & Radius",
  component: SpaceRadiusBoard,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SpaceRadiusBoard>;

export const Tokens: Story = {};
