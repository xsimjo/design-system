# Spinner

Loading indicator component with multiple sizes and color variants.

## Props

| Prop      | Type                                                             | Default     | Description                               |
| --------- | ---------------------------------------------------------------- | ----------- | ----------------------------------------- |
| `size`    | `'sm' \| 'md' \| 'lg'`                                           | `undefined` | Spinner size (defaults to 1em)            |
| `variant` | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger'` | `undefined` | Color variant (defaults to current color) |
| `label`   | `string`                                                         | `'Loading'` | Accessible label for screen readers       |

Extends `HTMLAttributes<HTMLDivElement>`.

## Usage

### Basic

```svelte
<Spinner />
```

### With Size

```svelte
<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />
```

### With Variant

```svelte
<Spinner variant="primary" size="md" />
<Spinner variant="success" size="md" />
<Spinner variant="danger" size="md" />
```

### With Custom Label

```svelte
<Spinner label="Saving changes..." />
```

### Inside a Button (loading state)

```svelte
<Button loading>Submitting...</Button>
```

## Accessibility

- Uses `role="status"` and `aria-live="polite"` for live-region announcements
- Includes a visually-hidden text label for screen readers
- Respects `prefers-reduced-motion` by slowing the animation to 2s

## Tokens

This component uses the following component tokens:

- `--spinner-sm-size` - Width/height for small size
- `--spinner-md-size` - Width/height for medium size
- `--spinner-lg-size` - Width/height for large size
- `--spinner-sm-border-width` - Border thickness for small size
- `--spinner-md-border-width` - Border thickness for medium size
- `--spinner-lg-border-width` - Border thickness for large size
- `--spinner-border-radius` - Border radius (always circular)
- `--spinner-track-color` - Track ring color
- `--spinner-color-primary` - Indicator color for primary variant
- `--spinner-color-secondary` - Indicator color for secondary variant
- `--spinner-color-success` - Indicator color for success variant
- `--spinner-color-warning` - Indicator color for warning variant
- `--spinner-color-danger` - Indicator color for danger variant
- `--spinner-duration` - Animation duration
- `--spinner-timing` - Animation timing function
