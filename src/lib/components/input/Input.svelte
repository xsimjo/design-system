<script lang="ts">
	import './input.css';
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface Props extends Omit<HTMLInputAttributes, 'value' | 'size'> {
		value?: string | number;
		label?: string;
		hint?: string;
		error?: string;
		size?: 'sm' | 'md' | 'lg';
		fullWidth?: boolean;
	}

	let {
		value = $bindable(''),
		label,
		hint,
		error,
		size = 'md',
		fullWidth = false,
		disabled = false,
		id,
		...restProps
	}: Props = $props();

	let uniqueId = `input-${Math.random().toString(36).slice(2)}`;
	const inputId = $derived(id ?? uniqueId);
</script>

<div class="input" class:input--full-width={fullWidth}>
	{#if label}
		<label class="input__label" for={inputId}>{label}</label>
	{/if}
	<input
		class="input__field input__field--{size}"
		class:input__field--error={!!error}
		id={inputId}
		{disabled}
		bind:value
		{...restProps}
	/>
	{#if error}
		<span class="input__error">{error}</span>
	{:else if hint}
		<span class="input__hint">{hint}</span>
	{/if}
</div>
