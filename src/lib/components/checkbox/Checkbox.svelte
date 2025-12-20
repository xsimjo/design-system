<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import CheckIcon from '$lib/icons/CheckIcon.svelte';
	import MinusIcon from '$lib/icons/MinusIcon.svelte';

	interface Props extends Omit<HTMLInputAttributes, 'size'> {
		checked?: boolean;
		indeterminate?: boolean;
		error?: boolean;
		size?: 'sm' | 'md' | 'lg';
		label?: string;
	}

	let {
		checked = $bindable(false),
		indeterminate = false,
		disabled = false,
		error = false,
		size = 'md',
		label,
		name,
		value,
		...restProps
	}: Props = $props();

	let inputElement: HTMLInputElement;

	$effect(() => {
		if (inputElement) {
			inputElement.indeterminate = indeterminate;
		}
	});

	const iconSizes = {
		sm: 'var(--checkbox-sm-icon-size)',
		md: 'var(--checkbox-md-icon-size)',
		lg: 'var(--checkbox-lg-icon-size)'
	};
</script>

<label
	class="checkbox checkbox--{size}"
	class:checkbox--disabled={disabled}
	class:checkbox--error={error}
>
	<input
		bind:this={inputElement}
		type="checkbox"
		class="checkbox__input"
		bind:checked
		{disabled}
		{name}
		{value}
		aria-checked={indeterminate ? 'mixed' : checked}
		aria-invalid={error || undefined}
		{...restProps}
	/>
	<span class="checkbox__indicator" class:checkbox__indicator--checked={checked || indeterminate}>
		{#if indeterminate}
			<MinusIcon size={iconSizes[size]} />
		{:else if checked}
			<CheckIcon size={iconSizes[size]} />
		{/if}
	</span>
	{#if label}
		<span class="checkbox__label">{label}</span>
	{/if}
</label>

<style>
	.checkbox {
		display: inline-flex;
		align-items: center;
		gap: var(--checkbox-label-gap);
		cursor: var(--checkbox-cursor-default);
		position: relative;
	}

	.checkbox--disabled {
		cursor: var(--checkbox-cursor-disabled);
		opacity: var(--checkbox-opacity-disabled);
	}

	.checkbox__input {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}

	.checkbox__indicator {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		background-color: var(--checkbox-bg);
		border: var(--checkbox-border-width) solid var(--checkbox-border);
		border-radius: var(--checkbox-border-radius);
		box-shadow: var(--checkbox-shadow);
		transition: all var(--checkbox-transition);
		color: var(--checkbox-icon-color);
	}

	.checkbox--sm .checkbox__indicator {
		width: var(--checkbox-sm-size);
		height: var(--checkbox-sm-size);
	}

	.checkbox--md .checkbox__indicator {
		width: var(--checkbox-md-size);
		height: var(--checkbox-md-size);
	}

	.checkbox--lg .checkbox__indicator {
		width: var(--checkbox-lg-size);
		height: var(--checkbox-lg-size);
	}

	.checkbox__indicator--checked {
		background-color: var(--checkbox-bg-checked);
		border-color: var(--checkbox-border-checked);
	}

	.checkbox:hover:not(.checkbox--disabled) .checkbox__indicator {
		border-color: var(--checkbox-border-hover);
		box-shadow: var(--checkbox-shadow-hover);
	}

	.checkbox:hover:not(.checkbox--disabled) .checkbox__indicator--checked {
		border-color: var(--checkbox-border-checked);
	}

	.checkbox__input:focus-visible + .checkbox__indicator {
		border-color: var(--checkbox-border-focus);
		box-shadow:
			var(--checkbox-shadow-focus),
			0 0 0 var(--checkbox-focus-ring-offset) var(--checkbox-bg),
			0 0 0 calc(var(--checkbox-focus-ring-offset) + var(--checkbox-focus-ring-width))
				var(--checkbox-focus-ring-color);
	}

	.checkbox--disabled .checkbox__indicator {
		background-color: var(--checkbox-bg-disabled);
		border-color: var(--checkbox-border-disabled);
		box-shadow: var(--checkbox-shadow-disabled);
		color: var(--checkbox-icon-color-disabled);
	}

	.checkbox--error .checkbox__indicator {
		border-color: var(--checkbox-border-error);
	}

	.checkbox__label {
		font-family: var(--checkbox-label-font-family);
		font-weight: var(--checkbox-label-font-weight);
		line-height: var(--checkbox-label-line-height);
		color: var(--checkbox-label-color);
	}

	.checkbox--sm .checkbox__label {
		font-size: var(--checkbox-label-font-size-sm);
	}

	.checkbox--md .checkbox__label {
		font-size: var(--checkbox-label-font-size-md);
	}

	.checkbox--lg .checkbox__label {
		font-size: var(--checkbox-label-font-size-lg);
	}

	.checkbox--disabled .checkbox__label {
		color: var(--checkbox-label-color-disabled);
	}
</style>
