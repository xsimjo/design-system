<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		label: string;
		children: Snippet;
	}

	let { label, children }: Props = $props();
</script>

<div class="demo-group">
	<h4 class="demo-label">{label}</h4>
	{@render children()}
</div>

<style>
	.demo-group {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
	}

	.demo-label {
		font-size: var(--ui-text-sm);
		font-weight: var(--ui-weight-medium);
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 30%);
		margin: 0;
	}
</style>
