<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		children: Snippet;
	}

	let { children, ...restProps }: Props = $props();
</script>

<div class="demo-column" {...restProps}>
	{@render children()}
</div>

<style>
	.demo-column {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
	}
</style>
