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
		background-color: var(--header-bg);
		border-bottom: var(--header-border-width) solid var(--header-border);
		box-shadow: var(--header-shadow);
		z-index: var(--header-z-index);
		padding: var(--header-padding-y) var(--header-padding-x);
		transition: var(--header-transition);
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
		gap: var(--header-logo-gap);
		height: var(--header-logo-height);
	}

	.header-logo :global(img) {
		height: 100%;
		width: auto;
	}

	.header-nav {
		display: flex;
		align-items: center;
		gap: var(--header-nav-gap);
	}

	.header-actions {
		display: flex;
		align-items: center;
		gap: var(--header-actions-gap);
		margin-left: auto;
	}
</style>
