<script lang="ts">
	import type { Snippet } from 'svelte';
	import Button from '$lib/components/button/Button.svelte';
	import Header from '$lib/components/header/Header.svelte';
	import Sidebar from '$lib/components/sidebar/Sidebar.svelte';
	import SidebarItem from '$lib/components/sidebar/SidebarItem.svelte';
	import SidebarGroup from '$lib/components/sidebar/SidebarGroup.svelte';
	import Tooltip from '$lib/components/tooltip/Tooltip.svelte';
	import GithubIcon from '$lib/icons/GithubIcon.svelte';
	import MoonIcon from '$lib/icons/MoonIcon.svelte';
	import SunIcon from '$lib/icons/SunIcon.svelte';
	import BookOpenIcon from '$lib/icons/BookOpenIcon.svelte';
	import PaletteIcon from '$lib/icons/PaletteIcon.svelte';
	import HomeIcon from '$lib/icons/HomeIcon.svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	type Theme = 'light' | 'dark';

	let theme = $state<Theme>('light');
	let sidebarCollapsed = $state(false);

	function toggleTheme() {
		theme = theme === 'light' ? 'dark' : 'light';
		document.documentElement.setAttribute('data-theme', theme);
	}

	const gettingStarted = [
		{ id: 'introduction', label: 'Introduction', href: '/docs' },
		{ id: 'installation', label: 'Installation', href: '/docs/installation' },
		{ id: 'usage', label: 'Usage', href: '/docs/usage' },
		{ id: 'theming', label: 'Theming', href: '/docs/theming' }
	];

	const components = [
		{ id: 'accordion', label: 'Accordion', href: '/docs/accordion' },
		{ id: 'avatar', label: 'Avatar', href: '/docs/avatar' },
		{ id: 'badge', label: 'Badge', href: '/docs/badge' },
		{ id: 'breadcrumbs', label: 'Breadcrumbs', href: '/docs/breadcrumbs' },
		{ id: 'button', label: 'Button', href: '/docs/button' },
		{ id: 'card', label: 'Card', href: '/docs/card' },
		{ id: 'checkbox', label: 'Checkbox', href: '/docs/checkbox' },
		{ id: 'code-block', label: 'Code Block', href: '/docs/code-block' },
		{ id: 'dialog', label: 'Dialog', href: '/docs/dialog' },
		{ id: 'drawer', label: 'Drawer', href: '/docs/drawer' },
		{ id: 'header', label: 'Header', href: '/docs/header' },
		{ id: 'input', label: 'Input', href: '/docs/input' },
		{ id: 'progress-bar', label: 'Progress Bar', href: '/docs/progress-bar' },
		{ id: 'select', label: 'Select', href: '/docs/select' },
		{ id: 'sidebar', label: 'Sidebar', href: '/docs/sidebar' },
		{ id: 'slider', label: 'Slider', href: '/docs/slider' },
		{ id: 'table', label: 'Table', href: '/docs/table' },
		{ id: 'tabs', label: 'Tabs', href: '/docs/tabs' },
		{ id: 'toast', label: 'Toast', href: '/docs/toast' },
		{ id: 'tooltip', label: 'Tooltip', href: '/docs/tooltip' }
	];

	const foundations = [
		{ id: 'typography', label: 'Typography', href: '/docs/typography' },
		{ id: 'primitive-tokens', label: 'Primitive Tokens', href: '/docs/primitive-tokens' },
		{ id: 'semantic-tokens', label: 'Semantic Tokens', href: '/docs/semantic-tokens' }
	];
</script>

<svelte:head>
	<title>Documentation - Greenfield UI</title>
</svelte:head>

<div class="docs">
	<Header sticky>
		{#snippet logo()}
			<a href="/" class="logo-link">
				<PaletteIcon size={28} />
				<span class="header-title">Greenfield</span>
				<span class="header-subtitle">UI</span>
			</a>
		{/snippet}
		{#snippet nav()}
			<Button variant="ghost" color="secondary" size="sm" href="/">
				<HomeIcon size={16} />
				Home
			</Button>
			<Button variant="ghost" color="secondary" size="sm" href="/docs">
				<BookOpenIcon size={16} />
				Documentation
			</Button>
			<Button variant="ghost" color="secondary" size="sm">Components</Button>
			<Button variant="ghost" color="secondary" size="sm">Themes</Button>
		{/snippet}
		{#snippet actions()}
			<Tooltip text="View on GitHub" position="bottom">
				<Button
					variant="ghost"
					color="secondary"
					size="sm"
					icon
					onclick={() => window.open('https://github.com', '_blank')}
				>
					<GithubIcon size={18} />
				</Button>
			</Tooltip>
			<Tooltip
				text={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
				position="bottom"
			>
				<Button variant="ghost" color="secondary" size="sm" icon onclick={toggleTheme}>
					{#if theme === 'light'}
						<MoonIcon size={18} />
					{:else}
						<SunIcon size={18} />
					{/if}
				</Button>
			</Tooltip>
			<Button variant="outline" color="secondary" size="sm">v0.1.0</Button>
		{/snippet}
	</Header>

	<div class="layout">
		<Sidebar bind:collapsed={sidebarCollapsed} collapsible showToggle>
			<SidebarGroup title="Getting Started">
				{#each gettingStarted as item (item.id)}
					<SidebarItem href={item.href}>
						{item.label}
					</SidebarItem>
				{/each}
			</SidebarGroup>
			<SidebarGroup title="Components">
				{#each components as component (component.id)}
					<SidebarItem href={component.href}>
						{component.label}
					</SidebarItem>
				{/each}
			</SidebarGroup>
			<SidebarGroup title="Foundations">
				{#each foundations as foundation (foundation.id)}
					<SidebarItem href={foundation.href}>
						{foundation.label}
					</SidebarItem>
				{/each}
			</SidebarGroup>
		</Sidebar>

		<main class="content">
			{@render children()}
		</main>
	</div>
</div>

<style>
	.docs {
		min-height: 100vh;
		background-color: var(--page-bg);
		display: flex;
		flex-direction: column;
	}

	.logo-link {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		color: var(--header-text);
		text-decoration: none;
	}

	.header-title {
		font-size: var(--font-size-xl);
		font-weight: var(--font-weight-bold);
		color: var(--header-text);
		letter-spacing: -0.02em;
	}

	.header-subtitle {
		font-size: var(--font-size-xl);
		font-weight: var(--font-weight-normal);
		color: var(--color-primary);
		letter-spacing: -0.02em;
	}

	.layout {
		display: flex;
		flex: 1;
		height: calc(100vh - var(--header-height));
	}

	.layout :global(.sidebar) {
		position: sticky;
		top: var(--header-height);
		height: calc(100vh - var(--header-height));
	}

	.content {
		flex: 1;
		max-width: 900px;
		margin: 0 auto;
		padding: var(--space-8);
		display: flex;
		flex-direction: column;
		gap: var(--space-6);
		overflow-y: auto;
	}
</style>
