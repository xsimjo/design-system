<script lang="ts">
	import './input.css';
	import { getContext } from 'svelte';
	import type { Snippet } from 'svelte';
	import { FIELD_KEY } from '$lib/components/field/context.js';
	import type { FieldContext } from '$lib/components/field/context.js';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import XIcon from '$lib/icons/XIcon.svelte';

	interface Props extends Omit<HTMLInputAttributes, 'value' | 'size'> {
		value?: string | number;
		fullWidth?: boolean;
		icon?: Snippet;
		clearable?: boolean;
		onclear?: () => void;
	}

	let {
		value = $bindable(''),
		fullWidth = false,
		disabled = false,
		icon,
		clearable = false,
		onclear,
		id,
		...restProps
	}: Props = $props();

	const field = getContext<FieldContext>(FIELD_KEY);

	const uniqueId = `input-${Math.random().toString(36).slice(2, 9)}`;
	const inputId = $derived(id ?? field?.id ?? uniqueId);
	const isDisabled = $derived(disabled || !!field?.disabled);
	const hasError = $derived(!!field?.error);
	const describedBy = $derived(
		field?.descriptionIds.length ? field.descriptionIds.join(' ') : undefined
	);

	const hasClearButton = $derived(clearable && !!value && !isDisabled);

	function handleClear() {
		value = '';
		onclear?.();
	}
</script>

{#if icon || clearable}
	<div class="input" class:input--full-width={fullWidth}>
		{#if icon}
			<span class="input__icon" aria-hidden="true">
				{@render icon()}
			</span>
		{/if}
		<input
			class="input__field input__field--full-width"
			class:input__field--error={hasError}
			class:input__field--has-icon={icon}
			class:input__field--has-clear={clearable}
			id={inputId}
			disabled={isDisabled}
			aria-describedby={describedBy}
			aria-required={field?.required || undefined}
			aria-invalid={hasError || undefined}
			bind:value
			{...restProps}
		/>
		{#if hasClearButton}
			<button
				type="button"
				class="input__clear"
				aria-label="Clear input"
				onclick={handleClear}
				tabindex={-1}
			>
				<XIcon size={16} aria-hidden="true" />
			</button>
		{/if}
	</div>
{:else}
	<input
		class="input__field"
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
{/if}
