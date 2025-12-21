# Table

A data table component for displaying structured information in rows and columns.

## Props

| Prop        | Type                       | Default | Description                        |
| ----------- | -------------------------- | ------- | ---------------------------------- |
| `columns`   | `Column[]`                 | required | Array of column definitions        |
| `data`      | `Record<string, unknown>[]` | required | Array of row data objects          |
| `size`      | `'sm' \| 'md' \| 'lg'`     | `'md'`  | Size variant                       |
| `striped`   | `boolean`                  | `false` | Alternating row backgrounds        |
| `hoverable` | `boolean`                  | `false` | Highlight rows on hover            |
| `compact`   | `boolean`                  | `false` | Reduced padding                    |
| `bordered`  | `boolean`                  | `false` | Show cell borders                  |

### Column Interface

```typescript
interface Column {
	key: string;
	header: string;
	align?: 'left' | 'center' | 'right';
}
```

## Slots

| Slot   | Description                                                   |
| ------ | ------------------------------------------------------------- |
| `cell` | Custom cell renderer with `{ value, row, column }` parameters |

## Usage

### Basic

```svelte
<Table
	columns={[
		{ key: 'name', header: 'Name' },
		{ key: 'email', header: 'Email' },
		{ key: 'role', header: 'Role' }
	]}
	data={[
		{ name: 'John Doe', email: 'john@example.com', role: 'Admin' },
		{ name: 'Jane Smith', email: 'jane@example.com', role: 'User' }
	]}
/>
```

### With Striped Rows

```svelte
<Table columns={columns} data={data} striped />
```

### With Hover Effect

```svelte
<Table columns={columns} data={data} hoverable />
```

### Column Alignment

```svelte
<Table
	columns={[
		{ key: 'product', header: 'Product', align: 'left' },
		{ key: 'quantity', header: 'Qty', align: 'center' },
		{ key: 'price', header: 'Price', align: 'right' }
	]}
	data={products}
/>
```

### Custom Cell Rendering

```svelte
<Table columns={columns} data={data}>
	{#snippet cell({ value, row, column })}
		{#if column.key === 'status'}
			<Badge variant={value === 'active' ? 'success' : 'error'}>{value}</Badge>
		{:else if column.key === 'actions'}
			<Button size="sm">Edit</Button>
		{:else}
			{value}
		{/if}
	{/snippet}
</Table>
```

### Size Variants

```svelte
<Table columns={columns} data={data} size="sm" />
<Table columns={columns} data={data} size="md" />
<Table columns={columns} data={data} size="lg" />
```

### Compact Mode

```svelte
<Table columns={columns} data={data} compact />
```

### With Cell Borders

```svelte
<Table columns={columns} data={data} bordered />
```

## Accessibility

- Uses semantic `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>` elements
- Header cells use `<th>` for proper screen reader announcement
- Supports horizontal scrolling for wide tables

## Tokens

This component uses the following semantic tokens:

- `--table-bg` - Table background color
- `--table-border` - Table border color
- `--table-border-width` - Table border width
- `--table-border-radius` - Table border radius
- `--table-shadow` - Table box shadow
- `--table-header-bg` - Header background color
- `--table-header-text` - Header text color
- `--table-header-font-family` - Header font family
- `--table-header-font-size` - Header font size
- `--table-header-font-weight` - Header font weight
- `--table-header-line-height` - Header line height
- `--table-header-border` - Header border color
- `--table-header-border-width` - Header border width
- `--table-row-bg` - Row background color
- `--table-row-bg-striped` - Striped row background
- `--table-row-bg-hover` - Hover row background
- `--table-row-text` - Row text color
- `--table-row-border` - Row border color
- `--table-row-border-width` - Row border width
- `--table-cell-font-family` - Cell font family
- `--table-cell-font-size` - Cell font size
- `--table-cell-font-weight` - Cell font weight
- `--table-cell-line-height` - Cell line height
- `--table-cell-padding-x-sm` - Small horizontal padding
- `--table-cell-padding-y-sm` - Small vertical padding
- `--table-cell-padding-x-md` - Medium horizontal padding
- `--table-cell-padding-y-md` - Medium vertical padding
- `--table-cell-padding-x-lg` - Large horizontal padding
- `--table-cell-padding-y-lg` - Large vertical padding
- `--table-cell-border` - Cell border color
- `--table-cell-border-width` - Cell border width
- `--table-compact-cell-padding-x` - Compact horizontal padding
- `--table-compact-cell-padding-y` - Compact vertical padding
- `--table-compact-font-size` - Compact font size
- `--table-transition` - Transition duration
- `--table-cursor-row-hover` - Hover cursor
