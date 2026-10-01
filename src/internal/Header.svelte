<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		sticky?: boolean;
		fixed?: boolean;
		maxWidth?: string;
		logo?: Snippet;
		nav?: Snippet;
		actions?: Snippet;
		hamburger?: Snippet;
	}

	let { sticky = true, fixed = false, maxWidth, logo, nav, actions, hamburger }: Props = $props();
</script>

<header class="header" class:header--sticky={sticky && !fixed} class:header--fixed={fixed}>
	<div class="header-inner" style:max-width={maxWidth}>
		{#if hamburger}
			<div class="header-hamburger">
				{@render hamburger()}
			</div>
		{/if}

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
		background-color: var(--ui-surface);
		border-bottom: 1px solid var(--ui-border);
		z-index: var(--z-sticky);
	}

	.header-inner {
		width: 100%;
		height: 100%;
		margin: 0 auto;
		padding: 0 var(--space-8) 0 var(--space-6);
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-6);
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
		gap: var(--space-2);
		height: 32px;
	}

	.header-logo :global(img) {
		height: 100%;
		width: auto;
	}

	.header-nav {
		display: flex;
		align-items: center;
		gap: var(--space-2);
	}

	.header-actions {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		margin-left: auto;
	}

	.header-hamburger {
		display: none;
	}

	@media (max-width: 768px) {
		.header-hamburger {
			display: flex;
			align-items: center;
		}

		.header-nav {
			display: none;
		}

		.header-inner {
			padding: 0 var(--space-4);
		}
	}
</style>
