<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	type Variant = 'default' | 'success' | 'warning' | 'error';
	type Size = 'sm' | 'md' | 'lg';

	interface Props extends Omit<
		HTMLAttributes<HTMLDivElement>,
		'aria-valuenow' | 'aria-valuemin' | 'aria-valuemax'
	> {
		value?: number;
		max?: number;
		variant?: Variant;
		size?: Size;
		indeterminate?: boolean;
		disabled?: boolean;
		label?: string;
		showPercentage?: boolean;
		ariaLabel?: string;
	}

	let {
		value = 0,
		max = 100,
		variant = 'default',
		size = 'md',
		indeterminate = false,
		disabled = false,
		label,
		showPercentage = false,
		ariaLabel,
		...restProps
	}: Props = $props();

	const percentage = $derived(Math.round((Math.min(Math.max(value, 0), max) / max) * 100));
</script>

<div
	class="progress"
	class:progress--disabled={disabled}
	role="progressbar"
	aria-valuenow={indeterminate ? undefined : value}
	aria-valuemin={0}
	aria-valuemax={max}
	aria-label={ariaLabel ?? label}
	{...restProps}
>
	{#if label || showPercentage}
		<div class="progress__header">
			{#if label}
				<span class="progress__label">{label}</span>
			{/if}
			{#if showPercentage && !indeterminate}
				<span class="progress__percentage">{percentage}%</span>
			{/if}
		</div>
	{/if}

	<div class="progress__track" data-size={size}>
		<div
			class="progress__fill"
			data-variant={variant}
			class:progress__fill--indeterminate={indeterminate}
			style:width={indeterminate ? undefined : `${percentage}%`}
		></div>
	</div>
</div>

<style>
	.progress {
		display: flex;
		flex-direction: column;
		gap: var(--progress-label-gap);
		width: 100%;
	}

	.progress--disabled {
		opacity: var(--progress-opacity-disabled);
	}

	.progress__header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: var(--space-2);
	}

	.progress__label {
		font-family: var(--progress-label-font-family);
		font-size: var(--progress-label-font-size);
		font-weight: var(--progress-label-font-weight);
		line-height: var(--progress-label-line-height);
		color: var(--progress-label-color);
	}

	.progress--disabled .progress__label {
		color: var(--progress-label-color-disabled);
	}

	.progress__percentage {
		font-family: var(--progress-percentage-font-family);
		font-size: var(--progress-percentage-font-size);
		font-weight: var(--progress-percentage-font-weight);
		line-height: var(--progress-percentage-line-height);
		color: var(--progress-percentage-color);
		min-width: 3ch;
		text-align: right;
		font-variant-numeric: tabular-nums;
	}

	.progress--disabled .progress__percentage {
		color: var(--progress-percentage-color-disabled);
	}

	.progress__track {
		position: relative;
		width: 100%;
		background-color: var(--progress-track-bg);
		border-radius: var(--progress-track-border-radius);
		overflow: hidden;
	}

	.progress__track[data-size='sm'] {
		height: var(--progress-sm-height);
	}

	.progress__track[data-size='md'] {
		height: var(--progress-md-height);
	}

	.progress__track[data-size='lg'] {
		height: var(--progress-lg-height);
	}

	.progress--disabled .progress__track {
		background-color: var(--progress-track-bg-disabled);
	}

	.progress__fill {
		height: 100%;
		background-color: var(--progress-fill-bg);
		border-radius: var(--progress-fill-border-radius);
		transition: width var(--progress-transition);
	}

	.progress__fill[data-variant='success'] {
		background-color: var(--progress-fill-bg-success);
	}

	.progress__fill[data-variant='warning'] {
		background-color: var(--progress-fill-bg-warning);
	}

	.progress__fill[data-variant='error'] {
		background-color: var(--progress-fill-bg-error);
	}

	.progress--disabled .progress__fill {
		background-color: var(--progress-fill-bg-disabled);
	}

	.progress__fill--indeterminate {
		width: 40%;
		animation: progress-indeterminate var(--progress-indeterminate-duration)
			cubic-bezier(0.4, 0, 0.6, 1) infinite;
	}

	@keyframes progress-indeterminate {
		0% {
			transform: translateX(-100%);
		}
		100% {
			transform: translateX(350%);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.progress__fill {
			transition: none;
		}

		.progress__fill--indeterminate {
			animation: progress-indeterminate-pulse var(--progress-indeterminate-duration) ease-in-out
				infinite;
		}

		@keyframes progress-indeterminate-pulse {
			0%,
			100% {
				opacity: 0.6;
			}
			50% {
				opacity: 1;
			}
		}
	}
</style>
