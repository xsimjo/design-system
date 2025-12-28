<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		sticky?: boolean;
		fixed?: boolean;
		maxWidth?: string;
		logo?: Snippet;
		nav?: Snippet;
		actions?: Snippet;
	}

	let { sticky = true, fixed = false, maxWidth, logo, nav, actions }: Props = $props();
</script>

<header class="header" class:header--sticky={sticky && !fixed} class:header--fixed={fixed}>
	<div class="header-inner" style:max-width={maxWidth}>
		{#if logo}
			<div class="header-logo">
				{@render logo()}
			</div>
		{/if}

		{#if nav}
			<nav class="header-nav">
				{@render nav()}
			</nav>
		{/if}

		{#if actions}
			<div class="header-actions">
				{@render actions()}
			</div>
		{/if}
	</div>
</header>

<style>
	.header {
		top: 0;
		width: 100%;
		height: var(--header-height);
		background-color: var(--color-bg-elevated);
		z-index: var(--z-sticky);
		transition: var(--transition-base);
	}

	.header-inner {
		width: 100%;
		height: 100%;
		margin: 0 auto;
		padding: 0 var(--space-8) 0 var(--space-6);
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--spacing-lg);
	}

	.header--sticky {
		position: sticky;
	}

	.header--fixed {
		position: fixed;
	}

	.header-logo {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		height: 32px;
	}

	.header-logo :global(img) {
		height: 100%;
		width: auto;
	}

	.header-nav {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
	}

	.header-actions {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		margin-left: auto;
	}
</style>
