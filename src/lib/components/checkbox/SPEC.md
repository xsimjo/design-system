# Checkbox

A form control that allows users to select one or more options from a set.

## Props

| Prop            | Type                   | Default | Description                           |
| --------------- | ---------------------- | ------- | ------------------------------------- |
| `checked`       | `boolean`              | `false` | Whether the checkbox is checked       |
| `indeterminate` | `boolean`              | `false` | Shows indeterminate (mixed) state     |
| `disabled`      | `boolean`              | `false` | Disables the checkbox                 |
| `error`         | `boolean`              | `false` | Shows error styling                   |
| `size`          | `'sm' \| 'md' \| 'lg'` | `'md'`  | Size variant                          |
| `label`         | `string`               | `undefined` | Optional label text                |
| `name`          | `string`               | `undefined` | Form field name                    |
| `value`         | `string`               | `undefined` | Form field value                   |

## Slots

This component does not use slots.

## Usage

### Basic

```svelte
<Checkbox />
```

### With Label

```svelte
<Checkbox label="Accept terms and conditions" />
```

### Controlled

```svelte
<script>
	let isChecked = $state(false);
</script>

<Checkbox bind:checked={isChecked} label="Subscribe to newsletter" />
```

### Size Variants

```svelte
<Checkbox size="sm" label="Small" />
<Checkbox size="md" label="Medium" />
<Checkbox size="lg" label="Large" />
```

### Indeterminate State

```svelte
<Checkbox indeterminate label="Select all" />
```

### Error State

```svelte
<Checkbox error label="Required field" />
```

### Disabled

```svelte
<Checkbox disabled label="Disabled checkbox" />
<Checkbox disabled checked label="Disabled checked" />
```

## Accessibility

- Uses native `<input type="checkbox">` for full accessibility
- Supports `aria-checked="mixed"` for indeterminate state
- Includes `aria-invalid` for error state
- Label is properly associated with the input
- Keyboard accessible (Space to toggle)

## Tokens

This component uses the following semantic tokens:

- `--checkbox-sm-size` - Small checkbox size
- `--checkbox-md-size` - Medium checkbox size
- `--checkbox-lg-size` - Large checkbox size
- `--checkbox-sm-icon-size` - Small icon size
- `--checkbox-md-icon-size` - Medium icon size
- `--checkbox-lg-icon-size` - Large icon size
- `--checkbox-bg` - Background color
- `--checkbox-bg-checked` - Checked background color
- `--checkbox-bg-disabled` - Disabled background color
- `--checkbox-border` - Border color
- `--checkbox-border-hover` - Hover border color
- `--checkbox-border-focus` - Focus border color
- `--checkbox-border-checked` - Checked border color
- `--checkbox-border-disabled` - Disabled border color
- `--checkbox-border-error` - Error border color
- `--checkbox-border-width` - Border width
- `--checkbox-border-radius` - Border radius
- `--checkbox-icon-color` - Check icon color
- `--checkbox-icon-color-disabled` - Disabled icon color
- `--checkbox-shadow` - Box shadow
- `--checkbox-shadow-hover` - Hover box shadow
- `--checkbox-shadow-focus` - Focus box shadow
- `--checkbox-shadow-disabled` - Disabled box shadow
- `--checkbox-transition` - Transition duration
- `--checkbox-focus-ring-color` - Focus ring color
- `--checkbox-focus-ring-width` - Focus ring width
- `--checkbox-focus-ring-offset` - Focus ring offset
- `--checkbox-label-gap` - Gap between checkbox and label
- `--checkbox-label-font-family` - Label font family
- `--checkbox-label-font-weight` - Label font weight
- `--checkbox-label-font-size-sm` - Small label font size
- `--checkbox-label-font-size-md` - Medium label font size
- `--checkbox-label-font-size-lg` - Large label font size
- `--checkbox-label-color` - Label color
- `--checkbox-label-color-disabled` - Disabled label color
- `--checkbox-opacity-disabled` - Disabled opacity
- `--checkbox-cursor-default` - Default cursor
- `--checkbox-cursor-disabled` - Disabled cursor
