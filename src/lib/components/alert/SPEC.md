# Alert

Inline contextual feedback banner. Communicates status, warnings, or informational messages with an icon, an optional title, body content, and an optional dismiss button.

## Props

| Prop          | Type                                           | Default     | Description                                               |
| ------------- | ---------------------------------------------- | ----------- | --------------------------------------------------------- |
| `variant`     | `'info' \| 'success' \| 'warning' \| 'danger'` | `'info'`    | Semantic color variant                                    |
| `title`       | `string`                                       | `undefined` | Optional bold heading rendered above the content          |
| `dismissible` | `boolean`                                      | `false`     | When true, shows a dismiss button that unmounts the alert |
| `ondismiss`   | `() => void`                                   | `undefined` | Called when the user dismisses the alert                  |
| `children`    | `Snippet`                                      | required    | Body content of the alert                                 |

All standard `HTMLDivElement` attributes are forwarded to the root `<div>` element.

## Snippets

| Snippet    | Description                         |
| ---------- | ----------------------------------- |
| `children` | Required. Body content of the alert |

## Usage Examples

### Basic

```svelte
<Alert variant="info">Your session will expire in 10 minutes.</Alert>
<Alert variant="success">Your changes have been saved successfully.</Alert>
<Alert variant="warning">This action cannot be undone.</Alert>
<Alert variant="danger">Failed to connect to the server.</Alert>
```

### With Title

```svelte
<Alert variant="warning" title="Unsaved changes">
	You have unsaved changes. Leave the page to discard them.
</Alert>
```

### Dismissible

```svelte
<Alert
	variant="info"
	title="New features available"
	dismissible
	ondismiss={() => console.log('dismissed')}
>
	Check out the changelog to see what's new in this release.
</Alert>
```

## Accessibility

- The root element uses `role="alert"` with `aria-live="polite"` and `aria-atomic="true"` so screen readers announce the content when it appears.
- The variant icon is marked `aria-hidden="true"` — it is decorative; the variant's meaning is conveyed through text content.
- The dismiss button has an explicit `aria-label="Dismiss alert"`.
- The dismiss button receives a visible `:focus-visible` outline using `--ui-ring-width` and `--ui-ring-offset`.

## CSS Tokens

| Token                    | Default                                                    | Description                      |
| ------------------------ | ---------------------------------------------------------- | -------------------------------- |
| `--alert-bg-info`        | `color-mix(var(--ui-info), transparent 88%)`               | Background for info variant      |
| `--alert-bg-success`     | `color-mix(var(--ui-success), transparent 88%)`            | Background for success variant   |
| `--alert-bg-warning`     | `color-mix(var(--ui-warning), transparent 88%)`            | Background for warning variant   |
| `--alert-bg-danger`      | `color-mix(var(--ui-danger), transparent 88%)`             | Background for danger variant    |
| `--alert-border-info`    | `color-mix(var(--ui-info), transparent 60%)`               | Border color for info variant    |
| `--alert-border-success` | `color-mix(var(--ui-success), transparent 60%)`            | Border color for success variant |
| `--alert-border-warning` | `color-mix(var(--ui-warning), transparent 60%)`            | Border color for warning variant |
| `--alert-border-danger`  | `color-mix(var(--ui-danger), transparent 60%)`             | Border color for danger variant  |
| `--alert-icon-info`      | `var(--ui-info)`                                           | Icon color for info variant      |
| `--alert-icon-success`   | `var(--ui-success)`                                        | Icon color for success variant   |
| `--alert-icon-warning`   | `var(--ui-warning)`                                        | Icon color for warning variant   |
| `--alert-icon-danger`    | `var(--ui-danger)`                                         | Icon color for danger variant    |
| `--alert-title-color`    | `var(--ui-surface-foreground)`                             | Title text color                 |
| `--alert-content-color`  | `color-mix(var(--ui-surface-foreground), transparent 20%)` | Body content text color          |
| `--alert-dismiss-color`  | `color-mix(var(--ui-surface-foreground), transparent 40%)` | Dismiss button icon color        |
| `--alert-radius`         | `var(--ui-base-radius)`                                    | Border radius                    |
| `--alert-padding-x`      | `calc(var(--ui-base-spacing) * 4)`                         | Horizontal padding               |
| `--alert-padding-y`      | `calc(var(--ui-base-spacing) * 3)`                         | Vertical padding                 |
| `--alert-gap`            | `calc(var(--ui-base-spacing) * 3)`                         | Gap between icon, body, dismiss  |
| `--alert-border-width`   | `var(--ui-border-width)`                                   | Border width                     |
