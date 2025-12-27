# @xsimjo/design-system

A modern, themeable Svelte 5 component library with a powerful three-layer token architecture.

## Features

- **Svelte 5** - Built with runes and modern Svelte patterns
- **Three-Layer Token System** - Primitives → Theme Variables → Semantic Tokens
- **Easy Theming** - Override ~45 simple variables to customize everything
- **Pure CSS** - No runtime overhead, just CSS custom properties
- **Accessible** - ARIA attributes, keyboard navigation, focus management
- **TypeScript** - Full type safety with IntelliSense support

## Installation

```bash
npm install @xsimjo/design-system
```

## Quick Start

1. Import the styles in your root layout:

```svelte
<!-- src/routes/+layout.svelte -->
<script>
	import '@xsimjo/design-system/styles';
	import '@xsimjo/design-system/styles/themes/light';
</script>

<div data-theme="light">
	<slot />
</div>
```

2. Use components in your pages:

```svelte
<script>
	import { Button, Input, Card } from '@xsimjo/design-system';
</script>

<Card>
	<Input label="Email" placeholder="Enter your email" />
	<Button>Submit</Button>
</Card>
```

## Themes

The design system includes three built-in themes:

```svelte
<!-- Light theme (default) -->
import '@xsimjo/design-system/styles/themes/light';

<!-- Dark theme -->
import '@xsimjo/design-system/styles/themes/dark';

<!-- Dev theme (monospace, compact) -->
import '@xsimjo/design-system/styles/themes/dev';
```

Switch themes by changing the `data-theme` attribute:

```svelte
<html data-theme="dark">
```

### Custom Themes

Create your own theme by overriding ~45 simple variables:

```css
[data-theme='custom'] {
	--color-primary: #8b5cf6;
	--color-bg: #faf5ff;
	--radius-button: 9999px;
	/* ... override only what you need */
}
```

## Components

| Component     | Description                          |
| ------------- | ------------------------------------ |
| `Accordion`   | Expandable content sections          |
| `Avatar`      | User profile images with fallback    |
| `Badge`       | Status indicators and labels         |
| `Breadcrumbs` | Navigation path display              |
| `Button`      | Primary action element with variants |
| `Card`        | Content container with sections      |
| `Checkbox`    | Boolean input control                |
| `Dialog`      | Modal overlay for confirmations      |
| `Drawer`      | Slide-out panel                      |
| `Input`       | Text input with labels and icons     |
| `ProgressBar` | Progress indicator                   |
| `Select`      | Dropdown selection with search       |
| `Sidebar`     | Navigation sidebar with groups       |
| `Slider`      | Range input control                  |
| `Table`       | Data table with sorting              |
| `Tabs`        | Tabbed content navigation            |
| `Toast`       | Notification messages                |
| `Tooltip`     | Contextual help text                 |
| `Typography`  | Consistent text styling              |

## Token Architecture

The design system uses a three-layer token architecture:

```
┌─────────────────────────────────────────────────────────┐
│  Primitives (primitives.css)                            │
│  Raw values: --color-blue-500, --space-4, --radius-lg   │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│  Theme Variables (~45 simple variables)                 │
│  --color-primary, --color-bg, --radius-button           │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│  Semantic Tokens (theme-base.css)                       │
│  --button-bg, --card-shadow, --input-border-focus       │
└─────────────────────────────────────────────────────────┘
```

Components only use semantic tokens, which are automatically computed from your theme variables.

## Browser Support

- Chrome/Edge 111+
- Firefox 113+
- Safari 16.4+

Requires support for:

- CSS `color-mix()` in oklch
- CSS custom properties
- CSS `:has()` selector

## Peer Dependencies

- Svelte 5.0+
- Shiki 3.20+ (for CodeBlock syntax highlighting)

## License

MIT

## Links

- [Documentation](./docs/design_system.md)
- [GitHub Repository](https://github.com/xsimjo/design-system)
