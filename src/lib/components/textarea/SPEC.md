# Textarea

Accessible multi-line text input that integrates with the Field context system for automatic label linking, error state, and ARIA attribute wiring.

## Props

| Prop           | Type                                             | Default      | Description                                                              |
| -------------- | ------------------------------------------------ | ------------ | ------------------------------------------------------------------------ |
| `value`        | `string`                                         | `''`         | Bindable textarea value                                                  |
| `size`         | `'sm' \| 'md' \| 'lg'`                           | `'md'`       | Controls padding and font size                                           |
| `fullWidth`    | `boolean`                                        | `false`      | Stretches the textarea to 100% of its container                          |
| `resize`       | `'none' \| 'vertical' \| 'horizontal' \| 'both'` | `'vertical'` | Controls user resize behavior via the CSS `resize` property              |
| `disabled`     | `boolean`                                        | `false`      | Disables the textarea; also inherited from `Field` context               |
| `id`           | `string`                                         | —            | Custom ID; auto-generated from Field context if omitted                  |
| `...restProps` | `HTMLTextareaAttributes`                         | —            | All native textarea attributes (e.g. `rows`, `placeholder`, `maxlength`) |

## Slots

| Slot | Description                                                                 |
| ---- | --------------------------------------------------------------------------- |
| —    | Textarea has no slots; content is managed via `value` and native attributes |

## Usage

### Basic

```svelte
<script>
	import { Textarea } from '@xsimjo/design-system';
</script>

<Textarea placeholder="Enter your message..." />
```

### With Label and Hint

Wrap with `Field`, `FieldLabel`, and `FieldDescription`. The label is linked to the textarea automatically via context — no manual `for`/`id` wiring needed.

```svelte
<script>
	import { Field, FieldLabel, FieldDescription, Textarea } from '@xsimjo/design-system';
</script>

<Field>
	<FieldLabel>Description</FieldLabel>
	<Textarea placeholder="Describe your project..." />
	<FieldDescription>Markdown is supported.</FieldDescription>
</Field>
```

### With Error

Set `error` on `Field` to apply error styling to the textarea and turn `FieldDescription` red automatically.

```svelte
<Field error="Message is required.">
	<FieldLabel>Message</FieldLabel>
	<Textarea />
	<FieldDescription>Message is required.</FieldDescription>
</Field>
```

### Sizes

```svelte
<Field>
	<FieldLabel>Small</FieldLabel>
	<Textarea size="sm" placeholder="Small text size" />
</Field>

<Field>
	<FieldLabel>Medium</FieldLabel>
	<Textarea size="md" placeholder="Medium text size" />
</Field>

<Field>
	<FieldLabel>Large</FieldLabel>
	<Textarea size="lg" placeholder="Large text size" />
</Field>
```

### Resize Behavior

```svelte
<Textarea resize="vertical" />
<!-- default: user can drag vertically -->
<Textarea resize="none" />
<!-- fixed size -->
<Textarea resize="both" />
<!-- user can drag in any direction -->
<Textarea resize="horizontal" />
<!-- user can drag horizontally -->
```

### Controlling Height via Rows

Use the native `rows` attribute to set the initial height. The textarea also enforces `--textarea-min-height` regardless of `rows`.

```svelte
<Textarea rows={3} placeholder="Brief note..." />
<Textarea rows={8} placeholder="Longer content..." />
```

### Disabled

```svelte
<Field disabled>
	<FieldLabel>Notes</FieldLabel>
	<Textarea value="Read-only content" />
</Field>
```

### Full Width

```svelte
<Field fullWidth>
	<FieldLabel>Notes</FieldLabel>
	<Textarea fullWidth placeholder="Add your notes here..." />
</Field>
```

## Accessibility

- Renders a native `<textarea>` element for full browser and assistive technology support.
- `id` is auto-generated and shared with `Field` context so `FieldLabel` can set its `for` attribute without manual wiring.
- `aria-describedby` is automatically populated with the IDs of any `FieldDescription` children registered in the Field context.
- `aria-required` is set when the parent `Field` has `required={true}`.
- `aria-invalid` is set to `true` when the parent `Field` has a non-empty `error` prop.
- `disabled` state cascades from the Field context, so disabling the Field disables the textarea without needing a separate prop.

## Tokens

This component uses the following component tokens (defined in `textarea.css`):

### Color

- `--textarea-bg` — background color of the textarea
- `--textarea-fg` — text color
- `--textarea-border` — default border color
- `--textarea-border-width` — border thickness
- `--textarea-placeholder` — placeholder text color (muted via `color-mix`)
- `--textarea-hover-border` — border color on hover (non-focused, non-disabled)
- `--textarea-focus-color` — border and focus ring color when focused
- `--textarea-focus-ring-width` — width of the focus ring outline
- `--textarea-focus-ring-offset` — offset of the focus ring from the border edge
- `--textarea-error-color` — border color in error state
- `--textarea-disabled-bg` — background when disabled
- `--textarea-disabled-fg` — text and placeholder color when disabled
- `--textarea-disabled-border` — border color when disabled

### Size

- `--textarea-sm-padding-x` — horizontal padding for `size="sm"`
- `--textarea-sm-padding-y` — vertical padding for `size="sm"`
- `--textarea-sm-font-size` — font size for `size="sm"`
- `--textarea-md-padding-x` — horizontal padding for `size="md"`
- `--textarea-md-padding-y` — vertical padding for `size="md"`
- `--textarea-md-font-size` — font size for `size="md"`
- `--textarea-lg-padding-x` — horizontal padding for `size="lg"`
- `--textarea-lg-padding-y` — vertical padding for `size="lg"`
- `--textarea-lg-font-size` — font size for `size="lg"`

### Style

- `--textarea-min-height` — minimum height regardless of `rows` attribute
- `--textarea-border-radius` — corner roundness
- `--textarea-font-family` — font family
- `--textarea-font-weight` — text font weight
- `--textarea-line-height` — line height
- `--textarea-transition` — transition applied to border color and background color changes
