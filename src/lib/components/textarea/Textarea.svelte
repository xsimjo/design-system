<script lang="ts">
	import './textarea.css';
	import { getContext } from 'svelte';
	import { FIELD_KEY } from '$lib/components/field/context.js';
	import type { FieldContext } from '$lib/components/field/context.js';
	import type { HTMLTextareaAttributes } from 'svelte/elements';

	interface Props extends Omit<HTMLTextareaAttributes, 'value'> {
		value?: string;
		fullWidth?: boolean;
		resize?: 'none' | 'vertical' | 'horizontal' | 'both';
	}

	let {
		value = $bindable(''),
		fullWidth = false,
		resize = 'vertical',
		disabled = false,
		id,
		...restProps
	}: Props = $props();

	const field = getContext<FieldContext>(FIELD_KEY);

	const uniqueId = `textarea-${Math.random().toString(36).slice(2, 9)}`;
	const textareaId = $derived(id ?? field?.id ?? uniqueId);
	const isDisabled = $derived(disabled || !!field?.disabled);
	const hasError = $derived(!!field?.error);
	const describedBy = $derived(
		field?.descriptionIds.length ? field.descriptionIds.join(' ') : undefined
	);
</script>

<textarea
	class="textarea__field"
	class:textarea__field--full-width={fullWidth}
	class:textarea__field--error={hasError}
	style:resize
	id={textareaId}
	disabled={isDisabled}
	aria-describedby={describedBy}
	aria-required={field?.required || undefined}
	aria-invalid={hasError || undefined}
	bind:value
	{...restProps}></textarea>
