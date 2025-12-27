<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		size?: 'sm' | 'md' | 'lg';
		variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
		label?: string;
	}

	let { size, variant, label, ...restProps }: Props = $props();
</script>

<div
	class="spinner"
	class:spinner--sm={size === 'sm'}
	class:spinner--md={size === 'md'}
	class:spinner--lg={size === 'lg'}
	class:spinner--primary={variant === 'primary'}
	class:spinner--secondary={variant === 'secondary'}
	class:spinner--success={variant === 'success'}
	class:spinner--warning={variant === 'warning'}
	class:spinner--error={variant === 'error'}
	role="status"
	aria-live="polite"
	aria-label={label ?? 'Loading'}
	{...restProps}
>
	<span class="spinner__track"></span>
	<span class="spinner__indicator"></span>
	<span class="visually-hidden">{label ?? 'Loading'}</span>
</div>

<style>
	.spinner {
		position: relative;
		display: inline-block;
		width: 1em;
		height: 1em;
	}

	.spinner--sm {
		width: var(--spinner-sm-size);
		height: var(--spinner-sm-size);
	}

	.spinner--md {
		width: var(--spinner-md-size);
		height: var(--spinner-md-size);
	}

	.spinner--lg {
		width: var(--spinner-lg-size);
		height: var(--spinner-lg-size);
	}

	.spinner__track,
	.spinner__indicator {
		position: absolute;
		inset: 0;
		border-style: solid;
		border-radius: var(--spinner-border-radius);
	}

	.spinner__track {
		border-width: 0.125em;
		border-color: currentColor;
		opacity: 0.25;
	}

	.spinner--sm .spinner__track,
	.spinner--md .spinner__track,
	.spinner--lg .spinner__track {
		opacity: 1;
		border-color: var(--spinner-track-color);
	}

	.spinner--sm .spinner__track {
		border-width: var(--spinner-sm-border-width);
	}

	.spinner--md .spinner__track {
		border-width: var(--spinner-md-border-width);
	}

	.spinner--lg .spinner__track {
		border-width: var(--spinner-lg-border-width);
	}

	.spinner__indicator {
		border-width: 0.125em;
		border-color: transparent;
		border-top-color: currentColor;
		animation: spinner-rotate var(--spinner-duration) var(--spinner-timing) infinite;
	}

	.spinner--sm .spinner__indicator,
	.spinner--md .spinner__indicator,
	.spinner--lg .spinner__indicator {
		border-top-color: currentColor;
	}

	.spinner--sm .spinner__indicator {
		border-width: var(--spinner-sm-border-width);
	}

	.spinner--md .spinner__indicator {
		border-width: var(--spinner-md-border-width);
	}

	.spinner--lg .spinner__indicator {
		border-width: var(--spinner-lg-border-width);
	}

	.spinner--primary .spinner__indicator {
		border-top-color: var(--spinner-color-primary);
	}

	.spinner--secondary .spinner__indicator {
		border-top-color: var(--spinner-color-secondary);
	}

	.spinner--success .spinner__indicator {
		border-top-color: var(--spinner-color-success);
	}

	.spinner--warning .spinner__indicator {
		border-top-color: var(--spinner-color-warning);
	}

	.spinner--error .spinner__indicator {
		border-top-color: var(--spinner-color-error);
	}

	@keyframes spinner-rotate {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.spinner__indicator {
			animation-duration: 2s;
		}
	}

	.visually-hidden {
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
</style>
