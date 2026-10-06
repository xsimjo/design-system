# Highlight

Inline emphasis for the few words a reader must not miss, such as a price or a limit. Renders a `<mark>`, so the emphasis is also announced by screen readers that support it.

## Props

| Prop       | Type                | Default   | Description                                      |
| ---------- | ------------------- | --------- | ------------------------------------------------ |
| `variant`  | `'solid' \| 'soft'` | `'solid'` | `solid` inverts the text; `soft` tints behind it |
| `children` | `Snippet`           | required  | The highlighted text                             |

## Usage

```svelte
<script>
	import { Highlight, Typography } from '@xsimjo/design-system';
</script>

<Typography variant="h2">Dynamic codes for <Highlight>$3 a month</Highlight>.</Typography>
<Typography>No scan caps, <Highlight variant="soft">no code limits</Highlight>.</Typography>
```

Use it sparingly: one highlight per heading or paragraph. When everything is highlighted, nothing is.

## Accessibility

- Renders `<mark>`, which carries highlight semantics
- Solid uses `--ui-primary` on `--ui-primary-foreground`, the same pair as a filled button, so contrast holds in every theme
- Wrapped highlights keep their padding on each line (`box-decoration-break: clone`)

## Tokens

| Token                   | Default                             | Description               |
| ----------------------- | ----------------------------------- | ------------------------- |
| `--highlight-bg`        | `var(--ui-primary)`                 | Highlight background      |
| `--highlight-fg`        | `var(--ui-primary-foreground)`      | Highlighted text color    |
| `--highlight-padding-x` | `0.2em`                             | Horizontal padding, in em |
| `--highlight-radius`    | `calc(var(--ui-base-radius) * 0.5)` | Corner radius             |
