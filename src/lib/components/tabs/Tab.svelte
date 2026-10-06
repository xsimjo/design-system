<script lang="ts">
	import './tabs.css';
	import { getContext } from 'svelte';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';
	import { TABS_KEY } from './context.ts';
	import type { TabsContext } from './context.ts';

	interface Props extends Omit<HTMLButtonAttributes & HTMLAnchorAttributes, 'children'> {
		value: string;
		/** The page this tab opens. Used when the parent `Tabs` has `navigation`. */
		href?: string;
		children: Snippet;
	}

	let { value, href, disabled = false, children, ...restProps }: Props = $props();

	const tabs = getContext<TabsContext>(TABS_KEY);

	const isActive = $derived(tabs.activeValue() === value);
	const size = $derived(tabs.size());
	const tabId = $derived(tabs.getTabId(value));
	const panelId = $derived(tabs.getPanelId(value));

	function handleClick() {
		if (!disabled) tabs.select(value);
	}
</script>

{#if tabs.navigation()}
	<!-- A disabled link has no href, so it cannot be followed or focused. -->
	<a
		class="tabs__tab tabs__tab--{size}"
		class:tabs__tab--active={isActive}
		href={disabled ? undefined : href}
		aria-current={isActive ? 'page' : undefined}
		aria-disabled={disabled || undefined}
		{...restProps}
	>
		{@render children()}
	</a>
{:else}
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
{/if}
