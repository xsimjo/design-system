# Card

A surface container for grouping related content. Supports compound sub-components for structured layouts with header, body, and footer sections.

## Props

| Prop       | Type                                    | Default     | Description                                                                                             |
| ---------- | --------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------- |
| `variant`  | `'default' \| 'outlined' \| 'elevated'` | `'default'` | Visual style: border, heavier border, or shadow                                                         |
| `padding`  | `'none' \| 'sm' \| 'md' \| 'lg'`        | `'md'`      | Inner spacing for sub-components only — has no effect without `CardHeader`, `CardBody`, or `CardFooter` |
| `children` | `Snippet`                               | required    | Card content, typically sub-components                                                                  |

## Sub-components

### CardHeader

Top section of a card. Receives padding from the parent `Card` via CSS inheritance.

| Prop       | Type      | Default  | Description    |
| ---------- | --------- | -------- | -------------- |
| `children` | `Snippet` | required | Header content |

### CardBody

Main content section. Receives padding from the parent `Card` via CSS inheritance. A divider is automatically rendered above it when preceded by a `CardHeader`.

| Prop       | Type      | Default  | Description  |
| ---------- | --------- | -------- | ------------ |
| `children` | `Snippet` | required | Body content |

### CardFooter

Bottom section. Renders as a flex row with `align-items: center` and a gap for action buttons. A divider is automatically rendered above it when preceded by a `CardHeader` or `CardBody`.

| Prop       | Type      | Default  | Description    |
| ---------- | --------- | -------- | -------------- |
| `children` | `Snippet` | required | Footer content |

All sub-components forward all `HTMLDivElement` attributes to their root element.

## Slots

| Slot       | Description                                         |
| ---------- | --------------------------------------------------- |
| `children` | Card content — free-form or compound sub-components |

## Usage

### Basic

```svelte
<script>
	import { Card, CardBody } from '@xsimjo/design-system';
</script>

<Card>
	<CardBody>Card content goes here.</CardBody>
</Card>
```

### Variants

```svelte
<Card variant="default">
	<CardBody>Default — subtle border.</CardBody>
</Card>

<Card variant="outlined">
	<CardBody>Outlined — heavier border weight.</CardBody>
</Card>

<Card variant="elevated">
	<CardBody>Elevated — drop shadow, no border.</CardBody>
</Card>
```

### Padding sizes

```svelte
<Card padding="sm"><CardBody>Compact.</CardBody></Card>
<Card padding="md"><CardBody>Default.</CardBody></Card>
<Card padding="lg"><CardBody>Spacious.</CardBody></Card>
<Card padding="none"><CardBody>No padding.</CardBody></Card>
```

### Compound with header, body, and footer

```svelte
<script>
	import { Card, CardHeader, CardBody, CardFooter, Button, Badge } from '@xsimjo/design-system';
</script>

<Card variant="elevated" style="max-width: 360px">
	<CardHeader>
		<strong>Project Alpha</strong>
		<Badge label="Active" variant="success" />
	</CardHeader>
	<CardBody>Deploy pipeline is green. Last run completed 4 minutes ago.</CardBody>
	<CardFooter>
		<Button variant="filled" color="primary" size="sm">View logs</Button>
		<Button variant="ghost" color="neutral" size="sm">Dismiss</Button>
	</CardFooter>
</Card>
```

## Accessibility

- Card renders as a plain `<div>` with no implicit ARIA role. Add `role="article"`, `role="region"`, or an appropriate landmark via `restProps` when semantic grouping is needed.
- All sub-components (`CardHeader`, `CardBody`, `CardFooter`) are also plain `<div>` elements — apply `aria-labelledby` or heading elements as needed for screen reader context.
- No interactive behavior is built in; if the card itself is clickable, wrap it in or replace it with an `<a>` or `<button>` element.

## Tokens

This component uses the following component tokens (defined in `card.css`):

- `--card-bg` — card background color (defaults to the raised surface)
- `--card-foreground` — card text color; inherits to all content inside the card, override to retheme the entire card's text
- `--card-border-color` — border color used for the `default` and `outlined` variants and section dividers
- `--card-border-width` — base border thickness; doubled for the `outlined` variant
- `--card-radius` — corner radius of the card
- `--card-divider-color` — color of the divider line rendered between adjacent sub-components
- `--card-shadow` — box shadow for the `elevated` variant
- `--card-padding-sm` — inner spacing when `padding="sm"` (16px by default)
- `--card-padding-md` — inner spacing when `padding="md"` (32px by default)
- `--card-padding-lg` — inner spacing when `padding="lg"` (48px by default)
- `--card-footer-gap` — gap between items in `CardFooter` (16px by default)
