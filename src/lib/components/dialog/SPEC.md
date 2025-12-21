# Dialog

A modal overlay component for displaying content that requires user attention or interaction.

## Props

| Prop                  | Type                      | Default     | Description                      |
| --------------------- | ------------------------- | ----------- | -------------------------------- |
| `open`                | `boolean`                 | `false`     | Whether the dialog is open       |
| `onOpenChange`        | `(open: boolean) => void` | `undefined` | Callback when open state changes |
| `title`               | `string`                  | `undefined` | Dialog title text                |
| `description`         | `string`                  | `undefined` | Optional description below title |
| `size`                | `'sm' \| 'md' \| 'lg'`    | `'md'`      | Size variant                     |
| `closeOnClickOutside` | `boolean`                 | `true`      | Close when clicking backdrop     |
| `closeOnEscape`       | `boolean`                 | `true`      | Close when pressing Escape       |
| `showCloseButton`     | `boolean`                 | `true`      | Show close button in header      |

## Slots

| Slot      | Description                      |
| --------- | -------------------------------- |
| `header`  | Custom header content            |
| `default` | Main dialog body content         |
| `footer`  | Footer content (usually actions) |

## Usage

### Basic

```svelte
<script>
	let open = $state(false);
</script>

<Button onclick={() => (open = true)}>Open Dialog</Button>

<Dialog bind:open title="Dialog Title">
	<p>This is the dialog content.</p>
</Dialog>
```

### With Description

```svelte
<Dialog bind:open title="Confirm Action" description="This action cannot be undone.">
	<p>Are you sure you want to proceed?</p>

	{#snippet footer()}
		<Button variant="ghost" onclick={() => (open = false)}>Cancel</Button>
		<Button color="error">Delete</Button>
	{/snippet}
</Dialog>
```

### Custom Header

```svelte
<Dialog bind:open>
	{#snippet header()}
		<div class="custom-header">
			<Icon />
			<h2>Custom Header</h2>
		</div>
	{/snippet}

	<p>Dialog with custom header.</p>
</Dialog>
```

### Size Variants

```svelte
<Dialog bind:open size="sm" title="Small Dialog">Content</Dialog>
<Dialog bind:open size="md" title="Medium Dialog">Content</Dialog>
<Dialog bind:open size="lg" title="Large Dialog">Content</Dialog>
```

## Accessibility

- Uses `role="dialog"` with `aria-modal="true"`
- Includes `aria-labelledby` and `aria-describedby` when title/description are provided
- Traps focus within the dialog when open
- Returns focus to trigger element when closed
- Supports Escape key to close
- Prevents body scroll when open

## Tokens

This component uses the following semantic tokens:

- `--dialog-backdrop-bg` - Backdrop background color
- `--dialog-backdrop-blur` - Backdrop blur amount
- `--dialog-backdrop-z-index` - Backdrop z-index
- `--dialog-z-index` - Dialog z-index
- `--dialog-bg` - Dialog background color
- `--dialog-border` - Dialog border color
- `--dialog-border-width` - Dialog border width
- `--dialog-border-radius` - Dialog border radius
- `--dialog-shadow` - Dialog box shadow
- `--dialog-text` - Default text color
- `--dialog-font-family` - Font family
- `--dialog-max-height` - Maximum height
- `--dialog-sm-width` - Small width
- `--dialog-md-width` - Medium width
- `--dialog-lg-width` - Large width
- `--dialog-header-bg` - Header background color
- `--dialog-header-border` - Header border color
- `--dialog-header-border-width` - Header border width
- `--dialog-header-padding-x` - Header horizontal padding
- `--dialog-header-padding-y` - Header vertical padding
- `--dialog-header-gap` - Header gap
- `--dialog-title-color` - Title color
- `--dialog-title-font-size` - Title font size
- `--dialog-title-font-weight` - Title font weight
- `--dialog-title-line-height` - Title line height
- `--dialog-description-color` - Description color
- `--dialog-description-font-size` - Description font size
- `--dialog-description-gap` - Gap between title and description
- `--dialog-body-padding-x` - Body horizontal padding
- `--dialog-body-padding-y` - Body vertical padding
- `--dialog-body-gap` - Body content gap
- `--dialog-footer-bg` - Footer background color
- `--dialog-footer-border` - Footer border color
- `--dialog-footer-border-width` - Footer border width
- `--dialog-footer-padding-x` - Footer horizontal padding
- `--dialog-footer-padding-y` - Footer vertical padding
- `--dialog-footer-gap` - Footer gap
- `--dialog-footer-justify` - Footer justify-content
