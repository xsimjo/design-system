# Avatar

A visual representation of a user or entity, displaying an image, initials, or a fallback icon.

## Props

| Prop     | Type                                        | Default     | Description                        |
| -------- | ------------------------------------------- | ----------- | ---------------------------------- |
| `src`    | `string`                                    | `undefined` | URL of the avatar image            |
| `alt`    | `string`                                    | `undefined` | Alt text for the image             |
| `name`   | `string`                                    | `undefined` | Name used to generate initials     |
| `size`   | `'sm' \| 'md' \| 'lg'`                      | `'md'`      | Size variant of the avatar         |
| `status` | `'online' \| 'offline' \| 'away' \| 'busy'` | `undefined` | Optional status indicator          |

## Slots

This component does not use slots.

## Usage

### Basic with Image

```svelte
<Avatar src="/path/to/image.jpg" alt="John Doe" />
```

### With Initials

```svelte
<Avatar name="John Doe" />
```

### Fallback Icon

```svelte
<Avatar />
```

### With Status Indicator

```svelte
<Avatar src="/path/to/image.jpg" name="John Doe" status="online" />
```

### Size Variants

```svelte
<Avatar name="John Doe" size="sm" />
<Avatar name="John Doe" size="md" />
<Avatar name="John Doe" size="lg" />
```

## Accessibility

- Uses `role="img"` with appropriate `aria-label`
- Status indicator includes accessible label
- Decorative elements are marked with `aria-hidden`

## Tokens

This component uses the following semantic tokens:

- `--avatar-sm-size` - Small avatar size
- `--avatar-md-size` - Medium avatar size
- `--avatar-lg-size` - Large avatar size
- `--avatar-bg` - Background color
- `--avatar-text` - Text color for initials
- `--avatar-border` - Border color
- `--avatar-border-width` - Border width
- `--avatar-radius-circle` - Border radius (circular)
- `--avatar-font-family` - Font family for initials
- `--avatar-font-weight` - Font weight for initials
- `--avatar-sm-font-size` - Small font size
- `--avatar-md-font-size` - Medium font size
- `--avatar-lg-font-size` - Large font size
- `--avatar-img-object-fit` - Image object-fit property
- `--avatar-transition` - Transition duration
- `--avatar-status-size-sm` - Small status indicator size
- `--avatar-status-size-md` - Medium status indicator size
- `--avatar-status-size-lg` - Large status indicator size
- `--avatar-status-border-width` - Status indicator border width
- `--avatar-status-border-color` - Status indicator border color
- `--avatar-status-online-bg` - Online status color
- `--avatar-status-offline-bg` - Offline status color
- `--avatar-status-away-bg` - Away status color
- `--avatar-status-busy-bg` - Busy status color
