<script lang="ts">
	import { resolve } from '$app/paths';
	import {
		ShowcaseCategory,
		ComponentBlock,
		DemoGroup,
		DemoColumn,
		DemoHint
	} from '../components/index.js';
	import Accordion from '$lib/components/accordion/Accordion.svelte';
	import AccordionItem from '$lib/components/accordion/AccordionItem.svelte';
	import Breadcrumbs from '$lib/components/breadcrumbs/Breadcrumbs.svelte';
	import BreadcrumbItem from '$lib/components/breadcrumbs/BreadcrumbItem.svelte';
	import Pagination from '$lib/components/pagination/Pagination.svelte';
	import SideNav from '$lib/components/side-nav/SideNav.svelte';
	import SideNavGroup from '$lib/components/side-nav/SideNavGroup.svelte';
	import SideNavItem from '$lib/components/side-nav/SideNavItem.svelte';
	import SideNavLabel from '$lib/components/side-nav/SideNavLabel.svelte';
	import SideNavDivider from '$lib/components/side-nav/SideNavDivider.svelte';
	import Tabs from '$lib/components/tabs/Tabs.svelte';
	import TabList from '$lib/components/tabs/TabList.svelte';
	import Tab from '$lib/components/tabs/Tab.svelte';
	import TabPanel from '$lib/components/tabs/TabPanel.svelte';
	import Card from '$lib/components/card/Card.svelte';
	import Badge from '$lib/components/badge/Badge.svelte';
	import HomeIcon from '$lib/icons/HomeIcon.svelte';
	import SettingsIcon from '$lib/icons/SettingsIcon.svelte';
	import UsersIcon from '$lib/icons/UsersIcon.svelte';
	import InboxIcon from '$lib/icons/InboxIcon.svelte';
	import BarChartIcon from '$lib/icons/BarChartIcon.svelte';
	import FolderIcon from '$lib/icons/FolderIcon.svelte';
	import HelpCircleIcon from '$lib/icons/HelpCircleIcon.svelte';
	import MailIcon from '$lib/icons/MailIcon.svelte';
	import StarIcon from '$lib/icons/StarIcon.svelte';
	import ZapIcon from '$lib/icons/ZapIcon.svelte';
	import ClockIcon from '$lib/icons/ClockIcon.svelte';

	let accordionControlledValue = $state('b');
	let basicPage = $state(1);
	let smPage = $state(1);
	let mdPage = $state(1);
	let lgPage = $state(1);
	let isCollapsed = $state(false);
	let tabsControlledValue = $state('features');
</script>

<ShowcaseCategory id="navigation" title="Navigation">
	<!-- Accordion -->
	<ComponentBlock id="accordion" title="Accordion">
		<DemoGroup label="Single">
			<DemoColumn style="max-width: 500px;">
				<Accordion>
					<AccordionItem value="a" title="What is a design system?">
						A design system is a collection of reusable components, guidelines, and tokens that
						teams use to build consistent user interfaces.
					</AccordionItem>
					<AccordionItem value="b" title="How do I install this package?">
						Run <code>npm install @xsimjo/design-system</code> in your project root, then import components
						from the package.
					</AccordionItem>
					<AccordionItem value="c" title="Does it support dark mode?">
						Yes. Set <code>data-theme="dark"</code> on the <code>&lt;html&gt;</code> element to switch
						to the dark theme.
					</AccordionItem>
				</Accordion>
			</DemoColumn>
		</DemoGroup>

		<DemoGroup label="Collapsible">
			<DemoColumn style="max-width: 500px;">
				<Accordion collapsible>
					<AccordionItem value="a" title="Click to expand">
						Click this item again to collapse it.
					</AccordionItem>
					<AccordionItem value="b" title="Another section">
						This section can also be independently closed.
					</AccordionItem>
				</Accordion>
			</DemoColumn>
		</DemoGroup>

		<DemoGroup label="Multiple">
			<DemoColumn style="max-width: 500px;">
				<Accordion mode="multiple">
					<AccordionItem value="a" title="Shipping policy">
						We ship to over 50 countries. Standard shipping takes 5–7 business days.
					</AccordionItem>
					<AccordionItem value="b" title="Return policy">
						Items can be returned within 30 days of delivery.
					</AccordionItem>
					<AccordionItem value="c" title="Payment methods">
						We accept Visa, Mastercard, American Express, PayPal, and Apple Pay.
					</AccordionItem>
				</Accordion>
			</DemoColumn>
		</DemoGroup>

		<DemoGroup label="Disabled Item">
			<DemoColumn style="max-width: 500px;">
				<Accordion>
					<AccordionItem value="a" title="Available feature">
						This item can be toggled normally.
					</AccordionItem>
					<AccordionItem value="b" title="Unavailable feature" disabled>
						This item is disabled and cannot be opened.
					</AccordionItem>
					<AccordionItem value="c" title="Another available feature">
						This item can also be toggled.
					</AccordionItem>
				</Accordion>
			</DemoColumn>
		</DemoGroup>

		<DemoGroup label="Controlled">
			<DemoColumn style="max-width: 500px;">
				<DemoHint>Open item: <code>{accordionControlledValue ?? 'none'}</code></DemoHint>
				<Accordion bind:value={accordionControlledValue} collapsible>
					<AccordionItem value="a" title="Item A">Content for item A.</AccordionItem>
					<AccordionItem value="b" title="Item B">Content for item B.</AccordionItem>
					<AccordionItem value="c" title="Item C">Content for item C.</AccordionItem>
				</Accordion>
			</DemoColumn>
		</DemoGroup>

		<DemoGroup label="In a Card">
			<DemoColumn style="max-width: 500px;">
				<Card padding="none">
					<Accordion>
						<AccordionItem value="a" title="What is included?">
							Every plan includes unlimited projects, priority support, and access to all
							components.
						</AccordionItem>
						<AccordionItem value="b" title="Can I cancel anytime?">
							Yes. You can cancel your subscription at any time with no cancellation fees.
						</AccordionItem>
						<AccordionItem value="c" title="Do you offer refunds?">
							We offer a 30-day money-back guarantee on all plans.
						</AccordionItem>
					</Accordion>
				</Card>
			</DemoColumn>
		</DemoGroup>
	</ComponentBlock>

	<!-- Breadcrumbs -->
	<ComponentBlock id="breadcrumbs" title="Breadcrumbs">
		<DemoGroup label="Default (Chevron)">
			<Breadcrumbs>
				<BreadcrumbItem href={resolve('/showcase')}>Home</BreadcrumbItem>
				<BreadcrumbItem href={resolve('/showcase')}>Products</BreadcrumbItem>
				<BreadcrumbItem>Electronics</BreadcrumbItem>
			</Breadcrumbs>
		</DemoGroup>

		<DemoGroup label="Slash Separator">
			<Breadcrumbs separator="slash">
				<BreadcrumbItem href={resolve('/showcase')}>Dashboard</BreadcrumbItem>
				<BreadcrumbItem href={resolve('/showcase')}>Settings</BreadcrumbItem>
				<BreadcrumbItem href={resolve('/showcase')}>Security</BreadcrumbItem>
				<BreadcrumbItem>Two-factor auth</BreadcrumbItem>
			</Breadcrumbs>
		</DemoGroup>
	</ComponentBlock>

	<!-- Pagination -->
	<ComponentBlock id="pagination" title="Pagination">
		<DemoGroup label="Basic">
			<DemoColumn>
				<Pagination bind:page={basicPage} total={120} pageSize={10} />
				<DemoHint>Page {basicPage} of 12</DemoHint>
			</DemoColumn>
		</DemoGroup>

		<DemoGroup label="Sizes">
			<DemoColumn style="gap: var(--space-4);">
				<div>
					<DemoHint>sm</DemoHint>
					<Pagination bind:page={smPage} total={50} pageSize={10} size="sm" />
				</div>
				<div>
					<DemoHint>md</DemoHint>
					<Pagination bind:page={mdPage} total={50} pageSize={10} size="md" />
				</div>
				<div>
					<DemoHint>lg</DemoHint>
					<Pagination bind:page={lgPage} total={50} pageSize={10} size="lg" />
				</div>
			</DemoColumn>
		</DemoGroup>

		<DemoGroup label="Without First / Last">
			<Pagination page={5} total={120} pageSize={10} showFirstLast={false} />
		</DemoGroup>
	</ComponentBlock>

	<!-- SideNav -->
	<ComponentBlock id="side-nav" title="SideNav">
		<DemoGroup label="Basic with Icons">
			<div style="width: 260px;">
				<Card padding="none">
					<SideNav>
						<SideNavItem href={resolve('/showcase')}>
							{#snippet icon()}<HomeIcon size={18} />{/snippet}
							Dashboard
						</SideNavItem>
						<SideNavItem href={resolve('/showcase')}>
							{#snippet icon()}<InboxIcon size={18} />{/snippet}
							Inbox
						</SideNavItem>
						<SideNavItem href={resolve('/showcase')}>
							{#snippet icon()}<UsersIcon size={18} />{/snippet}
							Team
						</SideNavItem>
						<SideNavItem href={resolve('/showcase')}>
							{#snippet icon()}<SettingsIcon size={18} />{/snippet}
							Settings
						</SideNavItem>
					</SideNav>
				</Card>
			</div>
		</DemoGroup>

		<DemoGroup label="Collapsible Groups">
			<div style="width: 260px;">
				<Card padding="none">
					<SideNav>
						<SideNavGroup label="Analytics">
							{#snippet icon()}<BarChartIcon size={18} />{/snippet}
							<SideNavItem href={resolve('/showcase')}>Overview</SideNavItem>
							<SideNavItem href={resolve('/showcase')}>Reports</SideNavItem>
							<SideNavItem href={resolve('/showcase')}>Exports</SideNavItem>
						</SideNavGroup>
						<SideNavGroup label="Settings">
							{#snippet icon()}<SettingsIcon size={18} />{/snippet}
							<SideNavItem href={resolve('/showcase')}>General</SideNavItem>
							<SideNavItem href={resolve('/showcase')}>Security</SideNavItem>
						</SideNavGroup>
					</SideNav>
				</Card>
			</div>
		</DemoGroup>

		<DemoGroup label="Nested Groups">
			<div style="width: 260px;">
				<Card padding="none">
					<SideNav>
						<SideNavItem href={resolve('/showcase')}>
							{#snippet icon()}<HomeIcon size={18} />{/snippet}
							Home
						</SideNavItem>
						<SideNavGroup label="Projects">
							{#snippet icon()}<FolderIcon size={18} />{/snippet}
							<SideNavItem href={resolve('/showcase')}>Active</SideNavItem>
							<SideNavGroup label="Archived">
								<SideNavItem href={resolve('/showcase')}>2024</SideNavItem>
								<SideNavItem href={resolve('/showcase')}>2023</SideNavItem>
							</SideNavGroup>
						</SideNavGroup>
					</SideNav>
				</Card>
			</div>
		</DemoGroup>

		<DemoGroup label="Labels, Dividers & Badges">
			<div style="width: 260px;">
				<Card padding="none">
					<SideNav>
						<SideNavLabel>Main</SideNavLabel>
						<SideNavItem href={resolve('/showcase')}>
							{#snippet icon()}<HomeIcon size={18} />{/snippet}
							Dashboard
						</SideNavItem>
						<SideNavItem href={resolve('/showcase')}>
							{#snippet icon()}<InboxIcon size={18} />{/snippet}
							{#snippet badge()}<Badge label="12" variant="primary" size="sm" />{/snippet}
							Inbox
						</SideNavItem>
						<SideNavDivider />
						<SideNavLabel>Support</SideNavLabel>
						<SideNavItem href={resolve('/showcase')}>
							{#snippet icon()}<HelpCircleIcon size={18} />{/snippet}
							Help Center
						</SideNavItem>
					</SideNav>
				</Card>
			</div>
		</DemoGroup>

		<DemoGroup label="Collapsed (Icon Only)">
			<div style="display: flex; gap: 16px; align-items: flex-start;">
				<button class="toggle-btn" onclick={() => (isCollapsed = !isCollapsed)} type="button">
					{isCollapsed ? 'Expand' : 'Collapse'}
				</button>
				<Card padding="none">
					<SideNav collapsed={isCollapsed}>
						<SideNavItem href={resolve('/showcase')} aria-label="Home">
							{#snippet icon()}<HomeIcon size={18} />{/snippet}
							Home
						</SideNavItem>
						<SideNavItem href={resolve('/showcase')} aria-label="Inbox">
							{#snippet icon()}<InboxIcon size={18} />{/snippet}
							Inbox
						</SideNavItem>
						<SideNavGroup label="Settings">
							{#snippet icon()}<SettingsIcon size={18} />{/snippet}
							<SideNavItem href={resolve('/showcase')}>General</SideNavItem>
							<SideNavItem href={resolve('/showcase')}>Security</SideNavItem>
						</SideNavGroup>
					</SideNav>
				</Card>
			</div>
		</DemoGroup>

		<DemoGroup label="Active & Disabled">
			<div style="width: 260px;">
				<Card padding="none">
					<SideNav>
						<SideNavItem href={resolve('/showcase')}>
							{#snippet icon()}<HomeIcon size={18} />{/snippet}
							Dashboard
						</SideNavItem>
						<SideNavItem href={resolve('/showcase')} isActive>
							{#snippet icon()}<BarChartIcon size={18} />{/snippet}
							Analytics
						</SideNavItem>
						<SideNavItem href={resolve('/showcase')} disabled>
							{#snippet icon()}<SettingsIcon size={18} />{/snippet}
							Settings
						</SideNavItem>
					</SideNav>
				</Card>
			</div>
		</DemoGroup>

		<DemoGroup label="Kitchen Sink">
			<div style="width: 280px;">
				<Card padding="none">
					<SideNav>
						<SideNavLabel>Overview</SideNavLabel>
						<SideNavItem href={resolve('/showcase')} isActive>
							{#snippet icon()}<HomeIcon size={18} />{/snippet}
							Dashboard
						</SideNavItem>
						<SideNavItem href={resolve('/showcase')}>
							{#snippet icon()}<InboxIcon size={18} />{/snippet}
							{#snippet badge()}<Badge label="24" variant="primary" size="sm" />{/snippet}
							Inbox
						</SideNavItem>
						<SideNavDivider />
						<SideNavLabel>Workspace</SideNavLabel>
						<SideNavGroup label="Projects">
							{#snippet icon()}<FolderIcon size={18} />{/snippet}
							<SideNavItem href={resolve('/showcase')}>
								{#snippet icon()}<ZapIcon size={18} />{/snippet}
								Active
							</SideNavItem>
							<SideNavItem href={resolve('/showcase')}>
								{#snippet icon()}<StarIcon size={18} />{/snippet}
								{#snippet badge()}<Badge label="3" variant="neutral" size="sm" />{/snippet}
								Starred
							</SideNavItem>
							<SideNavGroup label="Archived">
								<SideNavItem href={resolve('/showcase')}>
									{#snippet icon()}<ClockIcon size={18} />{/snippet}
									2025
								</SideNavItem>
								<SideNavItem href={resolve('/showcase')}>
									{#snippet icon()}<ClockIcon size={18} />{/snippet}
									2024
								</SideNavItem>
							</SideNavGroup>
						</SideNavGroup>
						<SideNavDivider />
						<SideNavLabel>Account</SideNavLabel>
						<SideNavGroup label="Settings">
							{#snippet icon()}<SettingsIcon size={18} />{/snippet}
							<SideNavItem href={resolve('/showcase')}>General</SideNavItem>
							<SideNavItem href={resolve('/showcase')}>
								{#snippet icon()}<MailIcon size={18} />{/snippet}
								Notifications
							</SideNavItem>
						</SideNavGroup>
						<SideNavItem href={resolve('/showcase')}>
							{#snippet icon()}<UsersIcon size={18} />{/snippet}
							Team
						</SideNavItem>
						<SideNavItem href={resolve('/showcase')}>
							{#snippet icon()}<HelpCircleIcon size={18} />{/snippet}
							Help & Support
						</SideNavItem>
					</SideNav>
				</Card>
			</div>
		</DemoGroup>
	</ComponentBlock>

	<!-- Tabs -->
	<ComponentBlock id="tabs" title="Tabs">
		<DemoGroup label="Underline">
			<Tabs>
				<TabList>
					<Tab value="overview">Overview</Tab>
					<Tab value="features">Features</Tab>
					<Tab value="pricing">Pricing</Tab>
				</TabList>
				<TabPanel value="overview"><p>Overview content goes here.</p></TabPanel>
				<TabPanel value="features"><p>Features content goes here.</p></TabPanel>
				<TabPanel value="pricing"><p>Pricing content goes here.</p></TabPanel>
			</Tabs>
		</DemoGroup>

		<DemoGroup label="Pills">
			<Tabs variant="pills">
				<TabList>
					<Tab value="general">General</Tab>
					<Tab value="security">Security</Tab>
					<Tab value="notifications">Notifications</Tab>
				</TabList>
				<TabPanel value="general"><p>General settings content.</p></TabPanel>
				<TabPanel value="security"><p>Security settings content.</p></TabPanel>
				<TabPanel value="notifications"><p>Notification preferences.</p></TabPanel>
			</Tabs>
		</DemoGroup>

		<DemoGroup label="Enclosed">
			<Tabs variant="enclosed">
				<TabList>
					<Tab value="code">Code</Tab>
					<Tab value="preview">Preview</Tab>
					<Tab value="tests">Tests</Tab>
				</TabList>
				<TabPanel value="code"><p>Code editor content.</p></TabPanel>
				<TabPanel value="preview"><p>Preview content.</p></TabPanel>
				<TabPanel value="tests"><p>Test results.</p></TabPanel>
			</Tabs>
		</DemoGroup>

		<DemoGroup label="Sizes">
			<DemoColumn>
				{#each ['sm', 'md', 'lg'] as const as size (size)}
					<div>
						<DemoHint>{size}</DemoHint>
						<Tabs {size}>
							<TabList>
								<Tab value="a">Tab A</Tab>
								<Tab value="b">Tab B</Tab>
							</TabList>
							<TabPanel value="a"><p>{size} tab A content.</p></TabPanel>
							<TabPanel value="b"><p>{size} tab B content.</p></TabPanel>
						</Tabs>
					</div>
				{/each}
			</DemoColumn>
		</DemoGroup>

		<DemoGroup label="Full Width & Disabled">
			<Tabs fullWidth>
				<TabList>
					<Tab value="dashboard">Dashboard</Tab>
					<Tab value="analytics">Analytics</Tab>
					<Tab value="reports" disabled>Reports</Tab>
				</TabList>
				<TabPanel value="dashboard"><p>Dashboard content.</p></TabPanel>
				<TabPanel value="analytics"><p>Analytics content.</p></TabPanel>
				<TabPanel value="reports"><p>Reports content.</p></TabPanel>
			</Tabs>
		</DemoGroup>

		<DemoGroup label="Controlled">
			<DemoColumn>
				<DemoHint>Active tab: <code>{tabsControlledValue}</code></DemoHint>
				<Tabs bind:value={tabsControlledValue}>
					<TabList>
						<Tab value="overview">Overview</Tab>
						<Tab value="features">Features</Tab>
						<Tab value="pricing">Pricing</Tab>
					</TabList>
					<TabPanel value="overview"><p>Overview content.</p></TabPanel>
					<TabPanel value="features"><p>Features content.</p></TabPanel>
					<TabPanel value="pricing"><p>Pricing content.</p></TabPanel>
				</Tabs>
			</DemoColumn>
		</DemoGroup>

		<DemoGroup label="In a Card">
			<div style="max-width: 500px;">
				<Card>
					<Tabs variant="enclosed">
						<TabList>
							<Tab value="details">Details</Tab>
							<Tab value="reviews">Reviews</Tab>
							<Tab value="specs">Specs</Tab>
						</TabList>
						<TabPanel value="details"><p>Product details go here.</p></TabPanel>
						<TabPanel value="reviews"><p>Customer reviews go here.</p></TabPanel>
						<TabPanel value="specs"><p>Technical specs go here.</p></TabPanel>
					</Tabs>
				</Card>
			</div>
		</DemoGroup>
	</ComponentBlock>
</ShowcaseCategory>

<style>
	.toggle-btn {
		padding: var(--space-1) var(--space-3);
		border: 1px solid var(--ui-border);
		border-radius: var(--ui-base-radius);
		background: var(--ui-surface);
		color: var(--ui-surface-foreground);
		font-size: var(--ui-text-sm);
		cursor: pointer;
		white-space: nowrap;
	}
</style>
