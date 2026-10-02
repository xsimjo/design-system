# ColorPicker

Accessible color picker with an input-styled trigger containing a color swatch and editable hex value. Uses the native HTML color input for the picker dialog. Integrates with the Field context system for automatic label linking, error state, and ARIA attribute wiring.

## Props

| Prop           | Type                             | Default     | Description                                              |
| -------------- | -------------------------------- | ----------- | -------------------------------------------------------- |
| `value`        | `string`                         | `'#000000'` | Bindable hex color value (e.g. `'#ff5500'`)              |
| `fullWidth`    | `boolean`                        | `false`     | Stretches the component to 100% of its container         |
| `disabled`     | `boolean`                        | `false`     | Disables the picker; also inherited from `Field` context |
| `id`           | `string`                         | —           | Custom ID; auto-generated from Field context if omitted  |
| `name`         | `string`                         | —           | Name for hidden form input (included when set)           |
| `...restProps` | `HTMLAttributes<HTMLDivElement>` | —           | All other attributes spread on the root element          |

## Slots

| Slot | Description                                                                    |
| ---- | ------------------------------------------------------------------------------ |
| —    | ColorPicker has no slots; content is managed via `value` and native attributes |

## Usage

### Basic

```svelte
<script>
	import { ColorPicker } from '@xsimjo/design-system';
</script>

<ColorPicker />
```

### With Label

Wrap with `Field` and `FieldLabel`. The label links to the color input automatically via context.

```svelte
<script>
	import { Field, FieldLabel, ColorPicker } from '@xsimjo/design-system';
</script>

<Field>
	<FieldLabel>Brand Color</FieldLabel>
	<ColorPicker />
</Field>
```

### With Hint

```svelte
<script>
	import { Field, FieldLabel, FieldDescription, ColorPicker } from '@xsimjo/design-system';
	let color = $state('#3b82f6');
</script>

<Field>
	<FieldLabel>Accent Color</FieldLabel>
	<ColorPicker bind:value={color} />
	<FieldDescription>Choose your brand accent color.</FieldDescription>
</Field>
```

### With Error

Set `error` on `Field` to apply error styling to the trigger border.

```svelte
<Field error="Please select a valid brand color.">
	<FieldLabel>Brand Color</FieldLabel>
	<ColorPicker value="#ff0000" />
	<FieldDescription>Please select a valid brand color.</FieldDescription>
</Field>
```

### Disabled

```svelte
<Field disabled>
	<FieldLabel>Theme Color</FieldLabel>
	<ColorPicker value="#6366f1" />
</Field>
```

### Full Width

```svelte
<Field fullWidth>
	<FieldLabel>Background Color</FieldLabel>
	<ColorPicker fullWidth value="#10b981" />
</Field>
```

## Accessibility

- The trigger container uses `role="group"` to group the swatch and text input. It is named
  `Color picker` by default; pass `aria-label` or `aria-labelledby` to name it after the
  colour it sets, which matters as soon as a page carries more than one picker. Both are
  forwarded to the hex input as well, and `aria-label` also suffixes the input's own name
  with `hex value`.
- A `FieldLabel` cannot name the picker on its own: the group is a `<div>`, so a `<label for>`
  pointing at it is inert. Pair the label with `aria-labelledby`, or use `aria-label`.
- The text input accepts typed hex values and is the focusable element for keyboard users.
- The native `<input type="color">` is visually hidden with `aria-hidden="true"` and `tabindex="-1"` — it is triggered by clicking the swatch.
- `id` is auto-generated and shared with `Field` context so `FieldLabel` can set its `for` attribute without manual wiring.
- `aria-describedby` is automatically populated with the IDs of any `FieldDescription` children registered in the Field context.
- `aria-invalid` is set to `true` when the parent `Field` has a non-empty `error` prop.
- `disabled` state cascades from the Field context.
- Focus-within on the trigger container shows the focus ring, matching the Input component pattern.

## Tokens

This component uses the following component tokens (defined in `color-picker.css`):

### Trigger

- `--color-picker-bg` — trigger background color
- `--color-picker-fg` — trigger text color
- `--color-picker-border` — trigger border color
- `--color-picker-border-width` — trigger border width
- `--color-picker-border-radius` — trigger border radius
- `--color-picker-height` — trigger min height
- `--color-picker-padding-x` — horizontal padding
- `--color-picker-font-size` — text font size
- `--color-picker-font-family` — text font family
- `--color-picker-font-weight` — text font weight
- `--color-picker-transition` — transition for border and focus ring

### Focus

- `--color-picker-focus-color` — focus ring color
- `--color-picker-focus-ring-width` — width of the focus ring outline
- `--color-picker-focus-ring-offset` — offset of the focus ring from the border

### Error

- `--color-picker-error-color` — border and focus ring color in error state

### Disabled

- `--color-picker-disabled-bg` — background when disabled
- `--color-picker-disabled-fg` — text color when disabled
- `--color-picker-disabled-border` — border color when disabled

### Hover

- `--color-picker-hover-border` — border color on hover

### Swatch

- `--color-picker-swatch-size` — width and height of the color swatch
- `--color-picker-swatch-radius` — border radius of the swatch
- `--color-picker-swatch-shadow` — inset shadow for depth effect
