<script lang="ts">
	import './side-nav.css';
	import { getContext } from 'svelte';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { SIDE_NAV_KEY } from './context.ts';
	import type { SideNavContext } from './context.ts';

	interface Props extends Omit<HTMLAttributes<HTMLParagraphElement>, 'children'> {
		children: Snippet;
	}

	let { children, ...restProps }: Props = $props();

	const sideNav = getContext<SideNavContext>(SIDE_NAV_KEY);
	const isCollapsed = $derived(sideNav.collapsed());
</script>

{#if !isCollapsed}
	<p class="side-nav-label" {...restProps}>
		{@render children()}
	</p>
{/if}
