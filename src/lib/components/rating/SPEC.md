# Rating

A star rating widget for collecting or displaying a numeric score. Supports hover previews, keyboard navigation, readonly display mode, and optional form submission via a hidden input.

## Props

| Prop       | Type      | Default    | Description                                                |
| ---------- | --------- | ---------- | ---------------------------------------------------------- |
| `value`    | `number`  | `0`        | Bindable selected rating (0 = no rating, 1–max = selected) |
| `max`      | `number`  | `5`        | Total number of stars                                      |
| `readonly` | `boolean` | `false`    | Disables interaction; stars are display-only               |
| `disabled` | `boolean` | `false`    | Prevents interaction and applies 50% opacity               |
| `label`    | `string`  | `'Rating'` | Accessible label for the `radiogroup`                      |
| `name`     | `string`  | —          | When set, renders a hidden `<input>` for form submission   |

## Usage

### Basic

```svelte
<script>
	let rating = $state(0);
</script>

<Rating bind:value={rating} />
```

### Readonly Display

```svelte
<Rating value={4} readonly />
```

### Custom Max

```svelte
<Rating bind:value={score} max={10} />
```

### With Form Submission

```svelte
<form>
	<Rating bind:value={rating} name="product_rating" />
	<button type="submit">Submit</button>
</form>
```

### Disabled

```svelte
<Rating value={3} disabled />
```

## Keyboard Navigation

| Key                       | Action                               |
| ------------------------- | ------------------------------------ |
| `ArrowRight` / `ArrowUp`  | Increase rating by 1                 |
| `ArrowLeft` / `ArrowDown` | Decrease rating by 1 (minimum 0)     |
| `Home`                    | Set to 1 star                        |
| `End`                     | Set to maximum stars                 |
| `Tab`                     | Move focus to/from the rating widget |

Clicking an already-selected star deselects it (sets value to 0).

## Accessibility

- Container has `role="radiogroup"` and `aria-label` from the `label` prop.
- Each star has `role="radio"` and `aria-checked` reflecting its selected state.
- `aria-label` on each button names the star count (e.g. "3 stars").
- Roving `tabindex`: only the active (or first) star is in the tab order; arrow keys move focus within the group.
- `aria-disabled` is set on the group when `disabled` is true.
- When `readonly` or `disabled`, buttons have `cursor: default` and interaction is blocked.

## CSS Tokens

### Color Tokens

| Token                        | Default                 | Description                   |
| ---------------------------- | ----------------------- | ----------------------------- |
| `--rating-star-color`        | `var(--ui-warning)`     | Filled star color             |
| `--rating-star-empty-color`  | `var(--ui-border)`      | Empty (unselected) star color |
| `--rating-star-hover-color`  | `var(--ui-warning)`     | Star color on hover preview   |
| `--rating-focus-color`       | `var(--ui-primary)`     | Focus ring color              |
| `--rating-focus-ring-width`  | `var(--ui-ring-width)`  | Focus ring width              |
| `--rating-focus-ring-offset` | `var(--ui-ring-offset)` | Focus ring offset             |

### Size Tokens

| Token                | Description    |
| -------------------- | -------------- |
| `--rating-star-size` | Star icon size |

### Style Tokens

| Token                   | Default                                         | Description                       |
| ----------------------- | ----------------------------------------------- | --------------------------------- |
| `--rating-gap`          | `calc(var(--ui-base-spacing) * 1)`              | Gap between stars                 |
| `--rating-stroke-width` | `1.5`                                           | SVG stroke width for star outline |
| `--rating-transition`   | `var(--ui-base-duration) var(--ui-base-easing)` | Color and scale transition        |
