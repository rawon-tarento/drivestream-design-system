# Design system inventory (@drivestream/ui)

**Status:** v0.1.1 — extracted from drivestream-ops prototype  
**Gallery:** `npm run storybook`  
**Package:** `@drivestream/ui`  
**Install:** GitHub tag pin (no npm registry) — see [`consume.md`](./consume.md)

## L0 — Tokens

| Path | Role |
|------|------|
| `src/styles/tokens/primitives.css` | Palette, type scale, radii, shadows |
| `src/styles/tokens/semantic-ops.css` | Ops semantic aliases |
| `src/styles/tokens/theme.css` | Tailwind `@theme` bridge |
| `src/styles/tokens/manifest.json` | Verify inventory |
| `src/styles/globals-base.css` | Semantic utilities |
| `src/styles/index.css` | Package CSS entry (`@drivestream/ui/styles.css`) |

**Verify:** `npm run verify:tokens` · **Lint:** `npm run lint:tokens`

## L1 — Primitives

Every L1 has a Storybook story under **L1/**.

| Component | File | Preferred API (summary) |
|-----------|------|-------------------------|
| Button | `button.tsx` | `variant`: primary \| secondary \| ghost \| critical \| critical-soft \| success \| success-soft · `size`: sm \| md \| lg \| icon |
| Badge | `badge.tsx` | `variant` · `appearance` filled \| outlined · `size` |
| Input | `input.tsx` | `variant`: default \| error · sizes · adornments |
| Textarea | `textarea.tsx` | same field language as Input |
| PasswordInput | `password-input.tsx` | `variant` / `aria-invalid` — not `hasError` |
| Select | `select.tsx` | native select + `onValueChange` |
| Checkbox | `checkbox.tsx` | checked / indeterminate |
| Label | `label.tsx` | `required` → `*` |
| Card | `card.tsx` | `variant` · `elevation` · `interactive` · `padded` |
| InlineDetailRow | `inline-detail-row.tsx` | `size` · `layout` · `valueWeight` |
| ReadOnlyDetailTable | `read-only-detail-table.tsx` | `density` · mono rows |
| DataTable | `data-table.tsx` | density · header/body/row/cell |
| Separator | `separator.tsx` | horizontal \| vertical |
| Skeleton | `skeleton.tsx` | block \| text \| circle |
| Spinner | `spinner.tsx` | sm \| md \| lg |
| Alert | `alert.tsx` | `variant` · `appearance` · dismiss |
| Switch | `switch.tsx` | sm \| md |
| Tabs | `tabs.tsx` | underline \| soft |
| Tooltip | `tooltip.tsx` | Provider + Trigger + Content |
| Modal | `modal.tsx` | Root / Trigger / Content (`size`) / Header / Body / Footer |
| Dialog | `dialog.tsx` | Modal aliases — prefer Modal |
| DropdownMenu | `dropdown-menu.tsx` | Trigger / Content / Item |

## Not in this package (v0.1)

- L3 shells (`WorkspacePage`, `AppSidebar`, wizard chrome)
- L4 domain components
- Figma `.figma.ts` Code Connect maps (remain in product apps until bridge lands here)

## Change control

New L1 requires: inventory row, Storybook story, `verify:tokens` / `lint:tokens`, semver bump.
