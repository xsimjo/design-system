<script lang="ts">
	import type { Snippet } from 'svelte';
	import { createTabsContext } from './tabs.svelte.ts';

	interface Props {
		value?: string;
		defaultValue?: string;
		disabled?: boolean;
		children: Snippet;
	}

	let { value = $bindable(), defaultValue = '', disabled = false, children }: Props = $props();

	if (value === undefined) {
		value = defaultValue;
	}

	createTabsContext(
		() => value!,
		(id: string) => {
			value = id;
		},
		disabled
	);
</script>

<div class="tabs" class:tabs--disabled={disabled}>
	{@render children()}
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
</style>
