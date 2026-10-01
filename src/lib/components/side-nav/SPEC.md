# SideNav

Vertical navigation menu for sidebars. Supports collapsible groups, nested items, icons, badges, active state highlighting, and a collapsed icon-only mode. Built as a compound component with context-based parent-child coordination.

## Props

### SideNav

| Prop        | Type      | Default  | Description                                       |
| ----------- | --------- | -------- | ------------------------------------------------- |
| `collapsed` | `boolean` | `false`  | Switches to icon-only display mode                |
| `children`  | `Snippet` | required | SideNav content (SideNavItem, SideNavGroup, etc.) |

All standard `HTMLElement` attributes are forwarded to the root `<nav>` element.

### SideNavItem

| Prop       | Type      | Default     | Description                                           |
| ---------- | --------- | ----------- | ----------------------------------------------------- |
| `isActive` | `boolean` | `false`     | Highlights the item as the current page               |
| `icon`     | `Snippet` | `undefined` | Leading icon slot                                     |
| `badge`    | `Snippet` | `undefined` | Trailing badge/count slot                             |
| `disabled` | `boolean` | `false`     | Disables the item                                     |
| `href`     | `string`  | `undefined` | When provided, renders as `<a>` instead of `<button>` |
| `children` | `Snippet` | required    | Item label text                                       |

All standard `HTMLAnchorElement` and `HTMLButtonElement` attributes are forwarded.

### SideNavGroup

| Prop       | Type                      | Default     | Description                                      |
| ---------- | ------------------------- | ----------- | ------------------------------------------------ |
| `label`    | `string`                  | required    | Group heading text                               |
| `icon`     | `Snippet`                 | `undefined` | Leading icon for the group trigger               |
| `open`     | `boolean`                 | `true`      | Controls open/collapsed state. Bindable          |
| `hasRail`  | `boolean`                 | `true`      | Shows a vertical rail alongside children         |
| `ontoggle` | `(open: boolean) => void` | `undefined` | Called when the group is toggled                 |
| `disabled` | `boolean`                 | `false`     | Disables the group trigger                       |
| `children` | `Snippet`                 | required    | Group content (SideNavItem, nested SideNavGroup) |

All standard `HTMLDivElement` attributes are forwarded to the root `<div>` element.

### SideNavLabel

| Prop       | Type      | Default  | Description |
| ---------- | --------- | -------- | ----------- |
| `children` | `Snippet` | required | Label text  |

All standard `HTMLParagraphElement` attributes are forwarded.

### SideNavDivider

No custom props. All standard `HTMLHRElement` attributes are forwarded.

## Snippets

### SideNavItem

| Snippet    | Description                                          |
| ---------- | ---------------------------------------------------- |
| `icon`     | Optional. Leading icon, rendered at 18px recommended |
| `badge`    | Optional. Trailing content like Badge or count       |
| `children` | Required. Item label text                            |

### SideNavGroup

| Snippet    | Description                                                |
| ---------- | ---------------------------------------------------------- |
| `icon`     | Optional. Leading icon for the group trigger               |
| `children` | Required. Group content (SideNavItem, nested SideNavGroup) |

## Usage Examples

### Basic navigation

```svelte
<SideNav>
	<SideNavItem href="/dashboard">Dashboard</SideNavItem>
	<SideNavItem href="/projects">Projects</SideNavItem>
	<SideNavItem href="/settings">Settings</SideNavItem>
</SideNav>
```

### With icons

```svelte
<SideNav>
	<SideNavItem href="/dashboard">
		{#snippet icon()}<HomeIcon size={18} />{/snippet}
		Dashboard
	</SideNavItem>
	<SideNavItem href="/settings">
		{#snippet icon()}<SettingsIcon size={18} />{/snippet}
		Settings
	</SideNavItem>
</SideNav>
```

### Collapsible groups

```svelte
<SideNav>
	<SideNavGroup label="Analytics">
		{#snippet icon()}<BarChartIcon size={18} />{/snippet}
		<SideNavItem href="/analytics/overview">Overview</SideNavItem>
		<SideNavItem href="/analytics/reports">Reports</SideNavItem>
	</SideNavGroup>
</SideNav>
```

### Nested groups

```svelte
<SideNav>
	<SideNavGroup label="Projects">
		{#snippet icon()}<FolderIcon size={18} />{/snippet}
		<SideNavItem href="/projects/active">Active</SideNavItem>
		<SideNavGroup label="Archived">
			<SideNavItem href="/projects/archived/2024">2024</SideNavItem>
			<SideNavItem href="/projects/archived/2023">2023</SideNavItem>
		</SideNavGroup>
	</SideNavGroup>
</SideNav>
```

### With badges

```svelte
<SideNav>
	<SideNavItem href="/inbox">
		{#snippet icon()}<InboxIcon size={18} />{/snippet}
		{#snippet badge()}<Badge label="12" variant="primary" size="sm" />{/snippet}
		Inbox
	</SideNavItem>
</SideNav>
```

### Labels and dividers

```svelte
<SideNav>
	<SideNavLabel>Main</SideNavLabel>
	<SideNavItem href="/dashboard">Dashboard</SideNavItem>
	<SideNavDivider />
	<SideNavLabel>Support</SideNavLabel>
	<SideNavItem href="/help">Help Center</SideNavItem>
</SideNav>
```

### Collapsed (icon-only) mode

```svelte
<SideNav collapsed>
	<SideNavItem href="/home" aria-label="Home">
		{#snippet icon()}<HomeIcon size={18} />{/snippet}
		Home
	</SideNavItem>
</SideNav>
```

### Active state

```svelte
<SideNav>
	<SideNavItem href="/dashboard">Dashboard</SideNavItem>
	<SideNavItem href="/analytics" isActive>Analytics</SideNavItem>
</SideNav>
```

## Accessibility

- The root element is a `<nav>`, providing landmark navigation.
- Links use `aria-current="page"` when `active` is true.
- Buttons use `aria-pressed` when `active` is true.
- SideNavGroup triggers use `aria-expanded` and `aria-controls` to communicate open/closed state.
- SideNavGroup panels use `role="group"` with `aria-labelledby` pointing to the trigger.
- In collapsed mode, `aria-label` on items and triggers provides accessible names.
- Disabled links set `aria-disabled="true"` and `tabindex="-1"`.
- Disabled buttons use the native `disabled` attribute.
- Icons are marked `aria-hidden="true"`.
- `prefers-reduced-motion: reduce` disables all transitions and animations.

## CSS Tokens

| Token                            | Default                                                    | Description                   |
| -------------------------------- | ---------------------------------------------------------- | ----------------------------- |
| `--side-nav-padding`             | `calc(var(--ui-base-spacing) * 1)`                         | Container padding             |
| `--side-nav-gap`                 | `calc(var(--ui-base-spacing) * 0.5)`                       | Gap between items             |
| `--side-nav-item-height`         | `calc(var(--ui-base-spacing) * 9)`                         | Minimum item height           |
| `--side-nav-item-padding-x`      | `calc(var(--ui-base-spacing) * 3)`                         | Item horizontal padding       |
| `--side-nav-item-indent`         | `calc(var(--ui-base-spacing) * 4)`                         | Indentation per nesting level |
| `--side-nav-item-font-size`      | `var(--ui-text-sm)`                                        | Item font size                |
| `--side-nav-item-border-radius`  | `calc(var(--ui-base-radius) * 0.75)`                       | Item border radius            |
| `--side-nav-item-hover-bg`       | `color-mix(var(--ui-neutral), transparent 90%)`            | Item hover background         |
| `--side-nav-item-selected-bg`    | `color-mix(var(--ui-primary), transparent 88%)`            | Active item background        |
| `--side-nav-item-selected-color` | `var(--ui-primary)`                                        | Active item text color        |
| `--side-nav-divider-color`       | `var(--ui-border)`                                         | Divider color                 |
| `--side-nav-label-color`         | `color-mix(var(--ui-surface-foreground), transparent 50%)` | Label text color              |
| `--side-nav-duration`            | `var(--ui-base-duration)`                                  | Transition duration           |
| `--side-nav-easing`              | `var(--ui-base-easing)`                                    | Transition easing function    |
