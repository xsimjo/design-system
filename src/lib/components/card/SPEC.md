# Card Component Specification

## Overview

A versatile container component for grouping related content. Cards provide visual containment, hierarchy, and can optionally include interactive behaviors.

## Structure

The Card component supports a flexible layout with optional header, body, and footer sections:

```
┌─────────────────────────────┐
│ Header (optional)           │
├─────────────────────────────┤
│ Body (default slot)         │
├─────────────────────────────┤
│ Footer (optional)           │
└─────────────────────────────┝
```

## Component API

### Props

- `interactive` (boolean, default: false): When true, adds hover effects for shadow and border
- `padding` (boolean, default: true): Controls whether the card body has padding. Set to false when using header/footer with full-bleed content

### Slots

- `default`: Main content area (body)
- `header`: Optional header section with bottom border separator
- `footer`: Optional footer section with top border separator

## Visual Design

### Container

The card container provides the foundation:

- Background color: `--card-bg`
- Border: `--card-border` with `--card-border-width`
- Shadow: `--card-shadow`
- Border radius: `--card-radius`
- Text color: `--card-text`
- Transition: `--card-transition`

### Header Section

When the header slot is provided:

- Padding: `--card-header-padding`
- Background: `--card-header-bg`
- Bottom border: `--card-header-border` with `--card-header-border-width`

The header is typically used for:

- Card titles
- Action buttons or icons
- Metadata or labels

### Body Section

The main content area:

- Padding: `--card-body-padding` (when `padding` prop is true)
- Inherits card background and text color

The body accepts any content via the default slot.

### Footer Section

When the footer slot is provided:

- Padding: `--card-footer-padding`
- Background: `--card-footer-bg`
- Top border: `--card-footer-border` with `--card-footer-border-width`

The footer is typically used for:

- Action buttons
- Metadata or timestamps
- Navigation or pagination

### Interactive State

When `interactive` prop is true, the card responds to hover:

- Shadow: `--card-hover-shadow`
- Border: `--card-hover-border`
- Cursor: pointer

This state is useful for clickable cards (e.g., navigation cards, product cards).

## Theme Variations

Each theme expresses distinct personalities through token overrides:

### Light Theme

- Soft shadow for subtle elevation
- Transparent borders by default
- Generous padding (24px)
- Subtle borders between sections (slate-200)
- Transparent section backgrounds

### Dark Theme

- Elevated appearance with shadow
- Transparent borders by default
- Same generous padding as light (24px)
- Darker borders between sections (slate-700)
- Transparent section backgrounds

### Dev Theme

- No shadow, relies on visible border
- Prominent border (gray-300, 2px)
- Tighter padding (16px) for compact layouts
- Sharp corners (2px radius)
- Subtle gray backgrounds for header/footer sections
- Faster transitions

## Accessibility

### Semantic Structure

- Use semantic HTML within slots (e.g., `<header>` elements in header slot)
- Maintain logical heading hierarchy in card titles
- Use `<article>` wrapper when card represents standalone content

### Interactive Cards

When `interactive` is true:

- Ensure entire card is keyboard accessible (wrap in button or link if needed)
- Provide clear focus indicators
- Communicate purpose with ARIA labels if visual context is insufficient

### Color Contrast

- All text meets WCAG 2.1 AA standards (4.5:1 for normal text)
- Border separators maintain 3:1 contrast ratio
- Theme variations preserve contrast requirements

## Layout Behavior

### Sizing

Cards are block-level elements that:

- Fill available width by default
- Height determined by content
- Can be constrained using CSS (max-width, etc.)

### Spacing

Internal spacing is controlled by semantic tokens:

- Section padding adapts per theme
- Border widths vary by theme
- Consistent spacing ensures visual rhythm

### Composition

Cards work well in:

- Grid layouts (product catalogs, dashboards)
- List layouts (articles, posts)
- Standalone usage (forms, modals)

## Token Reference

### Container Tokens

- `--card-bg`: Background color
- `--card-border`: Border color
- `--card-shadow`: Box shadow
- `--card-radius`: Border radius
- `--card-padding`: Not used directly (see section padding)
- `--card-text`: Text color
- `--card-border-width`: Border width
- `--card-transition`: Transition timing

### Header Tokens

- `--card-header-padding`: Internal padding
- `--card-header-border`: Bottom border color
- `--card-header-border-width`: Bottom border width
- `--card-header-bg`: Background color

### Body Tokens

- `--card-body-padding`: Internal padding

### Footer Tokens

- `--card-footer-padding`: Internal padding
- `--card-footer-border`: Top border color
- `--card-footer-border-width`: Top border width
- `--card-footer-bg`: Background color

### Interactive State Tokens

- `--card-hover-shadow`: Shadow on hover
- `--card-hover-border`: Border color on hover

## Usage Examples

### Basic Card

```svelte
<Card>
	<p>Simple card with default padding</p>
</Card>
```

### Card with Header and Footer

```svelte
<Card>
	<div slot="header">
		<h2>Card Title</h2>
	</div>

	<p>Main content goes here</p>

	<div slot="footer">
		<Button>Action</Button>
	</div>
</Card>
```

### Interactive Card

```svelte
<Card interactive>
	<h3>Clickable Card</h3>
	<p>Hover to see shadow effect</p>
</Card>
```

### Full-Bleed Content

```svelte
<Card padding={false}>
	<div slot="header">
		<h2>Image Card</h2>
	</div>

	<img src="..." alt="..." />

	<div slot="footer">
		<Button>View Details</Button>
	</div>
</Card>
```

## Implementation Notes

### Component Structure

The component should:

1. Render a container with card tokens applied
2. Conditionally render header section if header slot is provided
3. Render body section (default slot) with conditional padding
4. Conditionally render footer section if footer slot is provided
5. Apply interactive styles when `interactive` prop is true

### CSS Requirements

Use only semantic tokens, never primitives:

- `var(--card-bg)` not `var(--color-white)`
- `var(--card-header-padding)` not `var(--space-6)`

### Theme Consistency

Ensure all three themes define identical token structure so cards render consistently across theme switches.
