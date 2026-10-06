<script lang="ts">
	import './tabs.css';
	import { setContext } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';
	import { TABS_KEY } from './context.ts';
	import type { TabsContext } from './context.ts';

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'onchange'> {
		value?: string;
		variant?: 'underline' | 'pills' | 'enclosed';
		size?: 'sm' | 'md' | 'lg';
		fullWidth?: boolean;
		/** Tabs are links to pages: the list is a `<nav>`, each `Tab` takes `href`, and there are no panels. */
		navigation?: boolean;
		onchange?: (value: string) => void;
		children: Snippet;
	}

	let {
		value = $bindable(''),
		variant = 'underline',
		size = 'md',
		fullWidth = false,
		navigation = false,
		onchange,
		children,
		...restProps
	}: Props = $props();

	const uid = Math.random().toString(36).slice(2, 9);

	function getTabId(val: string): string {
		return `tabs-${uid}-tab-${val}`;
	}

	function getPanelId(val: string): string {
		return `tabs-${uid}-panel-${val}`;
	}

	function select(val: string) {
		value = val;
		onchange?.(val);
	}

	setContext<TabsContext>(TABS_KEY, {
		activeValue: () => value,
		select,
		variant: () => variant,
		size: () => size,
		fullWidth: () => fullWidth,
		navigation: () => navigation,
		getTabId,
		getPanelId
	});
</script>

<div class="tabs tabs--{variant}" class:tabs--full-width={fullWidth} {...restProps}>
	{@render children()}
</div>
