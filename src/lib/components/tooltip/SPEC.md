# Tooltip

A floating label that appears on hover or focus to provide additional information.

## Props

| Prop        | Type        | Default  | Description                          |
| ----------- | ----------- | -------- | ------------------------------------ |
| `content`   | `string`    | required | Tooltip text content                 |
| `placement` | `Placement` | `'top'`  | Position relative to trigger element |
| `showArrow` | `boolean`   | `true`   | Show arrow pointing to trigger       |

### Placement Options

```typescript
type Placement =
	| 'top'
	| 'top-start'
	| 'top-end'
	| 'right'
	| 'right-start'
	| 'right-end'
	| 'bottom'
	| 'bottom-start'
	| 'bottom-end'
	| 'left'
	| 'left-start'
	| 'left-end';
```

## Slots

| Slot      | Description                              |
| --------- | ---------------------------------------- |
| `default` | Trigger element (what the tooltip wraps) |

## Usage

### Basic

```svelte
<Tooltip content="This is helpful information">
	<Button>Hover me</Button>
</Tooltip>
```

### Placement Variants

```svelte
<Tooltip content="Top tooltip" placement="top">
	<Button>Top</Button>
</Tooltip>

<Tooltip content="Right tooltip" placement="right">
	<Button>Right</Button>
</Tooltip>

<Tooltip content="Bottom tooltip" placement="bottom">
	<Button>Bottom</Button>
</Tooltip>

<Tooltip content="Left tooltip" placement="left">
	<Button>Left</Button>
</Tooltip>
```

### Without Arrow

```svelte
<Tooltip content="No arrow" showArrow={false}>
	<Button>Hover me</Button>
</Tooltip>
```

### On Icon

```svelte
<Tooltip content="More information">
	<button>
		<InfoIcon size={16} />
	</button>
</Tooltip>
```

### Edge Alignment

```svelte
<Tooltip content="Aligned to start" placement="bottom-start">
	<Button>Bottom Start</Button>
</Tooltip>

<Tooltip content="Aligned to end" placement="bottom-end">
	<Button>Bottom End</Button>
</Tooltip>
```

## Accessibility

- Uses `role="tooltip"` for proper identification
- Trigger element has `aria-describedby` when tooltip is visible
- Supports Escape key to dismiss
- Shows on both hover and focus for keyboard accessibility
- Uses Floating UI for smart positioning and collision detection

## Tokens

This component uses the following semantic tokens:

- `--tooltip-bg` - Background color
- `--tooltip-text` - Text color
- `--tooltip-padding-x` - Horizontal padding
- `--tooltip-padding-y` - Vertical padding
- `--tooltip-radius` - Border radius
- `--tooltip-shadow` - Box shadow
- `--tooltip-max-width` - Maximum width
- `--tooltip-z-index` - Z-index
- `--tooltip-font-family` - Font family
- `--tooltip-font-size` - Font size
- `--tooltip-font-weight` - Font weight
- `--tooltip-line-height` - Line height
- `--tooltip-arrow-size` - Arrow size
- `--tooltip-arrow-color` - Arrow color (matches background)
- `--tooltip-transition-duration` - Fade transition duration
