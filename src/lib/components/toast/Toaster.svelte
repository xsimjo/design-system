<script lang="ts">
	import './toaster.css';
	import { computePosition, offset, shift, autoUpdate } from '@floating-ui/dom';
	import type { Placement } from '@floating-ui/dom';
	import { toast, type ToastPosition } from './toast.svelte.js';
	import type { HTMLAttributes } from 'svelte/elements';
	import ToastItem from './Toast.svelte';

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
		position?: ToastPosition;
		/** Gap between the toast container and the viewport edge in px. */
		margin?: number;
		/** Accessible label for the notification region. */
		ariaLabel?: string;
		/** Show a colored left accent border on each toast. */
		showBorder?: boolean;
		/** Show a countdown progress bar at the bottom of each timed toast. */
		showProgress?: boolean;
	}

	let {
		position = 'bottom-right',
		margin = 16,
		ariaLabel = 'Notifications',
		showBorder = false,
		showProgress = true,
		...restProps
	}: Props = $props();

	let anchorEl: HTMLElement | null = $state(null);
	let containerEl: HTMLElement | null = $state(null);

	const floatingPlacement = $derived.by<Placement>(() => {
		const isBottom = position.startsWith('bottom');
		const isRight = position.endsWith('right');
		const isCenter = position.endsWith('center');
		const side = isBottom ? 'top' : 'bottom';
		const align = isRight ? 'end' : isCenter ? '' : 'start';
		return (align ? `${side}-${align}` : side) as Placement;
	});

	$effect(() => {
		const anchor = anchorEl;
		const container = containerEl;
		if (!anchor || !container) return;

		const cleanup = autoUpdate(anchor, container, async () => {
			const a = anchorEl;
			const c = containerEl;
			if (!a || !c) return;

			const { x, y } = await computePosition(a, c, {
				placement: floatingPlacement,
				strategy: 'fixed',
				middleware: [offset(margin), shift({ padding: margin })]
			});

			c.style.left = `${x}px`;
			c.style.top = `${y}px`;
		});

		return cleanup;
	});
</script>

<div bind:this={anchorEl} class="toaster__anchor" data-position={position} aria-hidden="true"></div>

<div
	bind:this={containerEl}
	class="toaster"
	data-position={position}
	style="position: fixed; top: 0; left: 0;"
	role="region"
	aria-label={ariaLabel}
	{...restProps}
>
	{#each toast.items as item (item.id)}
		<ToastItem
			id={item.id}
			message={item.message}
			description={item.description}
			variant={item.variant}
			duration={item.duration}
			dismissible={item.dismissible}
			{showBorder}
			{showProgress}
		/>
	{/each}
</div>
