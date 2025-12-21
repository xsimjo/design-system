# Slider

A range input component for selecting a numeric value within a defined range.

## Props

| Prop         | Type      | Default        | Description                  |
| ------------ | --------- | -------------- | ---------------------------- |
| `value`      | `number`  | `0`            | Current value (bindable)     |
| `min`        | `number`  | `0`            | Minimum value                |
| `max`        | `number`  | `100`          | Maximum value                |
| `step`       | `number`  | `1`            | Step increment               |
| `disabled`   | `boolean` | `false`        | Disables the slider          |
| `label`      | `string`  | `undefined`    | Label text above the slider  |
| `helperText` | `string`  | `undefined`    | Helper text below the slider |
| `showValue`  | `boolean` | `false`        | Shows current value display  |
| `id`         | `string`  | auto-generated | Element ID                   |

## Slots

This component does not use slots.

## Usage

### Basic

```svelte
<Slider />
```

### Controlled

```svelte
<script>
	let volume = $state(50);
</script>

<Slider bind:value={volume} label="Volume" showValue />
```

### With Min/Max

```svelte
<Slider min={0} max={10} step={1} label="Rating" showValue />
```

### With Helper Text

```svelte
<Slider label="Brightness" helperText="Adjust the display brightness" showValue />
```

### Custom Step

```svelte
<Slider min={0} max={1} step={0.1} label="Opacity" showValue />
```

### Disabled

```svelte
<Slider disabled value={30} label="Disabled slider" />
```

## Accessibility

- Uses native `<input type="range">` for full accessibility
- Label is properly associated with input
- Helper text is linked via `aria-describedby`
- Supports keyboard navigation (Arrow keys, Home, End)
- Visual fill indicator shows current value

## Tokens

This component uses the following semantic tokens:

- `--slider-track-height` - Track height
- `--slider-track-bg` - Track background color
- `--slider-track-bg-disabled` - Disabled track background
- `--slider-track-border-radius` - Track border radius
- `--slider-fill-bg` - Fill (progress) background color
- `--slider-fill-bg-disabled` - Disabled fill background
- `--slider-thumb-size` - Thumb size
- `--slider-thumb-bg` - Thumb background color
- `--slider-thumb-bg-hover` - Thumb hover background
- `--slider-thumb-bg-active` - Thumb active background
- `--slider-thumb-bg-disabled` - Disabled thumb background
- `--slider-thumb-border` - Thumb border color
- `--slider-thumb-border-hover` - Thumb hover border color
- `--slider-thumb-border-active` - Thumb active border color
- `--slider-thumb-border-disabled` - Disabled thumb border color
- `--slider-thumb-border-width` - Thumb border width
- `--slider-thumb-border-radius` - Thumb border radius
- `--slider-thumb-shadow` - Thumb shadow
- `--slider-thumb-shadow-hover` - Thumb hover shadow
- `--slider-thumb-shadow-active` - Thumb active shadow
- `--slider-thumb-shadow-focus` - Thumb focus shadow
- `--slider-thumb-shadow-disabled` - Disabled thumb shadow
- `--slider-focus-ring-color` - Focus ring color
- `--slider-focus-ring-width` - Focus ring width
- `--slider-focus-ring-offset` - Focus ring offset
- `--slider-transition` - Transition duration
- `--slider-opacity-disabled` - Disabled opacity
- `--slider-cursor-default` - Default cursor
- `--slider-cursor-disabled` - Disabled cursor
