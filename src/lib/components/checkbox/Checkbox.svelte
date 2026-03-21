<script lang="ts">
	import './checkbox.css';
	import { getContext } from 'svelte';
	import { FIELD_KEY } from '$lib/components/field/context.js';
	import type { FieldContext } from '$lib/components/field/context.js';
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface Props extends Omit<HTMLInputAttributes, 'checked' | 'type' | 'size'> {
		checked?: boolean;
		indeterminate?: boolean;
		disabled?: boolean;
		id?: string;
	}

	let {
		checked = $bindable(false),
		indeterminate = $bindable(false),
		disabled = false,
		id,
		...restProps
	}: Props = $props();

	const field = getContext<FieldContext>(FIELD_KEY);

	const uniqueId = `checkbox-${Math.random().toString(36).slice(2, 9)}`;
	const checkboxId = $derived(id ?? field?.id ?? uniqueId);
	const isDisabled = $derived(disabled || !!field?.disabled);
	const hasError = $derived(!!field?.error);
	const describedBy = $derived(
		field?.descriptionIds.length ? field.descriptionIds.join(' ') : undefined
	);
</script>

<input
	type="checkbox"
	class="checkbox__input"
	class:checkbox__input--error={hasError}
	id={checkboxId}
	disabled={isDisabled}
	aria-describedby={describedBy}
	aria-required={field?.required || undefined}
	aria-invalid={hasError || undefined}
	bind:checked
	bind:indeterminate
	{...restProps}
/>
