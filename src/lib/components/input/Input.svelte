<script lang="ts">
	import './input.css';
	import { getContext } from 'svelte';
	import { FIELD_KEY } from '$lib/components/field/context.js';
	import type { FieldContext } from '$lib/components/field/context.js';
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface Props extends Omit<HTMLInputAttributes, 'value' | 'size'> {
		value?: string | number;
		size?: 'sm' | 'md' | 'lg';
		fullWidth?: boolean;
	}

	let {
		value = $bindable(''),
		size = 'md',
		fullWidth = false,
		disabled = false,
		id,
		...restProps
	}: Props = $props();

	const field = getContext<FieldContext>(FIELD_KEY);

	const uniqueId = `input-${Math.random().toString(36).slice(2)}`;
	const inputId = $derived(id ?? field?.id ?? uniqueId);
	const isDisabled = $derived(disabled || !!field?.disabled);
	const hasError = $derived(!!field?.error);
	const describedBy = $derived(
		field?.descriptionIds.length ? field.descriptionIds.join(' ') : undefined
	);
</script>

<input
	class="input__field input__field--{size}"
	class:input__field--full-width={fullWidth}
	class:input__field--error={hasError}
	id={inputId}
	disabled={isDisabled}
	aria-describedby={describedBy}
	aria-required={field?.required || undefined}
	aria-invalid={hasError || undefined}
	bind:value
	{...restProps}
/>
