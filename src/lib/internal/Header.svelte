<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		sticky?: boolean;
		fixed?: boolean;
		logo?: Snippet;
		nav?: Snippet;
		actions?: Snippet;
	}

	let { sticky = true, fixed = false, logo, nav, actions }: Props = $props();
</script>

<header class="header" class:header--sticky={sticky && !fixed} class:header--fixed={fixed}>
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
</header>

<style>
	.header {
		top: 0;
		width: 100%;
		height: var(--header-height);
		background-color: var(--color-bg-elevated);
		z-index: var(--z-sticky);
		padding: 0 var(--spacing-lg);
		transition: var(--transition-base);
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
