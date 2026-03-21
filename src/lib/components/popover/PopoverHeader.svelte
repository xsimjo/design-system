<script lang="ts">
	import './popover.css';
	import XIcon from '$lib/icons/XIcon.svelte';
	import Button from '$lib/components/button/Button.svelte';
	import { getContext } from 'svelte';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { POPOVER_KEY, type PopoverContext } from './context.js';

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
		showClose?: boolean;
		children: Snippet;
	}

	let { showClose = true, children, ...restProps }: Props = $props();

	const popover = getContext<PopoverContext | undefined>(POPOVER_KEY);
</script>

<div class="popover__header" {...restProps}>
	<span class="popover__title">{@render children()}</span>
	{#if showClose && popover}
		<Button
			variant="ghost"
			color="neutral"
			size="sm"
			isIcon
			aria-label="Close popover"
			onclick={popover.close}
			type="button"
		>
			<XIcon size={14} />
		</Button>
	{/if}
</div>
