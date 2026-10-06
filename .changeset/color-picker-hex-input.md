---
'@xsimjo/design-system': minor
---

ColorPicker: the hex field accepts `#rgb`, `rgb`, `#rrggbb` and `rrggbb`, and shows the error state while the typed text is not a valid colour. The swatch is now a focusable button that opens the colour dialog with Enter or Space. The `id` moves from the trigger to the hex input, so a `FieldLabel` names the field directly; the trigger no longer has `role="group"`.
