# @drivestream/ui

DriveStream design system — tokens and L1 React primitives.

**Consume via GitHub pin** (no npm registry). See [docs/consume.md](./docs/consume.md).

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run storybook` | Component gallery |
| `npm run build` | ESM + `.d.ts` → `dist/` |
| `npm run prepare` | Runs on install (including `github:` deps) — builds `dist/` |
| `npm run verify:tokens` | Manifest ↔ CSS |
| `npm run lint:tokens` | No raw palette / hex in L1 |
| `npm run release:check` | verify + typecheck + build before tagging |

## Docs

- [README.md](./README.md)
- [docs/consume.md](./docs/consume.md)
- [docs/versioning.md](./docs/versioning.md)
- [docs/inventory.md](./docs/inventory.md)
