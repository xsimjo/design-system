# Toast

A notification component for displaying brief, non-intrusive messages to users.

## Props

| Prop          | Type                                           | Default     | Description                    |
| ------------- | ---------------------------------------------- | ----------- | ------------------------------ |
| `variant`     | `'success' \| 'error' \| 'warning' \| 'info'`  | required    | Type of notification           |
| `title`       | `string`                                       | required    | Toast title text               |
| `description` | `string`                                       | `undefined` | Optional description text      |
| `dismissible` | `boolean`                                      | `true`      | Show dismiss button            |
| `onDismiss`   | `() => void`                                   | `undefined` | Callback when dismissed        |

## Slots

This component does not use slots.

## Usage

### Basic

```svelte
<Toast variant="success" title="Changes saved successfully" />
```

### With Description

```svelte
<Toast
	variant="info"
	title="New update available"
	description="A new version of the application is ready to install."
/>
```

### Variants

```svelte
<Toast variant="success" title="Operation completed" />
<Toast variant="error" title="Something went wrong" />
<Toast variant="warning" title="Please review your input" />
<Toast variant="info" title="Did you know?" />
```

### Non-Dismissible

```svelte
<Toast variant="error" title="Critical error" dismissible={false} />
```

### With Dismiss Handler

```svelte
<Toast
	variant="success"
	title="Item deleted"
	onDismiss={() => console.log('Toast dismissed')}
/>
```

### With Toast Manager

For displaying toasts programmatically, use with a toast manager:

```svelte
<script>
	import { toast } from './toast.svelte.ts';

	function showSuccess() {
		toast.success('Changes saved', 'Your changes have been saved.');
	}
</script>

<Button onclick={showSuccess}>Show Toast</Button>
<ToastContainer />
```

## Accessibility

- Uses `role="alert"` for error and warning variants
- Uses `role="status"` for success and info variants
- Includes `aria-live` attribute for screen reader announcements
- Dismiss button has accessible label

## Tokens

This component uses the following semantic tokens:

- `--toast-width` - Toast width
- `--toast-bg` - Background color
- `--toast-border` - Border color
- `--toast-border-width` - Border width
- `--toast-border-radius` - Border radius
- `--toast-shadow` - Box shadow
- `--toast-padding-x` - Horizontal padding
- `--toast-padding-y` - Vertical padding
- `--toast-icon-gap` - Gap between icon and content
- `--toast-icon-size` - Icon size
- `--toast-accent-width` - Accent bar width
- `--toast-accent-success` - Success accent color
- `--toast-accent-error` - Error accent color
- `--toast-accent-warning` - Warning accent color
- `--toast-accent-info` - Info accent color
- `--toast-icon-success` - Success icon color
- `--toast-icon-error` - Error icon color
- `--toast-icon-warning` - Warning icon color
- `--toast-icon-info` - Info icon color
- `--toast-title-color` - Title text color
- `--toast-title-font-family` - Title font family
- `--toast-title-font-size` - Title font size
- `--toast-title-font-weight` - Title font weight
- `--toast-title-line-height` - Title line height
- `--toast-description-color` - Description text color
- `--toast-description-font-size` - Description font size
- `--toast-description-font-weight` - Description font weight
- `--toast-description-line-height` - Description line height
- `--toast-description-gap` - Gap between title and description
