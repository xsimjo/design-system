<script lang="ts">
	import { computePosition, flip, shift, offset, arrow } from '@floating-ui/dom';
	import type { Placement } from '@floating-ui/dom';
	import type { Snippet } from 'svelte';

	interface Props {
		text: string;
		position?: Placement;
		showArrow?: boolean;
		children: Snippet;
	}

	let { text, position = 'top', showArrow = true, children }: Props = $props();

	let triggerEl: HTMLElement | null = $state(null);
	let tooltipEl: HTMLElement | null = $state(null);
	let arrowEl: HTMLElement | null = $state(null);
	let visible = $state(false);

	const tooltipId = `tooltip-${Math.random().toString(36).slice(2, 9)}`;
	const arrowOffset = 4;

	async function updatePosition() {
		if (!triggerEl || !tooltipEl) return;

		const middleware = [offset(12), flip(), shift({ padding: 8 })];

		if (showArrow && arrowEl) {
			middleware.push(arrow({ element: arrowEl }));
		}

		const {
			x,
			y,
			placement: finalPlacement,
			middlewareData
		} = await computePosition(triggerEl, tooltipEl, {
			placement: position,
			middleware,
			strategy: 'fixed'
		});

		tooltipEl.style.left = `${x}px`;
		tooltipEl.style.top = `${y}px`;

		if (showArrow && arrowEl && middlewareData.arrow) {
			const { x: arrowX, y: arrowY } = middlewareData.arrow;
			const side = finalPlacement.split('-')[0];
			const staticSide = { top: 'bottom', right: 'left', bottom: 'top', left: 'right' }[side]!;

			Object.assign(arrowEl.style, {
				left: arrowX != null ? `${arrowX}px` : '',
				top: arrowY != null ? `${arrowY}px` : '',
				right: '',
				bottom: '',
				[staticSide]: `-${arrowOffset}px`
			});
		}
	}

	$effect(() => {
		if (visible && tooltipEl) {
			updatePosition();
		}
	});

	function show() {
		visible = true;
	}

	function hide() {
		visible = false;
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') hide();
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<span
	bind:this={triggerEl}
	class="tooltip-trigger"
	onmouseenter={show}
	onmouseleave={hide}
	onfocusin={show}
	onfocusout={hide}
	onkeydown={handleKeydown}
	aria-describedby={visible ? tooltipId : undefined}
>
	{@render children()}
</span>

<div bind:this={tooltipEl} id={tooltipId} class="tooltip" class:visible role="tooltip">
	{text}
	{#if showArrow}
		<div bind:this={arrowEl} class="tooltip__arrow"></div>
	{/if}
</div>

<style>
	.tooltip-trigger {
		display: inline-block;
	}

	.tooltip {
		position: fixed;
		top: 0;
		left: 0;
		z-index: var(--z-tooltip);
		max-width: 256px;
		padding: var(--spacing-xs) var(--spacing-sm);
		background-color: var(--color-text);
		color: var(--color-bg);
		border-radius: var(--radius-sm);
		box-shadow: var(--shadow-lg);
		font-family: var(--font-sans);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-normal);
		line-height: var(--line-height-tight);
		pointer-events: none;
		opacity: 0;
		transition: opacity var(--transition-fast);
	}

	.tooltip.visible {
		opacity: 1;
	}

	.tooltip__arrow {
		position: absolute;
		width: 8px;
		height: 8px;
		background-color: var(--color-text);
		transform: rotate(45deg);
	}
</style>
