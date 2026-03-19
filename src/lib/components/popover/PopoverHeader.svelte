<script lang="ts">
	import './popover.css';
	import XIcon from '$lib/icons/XIcon.svelte';
	import Button from '$lib/components/button/Button.svelte';
	import { getContext } from 'svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		showClose?: boolean;
		children: Snippet;
	}

	let { showClose = true, children }: Props = $props();

	const popover = getContext<{ close: () => void } | undefined>('popover');
</script>

<div class="popover__header">
	<span class="popover__title">{@render children()}</span>
	{#if showClose && popover}
		<Button
			variant="ghost"
			color="neutral"
			size="sm"
			icon
			aria-label="Close popover"
			onclick={popover.close}
			type="button"
		>
			<XIcon size={14} />
		</Button>
	{/if}
</div>
