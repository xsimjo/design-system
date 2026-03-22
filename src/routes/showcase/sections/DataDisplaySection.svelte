<script lang="ts">
	import {
		ShowcaseCategory,
		ComponentBlock,
		DemoGroup,
		DemoRow,
		DemoColumn,
		DemoHint
	} from '../components/index.js';
	import Avatar from '$lib/components/avatar/Avatar.svelte';
	import Badge from '$lib/components/badge/Badge.svelte';
	import Card from '$lib/components/card/Card.svelte';
	import CardHeader from '$lib/components/card/CardHeader.svelte';
	import CardBody from '$lib/components/card/CardBody.svelte';
	import CardFooter from '$lib/components/card/CardFooter.svelte';
	import Table from '$lib/components/table/Table.svelte';
	import TableHead from '$lib/components/table/TableHead.svelte';
	import TableBody from '$lib/components/table/TableBody.svelte';
	import TableFoot from '$lib/components/table/TableFoot.svelte';
	import TableRow from '$lib/components/table/TableRow.svelte';
	import TableHeader from '$lib/components/table/TableHeader.svelte';
	import TableCell from '$lib/components/table/TableCell.svelte';
	import Typography from '$lib/components/typography/Typography.svelte';
	import Skeleton from '$lib/components/skeleton/Skeleton.svelte';
	import Pagination from '$lib/components/pagination/Pagination.svelte';
	import Button from '$lib/components/button/Button.svelte';

	interface Employee {
		id: number;
		name: string;
		role: string;
		department: string;
		status: 'Active' | 'On Leave' | 'Inactive';
		salary: number;
	}

	const employees: Employee[] = [
		{
			id: 1,
			name: 'Alice Johnson',
			role: 'Engineer',
			department: 'Product',
			status: 'Active',
			salary: 112000
		},
		{
			id: 2,
			name: 'Bob Smith',
			role: 'Designer',
			department: 'Design',
			status: 'Active',
			salary: 98000
		},
		{
			id: 3,
			name: 'Carol White',
			role: 'Manager',
			department: 'Operations',
			status: 'On Leave',
			salary: 134000
		},
		{
			id: 4,
			name: 'Dave Brown',
			role: 'Analyst',
			department: 'Finance',
			status: 'Active',
			salary: 89000
		},
		{
			id: 5,
			name: 'Eve Wilson',
			role: 'Engineer',
			department: 'Product',
			status: 'Inactive',
			salary: 105000
		},
		{
			id: 6,
			name: 'Frank Garcia',
			role: 'Director',
			department: 'Product',
			status: 'Active',
			salary: 160000
		},
		{
			id: 7,
			name: 'Grace Lee',
			role: 'Engineer',
			department: 'Platform',
			status: 'Active',
			salary: 118000
		},
		{
			id: 8,
			name: 'Henry Martinez',
			role: 'Recruiter',
			department: 'People',
			status: 'Active',
			salary: 76000
		},
		{
			id: 9,
			name: 'Iris Thompson',
			role: 'Designer',
			department: 'Design',
			status: 'On Leave',
			salary: 92000
		},
		{
			id: 10,
			name: 'Jack Robinson',
			role: 'Engineer',
			department: 'Platform',
			status: 'Active',
			salary: 109000
		},
		{
			id: 11,
			name: 'Karen Davis',
			role: 'Analyst',
			department: 'Finance',
			status: 'Active',
			salary: 87000
		},
		{
			id: 12,
			name: 'Liam Harris',
			role: 'Manager',
			department: 'Design',
			status: 'Active',
			salary: 126000
		}
	];

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

	let selectedId = $state<number | null>(null);
	let paginatedPage = $state(1);
	const pageSize = 4;
	const pagedEmployees = $derived(
		employees.slice((paginatedPage - 1) * pageSize, paginatedPage * pageSize)
	);

	function statusColor(status: Employee['status']): 'success' | 'warning' | 'neutral' {
		if (status === 'Active') return 'success';
		if (status === 'On Leave') return 'warning';
		return 'neutral';
	}

	const badgeColors = [
		'primary',
		'secondary',
		'accent',
		'success',
		'danger',
		'warning',
		'info',
		'neutral'
	] as const;
</script>

<ShowcaseCategory id="data-display" title="Data Display">
	<!-- Avatar -->
	<ComponentBlock id="avatar" title="Avatar">
		<DemoGroup label="Sizes">
			<DemoRow isAligned>
				<Avatar size="sm" initials="AB" />
				<Avatar size="md" initials="AB" />
				<Avatar size="lg" initials="AB" />
				<Avatar size="xl" initials="AB" />
			</DemoRow>
		</DemoGroup>

		<DemoGroup label="Shapes">
			<DemoRow isAligned>
				<Avatar shape="circle" initials="JD" size="lg" />
				<Avatar shape="square" initials="JD" size="lg" />
			</DemoRow>
		</DemoGroup>

		<DemoGroup label="Colors & Status">
			<DemoRow isAligned>
				<Avatar color="neutral" initials="JD" size="lg" />
				<Avatar color="primary" initials="JD" size="lg" />
				<Avatar color="secondary" initials="JD" size="lg" />
				<Avatar initials="JD" size="lg" status="online" />
				<Avatar initials="JD" size="lg" status="away" />
				<Avatar initials="JD" size="lg" status="busy" />
				<Avatar initials="JD" size="lg" status="offline" />
			</DemoRow>
		</DemoGroup>

		<DemoGroup label="Image">
			<DemoRow isAligned>
				<Avatar src="https://i.pravatar.cc/150?img=1" alt="Alice" size="lg" />
				<Avatar src="https://i.pravatar.cc/150?img=5" alt="Bob" size="lg" status="online" />
				<Avatar src="/broken-url.jpg" alt="Fallback" initials="FB" size="lg" />
			</DemoRow>
		</DemoGroup>
	</ComponentBlock>

	<!-- Badge -->
	<ComponentBlock id="badge" title="Badge">
		<DemoGroup label="Variants">
			<DemoRow>
				{#each badgeColors as color (color)}
					<Badge label={color} variant={color} />
				{/each}
			</DemoRow>
		</DemoGroup>

		<DemoGroup label="Sizes">
			<DemoRow isAligned>
				<Badge label="Small" size="sm" />
				<Badge label="Medium" size="md" />
				<Badge label="Large" size="lg" />
			</DemoRow>
		</DemoGroup>

		<DemoGroup label="Removable & Disabled">
			<DemoRow>
				<Badge label="React" onremove={() => {}} />
				<Badge label="TypeScript" onremove={() => {}} />
				<Badge label="Svelte" onremove={() => {}} />
				<Badge label="Disabled" onremove={() => {}} disabled />
			</DemoRow>
		</DemoGroup>
	</ComponentBlock>

	<!-- Card -->
	<ComponentBlock id="card" title="Card">
		<DemoGroup label="Variants">
			<DemoRow>
				<Card variant="default"><CardBody>Default card</CardBody></Card>
				<Card variant="outlined"><CardBody>Outlined card</CardBody></Card>
				<Card variant="elevated"><CardBody>Elevated card</CardBody></Card>
			</DemoRow>
		</DemoGroup>

		<DemoGroup label="Compound">
			<DemoColumn style="max-width: 360px;">
				<Card>
					<CardHeader>
						<div style="display: flex; justify-content: space-between; align-items: center;">
							<h4 style="margin: 0; font-weight: 600;">Project Alpha</h4>
							<Badge label="Active" variant="success" size="sm" />
						</div>
					</CardHeader>
					<CardBody>
						<p
							style="margin: 0; font-size: var(--ui-text-sm); color: color-mix(in oklch, var(--ui-surface-foreground), transparent 30%);"
						>
							A next-generation design system built with Svelte 5 and modern CSS.
						</p>
					</CardBody>
					<CardFooter>
						<div style="display: flex; gap: var(--space-2); justify-content: flex-end;">
							<Button variant="ghost" size="sm">Cancel</Button>
							<Button size="sm">View</Button>
						</div>
					</CardFooter>
				</Card>
			</DemoColumn>
		</DemoGroup>
	</ComponentBlock>

	<!-- Table -->
	<ComponentBlock id="table" title="Table">
		<DemoGroup label="Basic">
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
							<TableCell><Badge label={emp.status} variant={statusColor(emp.status)} /></TableCell>
						</TableRow>
					{/each}
				</TableBody>
			</Table>
		</DemoGroup>

		<DemoGroup label="Variants">
			<DemoColumn>
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
			</DemoColumn>
		</DemoGroup>

		<DemoGroup label="Sorting">
			<Table>
				<TableHead>
					<TableRow>
						<TableHeader sortable sort={getSortForCol('name')} onsort={() => toggleSort('name')}
							>Name</TableHeader
						>
						<TableHeader sortable sort={getSortForCol('role')} onsort={() => toggleSort('role')}
							>Role</TableHeader
						>
						<TableHeader
							sortable
							sort={getSortForCol('department')}
							onsort={() => toggleSort('department')}>Department</TableHeader
						>
						<TableHeader
							sortable
							sort={getSortForCol('salary')}
							onsort={() => toggleSort('salary')}
							align="right">Salary</TableHeader
						>
					</TableRow>
				</TableHead>
				<TableBody>
					{#each sortedEmployees.slice(0, 6) as emp (emp.id)}
						<TableRow>
							<TableCell>{emp.name}</TableCell>
							<TableCell>{emp.role}</TableCell>
							<TableCell>{emp.department}</TableCell>
							<TableCell align="right">${emp.salary.toLocaleString()}</TableCell>
						</TableRow>
					{/each}
				</TableBody>
			</Table>
		</DemoGroup>

		<DemoGroup label="Row Selection">
			{#if selectedId}
				<DemoHint>
					Selected: <strong>{employees.find((e) => e.id === selectedId)?.name}</strong>
				</DemoHint>
			{:else}
				<DemoHint>Click a row to select it.</DemoHint>
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
							<TableCell><Badge label={emp.status} variant={statusColor(emp.status)} /></TableCell>
						</TableRow>
					{/each}
				</TableBody>
			</Table>
		</DemoGroup>

		<DemoGroup label="Sticky Header">
			<Table stickyHeader maxHeight="240px">
				<TableHead>
					<TableRow>
						<TableHeader>Name</TableHeader>
						<TableHeader>Role</TableHeader>
						<TableHeader>Department</TableHeader>
						<TableHeader align="right">Salary</TableHeader>
					</TableRow>
				</TableHead>
				<TableBody>
					{#each employees as emp (emp.id)}
						<TableRow>
							<TableCell>{emp.name}</TableCell>
							<TableCell>{emp.role}</TableCell>
							<TableCell>{emp.department}</TableCell>
							<TableCell align="right">${emp.salary.toLocaleString()}</TableCell>
						</TableRow>
					{/each}
				</TableBody>
			</Table>
		</DemoGroup>

		<DemoGroup label="Caption">
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
				</TableBody>
				<TableFoot>
					<TableRow>
						<TableCell><strong>Total</strong></TableCell>
						<TableCell align="right"><strong>8</strong></TableCell>
						<TableCell align="right"><strong>$106,778</strong></TableCell>
					</TableRow>
				</TableFoot>
			</Table>
		</DemoGroup>

		<DemoGroup label="With Pagination">
			<div class="paginated-demo">
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
								<TableCell><Badge label={emp.status} variant={statusColor(emp.status)} /></TableCell
								>
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
		</DemoGroup>
	</ComponentBlock>

	<!-- Typography -->
	<ComponentBlock id="typography" title="Typography">
		<DemoGroup label="Headings">
			<DemoColumn>
				<Typography variant="h1">Heading 1</Typography>
				<Typography variant="h2">Heading 2</Typography>
				<Typography variant="h3">Heading 3</Typography>
				<Typography variant="h4">Heading 4</Typography>
				<Typography variant="h5">Heading 5</Typography>
				<Typography variant="h6">Heading 6</Typography>
			</DemoColumn>
		</DemoGroup>

		<DemoGroup label="Body & Labels">
			<DemoColumn>
				<Typography variant="body-lg">Body Large</Typography>
				<Typography variant="body">Body</Typography>
				<Typography variant="body-sm">Body Small</Typography>
				<Typography variant="body-xs">Body Extra Small</Typography>
				<Typography variant="label-lg">Label Large</Typography>
				<Typography variant="label">Label</Typography>
				<Typography variant="label-sm">Label Small</Typography>
			</DemoColumn>
		</DemoGroup>

		<DemoGroup label="Colors">
			<DemoRow>
				<Typography variant="body">default</Typography>
				<Typography variant="body" color="muted">muted</Typography>
				<Typography variant="body" color="primary">primary</Typography>
				<Typography variant="body" color="secondary">secondary</Typography>
				<Typography variant="body" color="success">success</Typography>
				<Typography variant="body" color="danger">danger</Typography>
				<Typography variant="body" color="warning">warning</Typography>
				<Typography variant="body" color="info">info</Typography>
			</DemoRow>
		</DemoGroup>

		<DemoGroup label="Code & Truncation">
			<DemoColumn>
				<Typography variant="body"
					>Use <Typography variant="code">npm install</Typography> to get started.</Typography
				>
				<div style="max-width: 300px;">
					<Typography variant="body" truncate
						>This is a very long text that should be truncated with an ellipsis when it overflows
						the container.</Typography
					>
				</div>
			</DemoColumn>
		</DemoGroup>
	</ComponentBlock>

	<!-- Skeleton -->
	<ComponentBlock id="skeleton" title="Skeleton">
		<DemoGroup label="Rectangle">
			<DemoColumn>
				<Skeleton height="48px" />
				<Skeleton width="60%" />
				<Skeleton width="120px" height="120px" />
			</DemoColumn>
		</DemoGroup>

		<DemoGroup label="Circle">
			<DemoRow isAligned>
				<Skeleton shape="circle" width="32px" height="32px" />
				<Skeleton shape="circle" width="40px" height="40px" />
				<Skeleton shape="circle" width="56px" height="56px" />
				<Skeleton shape="circle" width="72px" height="72px" />
			</DemoRow>
		</DemoGroup>

		<DemoGroup label="Text Lines">
			<DemoColumn style="max-width: 400px;">
				<Skeleton shape="text" lines={2} />
				<Skeleton shape="text" lines={4} />
			</DemoColumn>
		</DemoGroup>

		<DemoGroup label="Composed">
			<div class="skeleton-card">
				<div class="skeleton-card__header">
					<Skeleton shape="circle" width="40px" height="40px" />
					<div class="skeleton-card__info">
						<Skeleton height="14px" width="120px" />
						<Skeleton height="12px" width="80px" />
					</div>
				</div>
				<Skeleton shape="text" lines={3} />
			</div>
		</DemoGroup>
	</ComponentBlock>
</ShowcaseCategory>

<style>
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

	.skeleton-card {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
		padding: var(--space-4);
		border: 1px solid var(--ui-border);
		border-radius: var(--ui-base-radius);
		max-width: 320px;
	}

	.skeleton-card__header {
		display: flex;
		gap: var(--space-3);
		align-items: center;
	}

	.skeleton-card__info {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}
</style>
