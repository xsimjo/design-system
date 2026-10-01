# Radio

A styled radio button for single-selection within a group. Works with Svelte's `bind:group` for group state management. Integrates with the `Field` context for labels, descriptions, and error handling.

## Props

| Prop           | Type                  | Default | Description                                                                        |
| -------------- | --------------------- | ------- | ---------------------------------------------------------------------------------- |
| `group`        | `unknown`             | —       | Bindable group value — shared across all radios in the group                       |
| `value`        | `unknown`             | —       | The value this radio represents; set on `group` when selected                      |
| `disabled`     | `boolean`             | `false` | Prevents interaction and applies muted styling (also inherited from Field context) |
| `id`           | `string`              | —       | Custom ID; auto-generated from Field context if omitted                            |
| `...restProps` | `HTMLInputAttributes` | —       | All other native input attributes (e.g. `name`)                                    |

## Context Integration

Radio reads from the `Field` context when composed inside a `<Field>` wrapper:

| Context value    | Effect                                                   |
| ---------------- | -------------------------------------------------------- |
| `id`             | Applied to the input so `FieldLabel` links to this radio |
| `disabled`       | Merged with the `disabled` prop                          |
| `error`          | Applies red border styling                               |
| `required`       | Sets `aria-required` on the input                        |
| `descriptionIds` | Sets `aria-describedby` on the input                     |

## Usage

### Basic Group

```svelte
<script>
	let selected = $state('');
</script>

<Radio bind:group={selected} value="a" name="choice" />
<Radio bind:group={selected} value="b" name="choice" />
<Radio bind:group={selected} value="c" name="choice" />
```

### With Labels

```svelte
<Field inline>
	<Radio bind:group={plan} value="free" name="plan" />
	<FieldLabel>Free</FieldLabel>
</Field>
<Field inline>
	<Radio bind:group={plan} value="pro" name="plan" />
	<FieldLabel>Pro</FieldLabel>
</Field>
```

### With Error

```svelte
<Field inline error="Please select an option.">
	<Radio bind:group={plan} value="free" name="plan" />
	<FieldLabel>Free</FieldLabel>
</Field>
```

### Disabled

```svelte
<Field inline disabled>
	<Radio bind:group={plan} value="enterprise" name="plan" />
	<FieldLabel>Enterprise (unavailable)</FieldLabel>
</Field>
```

## Accessibility

- Renders a native `<input type="radio">` for full browser and screen reader support.
- Browser handles arrow-key navigation within the radio group automatically.
- `aria-invalid` is set when the containing `Field` has an error.
- `aria-required` is set when the containing `Field` has `required`.
- `aria-describedby` links to `FieldDescription` components registered in the Field context.

## CSS Tokens

### Color Tokens

| Token                       | Default                                                                             | Description                              |
| --------------------------- | ----------------------------------------------------------------------------------- | ---------------------------------------- |
| `--radio-bg`                | `var(--ui-surface)`                                                                 | Background in unselected state           |
| `--radio-border`            | `var(--ui-border)`                                                                  | Border color in unselected state         |
| `--radio-border-width`      | `var(--ui-border-width)`                                                            | Border thickness                         |
| `--radio-checked-bg`        | `var(--ui-primary)`                                                                 | Background when selected                 |
| `--radio-checked-border`    | `var(--ui-primary)`                                                                 | Border color when selected               |
| `--radio-checked-dot`       | `var(--ui-surface)`                                                                 | Inner dot color when selected            |
| `--radio-hover-border`      | `color-mix(in oklch, var(--ui-border), var(--ui-hover-mix) var(--ui-hover-amount))` | Border color on hover                    |
| `--radio-focus-color`       | `var(--ui-primary)`                                                                 | Border and focus ring color when focused |
| `--radio-focus-ring-width`  | `var(--ui-ring-width)`                                                              | Focus ring width                         |
| `--radio-focus-ring-offset` | `var(--ui-ring-offset)`                                                             | Focus ring offset                        |
| `--radio-error-color`       | `var(--ui-danger)`                                                                  | Border and background in error state     |
| `--radio-disabled-bg`       | `color-mix(in oklch, var(--ui-neutral), transparent 80%)`                           | Background when disabled                 |
| `--radio-disabled-border`   | `var(--ui-border)`                                                                  | Border when disabled                     |

### Size Tokens

| Token                | Description      |
| -------------------- | ---------------- |
| `--radio-size`       | Diameter         |
| `--radio-dot-radius` | Inner dot radius |

### Style Tokens

| Token                | Default                                         | Description                          |
| -------------------- | ----------------------------------------------- | ------------------------------------ |
| `--radio-transition` | `var(--ui-base-duration) var(--ui-base-easing)` | Transition for border and background |
