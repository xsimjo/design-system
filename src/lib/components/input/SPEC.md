# Input

A form control for text input with support for labels, helper text, and icons.

## Props

| Prop         | Type                   | Default     | Description                     |
| ------------ | ---------------------- | ----------- | ------------------------------- |
| `value`      | `string`               | `''`        | The input value (bindable)      |
| `size`       | `'sm' \| 'md' \| 'lg'` | `'md'`      | Size variant                    |
| `disabled`   | `boolean`              | `false`     | Disables the input              |
| `readonly`   | `boolean`              | `false`     | Makes the input read-only       |
| `error`      | `boolean`              | `false`     | Shows error styling             |
| `success`    | `boolean`              | `false`     | Shows success styling           |
| `label`      | `string`               | `undefined` | Label text above the input      |
| `helperText` | `string`               | `undefined` | Helper text below the input     |
| `id`         | `string`               | auto-generated | Input element ID             |

## Slots

| Slot        | Description                |
| ----------- | -------------------------- |
| `iconLeft`  | Icon displayed on the left |
| `iconRight` | Icon displayed on the right |

## Usage

### Basic

```svelte
<Input placeholder="Enter your name" />
```

### With Label and Helper Text

```svelte
<Input label="Email" helperText="We'll never share your email" type="email" />
```

### Controlled

```svelte
<script>
	let value = $state('');
</script>

<Input bind:value label="Username" />
<p>You entered: {value}</p>
```

### Size Variants

```svelte
<Input size="sm" placeholder="Small" />
<Input size="md" placeholder="Medium" />
<Input size="lg" placeholder="Large" />
```

### With Icons

```svelte
<Input placeholder="Search...">
	{#snippet iconLeft()}
		<SearchIcon size={16} />
	{/snippet}
</Input>

<Input placeholder="Email">
	{#snippet iconRight()}
		<MailIcon size={16} />
	{/snippet}
</Input>
```

### States

```svelte
<Input error label="Email" helperText="Invalid email address" />
<Input success label="Username" helperText="Username is available" />
<Input disabled label="Disabled" value="Cannot edit" />
<Input readonly label="Read-only" value="Read only value" />
```

## Accessibility

- Uses native `<input>` element
- Label is properly associated with input via `for` attribute
- Helper text is linked via `aria-describedby`
- Error state uses `aria-invalid`
- Icons are decorative and hidden from screen readers

## Tokens

This component uses the following semantic tokens:

- `--input-bg` - Background color
- `--input-bg-disabled` - Disabled background color
- `--input-bg-readonly` - Readonly background color
- `--input-border` - Border color
- `--input-border-hover` - Hover border color
- `--input-border-focus` - Focus border color
- `--input-border-disabled` - Disabled border color
- `--input-border-error` - Error border color
- `--input-border-success` - Success border color
- `--input-border-width` - Border width
- `--input-border-radius` - Border radius
- `--input-text` - Text color
- `--input-text-placeholder` - Placeholder color
- `--input-text-disabled` - Disabled text color
- `--input-font-family` - Font family
- `--input-font-weight` - Font weight
- `--input-line-height` - Line height
- `--input-sm-height` - Small height
- `--input-sm-padding-x` - Small horizontal padding
- `--input-sm-padding-y` - Small vertical padding
- `--input-sm-font-size` - Small font size
- `--input-sm-icon-size` - Small icon size
- `--input-sm-icon-gap` - Small icon gap
- `--input-md-height` - Medium height
- `--input-md-padding-x` - Medium horizontal padding
- `--input-md-padding-y` - Medium vertical padding
- `--input-md-font-size` - Medium font size
- `--input-md-icon-size` - Medium icon size
- `--input-md-icon-gap` - Medium icon gap
- `--input-lg-height` - Large height
- `--input-lg-padding-x` - Large horizontal padding
- `--input-lg-padding-y` - Large vertical padding
- `--input-lg-font-size` - Large font size
- `--input-lg-icon-size` - Large icon size
- `--input-lg-icon-gap` - Large icon gap
- `--input-shadow` - Box shadow
- `--input-shadow-hover` - Hover shadow
- `--input-shadow-focus` - Focus shadow
- `--input-shadow-disabled` - Disabled shadow
- `--input-shadow-error` - Error shadow
- `--input-transition` - Transition duration
- `--input-focus-ring-color` - Focus ring color
- `--input-focus-ring-error` - Error focus ring color
- `--input-focus-ring-success` - Success focus ring color
- `--input-focus-ring-width` - Focus ring width
- `--input-focus-ring-offset` - Focus ring offset
- `--input-label-gap` - Gap between label and input
- `--input-label-font-family` - Label font family
- `--input-label-font-weight` - Label font weight
- `--input-label-font-size-sm` - Small label font size
- `--input-label-font-size-md` - Medium label font size
- `--input-label-font-size-lg` - Large label font size
- `--input-label-color` - Label color
- `--input-label-color-disabled` - Disabled label color
- `--input-label-color-error` - Error label color
- `--input-helper-gap` - Gap between input and helper
- `--input-helper-font-size-sm` - Small helper font size
- `--input-helper-font-size-md` - Medium helper font size
- `--input-helper-font-size-lg` - Large helper font size
- `--input-helper-color` - Helper text color
- `--input-helper-color-error` - Error helper color
- `--input-helper-color-success` - Success helper color
- `--input-icon-color` - Icon color
- `--input-icon-color-disabled` - Disabled icon color
- `--input-opacity-disabled` - Disabled opacity
- `--input-cursor-default` - Default cursor
- `--input-cursor-disabled` - Disabled cursor
- `--input-cursor-readonly` - Readonly cursor
