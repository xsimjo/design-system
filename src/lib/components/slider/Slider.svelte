<script lang="ts">
	import './slider.css';
	import { getContext } from 'svelte';
	import { FIELD_KEY } from '$lib/components/field/context.js';
	import type { FieldContext } from '$lib/components/field/context.js';
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface Props extends Omit<
		HTMLInputAttributes,
		'value' | 'size' | 'type' | 'min' | 'max' | 'step'
	> {
		value?: number;
		min?: number;
		max?: number;
		step?: number;
		fullWidth?: boolean;
		showValue?: boolean;
		disabled?: boolean;
		id?: string;
	}

	let {
		value = $bindable(0),
		min = 0,
		max = 100,
		step = 1,
		fullWidth = false,
		showValue = false,
		disabled = false,
		id,
		...restProps
	}: Props = $props();

	const field = getContext<FieldContext>(FIELD_KEY);

	const uniqueId = `slider-${Math.random().toString(36).slice(2)}`;
	const sliderId = $derived(id ?? field?.id ?? uniqueId);
	const isDisabled = $derived(disabled || !!field?.disabled);
	const hasError = $derived(!!field?.error);
	const describedBy = $derived(
		field?.descriptionIds.length ? field.descriptionIds.join(' ') : undefined
	);

	const fillPercent = $derived(
		max === min ? 0 : Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100))
	);

	// Stable width for the value display: pre-sized to the longest value in the range
	// so layout doesn't shift as the number changes.
	const valueWidth = $derived.by(() => {
		const decimals = step % 1 !== 0 ? (String(step).split('.')[1]?.length ?? 0) : 0;
		const fmt = (n: number) => (decimals > 0 ? n.toFixed(decimals) : String(n));
		return `${Math.max(fmt(min).length, fmt(max).length)}ch`;
	});
</script>

<div class="slider__wrapper" class:slider__wrapper--full-width={fullWidth}>
	<input
		type="range"
		class="slider__input"
		class:slider__input--error={hasError}
		id={sliderId}
		disabled={isDisabled}
		{min}
		{max}
		{step}
		aria-describedby={describedBy}
		aria-invalid={hasError || undefined}
		style:--slider-fill-percent="{fillPercent}%"
		bind:value
		{...restProps}
	/>
	{#if showValue}
		<span class="slider__value" style:width={valueWidth}>{value}</span>
	{/if}
</div>
