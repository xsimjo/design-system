<script lang="ts">
	import { getContext } from 'svelte';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { DRAWER_KEY, type DrawerContext } from './context.js';
	import XIcon from '$lib/icons/XIcon.svelte';

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
		title?: string;
		children?: Snippet;
	}

	let { title, children, ...restProps }: Props = $props();

	const drawer = getContext<DrawerContext>(DRAWER_KEY);
</script>

<div class="drawer__header" {...restProps}>
	{#if children}
		{@render children()}
	{:else if title}
		<h2 class="drawer__title" id={drawer.titleId}>{title}</h2>
	{/if}
	<button class="drawer__close" onclick={() => drawer.close()} aria-label="Close drawer">
		<XIcon size={16} />
	</button>
</div>
