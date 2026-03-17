<script lang="ts">
	import './radio.css';
	import { getContext } from 'svelte';
	import { FIELD_KEY } from '$lib/components/field/context.js';
	import type { FieldContext } from '$lib/components/field/context.js';
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface Props extends Omit<HTMLInputAttributes, 'type' | 'size'> {
		group?: unknown;
		value?: unknown;
		size?: 'sm' | 'md' | 'lg';
		disabled?: boolean;
		id?: string;
	}

	let {
		group = $bindable(),
		value,
		size = 'md',
		disabled = false,
		id,
		...restProps
	}: Props = $props();

	const field = getContext<FieldContext>(FIELD_KEY);
	const uniqueId = `radio-${Math.random().toString(36).slice(2)}`;
	const radioId = $derived(id ?? field?.id ?? uniqueId);
	const isDisabled = $derived(disabled || !!field?.disabled);
	const hasError = $derived(!!field?.error);
	const describedBy = $derived(
		field?.descriptionIds.length ? field.descriptionIds.join(' ') : undefined
	);
</script>

<input
	type="radio"
	class="radio__input radio__input--{size}"
	class:radio__input--error={hasError}
	id={radioId}
	disabled={isDisabled}
	aria-describedby={describedBy}
	bind:group
	{value}
	{...restProps}
/>
