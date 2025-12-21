<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface Props extends Omit<HTMLInputAttributes, 'type' | 'value'> {
		value?: number;
		min?: number;
		max?: number;
		step?: number;
		label?: string;
		helperText?: string;
		showValue?: boolean;
	}

	let {
		value = $bindable(0),
		min = 0,
		max = 100,
		step = 1,
		disabled = false,
		label,
		helperText,
		showValue = false,
		id,
		...restProps
	}: Props = $props();

	const inputId = id ?? crypto.randomUUID();
	const helperId = `${inputId}-helper`;

	const fillPercentage = $derived(((value - min) / (max - min)) * 100);
</script>

<div class="slider-wrapper" class:slider-wrapper--disabled={disabled}>
	{#if label || showValue}
		<div class="slider-header">
			{#if label}
				<label for={inputId} class="slider-label">{label}</label>
			{/if}
			{#if showValue}
				<span class="slider-value">{value}</span>
			{/if}
		</div>
	{/if}

	<div class="slider-container">
		<input
			type="range"
			id={inputId}
			class="slider"
			bind:value
			{min}
			{max}
			{step}
			{disabled}
			aria-describedby={helperText ? helperId : undefined}
			style="--fill-percentage: {fillPercentage}%"
			{...restProps}
		/>
	</div>

	{#if helperText}
		<span id={helperId} class="slider-helper">{helperText}</span>
	{/if}
</div>

<style>
	.slider-wrapper {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
		width: 100%;
	}

	.slider-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.slider-label {
		font-family: var(--font-sans);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		color: var(--input-label-color);
	}

	.slider-wrapper--disabled .slider-label {
		color: var(--input-label-color-disabled);
	}

	.slider-value {
		font-family: var(--font-sans);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		color: var(--input-text);
	}

	.slider-wrapper--disabled .slider-value {
		color: var(--input-text-disabled);
	}

	.slider-container {
		position: relative;
		display: flex;
		align-items: center;
		height: var(--slider-thumb-size);
	}

	.slider {
		appearance: none;
		width: 100%;
		height: var(--slider-track-height);
		background: linear-gradient(
			to right,
			var(--slider-fill-bg) 0%,
			var(--slider-fill-bg) var(--fill-percentage),
			var(--slider-track-bg) var(--fill-percentage),
			var(--slider-track-bg) 100%
		);
		border-radius: var(--slider-track-border-radius);
		cursor: var(--slider-cursor-default);
		transition: background var(--slider-transition);
	}

	.slider:disabled {
		background: linear-gradient(
			to right,
			var(--slider-fill-bg-disabled) 0%,
			var(--slider-fill-bg-disabled) var(--fill-percentage),
			var(--slider-track-bg-disabled) var(--fill-percentage),
			var(--slider-track-bg-disabled) 100%
		);
		cursor: var(--slider-cursor-disabled);
		opacity: var(--slider-opacity-disabled);
	}

	.slider::-webkit-slider-thumb {
		appearance: none;
		width: var(--slider-thumb-size);
		height: var(--slider-thumb-size);
		background: var(--slider-thumb-bg);
		border: var(--slider-thumb-border-width) solid var(--slider-thumb-border);
		border-radius: var(--slider-thumb-border-radius);
		box-shadow: var(--slider-thumb-shadow);
		cursor: var(--slider-cursor-default);
		transition: all var(--slider-transition);
	}

	.slider::-moz-range-thumb {
		appearance: none;
		width: var(--slider-thumb-size);
		height: var(--slider-thumb-size);
		background: var(--slider-thumb-bg);
		border: var(--slider-thumb-border-width) solid var(--slider-thumb-border);
		border-radius: var(--slider-thumb-border-radius);
		box-shadow: var(--slider-thumb-shadow);
		cursor: var(--slider-cursor-default);
		transition: all var(--slider-transition);
	}

	.slider:hover:not(:disabled)::-webkit-slider-thumb {
		background: var(--slider-thumb-bg-hover);
		border-color: var(--slider-thumb-border-hover);
		box-shadow: var(--slider-thumb-shadow-hover);
	}

	.slider:hover:not(:disabled)::-moz-range-thumb {
		background: var(--slider-thumb-bg-hover);
		border-color: var(--slider-thumb-border-hover);
		box-shadow: var(--slider-thumb-shadow-hover);
	}

	.slider:active:not(:disabled)::-webkit-slider-thumb {
		background: var(--slider-thumb-bg-active);
		border-color: var(--slider-thumb-border-active);
		box-shadow: var(--slider-thumb-shadow-active);
	}

	.slider:active:not(:disabled)::-moz-range-thumb {
		background: var(--slider-thumb-bg-active);
		border-color: var(--slider-thumb-border-active);
		box-shadow: var(--slider-thumb-shadow-active);
	}

	.slider:focus-visible {
		outline: none;
	}

	.slider:focus-visible::-webkit-slider-thumb {
		box-shadow:
			var(--slider-thumb-shadow-focus),
			0 0 0 var(--slider-focus-ring-offset) var(--slider-thumb-bg),
			0 0 0 calc(var(--slider-focus-ring-offset) + var(--slider-focus-ring-width))
				var(--slider-focus-ring-color);
	}

	.slider:focus-visible::-moz-range-thumb {
		box-shadow:
			var(--slider-thumb-shadow-focus),
			0 0 0 var(--slider-focus-ring-offset) var(--slider-thumb-bg),
			0 0 0 calc(var(--slider-focus-ring-offset) + var(--slider-focus-ring-width))
				var(--slider-focus-ring-color);
	}

	.slider:disabled::-webkit-slider-thumb {
		background: var(--slider-thumb-bg-disabled);
		border-color: var(--slider-thumb-border-disabled);
		box-shadow: var(--slider-thumb-shadow-disabled);
		cursor: var(--slider-cursor-disabled);
	}

	.slider:disabled::-moz-range-thumb {
		background: var(--slider-thumb-bg-disabled);
		border-color: var(--slider-thumb-border-disabled);
		box-shadow: var(--slider-thumb-shadow-disabled);
		cursor: var(--slider-cursor-disabled);
	}

	.slider-helper {
		font-family: var(--font-sans);
		font-size: var(--font-size-sm);
		color: var(--input-helper-color);
	}

	.slider-wrapper--disabled .slider-helper {
		color: var(--input-helper-color-disabled);
	}
</style>
