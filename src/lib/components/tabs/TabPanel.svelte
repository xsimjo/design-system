<script lang="ts">
	import './tabs.css';
	import { getContext } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';
	import { TABS_KEY } from './context.ts';
	import type { TabsContext } from './context.ts';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		value: string;
		children: Snippet;
	}

	let { value, children, ...restProps }: Props = $props();

	const tabs = getContext<TabsContext>(TABS_KEY);

	const isActive = $derived(tabs.activeValue() === value);
	const panelId = $derived(tabs.getPanelId(value));
	const tabId = $derived(tabs.getTabId(value));
</script>

{#if isActive}
	<div
		id={panelId}
		class="tabs__panel"
		role="tabpanel"
		aria-labelledby={tabId}
		tabindex={0}
		{...restProps}
	>
		{@render children()}
	</div>
{/if}
