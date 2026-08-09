# Consume @drivestream/ui (no npm registry)

Install source is **this GitHub repo**, pinned by **tag** (or commit SHA). After `npm install` in a portal, the package lives in that portal’s `node_modules/@drivestream/ui`.

## Team install (preferred)

```json
{
  "dependencies": {
    "@drivestream/ui": "github:rawon-tarento/drivestream-design-system#v0.1.1"
  }
}
```

```bash
cd drivestream-ops   # or other portal
npm install
```

Requirements:

- Read access to `rawon-tarento/drivestream-design-system` (collaborator / org).
- GitHub auth for `npm`/`git` (same as cloning private repos — `gh auth` HTTPS is fine).

Do **not** pin `#main` for shared portal work — installs would drift.

## Local sandbox

Sibling checkout:

```json
"@drivestream/ui": "file:../drivestream-design-system"
```

## Where it lands

```text
drivestream-ops/
  node_modules/@drivestream/ui/    ← installed copy (gitignored)
  package.json                     ← pin declares which tag
  app/… components/…               ← import from @drivestream/ui
```

Developers do not run this design-system repo for portal feature work. They only clone it when changing the DS itself.

## Styles

```css
@import "@drivestream/ui/styles.css";
```

or

```ts
import "@drivestream/ui/styles.css";
```

Host apps that still ship a local copy of the same tokens must migrate to this entry and drop the duplicate import.

## Components

```tsx
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalTitle,
  DataTable,
} from "@drivestream/ui";
```

## Tailwind

Class names live in the package. Ensure the host scan includes:

```text
./node_modules/@drivestream/ui/dist/**/*.{js,mjs}
```

(Tailwind v4: `@source` / content config as used by the portal.)

## Peer deps

- `react` ^19  
- `react-dom` ^19  

Radix packages are dependencies of `@drivestream/ui`.

## Getting updates

Updating this DS repo alone does **not** change portals. Bump the `#v…` pin in the portal `package.json`, open a PR, then teammates run `npm install`. See [`versioning.md`](./versioning.md).
