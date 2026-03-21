<script lang="ts">
	import './tooltip.css';
	import { computePosition, flip, shift, offset, arrow } from '@floating-ui/dom';
	import type { Placement } from '@floating-ui/dom';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
		text?: string;
		content?: Snippet;
		placement?: Placement;
		showArrow?: boolean;
		tooltipOffset?: number;
		children: Snippet;
	}

	let {
		text,
		content,
		placement = 'top',
		showArrow = true,
		tooltipOffset = 12,
		children,
		...restProps
	}: Props = $props();

	let triggerEl: HTMLElement | null = $state(null);
	let tooltipEl: HTMLElement | null = $state(null);
	let arrowEl: HTMLElement | null = $state(null);
	let visible = $state(false);

	const tooltipId = `tooltip-${Math.random().toString(36).slice(2, 9)}`;
	const arrowOffset = 4;

	async function updatePosition() {
		if (!triggerEl || !tooltipEl) return;

		const middleware = [offset(tooltipOffset), flip(), shift({ padding: 8 })];

		if (showArrow && arrowEl) {
			middleware.push(arrow({ element: arrowEl }));
		}

		const {
			x,
			y,
			placement: finalPlacement,
			middlewareData
		} = await computePosition(triggerEl, tooltipEl, {
			placement,
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
		if (!visible || !tooltipEl) return;

		updatePosition();

		window.addEventListener('scroll', hide, { passive: true, capture: true });
		window.addEventListener('resize', hide, { passive: true });

		return () => {
			window.removeEventListener('scroll', hide, { capture: true });
			window.removeEventListener('resize', hide);
		};
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

<span
	bind:this={triggerEl}
	class="tooltip-trigger"
	onmouseenter={show}
	onmouseleave={hide}
	onfocusin={show}
	onfocusout={hide}
	onkeydown={handleKeydown}
	aria-describedby={visible ? tooltipId : undefined}
	{...restProps}
>
	{@render children()}
</span>

<div
	bind:this={tooltipEl}
	id={tooltipId}
	class="tooltip"
	class:tooltip--visible={visible}
	role="tooltip"
>
	{#if content}{@render content()}{:else}{text}{/if}
	{#if showArrow}
		<div bind:this={arrowEl} class="tooltip__arrow"></div>
	{/if}
</div>
