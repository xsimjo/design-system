<script lang="ts">
	import type { Snippet } from 'svelte';
	import { SvelteSet } from 'svelte/reactivity';
	import ChevronDownIcon from '$lib/icons/ChevronDownIcon.svelte';

	interface AccordionItem {
		id: string;
		title: string;
		content: string | Snippet;
		disabled?: boolean;
	}

	interface Props {
		items: AccordionItem[];
		mode?: 'single' | 'multiple';
		defaultOpen?: string[];
		collapsible?: boolean;
		disabled?: boolean;
		flush?: boolean;
	}

	let {
		items,
		mode = 'single',
		defaultOpen = [],
		collapsible = true,
		disabled = false,
		flush = false
	}: Props = $props();

	let openItems = new SvelteSet<string>(defaultOpen);

	function toggle(itemId: string) {
		const item = items.find((i) => i.id === itemId);
		if (disabled || item?.disabled) return;

		const isOpen = openItems.has(itemId);

		if (mode === 'single') {
			if (isOpen && collapsible) {
				openItems.clear();
			} else if (!isOpen) {
				openItems.clear();
				openItems.add(itemId);
			}
		} else {
			if (isOpen) {
				openItems.delete(itemId);
			} else {
				openItems.add(itemId);
			}
		}
	}

	function handleKeydown(event: KeyboardEvent, itemId: string) {
		const item = items.find((i) => i.id === itemId);
		if (disabled || item?.disabled) return;

		const enabledItems = items.filter((i) => !i.disabled && !disabled);
		const currentEnabledIndex = enabledItems.findIndex((i) => i.id === itemId);

		switch (event.key) {
			case 'Enter':
			case ' ':
				event.preventDefault();
				toggle(itemId);
				break;
			case 'ArrowDown':
				event.preventDefault();
				if (currentEnabledIndex < enabledItems.length - 1) {
					const nextItem = enabledItems[currentEnabledIndex + 1];
					document.getElementById(`accordion-header-${nextItem.id}`)?.focus();
				}
				break;
			case 'ArrowUp':
				event.preventDefault();
				if (currentEnabledIndex > 0) {
					const prevItem = enabledItems[currentEnabledIndex - 1];
					document.getElementById(`accordion-header-${prevItem.id}`)?.focus();
				}
				break;
			case 'Home':
				event.preventDefault();
				if (enabledItems.length > 0) {
					document.getElementById(`accordion-header-${enabledItems[0].id}`)?.focus();
				}
				break;
			case 'End':
				event.preventDefault();
				if (enabledItems.length > 0) {
					document
						.getElementById(`accordion-header-${enabledItems[enabledItems.length - 1].id}`)
						?.focus();
				}
				break;
		}
	}
</script>

<div class="accordion" class:accordion--disabled={disabled} class:accordion--flush={flush}>
	{#each items as item (item.id)}
		{@const isOpen = openItems.has(item.id)}
		{@const isDisabled = disabled || item.disabled}
		<div
			class="accordion__item"
			class:accordion__item--open={isOpen}
			class:accordion__item--disabled={isDisabled}
		>
			<button
				type="button"
				id="accordion-header-{item.id}"
				class="accordion__header"
				class:accordion__header--open={isOpen}
				class:accordion__header--disabled={isDisabled}
				aria-expanded={isOpen}
				aria-controls="accordion-panel-{item.id}"
				aria-disabled={isDisabled || undefined}
				disabled={isDisabled}
				onclick={() => toggle(item.id)}
				onkeydown={(e) => handleKeydown(e, item.id)}
			>
				<span class="accordion__title">{item.title}</span>
				<span class="accordion__icon" class:accordion__icon--open={isOpen}>
					<ChevronDownIcon />
				</span>
			</button>
			<div
				id="accordion-panel-{item.id}"
				class="accordion__panel"
				class:accordion__panel--open={isOpen}
				role="region"
				aria-labelledby="accordion-header-{item.id}"
				aria-hidden={!isOpen}
			>
				<div class="accordion__content">
					<div class="accordion__content-inner">
						{#if typeof item.content === 'string'}
							{item.content}
						{:else}
							{@render item.content()}
						{/if}
					</div>
				</div>
			</div>
		</div>
	{/each}
</div>

<style>
	.accordion {
		background: var(--accordion-container-bg);
		border: var(--accordion-container-border-width) solid var(--accordion-container-border);
		border-radius: var(--accordion-container-radius);
		display: flex;
		flex-direction: column;
		gap: var(--accordion-item-gap);
		overflow: hidden;
	}

	.accordion--disabled {
		opacity: var(--accordion-opacity-disabled);
	}

	.accordion--flush {
		background: transparent;
		border: none;
		border-radius: 0;
	}

	.accordion__item {
		background: var(--accordion-item-bg);
	}

	.accordion__item:not(:first-child) {
		border-top: var(--accordion-divider-width) solid var(--accordion-divider-color);
	}

	.accordion--flush .accordion__item {
		background: transparent;
	}

	.accordion__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: var(--accordion-header-padding-y) var(--accordion-header-padding-x);
		background: var(--accordion-header-bg);
		border: none;
		border-bottom: var(--accordion-header-border-width) solid var(--accordion-header-border);
		cursor: var(--accordion-cursor-default);
		font-family: var(--accordion-header-font-family);
		font-size: var(--accordion-header-font-size);
		font-weight: var(--accordion-header-font-weight);
		line-height: var(--accordion-header-line-height);
		color: var(--accordion-header-text);
		text-align: left;
		transition: all var(--accordion-transition-duration);
	}

	.accordion__header:hover:not(:disabled) {
		background: var(--accordion-header-bg-hover);
		color: var(--accordion-header-text-hover);
		border-color: var(--accordion-header-border-hover);
	}

	.accordion__header:focus-visible {
		outline: none;
		box-shadow:
			inset 0 0 0 var(--accordion-focus-ring-offset) var(--accordion-item-bg),
			inset 0 0 0 calc(var(--accordion-focus-ring-offset) + var(--accordion-focus-ring-width))
				var(--accordion-focus-ring-color);
	}

	.accordion__header--disabled {
		cursor: var(--accordion-cursor-disabled);
		background: var(--accordion-header-bg-disabled);
		color: var(--accordion-header-text-disabled);
	}

	.accordion__title {
		flex: 1;
	}

	.accordion__icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: var(--accordion-icon-size);
		height: var(--accordion-icon-size);
		color: var(--accordion-icon-color);
		transition: transform var(--accordion-transition-duration);
	}

	.accordion__icon :global(svg) {
		width: 100%;
		height: 100%;
	}

	.accordion__header:hover:not(:disabled) .accordion__icon {
		color: var(--accordion-icon-color-hover);
	}

	.accordion__icon--open {
		transform: rotate(var(--accordion-icon-rotation));
	}

	.accordion__header--disabled .accordion__icon {
		color: var(--accordion-icon-color-disabled);
	}

	.accordion__panel {
		display: grid;
		grid-template-rows: 0fr;
		transition: grid-template-rows var(--accordion-transition-duration);
		background: var(--accordion-panel-bg);
		border-top: var(--accordion-panel-border-width) solid var(--accordion-panel-border);
	}

	.accordion__panel--open {
		grid-template-rows: 1fr;
	}

	.accordion__content {
		min-height: 0;
		overflow: hidden;
		color: var(--accordion-content-text);
		font-family: var(--accordion-header-font-family);
	}

	.accordion__content-inner {
		padding: var(--accordion-content-padding-top) var(--accordion-content-padding-x)
			var(--accordion-content-padding-y);
	}

	@media (prefers-reduced-motion: reduce) {
		.accordion__header,
		.accordion__icon,
		.accordion__panel {
			transition: none;
		}
	}
</style>
