# Skeleton

Loading placeholder that mimics the shape of content before it loads. Renders a pulsing shimmer animation to indicate activity without layout shift.

## Props

| Prop       | Type                           | Default     | Description                                                                                                   |
| ---------- | ------------------------------ | ----------- | ------------------------------------------------------------------------------------------------------------- |
| `shape`    | `'rect' \| 'circle' \| 'text'` | `'rect'`    | Shape of the skeleton. `rect` is a rounded rectangle, `circle` is fully round, `text` renders multiple lines. |
| `width`    | `string`                       | `undefined` | Inline CSS width value (e.g. `'200px'`, `'100%'`). Defaults to `100%` via CSS.                                |
| `height`   | `string`                       | `undefined` | Inline CSS height value (e.g. `'48px'`). Required for `rect` and `circle` shapes.                             |
| `lines`    | `number`                       | `3`         | Number of text lines to render when `shape="text"`.                                                           |
| `animated` | `boolean`                      | `true`      | Enables the shimmer animation. Set to `false` for a static placeholder.                                       |

All standard `HTMLSpanElement` attributes are forwarded to the root element.

## Usage Examples

### Rectangle (default)

```svelte
<Skeleton height="48px" />
<Skeleton width="200px" height="24px" />
```

### Circle

```svelte
<Skeleton shape="circle" width="40px" height="40px" />
```

### Text lines

```svelte
<Skeleton shape="text" lines={4} />
```

### Static (no animation)

```svelte
<Skeleton height="120px" animated={false} />
```

### Composing a card skeleton

```svelte
<div style="display: flex; gap: 12px; align-items: flex-start;">
	<Skeleton shape="circle" width="40px" height="40px" />
	<div style="flex: 1;">
		<Skeleton height="16px" width="60%" />
		<Skeleton shape="text" lines={2} style="margin-top: 8px;" />
	</div>
</div>
```

## Accessibility

- The root element is marked `aria-hidden="true"` — skeletons are purely decorative and should not be announced by screen readers.
- Pair with a live region or `aria-busy="true"` on the containing section to communicate loading state to assistive technology.

## CSS Tokens

| Token                        | Default                                                    | Description                                                |
| ---------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- |
| `--skeleton-bg`              | `color-mix(var(--ui-neutral), transparent 78%)`            | Base background color                                      |
| `--skeleton-shimmer-color`   | `color-mix(var(--ui-neutral-foreground), transparent 75%)` | Highlight color for the shimmer wave (light in all themes) |
| `--skeleton-radius`          | `var(--ui-base-radius)`                                    | Border radius for `rect` and `text` shapes                 |
| `--skeleton-radius-circle`   | `9999px`                                                   | Border radius for `circle` shape                           |
| `--skeleton-duration`        | `1.5s`                                                     | Duration of one shimmer cycle                              |
| `--skeleton-easing`          | `ease-in-out`                                              | Easing function for the shimmer animation                  |
| `--skeleton-stagger`         | `0.15s`                                                    | Delay increment between text lines                         |
| `--skeleton-line-height`     | `calc(var(--ui-base-spacing) * 2)`                         | Height of each text line                                   |
| `--skeleton-line-gap`        | `calc(var(--ui-base-spacing) * 1.5)`                       | Gap between text lines                                     |
| `--skeleton-line-last-width` | `70%`                                                      | Width of the last text line                                |
