# Changesets

Every PR that changes the published package adds a changeset describing the change:

```bash
npx changeset
```

Pick the bump type (`patch` for fixes, `minor` for new components or props, `major` for
breaking API or token changes) and write a one-line summary for consumers. The summary
becomes the CHANGELOG entry.

Docs-site, CI, or tooling-only changes don't need a changeset.

On merge to `main`, the release workflow opens or updates a **Version Packages** PR.
Merging that PR publishes to GitHub Packages and creates the GitHub release.
