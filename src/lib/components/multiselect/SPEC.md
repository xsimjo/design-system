# MultiSelect

Multi-value searchable select with badge chips, floating-ui positioning, full keyboard navigation, and Field context integration.

## Props

| Prop          | Type                                                 | Default        | Description                                                       |
| ------------- | ---------------------------------------------------- | -------------- | ----------------------------------------------------------------- |
| `values`      | `string[]` (bindable)                                | `[]`           | Array of selected option values                                   |
| `options`     | `MultiSelectOption[]`                                | required       | Array of available options                                        |
| `placeholder` | `string`                                             | `'Select…'`    | Placeholder text when no values are selected                      |
| `fullWidth`   | `boolean`                                            | `false`        | Stretches the component to fill its container width               |
| `disabled`    | `boolean`                                            | `false`        | Disables the component; also propagated from Field context        |
| `id`          | `string`                                             | `—`            | Custom ID; falls back to Field context ID, then auto-generated    |
| `name`        | `string`                                             | `—`            | Renders hidden `<input name="name[]">` fields for form submission |
| `max`         | `number`                                             | `—`            | Maximum number of selectable values                               |
| `emptyText`   | `string`                                             | `'No results'` | Message shown when no options match the query                     |
| `filterFn`    | `(opt: MultiSelectOption, query: string) => boolean` | `—`            | Custom filter function; defaults to case-insensitive label match  |

## MultiSelectOption Type

```typescript
interface MultiSelectOption {
	value: string; // Unique option identifier
	label: string; // Display text
	disabled?: boolean; // Prevents selection; visually muted
}
```

## Usage

### Basic

```svelte
<script>
	import { MultiSelect } from '@xsimjo/design-system';

	const options = [
		{ value: 'svelte', label: 'Svelte' },
		{ value: 'react', label: 'React' },
		{ value: 'vue', label: 'Vue' }
	];

	let selected = $state([]);
</script>

<MultiSelect bind:values={selected} {options} placeholder="Select frameworks…" />
```

### With Field

```svelte
<script>
	import { MultiSelect, Field, FieldLabel } from '@xsimjo/design-system';
</script>

<Field>
	<FieldLabel>Frameworks</FieldLabel>
	<MultiSelect bind:values={selected} {options} />
</Field>
```

### With Max Selection

```svelte
<MultiSelect bind:values={selected} {options} max={3} />
```

### Native Form Submission

```svelte
<form>
	<MultiSelect name="tags" {options} />
	<button type="submit">Submit</button>
</form>
```

## Accessibility

- Input uses `role="combobox"`, `aria-autocomplete="list"`, `aria-haspopup="listbox"`, `aria-expanded`, `aria-controls`
- Input has `aria-label="{n} selected"` when values are selected
- Listbox uses `role="listbox"` with `aria-multiselectable="true"`
- Options use `role="option"`, `aria-selected`, `aria-disabled`
- `aria-activedescendant` tracks the keyboard-focused option
- `aria-describedby`, `aria-required`, `aria-invalid` set from Field context

## Keyboard Navigation

| Key                      | Action                                                    |
| ------------------------ | --------------------------------------------------------- |
| `↓` / `↑`                | Open listbox (when closed)                                |
| `↓` / `↑`                | Move focus between options (skips disabled)               |
| `Home` / `End`           | Jump to first / last enabled option                       |
| `Enter`                  | Toggle the focused option                                 |
| `Escape`                 | Close the listbox                                         |
| `Tab`                    | Close the listbox                                         |
| `Backspace` (empty)      | Highlight last badge for removal; second press removes it |
| `Delete` (focused badge) | Remove the focused badge                                  |
| `←` / `→`                | Navigate between focused badges                           |

## Field Context Integration

When placed inside a `Field` component, MultiSelect automatically reads:

- `id` — links the input to `FieldLabel` via `for`
- `disabled` — propagated from `Field.disabled`
- `error` — drives `aria-invalid` and error border styling
- `required` — drives `aria-required`
- `descriptionIds` — drives `aria-describedby`

## Floating UI

- **Strategy**: `fixed` (escapes overflow-hidden ancestors)
- **Placement**: `bottom-start`, flips to `top-start` when insufficient space
- **Middleware**: `offset(4)`, `flip({ padding: 8 })`, `shift({ padding: 8 })`, `size` (width matches trigger)
- **Auto-update**: recalculated on scroll/resize via `autoUpdate`

## Tokens

### Trigger

| Token                                 | Default                                         | Description                        |
| ------------------------------------- | ----------------------------------------------- | ---------------------------------- |
| `--multiselect-bg`                    | `var(--ui-surface)`                             | Trigger background                 |
| `--multiselect-fg`                    | `var(--ui-surface-foreground)`                  | Trigger text color                 |
| `--multiselect-border`                | `var(--ui-border)`                              | Default border color               |
| `--multiselect-border-width`          | `var(--ui-border-width)`                        | Border thickness                   |
| `--multiselect-placeholder`           | `color-mix(…fg 55% transparent)`                | Placeholder text color             |
| `--multiselect-focus-color`           | `var(--ui-primary)`                             | Border color when focused/open     |
| `--multiselect-focus-ring-width`      | `var(--ui-ring-width)`                          | Focus ring width                   |
| `--multiselect-focus-ring-offset`     | `var(--ui-ring-offset)`                         | Focus ring offset                  |
| `--multiselect-error-color`           | `var(--ui-danger)`                              | Border color in error state        |
| `--multiselect-disabled-bg`           | `color-mix(…neutral 80% transparent)`           | Background when disabled           |
| `--multiselect-disabled-fg`           | `color-mix(…fg 50% transparent)`                | Text color when disabled           |
| `--multiselect-disabled-border`       | `var(--ui-border)`                              | Border color when disabled         |
| `--multiselect-hover-border`          | `color-mix(…border+hover-mix hover-amount)`     | Border color on hover              |
| `--multiselect-gap`                   | `calc(var(--ui-base-spacing) * 0.75)`           | Gap between badges and input       |
| `--multiselect-font-family`           | `var(--ui-font-sans)`                           | Font family                        |
| `--multiselect-font-weight`           | `var(--ui-weight-normal)`                       | Font weight                        |
| `--multiselect-border-radius`         | `var(--ui-base-radius)`                         | Corner roundness                   |
| `--multiselect-transition`            | `var(--ui-base-duration) var(--ui-base-easing)` | Transition                         |
| `--multiselect-chevron-size`          | `calc(var(--ui-base-spacing) * 2)`              | Chevron icon size                  |
| `--multiselect-chevron-color`         | `color-mix(…fg 35% transparent)`                | Chevron icon color                 |
| `--multiselect-badge-focused-outline` | `2px solid var(--ui-primary)`                   | Outline for keyboard-focused badge |

### Sizes

| Token                      | Description        |
| -------------------------- | ------------------ |
| `--multiselect-min-height` | Min trigger height |
| `--multiselect-padding-x`  | Horizontal padding |
| `--multiselect-padding-y`  | Vertical padding   |
| `--multiselect-font-size`  | Font size          |

### Listbox

| Token                                | Default                                | Description                         |
| ------------------------------------ | -------------------------------------- | ----------------------------------- |
| `--multiselect-listbox-bg`           | `var(--ui-surface-overlay)`            | Listbox background                  |
| `--multiselect-listbox-fg`           | `var(--ui-surface-overlay-foreground)` | Listbox text color                  |
| `--multiselect-listbox-border`       | `var(--ui-border)`                     | Listbox border color                |
| `--multiselect-listbox-shadow`       | `var(--ui-depth)`                      | Listbox box shadow                  |
| `--multiselect-listbox-padding`      | `calc(var(--ui-base-spacing) * 0.5)`   | Inner padding around options        |
| `--multiselect-listbox-max-height`   | `calc(var(--ui-base-spacing) * 40)`    | Maximum height before scroll        |
| `--multiselect-listbox-z-index`      | `var(--ui-z-overlay)`                  | Z-index of the floating listbox     |
| `--multiselect-listbox-enter-offset` | `var(--ui-enter-offset)`               | Transform offset for open animation |

### Options

| Token                                    | Default                               | Description                         |
| ---------------------------------------- | ------------------------------------- | ----------------------------------- |
| `--multiselect-option-height`            | `calc(var(--ui-base-spacing) * 5)`    | Minimum option height               |
| `--multiselect-option-padding-x`         | `calc(var(--ui-base-spacing) * 1.5)`  | Horizontal option padding           |
| `--multiselect-option-font-size`         | `var(--ui-text-sm)`                   | Option font size                    |
| `--multiselect-option-border-radius`     | `calc(var(--ui-base-radius) * 0.5)`   | Option corner roundness             |
| `--multiselect-option-hover-bg`          | `color-mix(…neutral 90% transparent)` | Hover / keyboard-focus background   |
| `--multiselect-option-selected-bg`       | `color-mix(…primary 90% transparent)` | Selected option background          |
| `--multiselect-option-selected-hover-bg` | `color-mix(…primary 84% transparent)` | Selected option background on hover |
| `--multiselect-option-selected-fg`       | `var(--ui-primary)`                   | Selected option text color          |
| `--multiselect-option-check-size`        | `calc(var(--ui-base-spacing) * 2)`    | Checkmark icon size                 |
| `--multiselect-option-disabled-opacity`  | `0.5`                                 | Opacity for disabled options        |
