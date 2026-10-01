<script lang="ts">
	import SiteHeader from '$internal/SiteHeader.svelte';
	import Toaster from '$lib/components/toast/Toaster.svelte';
	import type { ToastPosition } from '$lib/components/toast/toast.svelte.js';
	import FormSection from './sections/FormSection.svelte';
	import DataDisplaySection from './sections/DataDisplaySection.svelte';
	import FeedbackSection from './sections/FeedbackSection.svelte';
	import OverlaySection from './sections/OverlaySection.svelte';
	import NavigationSection from './sections/NavigationSection.svelte';

	const categories = [
		{ id: 'form', label: 'Form' },
		{ id: 'data-display', label: 'Data Display' },
		{ id: 'feedback', label: 'Feedback' },
		{ id: 'overlay', label: 'Overlay' },
		{ id: 'navigation', label: 'Navigation' }
	];

	let toastPosition = $state<ToastPosition>('bottom-right');
	let showBorder = $state(false);
	let showProgress = $state(true);
</script>

<svelte:head>
	<title>Showcase - Greenfield UI</title>
</svelte:head>

<Toaster position={toastPosition} {showBorder} {showProgress} />

<div class="showcase">
	<SiteHeader />

	<nav class="category-nav">
		<div class="category-nav-inner">
			{#each categories as cat (cat.id)}
				<a href="#{cat.id}" class="category-link">{cat.label}</a>
			{/each}
		</div>
	</nav>

	<main class="content">
		<div class="page-header">
			<h1 class="page-title">Component Showcase</h1>
			<p class="page-description">
				All components in one page. Every demo is live and interactive.
			</p>
		</div>

		<FormSection />
		<DataDisplaySection />
		<FeedbackSection bind:toastPosition bind:showBorder bind:showProgress />
		<OverlaySection />
		<NavigationSection />
	</main>
</div>

<style>
	.showcase {
		min-height: 100vh;
		background-color: var(--ui-surface);
		display: flex;
		flex-direction: column;
	}

	.category-nav {
		position: sticky;
		top: var(--header-height);
		z-index: var(--z-sticky, 10);
		background-color: var(--ui-surface);
		border-bottom: 1px solid var(--ui-border);
	}

	.category-nav-inner {
		max-width: 1500px;
		margin: 0 auto;
		padding: 0 var(--space-8);
		display: flex;
		gap: var(--space-1);
		overflow-x: auto;
	}

	.category-link {
		padding: var(--space-3) var(--space-4);
		font-size: var(--ui-text-sm);
		font-weight: var(--ui-weight-medium);
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 35%);
		text-decoration: none;
		white-space: nowrap;
		border-bottom: 2px solid transparent;
		transition:
			color var(--ui-base-duration) var(--ui-base-easing),
			border-color var(--ui-base-duration) var(--ui-base-easing);
	}

	.category-link:hover {
		color: var(--ui-surface-foreground);
		border-bottom-color: var(--ui-primary);
	}

	.content {
		max-width: 1500px;
		margin: 0 auto;
		width: 100%;
		padding: var(--space-8);
		display: flex;
		flex-direction: column;
		gap: var(--space-12);
	}

	.page-header {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.page-title {
		font-size: var(--ui-text-3xl);
		font-weight: var(--ui-weight-bold);
		color: var(--ui-surface-foreground);
		margin: 0;
	}

	.page-description {
		font-size: var(--ui-text-base);
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 35%);
		margin: 0;
	}

	@media (max-width: 768px) {
		.content {
			padding: var(--space-4);
		}

		.category-nav-inner {
			padding: 0 var(--space-4);
		}
	}
</style>
