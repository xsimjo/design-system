# Breadcrumbs

A navigational component that shows the user's current location within a hierarchical structure.

## Props

| Prop    | Type               | Default  | Description                          |
| ------- | ------------------ | -------- | ------------------------------------ |
| `items` | `BreadcrumbItem[]` | required | Array of breadcrumb items            |

### BreadcrumbItem Interface

```typescript
interface BreadcrumbItem {
	label: string;
	href?: string;
}
```

## Slots

This component does not use slots. Content is passed via the `items` prop.

## Usage

### Basic

```svelte
<Breadcrumbs
	items={[
		{ label: 'Home', href: '/' },
		{ label: 'Products', href: '/products' },
		{ label: 'Category', href: '/products/category' },
		{ label: 'Current Page' }
	]}
/>
```

### Without Links

```svelte
<Breadcrumbs
	items={[
		{ label: 'Step 1' },
		{ label: 'Step 2' },
		{ label: 'Step 3' }
	]}
/>
```

## Accessibility

- Uses semantic `<nav>` element with `aria-label="Breadcrumb"`
- Uses ordered list (`<ol>`) for proper structure
- Current page marked with `aria-current="page"`
- Separator icons are hidden from assistive technology

## Tokens

This component uses the following semantic tokens:

- `--breadcrumb-font-family` - Font family
- `--breadcrumb-font-size` - Font size
- `--breadcrumb-font-weight` - Font weight
- `--breadcrumb-line-height` - Line height
- `--breadcrumb-gap` - Gap between items
- `--breadcrumb-item-color` - Link text color
- `--breadcrumb-item-color-hover` - Link hover color
- `--breadcrumb-item-color-current` - Current page text color
- `--breadcrumb-separator-color` - Separator icon color
- `--breadcrumb-separator-size` - Separator icon size
- `--breadcrumb-transition` - Transition duration
- `--breadcrumb-focus-ring-color` - Focus ring color
- `--breadcrumb-focus-ring-width` - Focus ring width
- `--breadcrumb-focus-ring-offset` - Focus ring offset
