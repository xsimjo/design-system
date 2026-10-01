# Switch

A toggle switch for boolean on/off states. Renders as a pill-shaped track with a sliding thumb. Integrates with the `Field` context for labels, descriptions, and error handling.

## Props

| Prop           | Type                  | Default | Description                                                                        |
| -------------- | --------------------- | ------- | ---------------------------------------------------------------------------------- |
| `checked`      | `boolean`             | `false` | Bindable on/off state                                                              |
| `disabled`     | `boolean`             | `false` | Prevents interaction and applies muted styling (also inherited from Field context) |
| `id`           | `string`              | —       | Custom ID; auto-generated from Field context if omitted                            |
| `...restProps` | `HTMLInputAttributes` | —       | All other native checkbox input attributes (e.g. `name`, `value`)                  |

## Context Integration

Switch reads from the `Field` context when composed inside a `<Field>` wrapper:

| Context value    | Effect                                                          |
| ---------------- | --------------------------------------------------------------- |
| `id`             | Applied to the hidden `<input>` so `FieldLabel` links correctly |
| `disabled`       | Merged with the `disabled` prop                                 |
| `error`          | Applies error styling to the track                              |
| `required`       | Sets `aria-required` on the input                               |
| `descriptionIds` | Sets `aria-describedby` on the input                            |

## Usage

### Basic

```svelte
<Switch />
<Switch checked={true} />
```

### With Label

```svelte
<Field inline>
	<Switch />
	<FieldLabel>Enable notifications</FieldLabel>
</Field>
```

### Disabled

```svelte
<Field inline disabled>
	<Switch />
	<FieldLabel>Auto-update</FieldLabel>
</Field>
```

### With Error

```svelte
<Field inline error="You must accept to continue.">
	<Switch />
	<FieldLabel>Accept terms</FieldLabel>
</Field>
```

### Bindable

```svelte
<script>
	let enabled = $state(false);
</script>

<Switch bind:checked={enabled} /><p>Status: {enabled ? 'On' : 'Off'}</p>
```

## Accessibility

- The hidden `<input type="checkbox">` is the accessible focus target and retains full browser keyboard support (Space to toggle, Tab to move focus).
- The wrapping `<label>` makes the visible track/thumb clickable without JavaScript.
- `aria-invalid` is set automatically when `Field` has an error.
- `aria-required` is set automatically when `Field` has `required`.
- `aria-describedby` links to any `FieldDescription` registered in the Field context.

## CSS Tokens

### Color Tokens

| Token                        | Default                                                                              | Description                           |
| ---------------------------- | ------------------------------------------------------------------------------------ | ------------------------------------- |
| `--switch-bg`                | `var(--ui-border)`                                                                   | Track background in off state         |
| `--switch-checked-bg`        | `var(--ui-primary)`                                                                  | Track background in on state          |
| `--switch-thumb-bg`          | `var(--ui-surface)`                                                                  | Thumb background color                |
| `--switch-hover-bg`          | `color-mix(in oklch, var(--ui-border), var(--ui-hover-mix) var(--ui-hover-amount))`  | Track background on hover (off state) |
| `--switch-checked-hover-bg`  | `color-mix(in oklch, var(--ui-primary), var(--ui-hover-mix) var(--ui-hover-amount))` | Track background on hover (on state)  |
| `--switch-focus-color`       | `var(--ui-primary)`                                                                  | Focus ring color                      |
| `--switch-focus-ring-width`  | `var(--ui-ring-width)`                                                               | Focus ring width                      |
| `--switch-focus-ring-offset` | `var(--ui-ring-offset)`                                                              | Focus ring offset                     |
| `--switch-error-bg`          | `var(--ui-danger)`                                                                   | Track background in error state       |

### Size Tokens

| Token                   | Description           |
| ----------------------- | --------------------- |
| `--switch-track-width`  | Track width           |
| `--switch-track-height` | Track height          |
| `--switch-thumb-size`   | Thumb diameter        |
| `--switch-thumb-travel` | Thumb travel distance |

### Style Tokens

| Token                    | Default                                                               | Description                    |
| ------------------------ | --------------------------------------------------------------------- | ------------------------------ |
| `--switch-border-radius` | `9999px`                                                              | Pill shape for track and thumb |
| `--switch-thumb-shadow`  | `0 1px 3px color-mix(in oklch, var(--ui-hover-mix) 25%, transparent)` | Drop shadow on thumb           |
| `--switch-transition`    | `var(--ui-base-duration) var(--ui-base-easing)`                       | Transition for track and thumb |
