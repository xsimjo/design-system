<script lang="ts">
	import type { Snippet } from 'svelte';

	interface TabItem {
		id: string;
		label: string;
		content: string | Snippet;
		disabled?: boolean;
	}

	interface Props {
		items: TabItem[];
		value?: string;
		disabled?: boolean;
	}

	let { items, value = $bindable(items[0]?.id), disabled = false }: Props = $props();

	function selectTab(tabId: string) {
		const item = items.find((i) => i.id === tabId);
		if (disabled || item?.disabled) return;
		value = tabId;
	}

	function handleKeydown(event: KeyboardEvent, tabId: string) {
		const item = items.find((i) => i.id === tabId);
		if (disabled || item?.disabled) return;

		const enabledItems = items.filter((i) => !i.disabled && !disabled);
		const currentEnabledIndex = enabledItems.findIndex((i) => i.id === tabId);

		switch (event.key) {
			case 'ArrowRight':
				event.preventDefault();
				if (currentEnabledIndex < enabledItems.length - 1) {
					const nextItem = enabledItems[currentEnabledIndex + 1];
					selectTab(nextItem.id);
					document.getElementById(`tab-${nextItem.id}`)?.focus();
				}
				break;
			case 'ArrowLeft':
				event.preventDefault();
				if (currentEnabledIndex > 0) {
					const prevItem = enabledItems[currentEnabledIndex - 1];
					selectTab(prevItem.id);
					document.getElementById(`tab-${prevItem.id}`)?.focus();
				}
				break;
			case 'Home':
				event.preventDefault();
				if (enabledItems.length > 0) {
					selectTab(enabledItems[0].id);
					document.getElementById(`tab-${enabledItems[0].id}`)?.focus();
				}
				break;
			case 'End':
				event.preventDefault();
				if (enabledItems.length > 0) {
					const lastItem = enabledItems[enabledItems.length - 1];
					selectTab(lastItem.id);
					document.getElementById(`tab-${lastItem.id}`)?.focus();
				}
				break;
		}
	}
</script>

<div class="tabs" class:tabs--disabled={disabled}>
	<div class="tabs__list" role="tablist">
		{#each items as item (item.id)}
			{@const isActive = value === item.id}
			{@const isDisabled = disabled || item.disabled}
			<button
				type="button"
				id="tab-{item.id}"
				class="tabs__trigger"
				class:tabs__trigger--active={isActive}
				class:tabs__trigger--disabled={isDisabled}
				role="tab"
				aria-selected={isActive}
				aria-controls="panel-{item.id}"
				aria-disabled={isDisabled || undefined}
				tabindex={isActive ? 0 : -1}
				disabled={isDisabled}
				onclick={() => selectTab(item.id)}
				onkeydown={(e) => handleKeydown(e, item.id)}
			>
				{item.label}
			</button>
		{/each}
	</div>

	{#each items as item (item.id)}
		{@const isActive = value === item.id}
		<div
			id="panel-{item.id}"
			class="tabs__panel"
			class:tabs__panel--active={isActive}
			role="tabpanel"
			aria-labelledby="tab-{item.id}"
			hidden={!isActive}
		>
			{#if typeof item.content === 'string'}
				{item.content}
			{:else}
				{@render item.content()}
			{/if}
		</div>
	{/each}
</div>

<style>
	.tabs {
		background: var(--tabs-container-bg);
		border: var(--tabs-container-border-width) solid var(--tabs-container-border);
		border-radius: var(--tabs-container-radius);
		padding: var(--tabs-container-padding);
	}

	.tabs--disabled {
		opacity: var(--tabs-opacity-disabled);
	}

	.tabs__list {
		display: flex;
		gap: var(--tabs-list-gap);
		padding: var(--tabs-list-padding);
		background: var(--tabs-list-bg);
		border-bottom: var(--tabs-list-border-width) solid var(--tabs-list-border);
	}

	.tabs__trigger {
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

	.tabs__panel {
		padding: var(--tabs-panel-padding-y) var(--tabs-panel-padding-x);
		background: var(--tabs-panel-bg);
		border: var(--tabs-panel-border-width) solid var(--tabs-panel-border);
		border-radius: var(--tabs-panel-border-radius);
		color: var(--tabs-panel-text);
	}

	.tabs__panel[hidden] {
		display: none;
	}

	@media (prefers-reduced-motion: reduce) {
		.tabs__trigger {
			transition: none;
		}
	}
</style>
