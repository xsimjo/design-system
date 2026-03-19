<script lang="ts">
	import './modal.css';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import XIcon from '$lib/icons/XIcon.svelte';

	type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

	const LEAVE_ANIMATION = 'modal-leave';

	interface Props extends HTMLAttributes<HTMLDialogElement> {
		open?: boolean;
		size?: ModalSize;
		title?: string;
		closeOnClickOutside?: boolean;
		closeOnEscape?: boolean;
		header?: Snippet;
		footer?: Snippet;
		children: Snippet;
	}

	let {
		open = $bindable(false),
		size = 'md',
		title,
		closeOnClickOutside = true,
		closeOnEscape = true,
		header,
		footer,
		children,
		...restProps
	}: Props = $props();

	let dialogEl: HTMLDialogElement | null = $state(null);
	let closing = $state(false);

	const instanceId = Math.random().toString(36).slice(2, 9);
	const titleId = `modal-title-${instanceId}`;
	const bodyId = `modal-body-${instanceId}`;

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
		if (event.animationName === LEAVE_ANIMATION && closing) {
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

	const hasHeader = $derived(!!header || !!title);
</script>

<dialog
	bind:this={dialogEl}
	class="modal modal--{size}"
	class:modal--has-header={hasHeader}
	class:modal--closing={closing}
	onclose={handleClose}
	oncancel={handleCancel}
	onclick={handleBackdropClick}
	aria-modal="true"
	aria-labelledby={title ? titleId : undefined}
	aria-describedby={bodyId}
	{...restProps}
>
	<div class="modal__panel" onanimationend={handlePanelAnimationEnd}>
		{#if header}
			{@render header()}
		{:else if title}
			<div class="modal__header">
				<h2 class="modal__title" id={titleId}>{title}</h2>
				<button class="modal__close" onclick={startClose} aria-label="Close modal">
					<XIcon size={16} />
				</button>
			</div>
		{/if}

		<div class="modal__body" id={bodyId}>
			{@render children()}
		</div>

		{#if footer}
			<div class="modal__footer">
				{@render footer()}
			</div>
		{/if}
	</div>
</dialog>
