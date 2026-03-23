# Input

Text input component with icon support, clearable option, full-width support, and deep Field context integration for accessible form composition.

## Props

| Prop        | Type               | Default     | Description                                                      |
| ----------- | ------------------ | ----------- | ---------------------------------------------------------------- |
| `value`     | `string \| number` | `''`        | Bindable input value                                             |
| `fullWidth` | `boolean`          | `false`     | Stretches input to 100% width                                    |
| `disabled`  | `boolean`          | `false`     | Disables interaction; also inherited from parent `Field` context |
| `id`        | `string`           | `undefined` | Custom ID; auto-set from `Field` context if omitted              |
| `icon`      | `Snippet`          | `undefined` | Icon snippet rendered on the left side of the input              |
| `clearable` | `boolean`          | `false`     | Shows a clear button when the input has a value                  |
| `onclear`   | `() => void`       | `undefined` | Optional callback fired when the clear button is clicked         |

Extends `HTMLInputAttributes` (excluding `value` which is redefined). All native input attributes (`type`, `placeholder`, `required`, `autocomplete`, etc.) are forwarded via `...restProps`.

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

### Full Width

```svelte
<Input fullWidth placeholder="Spans full container width" />
```

### With Icon

```svelte
<script>
	import { Input } from '@xsimjo/design-system';
	import SearchIcon from '@xsimjo/design-system/icons/SearchIcon.svelte';
</script>

<Input placeholder="Search...">
	{#snippet icon()}
		<SearchIcon size={16} />
	{/snippet}
</Input>
```

### Clearable

```svelte
<script>
	import { Input } from '@xsimjo/design-system';
	let query = $state('');
</script>

<Input bind:value={query} clearable placeholder="Type to search..." />
```

### With Icon and Clearable

```svelte
<script>
	import { Input } from '@xsimjo/design-system';
	import SearchIcon from '@xsimjo/design-system/icons/SearchIcon.svelte';
	let query = $state('');
</script>

<Input bind:value={query} clearable placeholder="Search...">
	{#snippet icon()}
		<SearchIcon size={16} />
	{/snippet}
</Input>
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
- The icon container has `aria-hidden="true"` since it is decorative
- The clear button has `aria-label="Clear input"` for screen readers
- The clear button uses `tabindex="-1"` to avoid disrupting tab flow — users can clear with keyboard via selecting all text

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
| `--input-height`            | Field height                             |
| `--input-padding-x`         | Horizontal padding                       |
| `--input-font-size`         | Font size                                |
| `--input-font-family`       | Input font family                        |
| `--input-font-weight`       | Input font weight                        |
| `--input-line-height`       | Input line height                        |
| `--input-border-radius`     | Input border radius                      |
| `--input-transition`        | Transition timing for interactive states |
| `--input-icon-color`        | Icon color                               |
| `--input-icon-size`         | Icon container size                      |
| `--input-clear-color`       | Clear button color                       |
| `--input-clear-hover-color` | Clear button hover color                 |
