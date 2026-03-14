<script lang="ts">
	import './dropdown.css';
	import { computePosition, flip, shift, offset, size, autoUpdate } from '@floating-ui/dom';
	import type { Placement, Middleware } from '@floating-ui/dom';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		open?: boolean;
		placement?: Placement;
		offset?: number;
		width?: 'auto' | 'trigger' | number;
		closeOnSelect?: boolean;
		closeOnClickOutside?: boolean;
		closeOnEscape?: boolean;
		disabled?: boolean;
		trigger: Snippet<[{ open: boolean }]>;
		children: Snippet;
	}

	let {
		open = $bindable(false),
		placement = 'bottom-start',
		offset: offsetValue = 4,
		width = 'auto',
		closeOnSelect = true,
		closeOnClickOutside = true,
		closeOnEscape = true,
		disabled = false,
		trigger,
		children,
		...restProps
	}: Props = $props();

	let containerEl: HTMLDivElement | null = $state(null);
	let triggerEl: HTMLButtonElement | null = $state(null);
	let menuEl: HTMLDivElement | null = $state(null);

	const menuId = `dropdown-menu-${Math.random().toString(36).slice(2, 9)}`;
	const triggerId = `dropdown-trigger-${Math.random().toString(36).slice(2, 9)}`;

	async function updatePosition() {
		if (!triggerEl || !menuEl) return;

		const middleware: Middleware[] = [
			offset(offsetValue),
			flip({ padding: 8 }),
			shift({ padding: 8 })
		];

		if (width === 'trigger') {
			middleware.push(
				size({
					apply({ rects, elements }) {
						Object.assign(elements.floating.style, {
							width: `${rects.reference.width}px`
						});
					}
				})
			);
		} else if (typeof width === 'number') {
			middleware.push(
				size({
					apply({ elements }) {
						Object.assign(elements.floating.style, {
							width: `${width}px`
						});
					}
				})
			);
		}

		const { x, y } = await computePosition(triggerEl, menuEl, {
			placement,
			middleware,
			strategy: 'fixed'
		});

		menuEl.style.left = `${x}px`;
		menuEl.style.top = `${y}px`;
	}

	$effect(() => {
		if (open && menuEl && triggerEl) {
			const cleanup = autoUpdate(triggerEl, menuEl, updatePosition);
			return cleanup;
		}
	});

	$effect(() => {
		if (open && closeOnClickOutside) {
			function handleClickOutside(event: MouseEvent) {
				if (!containerEl?.contains(event.target as Node)) {
					open = false;
				}
			}
			document.addEventListener('mousedown', handleClickOutside);
			return () => document.removeEventListener('mousedown', handleClickOutside);
		}
	});

	$effect(() => {
		if (open && closeOnSelect && menuEl) {
			function handleMenuClick(event: MouseEvent) {
				const target = event.target as HTMLElement;
				const item = target.closest('[role="menuitem"]');
				if (item && !item.hasAttribute('disabled') && !item.getAttribute('aria-disabled')) {
					open = false;
				}
			}
			menuEl.addEventListener('click', handleMenuClick);
			return () => menuEl?.removeEventListener('click', handleMenuClick);
		}
	});

	function toggleOpen() {
		if (disabled) return;
		open = !open;
	}

	function handleTriggerKeydown(event: KeyboardEvent) {
		if (disabled) return;

		if (!open) {
			if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
				event.preventDefault();
				open = true;
				requestAnimationFrame(() => focusFirstItem());
			}
			return;
		}

		handleMenuKeydown(event);
	}

	function handleMenuKeydown(event: KeyboardEvent) {
		switch (event.key) {
			case 'Escape':
				if (closeOnEscape) {
					event.preventDefault();
					open = false;
					triggerEl?.focus();
				}
				break;
			case 'ArrowDown':
				event.preventDefault();
				focusNextItem();
				break;
			case 'ArrowUp':
				event.preventDefault();
				focusPreviousItem();
				break;
			case 'Home':
				event.preventDefault();
				focusFirstItem();
				break;
			case 'End':
				event.preventDefault();
				focusLastItem();
				break;
			case 'Tab':
				open = false;
				break;
		}
	}

	function getMenuItems(): HTMLElement[] {
		if (!menuEl) return [];
		return Array.from(
			menuEl.querySelectorAll('[role="menuitem"]:not([disabled]):not([aria-disabled="true"])')
		);
	}

	function getFocusedIndex(): number {
		const items = getMenuItems();
		const focused = document.activeElement;
		return items.indexOf(focused as HTMLElement);
	}

	function focusItem(index: number) {
		const items = getMenuItems();
		if (index >= 0 && index < items.length) {
			items[index].focus();
		}
	}

	function focusFirstItem() {
		focusItem(0);
	}

	function focusLastItem() {
		const items = getMenuItems();
		focusItem(items.length - 1);
	}

	function focusNextItem() {
		const items = getMenuItems();
		const currentIndex = getFocusedIndex();
		const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
		focusItem(nextIndex);
	}

	function focusPreviousItem() {
		const items = getMenuItems();
		const currentIndex = getFocusedIndex();
		const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
		focusItem(prevIndex);
	}
</script>

<div bind:this={containerEl} class="dropdown" class:dropdown--disabled={disabled} {...restProps}>
	<button
		bind:this={triggerEl}
		id={triggerId}
		class="dropdown__trigger"
		type="button"
		aria-haspopup="menu"
		aria-expanded={open}
		aria-controls={open ? menuId : undefined}
		{disabled}
		onclick={toggleOpen}
		onkeydown={handleTriggerKeydown}
	>
		{@render trigger({ open })}
	</button>

	{#if open}
		<div
			bind:this={menuEl}
			id={menuId}
			role="menu"
			aria-labelledby={triggerId}
			tabindex="-1"
			class="dropdown__menu"
			onkeydown={handleMenuKeydown}
		>
			{@render children()}
		</div>
	{/if}
</div>

<style>
	.dropdown {
		position: relative;
		display: inline-block;
	}

	.dropdown__trigger {
		all: unset;
		box-sizing: border-box;
		cursor: pointer;
		display: inline-flex;
	}

	.dropdown--disabled .dropdown__trigger {
		cursor: not-allowed;
		pointer-events: none;
	}

	.dropdown__menu {
		position: fixed;
		top: 0;
		left: 0;
		z-index: var(--dropdown-z-index);
		min-width: var(--dropdown-min-width);
		max-height: var(--dropdown-max-height);
		overflow-y: auto;
		padding: var(--dropdown-padding);
		background: var(--dropdown-surface);
		color: var(--dropdown-surface-foreground);
		border: var(--dropdown-border-width) solid var(--dropdown-border);
		border-radius: var(--dropdown-border-radius);
		box-shadow: var(--dropdown-shadow);
		opacity: 0;
		transform: translateY(var(--dropdown-enter-offset));
		animation: dropdown-enter var(--dropdown-transition) forwards;
	}

	@keyframes dropdown-enter {
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
