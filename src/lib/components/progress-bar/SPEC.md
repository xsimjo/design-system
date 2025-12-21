# ProgressBar

A visual indicator that displays the completion progress of a task or operation.

## Props

| Prop             | Type                                         | Default     | Description                          |
| ---------------- | -------------------------------------------- | ----------- | ------------------------------------ |
| `value`          | `number`                                     | `0`         | Current progress value               |
| `max`            | `number`                                     | `100`       | Maximum value                        |
| `variant`        | `'default' \| 'success' \| 'warning' \| 'error'` | `'default'` | Color variant                        |
| `size`           | `'sm' \| 'md' \| 'lg'`                       | `'md'`      | Height variant                       |
| `indeterminate`  | `boolean`                                    | `false`     | Shows loading animation              |
| `disabled`       | `boolean`                                    | `false`     | Shows disabled styling               |
| `label`          | `string`                                     | `undefined` | Label text above the progress bar    |
| `showPercentage` | `boolean`                                    | `false`     | Shows percentage value               |
| `ariaLabel`      | `string`                                     | `undefined` | Custom accessible label              |

## Slots

This component does not use slots.

## Usage

### Basic

```svelte
<ProgressBar value={50} />
```

### With Label and Percentage

```svelte
<ProgressBar value={75} label="Upload Progress" showPercentage />
```

### Variants

```svelte
<ProgressBar value={60} variant="default" />
<ProgressBar value={100} variant="success" />
<ProgressBar value={40} variant="warning" />
<ProgressBar value={20} variant="error" />
```

### Size Variants

```svelte
<ProgressBar value={50} size="sm" />
<ProgressBar value={50} size="md" />
<ProgressBar value={50} size="lg" />
```

### Indeterminate

```svelte
<ProgressBar indeterminate label="Loading..." />
```

### Custom Max Value

```svelte
<ProgressBar value={3} max={10} label="Steps Completed" showPercentage />
```

## Accessibility

- Uses `role="progressbar"` with appropriate ARIA attributes
- Includes `aria-valuenow`, `aria-valuemin`, and `aria-valuemax`
- Supports custom `aria-label` for screen readers
- Respects `prefers-reduced-motion` for animations

## Tokens

This component uses the following semantic tokens:

- `--progress-sm-height` - Small track height
- `--progress-md-height` - Medium track height
- `--progress-lg-height` - Large track height
- `--progress-track-bg` - Track background color
- `--progress-track-bg-disabled` - Disabled track background
- `--progress-track-border-radius` - Track border radius
- `--progress-fill-bg` - Default fill color
- `--progress-fill-bg-success` - Success fill color
- `--progress-fill-bg-warning` - Warning fill color
- `--progress-fill-bg-error` - Error fill color
- `--progress-fill-bg-disabled` - Disabled fill color
- `--progress-fill-border-radius` - Fill border radius
- `--progress-transition` - Fill transition duration
- `--progress-label-gap` - Gap between label and track
- `--progress-label-font-family` - Label font family
- `--progress-label-font-size` - Label font size
- `--progress-label-font-weight` - Label font weight
- `--progress-label-line-height` - Label line height
- `--progress-label-color` - Label color
- `--progress-label-color-disabled` - Disabled label color
- `--progress-percentage-font-family` - Percentage font family
- `--progress-percentage-font-size` - Percentage font size
- `--progress-percentage-font-weight` - Percentage font weight
- `--progress-percentage-line-height` - Percentage line height
- `--progress-percentage-color` - Percentage color
- `--progress-percentage-color-disabled` - Disabled percentage color
- `--progress-opacity-disabled` - Disabled opacity
- `--progress-indeterminate-duration` - Indeterminate animation duration
