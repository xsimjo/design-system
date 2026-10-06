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
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledby,
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

	/** Uncommitted text while the user types; `null` means the field mirrors `value`. */
	let draft = $state<string | null>(null);

	const displayed = $derived(draft ?? value);
	const isInvalidDraft = $derived(draft !== null && parseHex(draft) === null);

	/** Accepts `#rgb`, `rgb`, `#rrggbb` or `rrggbb`; returns a lowercase 6-digit hex. */
	function parseHex(raw: string): string | null {
		const body = raw.trim().replace(/^#/, '');
		if (/^[0-9a-f]{3}$/i.test(body)) {
			return `#${body
				.split('')
				.map((c) => c + c)
				.join('')
				.toLowerCase()}`;
		}
		if (/^[0-9a-f]{6}$/i.test(body)) return `#${body.toLowerCase()}`;
		return null;
	}

	function handleTextInput(e: Event & { currentTarget: HTMLInputElement }) {
		draft = e.currentTarget.value;
		const parsed = parseHex(draft);
		if (parsed) value = parsed;
	}

	function handleTextBlur() {
		draft = null;
	}

	function handleNativeInput() {
		draft = null;
	}

	function handleSwatchClick() {
		colorInputEl?.click();
	}

	const swatchLabel = $derived(ariaLabel ? `${ariaLabel}: choose color` : 'Choose color');
</script>

<div
	class="color-picker"
	class:color-picker--full-width={fullWidth}
	class:color-picker--disabled={isDisabled}
	{...restProps}
>
	<div
		class="color-picker__trigger"
		class:color-picker__trigger--error={hasError || isInvalidDraft}
		class:color-picker__trigger--disabled={isDisabled}
	>
		<input
			bind:this={colorInputEl}
			class="color-picker__native"
			type="color"
			disabled={isDisabled}
			bind:value
			oninput={handleNativeInput}
			tabindex="-1"
			aria-hidden="true"
		/>
		<button
			type="button"
			class="color-picker__swatch"
			style:background-color={value}
			disabled={isDisabled}
			aria-label={swatchLabel}
			aria-haspopup="dialog"
			onclick={handleSwatchClick}
		></button>
		<input
			id={inputId}
			class="color-picker__text"
			type="text"
			value={displayed}
			placeholder="#000000"
			maxlength={7}
			spellcheck="false"
			autocapitalize="off"
			autocomplete="off"
			inputmode="text"
			disabled={isDisabled}
			aria-label={ariaLabelledby
				? undefined
				: (ariaLabel ?? (field ? undefined : 'Hex color value'))}
			aria-labelledby={ariaLabelledby}
			aria-describedby={describedBy}
			aria-required={field?.required || undefined}
			aria-invalid={hasError || isInvalidDraft || undefined}
			oninput={handleTextInput}
			onblur={handleTextBlur}
		/>
	</div>

	{#if name}
		<input type="hidden" {name} {value} />
	{/if}
</div>
