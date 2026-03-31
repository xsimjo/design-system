<script lang="ts">
	import './dropdown.css';
	import {
		computePosition,
		flip,
		shift,
		offset,
		size as floatingSize,
		autoUpdate
	} from '@floating-ui/dom';
	import type { Placement, Middleware } from '@floating-ui/dom';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
		open?: boolean;
		placement?: Placement;
		offset?: number;
		width?: 'auto' | 'trigger' | number;
		fullWidth?: boolean;
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
		fullWidth = false,
		closeOnSelect = true,
		closeOnClickOutside = true,
		closeOnEscape = true,
		disabled = false,
		trigger,
		children,
		...restProps
	}: Props = $props();

	let containerEl: HTMLDivElement | null = $state(null);
	let triggerWrapperEl: HTMLSpanElement | null = $state(null);
	let menuEl: HTMLDivElement | null = $state(null);

	const menuId = `dropdown-menu-${Math.random().toString(36).slice(2, 9)}`;
	const triggerId = `dropdown-trigger-${Math.random().toString(36).slice(2, 9)}`;

	function getInteractiveTrigger(): HTMLElement | null {
		if (!triggerWrapperEl) return null;
		return (
			triggerWrapperEl.querySelector<HTMLElement>(
				'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
			) ?? triggerWrapperEl
		);
	}

	// Sync ARIA attrs onto the actual interactive trigger element
	$effect(() => {
		const el = getInteractiveTrigger();
		if (!el) return;
		el.id = triggerId;
		el.setAttribute('aria-haspopup', 'menu');
		el.setAttribute('aria-expanded', String(open));
		if (open) {
			el.setAttribute('aria-controls', menuId);
		} else {
			el.removeAttribute('aria-controls');
		}
		return () => {
			el.removeAttribute('aria-haspopup');
			el.removeAttribute('aria-expanded');
			el.removeAttribute('aria-controls');
		};
	});

	async function updatePosition() {
		if (!triggerWrapperEl || !menuEl) return;

		const middleware: Middleware[] = [
			offset(offsetValue),
			flip({ padding: 8 }),
			shift({ padding: 8 })
		];

		if (width === 'trigger') {
			middleware.push(
				floatingSize({
					apply({
						rects,
						elements
					}: {
						rects: { reference: { width: number } };
						elements: { floating: HTMLElement };
					}) {
						Object.assign(elements.floating.style, {
							width: `${rects.reference.width}px`
						});
					}
				})
			);
		} else if (typeof width === 'number') {
			middleware.push(
				floatingSize({
					apply({ elements }: { elements: { floating: HTMLElement } }) {
						Object.assign(elements.floating.style, {
							width: `${width}px`
						});
					}
				})
			);
		}

		const { x, y } = await computePosition(triggerWrapperEl, menuEl, {
			placement,
			middleware,
			strategy: 'fixed'
		});

		menuEl.style.left = `${x}px`;
		menuEl.style.top = `${y}px`;
	}

	$effect(() => {
		if (open && menuEl && triggerWrapperEl) {
			const cleanup = autoUpdate(triggerWrapperEl, menuEl, updatePosition);
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
				if (
					item &&
					!item.hasAttribute('disabled') &&
					item.getAttribute('aria-disabled') !== 'true'
				) {
					open = false;
				}
			}
			menuEl.addEventListener('click', handleMenuClick);
			return () => menuEl?.removeEventListener('click', handleMenuClick);
		}
	});

	function handleTriggerClick() {
		if (disabled) return;
		open = !open;
	}

	function handleTriggerKeydown(event: KeyboardEvent) {
		if (disabled) return;

		if (!open) {
			// ArrowDown opens and focuses first item. Enter/Space are left to the
			// trigger element's native click handling to avoid double-toggling.
			if (event.key === 'ArrowDown') {
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
					getInteractiveTrigger()?.focus();
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
		return items.indexOf(document.activeElement as HTMLElement);
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
		focusItem(currentIndex < items.length - 1 ? currentIndex + 1 : 0);
	}

	function focusPreviousItem() {
		const items = getMenuItems();
		const currentIndex = getFocusedIndex();
		focusItem(currentIndex > 0 ? currentIndex - 1 : items.length - 1);
	}
</script>

<div
	bind:this={containerEl}
	class="dropdown"
	class:dropdown--disabled={disabled}
	class:dropdown--full-width={fullWidth}
	{...restProps}
>
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<span
		bind:this={triggerWrapperEl}
		class="dropdown__trigger"
		onclick={handleTriggerClick}
		onkeydown={handleTriggerKeydown}
	>
		{@render trigger({ open })}
	</span>

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
