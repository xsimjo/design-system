# Popover Component Spec

## Purpose

A click-triggered floating panel for displaying rich content (titles, descriptions, and actions) anchored to a trigger element. Unlike `Tooltip`, `Popover` is interactive and persists until explicitly dismissed by the user.

## Anatomy

- **Trigger**: Inline `<span>` wrapping any element. A click toggles the popover open and closed.
- **Panel**: Fixed-positioned floating container, rendered in-flow after the trigger.
  - **Header** (optional): Rendered when `title` is provided. Contains the title text and a close button.
  - **Body** (optional): Rendered when the `content` snippet is provided. Main content area.
  - **Footer** (optional): Rendered when the `footer` snippet is provided. Intended for action buttons, right-aligned.
  - **Arrow** (optional): Rotated square that points from the panel toward the trigger. Controlled by `showArrow`.

## Behavior

- **Toggle**: Clicking the trigger opens the popover if closed, or begins the close animation if open.
- **Outside click**: Clicking anywhere outside both the trigger and the panel closes the popover (controlled by `closeOnClickOutside`).
- **Escape key**: Pressing Escape closes the popover (controlled by `closeOnEscape`).
- **Auto-positioning**: Uses `autoUpdate` from `@floating-ui/dom` while open so the panel repositions on scroll and resize.
- **Flip**: The `flip` middleware automatically switches to the opposite side when viewport space is insufficient.
- **Animation**: Enter plays `popover-enter` (fade + slide up). Leave plays `popover-leave` (same in reverse). The DOM element is removed after the leave animation completes.
- **Bindable state**: `open` is a bindable prop — parent components can read and set it to control the popover externally.

## Props

| Prop                  | Type                 | Default      | Description                                                        |
| --------------------- | -------------------- | ------------ | ------------------------------------------------------------------ |
| `open`                | `boolean` (bindable) | `false`      | Controls open state. Bindable for external control.                |
| `placement`           | `Placement`          | `'bottom'`   | Preferred floating-ui placement. Flips when space is limited.      |
| `showArrow`           | `boolean`            | `true`       | Renders the directional arrow connecting the panel to the trigger. |
| `popoverOffset`       | `number`             | `12`         | Distance in pixels between the trigger and the panel.              |
| `closeOnClickOutside` | `boolean`            | `true`       | Closes the popover when clicking outside the panel and trigger.    |
| `closeOnEscape`       | `boolean`            | `true`       | Closes the popover when pressing the Escape key.                   |
| `title`               | `string`             | —            | Optional header title. Renders the header section when provided.   |
| `content`             | `Snippet`            | —            | Body content of the popover.                                       |
| `footer`              | `Snippet`            | —            | Footer content (e.g. action buttons). Right-aligned flex row.      |
| `children`            | `Snippet`            | **required** | The trigger element(s) that open and close the popover.            |

## CSS Tokens

All tokens are defined in `[data-theme]` scope and can be overridden per-theme or locally on any ancestor element.

| Token                     | Default                               | Description                         |
| ------------------------- | ------------------------------------- | ----------------------------------- |
| `--popover-bg`            | `var(--ui-surface-raised)`            | Panel background color              |
| `--popover-color`         | `var(--ui-surface-raised-foreground)` | Panel text color                    |
| `--popover-border`        | `var(--ui-border)`                    | Border color                        |
| `--popover-border-width`  | `var(--ui-border-width)`              | Border width                        |
| `--popover-border-radius` | `var(--ui-base-radius)`               | Corner radius                       |
| `--popover-shadow`        | `var(--ui-depth)`                     | Drop shadow                         |
| `--popover-padding`       | `calc(var(--ui-base-spacing) * 4)`    | Inner padding                       |
| `--popover-min-width`     | `calc(var(--ui-base-spacing) * 56)`   | Minimum panel width                 |
| `--popover-max-width`     | `calc(var(--ui-base-spacing) * 104)`  | Maximum panel width before wrapping |
| `--popover-z-index`       | `var(--ui-z-overlay)`                 | Stacking order                      |
| `--popover-arrow-size`    | `calc(var(--ui-base-spacing) * 2)`    | Arrow square dimension              |
| `--popover-title-size`    | `var(--ui-text-sm)`                   | Header title font size              |
| `--popover-title-weight`  | `var(--ui-weight-semibold)`           | Header title font weight            |
| `--popover-body-size`     | `var(--ui-text-sm)`                   | Body text font size                 |
| `--popover-duration`      | `var(--ui-base-duration)`             | Enter/leave animation duration      |
| `--popover-easing`        | `var(--ui-base-easing)`               | Enter/leave animation easing        |

## Placement

Accepts all 12 floating-ui placements: `top`, `top-start`, `top-end`, `bottom`, `bottom-start`, `bottom-end`, `left`, `left-start`, `left-end`, `right`, `right-start`, `right-end`. Flips automatically when the preferred side lacks sufficient viewport space.

## Accessibility

- **Trigger**: `aria-expanded` reflects open state; `aria-controls` references the panel `id`.
- **Panel**: `role="dialog"`, `aria-modal="false"`.
- **Close button**: `aria-label="Close popover"`.
- **Keyboard**: Escape closes the popover and stops event propagation.

## Differences from Tooltip

| Aspect       | Tooltip                     | Popover                     |
| ------------ | --------------------------- | --------------------------- |
| Trigger      | Hover / focus               | Click                       |
| Content      | Plain text label            | Rich content via snippets   |
| Interactive  | No (`pointer-events: none`) | Yes (buttons, links, forms) |
| Persistence  | Disappears on mouse-out     | Stays until dismissed       |
| Positioning  | Recalculates on show        | `autoUpdate` while open     |
| Arrow border | Background only             | Background + border         |
