<script lang="ts">
	import './side-nav.css';
	import { setContext } from 'svelte';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { SIDE_NAV_KEY } from './context.ts';
	import type { SideNavContext } from './context.ts';

	interface Props extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
		collapsed?: boolean;
		children: Snippet;
	}

	let { collapsed = false, children, ...restProps }: Props = $props();

	setContext<SideNavContext>(SIDE_NAV_KEY, {
		collapsed: () => collapsed,
		depth: () => 0
	});
</script>

<nav class="side-nav" class:side-nav--collapsed={collapsed} {...restProps}>
	{@render children()}
</nav>
