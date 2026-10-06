---
'@xsimjo/design-system': patch
---

Fix three component defects:

- `TableHeader` and `TableCell` now accept native `<th>`/`<td>` attributes such as `colspan`, `rowspan` and `scope`.
- `Tooltip` no longer inherits `text-align`, `text-transform`, `letter-spacing`, `font-style` or `text-indent` from where it is placed.
- The `warning` `Badge` text color now meets 4.5:1 contrast in every theme (it was about 2:1 in light).
