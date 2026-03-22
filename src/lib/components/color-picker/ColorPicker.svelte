<script lang="ts">
	import './color-picker.css';
	import { getContext } from 'svelte';
	import { FIELD_KEY } from '$lib/components/field/context.js';
	import type { FieldContext } from '$lib/components/field/context.js';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
		value?: string;
		fullWidth?: boolean;
		disabled?: boolean;
		id?: string;
		name?: string;
	}

	let {
		value = $bindable('#000000'),
		fullWidth = false,
		disabled = false,
		id,
		name,
		...restProps
	}: Props = $props();

	const field = getContext<FieldContext>(FIELD_KEY);

	const uniqueId = `color-picker-${Math.random().toString(36).slice(2, 9)}`;
	const inputId = $derived(id ?? field?.id ?? uniqueId);
	const isDisabled = $derived(disabled || !!field?.disabled);
	const hasError = $derived(!!field?.error);
	const describedBy = $derived(
		field?.descriptionIds.length ? field.descriptionIds.join(' ') : undefined
	);

	let colorInputEl = $state<HTMLInputElement | null>(null);

	const hexPattern = /^#[0-9a-fA-F]{6}$/;

	function handleTextInput(e: Event & { currentTarget: HTMLInputElement }) {
		const raw = e.currentTarget.value.trim();
		if (hexPattern.test(raw)) {
			value = raw.toLowerCase();
		}
	}

	function handleTextBlur(e: FocusEvent & { currentTarget: HTMLInputElement }) {
		e.currentTarget.value = value;
	}

	function handleSwatchClick() {
		colorInputEl?.click();
	}
</script>

<div
	class="color-picker"
	class:color-picker--full-width={fullWidth}
	class:color-picker--disabled={isDisabled}
	{...restProps}
>
	<div
		id={inputId}
		class="color-picker__trigger"
		class:color-picker__trigger--error={hasError}
		class:color-picker__trigger--disabled={isDisabled}
		role="group"
		aria-label="Color picker"
		aria-describedby={describedBy}
	>
		<input
			bind:this={colorInputEl}
			class="color-picker__native"
			type="color"
			disabled={isDisabled}
			bind:value
			tabindex="-1"
			aria-hidden="true"
		/>
		<button
			type="button"
			class="color-picker__swatch"
			style:background-color={value}
			tabindex="-1"
			aria-hidden="true"
			disabled={isDisabled}
			onclick={handleSwatchClick}
		></button>
		<input
			class="color-picker__text"
			type="text"
			{value}
			placeholder="#000000"
			maxlength={7}
			disabled={isDisabled}
			aria-label="Hex color value"
			aria-required={field?.required || undefined}
			aria-invalid={hasError || undefined}
			oninput={handleTextInput}
			onblur={handleTextBlur}
		/>
	</div>

	{#if name}
		<input type="hidden" {name} {value} />
	{/if}
</div>
