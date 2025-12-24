<script lang="ts">
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
	import {
		AccordionShowcase,
		BadgeShowcase,
		BreadcrumbsShowcase,
		ButtonShowcase,
		CardShowcase,
		CheckboxShowcase,
		CodeBlockShowcase,
		DialogShowcase,
		DrawerShowcase,
		InputShowcase,
		SelectShowcase,
		SidebarShowcase,
		SliderShowcase,
		TableShowcase,
		TabsShowcase,
		ToastShowcase,
		HeaderShowcase,
		AvatarShowcase,
		TooltipShowcase,
		TypographyShowcase,
		PrimitiveTokensShowcase,
		SemanticTokensShowcase
	} from '$lib/internal/showcase';

	type Theme = 'light' | 'dark';

	let theme = $state<Theme>('light');
	let sidebarCollapsed = $state(false);

	function toggleTheme() {
		theme = theme === 'light' ? 'dark' : 'light';
		document.documentElement.setAttribute('data-theme', theme);
	}

	const components = [
		{ id: 'accordion', label: 'Accordion' },
		{ id: 'avatar', label: 'Avatar' },
		{ id: 'badge', label: 'Badge' },
		{ id: 'breadcrumbs', label: 'Breadcrumbs' },
		{ id: 'button', label: 'Button' },
		{ id: 'card', label: 'Card' },
		{ id: 'checkbox', label: 'Checkbox' },
		{ id: 'code-block', label: 'Code Block' },
		{ id: 'dialog', label: 'Dialog' },
		{ id: 'drawer', label: 'Drawer' },
		{ id: 'header', label: 'Header' },
		{ id: 'input', label: 'Input' },
		{ id: 'select', label: 'Select' },
		{ id: 'sidebar', label: 'Sidebar' },
		{ id: 'slider', label: 'Slider' },
		{ id: 'table', label: 'Table' },
		{ id: 'tabs', label: 'Tabs' },
		{ id: 'toast', label: 'Toast' },
		{ id: 'tooltip', label: 'Tooltip' }
	];

	const foundations = [
		{ id: 'typography', label: 'Typography' },
		{ id: 'primitive-tokens', label: 'Primitive Tokens' },
		{ id: 'semantic-tokens', label: 'Semantic Tokens' }
	];
</script>

<svelte:head>
	<title>Greenfield UI - Svelte Design System</title>
</svelte:head>

<div class="showcase">
	<Header sticky>
		{#snippet logo()}
			<div class="logo-link">
				<PaletteIcon size={28} />
				<span class="header-title">Greenfield</span>
				<span class="header-subtitle">UI</span>
			</div>
		{/snippet}
		{#snippet nav()}
			<Button variant="ghost" color="secondary" size="sm">
				<BookOpenIcon size={16} />
				Documentation
			</Button>
			<Button variant="ghost" color="secondary" size="sm">Components</Button>
			<Button variant="ghost" color="secondary" size="sm">Themes</Button>
			<Button variant="ghost" color="secondary" size="sm">Examples</Button>
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
			<SidebarGroup title="Components">
				{#each components as component (component.id)}
					<SidebarItem href={`#${component.id}`}>
						{component.label}
					</SidebarItem>
				{/each}
			</SidebarGroup>
			<SidebarGroup title="Foundations">
				{#each foundations as foundation (foundation.id)}
					<SidebarItem href={`#${foundation.id}`}>
						{foundation.label}
					</SidebarItem>
				{/each}
			</SidebarGroup>
		</Sidebar>

		<main class="content">
			<section id="accordion"><AccordionShowcase /></section>
			<section id="avatar"><AvatarShowcase /></section>
			<section id="badge"><BadgeShowcase /></section>
			<section id="breadcrumbs"><BreadcrumbsShowcase /></section>
			<section id="button"><ButtonShowcase /></section>
			<section id="card"><CardShowcase /></section>
			<section id="checkbox"><CheckboxShowcase /></section>
			<section id="code-block"><CodeBlockShowcase /></section>
			<section id="dialog"><DialogShowcase /></section>
			<section id="drawer"><DrawerShowcase /></section>
			<section id="header"><HeaderShowcase /></section>
			<section id="input"><InputShowcase /></section>
			<section id="select"><SelectShowcase /></section>
			<section id="sidebar"><SidebarShowcase /></section>
			<section id="slider"><SliderShowcase /></section>
			<section id="table"><TableShowcase /></section>
			<section id="tabs"><TabsShowcase /></section>
			<section id="toast"><ToastShowcase /></section>
			<section id="tooltip"><TooltipShowcase /></section>
			<section id="typography"><TypographyShowcase /></section>
			<section id="primitive-tokens"><PrimitiveTokensShowcase /></section>
			<section id="semantic-tokens"><SemanticTokensShowcase /></section>
		</main>
	</div>
</div>

<style>
	.showcase {
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

	.content section {
		scroll-margin-top: calc(var(--header-height) + var(--space-4));
	}
</style>
