<script lang="ts">
	import { computePosition, flip, shift, offset, arrow } from '@floating-ui/dom';
	import type { Placement } from '@floating-ui/dom';
	import type { Snippet } from 'svelte';

	interface Props {
		content: string;
		placement?: Placement;
		showArrow?: boolean;
		children: Snippet;
	}

	let { content, placement = 'top', showArrow = true, children }: Props = $props();

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
		} = await computePosition(triggerEl, tooltipEl, { placement, middleware, strategy: 'fixed' });

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
	{content}
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
		z-index: var(--tooltip-z-index);
		max-width: var(--tooltip-max-width);
		padding: var(--tooltip-padding-y) var(--tooltip-padding-x);
		background-color: var(--tooltip-bg);
		color: var(--tooltip-text);
		border-radius: var(--tooltip-radius);
		box-shadow: var(--tooltip-shadow);
		font-family: var(--tooltip-font-family);
		font-size: var(--tooltip-font-size);
		font-weight: var(--tooltip-font-weight);
		line-height: var(--tooltip-line-height);
		pointer-events: none;
		opacity: 0;
		transition: opacity var(--tooltip-transition-duration);
	}

	.tooltip.visible {
		opacity: 1;
	}

	.tooltip__arrow {
		position: absolute;
		width: var(--tooltip-arrow-size);
		height: var(--tooltip-arrow-size);
		background-color: var(--tooltip-arrow-color);
		transform: rotate(45deg);
	}
</style>
