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
	import CodeExample from '$lib/internal/CodeExample.svelte';
	import TableOfContents from '$lib/internal/TableOfContents.svelte';

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

<div class="docs-layout">
	<article class="docs-content">
		<header class="page-header">
			<h1>Table</h1>
			<p class="lead">
				Composable table primitives for displaying structured data. Supports sorting, row selection,
				striped and bordered variants, sticky headers, and captions.
			</p>
		</header>

		<section id="examples" class="doc-section">
			<h2>Examples</h2>

			<!-- BASIC -->
			<div id="basic" class="example-block">
				<h3>Basic</h3>
				<p class="example-desc">The default plain table with a header and body.</p>
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
			</div>

			<!-- VARIANTS -->
			<div id="variants" class="example-block">
				<h3>Variants</h3>
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
			</div>

			<!-- SIZES -->
			<div id="sizes" class="example-block">
				<h3>Sizes</h3>
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
			</div>

			<!-- SORTING -->
			<div id="sorting" class="example-block">
				<h3>Sorting</h3>
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
			</div>

			<!-- ROW SELECTION -->
			<div id="selection" class="example-block">
				<h3>Row Selection</h3>
				<p class="example-desc">
					Pass <code>onclick</code> to a <code>TableRow</code> to make it interactive. Combine with
					<code>selected</code> to highlight the active row. Rows are also keyboard-accessible via Tab
					+ Enter/Space.
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
			</div>

			<!-- STICKY HEADER -->
			<div id="sticky" class="example-block">
				<h3>Sticky Header</h3>
				<p class="example-desc">
					Set <code>stickyHeader</code> and an optional <code>maxHeight</code> to pin the header while
					the body scrolls.
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
			</div>

			<!-- CAPTION -->
			<div id="caption" class="example-block">
				<h3>Caption</h3>
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
			</div>

			<!-- WITH PAGINATION -->
			<div id="with-pagination" class="example-block">
				<h3>With Pagination</h3>
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
			</div>
		</section>

		<!-- API -->
		<section id="api" class="doc-section">
			<h2>API</h2>

			<div class="api-table">
				<h3>Table</h3>
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
							<td><code>variant</code></td>
							<td><code>'plain' | 'striped' | 'bordered'</code></td>
							<td><code>'plain'</code></td>
							<td>Visual style of the table</td>
						</tr>
						<tr>
							<td><code>size</code></td>
							<td><code>'sm' | 'md' | 'lg'</code></td>
							<td><code>'md'</code></td>
							<td>Cell padding and font size</td>
						</tr>
						<tr>
							<td><code>stickyHeader</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Pin header cells during vertical scroll</td>
						</tr>
						<tr>
							<td><code>maxHeight</code></td>
							<td><code>string</code></td>
							<td>—</td>
							<td>Sets <code>--table-max-height</code>; use with <code>stickyHeader</code></td>
						</tr>
						<tr>
							<td><code>caption</code></td>
							<td><code>string</code></td>
							<td>—</td>
							<td>Renders a semantic <code>&lt;caption&gt;</code></td>
						</tr>
						<tr>
							<td><code>captionSide</code></td>
							<td><code>'top' | 'bottom'</code></td>
							<td><code>'bottom'</code></td>
							<td>Caption placement</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="api-table">
				<h3>TableHeader</h3>
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
							<td><code>sortable</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Renders a sort button with icon</td>
						</tr>
						<tr>
							<td><code>sort</code></td>
							<td><code>'asc' | 'desc' | undefined</code></td>
							<td><code>undefined</code></td>
							<td>Current sort direction; controls icon state and <code>aria-sort</code></td>
						</tr>
						<tr>
							<td><code>onsort</code></td>
							<td><code>() => void</code></td>
							<td>—</td>
							<td>Called when the sort button is activated</td>
						</tr>
						<tr>
							<td><code>align</code></td>
							<td><code>'left' | 'center' | 'right'</code></td>
							<td><code>'left'</code></td>
							<td>Text alignment</td>
						</tr>
						<tr>
							<td><code>width</code></td>
							<td><code>string</code></td>
							<td>—</td>
							<td>Column width (CSS value)</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="api-table">
				<h3>TableRow</h3>
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
							<td><code>selected</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Highlights the row; sets <code>aria-selected</code></td>
						</tr>
						<tr>
							<td><code>onclick</code></td>
							<td><code>MouseEventHandler</code></td>
							<td>—</td>
							<td>Makes the row interactive (adds <code>tabindex</code> and key handling)</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="api-table">
				<h3>TableCell</h3>
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
							<td><code>align</code></td>
							<td><code>'left' | 'center' | 'right'</code></td>
							<td><code>'left'</code></td>
							<td>Text alignment</td>
						</tr>
						<tr>
							<td><code>truncate</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Truncates overflowing text with ellipsis</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>

		<!-- CSS TOKENS -->
		<section id="css-tokens" class="doc-section">
			<h2>CSS Tokens</h2>

			<div class="token-group">
				<h3>Layout & Structure</h3>
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
							<td><code>--table-bg</code></td>
							<td><code>var(--ui-surface-raised)</code></td>
							<td>Wrapper background</td>
						</tr>
						<tr>
							<td><code>--table-border-radius</code></td>
							<td><code>var(--ui-base-radius)</code></td>
							<td>Corner radius</td>
						</tr>
						<tr>
							<td><code>--table-border-color</code></td>
							<td><code>var(--ui-border)</code></td>
							<td>Border color</td>
						</tr>
						<tr>
							<td><code>--table-border-width</code></td>
							<td><code>var(--ui-border-width)</code></td>
							<td>Border thickness</td>
						</tr>
						<tr>
							<td><code>--table-shadow</code></td>
							<td><code>var(--ui-depth)</code></td>
							<td>Wrapper shadow</td>
						</tr>
						<tr>
							<td><code>--table-max-height</code></td>
							<td><code>400px</code></td>
							<td>Max-height in sticky mode</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="token-group">
				<h3>Header & Rows</h3>
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
							<td><code>--table-header-bg</code></td>
							<td>neutral, 12% opacity</td>
							<td>Header background</td>
						</tr>
						<tr>
							<td><code>--table-header-text</code></td>
							<td><code>var(--ui-surface-foreground)</code></td>
							<td>Header text color</td>
						</tr>
						<tr>
							<td><code>--table-header-font-weight</code></td>
							<td><code>var(--ui-weight-semibold)</code></td>
							<td>Header font weight</td>
						</tr>
						<tr>
							<td><code>--table-row-bg</code></td>
							<td><code>var(--ui-surface-raised)</code></td>
							<td>Default row background</td>
						</tr>
						<tr>
							<td><code>--table-row-hover-bg</code></td>
							<td>primary, 6% opacity</td>
							<td>Clickable row hover background</td>
						</tr>
						<tr>
							<td><code>--table-row-selected-bg</code></td>
							<td>primary, 12% opacity</td>
							<td>Selected row background</td>
						</tr>
						<tr>
							<td><code>--table-stripe-bg</code></td>
							<td>neutral, 7% opacity</td>
							<td>Even-row background in striped variant</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="token-group">
				<h3>Sizing & Typography</h3>
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
							<td><code>--table-cell-sm-padding</code></td>
							<td><code>8px 12px</code></td>
							<td>Cell padding at sm</td>
						</tr>
						<tr>
							<td><code>--table-cell-md-padding</code></td>
							<td><code>12px 16px</code></td>
							<td>Cell padding at md</td>
						</tr>
						<tr>
							<td><code>--table-cell-lg-padding</code></td>
							<td><code>16px 24px</code></td>
							<td>Cell padding at lg</td>
						</tr>
						<tr>
							<td><code>--table-font-sm</code></td>
							<td><code>var(--ui-text-xs)</code></td>
							<td>Font size at sm</td>
						</tr>
						<tr>
							<td><code>--table-font-md</code></td>
							<td><code>var(--ui-text-sm)</code></td>
							<td>Font size at md</td>
						</tr>
						<tr>
							<td><code>--table-font-lg</code></td>
							<td><code>var(--ui-text-base)</code></td>
							<td>Font size at lg</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="token-group">
				<h3>Sort, Caption & Focus</h3>
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
							<td><code>--table-sort-color</code></td>
							<td>foreground, 45% opacity</td>
							<td>Inactive sort icon color</td>
						</tr>
						<tr>
							<td><code>--table-sort-active-color</code></td>
							<td><code>var(--ui-primary)</code></td>
							<td>Active sort icon color</td>
						</tr>
						<tr>
							<td><code>--table-caption-color</code></td>
							<td>foreground, 55% opacity</td>
							<td>Caption text color</td>
						</tr>
						<tr>
							<td><code>--table-focus-ring-width</code></td>
							<td><code>var(--ui-ring-width)</code></td>
							<td>Focus ring width</td>
						</tr>
						<tr>
							<td><code>--table-focus-ring-color</code></td>
							<td><code>var(--ui-primary)</code></td>
							<td>Focus ring color</td>
						</tr>
						<tr>
							<td><code>--table-transition</code></td>
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

	.api-table,
	.token-group {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		margin-bottom: var(--space-6);
	}

	.api-table h3,
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
