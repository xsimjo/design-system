# Badge

Inline label component for status, category, or tag display. Supports 8 color variants, 3 sizes, and an optional remove button.

## Props

| Prop       | Type                                                                                                | Default     | Description                                           |
| ---------- | --------------------------------------------------------------------------------------------------- | ----------- | ----------------------------------------------------- |
| `label`    | `string`                                                                                            | required    | Text content of the badge                             |
| `variant`  | `'primary' \| 'secondary' \| 'accent' \| 'success' \| 'danger' \| 'warning' \| 'info' \| 'neutral'` | `'primary'` | Color variant                                         |
| `size`     | `'sm' \| 'md' \| 'lg'`                                                                              | `'md'`      | Controls height, padding, and font size               |
| `disabled` | `boolean`                                                                                           | `false`     | Reduces opacity and prevents remove interaction       |
| `onremove` | `() => void`                                                                                        | `—`         | If provided, renders a remove button inside the badge |

## Usage

### Basic

```svelte
<script>
	import { Badge } from '@xsimjo/design-system';
</script>

<Badge label="New" />
<Badge label="Success" variant="success" />
<Badge label="Error" variant="danger" />
```

### With Remove Button

```svelte
<script>
	import { Badge } from '@xsimjo/design-system';
	let tags = $state(['Svelte', 'TypeScript']);
</script>

{#each tags as tag}
	<Badge label={tag} onremove={() => (tags = tags.filter((t) => t !== tag))} />
{/each}
```

### Sizes

```svelte
<Badge label="Small" size="sm" />
<Badge label="Medium" size="md" />
<Badge label="Large" size="lg" />
```

### Disabled

```svelte
<Badge label="Inactive" disabled />
```

## Accessibility

- Badge is a `<span>` with `role` inherited from context
- Remove button uses `aria-label="Remove {label}"` for screen readers
- Remove button has `tabindex="-1"` — keyboard users navigate via parent component focus management
- Remove button is `disabled` when the badge is disabled

## Tokens

| Token                     | Default                                                   | Description                    |
| ------------------------- | --------------------------------------------------------- | ------------------------------ |
| `--badge-bg`              | `color-mix(in oklch, var(--ui-primary), transparent 88%)` | Badge background               |
| `--badge-fg`              | `var(--ui-primary)`                                       | Badge text color               |
| `--badge-border`          | `color-mix(in oklch, var(--ui-primary), transparent 75%)` | Badge border color             |
| `--badge-border-width`    | `var(--ui-border-width)`                                  | Border thickness               |
| `--badge-remove-hover-bg` | `color-mix(in oklch, var(--ui-primary), transparent 70%)` | Remove button hover background |
| `--badge-height-sm`       | `calc(var(--ui-base-spacing) * 6)`                        | Height for sm size             |
| `--badge-height-md`       | `calc(var(--ui-base-spacing) * 7)`                        | Height for md size             |
| `--badge-height-lg`       | `calc(var(--ui-base-spacing) * 8)`                        | Height for lg size             |
| `--badge-padding-x-sm`    | `calc(var(--ui-base-spacing) * 2.5)`                      | Horizontal padding for sm      |
| `--badge-padding-x-md`    | `calc(var(--ui-base-spacing) * 3)`                        | Horizontal padding for md      |
| `--badge-padding-x-lg`    | `calc(var(--ui-base-spacing) * 4)`                        | Horizontal padding for lg      |
| `--badge-font-size-sm`    | `var(--ui-text-xs)`                                       | Font size for sm               |
| `--badge-font-size-md`    | `var(--ui-text-sm)`                                       | Font size for md               |
| `--badge-font-size-lg`    | `var(--ui-text-base)`                                     | Font size for lg               |
| `--badge-border-radius`   | `calc(var(--ui-base-radius) * 10)`                        | Pill-shaped corner radius      |
| `--badge-remove-size`     | `calc(var(--ui-base-spacing) * 5)`                        | Remove button width/height     |
| `--badge-transition`      | `var(--ui-base-duration) var(--ui-base-easing)`           | Transition for remove button   |
