<script lang="ts">
	import Pagination from '$lib/components/pagination/Pagination.svelte';
	import Table from '$lib/components/table/Table.svelte';
	import TableHead from '$lib/components/table/TableHead.svelte';
	import TableBody from '$lib/components/table/TableBody.svelte';
	import TableRow from '$lib/components/table/TableRow.svelte';
	import TableHeader from '$lib/components/table/TableHeader.svelte';
	import TableCell from '$lib/components/table/TableCell.svelte';
	import Badge from '$lib/components/badge/Badge.svelte';
	import CodeExample from '$lib/internal/CodeExample.svelte';
	import TableOfContents from '$lib/internal/TableOfContents.svelte';

	// Demo state — each example has its own page binding
	let basicPage = $state(1);
	let smPage = $state(1);
	let mdPage = $state(1);
	let lgPage = $state(1);
	let noFirstLastPage = $state(5);
	let wideSiblingPage = $state(10);
	let manyPagesPage = $state(42);
	let pairedPage = $state(1);

	interface User {
		id: number;
		name: string;
		role: string;
		status: 'Active' | 'On Leave' | 'Inactive';
	}

	const users: User[] = [
		{ id: 1, name: 'Alice Johnson', role: 'Engineer', status: 'Active' },
		{ id: 2, name: 'Bob Smith', role: 'Designer', status: 'Active' },
		{ id: 3, name: 'Carol White', role: 'Manager', status: 'On Leave' },
		{ id: 4, name: 'Dave Brown', role: 'Analyst', status: 'Active' },
		{ id: 5, name: 'Eve Wilson', role: 'Engineer', status: 'Inactive' },
		{ id: 6, name: 'Frank Garcia', role: 'Director', status: 'Active' },
		{ id: 7, name: 'Grace Lee', role: 'Engineer', status: 'Active' },
		{ id: 8, name: 'Henry Martinez', role: 'Recruiter', status: 'Active' },
		{ id: 9, name: 'Iris Thompson', role: 'Designer', status: 'On Leave' },
		{ id: 10, name: 'Jack Robinson', role: 'Engineer', status: 'Active' },
		{ id: 11, name: 'Karen Davis', role: 'Analyst', status: 'Active' },
		{ id: 12, name: 'Liam Harris', role: 'Manager', status: 'Active' }
	];

	const pairedPageSize = 3;
	const pairedRows = $derived(
		users.slice((pairedPage - 1) * pairedPageSize, pairedPage * pairedPageSize)
	);

	function statusColor(status: User['status']): 'success' | 'warning' | 'neutral' {
		if (status === 'Active') return 'success';
		if (status === 'On Leave') return 'warning';
		return 'neutral';
	}

	// Code example strings — script tags split to prevent Svelte parser confusion
	const S = '</';
	const codeBasic = `<script>
  let page = $state(1);
${S}script>

<Pagination bind:page total={120} pageSize={10} />`;

	const codePairedWithTable = `<script>
  let page = $state(1);
  const pageSize = 3;

  const rows = $derived(
    allUsers.slice((page - 1) * pageSize, page * pageSize)
  );
${S}script>

<Table variant="striped">
  <TableHead>
    <TableRow>
      <TableHeader>Name</TableHeader>
      <TableHeader>Role</TableHeader>
      <TableHeader>Status</TableHeader>
    </TableRow>
  </TableHead>
  <TableBody>
    {#each rows as user (user.id)}
      <TableRow>
        <TableCell>{user.name}</TableCell>
        <TableCell>{user.role}</TableCell>
        <TableCell>{user.status}</TableCell>
      </TableRow>
    {/each}
  </TableBody>
</Table>

<Pagination bind:page total={allUsers.length} {pageSize} />`;

	const tocSections = [
		{ id: 'examples', label: 'Examples' },
		{ id: 'basic', label: 'Basic', indent: true },
		{ id: 'sizes', label: 'Sizes', indent: true },
		{ id: 'no-first-last', label: 'Without First / Last', indent: true },
		{ id: 'wide-sibling', label: 'Wide Sibling Range', indent: true },
		{ id: 'many-pages', label: 'Many Pages', indent: true },
		{ id: 'with-table', label: 'Paired with Table', indent: true },
		{ id: 'api', label: 'API' },
		{ id: 'css-tokens', label: 'CSS Tokens' }
	];
</script>

<svelte:head>
	<title>Pagination - Greenfield UI</title>
</svelte:head>

<div class="docs-layout">
	<article class="docs-content">
		<header class="page-header">
			<h1>Pagination</h1>
			<p class="lead">
				Navigation control for paged data. Renders numbered page buttons with prev/next arrows and
				smart ellipsis that collapses far-away pages automatically.
			</p>
		</header>

		<section id="examples" class="doc-section">
			<h2>Examples</h2>

			<!-- BASIC -->
			<div id="basic" class="example-block">
				<h3>Basic</h3>
				<p class="example-desc">
					Bind <code>page</code> to track the current page. Pass <code>total</code> (total items)
					and <code>pageSize</code> to compute how many pages exist.
				</p>
				<CodeExample code={codeBasic}>
					<div class="demo-center">
						<Pagination bind:page={basicPage} total={120} pageSize={10} />
					</div>
					<p class="page-display">Page {basicPage} of 12</p>
				</CodeExample>
			</div>

			<!-- SIZES -->
			<div id="sizes" class="example-block">
				<h3>Sizes</h3>
				<p class="example-desc">
					Three sizes — <code>sm</code>, <code>md</code> (default), <code>lg</code> — scale both the buttons
					and icons.
				</p>
				<CodeExample
					code={`<Pagination page={3} total={100} size="sm" />
<Pagination page={3} total={100} size="md" />
<Pagination page={3} total={100} size="lg" />`}
				>
					<div class="size-stack">
						<div class="size-row">
							<span class="size-label">sm</span>
							<Pagination bind:page={smPage} total={100} size="sm" />
						</div>
						<div class="size-row">
							<span class="size-label">md</span>
							<Pagination bind:page={mdPage} total={100} size="md" />
						</div>
						<div class="size-row">
							<span class="size-label">lg</span>
							<Pagination bind:page={lgPage} total={100} size="lg" />
						</div>
					</div>
				</CodeExample>
			</div>

			<!-- WITHOUT FIRST / LAST -->
			<div id="no-first-last" class="example-block">
				<h3>Without First / Last Buttons</h3>
				<p class="example-desc">
					Set <code>showFirstLast={false}</code> for a more compact control when jump-to-ends is not needed.
				</p>
				<CodeExample code={`<Pagination bind:page total={100} showFirstLast={false} />`}>
					<div class="demo-center">
						<Pagination bind:page={noFirstLastPage} total={100} showFirstLast={false} />
					</div>
				</CodeExample>
			</div>

			<!-- WIDE SIBLING RANGE -->
			<div id="wide-sibling" class="example-block">
				<h3>Wide Sibling Range</h3>
				<p class="example-desc">
					<code>siblingCount</code> controls how many page buttons appear on each side of the
					current page. The default is <code>1</code>; use <code>2</code> for more navigational context.
				</p>
				<CodeExample
					code={`<!-- Shows 2 pages on each side: 1 … 8 9 [10] 11 12 … 20 -->
<Pagination bind:page total={200} siblingCount={2} />`}
				>
					<div class="demo-center">
						<Pagination bind:page={wideSiblingPage} total={200} siblingCount={2} />
					</div>
					<p class="page-display">Page {wideSiblingPage} of 20</p>
				</CodeExample>
			</div>

			<!-- MANY PAGES -->
			<div id="many-pages" class="example-block">
				<h3>Many Pages</h3>
				<p class="example-desc">
					The ellipsis algorithm ensures the control stays compact regardless of page count. Drag
					the slider to explore the range.
				</p>
				<CodeExample code={`<Pagination bind:page total={1000} pageSize={10} />`}>
					<div class="many-pages-demo">
						<Pagination bind:page={manyPagesPage} total={1000} pageSize={10} />
						<div class="slider-row">
							<label for="page-slider" class="slider-label">
								Jump to page {manyPagesPage}
							</label>
							<input
								id="page-slider"
								type="range"
								min="1"
								max="100"
								bind:value={manyPagesPage}
								class="page-slider"
							/>
						</div>
					</div>
				</CodeExample>
			</div>

			<!-- PAIRED WITH TABLE -->
			<div id="with-table" class="example-block">
				<h3>Paired with Table</h3>
				<p class="example-desc">
					Slice the dataset client-side using a derived value. For server-side data, fetch in an <code
						>onPageChange</code
					> callback instead.
				</p>
				<CodeExample code={codePairedWithTable}>
					<div class="full-width paired-demo">
						<Table variant="striped">
							<TableHead>
								<TableRow>
									<TableHeader>Name</TableHeader>
									<TableHeader>Role</TableHeader>
									<TableHeader>Status</TableHeader>
								</TableRow>
							</TableHead>
							<TableBody>
								{#each pairedRows as user (user.id)}
									<TableRow>
										<TableCell>{user.name}</TableCell>
										<TableCell>{user.role}</TableCell>
										<TableCell>
											<Badge label={user.status} variant={statusColor(user.status)} />
										</TableCell>
									</TableRow>
								{/each}
							</TableBody>
						</Table>
						<div class="pagination-bar">
							<span class="pagination-info">
								{(pairedPage - 1) * pairedPageSize + 1}–{Math.min(
									pairedPage * pairedPageSize,
									users.length
								)} of {users.length}
							</span>
							<Pagination
								bind:page={pairedPage}
								total={users.length}
								pageSize={pairedPageSize}
								showFirstLast={false}
							/>
						</div>
					</div>
				</CodeExample>
			</div>
		</section>

		<!-- API -->
		<section id="api" class="doc-section">
			<h2>API</h2>
			<table class="props-table">
				<thead>
					<tr>
						<th>Prop</th>
						<th>Type</th>
						<th>Default</th>
						<th>Description</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td><code>page</code></td>
						<td><code>number</code></td>
						<td><code>1</code></td>
						<td>Current page (1-based). Bindable.</td>
					</tr>
					<tr>
						<td><code>total</code></td>
						<td><code>number</code></td>
						<td>—</td>
						<td>Total item count. Used to compute total pages.</td>
					</tr>
					<tr>
						<td><code>pageSize</code></td>
						<td><code>number</code></td>
						<td><code>10</code></td>
						<td>Items per page.</td>
					</tr>
					<tr>
						<td><code>siblingCount</code></td>
						<td><code>number</code></td>
						<td><code>1</code></td>
						<td>Page buttons shown on each side of the current page.</td>
					</tr>
					<tr>
						<td><code>showFirstLast</code></td>
						<td><code>boolean</code></td>
						<td><code>true</code></td>
						<td>Show ⏮/⏭ buttons to jump to first and last page.</td>
					</tr>
					<tr>
						<td><code>size</code></td>
						<td><code>'sm' | 'md' | 'lg'</code></td>
						<td><code>'md'</code></td>
						<td>Visual size of all buttons.</td>
					</tr>
					<tr>
						<td><code>onPageChange</code></td>
						<td><code>(page: number) => void</code></td>
						<td>—</td>
						<td>Called on every page change. Useful for server-side fetching.</td>
					</tr>
				</tbody>
			</table>
		</section>

		<!-- CSS TOKENS -->
		<section id="css-tokens" class="doc-section">
			<h2>CSS Tokens</h2>

			<div class="token-group">
				<h3>Sizing</h3>
				<table class="props-table">
					<thead>
						<tr>
							<th>Token</th>
							<th>Default</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>--pagination-item-sm</code></td>
							<td><code>32px</code></td>
							<td>Item height & min-width at sm</td>
						</tr>
						<tr>
							<td><code>--pagination-item-md</code></td>
							<td><code>40px</code></td>
							<td>Item height & min-width at md</td>
						</tr>
						<tr>
							<td><code>--pagination-item-lg</code></td>
							<td><code>48px</code></td>
							<td>Item height & min-width at lg</td>
						</tr>
						<tr>
							<td><code>--pagination-font-sm</code></td>
							<td><code>var(--ui-text-xs)</code></td>
							<td>Font size at sm</td>
						</tr>
						<tr>
							<td><code>--pagination-font-md</code></td>
							<td><code>var(--ui-text-sm)</code></td>
							<td>Font size at md</td>
						</tr>
						<tr>
							<td><code>--pagination-font-lg</code></td>
							<td><code>var(--ui-text-base)</code></td>
							<td>Font size at lg</td>
						</tr>
						<tr>
							<td><code>--pagination-gap-sm</code></td>
							<td><code>4px</code></td>
							<td>Gap between items at sm</td>
						</tr>
						<tr>
							<td><code>--pagination-gap-md</code></td>
							<td><code>6px</code></td>
							<td>Gap between items at md</td>
						</tr>
						<tr>
							<td><code>--pagination-gap-lg</code></td>
							<td><code>8px</code></td>
							<td>Gap between items at lg</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="token-group">
				<h3>Colors</h3>
				<table class="props-table">
					<thead>
						<tr>
							<th>Token</th>
							<th>Default</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>--pagination-item-bg</code></td>
							<td><code>transparent</code></td>
							<td>Default button background</td>
						</tr>
						<tr>
							<td><code>--pagination-item-text</code></td>
							<td><code>var(--ui-surface-foreground)</code></td>
							<td>Default button text</td>
						</tr>
						<tr>
							<td><code>--pagination-item-border</code></td>
							<td><code>var(--ui-border)</code></td>
							<td>Default button border</td>
						</tr>
						<tr>
							<td><code>--pagination-item-hover-bg</code></td>
							<td>neutral, 18% opacity</td>
							<td>Hover background</td>
						</tr>
						<tr>
							<td><code>--pagination-item-active-bg</code></td>
							<td><code>var(--ui-primary)</code></td>
							<td>Current page background</td>
						</tr>
						<tr>
							<td><code>--pagination-item-active-text</code></td>
							<td><code>var(--ui-primary-foreground)</code></td>
							<td>Current page text</td>
						</tr>
						<tr>
							<td><code>--pagination-item-disabled-text</code></td>
							<td>foreground, 60% transparent</td>
							<td>Disabled button text</td>
						</tr>
						<tr>
							<td><code>--pagination-dots-color</code></td>
							<td>foreground, 60% transparent</td>
							<td>Ellipsis color</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="token-group">
				<h3>Shape & Focus</h3>
				<table class="props-table">
					<thead>
						<tr>
							<th>Token</th>
							<th>Default</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>--pagination-border-radius</code></td>
							<td><code>var(--ui-base-radius)</code></td>
							<td>Button corner radius</td>
						</tr>
						<tr>
							<td><code>--pagination-border-width</code></td>
							<td><code>var(--ui-border-width)</code></td>
							<td>Button border thickness</td>
						</tr>
						<tr>
							<td><code>--pagination-focus-ring-width</code></td>
							<td><code>var(--ui-ring-width)</code></td>
							<td>Focus ring width</td>
						</tr>
						<tr>
							<td><code>--pagination-focus-ring-color</code></td>
							<td><code>var(--ui-primary)</code></td>
							<td>Focus ring color</td>
						</tr>
						<tr>
							<td><code>--pagination-focus-ring-offset</code></td>
							<td><code>var(--ui-ring-offset)</code></td>
							<td>Focus ring offset</td>
						</tr>
						<tr>
							<td><code>--pagination-transition</code></td>
							<td><code>150ms ease</code></td>
							<td>Animation timing</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>
	</article>

	<TableOfContents sections={tocSections} />
</div>

<style>
	.docs-layout {
		display: grid;
		grid-template-columns: 1fr 180px;
		gap: var(--space-12);
	}

	.docs-content {
		min-width: 0;
	}

	.page-header {
		margin-bottom: var(--space-8);
	}

	h1 {
		font-size: var(--font-size-3xl);
		font-weight: var(--ui-weight-bold);
		color: var(--ui-surface-foreground);
		margin: 0 0 var(--space-3) 0;
	}

	.lead {
		font-size: var(--ui-text-lg);
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 40%);
		line-height: var(--line-height-relaxed);
		margin: 0;
	}

	.doc-section {
		margin-bottom: var(--space-12);
		scroll-margin-top: var(--space-4);
	}

	.doc-section h2 {
		font-size: var(--font-size-2xl);
		font-weight: var(--ui-weight-bold);
		color: var(--ui-surface-foreground);
		margin: 0 0 var(--space-6) 0;
		padding-bottom: var(--space-3);
		border-bottom: 1px solid var(--ui-border);
	}

	.example-block {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
		margin-bottom: var(--space-8);
		scroll-margin-top: var(--space-4);
	}

	.example-block h3 {
		font-size: var(--ui-text-lg);
		font-weight: 600;
		color: var(--ui-surface-foreground);
		margin: 0;
	}

	.example-desc {
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 40%);
		margin: 0;
	}

	.example-desc code {
		font-family: var(--ui-font-mono);
		font-size: var(--ui-text-xs);
		background: color-mix(in oklch, var(--ui-neutral), transparent 85%);
		padding: 1px 5px;
		border-radius: calc(var(--ui-base-radius) * 0.4);
	}

	/* Centered pagination demos */
	.demo-center {
		display: flex;
		justify-content: center;
		width: 100%;
	}

	.page-display {
		width: 100%;
		text-align: center;
		font-size: var(--ui-text-sm);
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 45%);
		margin: var(--space-2) 0 0;
	}

	/* Size comparison */
	.size-stack {
		display: flex;
		flex-direction: column;
		gap: var(--space-5);
		width: 100%;
	}

	.size-row {
		display: flex;
		align-items: center;
		gap: var(--space-4);
	}

	.size-label {
		font-family: var(--ui-font-mono);
		font-size: var(--ui-text-xs);
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 40%);
		min-width: 24px;
	}

	/* Many-pages demo */
	.many-pages-demo {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-5);
		width: 100%;
	}

	.slider-row {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-2);
		width: 100%;
		max-width: 360px;
	}

	.slider-label {
		font-size: var(--ui-text-sm);
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 40%);
	}

	.page-slider {
		width: 100%;
		accent-color: var(--ui-primary);
	}

	/* Paired with table */
	.full-width {
		width: 100%;
	}

	.paired-demo {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}

	.pagination-bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-4);
		flex-wrap: wrap;
	}

	.pagination-info {
		font-size: var(--ui-text-sm);
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 40%);
	}

	/* API / Tokens tables */
	.token-group {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		margin-bottom: var(--space-6);
	}

	.token-group h3 {
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

	@media (max-width: 1024px) {
		.docs-layout {
			grid-template-columns: 1fr;
		}
	}
</style>
