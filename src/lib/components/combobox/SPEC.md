# Combobox

Searchable single-select dropdown with floating-ui positioning, full keyboard navigation, and Field context integration.

## Props

| Prop          | Type                                              | Default        | Description                                                      |
| ------------- | ------------------------------------------------- | -------------- | ---------------------------------------------------------------- |
| `value`       | `string` (bindable)                               | `undefined`    | The currently selected option value                              |
| `options`     | `ComboboxOption[]`                                | required       | Array of options to display                                      |
| `placeholder` | `string`                                          | `'Search…'`    | Placeholder text in the input                                    |
| `size`        | `'sm' \| 'md' \| 'lg'`                            | `'md'`         | Controls height, padding, and font size                          |
| `fullWidth`   | `boolean`                                         | `false`        | Stretches the combobox to fill its container width               |
| `disabled`    | `boolean`                                         | `false`        | Disables the combobox; also propagated from Field context        |
| `id`          | `string`                                          | `—`            | Custom ID; falls back to Field context ID, then auto-generated   |
| `name`        | `string`                                          | `—`            | Renders a hidden `<input>` for native form submission            |
| `emptyText`   | `string`                                          | `'No results'` | Message shown when no options match the query                    |
| `filterFn`    | `(opt: ComboboxOption, query: string) => boolean` | `—`            | Custom filter function; defaults to case-insensitive label match |

## ComboboxOption Type

```typescript
interface ComboboxOption {
	value: string; // Unique option identifier
	label: string; // Display text
	disabled?: boolean; // Prevents selection; visually muted
}
```

## Usage

### Basic

```svelte
<script>
	import { Combobox } from '@xsimjo/design-system';

	const options = [
		{ value: 'ca', label: 'Canada' },
		{ value: 'us', label: 'United States' },
		{ value: 'gb', label: 'United Kingdom' }
	];

	let country = $state('');
</script>

<Combobox bind:value={country} {options} placeholder="Search countries…" />
```

### With Field

```svelte
<script>
	import { Combobox, Field, FieldLabel, FieldDescription } from '@xsimjo/design-system';
</script>

<Field>
	<FieldLabel>Country</FieldLabel>
	<Combobox bind:value={country} {options} />
	<FieldDescription>We use this to show local pricing.</FieldDescription>
</Field>
```

### Custom Filter

```svelte
<Combobox {options} filterFn={(opt, q) => opt.value.startsWith(q)} />
```

### Disabled Options

```svelte
const options = [
  { value: 'free', label: 'Free' },
  { value: 'pro', label: 'Pro' },
  { value: 'legacy', label: 'Legacy (deprecated)', disabled: true },
];

<Combobox {options} />
```

## Accessibility

- Input uses `role="combobox"`, `aria-autocomplete="list"`, `aria-haspopup="listbox"`, `aria-expanded`, `aria-controls`
- Listbox uses `role="listbox"` with `aria-labelledby`
- Options use `role="option"`, `aria-selected`, `aria-disabled`
- `aria-activedescendant` tracks the keyboard-focused option
- `aria-describedby`, `aria-required`, `aria-invalid` set from Field context

## Keyboard Navigation

| Key            | Action                                      |
| -------------- | ------------------------------------------- |
| `↓` / `↑`      | Open listbox (when closed)                  |
| `↓` / `↑`      | Move focus between options (skips disabled) |
| `Home` / `End` | Jump to first / last enabled option         |
| `Enter`        | Select the focused option                   |
| `Escape`       | Close the listbox, revert query             |
| `Tab`          | Close the listbox                           |

## Field Context Integration

When placed inside a `Field` component, Combobox automatically reads:

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

| Token                          | Default                                         | Description                    |
| ------------------------------ | ----------------------------------------------- | ------------------------------ |
| `--combobox-bg`                | `var(--ui-surface)`                             | Trigger background             |
| `--combobox-fg`                | `var(--ui-surface-foreground)`                  | Trigger text color             |
| `--combobox-border`            | `var(--ui-border)`                              | Default border color           |
| `--combobox-border-width`      | `var(--ui-border-width)`                        | Border thickness               |
| `--combobox-placeholder`       | `color-mix(…fg 55% transparent)`                | Placeholder text color         |
| `--combobox-focus-color`       | `var(--ui-primary)`                             | Border color when focused/open |
| `--combobox-focus-ring-width`  | `var(--ui-ring-width)`                          | Focus ring width               |
| `--combobox-focus-ring-offset` | `var(--ui-ring-offset)`                         | Focus ring offset              |
| `--combobox-error-color`       | `var(--ui-danger)`                              | Border color in error state    |
| `--combobox-disabled-bg`       | `color-mix(…neutral 80% transparent)`           | Background when disabled       |
| `--combobox-disabled-fg`       | `color-mix(…fg 50% transparent)`                | Text color when disabled       |
| `--combobox-disabled-border`   | `var(--ui-border)`                              | Border color when disabled     |
| `--combobox-hover-border`      | `color-mix(…border+hover-mix hover-amount)`     | Border color on hover          |
| `--combobox-font-family`       | `var(--ui-font-sans)`                           | Font family                    |
| `--combobox-font-weight`       | `var(--ui-weight-normal)`                       | Font weight                    |
| `--combobox-border-radius`     | `var(--ui-base-radius)`                         | Corner roundness               |
| `--combobox-transition`        | `var(--ui-base-duration) var(--ui-base-easing)` | Transition                     |
| `--combobox-chevron-size`      | `calc(var(--ui-base-spacing) * 2)`              | Chevron icon size              |
| `--combobox-chevron-color`     | `color-mix(…fg 35% transparent)`                | Chevron icon color             |

### Sizes

| Token                         | SM                  | MD                    | LG                  |
| ----------------------------- | ------------------- | --------------------- | ------------------- |
| `--combobox-{size}-height`    | `32px`              | `40px`                | `48px`              |
| `--combobox-{size}-padding-x` | `12px`              | `16px`                | `24px`              |
| `--combobox-{size}-font-size` | `var(--ui-text-sm)` | `var(--ui-text-base)` | `var(--ui-text-lg)` |

### Listbox

| Token                             | Default                                | Description                         |
| --------------------------------- | -------------------------------------- | ----------------------------------- |
| `--combobox-listbox-bg`           | `var(--ui-surface-overlay)`            | Listbox background                  |
| `--combobox-listbox-fg`           | `var(--ui-surface-overlay-foreground)` | Listbox text color                  |
| `--combobox-listbox-border`       | `var(--ui-border)`                     | Listbox border color                |
| `--combobox-listbox-shadow`       | `var(--ui-depth)`                      | Listbox box shadow                  |
| `--combobox-listbox-padding`      | `calc(var(--ui-base-spacing) * 0.5)`   | Inner padding around options        |
| `--combobox-listbox-max-height`   | `calc(var(--ui-base-spacing) * 40)`    | Maximum height before scroll        |
| `--combobox-listbox-z-index`      | `var(--ui-z-overlay)`                  | Z-index of the floating listbox     |
| `--combobox-listbox-enter-offset` | `var(--ui-enter-offset)`               | Transform offset for open animation |

### Options

| Token                                 | Default                               | Description                         |
| ------------------------------------- | ------------------------------------- | ----------------------------------- |
| `--combobox-option-height`            | `calc(var(--ui-base-spacing) * 5)`    | Minimum option height               |
| `--combobox-option-padding-x`         | `calc(var(--ui-base-spacing) * 1.5)`  | Horizontal option padding           |
| `--combobox-option-font-size`         | `var(--ui-text-sm)`                   | Option font size                    |
| `--combobox-option-border-radius`     | `calc(var(--ui-base-radius) * 0.5)`   | Option corner roundness             |
| `--combobox-option-hover-bg`          | `color-mix(…neutral 90% transparent)` | Hover / keyboard-focus background   |
| `--combobox-option-selected-bg`       | `color-mix(…primary 90% transparent)` | Selected option background          |
| `--combobox-option-selected-hover-bg` | `color-mix(…primary 84% transparent)` | Selected option background on hover |
| `--combobox-option-selected-fg`       | `var(--ui-primary)`                   | Selected option text color          |
| `--combobox-option-check-size`        | `calc(var(--ui-base-spacing) * 2)`    | Checkmark icon size                 |
| `--combobox-option-disabled-opacity`  | `0.5`                                 | Opacity for disabled options        |
