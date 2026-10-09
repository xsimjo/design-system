<script lang="ts">
	import './drawer.css';
	import { setContext } from 'svelte';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { DRAWER_KEY, type DrawerContext } from './context.js';
	import XIcon from '$lib/icons/XIcon.svelte';

	type DrawerSize = 'sm' | 'md' | 'lg' | 'xl';
	type DrawerPlacement = 'left' | 'right';

	const LEAVE_ANIMATION_RIGHT = 'drawer-leave-right';
	const LEAVE_ANIMATION_LEFT = 'drawer-leave-left';

	interface Props extends HTMLAttributes<HTMLDialogElement> {
		open?: boolean;
		size?: DrawerSize;
		placement?: DrawerPlacement;
		title?: string;
		closeOnClickOutside?: boolean;
		closeOnEscape?: boolean;
		backdropBlur?: boolean;
		header?: Snippet;
		footer?: Snippet;
		children: Snippet;
	}

	let {
		open = $bindable(false),
		size = 'md',
		placement = 'right',
		title,
		closeOnClickOutside = true,
		closeOnEscape = true,
		backdropBlur = true,
		header,
		footer,
		children,
		...restProps
	}: Props = $props();

	let dialogEl: HTMLDialogElement | null = $state(null);
	let closing = $state(false);

	const instanceId = Math.random().toString(36).slice(2, 9);
	const titleId = `drawer-title-${instanceId}`;
	const bodyId = `drawer-body-${instanceId}`;

	const leaveAnimation = $derived(
		placement === 'left' ? LEAVE_ANIMATION_LEFT : LEAVE_ANIMATION_RIGHT
	);

	setContext<DrawerContext>(DRAWER_KEY, {
		close: () => startClose(),
		titleId,
		bodyId
	});

	// Open the dialog when `open` becomes true
	$effect(() => {
		if (!dialogEl) return;
		if (open) {
			closing = false;
			if (!dialogEl.open) dialogEl.showModal();
		}
	});

	// Trigger close animation when `open` is set to false externally
	$effect(() => {
		if (!open && !closing && dialogEl?.open) {
			startClose();
		}
	});

	function startClose() {
		if (closing) return;
		closing = true;
	}

	function handlePanelAnimationEnd(event: AnimationEvent) {
		if (event.animationName === leaveAnimation && closing) {
			dialogEl?.close();
		}
	}

	// Fires after dialogEl.close() — sync state back
	function handleClose() {
		open = false;
		closing = false;
	}

	// ESC key: prevent native close, play animation instead
	function handleCancel(event: Event) {
		event.preventDefault();
		if (closeOnEscape) startClose();
	}

	function handleBackdropClick(event: MouseEvent) {
		if (!closeOnClickOutside) return;
		if (event.target === dialogEl) startClose();
	}
</script>

<dialog
	bind:this={dialogEl}
	class="drawer drawer--{placement} drawer--{size}"
	class:drawer--closing={closing}
	class:drawer--no-blur={!backdropBlur}
	onclose={handleClose}
	oncancel={handleCancel}
	onclick={handleBackdropClick}
	aria-modal="true"
	aria-labelledby={titleId}
	aria-describedby={bodyId}
	{...restProps}
>
	<div class="drawer__panel" onanimationend={handlePanelAnimationEnd}>
		{#if header}
			{@render header()}
		{:else if title}
			<div class="drawer__header">
				<h2 class="drawer__title" id={titleId}>{title}</h2>
				<button class="drawer__close" onclick={startClose} aria-label="Close drawer">
					<XIcon size={16} />
				</button>
			</div>
		{/if}

		{@render children()}

		{#if footer}
			<div class="drawer__footer">
				{@render footer()}
			</div>
		{/if}
	</div>
</dialog>
