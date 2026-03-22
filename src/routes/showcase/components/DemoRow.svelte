<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		isAligned?: boolean;
		children: Snippet;
	}

	let { isAligned = false, children, ...restProps }: Props = $props();
</script>

<div class="demo-row" class:demo-row--aligned={isAligned} {...restProps}>
	{@render children()}
</div>

<style>
	.demo-row {
		display: flex;
		gap: var(--space-3);
		flex-wrap: wrap;
	}

	.demo-row--aligned {
		align-items: center;
	}
</style>
