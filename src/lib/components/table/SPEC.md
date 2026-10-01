# Table

Composable table component for displaying structured data. Built from semantic HTML table elements with support for sorting, row selection, striped/bordered variants, sticky headers, and captions.

## Components

The Table system is a set of composable sub-components:

| Component     | Element   | Role                                    |
| ------------- | --------- | --------------------------------------- |
| `Table`       | `<table>` | Root container with layout and variants |
| `TableHead`   | `<thead>` | Header section                          |
| `TableBody`   | `<tbody>` | Body section                            |
| `TableFoot`   | `<tfoot>` | Footer section                          |
| `TableRow`    | `<tr>`    | Table row (supports selection)          |
| `TableHeader` | `<th>`    | Header cell (supports sorting)          |
| `TableCell`   | `<td>`    | Data cell                               |

---

## Table

Root wrapper. Renders a `<div>` (the scrollable container) wrapping a `<table>`.

### Props

| Prop           | Type                                 | Default    | Description                                         |
| -------------- | ------------------------------------ | ---------- | --------------------------------------------------- |
| `variant`      | `'plain' \| 'striped' \| 'bordered'` | `'plain'`  | Visual style                                        |
| `size`         | `'sm' \| 'md' \| 'lg'`               | `'md'`     | Cell padding and font size                          |
| `stickyHeader` | `boolean`                            | `false`    | Pins `<thead>` cells when the table scrolls         |
| `maxHeight`    | `string`                             | —          | Sets `--table-max-height` (requires `stickyHeader`) |
| `caption`      | `string`                             | —          | Renders a `<caption>` element                       |
| `captionSide`  | `'top' \| 'bottom'`                  | `'bottom'` | Caption placement via `caption-side`                |

Passes all native `<table>` attributes via `...restProps`.

---

## TableHead

Thin wrapper around `<thead>`. Passes all native attributes via `...restProps`.

---

## TableBody

Thin wrapper around `<tbody>`. Passes all native attributes via `...restProps`.

---

## TableFoot

Thin wrapper around `<tfoot>`. Passes all native attributes via `...restProps`.

---

## TableRow

Renders a `<tr>`. When `onclick` is provided the row becomes keyboard-accessible.

### Props

| Prop       | Type      | Default | Description                                          |
| ---------- | --------- | ------- | ---------------------------------------------------- |
| `selected` | `boolean` | `false` | Highlights the row as selected; sets `aria-selected` |

- When `onclick` is present the row receives `tabindex="0"` and responds to Enter/Space.
- Passes all native `<tr>` attributes via `...restProps`.

---

## TableHeader

Renders a `<th>`. Supports column sorting via an internal `<button>`.

### Props

| Prop       | Type                            | Default     | Description                                    |
| ---------- | ------------------------------- | ----------- | ---------------------------------------------- |
| `sortable` | `boolean`                       | `false`     | Enables sort button and sort icon              |
| `sort`     | `'asc' \| 'desc' \| undefined`  | `undefined` | Current sort direction; controls icon state    |
| `onsort`   | `() => void`                    | —           | Callback fired when the sort button is clicked |
| `align`    | `'left' \| 'center' \| 'right'` | `'left'`    | Text alignment                                 |
| `width`    | `string`                        | —           | Sets the column width (CSS value)              |

- When `sortable`, renders a `<button>` inside `<th>` with a sort icon (`ArrowUpDown`, `ArrowUp`, or `ArrowDown`).
- Sets `aria-sort` to `'ascending'`, `'descending'`, or `'none'` appropriately.
- Passes all native `<th>` attributes via `...restProps`.

---

## TableCell

Renders a `<td>`.

### Props

| Prop       | Type                            | Default  | Description                                        |
| ---------- | ------------------------------- | -------- | -------------------------------------------------- |
| `align`    | `'left' \| 'center' \| 'right'` | `'left'` | Text alignment                                     |
| `truncate` | `boolean`                       | `false`  | Truncates text with ellipsis at `max-width: 200px` |

Passes all native `<td>` attributes via `...restProps`.

---

## Usage

### Basic

```svelte
<script>
	import {
		Table,
		TableHead,
		TableBody,
		TableRow,
		TableHeader,
		TableCell
	} from '@xsimjo/design-system';

	const users = [
		{ id: 1, name: 'Alice Johnson', role: 'Engineer', status: 'Active' },
		{ id: 2, name: 'Bob Smith', role: 'Designer', status: 'Active' },
		{ id: 3, name: 'Carol White', role: 'Manager', status: 'On Leave' }
	];
</script>

<Table>
	<TableHead>
		<TableRow>
			<TableHeader>Name</TableHeader>
			<TableHeader>Role</TableHeader>
			<TableHeader>Status</TableHeader>
		</TableRow>
	</TableHead>
	<TableBody>
		{#each users as user (user.id)}
			<TableRow>
				<TableCell>{user.name}</TableCell>
				<TableCell>{user.role}</TableCell>
				<TableCell>{user.status}</TableCell>
			</TableRow>
		{/each}
	</TableBody>
</Table>
```

### Variants

```svelte
<Table variant="striped">...</Table>
<Table variant="bordered">...</Table>
```

### Sorting

Manage sort state externally; pass `sort` and `onsort` to each `TableHeader`.

```svelte
<script>
	let sortCol = $state('name');
	let sortDir = $state<'asc' | 'desc'>('asc');

	function toggleSort(col: string) {
		if (sortCol === col) {
			sortDir = sortDir === 'asc' ? 'desc' : 'asc';
		} else {
			sortCol = col;
			sortDir = 'asc';
		}
	}
</script>

<TableHeader
	sortable
	sort={sortCol === 'name' ? sortDir : undefined}
	onsort={() => toggleSort('name')}
>
	Name
</TableHeader>
```

### Row Selection

```svelte
<script>
	let selectedId = $state<number | null>(null);
</script>

<TableRow
	selected={user.id === selectedId}
	onclick={() => (selectedId = user.id === selectedId ? null : user.id)}
>
	...
</TableRow>
```

### Sticky Header

```svelte
<Table stickyHeader maxHeight="320px">...</Table>
```

### With Pagination

```svelte
<script>
	import {
		Table,
		TableHead,
		TableBody,
		TableRow,
		TableCell,
		Pagination
	} from '@xsimjo/design-system';

	let page = $state(1);
	const pageSize = 5;

	const pagedRows = $derived(allRows.slice((page - 1) * pageSize, page * pageSize));
</script>

<Table>...</Table>
<Pagination bind:page total={allRows.length} {pageSize} />
```

---

## Accessibility

- Uses native `<table>`, `<thead>`, `<tbody>`, `<th>`, `<td>` elements for implicit semantics.
- Sortable `<th>` cells expose `aria-sort` (`ascending` / `descending` / `none`).
- The sort button is a native `<button>` — keyboard-accessible via Tab + Enter/Space.
- Clickable `<tr>` rows receive `tabindex="0"` and respond to Enter/Space.
- Selected rows expose `aria-selected="true"`.
- Caption is rendered as a semantic `<caption>` element.

---

## CSS Tokens

| Token                          | Default                                                              | Description                        |
| ------------------------------ | -------------------------------------------------------------------- | ---------------------------------- |
| `--table-bg`                   | `var(--ui-surface-raised)`                                           | Wrapper background                 |
| `--table-border-radius`        | `var(--ui-base-radius)`                                              | Wrapper corner radius              |
| `--table-border-color`         | `var(--ui-border)`                                                   | Border color                       |
| `--table-border-width`         | `var(--ui-border-width)`                                             | Border thickness                   |
| `--table-shadow`               | `var(--ui-depth)`                                                    | Wrapper shadow                     |
| `--table-header-bg`            | `color-mix(in oklch, var(--ui-neutral), transparent 88%)`            | Header cell background             |
| `--table-header-text`          | `var(--ui-surface-foreground)`                                       | Header cell text                   |
| `--table-header-font-weight`   | `var(--ui-weight-semibold)`                                          | Header font weight                 |
| `--table-header-hover-bg`      | `color-mix(in oklch, var(--ui-neutral), transparent 80%)`            | Sortable header hover bg           |
| `--table-row-bg`               | `var(--ui-surface-raised)`                                           | Default row background             |
| `--table-row-text`             | `var(--ui-surface-raised-foreground)`                                | Default row text                   |
| `--table-row-hover-bg`         | `color-mix(in oklch, var(--ui-primary), transparent 94%)`            | Clickable row hover bg             |
| `--table-row-selected-bg`      | `color-mix(in oklch, var(--ui-primary), transparent 88%)`            | Selected row background            |
| `--table-row-selected-text`    | `var(--ui-surface-foreground)`                                       | Selected row text                  |
| `--table-row-cursor-clickable` | `pointer`                                                            | Cursor for clickable rows          |
| `--table-stripe-bg`            | `color-mix(in oklch, var(--ui-neutral), transparent 93%)`            | Striped even-row background        |
| `--table-cell-sm-padding`      | `calc(var(--ui-base-spacing) * 2) calc(var(--ui-base-spacing) * 3)`  | Small cell padding                 |
| `--table-cell-md-padding`      | `calc(var(--ui-base-spacing) * 3) calc(var(--ui-base-spacing) * 4)`  | Medium cell padding                |
| `--table-cell-lg-padding`      | `calc(var(--ui-base-spacing) * 4) calc(var(--ui-base-spacing) * 6)`  | Large cell padding                 |
| `--table-font-sm`              | `var(--ui-text-xs)`                                                  | Font size at sm                    |
| `--table-font-md`              | `var(--ui-text-sm)`                                                  | Font size at md                    |
| `--table-font-lg`              | `var(--ui-text-base)`                                                | Font size at lg                    |
| `--table-sort-color`           | `color-mix(in oklch, var(--ui-surface-foreground), transparent 55%)` | Inactive sort icon color           |
| `--table-sort-active-color`    | `var(--ui-primary)`                                                  | Active sort icon color             |
| `--table-caption-color`        | `color-mix(in oklch, var(--ui-surface-foreground), transparent 45%)` | Caption text color                 |
| `--table-caption-font-size`    | `var(--ui-text-sm)`                                                  | Caption font size                  |
| `--table-focus-ring-width`     | `var(--ui-ring-width)`                                               | Focus ring width                   |
| `--table-focus-ring-color`     | `var(--ui-primary)`                                                  | Focus ring color                   |
| `--table-focus-ring-offset`    | `var(--ui-ring-offset)`                                              | Focus ring offset                  |
| `--table-transition`           | `var(--ui-base-duration) var(--ui-base-easing)`                      | Animation timing                   |
| `--table-max-height`           | `calc(var(--ui-base-spacing) * 100)`                                 | Default max-height for sticky mode |
