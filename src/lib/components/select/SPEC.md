# Select

A dropdown component for selecting a single option from a list.

## Props

| Prop           | Type                       | Default              | Description                        |
| -------------- | -------------------------- | -------------------- | ---------------------------------- |
| `value`        | `string \| number \| null` | `null`               | Selected value (bindable)          |
| `placeholder`  | `string`                   | `'Select an option'` | Placeholder text                   |
| `disabled`     | `boolean`                  | `false`              | Disables the select                |
| `error`        | `boolean \| string`        | `false`              | Shows error state or error message |
| `size`         | `'sm' \| 'md' \| 'lg'`     | `'md'`               | Size variant                       |
| `label`        | `string`                   | `undefined`          | Label text above the select        |
| `helperText`   | `string`                   | `undefined`          | Helper text below the select       |
| `searchable`   | `boolean`                  | `false`              | Enables search functionality       |
| `options`      | `SelectOption[]`           | `[]`                 | Array of selectable options        |
| `emptyMessage` | `string`                   | `'No options'`       | Message when no options match      |
| `id`           | `string`                   | auto-generated       | Element ID                         |

### SelectOption Interface

```typescript
interface SelectOption {
	value: string | number;
	label: string;
	disabled?: boolean;
}
```

## Slots

This component does not use slots. Options are passed via the `options` prop.

## Usage

### Basic

```svelte
<Select
	options={[
		{ value: 'apple', label: 'Apple' },
		{ value: 'banana', label: 'Banana' },
		{ value: 'cherry', label: 'Cherry' }
	]}
/>
```

### Controlled

```svelte
<script>
	let selected = $state(null);
</script>

<Select
	bind:value={selected}
	label="Favorite Fruit"
	options={[
		{ value: 'apple', label: 'Apple' },
		{ value: 'banana', label: 'Banana' }
	]}
/>
```

### With Searchable

```svelte
<Select searchable label="Country" options={countries} placeholder="Search countries..." />
```

### With Disabled Options

```svelte
<Select
	options={[
		{ value: 'available', label: 'Available' },
		{ value: 'unavailable', label: 'Unavailable', disabled: true }
	]}
/>
```

### Error State

```svelte
<Select error="Please select an option" label="Category" options={categories} />
```

### Size Variants

```svelte
<Select size="sm" {options} />
<Select size="md" {options} />
<Select size="lg" {options} />
```

## Accessibility

- Uses `role="combobox"` with proper ARIA attributes
- Dropdown uses `role="listbox"` with `role="option"` for items
- Supports keyboard navigation (ArrowUp, ArrowDown, Home, End, Enter, Escape)
- Selected option indicated with checkmark and `aria-selected`
- Focus is managed within the dropdown when open

## Tokens

This component uses the following semantic tokens:

- `--select-font-family` - Font family
- `--select-font-weight` - Font weight
- `--select-line-height` - Line height
- `--select-sm-height` - Small height
- `--select-sm-padding-x` - Small horizontal padding
- `--select-sm-padding-y` - Small vertical padding
- `--select-sm-font-size` - Small font size
- `--select-sm-icon-size` - Small icon size
- `--select-sm-icon-gap` - Small icon gap
- `--select-md-height` - Medium height
- `--select-md-padding-x` - Medium horizontal padding
- `--select-md-padding-y` - Medium vertical padding
- `--select-md-font-size` - Medium font size
- `--select-md-icon-size` - Medium icon size
- `--select-md-icon-gap` - Medium icon gap
- `--select-lg-height` - Large height
- `--select-lg-padding-x` - Large horizontal padding
- `--select-lg-padding-y` - Large vertical padding
- `--select-lg-font-size` - Large font size
- `--select-lg-icon-size` - Large icon size
- `--select-lg-icon-gap` - Large icon gap
- `--select-trigger-bg` - Trigger background color
- `--select-trigger-bg-disabled` - Disabled trigger background
- `--select-trigger-bg-open` - Open trigger background
- `--select-trigger-border` - Trigger border color
- `--select-trigger-border-hover` - Hover border color
- `--select-trigger-border-focus` - Focus border color
- `--select-trigger-border-disabled` - Disabled border color
- `--select-trigger-border-error` - Error border color
- `--select-trigger-border-width` - Border width
- `--select-trigger-border-radius` - Border radius
- `--select-trigger-text` - Text color
- `--select-trigger-text-placeholder` - Placeholder color
- `--select-trigger-text-disabled` - Disabled text color
- `--select-trigger-icon-color` - Icon color
- `--select-trigger-icon-color-disabled` - Disabled icon color
- `--select-trigger-shadow` - Box shadow
- `--select-trigger-shadow-hover` - Hover shadow
- `--select-trigger-shadow-focus` - Focus shadow
- `--select-trigger-shadow-disabled` - Disabled shadow
- `--select-trigger-shadow-error` - Error shadow
- `--select-dropdown-bg` - Dropdown background color
- `--select-dropdown-border` - Dropdown border color
- `--select-dropdown-border-width` - Dropdown border width
- `--select-dropdown-border-radius` - Dropdown border radius
- `--select-dropdown-shadow` - Dropdown shadow
- `--select-dropdown-padding` - Dropdown padding
- `--select-dropdown-max-height` - Maximum dropdown height
- `--select-dropdown-z-index` - Dropdown z-index
- `--select-option-bg` - Option background color
- `--select-option-bg-hover` - Option hover background
- `--select-option-bg-selected` - Selected option background
- `--select-option-bg-active` - Active option background
- `--select-option-text` - Option text color
- `--select-option-text-selected` - Selected option text color
- `--select-option-text-disabled` - Disabled option text color
- `--select-option-padding-x` - Option horizontal padding
- `--select-option-padding-y` - Option vertical padding
- `--select-option-border-radius` - Option border radius
- `--select-option-check-size` - Checkmark size
- `--select-option-check-color` - Checkmark color
- `--select-empty-padding` - Empty message padding
- `--select-empty-text` - Empty message text color
- `--select-label-gap` - Gap between label and trigger
- `--select-label-font-family` - Label font family
- `--select-label-font-weight` - Label font weight
- `--select-label-font-size-sm` - Small label font size
- `--select-label-font-size-md` - Medium label font size
- `--select-label-font-size-lg` - Large label font size
- `--select-label-color` - Label color
- `--select-label-color-disabled` - Disabled label color
- `--select-label-color-error` - Error label color
- `--select-helper-gap` - Gap between trigger and helper
- `--select-helper-font-size-sm` - Small helper font size
- `--select-helper-font-size-md` - Medium helper font size
- `--select-helper-font-size-lg` - Large helper font size
- `--select-helper-color` - Helper text color
- `--select-helper-color-error` - Error helper color
- `--select-focus-ring-color` - Focus ring color
- `--select-focus-ring-error` - Error focus ring color
- `--select-focus-ring-width` - Focus ring width
- `--select-focus-ring-offset` - Focus ring offset
- `--select-transition` - Transition duration
- `--select-opacity-disabled` - Disabled opacity
- `--select-cursor-default` - Default cursor
- `--select-cursor-disabled` - Disabled cursor
