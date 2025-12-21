<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Column {
		key: string;
		header: string;
		align?: 'left' | 'center' | 'right';
	}

	interface Props {
		columns: Column[];
		data: Record<string, unknown>[];
		size?: 'sm' | 'md' | 'lg';
		striped?: boolean;
		hoverable?: boolean;
		compact?: boolean;
		bordered?: boolean;
		cell?: Snippet<[{ value: unknown; row: Record<string, unknown>; column: Column }]>;
	}

	let {
		columns,
		data,
		size = 'md',
		striped = false,
		hoverable = false,
		compact = false,
		bordered = false,
		cell
	}: Props = $props();
</script>

<div class="table-wrapper">
	<table
		class="table table--{size}"
		class:table--striped={striped}
		class:table--hoverable={hoverable}
		class:table--compact={compact}
		class:table--bordered={bordered}
	>
		<thead class="table__head">
			<tr class="table__row table__row--header">
				{#each columns as column (column.key)}
					<th
						class="table__cell table__cell--header"
						class:table__cell--left={column.align === 'left' || !column.align}
						class:table__cell--center={column.align === 'center'}
						class:table__cell--right={column.align === 'right'}
					>
						{column.header}
					</th>
				{/each}
			</tr>
		</thead>
		<tbody class="table__body">
			{#each data as row, rowIndex (rowIndex)}
				<tr
					class="table__row table__row--body"
					class:table__row--striped={striped && rowIndex % 2 === 1}
				>
					{#each columns as column (column.key)}
						<td
							class="table__cell table__cell--body"
							class:table__cell--left={column.align === 'left' || !column.align}
							class:table__cell--center={column.align === 'center'}
							class:table__cell--right={column.align === 'right'}
						>
							{#if cell}
								{@render cell({ value: row[column.key], row, column })}
							{:else}
								{row[column.key]}
							{/if}
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.table-wrapper {
		overflow-x: auto;
		border-radius: var(--table-border-radius);
	}

	.table {
		width: 100%;
		border-collapse: collapse;
		background: var(--table-bg);
		border: var(--table-border-width) solid var(--table-border);
		border-radius: var(--table-border-radius);
		box-shadow: var(--table-shadow);
		font-family: var(--table-cell-font-family);
		font-size: var(--table-cell-font-size);
		font-weight: var(--table-cell-font-weight);
		line-height: var(--table-cell-line-height);
		color: var(--table-row-text);
	}

	.table__head {
		background: var(--table-header-bg);
	}

	.table__cell--header {
		padding: var(--table-cell-padding-y-md) var(--table-cell-padding-x-md);
		font-family: var(--table-header-font-family);
		font-size: var(--table-header-font-size);
		font-weight: var(--table-header-font-weight);
		line-height: var(--table-header-line-height);
		color: var(--table-header-text);
		border-bottom: var(--table-header-border-width) solid var(--table-header-border);
	}

	.table--sm .table__cell--header {
		padding: var(--table-cell-padding-y-sm) var(--table-cell-padding-x-sm);
	}

	.table--lg .table__cell--header {
		padding: var(--table-cell-padding-y-lg) var(--table-cell-padding-x-lg);
	}

	.table--compact .table__cell--header {
		padding: var(--table-compact-cell-padding-y) var(--table-compact-cell-padding-x);
		font-size: var(--table-compact-font-size);
	}

	.table__cell--body {
		padding: var(--table-cell-padding-y-md) var(--table-cell-padding-x-md);
		background: var(--table-row-bg);
		border-bottom: var(--table-row-border-width) solid var(--table-row-border);
	}

	.table--sm .table__cell--body {
		padding: var(--table-cell-padding-y-sm) var(--table-cell-padding-x-sm);
	}

	.table--lg .table__cell--body {
		padding: var(--table-cell-padding-y-lg) var(--table-cell-padding-x-lg);
	}

	.table--compact .table__cell--body {
		padding: var(--table-compact-cell-padding-y) var(--table-compact-cell-padding-x);
		font-size: var(--table-compact-font-size);
	}

	.table__row--body:last-child .table__cell--body {
		border-bottom: none;
	}

	.table__row--striped .table__cell--body {
		background: var(--table-row-bg-striped);
	}

	.table--hoverable .table__row--body:hover .table__cell--body {
		background: var(--table-row-bg-hover);
		cursor: var(--table-cursor-row-hover);
		transition: background var(--table-transition);
	}

	.table--bordered .table__cell {
		border-right: var(--table-cell-border-width) solid var(--table-cell-border);
	}

	.table--bordered .table__cell:last-child {
		border-right: none;
	}

	.table__cell--left {
		text-align: left;
	}

	.table__cell--center {
		text-align: center;
	}

	.table__cell--right {
		text-align: right;
	}
</style>
