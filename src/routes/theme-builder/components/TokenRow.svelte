<script lang="ts">
	import type { SelectOption } from '$lib/components/select/Select.svelte';
	import type { TokenMeta } from '../lib/token-definitions.js';
	import Input from '$lib/components/input/Input.svelte';
	import Slider from '$lib/components/slider/Slider.svelte';
	import Select from '$lib/components/select/Select.svelte';
	import OklchEditor from './OklchEditor.svelte';

	interface Props {
		meta: TokenMeta;
		value: string;
		onchange?: (name: string, value: string) => void;
	}

	let { meta, value, onchange }: Props = $props();

	// --- Numeric controls (dimension, duration, percentage) ---

	function getUnit(raw: string): string {
		if (meta.type === 'duration') return 'ms';
		if (meta.type === 'percentage') return '%';
		return raw.replace(/[\d.-]/g, '') || 'px';
	}

	function handleSliderInput(e: Event) {
		const target = e.target as HTMLInputElement;
		const num = parseFloat(target.value);
		onchange?.(meta.name, `${num}${getUnit(value)}`);
	}

	// --- Text/number inputs ---

	function handleTextInput(e: Event) {
		const target = e.target as HTMLInputElement;
		onchange?.(meta.name, target.value);
	}

	// --- Select ---

	let selectValue = $derived(value);

	$effect(() => {
		if (selectValue !== value) {
			onchange?.(meta.name, selectValue);
		}
	});

	const selectOptions: SelectOption[] = $derived(
		(meta.options ?? []).map((o) => ({ value: o, label: o }))
	);

	// --- Color ---

	function handleColorChange(newValue: string) {
		onchange?.(meta.name, newValue);
	}

	// --- Derived numeric value for slider display ---

	const numericValue = $derived(parseFloat(value) || 0);
</script>

<div class="token-row">
	<div class="token-row__header">
		<span class="token-row__label">{meta.label}</span>
		<code class="token-row__name">{meta.name}</code>
	</div>
	<div class="token-row__control">
		{#if meta.type === 'color-oklch'}
			<OklchEditor {value} label={meta.label} onchange={handleColorChange} />
		{:else if meta.type === 'color-oklch-alpha'}
			<OklchEditor {value} hasAlpha label={meta.label} onchange={handleColorChange} />
		{:else if meta.type === 'dimension' || meta.type === 'duration' || meta.type === 'percentage'}
			<div class="token-row__slider-wrapper">
				<Slider
					value={numericValue}
					min={meta.min ?? 0}
					max={meta.max ?? 100}
					step={meta.step ?? 1}
					showValue
					fullWidth
					oninput={handleSliderInput}
					aria-label={meta.label}
				/>
				<span class="token-row__unit">{getUnit(value)}</span>
			</div>
		{:else if meta.type === 'number'}
			<Input
				type="number"
				{value}
				min={meta.min}
				max={meta.max}
				step={meta.step}
				oninput={handleTextInput}
				aria-label={meta.label}
			/>
		{:else if meta.type === 'color-keyword'}
			<Select bind:value={selectValue} options={selectOptions} />
		{:else}
			<Input type="text" {value} fullWidth oninput={handleTextInput} aria-label={meta.label} />
		{/if}
	</div>
</div>

<style>
	.token-row {
		display: flex;
		flex-direction: column;
		gap: calc(var(--ui-base-spacing) * 0.5);
		padding: calc(var(--ui-base-spacing) * 1.5) 0;
	}

	.token-row__header {
		display: flex;
		align-items: baseline;
		gap: var(--ui-base-spacing);
	}

	.token-row__label {
		font-size: var(--ui-text-sm);
		font-weight: var(--ui-weight-medium);
		color: var(--ui-surface-foreground);
	}

	.token-row__name {
		font-size: var(--ui-text-xs);
		font-family: var(--ui-font-mono);
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 50%);
	}

	.token-row__control {
		width: 100%;
	}

	.token-row__slider-wrapper {
		display: flex;
		align-items: center;
		gap: var(--ui-base-spacing);
	}

	.token-row__unit {
		font-size: var(--ui-text-xs);
		font-family: var(--ui-font-mono);
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 40%);
		flex-shrink: 0;
		min-width: 24px;
	}
</style>
