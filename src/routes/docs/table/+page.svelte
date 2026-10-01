<script lang="ts">
	import Table from '$lib/components/table/Table.svelte';
	import TableHead from '$lib/components/table/TableHead.svelte';
	import TableBody from '$lib/components/table/TableBody.svelte';
	import TableFoot from '$lib/components/table/TableFoot.svelte';
	import TableRow from '$lib/components/table/TableRow.svelte';
	import TableHeader from '$lib/components/table/TableHeader.svelte';
	import TableCell from '$lib/components/table/TableCell.svelte';
	import Pagination from '$lib/components/pagination/Pagination.svelte';
	import Badge from '$lib/components/badge/Badge.svelte';
	import CodeExample from '$internal/CodeExample.svelte';
	import TableOfContents from '$internal/TableOfContents.svelte';
	import DocsPage from '$internal/DocsPage.svelte';
	import PageHeader from '$internal/PageHeader.svelte';
	import DocSection from '$internal/DocSection.svelte';
	import ExampleBlock from '$internal/ExampleBlock.svelte';
	import PropsTable from '$internal/PropsTable.svelte';

	interface Employee {
		id: number;
		name: string;
		role: string;
		department: string;
		status: 'Active' | 'On Leave' | 'Inactive';
		salary: number;
		joined: string;
	}

	const employees: Employee[] = [
		{
			id: 1,
			name: 'Alice Johnson',
			role: 'Engineer',
			department: 'Product',
			status: 'Active',
			salary: 112000,
			joined: '2021-03-14'
		},
		{
			id: 2,
			name: 'Bob Smith',
			role: 'Designer',
			department: 'Design',
			status: 'Active',
			salary: 98000,
			joined: '2020-11-02'
		},
		{
			id: 3,
			name: 'Carol White',
			role: 'Manager',
			department: 'Operations',
			status: 'On Leave',
			salary: 134000,
			joined: '2019-07-22'
		},
		{
			id: 4,
			name: 'Dave Brown',
			role: 'Analyst',
			department: 'Finance',
			status: 'Active',
			salary: 89000,
			joined: '2022-01-09'
		},
		{
			id: 5,
			name: 'Eve Wilson',
			role: 'Engineer',
			department: 'Product',
			status: 'Inactive',
			salary: 105000,
			joined: '2018-05-30'
		},
		{
			id: 6,
			name: 'Frank Garcia',
			role: 'Director',
			department: 'Product',
			status: 'Active',
			salary: 160000,
			joined: '2017-09-11'
		},
		{
			id: 7,
			name: 'Grace Lee',
			role: 'Engineer',
			department: 'Platform',
			status: 'Active',
			salary: 118000,
			joined: '2023-02-28'
		},
		{
			id: 8,
			name: 'Henry Martinez',
			role: 'Recruiter',
			department: 'People',
			status: 'Active',
			salary: 76000,
			joined: '2022-08-15'
		},
		{
			id: 9,
			name: 'Iris Thompson',
			role: 'Designer',
			department: 'Design',
			status: 'On Leave',
			salary: 92000,
			joined: '2021-06-07'
		},
		{
			id: 10,
			name: 'Jack Robinson',
			role: 'Engineer',
			department: 'Platform',
			status: 'Active',
			salary: 109000,
			joined: '2020-04-19'
		},
		{
			id: 11,
			name: 'Karen Davis',
			role: 'Analyst',
			department: 'Finance',
			status: 'Active',
			salary: 87000,
			joined: '2023-05-03'
		},
		{
			id: 12,
			name: 'Liam Harris',
			role: 'Manager',
			department: 'Design',
			status: 'Active',
			salary: 126000,
			joined: '2019-11-30'
		}
	];

	// Sorting demo
	type SortKey = keyof Employee | undefined;
	type SortDir = 'asc' | 'desc' | undefined;

	let sortCol = $state<SortKey>(undefined);
	let sortDir = $state<SortDir>(undefined);

	function toggleSort(col: keyof Employee) {
		if (sortCol === col) {
			if (sortDir === 'asc') sortDir = 'desc';
			else if (sortDir === 'desc') {
				sortCol = undefined;
				sortDir = undefined;
			} else sortDir = 'asc';
		} else {
			sortCol = col;
			sortDir = 'asc';
		}
	}

	function getSortForCol(col: keyof Employee): 'asc' | 'desc' | undefined {
		return sortCol === col ? sortDir : undefined;
	}

	const sortedEmployees = $derived.by(() => {
		if (!sortCol || !sortDir) return employees;
		const col = sortCol;
		const dir = sortDir;
		return [...employees].sort((a, b) => {
			const av = String(a[col]);
			const bv = String(b[col]);
			const cmp = av.localeCompare(bv, undefined, { numeric: true });
			return dir === 'asc' ? cmp : -cmp;
		});
	});

	// Row selection demo
	let selectedId = $state<number | null>(null);

	// Status badge color helper
	function statusColor(status: Employee['status']): 'success' | 'warning' | 'neutral' {
		if (status === 'Active') return 'success';
		if (status === 'On Leave') return 'warning';
		return 'neutral';
	}

	// Pagination + table demo
	let paginatedPage = $state(1);
	const pageSize = 4;
	const pagedEmployees = $derived(
		employees.slice((paginatedPage - 1) * pageSize, paginatedPage * pageSize)
	);

	// Code example strings — script tags split to prevent Svelte parser confusion
	const S = '</';
	const codeSorting = `<script>
  let sortCol = $state(undefined);
  let sortDir = $state(undefined);

  function toggleSort(col) {
    if (sortCol === col) {
      if (sortDir === 'asc') sortDir = 'desc';
      else if (sortDir === 'desc') { sortCol = undefined; sortDir = undefined; }
      else sortDir = 'asc';
    } else {
      sortCol = col;
      sortDir = 'asc';
    }
  }
${S}script>

<TableHeader
  sortable
  sort={sortCol === 'name' ? sortDir : undefined}
  onsort={() => toggleSort('name')}
>
  Name
</TableHeader>`;

	const codeSelection = `<script>
  let selectedId = $state(null);
${S}script>

<TableRow
  selected={emp.id === selectedId}
  onclick={() => selectedId = emp.id === selectedId ? null : emp.id}
>
  ...
</TableRow>`;

	const codeWithPagination = `<script>
  let page = $state(1);
  const pageSize = 4;

  const rows = $derived(
    allRows.slice((page - 1) * pageSize, page * pageSize)
  );
${S}script>

<Table>
  <TableHead>...</TableHead>
  <TableBody>
    {#each rows as row (row.id)}
      <TableRow>...</TableRow>
    {/each}
  </TableBody>
</Table>

<Pagination bind:page total={allRows.length} {pageSize} />`;

	const tocSections = [
		{ id: 'examples', label: 'Examples' },
		{ id: 'basic', label: 'Basic', indent: true },
		{ id: 'variants', label: 'Variants', indent: true },
		{ id: 'sizes', label: 'Sizes', indent: true },
		{ id: 'sorting', label: 'Sorting', indent: true },
		{ id: 'selection', label: 'Row Selection', indent: true },
		{ id: 'sticky', label: 'Sticky Header', indent: true },
		{ id: 'caption', label: 'Caption', indent: true },
		{ id: 'with-pagination', label: 'With Pagination', indent: true },
		{ id: 'api', label: 'API' },
		{ id: 'css-tokens', label: 'CSS Tokens' }
	];
</script>

<svelte:head>
	<title>Table - Greenfield UI</title>
</svelte:head>

<DocsPage>
	<PageHeader
		title="Table"
		description="Composable table primitives for displaying structured data. Supports sorting, row selection, striped and bordered variants, sticky headers, and captions."
	/>

	<DocSection id="examples" title="Examples">
		<ExampleBlock
			id="basic"
			title="Basic"
			description="The default plain table with a header and body."
		>
			<CodeExample
				code={`<Table>
  <TableHead>
    <TableRow>
      <TableHeader>Name</TableHeader>
      <TableHeader>Role</TableHeader>
      <TableHeader>Department</TableHeader>
      <TableHeader>Status</TableHeader>
    </TableRow>
  </TableHead>
  <TableBody>
    {#each employees as emp (emp.id)}
      <TableRow>
        <TableCell>{emp.name}</TableCell>
        <TableCell>{emp.role}</TableCell>
        <TableCell>{emp.department}</TableCell>
        <TableCell>{emp.status}</TableCell>
      </TableRow>
    {/each}
  </TableBody>
</Table>`}
			>
				<div class="full-width">
					<Table>
						<TableHead>
							<TableRow>
								<TableHeader>Name</TableHeader>
								<TableHeader>Role</TableHeader>
								<TableHeader>Department</TableHeader>
								<TableHeader>Status</TableHeader>
							</TableRow>
						</TableHead>
						<TableBody>
							{#each employees.slice(0, 5) as emp (emp.id)}
								<TableRow>
									<TableCell>{emp.name}</TableCell>
									<TableCell>{emp.role}</TableCell>
									<TableCell>{emp.department}</TableCell>
									<TableCell>
										<Badge label={emp.status} variant={statusColor(emp.status)} />
									</TableCell>
								</TableRow>
							{/each}
						</TableBody>
					</Table>
				</div>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="variants" title="Variants">
			<p class="example-desc">
				<code>plain</code> (default), <code>striped</code> for alternating row colors, and
				<code>bordered</code> for full grid lines.
			</p>
			<CodeExample
				code={`<Table variant="striped">...</Table>
<Table variant="bordered">...</Table>`}
			>
				<div class="full-width">
					<div class="variant-stack">
						<div>
							<p class="variant-label">striped</p>
							<Table variant="striped">
								<TableHead>
									<TableRow>
										<TableHeader>Name</TableHeader>
										<TableHeader>Role</TableHeader>
										<TableHeader>Status</TableHeader>
									</TableRow>
								</TableHead>
								<TableBody>
									{#each employees.slice(0, 4) as emp (emp.id)}
										<TableRow>
											<TableCell>{emp.name}</TableCell>
											<TableCell>{emp.role}</TableCell>
											<TableCell>{emp.status}</TableCell>
										</TableRow>
									{/each}
								</TableBody>
							</Table>
						</div>
						<div>
							<p class="variant-label">bordered</p>
							<Table variant="bordered">
								<TableHead>
									<TableRow>
										<TableHeader>Name</TableHeader>
										<TableHeader>Role</TableHeader>
										<TableHeader>Status</TableHeader>
									</TableRow>
								</TableHead>
								<TableBody>
									{#each employees.slice(0, 4) as emp (emp.id)}
										<TableRow>
											<TableCell>{emp.name}</TableCell>
											<TableCell>{emp.role}</TableCell>
											<TableCell>{emp.status}</TableCell>
										</TableRow>
									{/each}
								</TableBody>
							</Table>
						</div>
					</div>
				</div>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="sizes" title="Sizes">
			<p class="example-desc">
				Three sizes control cell padding and font size: <code>sm</code>, <code>md</code>
				(default), and <code>lg</code>.
			</p>
			<CodeExample
				code={`<Table size="sm">...</Table>
<Table size="md">...</Table>
<Table size="lg">...</Table>`}
			>
				<div class="full-width">
					<div class="size-stack">
						{#each ['sm', 'md', 'lg'] as s (s)}
							<div>
								<p class="variant-label">{s}</p>
								<Table size={s as 'sm' | 'md' | 'lg'}>
									<TableHead>
										<TableRow>
											<TableHeader>Name</TableHeader>
											<TableHeader>Role</TableHeader>
											<TableHeader>Status</TableHeader>
										</TableRow>
									</TableHead>
									<TableBody>
										{#each employees.slice(0, 3) as emp (emp.id)}
											<TableRow>
												<TableCell>{emp.name}</TableCell>
												<TableCell>{emp.role}</TableCell>
												<TableCell>{emp.status}</TableCell>
											</TableRow>
										{/each}
									</TableBody>
								</Table>
							</div>
						{/each}
					</div>
				</div>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="sorting" title="Sorting">
			<p class="example-desc">
				Pass <code>sortable</code>, <code>sort</code>, and <code>onsort</code> to each
				<code>TableHeader</code>. Manage sort state externally. Click a column header to cycle
				through ascending → descending → unsorted.
			</p>
			<CodeExample code={codeSorting}>
				<div class="full-width">
					<Table>
						<TableHead>
							<TableRow>
								<TableHeader
									sortable
									sort={getSortForCol('name')}
									onsort={() => toggleSort('name')}
								>
									Name
								</TableHeader>
								<TableHeader
									sortable
									sort={getSortForCol('role')}
									onsort={() => toggleSort('role')}
								>
									Role
								</TableHeader>
								<TableHeader
									sortable
									sort={getSortForCol('department')}
									onsort={() => toggleSort('department')}
								>
									Department
								</TableHeader>
								<TableHeader
									sortable
									sort={getSortForCol('salary')}
									onsort={() => toggleSort('salary')}
									align="right"
								>
									Salary
								</TableHeader>
							</TableRow>
						</TableHead>
						<TableBody>
							{#each sortedEmployees.slice(0, 6) as emp (emp.id)}
								<TableRow>
									<TableCell>{emp.name}</TableCell>
									<TableCell>{emp.role}</TableCell>
									<TableCell>{emp.department}</TableCell>
									<TableCell align="right">
										${emp.salary.toLocaleString()}
									</TableCell>
								</TableRow>
							{/each}
						</TableBody>
					</Table>
				</div>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="selection" title="Row Selection">
			<p class="example-desc">
				Pass <code>onclick</code> to a <code>TableRow</code> to make it interactive. Combine with
				<code>selected</code> to highlight the active row. Rows are also keyboard-accessible via Tab +
				Enter/Space.
			</p>
			<CodeExample code={codeSelection}>
				<div class="full-width">
					{#if selectedId}
						<p class="selection-hint">
							Selected: <strong>
								{employees.find((e) => e.id === selectedId)?.name}
							</strong>
							— click again to deselect
						</p>
					{:else}
						<p class="selection-hint">Click a row to select it.</p>
					{/if}
					<Table variant="striped">
						<TableHead>
							<TableRow>
								<TableHeader>Name</TableHeader>
								<TableHeader>Role</TableHeader>
								<TableHeader>Department</TableHeader>
								<TableHeader>Status</TableHeader>
							</TableRow>
						</TableHead>
						<TableBody>
							{#each employees.slice(0, 5) as emp (emp.id)}
								<TableRow
									selected={emp.id === selectedId}
									onclick={() => {
										selectedId = emp.id === selectedId ? null : emp.id;
									}}
								>
									<TableCell>{emp.name}</TableCell>
									<TableCell>{emp.role}</TableCell>
									<TableCell>{emp.department}</TableCell>
									<TableCell>
										<Badge label={emp.status} variant={statusColor(emp.status)} />
									</TableCell>
								</TableRow>
							{/each}
						</TableBody>
					</Table>
				</div>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="sticky" title="Sticky Header">
			<p class="example-desc">
				Set <code>stickyHeader</code> and an optional <code>maxHeight</code> to pin the header while the
				body scrolls.
			</p>
			<CodeExample
				code={`<Table stickyHeader maxHeight="240px">
  ...
</Table>`}
			>
				<div class="full-width">
					<Table stickyHeader maxHeight="240px">
						<TableHead>
							<TableRow>
								<TableHeader>Name</TableHeader>
								<TableHeader>Role</TableHeader>
								<TableHeader>Department</TableHeader>
								<TableHeader>Status</TableHeader>
								<TableHeader align="right">Salary</TableHeader>
							</TableRow>
						</TableHead>
						<TableBody>
							{#each employees as emp (emp.id)}
								<TableRow>
									<TableCell>{emp.name}</TableCell>
									<TableCell>{emp.role}</TableCell>
									<TableCell>{emp.department}</TableCell>
									<TableCell>
										<Badge label={emp.status} variant={statusColor(emp.status)} />
									</TableCell>
									<TableCell align="right">${emp.salary.toLocaleString()}</TableCell>
								</TableRow>
							{/each}
						</TableBody>
					</Table>
				</div>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="caption" title="Caption">
			<p class="example-desc">
				Use the <code>caption</code> prop to add a descriptive label. Control its position with
				<code>captionSide</code>.
			</p>
			<CodeExample
				code={`<Table caption="Q1 2024 headcount by department" captionSide="bottom">
  ...
</Table>`}
			>
				<div class="full-width">
					<Table caption="Q1 2024 headcount by department" captionSide="bottom">
						<TableHead>
							<TableRow>
								<TableHeader>Department</TableHeader>
								<TableHeader align="right">Headcount</TableHeader>
								<TableHeader align="right">Avg. Salary</TableHeader>
							</TableRow>
						</TableHead>
						<TableBody>
							<TableRow>
								<TableCell>Product</TableCell>
								<TableCell align="right">3</TableCell>
								<TableCell align="right">$127,000</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Design</TableCell>
								<TableCell align="right">3</TableCell>
								<TableCell align="right">$105,333</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Finance</TableCell>
								<TableCell align="right">2</TableCell>
								<TableCell align="right">$88,000</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Operations</TableCell>
								<TableCell align="right">1</TableCell>
								<TableCell align="right">$134,000</TableCell>
							</TableRow>
						</TableBody>
						<TableFoot>
							<TableRow>
								<TableCell><strong>Total</strong></TableCell>
								<TableCell align="right"><strong>9</strong></TableCell>
								<TableCell align="right"><strong>$112,111</strong></TableCell>
							</TableRow>
						</TableFoot>
					</Table>
				</div>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="with-pagination" title="With Pagination">
			<p class="example-desc">
				Slice your data client-side using the page state, or use the
				<code>onPageChange</code> callback to fetch server-side pages.
			</p>
			<CodeExample code={codeWithPagination}>
				<div class="full-width paginated-demo">
					<Table variant="striped">
						<TableHead>
							<TableRow>
								<TableHeader>Name</TableHeader>
								<TableHeader>Role</TableHeader>
								<TableHeader>Department</TableHeader>
								<TableHeader>Status</TableHeader>
							</TableRow>
						</TableHead>
						<TableBody>
							{#each pagedEmployees as emp (emp.id)}
								<TableRow>
									<TableCell>{emp.name}</TableCell>
									<TableCell>{emp.role}</TableCell>
									<TableCell>{emp.department}</TableCell>
									<TableCell>
										<Badge label={emp.status} variant={statusColor(emp.status)} />
									</TableCell>
								</TableRow>
							{/each}
						</TableBody>
					</Table>
					<div class="pagination-bar">
						<span class="pagination-info">
							{(paginatedPage - 1) * pageSize + 1}–{Math.min(
								paginatedPage * pageSize,
								employees.length
							)} of {employees.length}
						</span>
						<Pagination
							bind:page={paginatedPage}
							total={employees.length}
							{pageSize}
							showFirstLast={false}
						/>
					</div>
				</div>
			</CodeExample>
		</ExampleBlock>
	</DocSection>

	<DocSection id="api" title="API">
		<PropsTable
			title="Table"
			columns={['Prop', 'Type', 'Default', 'Description']}
			rows={[
				['variant', "'plain' | 'striped' | 'bordered'", "'plain'", 'Visual style of the table'],
				['size', "'sm' | 'md' | 'lg'", "'md'", 'Cell padding and font size'],
				['stickyHeader', 'boolean', 'false', 'Pin header cells during vertical scroll'],
				['maxHeight', 'string', '—', 'Sets --table-max-height; use with stickyHeader'],
				['caption', 'string', '—', 'Renders a semantic <caption>'],
				['captionSide', "'top' | 'bottom'", "'bottom'", 'Caption placement']
			]}
		/>

		<PropsTable
			title="TableHeader"
			columns={['Prop', 'Type', 'Default', 'Description']}
			rows={[
				['sortable', 'boolean', 'false', 'Renders a sort button with icon'],
				[
					'sort',
					"'asc' | 'desc' | undefined",
					'undefined',
					'Current sort direction; controls icon state and aria-sort'
				],
				['onsort', '() => void', '—', 'Called when the sort button is activated'],
				['align', "'left' | 'center' | 'right'", "'left'", 'Text alignment'],
				['width', 'string', '—', 'Column width (CSS value)']
			]}
		/>

		<PropsTable
			title="TableRow"
			columns={['Prop', 'Type', 'Default', 'Description']}
			rows={[
				['selected', 'boolean', 'false', 'Highlights the row; sets aria-selected'],
				[
					'onclick',
					'MouseEventHandler',
					'—',
					'Makes the row interactive (adds tabindex and key handling)'
				]
			]}
		/>

		<PropsTable
			title="TableCell"
			columns={['Prop', 'Type', 'Default', 'Description']}
			rows={[
				['align', "'left' | 'center' | 'right'", "'left'", 'Text alignment'],
				['truncate', 'boolean', 'false', 'Truncates overflowing text with ellipsis']
			]}
		/>
	</DocSection>

	<DocSection id="css-tokens" title="CSS Tokens">
		<PropsTable
			title="Layout & Structure"
			columns={['Token', 'Default', 'Description']}
			rows={[
				['--table-bg', 'var(--ui-surface-raised)', 'Wrapper background'],
				['--table-border-radius', 'var(--ui-base-radius)', 'Corner radius'],
				['--table-border-color', 'var(--ui-border)', 'Border color'],
				['--table-border-width', 'var(--ui-border-width)', 'Border thickness'],
				['--table-shadow', 'var(--ui-depth)', 'Wrapper shadow'],
				['--table-max-height', '400px', 'Max-height in sticky mode']
			]}
		/>

		<PropsTable
			title="Header & Rows"
			columns={['Token', 'Default', 'Description']}
			rows={[
				['--table-header-bg', 'neutral, 12% opacity', 'Header background'],
				['--table-header-text', 'var(--ui-surface-foreground)', 'Header text color'],
				['--table-header-font-weight', 'var(--ui-weight-semibold)', 'Header font weight'],
				['--table-row-bg', 'var(--ui-surface-raised)', 'Default row background'],
				['--table-row-hover-bg', 'primary, 6% opacity', 'Clickable row hover background'],
				['--table-row-selected-bg', 'primary, 12% opacity', 'Selected row background'],
				['--table-stripe-bg', 'neutral, 7% opacity', 'Even-row background in striped variant']
			]}
		/>

		<PropsTable
			title="Sizing & Typography"
			columns={['Token', 'Default', 'Description']}
			rows={[
				['--table-cell-sm-padding', '8px 12px', 'Cell padding at sm'],
				['--table-cell-md-padding', '12px 16px', 'Cell padding at md'],
				['--table-cell-lg-padding', '16px 24px', 'Cell padding at lg'],
				['--table-font-sm', 'var(--ui-text-xs)', 'Font size at sm'],
				['--table-font-md', 'var(--ui-text-sm)', 'Font size at md'],
				['--table-font-lg', 'var(--ui-text-base)', 'Font size at lg']
			]}
		/>

		<PropsTable
			title="Sort, Caption & Focus"
			columns={['Token', 'Default', 'Description']}
			rows={[
				['--table-sort-color', 'foreground, 45% opacity', 'Inactive sort icon color'],
				['--table-sort-active-color', 'var(--ui-primary)', 'Active sort icon color'],
				['--table-caption-color', 'foreground, 55% opacity', 'Caption text color'],
				['--table-focus-ring-width', 'var(--ui-ring-width)', 'Focus ring width'],
				['--table-focus-ring-color', 'var(--ui-primary)', 'Focus ring color'],
				['--table-transition', '150ms ease', 'Animation timing']
			]}
		/>
	</DocSection>

	{#snippet sidebar()}
		<TableOfContents sections={tocSections} />
	{/snippet}
</DocsPage>

<style>
	/* Full-width table container inside CodeExample flex */
	.full-width {
		width: 100%;
	}

	.variant-stack {
		display: flex;
		flex-direction: column;
		gap: var(--space-6);
	}

	.size-stack {
		display: flex;
		flex-direction: column;
		gap: var(--space-6);
	}

	.variant-label {
		font-family: var(--ui-font-mono);
		font-size: var(--ui-text-xs);
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 40%);
		margin: 0 0 var(--space-2) 0;
	}

	.selection-hint {
		font-size: var(--ui-text-sm);
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 35%);
		margin: 0 0 var(--space-3) 0;
	}

	.selection-hint strong {
		color: var(--ui-primary);
		font-weight: var(--ui-weight-semibold);
	}

	.paginated-demo {
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
