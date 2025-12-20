<script lang="ts">
	import type { Snippet } from 'svelte';
	import { fade, scale } from 'svelte/transition';
	import Button from '$lib/components/button/Button.svelte';
	import XIcon from '$lib/icons/XIcon.svelte';

	type Size = 'sm' | 'md' | 'lg';

	interface Props {
		open?: boolean;
		onOpenChange?: (open: boolean) => void;
		title?: string;
		description?: string;
		size?: Size;
		closeOnClickOutside?: boolean;
		closeOnEscape?: boolean;
		showCloseButton?: boolean;
		header?: Snippet;
		children?: Snippet;
		footer?: Snippet;
	}

	let {
		open = $bindable(false),
		onOpenChange,
		title,
		description,
		size = 'md',
		closeOnClickOutside = true,
		closeOnEscape = true,
		showCloseButton = true,
		header,
		children,
		footer
	}: Props = $props();

	let dialogEl: HTMLElement | null = $state(null);
	let previousActiveElement: HTMLElement | null = null;

	const dialogId = `dialog-${Math.random().toString(36).slice(2, 9)}`;
	const titleId = `${dialogId}-title`;
	const descriptionId = `${dialogId}-description`;

	function close() {
		open = false;
		onOpenChange?.(false);
	}

	function handleBackdropClick(event: MouseEvent) {
		if (closeOnClickOutside && event.target === event.currentTarget) {
			close();
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (closeOnEscape && event.key === 'Escape') {
			event.preventDefault();
			close();
		}

		if (event.key === 'Tab' && dialogEl) {
			trapFocus(event);
		}
	}

	function trapFocus(event: KeyboardEvent) {
		if (!dialogEl) return;

		const focusableElements = dialogEl.querySelectorAll<HTMLElement>(
			'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
		);
		const firstElement = focusableElements[0];
		const lastElement = focusableElements[focusableElements.length - 1];

		if (event.shiftKey) {
			if (document.activeElement === firstElement) {
				event.preventDefault();
				lastElement?.focus();
			}
		} else {
			if (document.activeElement === lastElement) {
				event.preventDefault();
				firstElement?.focus();
			}
		}
	}

	function handleDialogMount(node: HTMLElement) {
		previousActiveElement = document.activeElement as HTMLElement;

		const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
		document.body.style.overflow = 'hidden';
		document.body.style.paddingRight = `${scrollbarWidth}px`;

		const focusableElements = node.querySelectorAll<HTMLElement>(
			'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
		);
		focusableElements[0]?.focus();

		return {
			destroy() {
				document.body.style.overflow = '';
				document.body.style.paddingRight = '';
				previousActiveElement?.focus();
			}
		};
	}
</script>

{#if open}
	<div
		class="dialog-backdrop"
		onclick={handleBackdropClick}
		onkeydown={handleKeydown}
		role="presentation"
		transition:fade={{ duration: 150 }}
	>
		<div
			bind:this={dialogEl}
			use:handleDialogMount
			class="dialog dialog--{size}"
			role="dialog"
			aria-modal="true"
			aria-labelledby={title ? titleId : undefined}
			aria-describedby={description ? descriptionId : undefined}
			transition:scale={{ duration: 150, start: 0.95 }}
		>
			{#if header}
				<header class="dialog__header">
					{@render header()}
					{#if showCloseButton}
						<Button
							variant="ghost"
							color="secondary"
							size="sm"
							icon
							aria-label="Close dialog"
							onclick={close}
						>
							<XIcon size={16} />
						</Button>
					{/if}
				</header>
			{:else if title}
				<header class="dialog__header">
					<div class="dialog__header-content">
						<h2 id={titleId} class="dialog__title">{title}</h2>
						{#if description}
							<p id={descriptionId} class="dialog__description">{description}</p>
						{/if}
					</div>
					{#if showCloseButton}
						<Button
							variant="ghost"
							color="secondary"
							size="sm"
							icon
							aria-label="Close dialog"
							onclick={close}
						>
							<XIcon size={16} />
						</Button>
					{/if}
				</header>
			{/if}

			{#if children}
				<div class="dialog__body">
					{@render children()}
				</div>
			{/if}

			{#if footer}
				<footer class="dialog__footer">
					{@render footer()}
				</footer>
			{/if}
		</div>
	</div>
{/if}

<style>
	.dialog-backdrop {
		position: fixed;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: var(--dialog-backdrop-bg);
		backdrop-filter: var(--dialog-backdrop-blur);
		z-index: var(--dialog-backdrop-z-index);
	}

	.dialog {
		display: flex;
		flex-direction: column;
		max-height: var(--dialog-max-height);
		background-color: var(--dialog-bg);
		border: var(--dialog-border-width) solid var(--dialog-border);
		border-radius: var(--dialog-border-radius);
		box-shadow: var(--dialog-shadow);
		color: var(--dialog-text);
		font-family: var(--dialog-font-family);
		z-index: var(--dialog-z-index);
	}

	.dialog--sm {
		width: var(--dialog-sm-width);
	}

	.dialog--md {
		width: var(--dialog-md-width);
	}

	.dialog--lg {
		width: var(--dialog-lg-width);
	}

	.dialog__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--dialog-header-gap);
		padding: var(--dialog-header-padding-y) var(--dialog-header-padding-x);
		border-bottom: var(--dialog-header-border-width) solid var(--dialog-header-border);
		background-color: var(--dialog-header-bg);
		border-radius: var(--dialog-border-radius) var(--dialog-border-radius) 0 0;
		flex-shrink: 0;
	}

	.dialog__header-content {
		display: flex;
		flex-direction: column;
		gap: var(--dialog-description-gap);
		flex: 1;
		min-width: 0;
	}

	.dialog__title {
		margin: 0;
		color: var(--dialog-title-color);
		font-size: var(--dialog-title-font-size);
		font-weight: var(--dialog-title-font-weight);
		line-height: var(--dialog-title-line-height);
	}

	.dialog__description {
		margin: 0;
		color: var(--dialog-description-color);
		font-size: var(--dialog-description-font-size);
	}

	.dialog__body {
		display: flex;
		flex-direction: column;
		gap: var(--dialog-body-gap);
		padding: var(--dialog-body-padding-y) var(--dialog-body-padding-x);
		overflow-y: auto;
		flex: 1;
		min-height: 0;
	}

	.dialog__footer {
		display: flex;
		align-items: center;
		justify-content: var(--dialog-footer-justify);
		gap: var(--dialog-footer-gap);
		padding: var(--dialog-footer-padding-y) var(--dialog-footer-padding-x);
		border-top: var(--dialog-footer-border-width) solid var(--dialog-footer-border);
		background-color: var(--dialog-footer-bg);
		border-radius: 0 0 var(--dialog-border-radius) var(--dialog-border-radius);
		flex-shrink: 0;
	}
</style>
