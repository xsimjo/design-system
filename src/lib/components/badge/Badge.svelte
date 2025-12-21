<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLSpanElement> {
		variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
		size?: 'sm' | 'md';
		pill?: boolean;
		outline?: boolean;
		children: Snippet;
	}

	let {
		variant = 'default',
		size = 'md',
		pill = false,
		outline = false,
		children,
		...restProps
	}: Props = $props();
</script>

<span
	class="badge badge--{variant} badge--{size}"
	class:badge--pill={pill}
	class:badge--outline={outline}
	{...restProps}
>
	{@render children()}
</span>

<style>
	.badge {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--badge-md-gap);
		height: var(--badge-md-height);
		padding-inline: var(--badge-md-padding-x);
		font-family: var(--badge-font-family);
		font-size: var(--badge-md-font-size);
		font-weight: var(--badge-font-weight);
		line-height: var(--badge-line-height);
		border-width: var(--badge-border-width);
		border-style: solid;
		border-radius: var(--badge-border-radius);
		transition: var(--badge-transition);
		white-space: nowrap;
	}

	.badge--sm {
		gap: var(--badge-sm-gap);
		height: var(--badge-sm-height);
		padding-inline: var(--badge-sm-padding-x);
		font-size: var(--badge-sm-font-size);
	}

	.badge--sm :global(svg) {
		width: var(--badge-sm-icon-size);
		height: var(--badge-sm-icon-size);
	}

	.badge--md :global(svg) {
		width: var(--badge-md-icon-size);
		height: var(--badge-md-icon-size);
	}

	.badge--pill {
		border-radius: var(--badge-border-radius-pill);
	}

	.badge--default:not(.badge--outline) {
		background-color: var(--badge-default-bg);
		color: var(--badge-default-text);
		border-color: var(--badge-default-border);
	}

	.badge--primary:not(.badge--outline) {
		background-color: var(--badge-primary-bg);
		color: var(--badge-primary-text);
		border-color: var(--badge-primary-border);
	}

	.badge--secondary:not(.badge--outline) {
		background-color: var(--badge-secondary-bg);
		color: var(--badge-secondary-text);
		border-color: var(--badge-secondary-border);
	}

	.badge--success:not(.badge--outline) {
		background-color: var(--badge-success-bg);
		color: var(--badge-success-text);
		border-color: var(--badge-success-border);
	}

	.badge--warning:not(.badge--outline) {
		background-color: var(--badge-warning-bg);
		color: var(--badge-warning-text);
		border-color: var(--badge-warning-border);
	}

	.badge--error:not(.badge--outline) {
		background-color: var(--badge-error-bg);
		color: var(--badge-error-text);
		border-color: var(--badge-error-border);
	}

	.badge--default.badge--outline {
		background-color: var(--badge-outline-default-bg);
		color: var(--badge-outline-default-text);
		border-color: var(--badge-outline-default-border);
	}

	.badge--primary.badge--outline {
		background-color: var(--badge-outline-primary-bg);
		color: var(--badge-outline-primary-text);
		border-color: var(--badge-outline-primary-border);
	}

	.badge--secondary.badge--outline {
		background-color: var(--badge-outline-secondary-bg);
		color: var(--badge-outline-secondary-text);
		border-color: var(--badge-outline-secondary-border);
	}

	.badge--success.badge--outline {
		background-color: var(--badge-outline-success-bg);
		color: var(--badge-outline-success-text);
		border-color: var(--badge-outline-success-border);
	}

	.badge--warning.badge--outline {
		background-color: var(--badge-outline-warning-bg);
		color: var(--badge-outline-warning-text);
		border-color: var(--badge-outline-warning-border);
	}

	.badge--error.badge--outline {
		background-color: var(--badge-outline-error-bg);
		color: var(--badge-outline-error-text);
		border-color: var(--badge-outline-error-border);
	}
</style>
