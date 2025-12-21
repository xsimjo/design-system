<script lang="ts">
	import Button from '$lib/components/button/Button.svelte';
	import Header from '$lib/components/header/Header.svelte';
	import Sidebar from '$lib/components/sidebar/Sidebar.svelte';
	import SidebarItem from '$lib/components/sidebar/SidebarItem.svelte';
	import SidebarGroup from '$lib/components/sidebar/SidebarGroup.svelte';
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
	} from './_showcase';

	type Theme = 'light' | 'dark' | 'dev';
	const themes: Theme[] = ['light', 'dark', 'dev'];

	let theme = $state<Theme>('light');
	let sidebarCollapsed = $state(false);

	function nextTheme() {
		const currentIndex = themes.indexOf(theme);
		theme = themes[(currentIndex + 1) % themes.length];
		document.documentElement.setAttribute('data-theme', theme);
	}

	function getThemeLabel(t: Theme): string {
		return t.charAt(0).toUpperCase() + t.slice(1);
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
	<title>Design System Showcase</title>
</svelte:head>

<div class="showcase">
	<Header sticky>
		{#snippet logo()}
			<span class="header-title">Design System</span>
		{/snippet}
		{#snippet actions()}
			<Button variant="outline" color="secondary" size="sm" onclick={nextTheme}>
				Theme: {getThemeLabel(theme)}
			</Button>
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

	.header-title {
		font-size: var(--font-size-xl);
		font-weight: var(--font-weight-semibold);
		color: var(--header-text);
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
