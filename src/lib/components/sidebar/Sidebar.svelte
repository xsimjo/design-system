<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import PanelLeftCloseIcon from '$lib/icons/PanelLeftCloseIcon.svelte';
	import PanelLeftOpenIcon from '$lib/icons/PanelLeftOpenIcon.svelte';

	interface Props extends HTMLAttributes<HTMLElement> {
		collapsed?: boolean;
		collapsible?: boolean;
		showToggle?: boolean;
		header?: Snippet;
		children: Snippet;
		footer?: Snippet;
		onCollapsedChange?: (collapsed: boolean) => void;
	}

	let {
		collapsed = $bindable(false),
		collapsible = true,
		showToggle = true,
		header,
		children,
		footer,
		onCollapsedChange,
		...restProps
	}: Props = $props();

	function handleToggle() {
		collapsed = !collapsed;
		onCollapsedChange?.(collapsed);
	}
</script>

<aside
	class="sidebar"
	class:sidebar--collapsed={collapsed}
	aria-label="Sidebar navigation"
	{...restProps}
>
	{#if header}
		<div class="sidebar__header">
			{@render header()}
		</div>
	{/if}

	<nav class="sidebar__content">
		{@render children()}
	</nav>

	{#if footer}
		<div class="sidebar__footer">
			{@render footer()}
		</div>
	{/if}

	{#if collapsible && showToggle}
		<button
			type="button"
			class="sidebar__toggle"
			onclick={handleToggle}
			aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
			aria-expanded={!collapsed}
		>
			{#if collapsed}
				<PanelLeftOpenIcon size="var(--sidebar-toggle-icon-size)" />
			{:else}
				<PanelLeftCloseIcon size="var(--sidebar-toggle-icon-size)" />
			{/if}
		</button>
	{/if}
</aside>

<style>
	.sidebar {
		display: flex;
		flex-direction: column;
		width: var(--sidebar-width-expanded);
		height: 100%;
		background-color: var(--sidebar-bg);
		border-right: var(--sidebar-border-width) solid var(--sidebar-border);
		box-shadow: var(--sidebar-shadow);
		position: relative;
		transition: width var(--sidebar-transition);
		overflow: hidden;
	}

	.sidebar--collapsed {
		width: var(--sidebar-width-collapsed);
	}

	.sidebar__header {
		display: flex;
		align-items: center;
		gap: var(--sidebar-header-gap);
		padding: var(--sidebar-header-padding-y) var(--sidebar-header-padding-x);
		border-bottom: var(--sidebar-header-border-width) solid var(--sidebar-header-border);
		flex-shrink: 0;
	}

	.sidebar__content {
		display: flex;
		flex-direction: column;
		gap: var(--sidebar-content-gap);
		padding: var(--sidebar-content-padding-y) var(--sidebar-content-padding-x);
		flex: 1;
		overflow-y: auto;
		overflow-x: hidden;
	}

	.sidebar__footer {
		display: flex;
		flex-direction: column;
		gap: var(--sidebar-content-gap);
		padding: var(--sidebar-footer-padding-y) var(--sidebar-footer-padding-x);
		border-top: var(--sidebar-footer-border-width) solid var(--sidebar-footer-border);
		flex-shrink: 0;
	}

	.sidebar__toggle {
		position: absolute;
		bottom: var(--sidebar-footer-padding-y);
		right: var(--sidebar-content-padding-x);
		display: flex;
		align-items: center;
		justify-content: center;
		width: var(--sidebar-toggle-size);
		height: var(--sidebar-toggle-size);
		padding: 0;
		background-color: var(--sidebar-toggle-bg);
		color: var(--sidebar-toggle-color);
		border: none;
		border-radius: var(--sidebar-toggle-border-radius);
		cursor: var(--sidebar-cursor-default);
		transition: all var(--sidebar-transition);
	}

	.sidebar__toggle:hover {
		background-color: var(--sidebar-toggle-bg-hover);
		color: var(--sidebar-toggle-color-hover);
	}

	.sidebar__toggle:focus-visible {
		outline: none;
		box-shadow:
			0 0 0 var(--sidebar-focus-ring-offset) var(--sidebar-bg),
			0 0 0 calc(var(--sidebar-focus-ring-offset) + var(--sidebar-focus-ring-width))
				var(--sidebar-focus-ring-color);
	}

	.sidebar--collapsed .sidebar__toggle {
		right: 50%;
		transform: translateX(50%);
	}
</style>
