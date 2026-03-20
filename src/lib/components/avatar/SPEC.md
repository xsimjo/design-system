# Avatar

Displays a user's profile image, initials, or a fallback icon. Supports multiple sizes, shapes, color variants, and an optional status indicator dot.

## Props

| Prop       | Type                                        | Default     | Description                                                      |
| ---------- | ------------------------------------------- | ----------- | ---------------------------------------------------------------- |
| `src`      | `string`                                    | `undefined` | Image source URL                                                 |
| `alt`      | `string`                                    | `''`        | Alt text for the image element                                   |
| `initials` | `string`                                    | `undefined` | Text shown when no image is available; truncated to 2 characters |
| `size`     | `'sm' \| 'md' \| 'lg' \| 'xl'`              | `'md'`      | Avatar size                                                      |
| `shape`    | `'circle' \| 'square'`                      | `'circle'`  | Border radius shape                                              |
| `color`    | `'primary' \| 'secondary' \| 'neutral'`     | `'neutral'` | Background color for initials and icon fallback                  |
| `status`   | `'online' \| 'offline' \| 'away' \| 'busy'` | `undefined` | Shows a status indicator dot                                     |

All standard `HTMLSpanElement` attributes are forwarded to the root `<span>` element.

## Usage Examples

### Icon fallback (default)

```svelte
<Avatar />
<Avatar size="lg" />
```

### With Initials

```svelte
<Avatar initials="JD" />
<Avatar initials="John Doe" size="lg" color="primary" />
```

### With Image

```svelte
<Avatar src="/avatars/alice.jpg" alt="Alice" size="lg" />
```

### Image with Fallback

When `src` fails to load, the component falls back to `initials` (if provided) or the icon.

```svelte
<Avatar src="/broken.jpg" alt="Fallback" initials="FB" size="lg" />
```

### Shapes

```svelte
<Avatar initials="JD" shape="circle" size="lg" />
<Avatar initials="JD" shape="square" size="lg" />
```

### Status Indicator

```svelte
<Avatar initials="JD" size="lg" status="online" />
<Avatar initials="JD" size="lg" status="away" />
<Avatar initials="JD" size="lg" status="busy" />
<Avatar initials="JD" size="lg" status="offline" />
```

## Accessibility

- When `src` is provided, the inner `<img>` element carries the accessible name via `alt`.
- Initials and the icon fallback spans are marked `aria-hidden="true"` — they are decorative; convey the user's identity via the surrounding context or by providing `aria-label` on the root element.
- The status dot is marked `aria-hidden="true"`. Convey presence information through text when it is meaningful (e.g., "Alice — online").
- All standard HTML attributes (including `aria-label`, `title`, `role`) are forwarded to the root `<span>`.

## CSS Tokens

| Token                          | Default                                                   | Description                                     |
| ------------------------------ | --------------------------------------------------------- | ----------------------------------------------- |
| `--avatar-size-sm`             | `calc(var(--ui-base-spacing) * 3)`                        | Width and height for sm                         |
| `--avatar-size-md`             | `calc(var(--ui-base-spacing) * 4)`                        | Width and height for md                         |
| `--avatar-size-lg`             | `calc(var(--ui-base-spacing) * 6)`                        | Width and height for lg                         |
| `--avatar-size-xl`             | `calc(var(--ui-base-spacing) * 8)`                        | Width and height for xl                         |
| `--avatar-font-size-sm`        | `var(--ui-text-xs)`                                       | Initials font size for sm                       |
| `--avatar-font-size-md`        | `var(--ui-text-sm)`                                       | Initials font size for md                       |
| `--avatar-font-size-lg`        | `var(--ui-text-base)`                                     | Initials font size for lg                       |
| `--avatar-font-size-xl`        | `var(--ui-text-lg)`                                       | Initials font size for xl                       |
| `--avatar-radius-circle`       | `9999px`                                                  | Border radius for circle shape                  |
| `--avatar-radius-square`       | `var(--ui-base-radius)`                                   | Border radius for square shape                  |
| `--avatar-bg-primary`          | `var(--ui-primary)`                                       | Background for primary color variant            |
| `--avatar-fg-primary`          | `var(--ui-primary-foreground)`                            | Foreground for primary color variant            |
| `--avatar-bg-secondary`        | `var(--ui-secondary)`                                     | Background for secondary color variant          |
| `--avatar-fg-secondary`        | `var(--ui-secondary-foreground)`                          | Foreground for secondary color variant          |
| `--avatar-bg-neutral`          | `color-mix(in oklch, var(--ui-neutral), transparent 70%)` | Background for neutral color variant            |
| `--avatar-fg-neutral`          | `var(--ui-surface-foreground)`                            | Foreground for neutral color variant            |
| `--avatar-border-width`        | `var(--ui-border-width)`                                  | Border width                                    |
| `--avatar-border-color`        | `var(--ui-border)`                                        | Border color                                    |
| `--avatar-status-size`         | `calc(var(--ui-base-spacing) * 1.5)`                      | Status dot diameter                             |
| `--avatar-status-border-width` | `calc(var(--ui-border-width) * 2)`                        | Status dot border width                         |
| `--avatar-status-border-color` | `var(--ui-surface)`                                       | Status dot border color (for visual separation) |
| `--avatar-status-online`       | `var(--ui-success)`                                       | Online status dot color                         |
| `--avatar-status-offline`      | `color-mix(in oklch, var(--ui-neutral), transparent 40%)` | Offline status dot color                        |
| `--avatar-status-away`         | `var(--ui-warning)`                                       | Away status dot color                           |
| `--avatar-status-busy`         | `var(--ui-danger)`                                        | Busy status dot color                           |
