# Consume @drivestream/ui

## Install

```bash
npm install @drivestream/ui
# or local link while iterating
npm link @drivestream/ui
```

## Styles

In the app global CSS (after or instead of local token imports once migration is complete):

```css
@import "@drivestream/ui/styles.css";
```

Or from JS:

```ts
import "@drivestream/ui/styles.css";
```

The entry pulls Tailwind + L0 tokens + semantic utilities. Host apps that already import the same tokens must **not** double-import both copies — migrate to the package entry.

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

## Tailwind content

Components ship with Tailwind class strings. Ensure the host Tailwind scan includes the package:

```js
// example — adjust to your Tailwind v4 setup
content: [
  "./app/**/*.{ts,tsx}",
  "./components/**/*.{ts,tsx}",
  "./node_modules/@drivestream/ui/dist/**/*.{js,mjs}",
]
```

## Peer deps

- `react` ^19
- `react-dom` ^19

Radix primitives are dependencies of this package (not peers) so apps do not need to align every Radix version.
