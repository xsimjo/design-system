<script lang="ts">
	import type { Snippet } from 'svelte';
	import Button from '$lib/components/button/Button.svelte';
	import Header from '$lib/internal/Header.svelte';
	import Tooltip from '$lib/internal/Tooltip.svelte';
	import DocsSidebar from '$lib/internal/DocsSidebar.svelte';
	import GithubIcon from '$lib/icons/GithubIcon.svelte';
	import MoonIcon from '$lib/icons/MoonIcon.svelte';
	import SunIcon from '$lib/icons/SunIcon.svelte';
	import PaletteIcon from '$lib/icons/PaletteIcon.svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	type Theme = 'light' | 'dark';

	let theme = $state<Theme>('light');

	function toggleTheme() {
		theme = theme === 'light' ? 'dark' : 'light';
		document.documentElement.setAttribute('data-theme', theme);
	}

	const navGroups = [
		{
			title: 'Docs',
			items: [
				{ label: 'Introduction', href: '/docs' },
				{ label: 'Installation', href: '/docs/installation' },
				{ label: 'Usage', href: '/docs/usage' },
				{ label: 'Theming', href: '/docs/theming' }
			]
		},
		{
			title: 'Components',
			items: [
				{ label: 'Button', href: '/docs/button' },
				{ label: 'Spinner', href: '/docs/spinner' }
			]
		}
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
			<Button variant="ghost" color="secondary" size="sm" href="/">Home</Button>
			<Button variant="ghost" color="secondary" size="sm" href="/docs">Documentation</Button>
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
		<aside class="sidebar-container">
			<DocsSidebar groups={navGroups} />
		</aside>

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
		min-height: calc(100vh - var(--header-height));
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
		max-width: 1150px;
		margin: 0 auto;
		padding: var(--space-8);
		display: flex;
		flex-direction: column;
		gap: var(--space-6);
	}
</style>
