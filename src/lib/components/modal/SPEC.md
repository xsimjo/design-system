# Modal

A dialog overlay component that renders content in a layer above the page. Built on the native `<dialog>` element for robust accessibility, focus trapping, and keyboard support.

## Props

| Prop                  | Type                                     | Default  | Description                                                   |
| --------------------- | ---------------------------------------- | -------- | ------------------------------------------------------------- |
| `open`                | `boolean`                                | `false`  | Bindable open state                                           |
| `size`                | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'`   | Width of the modal panel                                      |
| `title`               | `string`                                 | `—`      | Title text rendered in the default header with a close button |
| `closeOnClickOutside` | `boolean`                                | `true`   | Close when clicking the backdrop                              |
| `closeOnEscape`       | `boolean`                                | `true`   | Close when pressing Escape                                    |
| `header`              | `Snippet`                                | `—`      | Custom header content (overrides `title`)                     |
| `footer`              | `Snippet`                                | `—`      | Footer content, right-aligned (typically action buttons)      |
| `children`            | `Snippet`                                | required | Modal body content                                            |

All additional HTML attributes are forwarded to the underlying `<dialog>` element.

## Usage Examples

### Basic modal with title

```svelte
<script>
	let open = $state(false);
</script>

<Button onclick={() => (open = true)}>Open</Button>

<Modal bind:open title="Confirm action">
	<p>Are you sure you want to continue?</p>
	{#snippet footer()}
		<Button variant="ghost" onclick={() => (open = false)}>Cancel</Button>
		<Button onclick={() => (open = false)}>Confirm</Button>
	{/snippet}
</Modal>
```

### Custom header

```svelte
<Modal bind:open>
	{#snippet header()}
		<div class="modal__header">
			<h2 class="modal__title">Custom Header</h2>
		</div>
	{/snippet}
	Body content
</Modal>
```

### Size variants

```svelte
<Modal bind:open size="sm">Small modal</Modal>
<Modal bind:open size="lg">Large modal</Modal>
<Modal bind:open size="full">Full-width modal</Modal>
```

### Non-dismissible

```svelte
<Modal bind:open closeOnClickOutside={false} closeOnEscape={false} title="Required action">
	You must complete this form before continuing.
</Modal>
```

## Accessibility

- Built on the native `<dialog>` element — `showModal()` provides automatic focus trapping.
- Uses `aria-modal="true"` and `aria-labelledby` when `title` is provided.
- Escape key closes the modal by default (controlled via `closeOnEscape`).
- Focus returns to the triggering element when the modal closes (native dialog behavior).
- Backdrop click detection compares `event.target` to the dialog element itself, not the panel.

## CSS Tokens

| Token                        | Default                                         | Description                     |
| ---------------------------- | ----------------------------------------------- | ------------------------------- |
| `--modal-backdrop-color`     | `var(--ui-backdrop)`                            | Backdrop overlay color          |
| `--modal-backdrop-blur`      | `var(--ui-backdrop-blur)`                       | Backdrop blur amount            |
| `--modal-surface`            | `var(--ui-surface-overlay)`                     | Panel background                |
| `--modal-surface-foreground` | `var(--ui-surface-overlay-foreground)`          | Panel text color                |
| `--modal-border`             | `var(--ui-border)`                              | Panel border color              |
| `--modal-border-width`       | `var(--ui-border-width)`                        | Panel border width              |
| `--modal-border-radius`      | `calc(var(--ui-base-radius) * 1.5)`             | Panel corner radius             |
| `--modal-shadow`             | `0 25px 50px -12px ...`                         | Panel drop shadow               |
| `--modal-padding`            | `calc(var(--ui-base-spacing) * 3)`              | Inner padding                   |
| `--modal-sm-width`           | `calc(var(--ui-base-spacing) * 50)`             | Width for `size="sm"`           |
| `--modal-md-width`           | `calc(var(--ui-base-spacing) * 64)`             | Width for `size="md"`           |
| `--modal-lg-width`           | `calc(var(--ui-base-spacing) * 80)`             | Width for `size="lg"`           |
| `--modal-xl-width`           | `calc(var(--ui-base-spacing) * 96)`             | Width for `size="xl"`           |
| `--modal-title-size`         | `var(--ui-text-lg)`                             | Title font size                 |
| `--modal-title-weight`       | `var(--ui-weight-semibold)`                     | Title font weight               |
| `--modal-close-color`        | `color-mix(...)`                                | Close button icon color         |
| `--modal-close-hover-bg`     | `color-mix(...)`                                | Close button hover background   |
| `--modal-close-size`         | `calc(var(--ui-base-spacing) * 4)`              | Close button dimensions         |
| `--modal-footer-gap`         | `calc(var(--ui-base-spacing) * 1.5)`            | Gap between footer buttons      |
| `--modal-transition`         | `var(--ui-base-duration) var(--ui-base-easing)` | Enter animation duration/easing |
