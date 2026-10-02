---
'@xsimjo/design-system': minor
---

**Breaking:** `--ui-base-spacing` is now `4px` (was `8px`). Every component multiplier was
doubled, so components render at the same size, but any CSS of your own that multiplies
`--ui-base-spacing`, and any custom theme that overrides it, must double its multipliers.

**Breaking:** `shiki` is no longer a peer dependency, and docs-site-only internals are no
longer shipped in `dist/internal/`. Neither was part of the public API; remove `shiki` from
your dependencies if nothing else uses it.

- Add `SegmentedControl` and `SegmentedControlItem`, with a `label` prop for the radiogroup's
  accessible name
- Add the `qr` theme (`@xsimjo/design-system/styles/themes/qr`): achromatic, flat, 4px radius
- `Button` accepts `href` and renders a link; a disabled link gets `aria-disabled="true"`
  instead of an `href`
- Add `LinkIcon`, `DownloadIcon`, `CopyIcon`, `PlusIcon`, `TrashIcon`, and `RefreshCwIcon`
- ColorPicker horizontal padding now matches Input, Select, DatePicker, and TimePicker
