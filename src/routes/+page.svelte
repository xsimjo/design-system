<script lang="ts">
	import Button from '$lib/components/button/Button.svelte';
	import Header from '$lib/components/header/Header.svelte';
	import DocsSidebar from '$lib/internal/DocsSidebar.svelte';
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

	function toggleTheme() {
		theme = theme === 'light' ? 'dark' : 'light';
		document.documentElement.setAttribute('data-theme', theme);
	}

	const navGroups = [
		{
			title: 'Components',
			items: [
				{ label: 'Accordion', href: '#accordion' },
				{ label: 'Avatar', href: '#avatar' },
				{ label: 'Badge', href: '#badge' },
				{ label: 'Breadcrumbs', href: '#breadcrumbs' },
				{ label: 'Button', href: '#button' },
				{ label: 'Card', href: '#card' },
				{ label: 'Checkbox', href: '#checkbox' },
				{ label: 'Code Block', href: '#code-block' },
				{ label: 'Dialog', href: '#dialog' },
				{ label: 'Drawer', href: '#drawer' },
				{ label: 'Header', href: '#header' },
				{ label: 'Input', href: '#input' },
				{ label: 'Select', href: '#select' },
				{ label: 'Slider', href: '#slider' },
				{ label: 'Table', href: '#table' },
				{ label: 'Tabs', href: '#tabs' },
				{ label: 'Toast', href: '#toast' },
				{ label: 'Tooltip', href: '#tooltip' }
			]
		},
		{
			title: 'Foundations',
			items: [
				{ label: 'Typography', href: '#typography' },
				{ label: 'Primitive Tokens', href: '#primitive-tokens' },
				{ label: 'Semantic Tokens', href: '#semantic-tokens' }
			]
		}
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
		<aside class="sidebar-container">
			<DocsSidebar groups={navGroups} />
		</aside>

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

	.sidebar-container {
		position: sticky;
		top: var(--header-height);
		height: calc(100vh - var(--header-height));
		overflow-y: auto;
		flex-shrink: 0;
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
