<script lang="ts">
	import Table from '$lib/components/table/Table.svelte';

	const columns = [
		{ key: 'name', header: 'Name' },
		{ key: 'email', header: 'Email' },
		{ key: 'role', header: 'Role' },
		{ key: 'status', header: 'Status', align: 'center' as const }
	];

	const data = [
		{ name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active' },
		{ name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'Active' },
		{ name: 'Carol White', email: 'carol@example.com', role: 'Viewer', status: 'Inactive' },
		{ name: 'David Brown', email: 'david@example.com', role: 'Editor', status: 'Active' },
		{ name: 'Eve Davis', email: 'eve@example.com', role: 'Viewer', status: 'Pending' }
	];

	const numericColumns = [
		{ key: 'product', header: 'Product' },
		{ key: 'quantity', header: 'Qty', align: 'right' as const },
		{ key: 'price', header: 'Price', align: 'right' as const },
		{ key: 'total', header: 'Total', align: 'right' as const }
	];

	const numericData = [
		{ product: 'Widget A', quantity: 10, price: '$25.00', total: '$250.00' },
		{ product: 'Widget B', quantity: 5, price: '$50.00', total: '$250.00' },
		{ product: 'Widget C', quantity: 20, price: '$15.00', total: '$300.00' }
	];
</script>

<section class="section">
	<h2 class="section-title">Table</h2>
	<p class="description">
		A data table component for displaying structured information with support for sorting, striping,
		and custom cell rendering.
	</p>

	<div class="subsection">
		<h3>Basic</h3>
		<Table {columns} {data} />
	</div>

	<div class="subsection">
		<h3>Striped</h3>
		<Table {columns} {data} striped />
	</div>

	<div class="subsection">
		<h3>Hoverable</h3>
		<Table {columns} {data} hoverable />
	</div>

	<div class="subsection">
		<h3>Bordered</h3>
		<Table {columns} {data} bordered />
	</div>

	<div class="subsection">
		<h3>Sizes</h3>
		<div class="table-stack">
			<div>
				<h4>Small</h4>
				<Table columns={numericColumns} data={numericData} size="sm" />
			</div>
			<div>
				<h4>Medium (default)</h4>
				<Table columns={numericColumns} data={numericData} size="md" />
			</div>
			<div>
				<h4>Large</h4>
				<Table columns={numericColumns} data={numericData} size="lg" />
			</div>
		</div>
	</div>

	<div class="subsection">
		<h3>Compact</h3>
		<Table {columns} {data} compact />
	</div>

	<div class="subsection">
		<h3>Combined Features</h3>
		<Table {columns} {data} striped hoverable bordered />
	</div>
</section>

<style>
	.section {
		padding: var(--space-6) 0;
		border-bottom: 1px solid var(--card-border);
	}

	.section-title {
		margin: 0 0 var(--space-2) 0;
		font-size: var(--font-size-2xl);
		font-weight: var(--font-weight-bold);
		color: var(--section-title);
	}

	.description {
		margin: 0 0 var(--space-6) 0;
		color: var(--section-description);
	}

	.subsection {
		margin-bottom: var(--space-6);
	}

	.subsection:last-child {
		margin-bottom: 0;
	}

	.subsection h3 {
		margin: 0 0 var(--space-3) 0;
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		color: var(--section-label);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.subsection h4 {
		margin: 0 0 var(--space-2) 0;
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		color: var(--section-description);
	}

	.table-stack {
		display: flex;
		flex-direction: column;
		gap: var(--space-6);
	}
</style>
