<script lang="ts">
	import type { Snippet } from 'svelte';
	import { getTabsContext } from './tabs.svelte.ts';

	interface Props {
		id: string;
		disabled?: boolean;
		children: Snippet;
	}

	let { id, disabled = false, children }: Props = $props();

	const ctx = getTabsContext();

	ctx.tabs.add(id);

	let isActive = $derived(ctx.value === id);
	let isDisabled = $derived(ctx.disabled || disabled);

	function selectTab() {
		if (isDisabled) return;
		ctx.setValue(id);
	}

	function handleKeydown(event: KeyboardEvent) {
		if (isDisabled) return;

		const tabs = Array.from(ctx.tabs);
		const currentIndex = tabs.indexOf(id);

		switch (event.key) {
			case 'ArrowRight':
				event.preventDefault();
				if (currentIndex < tabs.length - 1) {
					const nextId = tabs[currentIndex + 1];
					ctx.setValue(nextId);
					document.getElementById(`tab-${nextId}`)?.focus();
				}
				break;
			case 'ArrowLeft':
				event.preventDefault();
				if (currentIndex > 0) {
					const prevId = tabs[currentIndex - 1];
					ctx.setValue(prevId);
					document.getElementById(`tab-${prevId}`)?.focus();
				}
				break;
			case 'Home':
				event.preventDefault();
				if (tabs.length > 0) {
					ctx.setValue(tabs[0]);
					document.getElementById(`tab-${tabs[0]}`)?.focus();
				}
				break;
			case 'End':
				event.preventDefault();
				if (tabs.length > 0) {
					const lastId = tabs[tabs.length - 1];
					ctx.setValue(lastId);
					document.getElementById(`tab-${lastId}`)?.focus();
				}
				break;
		}
	}
</script>

<button
	type="button"
	id="tab-{id}"
	class="tabs__trigger"
	class:tabs__trigger--active={isActive}
	class:tabs__trigger--disabled={isDisabled}
	role="tab"
	aria-selected={isActive}
	aria-controls="panel-{id}"
	aria-disabled={isDisabled || undefined}
	tabindex={isActive ? 0 : -1}
	disabled={isDisabled}
	onclick={selectTab}
	onkeydown={handleKeydown}
>
	{@render children()}
</button>

<style>
	.tabs__trigger {
		display: inline-flex;
		align-items: center;
		gap: var(--tabs-trigger-gap, var(--space-2));
		padding: var(--tabs-trigger-padding-y) var(--tabs-trigger-padding-x);
		background: var(--tabs-trigger-bg);
		border: none;
		border-bottom: var(--tabs-trigger-border-width) solid var(--tabs-trigger-border);
		border-radius: var(--tabs-trigger-border-radius);
		margin-bottom: calc(var(--tabs-list-border-width) * -1);
		cursor: var(--tabs-cursor-default);
		font-family: var(--tabs-trigger-font-family);
		font-size: var(--tabs-trigger-font-size);
		font-weight: var(--tabs-trigger-font-weight);
		line-height: var(--tabs-trigger-line-height);
		color: var(--tabs-trigger-text);
		transition: all var(--tabs-transition-duration);
	}

	.tabs__trigger:hover:not(:disabled) {
		background: var(--tabs-trigger-bg-hover);
		color: var(--tabs-trigger-text-hover);
		border-bottom-color: var(--tabs-trigger-border-hover);
	}

	.tabs__trigger:focus-visible {
		outline: none;
		box-shadow:
			0 0 0 var(--tabs-focus-ring-offset) var(--tabs-container-bg, white),
			0 0 0 calc(var(--tabs-focus-ring-offset) + var(--tabs-focus-ring-width))
				var(--tabs-focus-ring-color);
	}

	.tabs__trigger--active {
		background: var(--tabs-trigger-bg-active);
		color: var(--tabs-trigger-text-active);
		border-bottom-color: var(--tabs-trigger-border-active);
		font-weight: var(--tabs-trigger-font-weight-active);
	}

	.tabs__trigger--disabled {
		cursor: var(--tabs-cursor-disabled);
		background: var(--tabs-trigger-bg-disabled);
		color: var(--tabs-trigger-text-disabled);
		border-bottom-color: var(--tabs-trigger-border-disabled);
	}

	@media (prefers-reduced-motion: reduce) {
		.tabs__trigger {
			transition: none;
		}
	}
</style>
