import type { Meta, StoryObj } from "@storybook/react-vite";

type Swatch = { label: string; token: string; className: string };

const SWATCHES: Swatch[] = [
  { label: "background", token: "--background", className: "bg-background text-foreground" },
  { label: "surface", token: "--surface", className: "bg-surface text-foreground" },
  { label: "surface-alt", token: "--surface-alt", className: "bg-surface-alt text-foreground" },
  { label: "primary", token: "--primary", className: "bg-primary text-primary-foreground" },
  { label: "accent", token: "--accent", className: "bg-accent text-accent-foreground" },
  { label: "secondary", token: "--secondary", className: "bg-secondary text-secondary-foreground" },
  { label: "destructive", token: "--destructive", className: "bg-destructive text-destructive-foreground" },
  { label: "success", token: "--success", className: "bg-success text-success-foreground" },
  { label: "warning", token: "--warning", className: "bg-warning text-warning-foreground" },
  { label: "info", token: "--info", className: "bg-info text-info-foreground" },
  { label: "border", token: "--border", className: "bg-background border-2 border-border text-foreground" },
  { label: "muted", token: "--muted", className: "bg-muted text-muted-foreground" },
];

function ColorBoard() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {SWATCHES.map((s) => (
        <div
          key={s.token}
          className={`flex min-h-24 flex-col justify-end rounded-card border border-border p-3 shadow-sm ${s.className}`}
        >
          <span className="text-sm font-semibold">{s.label}</span>
          <span className="font-mono text-xs opacity-80">{s.token}</span>
        </div>
      ))}
    </div>
  );
}

const meta: Meta<typeof ColorBoard> = {
  title: "Foundations/Colors",
  component: ColorBoard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "L0 semantic color tokens used by L1 primitives. Prefer these utilities over raw hex or palette scales.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ColorBoard>;

export const Semantic: Story = {};
