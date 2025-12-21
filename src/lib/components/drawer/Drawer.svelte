<script lang="ts">
	import type { Snippet } from 'svelte';
	import { fade } from 'svelte/transition';
	import Button from '$lib/components/button/Button.svelte';
	import XIcon from '$lib/icons/XIcon.svelte';

	type Size = 'sm' | 'md' | 'lg';
	type Placement = 'left' | 'right';

	interface Props {
		open?: boolean;
		onOpenChange?: (open: boolean) => void;
		title?: string;
		placement?: Placement;
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
		placement = 'right',
		size = 'md',
		closeOnClickOutside = true,
		closeOnEscape = true,
		showCloseButton = true,
		header,
		children,
		footer
	}: Props = $props();

	let drawerEl: HTMLElement | null = $state(null);
	let previousActiveElement: HTMLElement | null = null;

	const drawerId = `drawer-${Math.random().toString(36).slice(2, 9)}`;
	const titleId = `${drawerId}-title`;

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

		if (event.key === 'Tab' && drawerEl) {
			trapFocus(event);
		}
	}

	function trapFocus(event: KeyboardEvent) {
		if (!drawerEl) return;

		const focusableElements = drawerEl.querySelectorAll<HTMLElement>(
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

	function handleDrawerMount(node: HTMLElement) {
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

	function slideTransition(
		_node: HTMLElement,
		{ duration = 200, placement: p = 'right' }: { duration?: number; placement?: Placement }
	) {
		return {
			duration,
			css: (t: number) => {
				const eased = cubicOut(t);
				return `transform: ${p === 'left' ? `translateX(${-100 + eased * 100}%)` : `translateX(${100 - eased * 100}%)`}`;
			}
		};
	}

	function cubicOut(t: number): number {
		const f = t - 1;
		return f * f * f + 1;
	}
</script>

{#if open}
	<div
		class="drawer-backdrop"
		onclick={handleBackdropClick}
		onkeydown={handleKeydown}
		role="presentation"
		transition:fade={{ duration: 150 }}
	>
		<div
			bind:this={drawerEl}
			use:handleDrawerMount
			class="drawer drawer--{size} drawer--{placement}"
			role="dialog"
			aria-modal="true"
			aria-labelledby={title ? titleId : undefined}
			transition:slideTransition={{ duration: 200, placement }}
		>
			{#if header}
				<header class="drawer__header">
					{@render header()}
					{#if showCloseButton}
						<Button
							variant="ghost"
							color="secondary"
							size="sm"
							icon
							aria-label="Close drawer"
							onclick={close}
						>
							<XIcon size={16} />
						</Button>
					{/if}
				</header>
			{:else if title}
				<header class="drawer__header">
					<h2 id={titleId} class="drawer__title">{title}</h2>
					{#if showCloseButton}
						<Button
							variant="ghost"
							color="secondary"
							size="sm"
							icon
							aria-label="Close drawer"
							onclick={close}
						>
							<XIcon size={16} />
						</Button>
					{/if}
				</header>
			{/if}

			{#if children}
				<div class="drawer__body">
					{@render children()}
				</div>
			{/if}

			{#if footer}
				<footer class="drawer__footer">
					{@render footer()}
				</footer>
			{/if}
		</div>
	</div>
{/if}

<style>
	.drawer-backdrop {
		position: fixed;
		inset: 0;
		background-color: var(--drawer-backdrop-bg);
		backdrop-filter: var(--drawer-backdrop-blur);
		z-index: var(--drawer-backdrop-z-index);
	}

	.drawer {
		position: fixed;
		top: 0;
		bottom: 0;
		display: flex;
		flex-direction: column;
		max-height: var(--drawer-max-height);
		background-color: var(--drawer-bg);
		border: var(--drawer-border-width) solid var(--drawer-border);
		box-shadow: var(--drawer-shadow);
		color: var(--drawer-text);
		font-family: var(--drawer-font-family);
		z-index: var(--drawer-z-index);
		overflow: hidden;
	}

	.drawer--left {
		left: 0;
		border-left: none;
	}

	.drawer--right {
		right: 0;
		border-right: none;
	}

	.drawer--sm {
		width: var(--drawer-sm-width);
	}

	.drawer--md {
		width: var(--drawer-md-width);
	}

	.drawer--lg {
		width: var(--drawer-lg-width);
	}

	.drawer__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--drawer-header-gap);
		padding: var(--drawer-header-padding-y) var(--drawer-header-padding-x);
		border-bottom: var(--drawer-header-border-width) solid var(--drawer-header-border);
		background-color: var(--drawer-header-bg);
		flex-shrink: 0;
	}

	.drawer__title {
		margin: 0;
		flex: 1;
		color: var(--drawer-title-color);
		font-size: var(--drawer-title-font-size);
		font-weight: var(--drawer-title-font-weight);
		line-height: var(--drawer-title-line-height);
	}

	.drawer__body {
		display: flex;
		flex-direction: column;
		gap: var(--drawer-body-gap);
		padding: var(--drawer-body-padding-y) var(--drawer-body-padding-x);
		overflow-y: auto;
		flex: 1;
		min-height: 0;
	}

	.drawer__footer {
		display: flex;
		align-items: center;
		justify-content: var(--drawer-footer-justify);
		gap: var(--drawer-footer-gap);
		padding: var(--drawer-footer-padding-y) var(--drawer-footer-padding-x);
		border-top: var(--drawer-footer-border-width) solid var(--drawer-footer-border);
		background-color: var(--drawer-footer-bg);
		flex-shrink: 0;
	}
</style>
