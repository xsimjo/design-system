# Breadcrumbs

Hierarchical navigation trail showing the user's location within a site. Renders a semantic `<nav>` with an ordered list of links and a configurable separator.

## Components

`Breadcrumbs` — container that establishes the nav landmark and separator style.
`BreadcrumbItem` — individual crumb rendered as a link or current-page label.

## Props

### Breadcrumbs

| Prop        | Type                   | Default     | Description                           |
| ----------- | ---------------------- | ----------- | ------------------------------------- |
| `separator` | `'chevron' \| 'slash'` | `'chevron'` | Separator rendered between items      |
| `children`  | `Snippet`              | required    | One or more `BreadcrumbItem` elements |

All standard `HTMLElement` attributes are forwarded to the root `<nav>` element.

### BreadcrumbItem

| Prop       | Type      | Default     | Description                                                                  |
| ---------- | --------- | ----------- | ---------------------------------------------------------------------------- |
| `href`     | `string`  | `undefined` | When provided, renders the item as an `<a>` link. Omit for the current page. |
| `children` | `Snippet` | required    | Label content for the item                                                   |

All standard `HTMLLIElement` attributes are forwarded to the root `<li>` element.

## Snippets

| Snippet    | Component        | Description                   |
| ---------- | ---------------- | ----------------------------- |
| `children` | `Breadcrumbs`    | One or more `BreadcrumbItem`s |
| `children` | `BreadcrumbItem` | Label text or content         |

## Usage Examples

### Basic

```svelte
<Breadcrumbs>
	<BreadcrumbItem href="/">Home</BreadcrumbItem>
	<BreadcrumbItem href="/products">Products</BreadcrumbItem>
	<BreadcrumbItem>Wireless Headphones</BreadcrumbItem>
</Breadcrumbs>
```

### Slash separator

```svelte
<Breadcrumbs separator="slash">
	<BreadcrumbItem href="/">Home</BreadcrumbItem>
	<BreadcrumbItem href="/docs">Docs</BreadcrumbItem>
	<BreadcrumbItem>Components</BreadcrumbItem>
</Breadcrumbs>
```

### Single level (no separator shown)

```svelte
<Breadcrumbs>
	<BreadcrumbItem>Dashboard</BreadcrumbItem>
</Breadcrumbs>
```

## Accessibility

- The root element is a `<nav>` with `aria-label="Breadcrumb"`, creating a landmark region.
- Items are wrapped in an `<ol>` because the order of breadcrumb links is meaningful.
- The last item (current page) omits `href` and renders a `<span aria-current="page">` rather than a link — screen readers announce it as the active location.
- Separator icons are wrapped in `aria-hidden="true"` so assistive technology skips them.
- Link items receive a visible `:focus-visible` outline using `--ui-ring-width` and `--ui-ring-offset`.

## CSS Tokens

Link items use `Button` CSS classes (`button--link button--secondary button--sm`) and inherit all button link token overrides.

| Token                           | Default                                                              | Description                      |
| ------------------------------- | -------------------------------------------------------------------- | -------------------------------- |
| `--breadcrumbs-font-size`       | `var(--ui-text-sm)`                                                  | Font size of all items           |
| `--breadcrumbs-gap`             | `calc(var(--ui-base-spacing) * 1.5)`                                 | Gap between items and separators |
| `--breadcrumbs-current-color`   | `var(--ui-surface-foreground)`                                       | Current page text color          |
| `--breadcrumbs-separator-color` | `color-mix(in oklch, var(--ui-surface-foreground), transparent 60%)` | Separator icon/text color        |
