# Header Component Specification

## Overview

The Header component is a persistent navigation element that appears at the top of the page. It provides site-wide navigation, branding, and quick access to primary actions.

## Component API

### Props

```typescript
interface HeaderProps {
	sticky?: boolean; // Position: sticky (default: true)
	fixed?: boolean; // Position: fixed (default: false)
}
```

### Slots

```typescript
{
	logo: Snippet; // Logo/branding content
	nav: Snippet; // Navigation items
	actions: Snippet; // Action buttons/icons
}
```

### Usage Example

```svelte
<Header sticky>
	{#snippet logo()}
		<img src="/logo.svg" alt="Site Name" />
	{/snippet}

	{#snippet nav()}
		<Button href="/" variant="secondary" size="sm">Home</Button>
		<Button href="/about" variant="secondary" size="sm">About</Button>
		<Button href="/contact" variant="secondary" size="sm">Contact</Button>
	{/snippet}

	{#snippet actions()}
		<Button variant="secondary" size="sm">Sign In</Button>
		<Button variant="primary" size="sm">Sign Up</Button>
	{/snippet}
</Header>
```

## Layout Structure

```
┌────────────────────────────────────────────────────────────────┐
│  [Logo]              [Nav Items]               [Actions]       │
│                                                                 │
└────────────────────────────────────────────────────────────────┘
```

- Container uses flexbox with `justify-content: space-between`
- Logo section: Left-aligned, uses `--header-logo-gap` for internal spacing
- Nav section: Center area, uses `--header-nav-gap` between items
- Actions section: Right-aligned, uses `--header-actions-gap` between items

## Styling

### Header Container

```css
.header {
	position: sticky | fixed;
	top: 0;
	width: 100%;
	height: var(--header-height);
	background-color: var(--header-bg);
	border-bottom: var(--header-border-width) solid var(--header-border);
	box-shadow: var(--header-shadow);
	z-index: var(--header-z-index);
	padding: var(--header-padding-y) var(--header-padding-x);
	transition: var(--header-transition);

	display: flex;
	align-items: center;
	justify-content: space-between;
}
```

### Logo Section

```css
.header-logo {
	display: flex;
	align-items: center;
	gap: var(--header-logo-gap);
	height: var(--header-logo-height);
}

.header-logo img {
	height: 100%;
	width: auto;
}
```

### Navigation Section

```css
.header-nav {
	display: flex;
	align-items: center;
	gap: var(--header-nav-gap);
}
```

Note: Navigation items use the Button component. See Button component specification for styling details.

### Actions Section

```css
.header-actions {
	display: flex;
	align-items: center;
	gap: var(--header-actions-gap);
}
```

## Semantic Tokens Used

### Container Tokens

- `--header-height`: Fixed height of the header
- `--header-padding-x`: Horizontal padding
- `--header-padding-y`: Vertical padding
- `--header-bg`: Background color
- `--header-border`: Border color
- `--header-border-width`: Border thickness
- `--header-shadow`: Box shadow
- `--header-z-index`: Stacking order
- `--header-transition`: Transition timing

### Logo Tokens

- `--header-logo-height`: Maximum logo height
- `--header-logo-gap`: Gap between logo and adjacent elements

### Navigation Tokens

- `--header-nav-gap`: Gap between navigation items

Note: Navigation items use Button component tokens for all styling.

### Actions Tokens

- `--header-actions-gap`: Gap between action elements

## Accessibility Requirements

### Keyboard Navigation

- All navigation items must be keyboard accessible via Tab key
- Focus order: Logo (if interactive) → Nav Items → Action Items
- Enter/Space activates navigation links
- Focus indicators must be clearly visible (handled by Button component)

### Screen Readers

- Use semantic HTML: `<header>`, `<nav>`
- Logo should have alt text if image
- Active nav item should have `aria-current="page"` on the Button element
- Skip to main content link recommended before header

### Color Contrast

All token values have been verified for WCAG 2.1 AA compliance.

### Focus Management

- Focus rings must be visible and never disabled
- Focus ring styles handled by Button component

## Theme Behaviors

### Light Theme

- Clean, minimal appearance
- Subtle shadow for depth
- Standard spacing (64px height, 24px horizontal padding)

### Dark Theme

- Rich, elevated appearance
- Stronger shadow for prominent depth
- Same spacing as light for consistency

### Dev Theme

- Compact, functional appearance
- No shadow, relies on thicker border for definition
- Tighter spacing (56px height, 16px horizontal padding)
- Monospace typography via theme font inheritance

## Implementation Notes

### Component Structure

```
src/lib/components/header/
├── Header.svelte           // Main header container
├── SPEC.md                 // This file
└── index.ts                // Public exports
```

### Required Imports

- Use Svelte 5 snippets for slot composition
- No external dependencies
- Pure CSS using only semantic tokens

### Positioning

- `sticky` prop (default): Header scrolls with page until it reaches top, then sticks
- `fixed` prop: Header always visible at top, page content scrolls beneath it
- Only one positioning prop should be true at a time (fixed takes precedence)

### Responsive Considerations

- The specification provides desktop layout
- Mobile implementation is left to the developer (consider hamburger menu, etc.)
- All spacing/sizing tokens are available for responsive overrides

## Edge Cases

1. Empty slots: All slots are optional via snippets. Component should gracefully handle missing content.
2. Long navigation: Consider horizontal scroll or dropdown for many nav items.
3. Active state: Only one nav item should be active at a time. Use `aria-current="page"` on the active Button.
4. Logo without href: Logo section can contain non-link content.

## Testing Checklist

- [ ] Renders correctly in all three themes (light, dark, dev)
- [ ] Sticky positioning works as expected
- [ ] Fixed positioning works as expected
- [ ] All navigation items (Button components) are keyboard accessible
- [ ] Focus indicators are clearly visible on Button components
- [ ] Active state displays correctly using `aria-current="page"`
- [ ] Hover states work on Button components
- [ ] Logo slot accepts various content types
- [ ] Actions slot accepts multiple buttons/icons
- [ ] Theme switching updates all token-based styles
- [ ] Meets WCAG 2.1 AA contrast requirements
