# Drawer

A panel that slides in from the edge of the viewport. Built on the native `<dialog>` element for automatic focus trapping, Escape key handling, and screen reader accessibility.

## Props

### Drawer

| Prop                  | Type                           | Default   | Description                                          |
| --------------------- | ------------------------------ | --------- | ---------------------------------------------------- |
| `open`                | `boolean`                      | `false`   | Bindable open state                                  |
| `size`                | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'`    | Width of the drawer panel                            |
| `placement`           | `'left' \| 'right'`            | `'right'` | Which edge the drawer slides from                    |
| `title`               | `string`                       | —         | Renders a default header with title and close button |
| `closeOnClickOutside` | `boolean`                      | `true`    | Close when clicking the backdrop                     |
| `closeOnEscape`       | `boolean`                      | `true`    | Close on Escape key                                  |
| `header`              | `Snippet`                      | —         | Custom header content, overrides `title`             |
| `footer`              | `Snippet`                      | —         | Footer content, right-aligned                        |
| `children`            | `Snippet`                      | required  | Drawer body content                                  |

### DrawerHeader

| Prop       | Type      | Default | Description                              |
| ---------- | --------- | ------- | ---------------------------------------- |
| `title`    | `string`  | —       | Title text rendered as an h2             |
| `children` | `Snippet` | —       | Custom header content, overrides `title` |

### DrawerBody

| Prop       | Type      | Default  | Description             |
| ---------- | --------- | -------- | ----------------------- |
| `children` | `Snippet` | required | Scrollable body content |

### DrawerFooter

| Prop       | Type      | Default  | Description    |
| ---------- | --------- | -------- | -------------- |
| `children` | `Snippet` | required | Footer content |

## Anatomy

```svelte
<!-- Convenience API -->
<Drawer bind:open title="Settings">
	<p>Content here</p>
	{#snippet footer()}
		<Button onclick={() => (open = false)}>Save</Button>
	{/snippet}
</Drawer>

<!-- Compound API -->
<Drawer bind:open>
	<DrawerHeader title="Settings" />
	<DrawerBody>
		<p>Scrollable content</p>
	</DrawerBody>
	<DrawerFooter>
		<Button onclick={() => (open = false)}>Save</Button>
	</DrawerFooter>
</Drawer>
```

## Accessibility

- Uses native `<dialog>` with `showModal()` for built-in focus trapping
- `aria-modal="true"` signals a modal dialog to screen readers
- `aria-labelledby` links to the title when provided
- `aria-describedby` links to the body content
- Close button has `aria-label="Close drawer"`
- Escape key closes the drawer (configurable)
- `prefers-reduced-motion: reduce` disables slide animations

## CSS Tokens

| Token                         | Default                                         | Description              |
| ----------------------------- | ----------------------------------------------- | ------------------------ |
| `--drawer-backdrop-color`     | `var(--ui-backdrop)`                            | Backdrop overlay color   |
| `--drawer-backdrop-blur`      | `var(--ui-backdrop-blur)`                       | Backdrop blur amount     |
| `--drawer-surface`            | `var(--ui-surface-overlay)`                     | Panel background         |
| `--drawer-surface-foreground` | `var(--ui-surface-overlay-foreground)`          | Panel text color         |
| `--drawer-shadow`             | `var(--ui-depth)`                               | Panel drop shadow        |
| `--drawer-padding`            | `calc(var(--ui-base-spacing) * 3)`              | Inner padding            |
| `--drawer-sm-width`           | `calc(var(--ui-base-spacing) * 50)`             | Width for size="sm"      |
| `--drawer-md-width`           | `calc(var(--ui-base-spacing) * 64)`             | Width for size="md"      |
| `--drawer-lg-width`           | `calc(var(--ui-base-spacing) * 80)`             | Width for size="lg"      |
| `--drawer-xl-width`           | `calc(var(--ui-base-spacing) * 96)`             | Width for size="xl"      |
| `--drawer-title-size`         | `var(--ui-text-lg)`                             | Title font size          |
| `--drawer-title-weight`       | `var(--ui-weight-semibold)`                     | Title font weight        |
| `--drawer-footer-gap`         | `calc(var(--ui-base-spacing) * 1.5)`            | Gap between footer items |
| `--drawer-transition`         | `var(--ui-base-duration) var(--ui-base-easing)` | Animation timing         |
