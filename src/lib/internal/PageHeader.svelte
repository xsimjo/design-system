<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		title: string;
		description?: string;
		isBordered?: boolean;
		children?: Snippet;
	}

	let { title, description, isBordered = false, children }: Props = $props();
</script>

<header class="page-header" class:page-header--bordered={isBordered}>
	<h1>{title}</h1>
	{#if description}
		<p class="lead">{description}</p>
	{:else if children}
		{@render children()}
	{/if}
</header>

<style>
	.page-header {
		margin-bottom: var(--space-8);
	}

	.page-header--bordered {
		border-bottom: 1px solid var(--ui-border);
		padding-bottom: var(--space-6);
	}

	h1 {
		font-size: var(--font-size-3xl);
		font-weight: var(--ui-weight-bold);
		color: var(--ui-surface-foreground);
		margin: 0 0 var(--space-3) 0;
	}

	.lead,
	.page-header :global(.lead) {
		font-size: var(--ui-text-lg);
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 40%);
		line-height: var(--line-height-relaxed);
		margin: 0;
	}

	.page-header :global(.lead code),
	.page-header :global(.lead kbd) {
		font-family: var(--ui-font-mono);
		font-size: var(--font-size-xs);
		background: color-mix(in oklch, var(--ui-neutral), transparent 85%);
		padding: 2px 6px;
		border-radius: calc(var(--ui-base-radius) * 0.5);
	}
</style>
