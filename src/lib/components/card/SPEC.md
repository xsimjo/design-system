# Card

A versatile container component for grouping related content with optional header and footer sections.

## Props

| Prop          | Type      | Default | Description                                             |
| ------------- | --------- | ------- | ------------------------------------------------------- |
| `interactive` | `boolean` | `false` | Adds hover effects for shadow and border                |
| `padding`     | `boolean` | `true`  | Controls body padding. Set false for full-bleed content |

## Slots

| Slot      | Description                                |
| --------- | ------------------------------------------ |
| `default` | Main content area (body)                   |
| `header`  | Optional header section with bottom border |
| `footer`  | Optional footer section with top border    |

## Usage

### Basic

```svelte
<Card>
	<p>Simple card with default padding</p>
</Card>
```

### With Header and Footer

```svelte
<Card>
	{#snippet header()}
		<h2>Card Title</h2>
	{/snippet}

	<p>Main content goes here</p>

	{#snippet footer()}
		<Button>Action</Button>
	{/snippet}
</Card>
```

### Interactive

```svelte
<Card interactive>
	<h3>Clickable Card</h3>
	<p>Hover to see shadow effect</p>
</Card>
```

### Full-Bleed Content

```svelte
<Card padding={false}>
	{#snippet header()}
		<h2>Image Card</h2>
	{/snippet}

	<img src="..." alt="..." />

	{#snippet footer()}
		<Button>View Details</Button>
	{/snippet}
</Card>
```

## Accessibility

- Use semantic HTML within slots (e.g., `<header>` in header slot)
- Maintain logical heading hierarchy
- Interactive cards need keyboard accessibility (wrap in button or link)
- Meets WCAG 2.1 AA color contrast

## Tokens

### Container

- `--card-bg` - Background color
- `--card-border` - Border color
- `--card-border-width` - Border width
- `--card-shadow` - Box shadow
- `--card-radius` - Border radius
- `--card-text` - Text color
- `--card-transition` - Animation timing

### Header

- `--card-header-padding` - Internal padding
- `--card-header-bg` - Background color
- `--card-header-border` - Bottom border color
- `--card-header-border-width` - Bottom border width

### Body

- `--card-body-padding` - Internal padding

### Footer

- `--card-footer-padding` - Internal padding
- `--card-footer-bg` - Background color
- `--card-footer-border` - Top border color
- `--card-footer-border-width` - Top border width

### Interactive State

- `--card-hover-shadow` - Shadow on hover
- `--card-hover-border` - Border color on hover
