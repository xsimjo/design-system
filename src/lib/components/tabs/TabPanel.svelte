<script lang="ts">
	import type { Snippet } from 'svelte';
	import { getTabsContext } from './tabs.svelte.ts';

	interface Props {
		id: string;
		children: Snippet;
	}

	let { id, children }: Props = $props();

	const ctx = getTabsContext();

	let isActive = $derived(ctx.value === id);
</script>

<div
	id="panel-{id}"
	class="tabs__panel"
	class:tabs__panel--active={isActive}
	role="tabpanel"
	aria-labelledby="tab-{id}"
	hidden={!isActive}
>
	{@render children()}
</div>

<style>
	.tabs__panel {
		padding: var(--tabs-panel-padding-y) var(--tabs-panel-padding-x);
		background: var(--tabs-panel-bg);
		border: var(--tabs-panel-border-width) solid var(--tabs-panel-border);
		border-radius: var(--tabs-panel-border-radius);
		color: var(--tabs-panel-text);
	}

	.tabs__panel[hidden] {
		display: none;
	}
</style>
