# Versioning & distribution (GitHub pins)

**No npm registry.** Portals depend on git tags.

## Pin format

```text
github:rawon-tarento/drivestream-design-system#v<semver>
```

Example: `#v0.1.1`

## Who does what

| Role | Action |
|------|--------|
| DS maintainer | Change UI → merge `main` → bump `package.json` `version` → `git tag vX.Y.Z` → push tag |
| Portal owner | PR that changes the `#v…` pin (and any call-site fixes) |
| Portal developers | Pull portal PR + `npm install` → new bits in `node_modules` |

## Semver

| Bump | When |
|------|------|
| **patch** | Bugfix, docs, no API/token rename |
| **minor** | New L1 / additive token / new optional prop |
| **major** | Rename/remove preferred API or breaking token change |

## Tag checklist

```bash
npm run release:check
# bump "version" in package.json to match the tag
git add -A && git commit -m "Release v0.1.1"
git tag v0.1.1
git push origin main
git push origin v0.1.1
```

Then portal:

```diff
- "@drivestream/ui": "github:rawon-tarento/drivestream-design-system#v0.1.0"
+ "@drivestream/ui": "github:rawon-tarento/drivestream-design-system#v0.1.1"
```

## Why not track main

`#main` makes every `npm install` non-reproducible. Always pin a tag (or full commit SHA for hotfixes).

## Registry later (optional)

If the org later uses GitHub Packages or npm, the package name stays `@drivestream/ui`. Until then, git tags are the release channel.
