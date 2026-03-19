<script lang="ts">
	import './progress.css';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		value?: number;
		max?: number;
		size?: 'xs' | 'sm' | 'md' | 'lg';
		variant?: 'primary' | 'success' | 'danger' | 'warning' | 'info' | 'neutral';
		label?: string;
		showValue?: boolean;
		indeterminate?: boolean;
	}

	let {
		value = 0,
		max = 100,
		size = 'md',
		variant = 'primary',
		label = 'Progress',
		showValue = false,
		indeterminate = false,
		...restProps
	}: Props = $props();

	const percentage = $derived(indeterminate ? 0 : Math.min(100, Math.max(0, (value / max) * 100)));
	const displayValue = $derived(`${Math.round(percentage)}%`);
</script>

<div class="progress-root">
	{#if showValue}
		<span class="progress-value" aria-hidden="true">{displayValue}</span>
	{/if}
	<div
		class="progress progress--{size} progress--{variant}"
		class:progress--indeterminate={indeterminate}
		role="progressbar"
		aria-valuenow={indeterminate ? undefined : value}
		aria-valuemin={0}
		aria-valuemax={max}
		aria-label={label}
		{...restProps}
	>
		<div class="progress__fill" style:width={indeterminate ? undefined : `${percentage}%`}></div>
	</div>
</div>
