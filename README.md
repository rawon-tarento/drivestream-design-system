# @drivestream/ui

DriveStream design system package — **L0 tokens** and **L1 React primitives**, extracted from the `drivestream-ops` prototype branch (`design/INIT-VEHICLE-RO-AND-ANALYTICS-CATALOG-001`).

Visual gallery: Storybook. Machine contract for product screens stays in meta (`ui-contract.yaml`); this repo is the reusable UI layer those contracts pin to.

## Package layout

```text
src/
  styles/           L0 — tokens + globals entry (styles.css)
  components/       L1 — primitives + colocated Storybook stories
  lib/utils.ts      cn() helper
  index.ts          public exports
stories/foundations L0 gallery (color / type / space)
docs/               inventory + consume guide
```

**Out of scope for v0.1:** L3 shells (workspace / wizard / app chrome), L4 domain screens, Figma Code Connect maps. Those stay in product apps until promoted.

## Quick start

```bash
npm install
npm run storybook          # http://localhost:6006
npm run build              # dist/ ESM + types
npm run verify:tokens
npm run lint:tokens
```

## Consume in an app (e.g. drivestream-ops)

```bash
npm install @drivestream/ui
```

```ts
// app entry CSS
import "@drivestream/ui/styles.css";

// components
import { Button, Modal, DataTable } from "@drivestream/ui";
```

Tailwind v4 must see package classes. In the app CSS entry (or Tailwind config), ensure content/scanning covers:

```text
./node_modules/@drivestream/ui/dist/**/*.{js,mjs}
./node_modules/@drivestream/ui/src/components/**/*.{ts,tsx}
```

Until published to a registry, link from the sandbox:

```bash
# in drivestream-design-system
npm run build && npm link

# in drivestream-ops
npm link @drivestream/ui
```

## Layers

| Layer | In this package | Notes |
|-------|-----------------|-------|
| L0 Tokens | `src/styles/tokens/*` | primitives → semantic-ops → theme |
| L1 Primitives | `src/components/*` | Button, Modal, DataTable, … |
| L2 Patterns | docs only (later) | PAT-* remain product-catalog for now |
| L3 Shells | — | stay in product apps |
| L4 Domain | — | stay in product apps |

## Versioning

Semver. Additive L1 / tokens = minor. Breaking preferred APIs or token renames = major. Pin from UI contracts as `@drivestream/ui@^0.1`.

## Source of extraction

| Source (ops) | Destination |
|--------------|-------------|
| `design/tokens/*` | `src/styles/tokens/` |
| `design/globals-base.css` | `src/styles/globals-base.css` |
| `components/ui/*` | `src/components/` |
| `lib/utils.ts` | `src/lib/utils.ts` |
| `stories/foundations/*` | `stories/foundations/` |
| `.storybook` (adapted) | `.storybook/` |

## Repo

https://github.com/rawon-tarento/drivestream-design-system
