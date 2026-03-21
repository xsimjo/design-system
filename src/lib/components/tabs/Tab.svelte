<script lang="ts">
	import { getContext } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';
	import { TABS_KEY } from './context.ts';
	import type { TabsContext } from './context.ts';

	interface Props extends Omit<HTMLButtonAttributes, 'children'> {
		value: string;
		children: Snippet;
	}

	let { value, disabled = false, children, ...restProps }: Props = $props();

	const tabs = getContext<TabsContext>(TABS_KEY);

	const isActive = $derived(tabs.activeValue() === value);
	const size = $derived(tabs.size());
	const tabId = $derived(tabs.getTabId(value));
	const panelId = $derived(tabs.getPanelId(value));

	function handleClick() {
		if (!disabled) tabs.select(value);
	}
</script>

<button
	id={tabId}
	class="tabs__tab tabs__tab--{size}"
	class:tabs__tab--active={isActive}
	role="tab"
	aria-selected={isActive}
	aria-controls={panelId}
	tabindex={isActive ? 0 : -1}
	{disabled}
	onclick={handleClick}
	type="button"
	{...restProps}
>
	{@render children()}
</button>
