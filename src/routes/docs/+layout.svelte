<script lang="ts">
	import type { Snippet } from 'svelte';
	import Button from '$lib/components/button/Button.svelte';
	import { base } from '$app/paths';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	type Theme = 'light' | 'dark' | 'dev';
	const themes: Theme[] = ['light', 'dark', 'dev'];

	let theme = $state<Theme>('light');

	function nextTheme() {
		const currentIndex = themes.indexOf(theme);
		theme = themes[(currentIndex + 1) % themes.length];
		document.documentElement.setAttribute('data-theme', theme);
	}

	function getThemeLabel(t: Theme): string {
		return t.charAt(0).toUpperCase() + t.slice(1);
	}

	const components = [
		{ name: 'Card', href: '/docs/card' },
		{ name: 'Button', href: '/docs/button' },
		{ name: 'Header', href: '/docs/header' },
		{ name: 'Avatar', href: '/docs/avatar' },
		{ name: 'Tooltip', href: '/docs/tooltip' }
	];
</script>

<div class="docs-layout">
	<aside class="sidebar">
		<div class="sidebar-header">
			<a href="{base}/" class="logo">Design System</a>
		</div>
		<nav class="sidebar-nav">
			<div class="nav-section">
				<h3 class="nav-title">Components</h3>
				<ul class="nav-list">
					{#each components as component (component.name)}
						<li>
							<a href="{base}{component.href}" class="nav-link">{component.name}</a>
						</li>
					{/each}
				</ul>
			</div>
		</nav>
	</aside>

	<div class="docs-main">
		<header class="docs-header">
			<Button variant="secondary" size="sm" onclick={nextTheme}>
				Theme: {getThemeLabel(theme)}
			</Button>
		</header>
		<main class="docs-content">
			{@render children()}
		</main>
	</div>
</div>

<style>
	.docs-layout {
		display: flex;
		min-height: 100vh;
		background-color: var(--page-bg);
	}

	.sidebar {
		width: 250px;
		background-color: var(--card-bg);
		border-right: 1px solid var(--card-border);
		display: flex;
		flex-direction: column;
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		overflow-y: auto;
	}

	.sidebar-header {
		padding: var(--space-4) var(--space-5);
		border-bottom: 1px solid var(--card-border);
	}

	.logo {
		font-size: var(--font-size-lg);
		font-weight: var(--font-weight-bold);
		color: var(--section-title);
		text-decoration: none;
	}

	.logo:hover {
		color: var(--button-primary-bg);
	}

	.sidebar-nav {
		padding: var(--space-4) 0;
	}

	.nav-section {
		padding: 0 var(--space-4);
	}

	.nav-title {
		margin: 0 0 var(--space-2) 0;
		padding: 0 var(--space-2);
		font-size: var(--font-size-xs);
		font-weight: var(--font-weight-semibold);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--section-label);
	}

	.nav-list {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.nav-link {
		display: block;
		padding: var(--space-2);
		border-radius: var(--radius-md);
		font-size: var(--font-size-sm);
		color: var(--page-text);
		text-decoration: none;
		transition: var(--transition-fast);
	}

	.nav-link:hover {
		background-color: var(--page-bg);
		color: var(--section-title);
	}

	.docs-main {
		flex: 1;
		margin-left: 250px;
		display: flex;
		flex-direction: column;
	}

	.docs-header {
		display: flex;
		justify-content: flex-end;
		padding: var(--space-4) var(--space-6);
		border-bottom: 1px solid var(--card-border);
		background-color: var(--card-bg);
	}

	.docs-content {
		padding: var(--space-8);
		max-width: 800px;
	}
</style>
