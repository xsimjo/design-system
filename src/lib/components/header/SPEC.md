# Header

Persistent navigation element at the top of the page for branding, navigation, and primary actions.

## Props

| Prop     | Type      | Default | Description                                        |
| -------- | --------- | ------- | -------------------------------------------------- |
| `sticky` | `boolean` | `true`  | Sticks to top when scrolling                       |
| `fixed`  | `boolean` | `false` | Always fixed at top (takes precedence over sticky) |

## Slots

| Slot      | Description                  |
| --------- | ---------------------------- |
| `logo`    | Logo/branding content (left) |
| `nav`     | Navigation items (center)    |
| `actions` | Action buttons/icons (right) |

## Usage

### Basic

```svelte
<Header>
	{#snippet logo()}
		<img src="/logo.svg" alt="Site Name" />
	{/snippet}

	{#snippet nav()}
		<Button variant="ghost" size="sm">Home</Button>
		<Button variant="ghost" size="sm">About</Button>
		<Button variant="ghost" size="sm">Contact</Button>
	{/snippet}

	{#snippet actions()}
		<Button variant="ghost" size="sm">Sign In</Button>
		<Button variant="filled" size="sm">Sign Up</Button>
	{/snippet}
</Header>
```

### Fixed Position

```svelte
<Header fixed>
	{#snippet logo()}
		<img src="/logo.svg" alt="Site Name" />
	{/snippet}
</Header>
```

### Active Navigation Item

```svelte
{#snippet nav()}
	<Button variant="ghost" size="sm" aria-current="page">Home</Button>
	<Button variant="ghost" size="sm">About</Button>
{/snippet}
```

## Accessibility

- Uses semantic `<header>` and `<nav>` elements
- All items keyboard accessible via Tab
- Logo should have alt text if image
- Active nav item uses `aria-current="page"`
- Focus indicators visible (via Button component)
- Meets WCAG 2.1 AA color contrast

## Tokens

### Container

- `--header-height` - Fixed height
- `--header-padding-x` - Horizontal padding
- `--header-padding-y` - Vertical padding
- `--header-bg` - Background color
- `--header-border` - Border color
- `--header-border-width` - Border thickness
- `--header-shadow` - Box shadow
- `--header-z-index` - Stacking order
- `--header-transition` - Animation timing

### Logo

- `--header-logo-height` - Maximum logo height
- `--header-logo-gap` - Gap between logo elements

### Navigation

- `--header-nav-gap` - Gap between nav items

### Actions

- `--header-actions-gap` - Gap between action elements
