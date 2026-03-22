<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		id?: string;
		title: string;
		description?: string;
		children: Snippet;
	}

	let { id, title, description, children }: Props = $props();
</script>

<div {id} class="example-block">
	<h3>{title}</h3>
	{#if description}
		<p class="example-desc">{description}</p>
	{/if}
	{@render children()}
</div>

<style>
	.example-block {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
		margin-bottom: var(--space-8);
		scroll-margin-top: var(--space-4);
	}

	.example-block h3 {
		font-size: var(--ui-text-lg);
		font-weight: 600;
		color: var(--ui-surface-foreground);
		margin: 0;
	}

	.example-desc {
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 40%);
		margin: 0;
	}

	.example-desc :global(code),
	.example-desc :global(kbd),
	.example-block :global(.example-desc code),
	.example-block :global(.example-desc kbd) {
		font-family: var(--ui-font-mono);
		font-size: var(--font-size-xs);
		background: color-mix(in oklch, var(--ui-neutral), transparent 85%);
		padding: 2px 6px;
		border-radius: calc(var(--ui-base-radius) * 0.5);
	}

	.example-block :global(.example-desc) {
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 40%);
		margin: 0;
	}

	.example-block :global(.controlled-example) {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
	}

	.example-block :global(.controlled-label) {
		font-size: var(--ui-text-sm);
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 30%);
		margin: 0 0 var(--space-3) 0;
	}

	.example-block :global(.controlled-label code) {
		font-family: var(--ui-font-mono);
		font-size: var(--font-size-xs);
		background: color-mix(in oklch, var(--ui-neutral), transparent 85%);
		padding: 2px 6px;
		border-radius: calc(var(--ui-base-radius) * 0.5);
	}
</style>
