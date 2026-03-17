# Slider

Accessible range input for selecting a numeric value within a bounded interval. Integrates with the Field context system for automatic label linking, error state, and ARIA attribute wiring.

## Props

| Prop           | Type                   | Default | Description                                                        |
| -------------- | ---------------------- | ------- | ------------------------------------------------------------------ |
| `value`        | `number`               | `0`     | Bindable slider value                                              |
| `min`          | `number`               | `0`     | Minimum selectable value                                           |
| `max`          | `number`               | `100`   | Maximum selectable value                                           |
| `step`         | `number`               | `1`     | Increment between selectable values                                |
| `size`         | `'sm' \| 'md' \| 'lg'` | `'md'`  | Controls track height and thumb size                               |
| `fullWidth`    | `boolean`              | `false` | Stretches the slider to 100% of its container                      |
| `showValue`    | `boolean`              | `false` | Displays the current numeric value beside the slider               |
| `disabled`     | `boolean`              | `false` | Disables the slider; also inherited from `Field` context           |
| `id`           | `string`               | —       | Custom ID; auto-generated from Field context if omitted            |
| `...restProps` | `HTMLInputAttributes`  | —       | All native input attributes (e.g. `name`, `oninput`, `aria-label`) |

## Slots

| Slot | Description                                                               |
| ---- | ------------------------------------------------------------------------- |
| —    | Slider has no slots; content is managed via `value` and native attributes |

## Usage

### Basic

```svelte
<script>
	import { Slider } from '@xsimjo/design-system';
</script>

<Slider />
```

### With Label

Wrap with `Field` and `FieldLabel`. The label links to the slider automatically via context — no manual `for`/`id` wiring needed.

```svelte
<script>
	import { Field, FieldLabel, Slider } from '@xsimjo/design-system';
</script>

<Field>
	<FieldLabel>Volume</FieldLabel>
	<Slider />
</Field>
```

### With Hint and Value Display

```svelte
<script>
	import { Field, FieldLabel, FieldDescription, Slider } from '@xsimjo/design-system';
	let volume = $state(40);
</script>

<Field>
	<FieldLabel>Volume</FieldLabel>
	<Slider bind:value={volume} showValue />
	<FieldDescription>Adjust the output volume.</FieldDescription>
</Field>
```

### Custom Range and Step

```svelte
<Field>
	<FieldLabel>Price limit</FieldLabel>
	<Slider min={100} max={500} step={50} value={250} showValue />
</Field>
```

### With Error

Set `error` on `Field` to apply error styling to the track fill and thumb.

```svelte
<Field error="Value must be at least 50.">
	<FieldLabel>Minimum threshold</FieldLabel>
	<Slider value={20} showValue />
	<FieldDescription>Value must be at least 50.</FieldDescription>
</Field>
```

### Sizes

```svelte
<Slider size="sm" />
<Slider size="md" />
<Slider size="lg" />
```

### Disabled

```svelte
<Field disabled>
	<FieldLabel>Coverage</FieldLabel>
	<Slider value={65} />
</Field>
```

### Full Width

```svelte
<Field fullWidth>
	<FieldLabel>Coverage</FieldLabel>
	<Slider fullWidth value={65} />
</Field>
```

## Accessibility

- Renders a native `<input type="range">` element for full browser and assistive technology support.
- The ARIA role `slider` is implicit on range inputs; browsers expose `aria-valuemin`, `aria-valuemax`, and `aria-valuenow` automatically from the `min`, `max`, and `value` attributes.
- `id` is auto-generated and shared with `Field` context so `FieldLabel` can set its `for` attribute without manual wiring.
- `aria-describedby` is automatically populated with the IDs of any `FieldDescription` children registered in the Field context.
- `aria-invalid` is set to `true` when the parent `Field` has a non-empty `error` prop.
- `disabled` state cascades from the Field context, so disabling the Field disables the slider without a separate prop.
- `aria-required` is intentionally omitted — the `slider` ARIA role does not support it.

## Fill Computation

The track fill is rendered as a CSS `linear-gradient` using the `--slider-fill-percent` custom property, computed as:

```
fillPercent = ((value - min) / (max - min)) * 100
```

This value is clamped to `[0, 100]` and set as an inline style on the input element. Firefox uses the native `::-moz-range-progress` pseudo-element for the fill instead.

## Tokens

This component uses the following component tokens (defined in `slider.css`):

### Color

- `--slider-track-bg` — unfilled track background
- `--slider-fill-color` — filled portion of the track and thumb border
- `--slider-thumb-bg` — thumb background
- `--slider-thumb-border` — thumb border color
- `--slider-focus-color` — focus ring color
- `--slider-focus-ring-width` — width of the focus ring outline
- `--slider-focus-ring-offset` — offset of the focus ring from the input edge
- `--slider-error-color` — fill and thumb border color in error state
- `--slider-disabled-track-bg` — unfilled track when disabled
- `--slider-disabled-fill-color` — filled track when disabled
- `--slider-disabled-thumb-bg` — thumb background when disabled
- `--slider-disabled-thumb-border` — thumb border when disabled
- `--slider-value-fg` — color of the value display text
- `--slider-value-font-size` — font size of the value display

### Size

- `--slider-sm-track-height` — track height for `size="sm"` (4px)
- `--slider-sm-thumb-size` — thumb diameter for `size="sm"` (16px)
- `--slider-md-track-height` — track height for `size="md"` (6px)
- `--slider-md-thumb-size` — thumb diameter for `size="md"` (20px)
- `--slider-lg-track-height` — track height for `size="lg"` (8px)
- `--slider-lg-thumb-size` — thumb diameter for `size="lg"` (24px)

### Style

- `--slider-track-radius` — track corner roundness (pill-shaped by default)
- `--slider-thumb-radius` — thumb corner roundness (circular by default)
- `--slider-thumb-shadow` — box shadow on the thumb
- `--slider-transition` — transition for thumb transform and focus ring
