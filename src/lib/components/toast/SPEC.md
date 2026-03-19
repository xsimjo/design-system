# Toast

Ephemeral notification system. Toasts are triggered programmatically via the `toast` store and rendered by a single `<Toaster />` mounted once in the app. Positioning is handled by `@floating-ui/dom` with a virtual anchor at the desired viewport corner.

## Components

### `<Toaster />`

Mounts the toast container. Place once near the root of your app.

| Prop       | Type            | Default          | Description                                             |
| ---------- | --------------- | ---------------- | ------------------------------------------------------- |
| `position` | `ToastPosition` | `'bottom-right'` | Viewport corner where toasts appear                     |
| `margin`   | `number`        | `16`             | Gap in px between the toast container and viewport edge |

### `toast` store

| Method                             | Returns  | Description                                     |
| ---------------------------------- | -------- | ----------------------------------------------- |
| `toast.add(message, options)`      | `string` | Adds a toast and returns its id                 |
| `toast.success(message, options?)` | `string` | Shorthand — variant: `'success'`                |
| `toast.danger(message, options?)`  | `string` | Shorthand — variant: `'danger'`                 |
| `toast.warning(message, options?)` | `string` | Shorthand — variant: `'warning'`                |
| `toast.info(message, options?)`    | `string` | Shorthand — variant: `'info'`                   |
| `toast.dismiss(id)`                | `void`   | Removes the toast with the given id immediately |
| `toast.clear()`                    | `void`   | Removes all active toasts                       |

### `ToastOptions`

| Property      | Type           | Default     | Description                                |
| ------------- | -------------- | ----------- | ------------------------------------------ |
| `description` | `string`       | `—`         | Secondary text shown below the message     |
| `variant`     | `ToastVariant` | `'neutral'` | Color and icon variant                     |
| `duration`    | `number`       | `4000`      | Auto-dismiss delay in ms. `0` = persistent |
| `dismissible` | `boolean`      | `true`      | Whether a dismiss button is rendered       |

## Types

```ts
type ToastVariant = 'success' | 'danger' | 'warning' | 'info' | 'neutral';
type ToastPosition =
	| 'top-left'
	| 'top-center'
	| 'top-right'
	| 'bottom-left'
	| 'bottom-center'
	| 'bottom-right';
```

## Usage

### Setup

Mount `<Toaster />` once — typically in your root layout:

```svelte
<script>
	import { Toaster } from '@xsimjo/design-system';
</script>

<Toaster position="bottom-right" />
<slot />
```

### Basic

```svelte
<script>
	import { toast } from '@xsimjo/design-system';
</script>

<button onclick={() => toast.success('File saved')}>Save</button>
<button onclick={() => toast.danger('Something went wrong')}>Delete</button>
<button onclick={() => toast.warning('Session expiring soon')}>Warn</button>
<button onclick={() => toast.info('Update available')}>Info</button>
```

### With Description

```svelte
toast.success('Profile updated', {
  description: 'Your changes have been saved to the server.'
});

toast.danger('Upload failed', {
  description: 'The file exceeds the 10 MB size limit.'
});
```

### Persistent Toast

```svelte
const id = toast.warning('Deployment in progress', {
  description: 'This may take a few minutes.',
  duration: 0
});

// Later, dismiss manually:
toast.dismiss(id);
```

### Without Dismiss Button

```svelte
toast.info('Auto-saving…', { dismissible: false, duration: 2000 });
```

## Architecture

- **`toast.svelte.ts`** — Module-level `$state` class (Svelte 5 universal reactivity). Holds the reactive `items` array. All mutations go through store methods.
- **`Toaster.svelte`** — Renders a fixed-position container. Uses `@floating-ui/dom`'s `computePosition` + `autoUpdate` with a real DOM anchor element positioned at the chosen viewport corner. The anchor is a 0×0 `position: fixed` div; floating-ui's `offset` and `shift` middleware ensure proper margin and overflow prevention.
- **`Toast.svelte`** — Individual toast. Manages its own auto-dismiss timer via `$effect`. Exit is a two-step CSS transition (opacity + max-height collapse), followed by calling `toast.dismiss(id)` on `transitionend`.

## Accessibility

- Toaster container has `role="region"` and `aria-label="Notifications"`.
- Each toast has `role="status"`, `aria-live="polite"`, `aria-atomic="true"`.
- Dismiss button has `aria-label="Dismiss notification"`.
- Animations respect `prefers-reduced-motion`.

## Tokens

| Token                      | Default                                                   | Description                     |
| -------------------------- | --------------------------------------------------------- | ------------------------------- |
| `--toast-width`            | `360px`                                                   | Max width of a single toast     |
| `--toast-gap`              | `calc(var(--ui-base-spacing) * 1)`                        | Vertical gap between toasts     |
| `--toast-surface`          | `var(--ui-surface-overlay)`                               | Toast background                |
| `--toast-foreground`       | `var(--ui-surface-overlay-foreground)`                    | Toast text color                |
| `--toast-border`           | `var(--ui-border)`                                        | Toast border color              |
| `--toast-border-width`     | `var(--ui-border-width)`                                  | Toast border thickness          |
| `--toast-border-radius`    | `var(--ui-base-radius)`                                   | Toast corner radius             |
| `--toast-shadow`           | `var(--ui-depth)`                                         | Toast box shadow                |
| `--toast-padding-x`        | `calc(var(--ui-base-spacing) * 2)`                        | Horizontal padding              |
| `--toast-padding-y`        | `calc(var(--ui-base-spacing) * 1.75)`                     | Vertical padding                |
| `--toast-message-size`     | `var(--ui-text-sm)`                                       | Message font size               |
| `--toast-message-weight`   | `var(--ui-weight-medium)`                                 | Message font weight             |
| `--toast-description-size` | `var(--ui-text-xs)`                                       | Description font size           |
| `--toast-dismiss-size`     | `calc(var(--ui-base-spacing) * 3.5)`                      | Dismiss button size             |
| `--toast-dismiss-hover-bg` | `color-mix(in oklch, var(--ui-neutral), transparent 88%)` | Dismiss button hover background |
| `--toast-accent`           | `var(--ui-neutral)` (overridden per variant)              | Left-border accent color        |
| `--toast-icon-color`       | `var(--ui-surface-foreground)` (overridden per variant)   | Icon color                      |
| `--toast-transition-enter` | `var(--ui-base-duration) var(--ui-base-easing)`           | Enter animation duration/easing |
| `--toast-transition-exit`  | `200ms var(--ui-base-easing)`                             | Exit transition duration/easing |
