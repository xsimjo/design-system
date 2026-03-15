# Input

Text input component with size variants, full-width support, and deep Field context integration for accessible form composition.

## Props

| Prop        | Type                   | Default     | Description                                                      |
| ----------- | ---------------------- | ----------- | ---------------------------------------------------------------- |
| `value`     | `string \| number`     | `''`        | Bindable input value                                             |
| `size`      | `'sm' \| 'md' \| 'lg'` | `'md'`      | Input height and font size                                       |
| `fullWidth` | `boolean`              | `false`     | Stretches input to 100% width                                    |
| `disabled`  | `boolean`              | `false`     | Disables interaction; also inherited from parent `Field` context |
| `id`        | `string`               | `undefined` | Custom ID; auto-set from `Field` context if omitted              |

Extends `HTMLInputAttributes` (excluding `value` and `size` which are redefined). All native input attributes (`type`, `placeholder`, `required`, `autocomplete`, etc.) are forwarded via `...restProps`.

## Context Integration

When placed inside a `<Field>`, `Input` automatically:

- Reads `id` from the `Field` context and applies it as its own `id`
- Sets `aria-describedby` from any `FieldDescription` IDs registered in context
- Sets `aria-required` when the parent `Field` has `required`
- Sets `aria-invalid` when the parent `Field` has an `error`
- Inherits `disabled` state from the parent `Field`

## Usage

### Basic

```svelte
<Input placeholder="Enter text..." />
```

### With Size

```svelte
<Input size="sm" placeholder="Small" />
<Input size="md" placeholder="Medium" />
<Input size="lg" placeholder="Large" />
```

### Full Width

```svelte
<Input fullWidth placeholder="Spans full container width" />
```

### Bindable Value

```svelte
<script>
	import { Input } from '@xsimjo/design-system';
	let email = $state('');
</script>

<Input type="email" bind:value={email} placeholder="jane@example.com" />
```

### Inside a Field

```svelte
<script>
	import { Field, FieldLabel, FieldDescription, Input } from '@xsimjo/design-system';
</script>

<Field required error="Please enter a valid email.">
	<FieldLabel>Email</FieldLabel>
	<Input type="email" fullWidth placeholder="jane@example.com" />
	<FieldDescription>Please enter a valid email.</FieldDescription>
</Field>
```

### Disabled

```svelte
<Input disabled value="Read-only value" />
```

## Accessibility

- `id` is wired automatically when inside a `Field`, so `FieldLabel`'s `for` attribute links without manual plumbing
- `aria-describedby` is composed from all `FieldDescription` IDs in context
- `aria-required` and `aria-invalid` are driven by `Field` context props
- Disabled state is communicated via both `disabled` attribute and `aria-disabled` patterns through the native element

## Tokens

| Token                       | Description                              |
| --------------------------- | ---------------------------------------- |
| `--input-bg`                | Input background color                   |
| `--input-fg`                | Input text color                         |
| `--input-border`            | Input border color                       |
| `--input-border-width`      | Input border thickness                   |
| `--input-placeholder`       | Placeholder text color                   |
| `--input-focus-color`       | Border and ring color on focus           |
| `--input-focus-ring-width`  | Focus ring width                         |
| `--input-focus-ring-offset` | Focus ring offset                        |
| `--input-error-color`       | Border color in error state              |
| `--input-disabled-bg`       | Background when disabled                 |
| `--input-disabled-fg`       | Text color when disabled                 |
| `--input-disabled-border`   | Border color when disabled               |
| `--input-hover-border`      | Border color on hover                    |
| `--input-sm-height`         | Height for small size                    |
| `--input-sm-padding-x`      | Horizontal padding for small size        |
| `--input-sm-font-size`      | Font size for small size                 |
| `--input-md-height`         | Height for medium size                   |
| `--input-md-padding-x`      | Horizontal padding for medium size       |
| `--input-md-font-size`      | Font size for medium size                |
| `--input-lg-height`         | Height for large size                    |
| `--input-lg-padding-x`      | Horizontal padding for large size        |
| `--input-lg-font-size`      | Font size for large size                 |
| `--input-font-family`       | Input font family                        |
| `--input-font-weight`       | Input font weight                        |
| `--input-line-height`       | Input line height                        |
| `--input-border-radius`     | Input border radius                      |
| `--input-transition`        | Transition timing for interactive states |
