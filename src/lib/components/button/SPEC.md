# Button

Primary action component with multiple variants, colors, and sizes.

## Props

| Prop        | Type                                                                                                | Default     | Description                                                        |
| ----------- | --------------------------------------------------------------------------------------------------- | ----------- | ------------------------------------------------------------------ |
| `href`      | `string`                                                                                            | `undefined` | Renders an `<a>` instead of a `<button>`; ignored while disabled   |
| `variant`   | `'filled' \| 'outline' \| 'ghost' \| 'soft' \| 'link' \| 'dash'`                                    | `'filled'`  | Visual style; `link` is visual only — pass `href` to get an anchor |
| `color`     | `'primary' \| 'secondary' \| 'accent' \| 'success' \| 'danger' \| 'warning' \| 'info' \| 'neutral'` | `'primary'` | Color theme                                                        |
| `size`      | `'sm' \| 'md' \| 'lg'`                                                                              | `'md'`      | Button size                                                        |
| `icon`      | `boolean`                                                                                           | `false`     | Square button for icon-only content                                |
| `loading`   | `boolean`                                                                                           | `false`     | Shows spinner and disables button                                  |
| `fullWidth` | `boolean`                                                                                           | `false`     | Makes button take full width                                       |
| `disabled`  | `boolean`                                                                                           | `false`     | Disables interaction                                               |

## Slots

| Slot      | Description              |
| --------- | ------------------------ |
| `default` | Button label and/or icon |

## Usage

### As a link

```svelte
<Button href="/pricing" variant="ghost">Pricing</Button>
```

A disabled `Button` with an `href` falls back to a real disabled `<button>`, so it cannot
be followed by keyboard or middle-click.

### Basic

```svelte
<Button>Click me</Button>
<Button variant="outline">Cancel</Button>
<Button variant="ghost">Learn more</Button>
```

### With Variants

```svelte
<Button variant="filled">Filled</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="soft">Soft</Button>
<Button variant="link">Link</Button>
<Button variant="dash">Dash</Button>
```

### With Colors

```svelte
<Button color="primary">Submit</Button>
<Button color="secondary">Cancel</Button>
<Button color="success">Confirm</Button>
<Button color="danger">Delete</Button>
```

### With Sizes

```svelte
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
```

### With Icon

```svelte
<script>
	import { Button, SearchIcon } from '@xsimjo/design-system';
</script>

<Button>
	<SearchIcon />
	Search
</Button>

<Button icon>
	<SearchIcon />
</Button>
```

### With Loading

```svelte
<Button loading>Submitting...</Button>
<Button loading icon>
	<SaveIcon />
</Button>
```

### Full Width

```svelte
<Button fullWidth>Full Width Button</Button>
```

## Accessibility

- Uses semantic `<button>` element
- Supports keyboard activation (Enter, Space)
- Disabled state removes from tab order
- Focus ring visible on keyboard navigation
- Meets WCAG 2.1 AA color contrast

## Tokens

This component uses the following semantic tokens:

- `--button-color-{primary|secondary|accent|success|danger|warning|info|neutral}` - Color per theme
- `--button-color-{primary|secondary|accent|success|danger|warning|info|neutral}-foreground` - Foreground per color
- `--button-secondary-text` - Text color for secondary variant
- `--button-{sm|md|lg}-height` - Height per size
- `--button-{sm|md|lg}-padding-x` - Horizontal padding per size
- `--button-{sm|md|lg}-padding-y` - Vertical padding per size
- `--button-{sm|md|lg}-font-size` - Font size per size
- `--button-{sm|md|lg}-gap` - Gap between content items per size
- `--button-icon-{sm|md|lg}-size` - Square size for icon buttons
- `--button-font-family` - Font family
- `--button-font-weight` - Font weight
- `--button-line-height` - Line height
- `--button-border-radius` - Border radius
- `--button-border-width` - Border thickness
- `--button-shadow` - Default shadow
- `--button-shadow-hover` - Shadow on hover
- `--button-shadow-active` - Shadow on active/pressed
- `--button-shadow-disabled` - Shadow when disabled
- `--button-cursor-default` - Default cursor
- `--button-cursor-disabled` - Disabled cursor
- `--button-opacity-disabled` - Opacity when disabled
- `--button-disabled-bg` - Disabled background color
- `--button-disabled-text` - Disabled text color
- `--button-disabled-border` - Disabled border color
- `--button-mix-hover` - Color to mix on hover
- `--button-mix-hover-amount` - Amount to mix on hover
- `--button-mix-active` - Color to mix on active
- `--button-mix-active-amount` - Amount to mix on active
- `--button-focus-ring-width` - Focus ring width
- `--button-focus-ring-offset` - Focus ring offset
- `--button-transition` - Animation timing
- `--button-opacity-loading` - Opacity when in loading state
- `--button-soft-text-mix-amount` - Text color mix amount for soft variant
- `--button-outline-hover-alpha` - Transparency alpha for outline hover bg
- `--button-outline-active-alpha` - Transparency alpha for outline active bg
- `--button-ghost-hover-alpha` - Transparency alpha for ghost hover bg
- `--button-ghost-active-alpha` - Transparency alpha for ghost active bg
- `--button-soft-bg-alpha` - Transparency alpha for soft default bg
- `--button-soft-hover-alpha` - Transparency alpha for soft hover bg
- `--button-soft-active-alpha` - Transparency alpha for soft active bg
- `--button-dash-hover-alpha` - Transparency alpha for dash hover bg
- `--button-dash-active-alpha` - Transparency alpha for dash active bg
