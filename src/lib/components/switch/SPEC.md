# Switch

A toggle switch for boolean on/off states. Renders as a pill-shaped track with a sliding thumb. Integrates with the `Field` context for labels, descriptions, and error handling.

## Props

| Prop           | Type                   | Default | Description                                                                        |
| -------------- | ---------------------- | ------- | ---------------------------------------------------------------------------------- |
| `checked`      | `boolean`              | `false` | Bindable on/off state                                                              |
| `size`         | `'sm' \| 'md' \| 'lg'` | `'md'`  | Controls track width, track height, and thumb size                                 |
| `disabled`     | `boolean`              | `false` | Prevents interaction and applies muted styling (also inherited from Field context) |
| `id`           | `string`               | —       | Custom ID; auto-generated from Field context if omitted                            |
| `...restProps` | `HTMLInputAttributes`  | —       | All other native checkbox input attributes (e.g. `name`, `value`)                  |

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

### Sizes

```svelte
<Switch size="sm" />
<Switch size="md" />
<Switch size="lg" />
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

| Token                        | Default                     | Description                           |
| ---------------------------- | --------------------------- | ------------------------------------- |
| `--switch-bg`                | `var(--ui-border)`          | Track background in off state         |
| `--switch-checked-bg`        | `var(--ui-primary)`         | Track background in on state          |
| `--switch-thumb-bg`          | `var(--ui-surface)`         | Thumb background color                |
| `--switch-hover-bg`          | `color-mix(…border+hover)`  | Track background on hover (off state) |
| `--switch-checked-hover-bg`  | `color-mix(…primary+hover)` | Track background on hover (on state)  |
| `--switch-focus-color`       | `var(--ui-primary)`         | Focus ring color                      |
| `--switch-focus-ring-width`  | `var(--ui-ring-width)`      | Focus ring width                      |
| `--switch-focus-ring-offset` | `var(--ui-ring-offset)`     | Focus ring offset                     |
| `--switch-error-bg`          | `var(--ui-danger)`          | Track background in error state       |

### Size Tokens

| Token                      | Default | Description                       |
| -------------------------- | ------- | --------------------------------- |
| `--switch-track-width-sm`  | `28px`  | Track width for sm                |
| `--switch-track-height-sm` | `16px`  | Track height for sm               |
| `--switch-thumb-size-sm`   | `12px`  | Thumb diameter for sm             |
| `--switch-thumb-travel-sm` | `12px`  | Thumb translation distance for sm |
| `--switch-track-width-md`  | `36px`  | Track width for md                |
| `--switch-track-height-md` | `20px`  | Track height for md               |
| `--switch-thumb-size-md`   | `16px`  | Thumb diameter for md             |
| `--switch-thumb-travel-md` | `16px`  | Thumb translation distance for md |
| `--switch-track-width-lg`  | `44px`  | Track width for lg                |
| `--switch-track-height-lg` | `24px`  | Track height for lg               |
| `--switch-thumb-size-lg`   | `20px`  | Thumb diameter for lg             |
| `--switch-thumb-travel-lg` | `20px`  | Thumb translation distance for lg |

### Style Tokens

| Token                    | Default                                         | Description                    |
| ------------------------ | ----------------------------------------------- | ------------------------------ |
| `--switch-border-radius` | `9999px`                                        | Pill shape for track and thumb |
| `--switch-thumb-shadow`  | `0 1px 3px oklch(0% 0 0 / 0.25)`                | Drop shadow on thumb           |
| `--switch-transition`    | `var(--ui-base-duration) var(--ui-base-easing)` | Transition for track and thumb |
