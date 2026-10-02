<script lang="ts">
	import './segmented-control.css';
	import { getContext, setContext } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';
	import { FIELD_KEY } from '$lib/components/field/context.js';
	import type { FieldContext } from '$lib/components/field/context.js';
	import { SEGMENTED_CONTROL_KEY } from './context.ts';
	import type { SegmentedControlContext } from './context.ts';

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'onchange'> {
		value?: string;
		/** Accessible name for the group. Required unless the consumer supplies
		 * `aria-label`/`aria-labelledby`, since `role="radiogroup"` needs a name. */
		label?: string;
		size?: 'sm' | 'md' | 'lg';
		fullWidth?: boolean;
		disabled?: boolean;
		id?: string;
		name?: string;
		onchange?: (value: string) => void;
		children: Snippet;
	}

	let {
		value = $bindable(''),
		label,
		size = 'md',
		fullWidth = false,
		disabled = false,
		id,
		name,
		onchange,
		children,
		...restProps
	}: Props = $props();

	const field = getContext<FieldContext>(FIELD_KEY);

	const uniqueId = `segmented-control-${Math.random().toString(36).slice(2, 9)}`;
	const groupId = $derived(id ?? field?.id ?? uniqueId);
	const isDisabled = $derived(disabled || !!field?.disabled);
	const hasError = $derived(!!field?.error);
	const describedBy = $derived(
		field?.descriptionIds.length ? field.descriptionIds.join(' ') : undefined
	);

	let values = $state<string[]>([]);
	const focusValue = $derived(values.includes(value) ? value : values[0]);

	function select(val: string) {
		if (isDisabled) return;
		value = val;
		onchange?.(val);
	}

	setContext<SegmentedControlContext>(SEGMENTED_CONTROL_KEY, {
		activeValue: () => value,
		focusValue: () => focusValue,
		select,
		size: () => size,
		disabled: () => isDisabled,
		error: () => hasError,
		register(val: string) {
			values = [...values, val];
		},
		unregister(val: string) {
			values = values.filter((v) => v !== val);
		}
	});

	function handleKeydown(e: KeyboardEvent) {
		const group = e.currentTarget as HTMLElement;
		const items = Array.from(
			group.querySelectorAll<HTMLButtonElement>('[role="radio"]:not(:disabled)')
		);
		const current = items.indexOf(document.activeElement as HTMLButtonElement);
		if (current < 0) return;

		let next = -1;
		if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
			next = (current + 1) % items.length;
		} else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
			next = (current - 1 + items.length) % items.length;
		} else if (e.key === 'Home') {
			next = 0;
		} else if (e.key === 'End') {
			next = items.length - 1;
		}

		if (next >= 0) {
			e.preventDefault();
			items[next].focus();
			items[next].click();
		}
	}
</script>

<div
	id={groupId}
	class="segmented-control segmented-control--{size}"
	class:segmented-control--full-width={fullWidth}
	class:segmented-control--error={hasError}
	class:segmented-control--disabled={isDisabled}
	role="radiogroup"
	aria-label={label}
	aria-describedby={describedBy}
	aria-invalid={hasError || undefined}
	aria-required={field?.required || undefined}
	aria-disabled={isDisabled || undefined}
	onkeydown={handleKeydown}
	{...restProps}
>
	{@render children()}

	{#if name}
		<input type="hidden" {name} {value} />
	{/if}
</div>
