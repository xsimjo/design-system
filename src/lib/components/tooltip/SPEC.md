# Tooltip

## Overview

A non-interactive floating label that appears on hover or focus. Used to provide additional context for UI elements without cluttering the layout. Positioned with `@floating-ui/dom` using `strategy: 'fixed'` so it escapes any overflow-clipped ancestors.

## Anatomy

```
<span class="tooltip-trigger">          ← inline wrapper; binds events
  [trigger slot]
</span>

<div class="tooltip tooltip--visible"   ← the floating panel (role="tooltip")
     id="tooltip-{uid}"
     style="position:fixed; left:{x}px; top:{y}px">
  {text}
  <div class="tooltip__arrow" />        ← optional rotated square arrow
</div>
```

## Props

| Prop        | Type        | Default  | Description                                                       |
| ----------- | ----------- | -------- | ----------------------------------------------------------------- |
| `text`      | `string`    | required | The tooltip label. Plain text only — no rich content.             |
| `placement` | `Placement` | `'top'`  | Preferred placement from `@floating-ui/dom`. Flips automatically. |
| `showArrow` | `boolean`   | `true`   | Renders the directional arrow connecting tooltip to trigger.      |
| `children`  | `Snippet`   | required | The trigger element(s) wrapped by the tooltip.                    |

`Placement` is the full floating-ui union: `'top' | 'top-start' | 'top-end' | 'right' | 'right-start' | 'right-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end'`.

## Behavior

- **Show/hide**: Triggered by `mouseenter`/`mouseleave` and `focusin`/`focusout` on the wrapper span.
- **Keyboard dismiss**: `Escape` hides the tooltip.
- **Positioning**: `computePosition` runs on each show. Middlewares applied in order: `offset(12)` → `flip()` → `shift({ padding: 8 })` → `arrow()`. The `flip` middleware switches to the opposite side if there is insufficient viewport space. `shift` keeps the tooltip on-screen with 8 px viewport padding.
- **Arrow**: Positioned absolutely inside the tooltip using `middlewareData.arrow`. The square is rotated 45° and offset 4 px past the tooltip edge so its tip just touches the boundary.
- **ARIA**: `role="tooltip"` on the floating panel; `aria-describedby` set on the trigger wrapper only while visible.
- **No portal**: The tooltip is rendered in the DOM alongside the trigger. `position: fixed` ensures it escapes stacking contexts.
- **`pointer-events: none`**: The tooltip never intercepts mouse events.

## CSS Tokens

All tokens are defined in `[data-theme]` scope in `tooltip.css`.

| Token                     | Derived from                                             | Purpose                         |
| ------------------------- | -------------------------------------------------------- | ------------------------------- |
| `--tooltip-bg`            | `var(--ui-neutral)`                                      | Background (inverted surface)   |
| `--tooltip-color`         | `var(--ui-neutral-foreground)`                           | Text color (inverted surface)   |
| `--tooltip-border-radius` | `calc(var(--ui-base-radius) * 0.5)`                      | Rounded corners                 |
| `--tooltip-shadow`        | `var(--ui-depth)`                                        | Drop shadow                     |
| `--tooltip-font-size`     | `var(--ui-text-xs)`                                      | Label font size                 |
| `--tooltip-font-weight`   | `var(--ui-weight-normal)`                                | Label font weight               |
| `--tooltip-line-height`   | `var(--ui-leading-tight)`                                | Label line height               |
| `--tooltip-padding-x`     | `calc(var(--ui-base-spacing) * 2.5)`                     | Horizontal padding (10 px base) |
| `--tooltip-padding-y`     | `calc(var(--ui-base-spacing) * 1.5)`                     | Vertical padding (5 px base)    |
| `--tooltip-max-width`     | `calc(var(--ui-base-spacing) * 64)`                      | Max width before text wraps     |
| `--tooltip-z-index`       | `var(--ui-z-tooltip)`                                    | Stacking order                  |
| `--tooltip-arrow-size`    | `8px`                                                    | Arrow square dimensions         |
| `--tooltip-transition`    | `var(--ui-base-duration) var(--ui-base-easing)` + easing | Opacity fade duration           |

## Usage

```svelte
<script>
	import { Tooltip } from '@xsimjo/design-system';
</script>

<!-- Basic -->
<Tooltip text="Save your work">
	<Button>Save</Button>
</Tooltip>

<!-- Bottom placement, no arrow -->
<Tooltip text="Opens in a new tab" placement="bottom" showArrow={false}>
	<a href="...">External link</a>
</Tooltip>
```

## Accessibility

- The trigger wrapper receives `aria-describedby` pointing to the tooltip `id` while visible, giving screen readers access to the tooltip text.
- `Escape` dismissal follows the ARIA authoring practices for tooltips.
- The component does not capture focus — the tooltip is purely supplementary information.
- Do not use `Tooltip` to convey critical information or to label interactive elements. Use a visible label or `aria-label` directly for that purpose.

## Design Decisions

- **Plain `text` prop, no slot for content**: Tooltips should stay concise. Rich content (links, actions) belongs in a Popover.
- **No show delay**: Delay adds latency that hurts perceived responsiveness. Callers can debounce with a wrapper if needed.
- **Inverted surface** (`surface-foreground` bg + `surface` text): The high-contrast inversion makes tooltips visually distinct from panels and menus without needing a separate color token.
- **`position: fixed` strategy**: Prevents clipping from `overflow: hidden` ancestors (common in scrollable containers and table cells).
