<script lang="ts">
	import './side-nav.css';
	import { getContext, setContext } from 'svelte';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import ChevronDownIcon from '$lib/icons/ChevronDownIcon.svelte';
	import { SIDE_NAV_KEY } from './context.ts';
	import type { SideNavContext } from './context.ts';

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'ontoggle'> {
		label: string;
		icon?: Snippet;
		open?: boolean;
		hasRail?: boolean;
		ontoggle?: (open: boolean) => void;
		disabled?: boolean;
		children: Snippet;
	}

	let {
		label,
		icon,
		open = $bindable(true),
		hasRail = true,
		ontoggle,
		disabled = false,
		children,
		...restProps
	}: Props = $props();

	const sideNav = getContext<SideNavContext>(SIDE_NAV_KEY);
	const isCollapsed = $derived(sideNav.collapsed());
	const depth = $derived(sideNav.depth());

	const panelId = `side-nav-group-panel-${Math.random().toString(36).slice(2, 9)}`;
	const triggerId = `side-nav-group-trigger-${Math.random().toString(36).slice(2, 9)}`;

	setContext<SideNavContext>(SIDE_NAV_KEY, {
		collapsed: () => sideNav.collapsed(),
		depth: () => sideNav.depth() + 1
	});

	function handleClick() {
		if (disabled) return;
		open = !open;
		ontoggle?.(open);
	}
</script>

<div class="side-nav-group" class:side-nav-group--open={open} {...restProps}>
	<button
		id={triggerId}
		type="button"
		class="side-nav-group__trigger"
		style:--side-nav-group-depth={depth}
		aria-expanded={open}
		aria-controls={panelId}
		aria-label={isCollapsed ? label : undefined}
		{disabled}
		onclick={handleClick}
	>
		{#if icon}
			<span class="side-nav-group__trigger-icon" aria-hidden="true">
				{@render icon()}
			</span>
		{/if}
		{#if !isCollapsed}
			<span class="side-nav-group__trigger-label">
				{label}
			</span>
			<span class="side-nav-group__trigger-chevron" aria-hidden="true">
				<ChevronDownIcon size={16} />
			</span>
		{/if}
	</button>

	<div id={panelId} class="side-nav-group__panel" role="group" aria-labelledby={triggerId}>
		<div class="side-nav-group__panel-inner">
			<div class="side-nav-group__children" class:side-nav-group__children--no-rail={!hasRail}>
				{@render children()}
			</div>
		</div>
	</div>
</div>
