<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface Props extends HTMLButtonAttributes {
		variant?: 'filled' | 'outline' | 'ghost' | 'soft' | 'link' | 'dash';
		color?: 'primary' | 'neutral' | 'accent' | 'info' | 'success' | 'warning' | 'error';
		size?: 'sm' | 'md' | 'lg';
		icon?: boolean;
		active?: boolean;
		children: Snippet;
	}

	let {
		variant = 'filled',
		color = 'primary',
		size = 'md',
		icon = false,
		active = false,
		children,
		...restProps
	}: Props = $props();
</script>

<button
	class="button button--{variant} button--{color} button--{size}"
	class:button--icon={icon}
	class:button--active={active}
	{...restProps}
>
	{@render children()}
</button>

<style>
	.button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--button-md-gap);
		font-family: var(--button-font-family);
		font-weight: var(--button-font-weight);
		line-height: var(--button-line-height);
		border-style: solid;
		border-width: var(--button-border-width);
		border-radius: var(--button-border-radius);
		cursor: var(--button-cursor-default);
		transition: all var(--button-transition);
	}

	.button:disabled {
		cursor: var(--button-cursor-disabled);
		opacity: var(--button-opacity-disabled);
		box-shadow: var(--button-shadow-disabled);
	}

	/* Size variants */
	.button--sm {
		height: var(--button-sm-height);
		padding: var(--button-sm-padding-y) var(--button-sm-padding-x);
		font-size: var(--button-sm-font-size);
		gap: var(--button-sm-gap);
	}

	.button--md {
		height: var(--button-md-height);
		padding: var(--button-md-padding-y) var(--button-md-padding-x);
		font-size: var(--button-md-font-size);
		gap: var(--button-md-gap);
	}

	.button--lg {
		height: var(--button-lg-height);
		padding: var(--button-lg-padding-y) var(--button-lg-padding-x);
		font-size: var(--button-lg-font-size);
		gap: var(--button-lg-gap);
	}

	/* Icon button modifier */
	.button--icon.button--sm {
		width: var(--button-icon-sm-size);
		height: var(--button-icon-sm-size);
		padding: 0;
	}

	.button--icon.button--md {
		width: var(--button-icon-md-size);
		height: var(--button-icon-md-size);
		padding: 0;
	}

	.button--icon.button--lg {
		width: var(--button-icon-lg-size);
		height: var(--button-icon-lg-size);
		padding: 0;
	}

	/* ========== FILLED VARIANT ========== */
	.button--filled.button--primary {
		background-color: var(--button-primary-filled-bg);
		color: var(--button-primary-filled-text);
		border-color: var(--button-primary-filled-border);
		box-shadow: var(--button-shadow);
	}

	.button--filled.button--primary:hover:not(:disabled) {
		background-color: var(--button-primary-filled-bg-hover);
		color: var(--button-primary-filled-text-hover);
		border-color: var(--button-primary-filled-border-hover);
		box-shadow: var(--button-shadow-hover);
	}

	.button--filled.button--primary:active:not(:disabled) {
		background-color: var(--button-primary-filled-bg-active);
		color: var(--button-primary-filled-text-active);
		border-color: var(--button-primary-filled-border-active);
		box-shadow: var(--button-shadow-active);
	}

	.button--filled.button--primary:focus-visible {
		outline: none;
		box-shadow:
			0 0 0 var(--button-focus-ring-offset) var(--button-primary-filled-bg),
			0 0 0 calc(var(--button-focus-ring-offset) + var(--button-focus-ring-width))
				var(--button-primary-focus-ring);
	}

	.button--filled.button--primary:disabled {
		background-color: var(--button-primary-filled-bg-disabled);
		color: var(--button-primary-filled-text-disabled);
		border-color: var(--button-primary-filled-border-disabled);
	}

	.button--filled.button--neutral {
		background-color: var(--button-neutral-filled-bg);
		color: var(--button-neutral-filled-text);
		border-color: var(--button-neutral-filled-border);
		box-shadow: var(--button-shadow);
	}

	.button--filled.button--neutral:hover:not(:disabled) {
		background-color: var(--button-neutral-filled-bg-hover);
		color: var(--button-neutral-filled-text-hover);
		border-color: var(--button-neutral-filled-border-hover);
		box-shadow: var(--button-shadow-hover);
	}

	.button--filled.button--neutral:active:not(:disabled) {
		background-color: var(--button-neutral-filled-bg-active);
		color: var(--button-neutral-filled-text-active);
		border-color: var(--button-neutral-filled-border-active);
		box-shadow: var(--button-shadow-active);
	}

	.button--filled.button--neutral:focus-visible {
		outline: none;
		box-shadow:
			0 0 0 var(--button-focus-ring-offset) var(--button-neutral-filled-bg),
			0 0 0 calc(var(--button-focus-ring-offset) + var(--button-focus-ring-width))
				var(--button-neutral-focus-ring);
	}

	.button--filled.button--neutral:disabled {
		background-color: var(--button-neutral-filled-bg-disabled);
		color: var(--button-neutral-filled-text-disabled);
		border-color: var(--button-neutral-filled-border-disabled);
	}

	.button--filled.button--accent {
		background-color: var(--button-accent-filled-bg);
		color: var(--button-accent-filled-text);
		border-color: var(--button-accent-filled-border);
		box-shadow: var(--button-shadow);
	}

	.button--filled.button--accent:hover:not(:disabled) {
		background-color: var(--button-accent-filled-bg-hover);
		color: var(--button-accent-filled-text-hover);
		border-color: var(--button-accent-filled-border-hover);
		box-shadow: var(--button-shadow-hover);
	}

	.button--filled.button--accent:active:not(:disabled) {
		background-color: var(--button-accent-filled-bg-active);
		color: var(--button-accent-filled-text-active);
		border-color: var(--button-accent-filled-border-active);
		box-shadow: var(--button-shadow-active);
	}

	.button--filled.button--accent:focus-visible {
		outline: none;
		box-shadow:
			0 0 0 var(--button-focus-ring-offset) var(--button-accent-filled-bg),
			0 0 0 calc(var(--button-focus-ring-offset) + var(--button-focus-ring-width))
				var(--button-accent-focus-ring);
	}

	.button--filled.button--accent:disabled {
		background-color: var(--button-accent-filled-bg-disabled);
		color: var(--button-accent-filled-text-disabled);
		border-color: var(--button-accent-filled-border-disabled);
	}

	.button--filled.button--info {
		background-color: var(--button-info-filled-bg);
		color: var(--button-info-filled-text);
		border-color: var(--button-info-filled-border);
		box-shadow: var(--button-shadow);
	}

	.button--filled.button--info:hover:not(:disabled) {
		background-color: var(--button-info-filled-bg-hover);
		color: var(--button-info-filled-text-hover);
		border-color: var(--button-info-filled-border-hover);
		box-shadow: var(--button-shadow-hover);
	}

	.button--filled.button--info:active:not(:disabled) {
		background-color: var(--button-info-filled-bg-active);
		color: var(--button-info-filled-text-active);
		border-color: var(--button-info-filled-border-active);
		box-shadow: var(--button-shadow-active);
	}

	.button--filled.button--info:focus-visible {
		outline: none;
		box-shadow:
			0 0 0 var(--button-focus-ring-offset) var(--button-info-filled-bg),
			0 0 0 calc(var(--button-focus-ring-offset) + var(--button-focus-ring-width))
				var(--button-info-focus-ring);
	}

	.button--filled.button--info:disabled {
		background-color: var(--button-info-filled-bg-disabled);
		color: var(--button-info-filled-text-disabled);
		border-color: var(--button-info-filled-border-disabled);
	}

	.button--filled.button--success {
		background-color: var(--button-success-filled-bg);
		color: var(--button-success-filled-text);
		border-color: var(--button-success-filled-border);
		box-shadow: var(--button-shadow);
	}

	.button--filled.button--success:hover:not(:disabled) {
		background-color: var(--button-success-filled-bg-hover);
		color: var(--button-success-filled-text-hover);
		border-color: var(--button-success-filled-border-hover);
		box-shadow: var(--button-shadow-hover);
	}

	.button--filled.button--success:active:not(:disabled) {
		background-color: var(--button-success-filled-bg-active);
		color: var(--button-success-filled-text-active);
		border-color: var(--button-success-filled-border-active);
		box-shadow: var(--button-shadow-active);
	}

	.button--filled.button--success:focus-visible {
		outline: none;
		box-shadow:
			0 0 0 var(--button-focus-ring-offset) var(--button-success-filled-bg),
			0 0 0 calc(var(--button-focus-ring-offset) + var(--button-focus-ring-width))
				var(--button-success-focus-ring);
	}

	.button--filled.button--success:disabled {
		background-color: var(--button-success-filled-bg-disabled);
		color: var(--button-success-filled-text-disabled);
		border-color: var(--button-success-filled-border-disabled);
	}

	.button--filled.button--warning {
		background-color: var(--button-warning-filled-bg);
		color: var(--button-warning-filled-text);
		border-color: var(--button-warning-filled-border);
		box-shadow: var(--button-shadow);
	}

	.button--filled.button--warning:hover:not(:disabled) {
		background-color: var(--button-warning-filled-bg-hover);
		color: var(--button-warning-filled-text-hover);
		border-color: var(--button-warning-filled-border-hover);
		box-shadow: var(--button-shadow-hover);
	}

	.button--filled.button--warning:active:not(:disabled) {
		background-color: var(--button-warning-filled-bg-active);
		color: var(--button-warning-filled-text-active);
		border-color: var(--button-warning-filled-border-active);
		box-shadow: var(--button-shadow-active);
	}

	.button--filled.button--warning:focus-visible {
		outline: none;
		box-shadow:
			0 0 0 var(--button-focus-ring-offset) var(--button-warning-filled-bg),
			0 0 0 calc(var(--button-focus-ring-offset) + var(--button-focus-ring-width))
				var(--button-warning-focus-ring);
	}

	.button--filled.button--warning:disabled {
		background-color: var(--button-warning-filled-bg-disabled);
		color: var(--button-warning-filled-text-disabled);
		border-color: var(--button-warning-filled-border-disabled);
	}

	.button--filled.button--error {
		background-color: var(--button-error-filled-bg);
		color: var(--button-error-filled-text);
		border-color: var(--button-error-filled-border);
		box-shadow: var(--button-shadow);
	}

	.button--filled.button--error:hover:not(:disabled) {
		background-color: var(--button-error-filled-bg-hover);
		color: var(--button-error-filled-text-hover);
		border-color: var(--button-error-filled-border-hover);
		box-shadow: var(--button-shadow-hover);
	}

	.button--filled.button--error:active:not(:disabled) {
		background-color: var(--button-error-filled-bg-active);
		color: var(--button-error-filled-text-active);
		border-color: var(--button-error-filled-border-active);
		box-shadow: var(--button-shadow-active);
	}

	.button--filled.button--error:focus-visible {
		outline: none;
		box-shadow:
			0 0 0 var(--button-focus-ring-offset) var(--button-error-filled-bg),
			0 0 0 calc(var(--button-focus-ring-offset) + var(--button-focus-ring-width))
				var(--button-error-focus-ring);
	}

	.button--filled.button--error:disabled {
		background-color: var(--button-error-filled-bg-disabled);
		color: var(--button-error-filled-text-disabled);
		border-color: var(--button-error-filled-border-disabled);
	}

	/* ========== OUTLINE VARIANT ========== */
	.button--outline.button--primary {
		background-color: var(--button-primary-outline-bg);
		color: var(--button-primary-outline-text);
		border-color: var(--button-primary-outline-border);
	}

	.button--outline.button--primary:hover:not(:disabled) {
		background-color: var(--button-primary-outline-bg-hover);
		color: var(--button-primary-outline-text-hover);
		border-color: var(--button-primary-outline-border-hover);
	}

	.button--outline.button--primary:active:not(:disabled) {
		background-color: var(--button-primary-outline-bg-active);
		color: var(--button-primary-outline-text-active);
		border-color: var(--button-primary-outline-border-active);
	}

	.button--outline.button--primary:focus-visible {
		outline: none;
		box-shadow:
			0 0 0 var(--button-focus-ring-offset) transparent,
			0 0 0 calc(var(--button-focus-ring-offset) + var(--button-focus-ring-width))
				var(--button-primary-focus-ring);
	}

	.button--outline.button--primary:disabled {
		background-color: var(--button-primary-outline-bg-disabled);
		color: var(--button-primary-outline-text-disabled);
		border-color: var(--button-primary-outline-border-disabled);
	}

	.button--outline.button--neutral {
		background-color: var(--button-neutral-outline-bg);
		color: var(--button-neutral-outline-text);
		border-color: var(--button-neutral-outline-border);
	}

	.button--outline.button--neutral:hover:not(:disabled) {
		background-color: var(--button-neutral-outline-bg-hover);
		color: var(--button-neutral-outline-text-hover);
		border-color: var(--button-neutral-outline-border-hover);
	}

	.button--outline.button--neutral:active:not(:disabled) {
		background-color: var(--button-neutral-outline-bg-active);
		color: var(--button-neutral-outline-text-active);
		border-color: var(--button-neutral-outline-border-active);
	}

	.button--outline.button--neutral:focus-visible {
		outline: none;
		box-shadow:
			0 0 0 var(--button-focus-ring-offset) transparent,
			0 0 0 calc(var(--button-focus-ring-offset) + var(--button-focus-ring-width))
				var(--button-neutral-focus-ring);
	}

	.button--outline.button--neutral:disabled {
		background-color: var(--button-neutral-outline-bg-disabled);
		color: var(--button-neutral-outline-text-disabled);
		border-color: var(--button-neutral-outline-border-disabled);
	}

	.button--outline.button--accent {
		background-color: var(--button-accent-outline-bg);
		color: var(--button-accent-outline-text);
		border-color: var(--button-accent-outline-border);
	}

	.button--outline.button--accent:hover:not(:disabled) {
		background-color: var(--button-accent-outline-bg-hover);
		color: var(--button-accent-outline-text-hover);
		border-color: var(--button-accent-outline-border-hover);
	}

	.button--outline.button--accent:active:not(:disabled) {
		background-color: var(--button-accent-outline-bg-active);
		color: var(--button-accent-outline-text-active);
		border-color: var(--button-accent-outline-border-active);
	}

	.button--outline.button--accent:focus-visible {
		outline: none;
		box-shadow:
			0 0 0 var(--button-focus-ring-offset) transparent,
			0 0 0 calc(var(--button-focus-ring-offset) + var(--button-focus-ring-width))
				var(--button-accent-focus-ring);
	}

	.button--outline.button--accent:disabled {
		background-color: var(--button-accent-outline-bg-disabled);
		color: var(--button-accent-outline-text-disabled);
		border-color: var(--button-accent-outline-border-disabled);
	}

	.button--outline.button--info {
		background-color: var(--button-info-outline-bg);
		color: var(--button-info-outline-text);
		border-color: var(--button-info-outline-border);
	}

	.button--outline.button--info:hover:not(:disabled) {
		background-color: var(--button-info-outline-bg-hover);
		color: var(--button-info-outline-text-hover);
		border-color: var(--button-info-outline-border-hover);
	}

	.button--outline.button--info:active:not(:disabled) {
		background-color: var(--button-info-outline-bg-active);
		color: var(--button-info-outline-text-active);
		border-color: var(--button-info-outline-border-active);
	}

	.button--outline.button--info:focus-visible {
		outline: none;
		box-shadow:
			0 0 0 var(--button-focus-ring-offset) transparent,
			0 0 0 calc(var(--button-focus-ring-offset) + var(--button-focus-ring-width))
				var(--button-info-focus-ring);
	}

	.button--outline.button--info:disabled {
		background-color: var(--button-info-outline-bg-disabled);
		color: var(--button-info-outline-text-disabled);
		border-color: var(--button-info-outline-border-disabled);
	}

	.button--outline.button--success {
		background-color: var(--button-success-outline-bg);
		color: var(--button-success-outline-text);
		border-color: var(--button-success-outline-border);
	}

	.button--outline.button--success:hover:not(:disabled) {
		background-color: var(--button-success-outline-bg-hover);
		color: var(--button-success-outline-text-hover);
		border-color: var(--button-success-outline-border-hover);
	}

	.button--outline.button--success:active:not(:disabled) {
		background-color: var(--button-success-outline-bg-active);
		color: var(--button-success-outline-text-active);
		border-color: var(--button-success-outline-border-active);
	}

	.button--outline.button--success:focus-visible {
		outline: none;
		box-shadow:
			0 0 0 var(--button-focus-ring-offset) transparent,
			0 0 0 calc(var(--button-focus-ring-offset) + var(--button-focus-ring-width))
				var(--button-success-focus-ring);
	}

	.button--outline.button--success:disabled {
		background-color: var(--button-success-outline-bg-disabled);
		color: var(--button-success-outline-text-disabled);
		border-color: var(--button-success-outline-border-disabled);
	}

	.button--outline.button--warning {
		background-color: var(--button-warning-outline-bg);
		color: var(--button-warning-outline-text);
		border-color: var(--button-warning-outline-border);
	}

	.button--outline.button--warning:hover:not(:disabled) {
		background-color: var(--button-warning-outline-bg-hover);
		color: var(--button-warning-outline-text-hover);
		border-color: var(--button-warning-outline-border-hover);
	}

	.button--outline.button--warning:active:not(:disabled) {
		background-color: var(--button-warning-outline-bg-active);
		color: var(--button-warning-outline-text-active);
		border-color: var(--button-warning-outline-border-active);
	}

	.button--outline.button--warning:focus-visible {
		outline: none;
		box-shadow:
			0 0 0 var(--button-focus-ring-offset) transparent,
			0 0 0 calc(var(--button-focus-ring-offset) + var(--button-focus-ring-width))
				var(--button-warning-focus-ring);
	}

	.button--outline.button--warning:disabled {
		background-color: var(--button-warning-outline-bg-disabled);
		color: var(--button-warning-outline-text-disabled);
		border-color: var(--button-warning-outline-border-disabled);
	}

	.button--outline.button--error {
		background-color: var(--button-error-outline-bg);
		color: var(--button-error-outline-text);
		border-color: var(--button-error-outline-border);
	}

	.button--outline.button--error:hover:not(:disabled) {
		background-color: var(--button-error-outline-bg-hover);
		color: var(--button-error-outline-text-hover);
		border-color: var(--button-error-outline-border-hover);
	}

	.button--outline.button--error:active:not(:disabled) {
		background-color: var(--button-error-outline-bg-active);
		color: var(--button-error-outline-text-active);
		border-color: var(--button-error-outline-border-active);
	}

	.button--outline.button--error:focus-visible {
		outline: none;
		box-shadow:
			0 0 0 var(--button-focus-ring-offset) transparent,
			0 0 0 calc(var(--button-focus-ring-offset) + var(--button-focus-ring-width))
				var(--button-error-focus-ring);
	}

	.button--outline.button--error:disabled {
		background-color: var(--button-error-outline-bg-disabled);
		color: var(--button-error-outline-text-disabled);
		border-color: var(--button-error-outline-border-disabled);
	}

	/* ========== GHOST VARIANT ========== */
	.button--ghost.button--primary {
		background-color: var(--button-primary-ghost-bg);
		color: var(--button-primary-ghost-text);
		border-color: transparent;
	}

	.button--ghost.button--primary:hover:not(:disabled) {
		background-color: var(--button-primary-ghost-bg-hover);
		color: var(--button-primary-ghost-text-hover);
	}

	.button--ghost.button--primary:active:not(:disabled) {
		background-color: var(--button-primary-ghost-bg-active);
		color: var(--button-primary-ghost-text-active);
	}

	.button--ghost.button--primary:focus-visible {
		outline: none;
		box-shadow:
			0 0 0 var(--button-focus-ring-offset) transparent,
			0 0 0 calc(var(--button-focus-ring-offset) + var(--button-focus-ring-width))
				var(--button-primary-focus-ring);
	}

	.button--ghost.button--primary:disabled {
		background-color: var(--button-primary-ghost-bg-disabled);
		color: var(--button-primary-ghost-text-disabled);
	}

	.button--ghost.button--neutral {
		background-color: var(--button-neutral-ghost-bg);
		color: var(--button-neutral-ghost-text);
		border-color: transparent;
	}

	.button--ghost.button--neutral:hover:not(:disabled) {
		background-color: var(--button-neutral-ghost-bg-hover);
		color: var(--button-neutral-ghost-text-hover);
	}

	.button--ghost.button--neutral:active:not(:disabled) {
		background-color: var(--button-neutral-ghost-bg-active);
		color: var(--button-neutral-ghost-text-active);
	}

	.button--ghost.button--neutral:focus-visible {
		outline: none;
		box-shadow:
			0 0 0 var(--button-focus-ring-offset) transparent,
			0 0 0 calc(var(--button-focus-ring-offset) + var(--button-focus-ring-width))
				var(--button-neutral-focus-ring);
	}

	.button--ghost.button--neutral:disabled {
		background-color: var(--button-neutral-ghost-bg-disabled);
		color: var(--button-neutral-ghost-text-disabled);
	}

	.button--ghost.button--accent {
		background-color: var(--button-accent-ghost-bg);
		color: var(--button-accent-ghost-text);
		border-color: transparent;
	}

	.button--ghost.button--accent:hover:not(:disabled) {
		background-color: var(--button-accent-ghost-bg-hover);
		color: var(--button-accent-ghost-text-hover);
	}

	.button--ghost.button--accent:active:not(:disabled) {
		background-color: var(--button-accent-ghost-bg-active);
		color: var(--button-accent-ghost-text-active);
	}

	.button--ghost.button--accent:focus-visible {
		outline: none;
		box-shadow:
			0 0 0 var(--button-focus-ring-offset) transparent,
			0 0 0 calc(var(--button-focus-ring-offset) + var(--button-focus-ring-width))
				var(--button-accent-focus-ring);
	}

	.button--ghost.button--accent:disabled {
		background-color: var(--button-accent-ghost-bg-disabled);
		color: var(--button-accent-ghost-text-disabled);
	}

	.button--ghost.button--info {
		background-color: var(--button-info-ghost-bg);
		color: var(--button-info-ghost-text);
		border-color: transparent;
	}

	.button--ghost.button--info:hover:not(:disabled) {
		background-color: var(--button-info-ghost-bg-hover);
		color: var(--button-info-ghost-text-hover);
	}

	.button--ghost.button--info:active:not(:disabled) {
		background-color: var(--button-info-ghost-bg-active);
		color: var(--button-info-ghost-text-active);
	}

	.button--ghost.button--info:focus-visible {
		outline: none;
		box-shadow:
			0 0 0 var(--button-focus-ring-offset) transparent,
			0 0 0 calc(var(--button-focus-ring-offset) + var(--button-focus-ring-width))
				var(--button-info-focus-ring);
	}

	.button--ghost.button--info:disabled {
		background-color: var(--button-info-ghost-bg-disabled);
		color: var(--button-info-ghost-text-disabled);
	}

	.button--ghost.button--success {
		background-color: var(--button-success-ghost-bg);
		color: var(--button-success-ghost-text);
		border-color: transparent;
	}

	.button--ghost.button--success:hover:not(:disabled) {
		background-color: var(--button-success-ghost-bg-hover);
		color: var(--button-success-ghost-text-hover);
	}

	.button--ghost.button--success:active:not(:disabled) {
		background-color: var(--button-success-ghost-bg-active);
		color: var(--button-success-ghost-text-active);
	}

	.button--ghost.button--success:focus-visible {
		outline: none;
		box-shadow:
			0 0 0 var(--button-focus-ring-offset) transparent,
			0 0 0 calc(var(--button-focus-ring-offset) + var(--button-focus-ring-width))
				var(--button-success-focus-ring);
	}

	.button--ghost.button--success:disabled {
		background-color: var(--button-success-ghost-bg-disabled);
		color: var(--button-success-ghost-text-disabled);
	}

	.button--ghost.button--warning {
		background-color: var(--button-warning-ghost-bg);
		color: var(--button-warning-ghost-text);
		border-color: transparent;
	}

	.button--ghost.button--warning:hover:not(:disabled) {
		background-color: var(--button-warning-ghost-bg-hover);
		color: var(--button-warning-ghost-text-hover);
	}

	.button--ghost.button--warning:active:not(:disabled) {
		background-color: var(--button-warning-ghost-bg-active);
		color: var(--button-warning-ghost-text-active);
	}

	.button--ghost.button--warning:focus-visible {
		outline: none;
		box-shadow:
			0 0 0 var(--button-focus-ring-offset) transparent,
			0 0 0 calc(var(--button-focus-ring-offset) + var(--button-focus-ring-width))
				var(--button-warning-focus-ring);
	}

	.button--ghost.button--warning:disabled {
		background-color: var(--button-warning-ghost-bg-disabled);
		color: var(--button-warning-ghost-text-disabled);
	}

	.button--ghost.button--error {
		background-color: var(--button-error-ghost-bg);
		color: var(--button-error-ghost-text);
		border-color: transparent;
	}

	.button--ghost.button--error:hover:not(:disabled) {
		background-color: var(--button-error-ghost-bg-hover);
		color: var(--button-error-ghost-text-hover);
	}

	.button--ghost.button--error:active:not(:disabled) {
		background-color: var(--button-error-ghost-bg-active);
		color: var(--button-error-ghost-text-active);
	}

	.button--ghost.button--error:focus-visible {
		outline: none;
		box-shadow:
			0 0 0 var(--button-focus-ring-offset) transparent,
			0 0 0 calc(var(--button-focus-ring-offset) + var(--button-focus-ring-width))
				var(--button-error-focus-ring);
	}

	.button--ghost.button--error:disabled {
		background-color: var(--button-error-ghost-bg-disabled);
		color: var(--button-error-ghost-text-disabled);
	}

	/* ========== SOFT VARIANT ========== */
	.button--soft.button--primary {
		background-color: var(--button-primary-soft-bg);
		color: var(--button-primary-soft-text);
		border-color: transparent;
	}

	.button--soft.button--primary:hover:not(:disabled) {
		background-color: var(--button-primary-soft-bg-hover);
		color: var(--button-primary-soft-text-hover);
	}

	.button--soft.button--primary:active:not(:disabled) {
		background-color: var(--button-primary-soft-bg-active);
		color: var(--button-primary-soft-text-active);
	}

	.button--soft.button--primary:focus-visible {
		outline: none;
		box-shadow:
			0 0 0 var(--button-focus-ring-offset) transparent,
			0 0 0 calc(var(--button-focus-ring-offset) + var(--button-focus-ring-width))
				var(--button-primary-focus-ring);
	}

	.button--soft.button--primary:disabled {
		background-color: var(--button-primary-soft-bg-disabled);
		color: var(--button-primary-soft-text-disabled);
	}

	.button--soft.button--neutral {
		background-color: var(--button-neutral-soft-bg);
		color: var(--button-neutral-soft-text);
		border-color: transparent;
	}

	.button--soft.button--neutral:hover:not(:disabled) {
		background-color: var(--button-neutral-soft-bg-hover);
		color: var(--button-neutral-soft-text-hover);
	}

	.button--soft.button--neutral:active:not(:disabled) {
		background-color: var(--button-neutral-soft-bg-active);
		color: var(--button-neutral-soft-text-active);
	}

	.button--soft.button--neutral:focus-visible {
		outline: none;
		box-shadow:
			0 0 0 var(--button-focus-ring-offset) transparent,
			0 0 0 calc(var(--button-focus-ring-offset) + var(--button-focus-ring-width))
				var(--button-neutral-focus-ring);
	}

	.button--soft.button--neutral:disabled {
		background-color: var(--button-neutral-soft-bg-disabled);
		color: var(--button-neutral-soft-text-disabled);
	}

	.button--soft.button--accent {
		background-color: var(--button-accent-soft-bg);
		color: var(--button-accent-soft-text);
		border-color: transparent;
	}

	.button--soft.button--accent:hover:not(:disabled) {
		background-color: var(--button-accent-soft-bg-hover);
		color: var(--button-accent-soft-text-hover);
	}

	.button--soft.button--accent:active:not(:disabled) {
		background-color: var(--button-accent-soft-bg-active);
		color: var(--button-accent-soft-text-active);
	}

	.button--soft.button--accent:focus-visible {
		outline: none;
		box-shadow:
			0 0 0 var(--button-focus-ring-offset) transparent,
			0 0 0 calc(var(--button-focus-ring-offset) + var(--button-focus-ring-width))
				var(--button-accent-focus-ring);
	}

	.button--soft.button--accent:disabled {
		background-color: var(--button-accent-soft-bg-disabled);
		color: var(--button-accent-soft-text-disabled);
	}

	.button--soft.button--info {
		background-color: var(--button-info-soft-bg);
		color: var(--button-info-soft-text);
		border-color: transparent;
	}

	.button--soft.button--info:hover:not(:disabled) {
		background-color: var(--button-info-soft-bg-hover);
		color: var(--button-info-soft-text-hover);
	}

	.button--soft.button--info:active:not(:disabled) {
		background-color: var(--button-info-soft-bg-active);
		color: var(--button-info-soft-text-active);
	}

	.button--soft.button--info:focus-visible {
		outline: none;
		box-shadow:
			0 0 0 var(--button-focus-ring-offset) transparent,
			0 0 0 calc(var(--button-focus-ring-offset) + var(--button-focus-ring-width))
				var(--button-info-focus-ring);
	}

	.button--soft.button--info:disabled {
		background-color: var(--button-info-soft-bg-disabled);
		color: var(--button-info-soft-text-disabled);
	}

	.button--soft.button--success {
		background-color: var(--button-success-soft-bg);
		color: var(--button-success-soft-text);
		border-color: transparent;
	}

	.button--soft.button--success:hover:not(:disabled) {
		background-color: var(--button-success-soft-bg-hover);
		color: var(--button-success-soft-text-hover);
	}

	.button--soft.button--success:active:not(:disabled) {
		background-color: var(--button-success-soft-bg-active);
		color: var(--button-success-soft-text-active);
	}

	.button--soft.button--success:focus-visible {
		outline: none;
		box-shadow:
			0 0 0 var(--button-focus-ring-offset) transparent,
			0 0 0 calc(var(--button-focus-ring-offset) + var(--button-focus-ring-width))
				var(--button-success-focus-ring);
	}

	.button--soft.button--success:disabled {
		background-color: var(--button-success-soft-bg-disabled);
		color: var(--button-success-soft-text-disabled);
	}

	.button--soft.button--warning {
		background-color: var(--button-warning-soft-bg);
		color: var(--button-warning-soft-text);
		border-color: transparent;
	}

	.button--soft.button--warning:hover:not(:disabled) {
		background-color: var(--button-warning-soft-bg-hover);
		color: var(--button-warning-soft-text-hover);
	}

	.button--soft.button--warning:active:not(:disabled) {
		background-color: var(--button-warning-soft-bg-active);
		color: var(--button-warning-soft-text-active);
	}

	.button--soft.button--warning:focus-visible {
		outline: none;
		box-shadow:
			0 0 0 var(--button-focus-ring-offset) transparent,
			0 0 0 calc(var(--button-focus-ring-offset) + var(--button-focus-ring-width))
				var(--button-warning-focus-ring);
	}

	.button--soft.button--warning:disabled {
		background-color: var(--button-warning-soft-bg-disabled);
		color: var(--button-warning-soft-text-disabled);
	}

	.button--soft.button--error {
		background-color: var(--button-error-soft-bg);
		color: var(--button-error-soft-text);
		border-color: transparent;
	}

	.button--soft.button--error:hover:not(:disabled) {
		background-color: var(--button-error-soft-bg-hover);
		color: var(--button-error-soft-text-hover);
	}

	.button--soft.button--error:active:not(:disabled) {
		background-color: var(--button-error-soft-bg-active);
		color: var(--button-error-soft-text-active);
	}

	.button--soft.button--error:focus-visible {
		outline: none;
		box-shadow:
			0 0 0 var(--button-focus-ring-offset) transparent,
			0 0 0 calc(var(--button-focus-ring-offset) + var(--button-focus-ring-width))
				var(--button-error-focus-ring);
	}

	.button--soft.button--error:disabled {
		background-color: var(--button-error-soft-bg-disabled);
		color: var(--button-error-soft-text-disabled);
	}

	/* ========== LINK VARIANT ========== */
	.button--link {
		background-color: transparent;
		border-color: transparent;
		text-decoration: underline;
		box-shadow: none;
	}

	.button--link.button--primary {
		color: var(--button-primary-link-text);
	}

	.button--link.button--primary:hover:not(:disabled) {
		color: var(--button-primary-link-text-hover);
	}

	.button--link.button--primary:active:not(:disabled) {
		color: var(--button-primary-link-text-active);
	}

	.button--link.button--primary:focus-visible {
		outline: none;
		box-shadow:
			0 0 0 var(--button-focus-ring-offset) transparent,
			0 0 0 calc(var(--button-focus-ring-offset) + var(--button-focus-ring-width))
				var(--button-primary-focus-ring);
	}

	.button--link.button--primary:disabled {
		color: var(--button-primary-link-text-disabled);
	}

	.button--link.button--neutral {
		color: var(--button-neutral-link-text);
	}

	.button--link.button--neutral:hover:not(:disabled) {
		color: var(--button-neutral-link-text-hover);
	}

	.button--link.button--neutral:active:not(:disabled) {
		color: var(--button-neutral-link-text-active);
	}

	.button--link.button--neutral:focus-visible {
		outline: none;
		box-shadow:
			0 0 0 var(--button-focus-ring-offset) transparent,
			0 0 0 calc(var(--button-focus-ring-offset) + var(--button-focus-ring-width))
				var(--button-neutral-focus-ring);
	}

	.button--link.button--neutral:disabled {
		color: var(--button-neutral-link-text-disabled);
	}

	.button--link.button--accent {
		color: var(--button-accent-link-text);
	}

	.button--link.button--accent:hover:not(:disabled) {
		color: var(--button-accent-link-text-hover);
	}

	.button--link.button--accent:active:not(:disabled) {
		color: var(--button-accent-link-text-active);
	}

	.button--link.button--accent:focus-visible {
		outline: none;
		box-shadow:
			0 0 0 var(--button-focus-ring-offset) transparent,
			0 0 0 calc(var(--button-focus-ring-offset) + var(--button-focus-ring-width))
				var(--button-accent-focus-ring);
	}

	.button--link.button--accent:disabled {
		color: var(--button-accent-link-text-disabled);
	}

	.button--link.button--info {
		color: var(--button-info-link-text);
	}

	.button--link.button--info:hover:not(:disabled) {
		color: var(--button-info-link-text-hover);
	}

	.button--link.button--info:active:not(:disabled) {
		color: var(--button-info-link-text-active);
	}

	.button--link.button--info:focus-visible {
		outline: none;
		box-shadow:
			0 0 0 var(--button-focus-ring-offset) transparent,
			0 0 0 calc(var(--button-focus-ring-offset) + var(--button-focus-ring-width))
				var(--button-info-focus-ring);
	}

	.button--link.button--info:disabled {
		color: var(--button-info-link-text-disabled);
	}

	.button--link.button--success {
		color: var(--button-success-link-text);
	}

	.button--link.button--success:hover:not(:disabled) {
		color: var(--button-success-link-text-hover);
	}

	.button--link.button--success:active:not(:disabled) {
		color: var(--button-success-link-text-active);
	}

	.button--link.button--success:focus-visible {
		outline: none;
		box-shadow:
			0 0 0 var(--button-focus-ring-offset) transparent,
			0 0 0 calc(var(--button-focus-ring-offset) + var(--button-focus-ring-width))
				var(--button-success-focus-ring);
	}

	.button--link.button--success:disabled {
		color: var(--button-success-link-text-disabled);
	}

	.button--link.button--warning {
		color: var(--button-warning-link-text);
	}

	.button--link.button--warning:hover:not(:disabled) {
		color: var(--button-warning-link-text-hover);
	}

	.button--link.button--warning:active:not(:disabled) {
		color: var(--button-warning-link-text-active);
	}

	.button--link.button--warning:focus-visible {
		outline: none;
		box-shadow:
			0 0 0 var(--button-focus-ring-offset) transparent,
			0 0 0 calc(var(--button-focus-ring-offset) + var(--button-focus-ring-width))
				var(--button-warning-focus-ring);
	}

	.button--link.button--warning:disabled {
		color: var(--button-warning-link-text-disabled);
	}

	.button--link.button--error {
		color: var(--button-error-link-text);
	}

	.button--link.button--error:hover:not(:disabled) {
		color: var(--button-error-link-text-hover);
	}

	.button--link.button--error:active:not(:disabled) {
		color: var(--button-error-link-text-active);
	}

	.button--link.button--error:focus-visible {
		outline: none;
		box-shadow:
			0 0 0 var(--button-focus-ring-offset) transparent,
			0 0 0 calc(var(--button-focus-ring-offset) + var(--button-focus-ring-width))
				var(--button-error-focus-ring);
	}

	.button--link.button--error:disabled {
		color: var(--button-error-link-text-disabled);
	}

	/* ========== DASH VARIANT ========== */
	.button--dash {
		border-style: dashed;
	}

	.button--dash.button--primary {
		background-color: var(--button-primary-dash-bg);
		color: var(--button-primary-dash-text);
		border-color: var(--button-primary-dash-border);
	}

	.button--dash.button--primary:hover:not(:disabled) {
		background-color: var(--button-primary-dash-bg-hover);
		color: var(--button-primary-dash-text-hover);
		border-color: var(--button-primary-dash-border-hover);
	}

	.button--dash.button--primary:active:not(:disabled) {
		background-color: var(--button-primary-dash-bg-active);
		color: var(--button-primary-dash-text-active);
		border-color: var(--button-primary-dash-border-active);
	}

	.button--dash.button--primary:focus-visible {
		outline: none;
		box-shadow:
			0 0 0 var(--button-focus-ring-offset) transparent,
			0 0 0 calc(var(--button-focus-ring-offset) + var(--button-focus-ring-width))
				var(--button-primary-focus-ring);
	}

	.button--dash.button--primary:disabled {
		background-color: var(--button-primary-dash-bg-disabled);
		color: var(--button-primary-dash-text-disabled);
		border-color: var(--button-primary-dash-border-disabled);
	}

	.button--dash.button--neutral {
		background-color: var(--button-neutral-dash-bg);
		color: var(--button-neutral-dash-text);
		border-color: var(--button-neutral-dash-border);
	}

	.button--dash.button--neutral:hover:not(:disabled) {
		background-color: var(--button-neutral-dash-bg-hover);
		color: var(--button-neutral-dash-text-hover);
		border-color: var(--button-neutral-dash-border-hover);
	}

	.button--dash.button--neutral:active:not(:disabled) {
		background-color: var(--button-neutral-dash-bg-active);
		color: var(--button-neutral-dash-text-active);
		border-color: var(--button-neutral-dash-border-active);
	}

	.button--dash.button--neutral:focus-visible {
		outline: none;
		box-shadow:
			0 0 0 var(--button-focus-ring-offset) transparent,
			0 0 0 calc(var(--button-focus-ring-offset) + var(--button-focus-ring-width))
				var(--button-neutral-focus-ring);
	}

	.button--dash.button--neutral:disabled {
		background-color: var(--button-neutral-dash-bg-disabled);
		color: var(--button-neutral-dash-text-disabled);
		border-color: var(--button-neutral-dash-border-disabled);
	}

	.button--dash.button--accent {
		background-color: var(--button-accent-dash-bg);
		color: var(--button-accent-dash-text);
		border-color: var(--button-accent-dash-border);
	}

	.button--dash.button--accent:hover:not(:disabled) {
		background-color: var(--button-accent-dash-bg-hover);
		color: var(--button-accent-dash-text-hover);
		border-color: var(--button-accent-dash-border-hover);
	}

	.button--dash.button--accent:active:not(:disabled) {
		background-color: var(--button-accent-dash-bg-active);
		color: var(--button-accent-dash-text-active);
		border-color: var(--button-accent-dash-border-active);
	}

	.button--dash.button--accent:focus-visible {
		outline: none;
		box-shadow:
			0 0 0 var(--button-focus-ring-offset) transparent,
			0 0 0 calc(var(--button-focus-ring-offset) + var(--button-focus-ring-width))
				var(--button-accent-focus-ring);
	}

	.button--dash.button--accent:disabled {
		background-color: var(--button-accent-dash-bg-disabled);
		color: var(--button-accent-dash-text-disabled);
		border-color: var(--button-accent-dash-border-disabled);
	}

	.button--dash.button--info {
		background-color: var(--button-info-dash-bg);
		color: var(--button-info-dash-text);
		border-color: var(--button-info-dash-border);
	}

	.button--dash.button--info:hover:not(:disabled) {
		background-color: var(--button-info-dash-bg-hover);
		color: var(--button-info-dash-text-hover);
		border-color: var(--button-info-dash-border-hover);
	}

	.button--dash.button--info:active:not(:disabled) {
		background-color: var(--button-info-dash-bg-active);
		color: var(--button-info-dash-text-active);
		border-color: var(--button-info-dash-border-active);
	}

	.button--dash.button--info:focus-visible {
		outline: none;
		box-shadow:
			0 0 0 var(--button-focus-ring-offset) transparent,
			0 0 0 calc(var(--button-focus-ring-offset) + var(--button-focus-ring-width))
				var(--button-info-focus-ring);
	}

	.button--dash.button--info:disabled {
		background-color: var(--button-info-dash-bg-disabled);
		color: var(--button-info-dash-text-disabled);
		border-color: var(--button-info-dash-border-disabled);
	}

	.button--dash.button--success {
		background-color: var(--button-success-dash-bg);
		color: var(--button-success-dash-text);
		border-color: var(--button-success-dash-border);
	}

	.button--dash.button--success:hover:not(:disabled) {
		background-color: var(--button-success-dash-bg-hover);
		color: var(--button-success-dash-text-hover);
		border-color: var(--button-success-dash-border-hover);
	}

	.button--dash.button--success:active:not(:disabled) {
		background-color: var(--button-success-dash-bg-active);
		color: var(--button-success-dash-text-active);
		border-color: var(--button-success-dash-border-active);
	}

	.button--dash.button--success:focus-visible {
		outline: none;
		box-shadow:
			0 0 0 var(--button-focus-ring-offset) transparent,
			0 0 0 calc(var(--button-focus-ring-offset) + var(--button-focus-ring-width))
				var(--button-success-focus-ring);
	}

	.button--dash.button--success:disabled {
		background-color: var(--button-success-dash-bg-disabled);
		color: var(--button-success-dash-text-disabled);
		border-color: var(--button-success-dash-border-disabled);
	}

	.button--dash.button--warning {
		background-color: var(--button-warning-dash-bg);
		color: var(--button-warning-dash-text);
		border-color: var(--button-warning-dash-border);
	}

	.button--dash.button--warning:hover:not(:disabled) {
		background-color: var(--button-warning-dash-bg-hover);
		color: var(--button-warning-dash-text-hover);
		border-color: var(--button-warning-dash-border-hover);
	}

	.button--dash.button--warning:active:not(:disabled) {
		background-color: var(--button-warning-dash-bg-active);
		color: var(--button-warning-dash-text-active);
		border-color: var(--button-warning-dash-border-active);
	}

	.button--dash.button--warning:focus-visible {
		outline: none;
		box-shadow:
			0 0 0 var(--button-focus-ring-offset) transparent,
			0 0 0 calc(var(--button-focus-ring-offset) + var(--button-focus-ring-width))
				var(--button-warning-focus-ring);
	}

	.button--dash.button--warning:disabled {
		background-color: var(--button-warning-dash-bg-disabled);
		color: var(--button-warning-dash-text-disabled);
		border-color: var(--button-warning-dash-border-disabled);
	}

	.button--dash.button--error {
		background-color: var(--button-error-dash-bg);
		color: var(--button-error-dash-text);
		border-color: var(--button-error-dash-border);
	}

	.button--dash.button--error:hover:not(:disabled) {
		background-color: var(--button-error-dash-bg-hover);
		color: var(--button-error-dash-text-hover);
		border-color: var(--button-error-dash-border-hover);
	}

	.button--dash.button--error:active:not(:disabled) {
		background-color: var(--button-error-dash-bg-active);
		color: var(--button-error-dash-text-active);
		border-color: var(--button-error-dash-border-active);
	}

	.button--dash.button--error:focus-visible {
		outline: none;
		box-shadow:
			0 0 0 var(--button-focus-ring-offset) transparent,
			0 0 0 calc(var(--button-focus-ring-offset) + var(--button-focus-ring-width))
				var(--button-error-focus-ring);
	}

	.button--dash.button--error:disabled {
		background-color: var(--button-error-dash-bg-disabled);
		color: var(--button-error-dash-text-disabled);
		border-color: var(--button-error-dash-border-disabled);
	}

	/* ========== ACTIVE STATE MODIFIER ========== */
	.button--active {
		box-shadow: 0 0 0 var(--button-active-ring-width) currentColor;
	}
</style>
