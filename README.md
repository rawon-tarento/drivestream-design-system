# @drivestream/ui

DriveStream design system — **L0 tokens** and **L1 React primitives**.

**Distribution:** GitHub only — **no npm registry**. Portal apps install a **pinned git tag** into `node_modules/@drivestream/ui`.

Repo: https://github.com/rawon-tarento/drivestream-design-system

## How portal teams consume this

In `drivestream-ops` (or any portal) `package.json`:

```json
{
  "dependencies": {
    "@drivestream/ui": "github:rawon-tarento/drivestream-design-system#v0.1.1"
  }
}
```

Then:

```bash
npm install
```

That clones this repo at the tag, runs `prepare` (builds `dist/`), and places it under:

```text
<portal>/node_modules/@drivestream/ui/
```

Use it like any package:

```ts
import "@drivestream/ui/styles.css";
import { Button, Modal, DataTable } from "@drivestream/ui";
```

Details: [`docs/consume.md`](docs/consume.md) · Updates: [`docs/versioning.md`](docs/versioning.md)

### Local sandbox (sibling clone)

```json
"@drivestream/ui": "file:../drivestream-design-system"
```

## Package layout

```text
src/
  styles/           L0 — tokens + globals (`styles.css`)
  components/       L1 — primitives + Storybook stories
  lib/utils.ts      cn()
  index.ts          public exports
stories/foundations L0 gallery
docs/               consume + versioning + inventory
```

**Out of scope for v0.1.x:** L3 shells, L4 domain, Figma Code Connect (stay in product apps until promoted).

## Develop this repo

```bash
npm install
npm run storybook          # http://localhost:6006
npm run build
npm run verify:tokens
npm run lint:tokens
```

`prepare` runs `build` so GitHub installs always produce `dist/`.

## Layers

| Layer | In this package |
|-------|-----------------|
| L0 Tokens | `src/styles/tokens/*` |
| L1 Primitives | `src/components/*` |
| L2–L4 | Product apps / later |

## Release (maintainers)

1. Land changes on `main` + Storybook check.
2. Bump `version` in `package.json`.
3. Tag: `git tag v0.1.1 && git push origin v0.1.1`
4. Portal PR bumps the `#v…` pin — that is how developers get the update.
