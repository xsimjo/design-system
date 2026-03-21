<script lang="ts">
	import './popover.css';
	import { computePosition, flip, shift, offset, arrow, autoUpdate } from '@floating-ui/dom';
	import type { Placement } from '@floating-ui/dom';
	import type { Snippet } from 'svelte';
	import { setContext } from 'svelte';
	import { POPOVER_KEY, type PopoverContext } from './context.js';

	interface Props {
		open?: boolean;
		placement?: Placement;
		showArrow?: boolean;
		popoverOffset?: number;
		minWidth?: string;
		maxWidth?: string;
		closeOnClickOutside?: boolean;
		closeOnEscape?: boolean;
		content?: Snippet;
		children: Snippet;
	}

	let {
		open = $bindable(false),
		placement = 'bottom',
		showArrow = true,
		popoverOffset = 12,
		minWidth,
		maxWidth,
		closeOnClickOutside = true,
		closeOnEscape = true,
		content,
		children
	}: Props = $props();

	let triggerEl: HTMLElement | null = $state(null);
	let popoverEl: HTMLElement | null = $state(null);
	let arrowEl: HTMLElement | null = $state(null);
	let shown = $state(false);
	let closing = $state(false);

	const arrowOffset = 4;
	const popoverId = `popover-${Math.random().toString(36).slice(2, 9)}`;

	const containerStyle = $derived(
		[minWidth && `--popover-min-width: ${minWidth}`, maxWidth && `--popover-max-width: ${maxWidth}`]
			.filter(Boolean)
			.join('; ')
	);

	setContext<PopoverContext>(POPOVER_KEY, { close: () => startClose() });

	async function updatePosition() {
		if (!triggerEl || !popoverEl) return;

		const middleware = [offset(popoverOffset), flip(), shift({ padding: 8 })];

		if (showArrow && arrowEl) {
			middleware.push(arrow({ element: arrowEl }));
		}

		const {
			x,
			y,
			placement: finalPlacement,
			middlewareData
		} = await computePosition(triggerEl, popoverEl, {
			placement,
			middleware,
			strategy: 'fixed'
		});

		popoverEl.style.left = `${x}px`;
		popoverEl.style.top = `${y}px`;

		if (showArrow && arrowEl && middlewareData.arrow) {
			const { x: arrowX, y: arrowY } = middlewareData.arrow;
			const side = finalPlacement.split('-')[0];
			const staticSide = { top: 'bottom', right: 'left', bottom: 'top', left: 'right' }[side]!;

			arrowEl.dataset.side = side;

			Object.assign(arrowEl.style, {
				left: arrowX != null ? `${arrowX}px` : '',
				top: arrowY != null ? `${arrowY}px` : '',
				right: '',
				bottom: '',
				[staticSide]: `-${arrowOffset}px`
			});
		}
	}

	// React to external open = true
	$effect(() => {
		if (open) {
			shown = true;
			closing = false;
		}
	});

	// React to external open = false
	$effect(() => {
		if (!open && shown && !closing) {
			startClose();
		}
	});

	// Set up autoUpdate while the popover is shown
	$effect(() => {
		if (!shown || !triggerEl || !popoverEl) return;

		updatePosition();

		const cleanup = autoUpdate(triggerEl, popoverEl, updatePosition);
		return cleanup;
	});

	function startClose() {
		if (closing) return;
		closing = true;
	}

	function handleAnimationEnd(event: AnimationEvent) {
		if (closing && event.animationName === 'popover-leave') {
			shown = false;
			closing = false;
			open = false;
		}
	}

	function toggle() {
		if (shown && !closing) {
			startClose();
		} else if (!shown) {
			open = true;
		}
	}

	function handleOutsidePointerdown(event: PointerEvent) {
		if (!closeOnClickOutside || !shown || closing) return;
		const target = event.target as Node;
		if (popoverEl && !popoverEl.contains(target) && triggerEl && !triggerEl.contains(target)) {
			startClose();
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (closeOnEscape && event.key === 'Escape' && shown && !closing) {
			event.stopPropagation();
			startClose();
		}
	}
</script>

<svelte:window onpointerdown={handleOutsidePointerdown} onkeydown={handleKeydown} />

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<span
	bind:this={triggerEl}
	class="popover-trigger"
	onclick={toggle}
	aria-expanded={shown && !closing}
	aria-controls={popoverId}
	aria-haspopup="dialog"
>
	{@render children()}
</span>

{#if shown}
	<div
		bind:this={popoverEl}
		class="popover-container"
		class:popover-container--closing={closing}
		onanimationend={handleAnimationEnd}
		style={containerStyle}
	>
		<div id={popoverId} class="popover" role="dialog" aria-modal="false">
			{#if content}{@render content()}{/if}
		</div>
		{#if showArrow}
			<div bind:this={arrowEl} class="popover__arrow"></div>
		{/if}
	</div>
{/if}
