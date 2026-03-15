# Select

Custom select field with floating-ui positioning, full keyboard navigation, and Field context integration.

## Props

| Prop          | Type                   | Default     | Description                                                          |
| ------------- | ---------------------- | ----------- | -------------------------------------------------------------------- |
| `value`       | `string` (bindable)    | `undefined` | The currently selected option value                                  |
| `options`     | `SelectOption[]`       | required    | Array of options to display in the listbox                           |
| `placeholder` | `string`               | `'Select…'` | Text shown in the trigger when no value is selected                  |
| `size`        | `'sm' \| 'md' \| 'lg'` | `'md'`      | Controls height, horizontal padding, and font size                   |
| `fullWidth`   | `boolean`              | `false`     | Stretches the select to fill its container width                     |
| `disabled`    | `boolean`              | `false`     | Disables the select; also propagated from Field context              |
| `id`          | `string`               | `—`         | Custom ID; falls back to Field context ID, then an auto-generated ID |
| `name`        | `string`               | `—`         | Renders a hidden `<input>` for native form submission                |

## SelectOption Type

```typescript
interface SelectOption {
	value: string; // Unique option identifier
	label: string; // Display text
	disabled?: boolean; // Prevents selection; visually muted
}
```

## Usage

### Basic

```svelte
<script>
	import { Select } from '@xsimjo/design-system';

	const options = [
		{ value: 'ca', label: 'Canada' },
		{ value: 'us', label: 'United States' },
		{ value: 'gb', label: 'United Kingdom' }
	];

	let country = $state('');
</script>

<Select bind:value={country} {options} placeholder="Choose a country" />
```

### With Field

```svelte
<script>
	import { Select, Field, FieldLabel, FieldDescription } from '@xsimjo/design-system';
</script>

<Field>
	<FieldLabel>Country</FieldLabel>
	<Select bind:value={country} {options} />
	<FieldDescription>We use this to show local pricing.</FieldDescription>
</Field>
```

### With Error

```svelte
<Field error="Please select a country.">
	<FieldLabel>Country</FieldLabel>
	<Select {options} placeholder="Choose a country" />
	<FieldDescription>Please select a country.</FieldDescription>
</Field>
```

### Required Field

```svelte
<Field required>
	<FieldLabel>Role</FieldLabel>
	<Select {options} placeholder="Select a role" />
</Field>
```

### Disabled Options

```svelte
const options = [
  { value: 'free',    label: 'Free' },
  { value: 'pro',     label: 'Pro' },
  { value: 'legacy',  label: 'Legacy (deprecated)', disabled: true },
];

<Select {options} />
```

### Full Width

```svelte
<Field fullWidth>
	<FieldLabel>Country</FieldLabel>
	<Select fullWidth {options} />
</Field>
```

### Native Form Submission

```svelte
<form>
	<Select name="country" {options} />
	<button type="submit">Submit</button>
</form>
```

## Accessibility

- Trigger uses `role="combobox"`, `aria-haspopup="listbox"`, `aria-expanded`, and `aria-controls`
- Listbox uses `role="listbox"` with `aria-labelledby` pointing to the trigger
- Options use `role="option"`, `aria-selected`, and `aria-disabled`
- `aria-activedescendant` on the trigger tracks the keyboard-focused option
- `aria-describedby` is set from `FieldDescription` IDs registered via context
- `aria-required` and `aria-invalid` are set from Field context
- Full keyboard navigation: Enter/Space/↓/↑ to open, ↓/↑ to navigate, Home/End to jump, Enter/Space to select, Escape to close, Tab to dismiss

## Keyboard Navigation

| Key                           | Action                                      |
| ----------------------------- | ------------------------------------------- |
| `Enter` / `Space` / `↓` / `↑` | Open the listbox                            |
| `↓` / `↑`                     | Move focus between options (skips disabled) |
| `Home` / `End`                | Jump to first / last enabled option         |
| `Enter` / `Space`             | Select the focused option                   |
| `Escape`                      | Close the listbox, return focus to trigger  |
| `Tab`                         | Close the listbox                           |

## Field Context Integration

When placed inside a `Field` component, Select automatically reads from context:

- `id` — links the trigger to `FieldLabel` via `for`
- `disabled` — propagated from `Field.disabled`
- `error` — drives `aria-invalid` and error border styling
- `required` — drives `aria-required`
- `descriptionIds` — drives `aria-describedby` from registered `FieldDescription` instances

## Floating UI

The listbox is positioned with `@floating-ui/dom`:

- **Strategy**: `fixed` (escapes overflow-hidden ancestors)
- **Placement**: `bottom-start`, flips to `top-start` when there is insufficient space below
- **Middleware**: `offset(4)`, `flip({ padding: 8 })`, `shift({ padding: 8 })`, `size` (width matches trigger)
- **Auto-update**: position is recalculated on scroll and resize via `autoUpdate`

## Tokens

### Trigger

| Token                        | Default                                         | Description                     |
| ---------------------------- | ----------------------------------------------- | ------------------------------- |
| `--select-bg`                | `var(--ui-surface)`                             | Trigger background              |
| `--select-fg`                | `var(--ui-surface-foreground)`                  | Trigger text color              |
| `--select-border`            | `var(--ui-border)`                              | Default border color            |
| `--select-border-width`      | `var(--ui-border-width)`                        | Border thickness                |
| `--select-placeholder`       | `color-mix(…55% transparent)`                   | Placeholder text color          |
| `--select-hover-border`      | `color-mix(…border+fg 25%)`                     | Border color on hover           |
| `--select-focus-color`       | `var(--ui-primary)`                             | Border and focus ring when open |
| `--select-focus-ring-width`  | `var(--ui-ring-width)`                          | Focus ring width                |
| `--select-focus-ring-offset` | `var(--ui-ring-offset)`                         | Focus ring offset               |
| `--select-error-color`       | `var(--ui-danger)`                              | Border color in error state     |
| `--select-disabled-bg`       | `color-mix(…neutral 80% transparent)`           | Background when disabled        |
| `--select-disabled-fg`       | `color-mix(…fg 50% transparent)`                | Text color when disabled        |
| `--select-chevron-size`      | `calc(var(--ui-base-spacing) * 2)`              | Chevron icon size               |
| `--select-chevron-color`     | `color-mix(…fg 35% transparent)`                | Chevron icon color              |
| `--select-border-radius`     | `var(--ui-base-radius)`                         | Corner roundness                |
| `--select-font-family`       | `var(--ui-font-sans)`                           | Trigger font family             |
| `--select-font-weight`       | `var(--ui-weight-normal)`                       | Trigger font weight             |
| `--select-disabled-border`   | `var(--ui-border)`                              | Border color when disabled      |
| `--select-transition`        | `var(--ui-base-duration) var(--ui-base-easing)` | Border and outline transition   |

### Sizes

| Token                       | SM                  | MD                    | LG                  |
| --------------------------- | ------------------- | --------------------- | ------------------- |
| `--select-{size}-height`    | `32px`              | `40px`                | `48px`              |
| `--select-{size}-padding-x` | `12px`              | `16px`                | `24px`              |
| `--select-{size}-font-size` | `var(--ui-text-sm)` | `var(--ui-text-base)` | `var(--ui-text-lg)` |

### Listbox

| Token                           | Default                                | Description                         |
| ------------------------------- | -------------------------------------- | ----------------------------------- |
| `--select-listbox-bg`           | `var(--ui-surface-overlay)`            | Listbox background                  |
| `--select-listbox-fg`           | `var(--ui-surface-overlay-foreground)` | Listbox text color                  |
| `--select-listbox-border`       | `var(--ui-border)`                     | Listbox border color                |
| `--select-listbox-shadow`       | `var(--ui-depth)`                      | Listbox box shadow                  |
| `--select-listbox-padding`      | `calc(var(--ui-base-spacing) * 0.5)`   | Inner padding around options        |
| `--select-listbox-max-height`   | `calc(var(--ui-base-spacing) * 40)`    | Maximum height before scroll        |
| `--select-listbox-z-index`      | `var(--ui-z-overlay)`                  | Z-index of the floating listbox     |
| `--select-listbox-enter-offset` | `var(--ui-enter-offset)`               | Transform offset for open animation |

### Options

| Token                               | Default                               | Description                         |
| ----------------------------------- | ------------------------------------- | ----------------------------------- |
| `--select-option-height`            | `calc(var(--ui-base-spacing) * 5)`    | Minimum option height               |
| `--select-option-padding-x`         | `calc(var(--ui-base-spacing) * 1.5)`  | Horizontal option padding           |
| `--select-option-font-size`         | `var(--ui-text-sm)`                   | Option font size                    |
| `--select-option-border-radius`     | `calc(var(--ui-base-radius) * 0.5)`   | Option corner roundness             |
| `--select-option-hover-bg`          | `color-mix(…neutral 90% transparent)` | Hover / keyboard-focus background   |
| `--select-option-selected-bg`       | `color-mix(…primary 90% transparent)` | Selected option background          |
| `--select-option-selected-hover-bg` | `color-mix(…primary 84% transparent)` | Selected option background on hover |
| `--select-option-selected-fg`       | `var(--ui-primary)`                   | Selected option text color          |
| `--select-option-check-size`        | `calc(var(--ui-base-spacing) * 2)`    | Checkmark icon size                 |
| `--select-option-disabled-opacity`  | `0.5`                                 | Opacity for disabled options        |
