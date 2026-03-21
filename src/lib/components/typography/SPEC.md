# Typography

Renders text with consistent typographic styles including headings, body text, labels, and inline code.

## Props

| Prop       | Type                                                                                                                                             | Default     | Description                                                    |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- | -------------------------------------------------------------- |
| `variant`  | `'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6' \| 'body-lg' \| 'body' \| 'body-sm' \| 'body-xs' \| 'label-lg' \| 'label' \| 'label-sm' \| 'code'` | `'body'`    | Typographic variant controlling size, weight, and line height  |
| `as`       | `string`                                                                                                                                         | —           | Override the rendered HTML element (defaults based on variant) |
| `color`    | `'default' \| 'muted' \| 'primary' \| 'secondary' \| 'success' \| 'danger' \| 'warning' \| 'info'`                                               | `'default'` | Text color                                                     |
| `weight`   | `'normal' \| 'medium' \| 'semibold' \| 'bold'`                                                                                                   | —           | Override the default font weight for the variant               |
| `align`    | `'left' \| 'center' \| 'right'`                                                                                                                  | —           | Text alignment                                                 |
| `truncate` | `boolean`                                                                                                                                        | `false`     | Truncate overflowing text with an ellipsis                     |
| `italic`   | `boolean`                                                                                                                                        | `false`     | Render text in italic style                                    |
| `children` | `Snippet`                                                                                                                                        | —           | Text content (required)                                        |

### Default elements per variant

| Variant                                 | HTML element  |
| --------------------------------------- | ------------- |
| `h1`–`h6`                               | `<h1>`–`<h6>` |
| `body-lg`, `body`, `body-sm`, `body-xs` | `<p>`         |
| `label-lg`, `label`, `label-sm`         | `<span>`      |
| `code`                                  | `<code>`      |

## Slots

| Slot       | Description  |
| ---------- | ------------ |
| `children` | Text content |

## Usage

### Basic

```svelte
<script>
	import { Typography } from '@xsimjo/design-system';
</script>

<Typography variant="h1">Page Title</Typography>
<Typography>Default body text</Typography>
```

### Headings

```svelte
<Typography variant="h1">Heading 1</Typography>
<Typography variant="h2">Heading 2</Typography>
<Typography variant="h3">Heading 3</Typography>
<Typography variant="h4">Heading 4</Typography>
<Typography variant="h5">Heading 5</Typography>
<Typography variant="h6">Heading 6</Typography>
```

### Body sizes

```svelte
<Typography variant="body-lg">Large body text</Typography>
<Typography variant="body">Default body text</Typography>
<Typography variant="body-sm">Small body text</Typography>
<Typography variant="body-xs">Extra-small body text</Typography>
```

### Labels

```svelte
<Typography variant="label-lg">Large label</Typography>
<Typography variant="label">Default label</Typography>
<Typography variant="label-sm">Small label</Typography>
```

### Inline code

```svelte
<Typography variant="code">const x = 42;</Typography>
```

### Colors

```svelte
<Typography color="muted">Muted text</Typography>
<Typography color="primary">Primary text</Typography>
<Typography color="danger">Danger text</Typography>
```

### Weight override

```svelte
<Typography variant="body" weight="bold">Bold body text</Typography>
```

### Alignment

```svelte
<Typography align="center">Centered text</Typography>
```

### Truncation

```svelte
<Typography truncate>This very long text will be truncated with an ellipsis</Typography>
```

### Custom element

```svelte
<Typography variant="h2" as="div">Renders as a div instead of h2</Typography>
```

## Accessibility

- Variant determines the default semantic HTML element (`h1`–`h6`, `p`, `span`, `code`)
- Use the `as` prop to override the element when the visual style and semantic meaning differ
- All standard HTML attributes are forwarded via rest props

## Tokens

This component uses the following component tokens (defined in `typography.css`):

- `--typography-color` — Default text color
- `--typography-color-muted` — Muted/dimmed text color
- `--typography-color-primary` — Primary color text
- `--typography-color-secondary` — Secondary color text
- `--typography-color-success` — Success color text
- `--typography-color-danger` — Danger color text
- `--typography-color-warning` — Warning color text
- `--typography-color-info` — Info color text
- `--typography-h1-size` — H1 font size
- `--typography-h1-weight` — H1 font weight
- `--typography-h1-leading` — H1 line height
- `--typography-h1-tracking` — H1 letter spacing
- `--typography-h2-size` — H2 font size
- `--typography-h2-weight` — H2 font weight
- `--typography-h2-leading` — H2 line height
- `--typography-h2-tracking` — H2 letter spacing
- `--typography-h3-size` — H3 font size
- `--typography-h3-weight` — H3 font weight
- `--typography-h3-leading` — H3 line height
- `--typography-h3-tracking` — H3 letter spacing
- `--typography-h4-size` — H4 font size
- `--typography-h4-weight` — H4 font weight
- `--typography-h4-leading` — H4 line height
- `--typography-h4-tracking` — H4 letter spacing
- `--typography-h5-size` — H5 font size
- `--typography-h5-weight` — H5 font weight
- `--typography-h5-leading` — H5 line height
- `--typography-h5-tracking` — H5 letter spacing
- `--typography-h6-size` — H6 font size
- `--typography-h6-weight` — H6 font weight
- `--typography-h6-leading` — H6 line height
- `--typography-h6-tracking` — H6 letter spacing
- `--typography-body-lg-size` — Large body font size
- `--typography-body-base-size` — Default body font size
- `--typography-body-sm-size` — Small body font size
- `--typography-body-xs-size` — Extra-small body font size
- `--typography-body-weight` — Body font weight
- `--typography-body-leading` — Body line height
- `--typography-label-lg-size` — Large label font size
- `--typography-label-base-size` — Default label font size
- `--typography-label-sm-size` — Small label font size
- `--typography-label-weight` — Label font weight
- `--typography-label-leading` — Label line height
- `--typography-code-font` — Code font family
- `--typography-code-bg` — Code inline background color
- `--typography-code-radius` — Code inline border radius
- `--typography-code-padding-x` — Code inline horizontal padding
- `--typography-code-padding-y` — Code inline vertical padding
- `--typography-code-size` — Code font size
- `--typography-weight-normal` — Normal weight override value
- `--typography-weight-medium` — Medium weight override value
- `--typography-weight-semibold` — Semibold weight override value
- `--typography-weight-bold` — Bold weight override value
- `--typography-font-family` — Base font family for all typography
