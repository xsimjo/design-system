<script lang="ts">
	import Sidebar from '$lib/components/sidebar/Sidebar.svelte';
	import SidebarItem from '$lib/components/sidebar/SidebarItem.svelte';
	import SidebarGroup from '$lib/components/sidebar/SidebarGroup.svelte';
	import SidebarDivider from '$lib/components/sidebar/SidebarDivider.svelte';
	import HomeIcon from '$lib/icons/HomeIcon.svelte';
	import FolderIcon from '$lib/icons/FolderIcon.svelte';
	import UsersIcon from '$lib/icons/UsersIcon.svelte';
	import BarChartIcon from '$lib/icons/BarChartIcon.svelte';
	import SettingsIcon from '$lib/icons/SettingsIcon.svelte';
	import HelpCircleIcon from '$lib/icons/HelpCircleIcon.svelte';
	import InboxIcon from '$lib/icons/InboxIcon.svelte';
	import CalendarIcon from '$lib/icons/CalendarIcon.svelte';
	import Avatar from '$lib/components/avatar/Avatar.svelte';

	let basicCollapsed = $state(false);
	let groupedCollapsed = $state(false);
	let headerFooterCollapsed = $state(false);
	let nonCollapsibleActive = $state('dashboard');
</script>

<section class="section">
	<h2 class="section-title">Sidebar</h2>
	<p class="description">
		A vertical navigation component for organizing primary navigation, filters, or settings.
		Supports collapsible states, grouped items, and customizable header/footer sections.
	</p>

	<div class="subsection">
		<h3>Basic Sidebar</h3>
		<p class="subsection-description">
			A simple collapsible sidebar with navigation items. Click the toggle button to collapse.
		</p>
		<div class="sidebar-container">
			<Sidebar bind:collapsed={basicCollapsed}>
				<SidebarItem href="#dashboard" active>
					{#snippet icon()}<HomeIcon size="var(--sidebar-icon-size)" />{/snippet}
					Dashboard
				</SidebarItem>
				<SidebarItem href="#projects">
					{#snippet icon()}<FolderIcon size="var(--sidebar-icon-size)" />{/snippet}
					Projects
				</SidebarItem>
				<SidebarItem href="#team">
					{#snippet icon()}<UsersIcon size="var(--sidebar-icon-size)" />{/snippet}
					Team
				</SidebarItem>
				<SidebarItem href="#analytics">
					{#snippet icon()}<BarChartIcon size="var(--sidebar-icon-size)" />{/snippet}
					Analytics
				</SidebarItem>
			</Sidebar>
		</div>
	</div>

	<div class="subsection">
		<h3>Grouped Items</h3>
		<p class="subsection-description">
			Items can be organized into groups with optional titles for better organization.
		</p>
		<div class="sidebar-container">
			<Sidebar bind:collapsed={groupedCollapsed}>
				<SidebarGroup>
					<SidebarItem href="#dashboard" active>
						{#snippet icon()}<HomeIcon size="var(--sidebar-icon-size)" />{/snippet}
						Dashboard
					</SidebarItem>
					<SidebarItem href="#inbox">
						{#snippet icon()}<InboxIcon size="var(--sidebar-icon-size)" />{/snippet}
						Inbox
					</SidebarItem>
				</SidebarGroup>

				<SidebarDivider />

				<SidebarGroup title="Workspace">
					<SidebarItem href="#projects">
						{#snippet icon()}<FolderIcon size="var(--sidebar-icon-size)" />{/snippet}
						Projects
					</SidebarItem>
					<SidebarItem href="#calendar">
						{#snippet icon()}<CalendarIcon size="var(--sidebar-icon-size)" />{/snippet}
						Calendar
					</SidebarItem>
					<SidebarItem href="#team">
						{#snippet icon()}<UsersIcon size="var(--sidebar-icon-size)" />{/snippet}
						Team
					</SidebarItem>
				</SidebarGroup>

				<SidebarGroup title="Settings">
					<SidebarItem href="#settings">
						{#snippet icon()}<SettingsIcon size="var(--sidebar-icon-size)" />{/snippet}
						Settings
					</SidebarItem>
					<SidebarItem href="#help">
						{#snippet icon()}<HelpCircleIcon size="var(--sidebar-icon-size)" />{/snippet}
						Help
					</SidebarItem>
				</SidebarGroup>
			</Sidebar>
		</div>
	</div>

	<div class="subsection">
		<h3>With Header & Footer</h3>
		<p class="subsection-description">
			Add custom header and footer sections for branding, user info, or additional actions.
		</p>
		<div class="sidebar-container">
			<Sidebar bind:collapsed={headerFooterCollapsed}>
				{#snippet header()}
					<div class="sidebar-brand">
						<div class="sidebar-logo">DS</div>
						{#if !headerFooterCollapsed}
							<span class="sidebar-brand-text">Design System</span>
						{/if}
					</div>
				{/snippet}

				<SidebarItem href="#dashboard" active>
					{#snippet icon()}<HomeIcon size="var(--sidebar-icon-size)" />{/snippet}
					Dashboard
				</SidebarItem>
				<SidebarItem href="#projects">
					{#snippet icon()}<FolderIcon size="var(--sidebar-icon-size)" />{/snippet}
					Projects
				</SidebarItem>
				<SidebarItem href="#analytics">
					{#snippet icon()}<BarChartIcon size="var(--sidebar-icon-size)" />{/snippet}
					Analytics
				</SidebarItem>

				{#snippet footer()}
					<div class="sidebar-user">
						<Avatar size="sm" initials="JD" />
						{#if !headerFooterCollapsed}
							<div class="sidebar-user-info">
								<span class="sidebar-user-name">John Doe</span>
								<span class="sidebar-user-email">john@example.com</span>
							</div>
						{/if}
					</div>
				{/snippet}
			</Sidebar>
		</div>
	</div>

	<div class="subsection">
		<h3>Non-Collapsible</h3>
		<p class="subsection-description">A fixed-width sidebar without collapse functionality.</p>
		<div class="sidebar-container">
			<Sidebar collapsible={false}>
				<SidebarItem
					active={nonCollapsibleActive === 'dashboard'}
					onclick={() => (nonCollapsibleActive = 'dashboard')}
				>
					{#snippet icon()}<HomeIcon size="var(--sidebar-icon-size)" />{/snippet}
					Dashboard
				</SidebarItem>
				<SidebarItem
					active={nonCollapsibleActive === 'projects'}
					onclick={() => (nonCollapsibleActive = 'projects')}
				>
					{#snippet icon()}<FolderIcon size="var(--sidebar-icon-size)" />{/snippet}
					Projects
				</SidebarItem>
				<SidebarItem
					active={nonCollapsibleActive === 'team'}
					onclick={() => (nonCollapsibleActive = 'team')}
				>
					{#snippet icon()}<UsersIcon size="var(--sidebar-icon-size)" />{/snippet}
					Team
				</SidebarItem>
				<SidebarItem disabled>
					{#snippet icon()}<SettingsIcon size="var(--sidebar-icon-size)" />{/snippet}
					Settings (Disabled)
				</SidebarItem>
			</Sidebar>
		</div>
	</div>

	<div class="subsection">
		<h3>Item States</h3>
		<p class="subsection-description">
			Sidebar items support default, hover, active, and disabled states.
		</p>
		<div class="sidebar-container sidebar-container--narrow">
			<Sidebar collapsible={false} showToggle={false}>
				<SidebarItem>
					{#snippet icon()}<HomeIcon size="var(--sidebar-icon-size)" />{/snippet}
					Default State
				</SidebarItem>
				<SidebarItem active>
					{#snippet icon()}<FolderIcon size="var(--sidebar-icon-size)" />{/snippet}
					Active State
				</SidebarItem>
				<SidebarItem disabled>
					{#snippet icon()}<SettingsIcon size="var(--sidebar-icon-size)" />{/snippet}
					Disabled State
				</SidebarItem>
			</Sidebar>
		</div>
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
		margin-bottom: var(--space-8);
	}

	.subsection:last-child {
		margin-bottom: 0;
	}

	.subsection h3 {
		margin: 0 0 var(--space-2) 0;
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		color: var(--section-label);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.subsection-description {
		margin: 0 0 var(--space-4) 0;
		font-size: var(--font-size-sm);
		color: var(--section-description);
	}

	.sidebar-container {
		height: 400px;
		border: 1px solid var(--sidebar-border);
		border-radius: var(--radius-lg);
		overflow: hidden;
	}

	.sidebar-container--narrow {
		height: auto;
		max-width: 280px;
	}

	.sidebar-brand {
		display: flex;
		align-items: center;
		gap: var(--space-3);
	}

	.sidebar-logo {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		background-color: var(--button-color-primary);
		color: white;
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-bold);
		border-radius: var(--radius-md);
		flex-shrink: 0;
	}

	.sidebar-brand-text {
		font-size: var(--font-size-md);
		font-weight: var(--font-weight-semibold);
		color: var(--sidebar-item-text);
		white-space: nowrap;
	}

	.sidebar-user {
		display: flex;
		align-items: center;
		gap: var(--space-3);
	}

	.sidebar-user-info {
		display: flex;
		flex-direction: column;
		min-width: 0;
	}

	.sidebar-user-name {
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		color: var(--sidebar-item-text);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.sidebar-user-email {
		font-size: var(--font-size-xs);
		color: var(--sidebar-group-title-color);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
