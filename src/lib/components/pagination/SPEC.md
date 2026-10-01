# Pagination

Navigation control for paged data. Renders a `<nav>` with numbered page buttons and prev/next (and optional first/last) arrow controls. Page range uses a smart ellipsis algorithm to keep the control compact at any page count.

## Props

| Prop            | Type                     | Default | Description                                                |
| --------------- | ------------------------ | ------- | ---------------------------------------------------------- |
| `page`          | `number`                 | `1`     | Current page (1-based). **Bindable.**                      |
| `total`         | `number`                 | —       | Total number of items. Controls how many pages exist.      |
| `pageSize`      | `number`                 | `10`    | Items per page. `totalPages = Math.ceil(total / pageSize)` |
| `siblingCount`  | `number`                 | `1`     | Pages shown on each side of the current page button        |
| `showFirstLast` | `boolean`                | `true`  | Show ⏮/⏭ buttons to jump to the first and last page        |
| `size`          | `'sm' \| 'md' \| 'lg'`   | `'md'`  | Visual size of all buttons                                 |
| `onPageChange`  | `(page: number) => void` | —       | Callback fired on every page change                        |

Passes all native `<nav>` attributes via `...restProps` (e.g. `class`, `aria-label` override).

---

## Page Range Algorithm

Given `total = 20`, `siblingCount = 1`:

| Current page | Visible range        |
| ------------ | -------------------- |
| 1            | `1 2 3 4 5 … 20`     |
| 5            | `1 … 4 5 6 … 20`     |
| 10           | `1 … 9 10 11 … 20`   |
| 18           | `1 … 16 17 18 19 20` |

Pages ≤ `siblingCount * 2 + 5` are always shown in full without ellipsis.

---

## Usage

### Basic (uncontrolled-ish with bind)

```svelte
<script>
	import { Pagination } from '@xsimjo/design-system';

	let page = $state(1);
</script>

<Pagination bind:page total={200} pageSize={10} />
```

### Controlled (onPageChange callback)

```svelte
<script>
	let currentPage = $state(1);

	function handlePageChange(newPage: number) {
		currentPage = newPage;
		// fetch data for newPage...
	}
</script>

<Pagination bind:page={currentPage} total={500} pageSize={25} onPageChange={handlePageChange} />
```

### Sizes

```svelte
<Pagination page={1} total={100} size="sm" />
<Pagination page={1} total={100} size="md" />
<Pagination page={1} total={100} size="lg" />
```

### Without First / Last Buttons

```svelte
<Pagination page={1} total={100} showFirstLast={false} />
```

### Wide Sibling Range

```svelte
<!-- Shows 2 pages on each side of current: 1 … 3 4 [5] 6 7 … 20 -->
<Pagination page={5} total={200} siblingCount={2} />
```

### Paired with Table

```svelte
<script>
	const allRows = getDataset();
	let page = $state(1);
	const pageSize = 10;

	const rows = $derived(allRows.slice((page - 1) * pageSize, page * pageSize));
</script>

<Table>
	<TableHead>...</TableHead>
	<TableBody>
		{#each rows as row (row.id)}
			<TableRow>...</TableRow>
		{/each}
	</TableBody>
</Table>

<Pagination bind:page total={allRows.length} {pageSize} />
```

---

## Accessibility

- Renders a semantic `<nav aria-label="Pagination navigation">`.
- Each page button has `aria-label="Page N"`.
- The current page button has `aria-current="page"`.
- Prev/next/first/last buttons have descriptive `aria-label` values.
- Disabled buttons use the native `disabled` attribute.
- All interactive elements receive a visible focus ring on keyboard navigation.
- Ellipsis spans are `aria-hidden="true"`.

---

## CSS Tokens

| Token                               | Default                                                              | Description                    |
| ----------------------------------- | -------------------------------------------------------------------- | ------------------------------ |
| `--pagination-item-sm`              | `calc(var(--ui-base-spacing) * 8)`                                   | Height & min-width at sm       |
| `--pagination-item-md`              | `calc(var(--ui-base-spacing) * 10)`                                  | Height & min-width at md       |
| `--pagination-item-lg`              | `calc(var(--ui-base-spacing) * 12)`                                  | Height & min-width at lg       |
| `--pagination-font-sm`              | `var(--ui-text-xs)`                                                  | Font size at sm                |
| `--pagination-font-md`              | `var(--ui-text-sm)`                                                  | Font size at md                |
| `--pagination-font-lg`              | `var(--ui-text-base)`                                                | Font size at lg                |
| `--pagination-gap-sm`               | `calc(var(--ui-base-spacing) * 1)`                                   | Gap between items at sm        |
| `--pagination-gap-md`               | `calc(var(--ui-base-spacing) * 1.5)`                                 | Gap between items at md        |
| `--pagination-gap-lg`               | `var(--ui-base-spacing)`                                             | Gap between items at lg        |
| `--pagination-item-bg`              | `transparent`                                                        | Default button background      |
| `--pagination-item-text`            | `var(--ui-surface-foreground)`                                       | Default button text            |
| `--pagination-item-border`          | `var(--ui-border)`                                                   | Default button border          |
| `--pagination-item-hover-bg`        | `color-mix(in oklch, var(--ui-neutral), transparent 82%)`            | Hover background               |
| `--pagination-item-hover-border`    | `var(--ui-border)`                                                   | Hover border                   |
| `--pagination-item-active-bg`       | `var(--ui-primary)`                                                  | Active/current page background |
| `--pagination-item-active-text`     | `var(--ui-primary-foreground)`                                       | Active/current page text       |
| `--pagination-item-active-border`   | `var(--ui-primary)`                                                  | Active/current page border     |
| `--pagination-item-disabled-text`   | `color-mix(in oklch, var(--ui-surface-foreground), transparent 60%)` | Disabled button text           |
| `--pagination-item-disabled-border` | `color-mix(in oklch, var(--ui-border), transparent 40%)`             | Disabled button border         |
| `--pagination-dots-color`           | `color-mix(in oklch, var(--ui-surface-foreground), transparent 40%)` | Ellipsis color                 |
| `--pagination-border-radius`        | `var(--ui-base-radius)`                                              | Button corner radius           |
| `--pagination-border-width`         | `var(--ui-border-width)`                                             | Button border thickness        |
| `--pagination-focus-ring-width`     | `var(--ui-ring-width)`                                               | Focus ring width               |
| `--pagination-focus-ring-color`     | `var(--ui-primary)`                                                  | Focus ring color               |
| `--pagination-focus-ring-offset`    | `var(--ui-ring-offset)`                                              | Focus ring offset              |
| `--pagination-transition`           | `var(--ui-base-duration) var(--ui-base-easing)`                      | Animation timing               |
