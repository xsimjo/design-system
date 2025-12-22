<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface Props extends Omit<HTMLInputAttributes, 'size'> {
		value?: string;
		size?: 'sm' | 'md' | 'lg';
		error?: boolean;
		success?: boolean;
		label?: string;
		helperText?: string;
		iconLeft?: Snippet;
		iconRight?: Snippet;
	}

	let {
		value = $bindable(''),
		size = 'md',
		disabled = false,
		readonly = false,
		error = false,
		success = false,
		label,
		helperText,
		iconLeft,
		iconRight,
		id,
		...restProps
	}: Props = $props();

	let idCounter = 0;
	function generateId() {
		return `input-${++idCounter}-${Math.random().toString(36).substring(2, 9)}`;
	}

	const inputId = id ?? crypto?.randomUUID?.() ?? generateId();
	const helperId = `${inputId}-helper`;
</script>

<div
	class="input-wrapper input-wrapper--{size}"
	class:input-wrapper--disabled={disabled}
	class:input-wrapper--error={error}
	class:input-wrapper--success={success}
>
	{#if label}
		<label for={inputId} class="input-label">{label}</label>
	{/if}

	<div class="input-container" class:input-container--readonly={readonly}>
		{#if iconLeft}
			<span class="input-icon input-icon--left">
				{@render iconLeft()}
			</span>
		{/if}

		<input
			{id}
			class="input"
			class:input--has-icon-left={iconLeft}
			class:input--has-icon-right={iconRight}
			bind:value
			{disabled}
			{readonly}
			aria-invalid={error || undefined}
			aria-describedby={helperText ? helperId : undefined}
			{...restProps}
		/>

		{#if iconRight}
			<span class="input-icon input-icon--right">
				{@render iconRight()}
			</span>
		{/if}
	</div>

	{#if helperText}
		<span id={helperId} class="input-helper">{helperText}</span>
	{/if}
</div>

<style>
	.input-wrapper {
		display: flex;
		flex-direction: column;
		gap: var(--input-label-gap);
		width: 100%;
	}

	.input-label {
		font-family: var(--input-label-font-family);
		font-weight: var(--input-label-font-weight);
		line-height: var(--input-label-line-height);
		color: var(--input-label-color);
	}

	.input-wrapper--sm .input-label {
		font-size: var(--input-label-font-size-sm);
	}

	.input-wrapper--md .input-label {
		font-size: var(--input-label-font-size-md);
	}

	.input-wrapper--lg .input-label {
		font-size: var(--input-label-font-size-lg);
	}

	.input-wrapper--disabled .input-label {
		color: var(--input-label-color-disabled);
	}

	.input-wrapper--error .input-label {
		color: var(--input-label-color-error);
	}

	.input-container {
		position: relative;
		display: flex;
		align-items: center;
	}

	.input {
		width: 100%;
		font-family: var(--input-font-family);
		font-weight: var(--input-font-weight);
		line-height: var(--input-line-height);
		background-color: var(--input-bg);
		border: var(--input-border-width) solid var(--input-border);
		border-radius: var(--input-border-radius);
		box-shadow: var(--input-shadow);
		color: var(--input-text);
		cursor: var(--input-cursor-default);
		transition: all var(--input-transition);
	}

	.input::placeholder {
		color: var(--input-text-placeholder);
	}

	.input-wrapper--sm .input {
		height: var(--input-sm-height);
		padding: var(--input-sm-padding-y) var(--input-sm-padding-x);
		font-size: var(--input-sm-font-size);
	}

	.input-wrapper--md .input {
		height: var(--input-md-height);
		padding: var(--input-md-padding-y) var(--input-md-padding-x);
		font-size: var(--input-md-font-size);
	}

	.input-wrapper--lg .input {
		height: var(--input-lg-height);
		padding: var(--input-lg-padding-y) var(--input-lg-padding-x);
		font-size: var(--input-lg-font-size);
	}

	.input-wrapper--sm .input--has-icon-left {
		padding-left: calc(
			var(--input-sm-icon-size) + var(--input-sm-icon-gap) + var(--input-sm-padding-x)
		);
	}

	.input-wrapper--sm .input--has-icon-right {
		padding-right: calc(
			var(--input-sm-icon-size) + var(--input-sm-icon-gap) + var(--input-sm-padding-x)
		);
	}

	.input-wrapper--md .input--has-icon-left {
		padding-left: calc(
			var(--input-md-icon-size) + var(--input-md-icon-gap) + var(--input-md-padding-x)
		);
	}

	.input-wrapper--md .input--has-icon-right {
		padding-right: calc(
			var(--input-md-icon-size) + var(--input-md-icon-gap) + var(--input-md-padding-x)
		);
	}

	.input-wrapper--lg .input--has-icon-left {
		padding-left: calc(
			var(--input-lg-icon-size) + var(--input-lg-icon-gap) + var(--input-lg-padding-x)
		);
	}

	.input-wrapper--lg .input--has-icon-right {
		padding-right: calc(
			var(--input-lg-icon-size) + var(--input-lg-icon-gap) + var(--input-lg-padding-x)
		);
	}

	.input:hover:not(:disabled):not(:read-only) {
		border-color: var(--input-border-hover);
		box-shadow: var(--input-shadow-hover);
	}

	.input:focus {
		outline: none;
		border-color: var(--input-border-focus);
		box-shadow:
			var(--input-shadow-focus),
			0 0 0 var(--input-focus-ring-offset) var(--input-bg),
			0 0 0 calc(var(--input-focus-ring-offset) + var(--input-focus-ring-width))
				var(--input-focus-ring-color);
	}

	.input:disabled {
		background-color: var(--input-bg-disabled);
		border-color: var(--input-border-disabled);
		color: var(--input-text-disabled);
		box-shadow: var(--input-shadow-disabled);
		cursor: var(--input-cursor-disabled);
		opacity: var(--input-opacity-disabled);
	}

	.input:read-only {
		background-color: var(--input-bg-readonly);
		cursor: var(--input-cursor-readonly);
	}

	.input-wrapper--error .input {
		border-color: var(--input-border-error);
	}

	.input-wrapper--error .input:focus {
		border-color: var(--input-border-error);
		box-shadow:
			var(--input-shadow-error),
			0 0 0 var(--input-focus-ring-offset) var(--input-bg),
			0 0 0 calc(var(--input-focus-ring-offset) + var(--input-focus-ring-width))
				var(--input-focus-ring-error);
	}

	.input-wrapper--success .input {
		border-color: var(--input-border-success);
	}

	.input-wrapper--success .input:focus {
		border-color: var(--input-border-success);
		box-shadow:
			var(--input-shadow-focus),
			0 0 0 var(--input-focus-ring-offset) var(--input-bg),
			0 0 0 calc(var(--input-focus-ring-offset) + var(--input-focus-ring-width))
				var(--input-focus-ring-success);
	}

	.input-icon {
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--input-icon-color);
		pointer-events: none;
	}

	.input-wrapper--disabled .input-icon {
		color: var(--input-icon-color-disabled);
	}

	.input-wrapper--sm .input-icon {
		width: var(--input-sm-icon-size);
		height: var(--input-sm-icon-size);
	}

	.input-wrapper--md .input-icon {
		width: var(--input-md-icon-size);
		height: var(--input-md-icon-size);
	}

	.input-wrapper--lg .input-icon {
		width: var(--input-lg-icon-size);
		height: var(--input-lg-icon-size);
	}

	.input-wrapper--sm .input-icon--left {
		left: var(--input-sm-padding-x);
	}

	.input-wrapper--sm .input-icon--right {
		right: var(--input-sm-padding-x);
	}

	.input-wrapper--md .input-icon--left {
		left: var(--input-md-padding-x);
	}

	.input-wrapper--md .input-icon--right {
		right: var(--input-md-padding-x);
	}

	.input-wrapper--lg .input-icon--left {
		left: var(--input-lg-padding-x);
	}

	.input-wrapper--lg .input-icon--right {
		right: var(--input-lg-padding-x);
	}

	.input-helper {
		font-family: var(--input-font-family);
		color: var(--input-helper-color);
		margin-top: var(--input-helper-gap);
	}

	.input-wrapper--sm .input-helper {
		font-size: var(--input-helper-font-size-sm);
	}

	.input-wrapper--md .input-helper {
		font-size: var(--input-helper-font-size-md);
	}

	.input-wrapper--lg .input-helper {
		font-size: var(--input-helper-font-size-lg);
	}

	.input-wrapper--error .input-helper {
		color: var(--input-helper-color-error);
	}

	.input-wrapper--success .input-helper {
		color: var(--input-helper-color-success);
	}
</style>
