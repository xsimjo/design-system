<script lang="ts">
	interface Props {
		title?: string;
		columns: string[];
		rows: string[][];
	}

	let { title, columns, rows }: Props = $props();

	const hasDescriptionColumn = $derived(columns[columns.length - 1] === 'Description');

	function isCodeCell(colIndex: number): boolean {
		return hasDescriptionColumn ? colIndex < columns.length - 1 : true;
	}
</script>

<div class="props-group">
	{#if title}
		<h3>{title}</h3>
	{/if}
	<table class="props-table">
		<thead>
			<tr>
				{#each columns as col (col)}
					<th>{col}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each rows as row (row[0])}
				<tr>
					{#each row as cell, i (i)}
						<td>
							{#if isCodeCell(i)}
								<code>{cell}</code>
							{:else}
								{cell}
							{/if}
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.props-group {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		margin-bottom: var(--space-6);
	}

	.props-group h3 {
		font-size: var(--ui-text-lg);
		font-weight: 600;
		color: var(--ui-surface-foreground);
		margin: 0;
	}

	.props-table {
		width: 100%;
		border-collapse: collapse;
		font-size: var(--ui-text-sm);
	}

	.props-table th,
	.props-table td {
		padding: var(--space-2) var(--space-3);
		text-align: left;
		border-bottom: 1px solid var(--ui-border);
	}

	.props-table th {
		font-weight: 600;
		background: color-mix(in oklch, var(--ui-neutral), transparent 85%);
	}

	.props-table code {
		font-family: var(--ui-font-mono);
		font-size: var(--font-size-xs);
		background: color-mix(in oklch, var(--ui-neutral), transparent 85%);
		padding: 2px 6px;
		border-radius: calc(var(--ui-base-radius) * 0.5);
	}
</style>
