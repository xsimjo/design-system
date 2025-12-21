# Button

Primary action component with multiple variants, colors, and sizes.

## Props

| Prop       | Type                                                                      | Default     | Description                         |
| ---------- | ------------------------------------------------------------------------- | ----------- | ----------------------------------- |
| `variant`  | `'filled' \| 'outline' \| 'ghost' \| 'soft' \| 'link' \| 'dash'`          | `'filled'`  | Visual style                        |
| `color`    | `'primary' \| 'secondary' \| 'info' \| 'success' \| 'warning' \| 'error'` | `'primary'` | Color theme                         |
| `size`     | `'sm' \| 'md' \| 'lg'`                                                    | `'md'`      | Button size                         |
| `icon`     | `boolean`                                                                 | `false`     | Square button for icon-only content |
| `active`   | `boolean`                                                                 | `false`     | Shows active/pressed state          |
| `disabled` | `boolean`                                                                 | `false`     | Disables interaction                |

## Slots

| Slot      | Description              |
| --------- | ------------------------ |
| `default` | Button label and/or icon |

## Usage

### Basic

```svelte
<Button>Click me</Button>
<Button variant="outline">Cancel</Button>
<Button variant="ghost">Learn more</Button>
```

### Colors

```svelte
<Button color="primary">Submit</Button>
<Button color="success">Confirm</Button>
<Button color="error">Delete</Button>
```

### Sizes

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

### All Variants

```svelte
<Button variant="filled">Filled</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="soft">Soft</Button>
<Button variant="link">Link</Button>
<Button variant="dash">Dash</Button>
```

## Accessibility

- Renders as native `<button>` element
- Supports keyboard activation (Enter, Space)
- Disabled state removes from tab order
- Focus ring visible on keyboard navigation
- Meets WCAG 2.1 AA color contrast for all variants

## Tokens

- `--button-color-{primary|secondary|info|success|warning|error}` - Color per theme
- `--button-{sm|md|lg}-height` - Height per size
- `--button-{sm|md|lg}-padding-x` - Horizontal padding per size
- `--button-{sm|md|lg}-padding-y` - Vertical padding per size
- `--button-{sm|md|lg}-font-size` - Font size per size
- `--button-border-radius` - Corner radius
- `--button-border-width` - Border thickness
- `--button-font-family` - Font family
- `--button-font-weight` - Font weight
- `--button-shadow` - Default shadow
- `--button-shadow-hover` - Shadow on hover
- `--button-transition` - Animation timing
