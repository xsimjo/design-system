<script lang="ts">
	import './side-nav.css';
	import { getContext } from 'svelte';
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
	import { SIDE_NAV_KEY } from './context.ts';
	import type { SideNavContext } from './context.ts';

	interface Props extends Omit<HTMLAnchorAttributes & HTMLButtonAttributes, 'children'> {
		isActive?: boolean;
		icon?: Snippet;
		badge?: Snippet;
		disabled?: boolean;
		children: Snippet;
	}

	let {
		isActive = false,
		icon,
		badge,
		disabled = false,
		'aria-label': ariaLabel,
		children,
		...restProps
	}: Props = $props();

	const sideNav = getContext<SideNavContext>(SIDE_NAV_KEY);
	const isCollapsed = $derived(sideNav.collapsed());
	const depth = $derived(sideNav.depth());
	const hasHref = $derived('href' in restProps && typeof restProps.href === 'string');
</script>

{#snippet content()}
	{#if icon}
		<span class="side-nav-item__icon" aria-hidden="true">
			{@render icon()}
		</span>
	{/if}
	{#if !isCollapsed}
		<span class="side-nav-item__label">
			{@render children()}
		</span>
		{#if badge}
			<span class="side-nav-item__badge">
				{@render badge()}
			</span>
		{/if}
	{/if}
{/snippet}

{#if hasHref}
	<a
		class="side-nav-item"
		class:side-nav-item--active={isActive}
		class:side-nav-item--disabled={disabled}
		style:--side-nav-item-depth={depth}
		aria-current={isActive ? 'page' : undefined}
		aria-disabled={disabled || undefined}
		tabindex={disabled ? -1 : undefined}
		aria-label={isCollapsed ? ariaLabel : undefined}
		{...restProps}
		href={disabled ? undefined : restProps.href}
	>
		{@render content()}
	</a>
{:else}
	<button
		type="button"
		class="side-nav-item"
		class:side-nav-item--active={isActive}
		class:side-nav-item--disabled={disabled}
		style:--side-nav-item-depth={depth}
		aria-current={isActive ? 'page' : undefined}
		aria-disabled={disabled || undefined}
		{disabled}
		aria-label={isCollapsed ? ariaLabel : undefined}
		{...restProps}
	>
		{@render content()}
	</button>
{/if}
