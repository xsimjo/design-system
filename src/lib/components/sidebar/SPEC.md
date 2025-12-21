# Sidebar

A collapsible navigation panel component for application layouts.

## Props

| Prop                | Type                           | Default     | Description                           |
| ------------------- | ------------------------------ | ----------- | ------------------------------------- |
| `collapsed`         | `boolean`                      | `false`     | Whether the sidebar is collapsed      |
| `collapsible`       | `boolean`                      | `true`      | Whether the sidebar can be collapsed  |
| `showToggle`        | `boolean`                      | `true`      | Show the collapse toggle button       |
| `onCollapsedChange` | `(collapsed: boolean) => void` | `undefined` | Callback when collapsed state changes |

## Slots

| Slot      | Description                        |
| --------- | ---------------------------------- |
| `header`  | Header content (logo, title, etc.) |
| `default` | Main navigation content            |
| `footer`  | Footer content (user info, etc.)   |

## Usage

### Basic

```svelte
<Sidebar>
	<nav>
		<a href="/">Home</a>
		<a href="/about">About</a>
		<a href="/contact">Contact</a>
	</nav>
</Sidebar>
```

### With Header and Footer

```svelte
<Sidebar>
	{#snippet header()}
		<Logo />
		<span>App Name</span>
	{/snippet}

	<nav>
		<a href="/">Dashboard</a>
		<a href="/settings">Settings</a>
	</nav>

	{#snippet footer()}
		<UserProfile />
	{/snippet}
</Sidebar>
```

### Controlled Collapse

```svelte
<script>
	let collapsed = $state(false);
</script>

<Sidebar bind:collapsed onCollapsedChange={(value) => console.log('Collapsed:', value)}>
	<nav>Navigation items</nav>
</Sidebar>
```

### Without Toggle Button

```svelte
<Sidebar showToggle={false}>
	<nav>Always expanded navigation</nav>
</Sidebar>
```

### Non-Collapsible

```svelte
<Sidebar collapsible={false}>
	<nav>Fixed width navigation</nav>
</Sidebar>
```

## Accessibility

- Uses semantic `<aside>` element with `aria-label`
- Uses `<nav>` element for navigation content
- Toggle button includes `aria-label` and `aria-expanded`
- Supports keyboard interaction on toggle button

## Tokens

This component uses the following semantic tokens:

- `--sidebar-width-expanded` - Width when expanded
- `--sidebar-width-collapsed` - Width when collapsed
- `--sidebar-bg` - Background color
- `--sidebar-border` - Border color
- `--sidebar-border-width` - Border width
- `--sidebar-shadow` - Box shadow
- `--sidebar-transition` - Transition duration
- `--sidebar-header-padding-x` - Header horizontal padding
- `--sidebar-header-padding-y` - Header vertical padding
- `--sidebar-header-gap` - Header content gap
- `--sidebar-header-border` - Header border color
- `--sidebar-header-border-width` - Header border width
- `--sidebar-content-padding-x` - Content horizontal padding
- `--sidebar-content-padding-y` - Content vertical padding
- `--sidebar-content-gap` - Content item gap
- `--sidebar-footer-padding-x` - Footer horizontal padding
- `--sidebar-footer-padding-y` - Footer vertical padding
- `--sidebar-footer-border` - Footer border color
- `--sidebar-footer-border-width` - Footer border width
- `--sidebar-toggle-size` - Toggle button size
- `--sidebar-toggle-bg` - Toggle background color
- `--sidebar-toggle-bg-hover` - Toggle hover background
- `--sidebar-toggle-color` - Toggle icon color
- `--sidebar-toggle-color-hover` - Toggle hover icon color
- `--sidebar-toggle-border-radius` - Toggle border radius
- `--sidebar-toggle-icon-size` - Toggle icon size
- `--sidebar-focus-ring-color` - Focus ring color
- `--sidebar-focus-ring-width` - Focus ring width
- `--sidebar-focus-ring-offset` - Focus ring offset
- `--sidebar-cursor-default` - Default cursor
