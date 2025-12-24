<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="tabs__list" role="tablist">
	{@render children()}
</div>

<style>
	.tabs__list {
		display: flex;
		gap: var(--tabs-list-gap);
		padding: var(--tabs-list-padding);
		background: var(--tabs-list-bg);
		border-bottom: var(--tabs-list-border-width) solid var(--tabs-list-border);
	}
</style>
