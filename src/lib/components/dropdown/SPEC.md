# Dropdown

Floating menu component with keyboard navigation, positioning via Floating UI, and composable item/divider sub-components.

## Components

| Component         | Description                                       |
| ----------------- | ------------------------------------------------- |
| `Dropdown`        | Container that manages open state and positioning |
| `DropdownItem`    | Clickable menu item with optional icons           |
| `DropdownDivider` | Visual separator between item groups              |

## Props

### Dropdown

| Prop                  | Type                            | Default          | Description                                              |
| --------------------- | ------------------------------- | ---------------- | -------------------------------------------------------- |
| `open`                | `boolean` (bindable)            | `false`          | Controls open state                                      |
| `placement`           | `Placement` (Floating UI)       | `'bottom-start'` | Preferred menu placement                                 |
| `offset`              | `number`                        | `4`              | Pixel gap between trigger and menu                       |
| `width`               | `'auto' \| 'trigger' \| number` | `'auto'`         | Menu width strategy                                      |
| `fullWidth`           | `boolean`                       | `false`          | Makes the dropdown container and trigger fill 100% width |
| `closeOnSelect`       | `boolean`                       | `true`           | Close menu when a menu item is clicked                   |
| `closeOnClickOutside` | `boolean`                       | `true`           | Close menu on outside click                              |
| `closeOnEscape`       | `boolean`                       | `true`           | Close menu on Escape key                                 |
| `disabled`            | `boolean`                       | `false`          | Disables the trigger                                     |
| `trigger`             | `Snippet<[{ open: boolean }]>`  | required         | Trigger element; receives `open` state                   |
| `children`            | `Snippet`                       | required         | Menu content (DropdownItem, DropdownDivider, etc.)       |

Extends `HTMLAttributes<HTMLDivElement>`.

### DropdownItem

| Prop           | Type      | Default     | Description                        |
| -------------- | --------- | ----------- | ---------------------------------- |
| `disabled`     | `boolean` | `false`     | Disables the item                  |
| `destructive`  | `boolean` | `false`     | Applies destructive/danger styling |
| `selected`     | `boolean` | `false`     | Marks item as currently selected   |
| `children`     | `Snippet` | required    | Item label content                 |
| `leadingIcon`  | `Snippet` | `undefined` | Icon rendered before the label     |
| `trailingIcon` | `Snippet` | `undefined` | Icon rendered after the label      |

Extends `HTMLButtonAttributes`.

### DropdownDivider

No additional props. Extends `HTMLAttributes<HTMLDivElement>`.

## Usage

### Basic

```svelte
<script>
	import {
		Dropdown,
		DropdownItem,
		DropdownDivider,
		Button,
		ChevronDownIcon
	} from '@xsimjo/design-system';
</script>

<Dropdown>
	{#snippet trigger({ open })}
		<Button>
			Options <ChevronDownIcon />
		</Button>
	{/snippet}

	<DropdownItem>Edit</DropdownItem>
	<DropdownItem>Duplicate</DropdownItem>
	<DropdownDivider />
	<DropdownItem destructive>Delete</DropdownItem>
</Dropdown>
```

### With Bindable Open State

```svelte
<Dropdown bind:open>
	{#snippet trigger({ open })}
		<Button active={open}>Menu</Button>
	{/snippet}
	<DropdownItem>Item</DropdownItem>
</Dropdown>
```

### With Icons

```svelte
<DropdownItem>
	{#snippet leadingIcon()}<EditIcon />{/snippet}
	Edit
</DropdownItem>
<DropdownItem>
	{#snippet leadingIcon()}<TrashIcon />{/snippet}
	{#snippet trailingIcon()}<CheckIcon />{/snippet}
	Delete
</DropdownItem>
```

### With Selected Item

```svelte
<DropdownItem selected>Active option</DropdownItem>
```

### Custom Width

```svelte
<Dropdown width="trigger">...</Dropdown>
<Dropdown width={240}>...</Dropdown>
```

## Accessibility

- Trigger uses `aria-haspopup="menu"` and `aria-expanded`
- Menu uses `role="menu"` with `aria-labelledby` pointing to the trigger
- Items use `role="menuitem"` with `aria-disabled` for disabled state
- Full keyboard navigation: Arrow Up/Down, Home, End, Escape, Tab
- Focus returns to trigger on close via Escape

## Tokens

This component uses the following component tokens:

- `--dropdown-surface` - Menu background color
- `--dropdown-surface-foreground` - Menu text color
- `--dropdown-border` - Menu border color
- `--dropdown-border-width` - Menu border thickness
- `--dropdown-border-radius` - Menu border radius
- `--dropdown-shadow` - Menu drop shadow
- `--dropdown-padding` - Inner padding of menu container
- `--dropdown-min-width` - Minimum menu width
- `--dropdown-max-height` - Maximum menu height before scrolling
- `--dropdown-item-height` - Minimum height of each item
- `--dropdown-item-padding-x` - Horizontal padding of each item
- `--dropdown-item-padding-y` - Vertical padding of each item
- `--dropdown-item-gap` - Gap between icon and label
- `--dropdown-item-font-size` - Item font size
- `--dropdown-item-font-weight` - Item font weight
- `--dropdown-item-border-radius` - Item border radius
- `--dropdown-item-hover-bg` - Item background on hover
- `--dropdown-item-active-bg` - Item background on active/press
- `--dropdown-item-selected-bg` - Selected item background
- `--dropdown-item-selected-hover-bg` - Selected item background on hover
- `--dropdown-item-selected-color` - Selected item text color
- `--dropdown-item-line-height` - Item line height
- `--dropdown-item-disabled-opacity` - Opacity for disabled items
- `--dropdown-item-destructive-color` - Text color for destructive items
- `--dropdown-item-destructive-hover-bg` - Hover background for destructive items
- `--dropdown-item-destructive-active-bg` - Active/pressed background for destructive items
- `--dropdown-divider-color` - Divider line color
- `--dropdown-divider-margin` - Vertical margin around divider
- `--dropdown-transition` - Animation timing
- `--dropdown-z-index` - Z-index for the floating menu
- `--dropdown-enter-offset` - Transform offset for enter animation
