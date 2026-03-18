# Checkbox

Checkbox input with checked, indeterminate, and error states. Integrates with Field context for accessible form composition.

## Props

| Prop            | Type      | Default     | Description                                                        |
| --------------- | --------- | ----------- | ------------------------------------------------------------------ |
| `checked`       | `boolean` | `false`     | Bindable checked state                                             |
| `indeterminate` | `boolean` | `false`     | Bindable indeterminate state; takes visual precedence over checked |
| `disabled`      | `boolean` | `false`     | Disables interaction; also inherited from parent `Field` context   |
| `id`            | `string`  | `undefined` | Custom ID; auto-set from `Field` context if omitted                |

Extends `HTMLInputAttributes` (excluding `checked` and `type` which are redefined). All other native input attributes are forwarded via `...restProps`.

## Context Integration

When placed inside a `<Field>`, `Checkbox` automatically:

- Reads `id` from the `Field` context and applies it as its own `id`
- Sets `aria-describedby` from any `FieldDescription` IDs registered in context
- Sets `aria-required` when the parent `Field` has `required`
- Sets `aria-invalid` when the parent `Field` has an `error`
- Inherits `disabled` state from the parent `Field`

## Usage

### Basic

```svelte
<Checkbox />
```

### Bindable State

```svelte
<script>
	import { Checkbox } from '@xsimjo/design-system';
	let accepted = $state(false);
</script>

<Checkbox bind:checked={accepted} />
```

### Indeterminate

```svelte
<Checkbox indeterminate={true} />
```

### Inside a Field

```svelte
<Field>
	<FieldLabel>Accept terms and conditions</FieldLabel>
	<Checkbox />
</Field>
```

### With Error

```svelte
<Field error="You must accept the terms to continue.">
	<FieldLabel>Accept terms</FieldLabel>
	<Checkbox />
	<FieldDescription>You must accept the terms to continue.</FieldDescription>
</Field>
```

### Disabled

```svelte
<Checkbox disabled />
<Checkbox disabled checked={true} />
```

## Accessibility

- `id` is wired automatically when inside a `Field`, so `FieldLabel`'s `for` attribute links without manual plumbing
- `aria-describedby` is composed from all `FieldDescription` IDs in context
- `aria-required` and `aria-invalid` are driven by `Field` context props
- The `indeterminate` state is set via the DOM property (not an HTML attribute), which Svelte handles correctly with `bind:indeterminate`
- Disabled state is communicated via the native `disabled` attribute

## Tokens

### Color Tokens

| Token                          | Description                                |
| ------------------------------ | ------------------------------------------ |
| `--checkbox-bg`                | Default background color                   |
| `--checkbox-border`            | Default border color                       |
| `--checkbox-border-width`      | Border thickness                           |
| `--checkbox-checked-bg`        | Background when checked or indeterminate   |
| `--checkbox-checked-border`    | Border color when checked or indeterminate |
| `--checkbox-hover-border`      | Border color on hover                      |
| `--checkbox-focus-color`       | Focus ring and border color on focus       |
| `--checkbox-focus-ring-width`  | Width of the focus ring outline            |
| `--checkbox-focus-ring-offset` | Offset of the focus ring from the border   |
| `--checkbox-error-color`       | Border and background color in error state |
| `--checkbox-disabled-bg`       | Background when disabled                   |
| `--checkbox-disabled-border`   | Border color when disabled                 |

### Size Tokens

| Token             | Description      |
| ----------------- | ---------------- |
| `--checkbox-size` | Width and height |

### Style Tokens

| Token                      | Description                              |
| -------------------------- | ---------------------------------------- |
| `--checkbox-border-radius` | Corner roundness                         |
| `--checkbox-transition`    | Transition timing for interactive states |
