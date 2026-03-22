<script lang="ts">
	import SideNav from '$lib/components/side-nav/SideNav.svelte';
	import SideNavGroup from '$lib/components/side-nav/SideNavGroup.svelte';
	import SideNavItem from '$lib/components/side-nav/SideNavItem.svelte';
	import SideNavLabel from '$lib/components/side-nav/SideNavLabel.svelte';
	import SideNavDivider from '$lib/components/side-nav/SideNavDivider.svelte';
	import Badge from '$lib/components/badge/Badge.svelte';
	import Card from '$lib/components/card/Card.svelte';
	import CodeExample from '$lib/internal/CodeExample.svelte';
	import TableOfContents from '$lib/internal/TableOfContents.svelte';
	import DocsPage from '$lib/internal/DocsPage.svelte';
	import PageHeader from '$lib/internal/PageHeader.svelte';
	import DocSection from '$lib/internal/DocSection.svelte';
	import ExampleBlock from '$lib/internal/ExampleBlock.svelte';
	import PropsTable from '$lib/internal/PropsTable.svelte';
	import HomeIcon from '$lib/icons/HomeIcon.svelte';
	import SettingsIcon from '$lib/icons/SettingsIcon.svelte';
	import UsersIcon from '$lib/icons/UsersIcon.svelte';
	import MailIcon from '$lib/icons/MailIcon.svelte';
	import BarChartIcon from '$lib/icons/BarChartIcon.svelte';
	import FolderIcon from '$lib/icons/FolderIcon.svelte';
	import HelpCircleIcon from '$lib/icons/HelpCircleIcon.svelte';
	import InboxIcon from '$lib/icons/InboxIcon.svelte';
	import CalendarIcon from '$lib/icons/CalendarIcon.svelte';
	import CodeIcon from '$lib/icons/CodeIcon.svelte';
	import BookOpenIcon from '$lib/icons/BookOpenIcon.svelte';
	import ZapIcon from '$lib/icons/ZapIcon.svelte';
	import EditIcon from '$lib/icons/EditIcon.svelte';
	import TrashIcon from '$lib/icons/TrashIcon.svelte';
	import StarIcon from '$lib/icons/StarIcon.svelte';
	import PuzzleIcon from '$lib/icons/PuzzleIcon.svelte';
	import SearchIcon from '$lib/icons/SearchIcon.svelte';
	import DownloadIcon from '$lib/icons/DownloadIcon.svelte';
	import ClockIcon from '$lib/icons/ClockIcon.svelte';

	const tocSections = [
		{ id: 'examples', label: 'Examples' },
		{ id: 'basic', label: 'Basic', indent: true },
		{ id: 'with-icons', label: 'With Icons', indent: true },
		{ id: 'collapsible-groups', label: 'Collapsible Groups', indent: true },
		{ id: 'nested-groups', label: 'Nested Groups', indent: true },
		{ id: 'rail', label: 'Rail', indent: true },
		{ id: 'badges', label: 'Badges', indent: true },
		{ id: 'labels-dividers', label: 'Labels & Dividers', indent: true },
		{ id: 'collapsed', label: 'Collapsed (Icon Only)', indent: true },
		{ id: 'active-state', label: 'Active State', indent: true },
		{ id: 'disabled', label: 'Disabled', indent: true },
		{ id: 'kitchen-sink', label: 'Kitchen Sink', indent: true },
		{ id: 'api', label: 'API' },
		{ id: 'css-tokens', label: 'CSS Tokens' }
	];

	let isCollapsed = $state(false);
</script>

<svelte:head>
	<title>SideNav - Greenfield UI</title>
</svelte:head>

<DocsPage>
	<PageHeader
		title="SideNav"
		description="Vertical navigation menu for sidebars. Supports collapsible groups, nested items, icons, badges, and a collapsed icon-only mode."
	/>

	<DocSection id="examples" title="Examples">
		<ExampleBlock id="basic" title="Basic">
			<p class="example-desc">
				A simple side nav with flat navigation items. Items render as links when <code>href</code> is
				provided.
			</p>
			<CodeExample
				code={`<SideNav>
  <SideNavItem href="/dashboard">Dashboard</SideNavItem>
  <SideNavItem href="/projects">Projects</SideNavItem>
  <SideNavItem href="/team">Team</SideNavItem>
  <SideNavItem href="/settings">Settings</SideNavItem>
</SideNav>`}
				previewClass="column"
			>
				<div style="width: 260px;">
					<Card padding="none">
						<SideNav>
							<SideNavItem href="/docs/side-nav">Dashboard</SideNavItem>
							<SideNavItem href="/docs/side-nav">Projects</SideNavItem>
							<SideNavItem href="/docs/side-nav">Team</SideNavItem>
							<SideNavItem href="/docs/side-nav">Settings</SideNavItem>
						</SideNav>
					</Card>
				</div>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="with-icons" title="With Icons">
			<p class="example-desc">
				Add leading icons to items with the <code>icon</code> snippet prop.
			</p>
			<CodeExample
				code={`<SideNav>
  <SideNavItem href="/dashboard">
    {#snippet icon()}<HomeIcon size={18} />{/snippet}
    Dashboard
  </SideNavItem>
  <SideNavItem href="/inbox">
    {#snippet icon()}<InboxIcon size={18} />{/snippet}
    Inbox
  </SideNavItem>
  <SideNavItem href="/team">
    {#snippet icon()}<UsersIcon size={18} />{/snippet}
    Team
  </SideNavItem>
  <SideNavItem href="/settings">
    {#snippet icon()}<SettingsIcon size={18} />{/snippet}
    Settings
  </SideNavItem>
</SideNav>`}
				previewClass="column"
			>
				<div style="width: 260px;">
					<Card padding="none">
						<SideNav>
							<SideNavItem href="/docs/side-nav">
								{#snippet icon()}<HomeIcon size={18} />{/snippet}
								Dashboard
							</SideNavItem>
							<SideNavItem href="/docs/side-nav">
								{#snippet icon()}<InboxIcon size={18} />{/snippet}
								Inbox
							</SideNavItem>
							<SideNavItem href="/docs/side-nav">
								{#snippet icon()}<UsersIcon size={18} />{/snippet}
								Team
							</SideNavItem>
							<SideNavItem href="/docs/side-nav">
								{#snippet icon()}<SettingsIcon size={18} />{/snippet}
								Settings
							</SideNavItem>
						</SideNav>
					</Card>
				</div>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="collapsible-groups" title="Collapsible Groups">
			<p class="example-desc">
				Use <code>SideNavGroup</code> to create collapsible sections. Groups default to open and can be
				toggled by clicking the trigger.
			</p>
			<CodeExample
				code={`<SideNav>
  <SideNavGroup label="Analytics">
    {#snippet icon()}<BarChartIcon size={18} />{/snippet}
    <SideNavItem href="/analytics/overview">Overview</SideNavItem>
    <SideNavItem href="/analytics/reports">Reports</SideNavItem>
    <SideNavItem href="/analytics/exports">Exports</SideNavItem>
  </SideNavGroup>
  <SideNavGroup label="Settings">
    {#snippet icon()}<SettingsIcon size={18} />{/snippet}
    <SideNavItem href="/settings/general">General</SideNavItem>
    <SideNavItem href="/settings/security">Security</SideNavItem>
    <SideNavItem href="/settings/notifications">Notifications</SideNavItem>
  </SideNavGroup>
</SideNav>`}
				previewClass="column"
			>
				<div style="width: 260px;">
					<Card padding="none">
						<SideNav>
							<SideNavGroup label="Analytics">
								{#snippet icon()}<BarChartIcon size={18} />{/snippet}
								<SideNavItem href="/docs/side-nav">Overview</SideNavItem>
								<SideNavItem href="/docs/side-nav">Reports</SideNavItem>
								<SideNavItem href="/docs/side-nav">Exports</SideNavItem>
							</SideNavGroup>
							<SideNavGroup label="Settings">
								{#snippet icon()}<SettingsIcon size={18} />{/snippet}
								<SideNavItem href="/docs/side-nav">General</SideNavItem>
								<SideNavItem href="/docs/side-nav">Security</SideNavItem>
								<SideNavItem href="/docs/side-nav">Notifications</SideNavItem>
							</SideNavGroup>
						</SideNav>
					</Card>
				</div>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="nested-groups" title="Nested Groups">
			<p class="example-desc">
				Groups can be nested to create multi-level navigation trees. Child items are automatically
				indented.
			</p>
			<CodeExample
				code={`<SideNav>
  <SideNavItem href="/home">
    {#snippet icon()}<HomeIcon size={18} />{/snippet}
    Home
  </SideNavItem>
  <SideNavGroup label="Projects">
    {#snippet icon()}<FolderIcon size={18} />{/snippet}
    <SideNavItem href="/projects/active">Active</SideNavItem>
    <SideNavGroup label="Archived">
      <SideNavItem href="/projects/archived/2024">2024</SideNavItem>
      <SideNavItem href="/projects/archived/2023">2023</SideNavItem>
    </SideNavGroup>
  </SideNavGroup>
</SideNav>`}
				previewClass="column"
			>
				<div style="width: 260px;">
					<Card padding="none">
						<SideNav>
							<SideNavItem href="/docs/side-nav">
								{#snippet icon()}<HomeIcon size={18} />{/snippet}
								Home
							</SideNavItem>
							<SideNavGroup label="Projects">
								{#snippet icon()}<FolderIcon size={18} />{/snippet}
								<SideNavItem href="/docs/side-nav">Active</SideNavItem>
								<SideNavGroup label="Archived">
									<SideNavItem href="/docs/side-nav">2024</SideNavItem>
									<SideNavItem href="/docs/side-nav">2023</SideNavItem>
								</SideNavGroup>
							</SideNavGroup>
						</SideNav>
					</Card>
				</div>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="rail" title="Rail">
			<p class="example-desc">
				Groups show a vertical rail by default to indicate hierarchy. Set
				<code>hasRail={'{false}'}</code> to hide it.
			</p>
			<CodeExample
				code={`<SideNav>
  <SideNavGroup label="With Rail" open>
    {#snippet icon()}<FolderIcon size={18} />{/snippet}
    <SideNavItem href="/projects/alpha">Alpha</SideNavItem>
    <SideNavItem href="/projects/beta">Beta</SideNavItem>
  </SideNavGroup>
  <SideNavGroup label="Without Rail" open hasRail={false}>
    {#snippet icon()}<SettingsIcon size={18} />{/snippet}
    <SideNavItem href="/settings/general">General</SideNavItem>
    <SideNavItem href="/settings/security">Security</SideNavItem>
  </SideNavGroup>
</SideNav>`}
				previewClass="column"
			>
				<div style="width: 260px;">
					<Card padding="none">
						<SideNav>
							<SideNavGroup label="With Rail" open>
								{#snippet icon()}<FolderIcon size={18} />{/snippet}
								<SideNavItem href="/docs/side-nav">Alpha</SideNavItem>
								<SideNavItem href="/docs/side-nav">Beta</SideNavItem>
							</SideNavGroup>
							<SideNavGroup label="Without Rail" open hasRail={false}>
								{#snippet icon()}<SettingsIcon size={18} />{/snippet}
								<SideNavItem href="/docs/side-nav">General</SideNavItem>
								<SideNavItem href="/docs/side-nav">Security</SideNavItem>
							</SideNavGroup>
						</SideNav>
					</Card>
				</div>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="badges" title="Badges">
			<p class="example-desc">
				Use the <code>badge</code> snippet to add trailing content like notification counts.
			</p>
			<CodeExample
				code={`<SideNav>
  <SideNavItem href="/inbox">
    {#snippet icon()}<InboxIcon size={18} />{/snippet}
    {#snippet badge()}<Badge label="12" variant="primary" size="sm" />{/snippet}
    Inbox
  </SideNavItem>
  <SideNavItem href="/messages">
    {#snippet icon()}<MailIcon size={18} />{/snippet}
    {#snippet badge()}<Badge label="3" variant="neutral" size="sm" />{/snippet}
    Messages
  </SideNavItem>
</SideNav>`}
				previewClass="column"
			>
				<div style="width: 260px;">
					<Card padding="none">
						<SideNav>
							<SideNavItem href="/docs/side-nav">
								{#snippet icon()}<InboxIcon size={18} />{/snippet}
								{#snippet badge()}<Badge label="12" variant="primary" size="sm" />{/snippet}
								Inbox
							</SideNavItem>
							<SideNavItem href="/docs/side-nav">
								{#snippet icon()}<MailIcon size={18} />{/snippet}
								{#snippet badge()}<Badge label="3" variant="neutral" size="sm" />{/snippet}
								Messages
							</SideNavItem>
						</SideNav>
					</Card>
				</div>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="labels-dividers" title="Labels & Dividers">
			<p class="example-desc">
				Use <code>SideNavLabel</code> for non-interactive section headings and
				<code>SideNavDivider</code>
				for visual separators.
			</p>
			<CodeExample
				code={`<SideNav>
  <SideNavLabel>Main</SideNavLabel>
  <SideNavItem href="/dashboard">
    {#snippet icon()}<HomeIcon size={18} />{/snippet}
    Dashboard
  </SideNavItem>
  <SideNavItem href="/analytics">
    {#snippet icon()}<BarChartIcon size={18} />{/snippet}
    Analytics
  </SideNavItem>
  <SideNavDivider />
  <SideNavLabel>Support</SideNavLabel>
  <SideNavItem href="/help">
    {#snippet icon()}<HelpCircleIcon size={18} />{/snippet}
    Help Center
  </SideNavItem>
</SideNav>`}
				previewClass="column"
			>
				<div style="width: 260px;">
					<Card padding="none">
						<SideNav>
							<SideNavLabel>Main</SideNavLabel>
							<SideNavItem href="/docs/side-nav">
								{#snippet icon()}<HomeIcon size={18} />{/snippet}
								Dashboard
							</SideNavItem>
							<SideNavItem href="/docs/side-nav">
								{#snippet icon()}<BarChartIcon size={18} />{/snippet}
								Analytics
							</SideNavItem>
							<SideNavDivider />
							<SideNavLabel>Support</SideNavLabel>
							<SideNavItem href="/docs/side-nav">
								{#snippet icon()}<HelpCircleIcon size={18} />{/snippet}
								Help Center
							</SideNavItem>
						</SideNav>
					</Card>
				</div>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="collapsed" title="Collapsed (Icon Only)">
			<p class="example-desc">
				Set <code>collapsed</code> on <code>SideNav</code> to switch to icon-only mode. Labels,
				badges, and group children are hidden. Use <code>aria-label</code> on items for accessibility.
			</p>
			<CodeExample
				code={`<SideNav collapsed>
  <SideNavItem href="/home" aria-label="Home">
    {#snippet icon()}<HomeIcon size={18} />{/snippet}
    Home
  </SideNavItem>
  <SideNavItem href="/inbox" aria-label="Inbox">
    {#snippet icon()}<InboxIcon size={18} />{/snippet}
    Inbox
  </SideNavItem>
  <SideNavItem href="/settings" aria-label="Settings">
    {#snippet icon()}<SettingsIcon size={18} />{/snippet}
    Settings
  </SideNavItem>
</SideNav>`}
				previewClass="column"
			>
				<div style="display: flex; gap: 16px; align-items: flex-start;">
					<button class="toggle-btn" onclick={() => (isCollapsed = !isCollapsed)} type="button">
						{isCollapsed ? 'Expand' : 'Collapse'}
					</button>
					<Card padding="none">
						<SideNav collapsed={isCollapsed}>
							<SideNavItem href="/docs/side-nav" aria-label="Home">
								{#snippet icon()}<HomeIcon size={18} />{/snippet}
								Home
							</SideNavItem>
							<SideNavItem href="/docs/side-nav" aria-label="Inbox">
								{#snippet icon()}<InboxIcon size={18} />{/snippet}
								Inbox
							</SideNavItem>
							<SideNavGroup label="Settings">
								{#snippet icon()}<SettingsIcon size={18} />{/snippet}
								<SideNavItem href="/docs/side-nav">General</SideNavItem>
								<SideNavItem href="/docs/side-nav">Security</SideNavItem>
							</SideNavGroup>
						</SideNav>
					</Card>
				</div>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="active-state" title="Active State">
			<p class="example-desc">
				Set <code>isActive</code> on a <code>SideNavItem</code> to highlight the current page. Links
				and buttons get <code>aria-current="page"</code>.
			</p>
			<CodeExample
				code={`<SideNav>
  <SideNavItem href="/dashboard">
    {#snippet icon()}<HomeIcon size={18} />{/snippet}
    Dashboard
  </SideNavItem>
  <SideNavItem href="/analytics" isActive>
    {#snippet icon()}<BarChartIcon size={18} />{/snippet}
    Analytics
  </SideNavItem>
  <SideNavItem href="/settings">
    {#snippet icon()}<SettingsIcon size={18} />{/snippet}
    Settings
  </SideNavItem>
</SideNav>`}
				previewClass="column"
			>
				<div style="width: 260px;">
					<Card padding="none">
						<SideNav>
							<SideNavItem href="/docs/side-nav">
								{#snippet icon()}<HomeIcon size={18} />{/snippet}
								Dashboard
							</SideNavItem>
							<SideNavItem href="/docs/side-nav" isActive>
								{#snippet icon()}<BarChartIcon size={18} />{/snippet}
								Analytics
							</SideNavItem>
							<SideNavItem href="/docs/side-nav">
								{#snippet icon()}<SettingsIcon size={18} />{/snippet}
								Settings
							</SideNavItem>
						</SideNav>
					</Card>
				</div>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="disabled" title="Disabled">
			<p class="example-desc">Disable individual items or entire groups.</p>
			<CodeExample
				code={`<SideNav>
  <SideNavItem href="/dashboard">Dashboard</SideNavItem>
  <SideNavItem href="/billing" disabled>Billing</SideNavItem>
  <SideNavGroup label="Admin" disabled>
    <SideNavItem href="/admin/users">Users</SideNavItem>
    <SideNavItem href="/admin/roles">Roles</SideNavItem>
  </SideNavGroup>
</SideNav>`}
				previewClass="column"
			>
				<div style="width: 260px;">
					<Card padding="none">
						<SideNav>
							<SideNavItem href="/docs/side-nav">Dashboard</SideNavItem>
							<SideNavItem href="/docs/side-nav" disabled>Billing</SideNavItem>
							<SideNavGroup label="Admin" disabled>
								<SideNavItem href="/docs/side-nav">Users</SideNavItem>
								<SideNavItem href="/docs/side-nav">Roles</SideNavItem>
							</SideNavGroup>
						</SideNav>
					</Card>
				</div>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="kitchen-sink" title="Kitchen Sink">
			<p class="example-desc">
				A realistic sidebar menu combining labels, groups, nested groups, icons, badges, active
				states, dividers, and disabled items.
			</p>
			<CodeExample code="" previewClass="column">
				<div style="width: 280px;">
					<Card padding="none">
						<SideNav>
							<SideNavLabel>Overview</SideNavLabel>
							<SideNavItem href="/docs/side-nav" isActive>
								{#snippet icon()}<HomeIcon size={18} />{/snippet}
								Dashboard
							</SideNavItem>
							<SideNavItem href="/docs/side-nav">
								{#snippet icon()}<SearchIcon size={18} />{/snippet}
								Search
							</SideNavItem>
							<SideNavItem href="/docs/side-nav">
								{#snippet icon()}<InboxIcon size={18} />{/snippet}
								{#snippet badge()}<Badge label="24" variant="primary" size="sm" />{/snippet}
								Inbox
							</SideNavItem>

							<SideNavDivider />

							<SideNavLabel>Workspace</SideNavLabel>
							<SideNavGroup label="Projects">
								{#snippet icon()}<FolderIcon size={18} />{/snippet}
								<SideNavItem href="/docs/side-nav">
									{#snippet icon()}<ZapIcon size={18} />{/snippet}
									Active
								</SideNavItem>
								<SideNavItem href="/docs/side-nav">
									{#snippet icon()}<StarIcon size={18} />{/snippet}
									{#snippet badge()}<Badge label="3" variant="neutral" size="sm" />{/snippet}
									Starred
								</SideNavItem>
								<SideNavGroup label="Archived">
									<SideNavItem href="/docs/side-nav">
										{#snippet icon()}<ClockIcon size={18} />{/snippet}
										2025
									</SideNavItem>
									<SideNavItem href="/docs/side-nav">
										{#snippet icon()}<ClockIcon size={18} />{/snippet}
										2024
									</SideNavItem>
									<SideNavItem href="/docs/side-nav">
										{#snippet icon()}<ClockIcon size={18} />{/snippet}
										2023
									</SideNavItem>
								</SideNavGroup>
							</SideNavGroup>
							<SideNavGroup label="Content">
								{#snippet icon()}<EditIcon size={18} />{/snippet}
								<SideNavItem href="/docs/side-nav">
									{#snippet icon()}<BookOpenIcon size={18} />{/snippet}
									Pages
								</SideNavItem>
								<SideNavItem href="/docs/side-nav">
									{#snippet icon()}<CodeIcon size={18} />{/snippet}
									Templates
								</SideNavItem>
								<SideNavItem href="/docs/side-nav">
									{#snippet icon()}<DownloadIcon size={18} />{/snippet}
									Downloads
								</SideNavItem>
							</SideNavGroup>
							<SideNavGroup label="Analytics">
								{#snippet icon()}<BarChartIcon size={18} />{/snippet}
								<SideNavItem href="/docs/side-nav">Overview</SideNavItem>
								<SideNavItem href="/docs/side-nav">
									{#snippet badge()}<Badge label="Live" variant="success" size="sm" />{/snippet}
									Real-time
								</SideNavItem>
								<SideNavItem href="/docs/side-nav">Reports</SideNavItem>
								<SideNavItem href="/docs/side-nav">Exports</SideNavItem>
							</SideNavGroup>

							<SideNavDivider />

							<SideNavLabel>Account</SideNavLabel>
							<SideNavGroup label="Settings">
								{#snippet icon()}<SettingsIcon size={18} />{/snippet}
								<SideNavItem href="/docs/side-nav">General</SideNavItem>
								<SideNavItem href="/docs/side-nav">Security</SideNavItem>
								<SideNavItem href="/docs/side-nav">
									{#snippet icon()}<MailIcon size={18} />{/snippet}
									Notifications
								</SideNavItem>
								<SideNavItem href="/docs/side-nav">
									{#snippet icon()}<PuzzleIcon size={18} />{/snippet}
									Integrations
								</SideNavItem>
							</SideNavGroup>
							<SideNavItem href="/docs/side-nav">
								{#snippet icon()}<UsersIcon size={18} />{/snippet}
								Team
							</SideNavItem>
							<SideNavItem href="/docs/side-nav">
								{#snippet icon()}<CalendarIcon size={18} />{/snippet}
								Schedule
							</SideNavItem>
							<SideNavItem href="/docs/side-nav" disabled>
								{#snippet icon()}<TrashIcon size={18} />{/snippet}
								Trash
							</SideNavItem>

							<SideNavDivider />

							<SideNavItem href="/docs/side-nav">
								{#snippet icon()}<HelpCircleIcon size={18} />{/snippet}
								Help & Support
							</SideNavItem>
						</SideNav>
					</Card>
				</div>
			</CodeExample>
		</ExampleBlock>
	</DocSection>

	<DocSection id="api" title="API">
		<PropsTable
			title="SideNav Props"
			columns={['Prop', 'Type', 'Default', 'Description']}
			rows={[
				['collapsed', 'boolean', 'false', 'Switches to icon-only display mode'],
				['children', 'Snippet', 'required', 'SideNav content (SideNavItem, SideNavGroup, etc.)']
			]}
		/>

		<PropsTable
			title="SideNavItem Props"
			columns={['Prop', 'Type', 'Default', 'Description']}
			rows={[
				['isActive', 'boolean', 'false', 'Highlights the item as the current page'],
				['icon', 'Snippet', 'undefined', 'Leading icon slot'],
				['badge', 'Snippet', 'undefined', 'Trailing badge/count slot'],
				['disabled', 'boolean', 'false', 'Disables the item'],
				['href', 'string', 'undefined', 'When provided, renders as <a> instead of <button>'],
				['children', 'Snippet', 'required', 'Item label text']
			]}
		/>

		<PropsTable
			title="SideNavGroup Props"
			columns={['Prop', 'Type', 'Default', 'Description']}
			rows={[
				['label', 'string', 'required', 'Group heading text'],
				['icon', 'Snippet', 'undefined', 'Leading icon for the group trigger'],
				['open', 'boolean', 'true', 'Controls open/collapsed state. Bindable'],
				['hasRail', 'boolean', 'true', 'Shows a vertical rail alongside children'],
				['ontoggle', '(open: boolean) => void', 'undefined', 'Called when the group is toggled'],
				['disabled', 'boolean', 'false', 'Disables the group trigger'],
				[
					'children',
					'Snippet',
					'required',
					'Group content (SideNavItem, nested SideNavGroup, etc.)'
				]
			]}
		/>

		<PropsTable
			title="SideNavLabel Props"
			columns={['Prop', 'Type', 'Default', 'Description']}
			rows={[['children', 'Snippet', 'required', 'Label text']]}
		/>

		<p class="api-note">
			<code>SideNavDivider</code> accepts all standard <code>HTMLHRElement</code> attributes. All
			components forward <code>...restProps</code> to their root elements.
		</p>
	</DocSection>

	<DocSection id="css-tokens" title="CSS Tokens">
		<PropsTable
			columns={['Token', 'Default', 'Description']}
			rows={[
				['--side-nav-padding', 'calc(var(--ui-base-spacing) * 0.5)', 'Container padding'],
				['--side-nav-gap', 'calc(var(--ui-base-spacing) * 0.25)', 'Gap between items'],
				['--side-nav-item-height', 'calc(var(--ui-base-spacing) * 4.5)', 'Minimum item height'],
				[
					'--side-nav-item-padding-x',
					'calc(var(--ui-base-spacing) * 1.5)',
					'Item horizontal padding'
				],
				[
					'--side-nav-item-indent',
					'calc(var(--ui-base-spacing) * 2)',
					'Indentation per nesting level'
				],
				['--side-nav-item-font-size', 'var(--ui-text-sm)', 'Item font size'],
				[
					'--side-nav-item-border-radius',
					'calc(var(--ui-base-radius) * 0.75)',
					'Item border radius'
				],
				[
					'--side-nav-item-hover-bg',
					'color-mix(var(--ui-neutral), transparent 90%)',
					'Item hover background'
				],
				[
					'--side-nav-item-selected-bg',
					'color-mix(var(--ui-primary), transparent 88%)',
					'Active item background'
				],
				['--side-nav-item-selected-color', 'var(--ui-primary)', 'Active item text color'],
				['--side-nav-duration', 'var(--ui-base-duration)', 'Transition duration'],
				['--side-nav-easing', 'var(--ui-base-easing)', 'Transition easing function']
			]}
		/>
	</DocSection>

	{#snippet sidebar()}
		<TableOfContents sections={tocSections} />
	{/snippet}
</DocsPage>

<style>
	.toggle-btn {
		padding: 6px 12px;
		border: 1px solid var(--ui-border);
		border-radius: var(--ui-base-radius);
		background: var(--ui-surface);
		color: var(--ui-surface-foreground);
		font-size: var(--ui-text-sm);
		cursor: pointer;
		white-space: nowrap;
	}
</style>
