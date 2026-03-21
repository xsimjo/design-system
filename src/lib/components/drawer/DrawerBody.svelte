<script lang="ts">
	import { getContext } from 'svelte';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { DRAWER_KEY, type DrawerContext } from './context.js';

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
		children: Snippet;
	}

	let { children, ...restProps }: Props = $props();

	const drawer = getContext<DrawerContext>(DRAWER_KEY);
</script>

<div class="drawer__body" id={drawer.bodyId} {...restProps}>
	{@render children()}
</div>
