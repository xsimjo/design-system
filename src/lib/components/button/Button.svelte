<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface Props extends HTMLButtonAttributes {
		variant?: 'primary' | 'secondary';
		size?: 'sm' | 'md' | 'lg';
		children: Snippet;
	}

	let { variant = 'primary', size = 'md', children, ...restProps }: Props = $props();
</script>

<button class="button button--{variant} button--{size}" {...restProps}>
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

	.button--primary {
		background-color: var(--button-primary-bg);
		color: var(--button-primary-text);
		border-color: var(--button-primary-border);
		box-shadow: var(--button-shadow);
	}

	.button--primary:hover:not(:disabled) {
		background-color: var(--button-primary-bg-hover);
		color: var(--button-primary-text-hover);
		border-color: var(--button-primary-border-hover);
		box-shadow: var(--button-shadow-hover);
	}

	.button--primary:active:not(:disabled) {
		background-color: var(--button-primary-bg-active);
		color: var(--button-primary-text-active);
		border-color: var(--button-primary-border-active);
		box-shadow: var(--button-shadow-active);
	}

	.button--primary:focus-visible {
		outline: none;
		box-shadow:
			0 0 0 var(--button-focus-ring-offset) var(--button-primary-bg),
			0 0 0 calc(var(--button-focus-ring-offset) + var(--button-focus-ring-width))
				var(--button-primary-focus-ring);
	}

	.button--primary:disabled {
		background-color: var(--button-primary-bg-disabled);
		color: var(--button-primary-text-disabled);
		border-color: var(--button-primary-border-disabled);
	}

	.button--secondary {
		background-color: var(--button-secondary-bg);
		color: var(--button-secondary-text);
		border-color: var(--button-secondary-border);
		box-shadow: var(--button-shadow);
	}

	.button--secondary:hover:not(:disabled) {
		background-color: var(--button-secondary-bg-hover);
		color: var(--button-secondary-text-hover);
		border-color: var(--button-secondary-border-hover);
		box-shadow: var(--button-shadow-hover);
	}

	.button--secondary:active:not(:disabled) {
		background-color: var(--button-secondary-bg-active);
		color: var(--button-secondary-text-active);
		border-color: var(--button-secondary-border-active);
		box-shadow: var(--button-shadow-active);
	}

	.button--secondary:focus-visible {
		outline: none;
		box-shadow:
			0 0 0 var(--button-focus-ring-offset) var(--button-secondary-bg),
			0 0 0 calc(var(--button-focus-ring-offset) + var(--button-focus-ring-width))
				var(--button-secondary-focus-ring);
	}

	.button--secondary:disabled {
		background-color: var(--button-secondary-bg-disabled);
		color: var(--button-secondary-text-disabled);
		border-color: var(--button-secondary-border-disabled);
	}

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
</style>
