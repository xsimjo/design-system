# Drawer

A slide-out panel component that appears from the edge of the screen for secondary content or navigation.

## Props

| Prop                  | Type                      | Default     | Description                        |
| --------------------- | ------------------------- | ----------- | ---------------------------------- |
| `open`                | `boolean`                 | `false`     | Whether the drawer is open         |
| `onOpenChange`        | `(open: boolean) => void` | `undefined` | Callback when open state changes   |
| `title`               | `string`                  | `undefined` | Drawer title text                  |
| `placement`           | `'left' \| 'right'`       | `'right'`   | Which edge the drawer appears from |
| `size`                | `'sm' \| 'md' \| 'lg'`    | `'md'`      | Width variant                      |
| `closeOnClickOutside` | `boolean`                 | `true`      | Close when clicking backdrop       |
| `closeOnEscape`       | `boolean`                 | `true`      | Close when pressing Escape         |
| `showCloseButton`     | `boolean`                 | `true`      | Show close button in header        |

## Slots

| Slot      | Description                      |
| --------- | -------------------------------- |
| `header`  | Custom header content            |
| `default` | Main drawer body content         |
| `footer`  | Footer content (usually actions) |

## Usage

### Basic

```svelte
<script>
	let open = $state(false);
</script>

<Button onclick={() => (open = true)}>Open Drawer</Button>

<Drawer bind:open title="Drawer Title">
	<p>This is the drawer content.</p>
</Drawer>
```

### Left Placement

```svelte
<Drawer bind:open placement="left" title="Navigation">
	<nav>
		<a href="/">Home</a>
		<a href="/about">About</a>
	</nav>
</Drawer>
```

### With Footer

```svelte
<Drawer bind:open title="Settings">
	<form>
		<!-- Form fields -->
	</form>

	{#snippet footer()}
		<Button variant="ghost" onclick={() => (open = false)}>Cancel</Button>
		<Button>Save Changes</Button>
	{/snippet}
</Drawer>
```

### Size Variants

```svelte
<Drawer bind:open size="sm" title="Small Drawer">Content</Drawer>
<Drawer bind:open size="md" title="Medium Drawer">Content</Drawer>
<Drawer bind:open size="lg" title="Large Drawer">Content</Drawer>
```

## Accessibility

- Uses `role="dialog"` with `aria-modal="true"`
- Includes `aria-labelledby` when title is provided
- Traps focus within the drawer when open
- Returns focus to trigger element when closed
- Supports Escape key to close
- Prevents body scroll when open
- Smooth slide animation respects `prefers-reduced-motion`

## Tokens

This component uses the following semantic tokens:

- `--drawer-backdrop-bg` - Backdrop background color
- `--drawer-backdrop-blur` - Backdrop blur amount
- `--drawer-backdrop-z-index` - Backdrop z-index
- `--drawer-z-index` - Drawer z-index
- `--drawer-bg` - Drawer background color
- `--drawer-border` - Drawer border color
- `--drawer-border-width` - Drawer border width
- `--drawer-shadow` - Drawer box shadow
- `--drawer-text` - Default text color
- `--drawer-font-family` - Font family
- `--drawer-max-height` - Maximum height
- `--drawer-sm-width` - Small width
- `--drawer-md-width` - Medium width
- `--drawer-lg-width` - Large width
- `--drawer-header-bg` - Header background color
- `--drawer-header-border` - Header border color
- `--drawer-header-border-width` - Header border width
- `--drawer-header-padding-x` - Header horizontal padding
- `--drawer-header-padding-y` - Header vertical padding
- `--drawer-header-gap` - Header gap
- `--drawer-title-color` - Title color
- `--drawer-title-font-size` - Title font size
- `--drawer-title-font-weight` - Title font weight
- `--drawer-title-line-height` - Title line height
- `--drawer-body-padding-x` - Body horizontal padding
- `--drawer-body-padding-y` - Body vertical padding
- `--drawer-body-gap` - Body content gap
- `--drawer-footer-bg` - Footer background color
- `--drawer-footer-border` - Footer border color
- `--drawer-footer-border-width` - Footer border width
- `--drawer-footer-padding-x` - Footer horizontal padding
- `--drawer-footer-padding-y` - Footer vertical padding
- `--drawer-footer-gap` - Footer gap
- `--drawer-footer-justify` - Footer justify-content
