# Progress

A progress bar component for displaying completion status or loading state. Supports determinate and indeterminate modes, multiple sizes, and semantic color variants.

## Props

| Prop            | Type                                                                                 | Default      | Description                                     |
| --------------- | ------------------------------------------------------------------------------------ | ------------ | ----------------------------------------------- |
| `value`         | `number`                                                                             | `0`          | Current progress value                          |
| `max`           | `number`                                                                             | `100`        | Maximum value                                   |
| `size`          | `'xs' \| 'sm' \| 'md' \| 'lg'`                                                       | `'md'`       | Height of the progress bar                      |
| `variant`       | `'primary' \| 'accent' \| 'success' \| 'danger' \| 'warning' \| 'info' \| 'neutral'` | `'primary'`  | Fill color variant                              |
| `label`         | `string`                                                                             | `'Progress'` | Accessible label for screen readers             |
| `showValue`     | `boolean`                                                                            | `false`      | Display percentage text above the bar           |
| `indeterminate` | `boolean`                                                                            | `false`      | Animated indeterminate state (unknown progress) |

Extends `HTMLAttributes<HTMLDivElement>`.

## Usage

### Basic

```svelte
<Progress value={60} />
```

### With Label

```svelte
<Progress value={75} showValue label="Upload progress" />
```

### Sizes

```svelte
<Progress value={50} size="sm" />
<Progress value={50} size="md" />
<Progress value={50} size="lg" />
```

### Color Variants

```svelte
<Progress value={80} variant="success" />
<Progress value={30} variant="danger" />
<Progress value={60} variant="warning" />
<Progress value={45} variant="info" />
```

### Indeterminate

```svelte
<Progress indeterminate label="Loading content" />
```

### Custom Max

```svelte
<Progress value={3} max={10} showValue label="Step progress" />
```

## Accessibility

- Uses `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, and `aria-valuemax`
- In indeterminate mode, `aria-valuenow` is omitted to signal unknown progress
- The `label` prop maps to `aria-label` for screen reader announcements
- The `showValue` display text is marked `aria-hidden="true"` (screen readers use aria attributes instead)
- Respects `prefers-reduced-motion` by disabling fill transition and slowing the indeterminate animation

## Tokens

This component uses the following component tokens:

- `--progress-height-xs` — Track height for extra-small size
- `--progress-height-sm` — Track height for small size
- `--progress-height-md` — Track height for medium size
- `--progress-height-lg` — Track height for large size
- `--progress-border-radius` — Border radius of the track and fill
- `--progress-track-color` — Background (unfilled) track color
- `--progress-fill-primary` — Fill color for primary variant
- `--progress-fill-success` — Fill color for success variant
- `--progress-fill-danger` — Fill color for danger variant
- `--progress-fill-warning` — Fill color for warning variant
- `--progress-fill-info` — Fill color for info variant
- `--progress-fill-neutral` — Fill color for neutral variant
- `--progress-transition-duration` — Width transition duration
- `--progress-transition-easing` — Width transition easing function
- `--progress-indeterminate-duration` — Indeterminate animation duration
- `--progress-indeterminate-easing` — Indeterminate animation easing
- `--progress-indeterminate-fill-width` — Fill width during indeterminate animation
- `--progress-value-font-size` — Font size of the percentage label
- `--progress-value-color` — Text color of the percentage label
- `--progress-value-font-weight` — Font weight of the percentage label
