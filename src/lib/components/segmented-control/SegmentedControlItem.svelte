<script lang="ts">
	import './segmented-control.css';
	import { getContext, untrack } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';
	import { SEGMENTED_CONTROL_KEY } from './context.ts';
	import type { SegmentedControlContext } from './context.ts';

	interface Props extends Omit<HTMLButtonAttributes, 'children'> {
		value: string;
		children: Snippet;
	}

	let { value, disabled = false, children, ...restProps }: Props = $props();

	const group = getContext<SegmentedControlContext>(SEGMENTED_CONTROL_KEY);

	const isActive = $derived(group.activeValue() === value);
	const isDisabled = $derived(disabled || group.disabled());
	const size = $derived(group.size());

	$effect(() => {
		if (isDisabled) return;
		// untrack: register writes the group's value list, which this effect must not depend on.
		untrack(() => group.register(value));
		return () => group.unregister(value);
	});

	function handleClick() {
		if (!isDisabled) group.select(value);
	}
</script>

<button
	type="button"
	class="segmented-control__item segmented-control__item--{size}"
	class:segmented-control__item--active={isActive}
	role="radio"
	aria-checked={isActive}
	tabindex={group.focusValue() === value ? 0 : -1}
	disabled={isDisabled}
	onclick={handleClick}
	{...restProps}
>
	{@render children()}
</button>
