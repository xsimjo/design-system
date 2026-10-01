<script lang="ts">
	import Pagination from '$lib/components/pagination/Pagination.svelte';
	import Table from '$lib/components/table/Table.svelte';
	import TableHead from '$lib/components/table/TableHead.svelte';
	import TableBody from '$lib/components/table/TableBody.svelte';
	import TableRow from '$lib/components/table/TableRow.svelte';
	import TableHeader from '$lib/components/table/TableHeader.svelte';
	import TableCell from '$lib/components/table/TableCell.svelte';
	import Badge from '$lib/components/badge/Badge.svelte';
	import CodeExample from '$internal/CodeExample.svelte';
	import TableOfContents from '$internal/TableOfContents.svelte';
	import DocsPage from '$internal/DocsPage.svelte';
	import PageHeader from '$internal/PageHeader.svelte';
	import DocSection from '$internal/DocSection.svelte';
	import ExampleBlock from '$internal/ExampleBlock.svelte';
	import PropsTable from '$internal/PropsTable.svelte';
	import TokenTable from '$internal/TokenTable.svelte';

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

<DocsPage>
	<PageHeader
		title="Pagination"
		description="Navigation control for paged data. Renders numbered page buttons with prev/next arrows and smart ellipsis that collapses far-away pages automatically."
	/>

	<DocSection id="examples" title="Examples">
		<!-- BASIC -->
		<ExampleBlock id="basic" title="Basic">
			<p class="example-desc">
				Bind <code>page</code> to track the current page. Pass <code>total</code> (total items) and
				<code>pageSize</code> to compute how many pages exist.
			</p>
			<CodeExample code={codeBasic}>
				<div class="demo-center">
					<Pagination bind:page={basicPage} total={120} pageSize={10} />
				</div>
				<p class="page-display">Page {basicPage} of 12</p>
			</CodeExample>
		</ExampleBlock>

		<!-- SIZES -->
		<ExampleBlock id="sizes" title="Sizes">
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
		</ExampleBlock>

		<!-- WITHOUT FIRST / LAST -->
		<ExampleBlock id="no-first-last" title="Without First / Last Buttons">
			<p class="example-desc">
				Set <code>showFirstLast={'{false}'}</code> for a more compact control when jump-to-ends is not
				needed.
			</p>
			<CodeExample code={`<Pagination bind:page total={100} showFirstLast={false} />`}>
				<div class="demo-center">
					<Pagination bind:page={noFirstLastPage} total={100} showFirstLast={false} />
				</div>
			</CodeExample>
		</ExampleBlock>

		<!-- WIDE SIBLING RANGE -->
		<ExampleBlock id="wide-sibling" title="Wide Sibling Range">
			<p class="example-desc">
				<code>siblingCount</code> controls how many page buttons appear on each side of the current
				page. The default is <code>1</code>; use <code>2</code> for more navigational context.
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
		</ExampleBlock>

		<!-- MANY PAGES -->
		<ExampleBlock
			id="many-pages"
			title="Many Pages"
			description="The ellipsis algorithm ensures the control stays compact regardless of page count. Drag the slider to explore the range."
		>
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
		</ExampleBlock>

		<!-- PAIRED WITH TABLE -->
		<ExampleBlock id="with-table" title="Paired with Table">
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
		</ExampleBlock>
	</DocSection>

	<!-- API -->
	<DocSection id="api" title="API">
		<PropsTable
			columns={['Prop', 'Type', 'Default', 'Description']}
			rows={[
				['page', 'number', '1', 'Current page (1-based). Bindable.'],
				['total', 'number', '\u2014', 'Total item count. Used to compute total pages.'],
				['pageSize', 'number', '10', 'Items per page.'],
				['siblingCount', 'number', '1', 'Page buttons shown on each side of the current page.'],
				[
					'showFirstLast',
					'boolean',
					'true',
					'Show first/last buttons to jump to first and last page.'
				],
				['size', "'sm' | 'md' | 'lg'", "'md'", 'Visual size of all buttons.'],
				[
					'onPageChange',
					'(page: number) => void',
					'\u2014',
					'Called on every page change. Useful for server-side fetching.'
				]
			]}
		/>
	</DocSection>

	<!-- CSS TOKENS -->
	<DocSection id="css-tokens" title="CSS Tokens">
		<TokenTable
			component="pagination"
			tokens={[
				['--pagination-item-sm', 'Item height & min-width at sm'],
				['--pagination-item-md', 'Item height & min-width at md'],
				['--pagination-item-lg', 'Item height & min-width at lg'],
				['--pagination-font-sm', 'Font size at sm'],
				['--pagination-font-md', 'Font size at md'],
				['--pagination-font-lg', 'Font size at lg'],
				['--pagination-gap-sm', 'Gap between items at sm'],
				['--pagination-gap-md', 'Gap between items at md'],
				['--pagination-gap-lg', 'Gap between items at lg']
			]}
		/>

		<TokenTable
			component="pagination"
			tokens={[
				['--pagination-item-bg', 'Default button background'],
				['--pagination-item-text', 'Default button text'],
				['--pagination-item-border', 'Default button border'],
				['--pagination-item-hover-bg', 'Hover background'],
				['--pagination-item-active-bg', 'Current page background'],
				['--pagination-item-active-text', 'Current page text'],
				['--pagination-item-disabled-text', 'Disabled button text'],
				['--pagination-dots-color', 'Ellipsis color']
			]}
		/>

		<TokenTable
			component="pagination"
			tokens={[
				['--pagination-border-radius', 'Button corner radius'],
				['--pagination-border-width', 'Button border thickness'],
				['--pagination-focus-ring-width', 'Focus ring width'],
				['--pagination-focus-ring-color', 'Focus ring color'],
				['--pagination-focus-ring-offset', 'Focus ring offset'],
				['--pagination-transition', 'Animation timing']
			]}
		/>
	</DocSection>

	{#snippet sidebar()}
		<TableOfContents sections={tocSections} />
	{/snippet}
</DocsPage>

<style>
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
</style>
