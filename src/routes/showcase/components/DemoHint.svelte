<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<p class="demo-hint">
	{@render children()}
</p>

<style>
	.demo-hint {
		font-size: var(--ui-text-sm);
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 35%);
		margin: 0;
	}

	.demo-hint :global(strong) {
		color: var(--ui-primary);
		font-weight: var(--ui-weight-semibold);
	}
</style>
