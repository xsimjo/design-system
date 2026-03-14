<script lang="ts">
	import './button.css';
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes, HTMLAnchorAttributes } from 'svelte/elements';
	import Spinner from '$lib/components/spinner/Spinner.svelte';

	type BaseProps = {
		variant?: 'filled' | 'outline' | 'ghost' | 'soft' | 'link' | 'dash';
		color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'neutral';
		size?: 'sm' | 'md' | 'lg';
		icon?: boolean;
		active?: boolean;
		loading?: boolean;
		fullWidth?: boolean;
		disabled?: boolean;
		children: Snippet;
	};

	type Props = BaseProps &
		Omit<HTMLButtonAttributes, keyof BaseProps> & {
			href?: string;
		};

	let {
		variant = 'filled',
		color = 'primary',
		size = 'md',
		icon = false,
		active = false,
		loading = false,
		fullWidth = false,
		disabled = false,
		href,
		children,
		...restProps
	}: Props = $props();

	const isDisabled = $derived(disabled || loading);
</script>

{#if href}
	<a
		{href}
		class="button button--{variant} button--{color} button--{size}"
		class:button--icon={icon}
		class:button--active={active}
		class:button--loading={loading}
		class:button--full-width={fullWidth}
		aria-disabled={isDisabled || undefined}
		{...restProps as HTMLAnchorAttributes}
	>
		{#if loading}
			<span class="button__loader">
				<Spinner />
			</span>
		{/if}
		<span class="button__content" class:button__content--hidden={loading && icon}>
			{@render children()}
		</span>
	</a>
{:else}
	<button
		class="button button--{variant} button--{color} button--{size}"
		class:button--icon={icon}
		class:button--active={active}
		class:button--loading={loading}
		class:button--full-width={fullWidth}
		disabled={isDisabled}
		{...restProps}
	>
		{#if loading}
			<span class="button__loader">
				<Spinner />
			</span>
		{/if}
		<span class="button__content" class:button__content--hidden={loading && icon}>
			{@render children()}
		</span>
	</button>
{/if}

<style>
	.button {
		--_color: var(--button-color-primary);
		--_foreground: var(--button-color-primary-foreground);

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
		text-decoration: none;
	}

	.button:disabled,
	.button[aria-disabled='true'] {
		cursor: var(--button-cursor-disabled);
		opacity: var(--button-opacity-disabled);
		box-shadow: var(--button-shadow-disabled);
		pointer-events: none;
	}

	.button--primary {
		--_color: var(--button-color-primary);
		--_foreground: var(--button-color-primary-foreground);
	}
	.button--secondary {
		--_color: var(--button-color-secondary);
		--_foreground: var(--button-color-secondary-foreground);
	}
	.button--success {
		--_color: var(--button-color-success);
		--_foreground: var(--button-color-success-foreground);
	}
	.button--danger {
		--_color: var(--button-color-danger);
		--_foreground: var(--button-color-danger-foreground);
	}
	.button--warning {
		--_color: var(--button-color-warning);
		--_foreground: var(--button-color-warning-foreground);
	}
	.button--info {
		--_color: var(--button-color-info);
		--_foreground: var(--button-color-info-foreground);
	}
	.button--neutral {
		--_color: var(--button-color-neutral);
		--_foreground: var(--button-color-neutral-foreground);
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

	.button--filled {
		background-color: var(--_color);
		color: var(--_foreground);
		border-color: var(--_color);
		box-shadow: var(--button-shadow);
	}

	.button--filled:hover:not(:disabled):not([aria-disabled='true']) {
		background-color: color-mix(
			in oklch,
			var(--_color),
			var(--button-mix-hover) var(--button-mix-hover-amount)
		);
		border-color: color-mix(
			in oklch,
			var(--_color),
			var(--button-mix-hover) var(--button-mix-hover-amount)
		);
		box-shadow: var(--button-shadow-hover);
	}

	.button--filled:active:not(:disabled):not([aria-disabled='true']) {
		background-color: color-mix(
			in oklch,
			var(--_color),
			var(--button-mix-active) var(--button-mix-active-amount)
		);
		border-color: color-mix(
			in oklch,
			var(--_color),
			var(--button-mix-active) var(--button-mix-active-amount)
		);
		box-shadow: var(--button-shadow-active);
	}

	.button--filled:focus-visible {
		outline: none;
		box-shadow:
			0 0 0 var(--button-focus-ring-offset) var(--_color),
			0 0 0 calc(var(--button-focus-ring-offset) + var(--button-focus-ring-width))
				color-mix(in oklch, var(--_color), transparent 50%);
	}

	.button--filled:disabled,
	.button--filled[aria-disabled='true'] {
		background-color: var(--button-disabled-bg);
		color: var(--button-disabled-text);
		border-color: var(--button-disabled-border);
	}

	.button--outline {
		background-color: transparent;
		color: var(--_color);
		border-color: var(--_color);
	}

	.button--outline.button--secondary {
		color: var(--button-secondary-text);
		border-color: color-mix(in oklch, var(--_color), transparent 50%);
	}

	.button--outline:hover:not(:disabled):not([aria-disabled='true']) {
		background-color: color-mix(in oklch, var(--_color), transparent 92%);
		color: color-mix(
			in oklch,
			var(--_color),
			var(--button-mix-hover) var(--button-mix-hover-amount)
		);
		border-color: color-mix(in oklch, var(--_color), var(--button-mix-hover) 10%);
	}

	.button--outline:active:not(:disabled):not([aria-disabled='true']) {
		background-color: color-mix(in oklch, var(--_color), transparent 85%);
		color: color-mix(
			in oklch,
			var(--_color),
			var(--button-mix-active) var(--button-mix-active-amount)
		);
		border-color: color-mix(in oklch, var(--_color), var(--button-mix-active) 20%);
	}

	.button--outline:focus-visible {
		outline: none;
		box-shadow:
			0 0 0 var(--button-focus-ring-offset) transparent,
			0 0 0 calc(var(--button-focus-ring-offset) + var(--button-focus-ring-width))
				color-mix(in oklch, var(--_color), transparent 50%);
	}

	.button--outline:disabled,
	.button--outline[aria-disabled='true'] {
		background-color: transparent;
		color: var(--button-disabled-text);
		border-color: var(--button-disabled-border);
	}

	.button--ghost {
		background-color: transparent;
		color: var(--_color);
		border-color: transparent;
	}

	.button--ghost.button--secondary {
		color: var(--button-secondary-text);
	}

	.button--ghost:hover:not(:disabled):not([aria-disabled='true']) {
		background-color: color-mix(in oklch, var(--_color), transparent 90%);
		color: color-mix(
			in oklch,
			var(--_color),
			var(--button-mix-hover) var(--button-mix-hover-amount)
		);
	}

	.button--ghost:active:not(:disabled):not([aria-disabled='true']) {
		background-color: color-mix(in oklch, var(--_color), transparent 82%);
		color: color-mix(
			in oklch,
			var(--_color),
			var(--button-mix-active) var(--button-mix-active-amount)
		);
	}

	.button--ghost:focus-visible {
		outline: none;
		box-shadow:
			0 0 0 var(--button-focus-ring-offset) transparent,
			0 0 0 calc(var(--button-focus-ring-offset) + var(--button-focus-ring-width))
				color-mix(in oklch, var(--_color), transparent 50%);
	}

	.button--ghost:disabled,
	.button--ghost[aria-disabled='true'] {
		background-color: transparent;
		color: var(--button-disabled-text);
	}

	.button--soft {
		background-color: color-mix(in oklch, var(--_color), transparent 85%);
		color: color-mix(in oklch, var(--_color), var(--button-mix-hover) 10%);
		border-color: transparent;
	}

	.button--soft:hover:not(:disabled):not([aria-disabled='true']) {
		background-color: color-mix(in oklch, var(--_color), transparent 78%);
		color: color-mix(
			in oklch,
			var(--_color),
			var(--button-mix-hover) var(--button-mix-hover-amount)
		);
	}

	.button--soft:active:not(:disabled):not([aria-disabled='true']) {
		background-color: color-mix(in oklch, var(--_color), transparent 70%);
		color: color-mix(
			in oklch,
			var(--_color),
			var(--button-mix-active) var(--button-mix-active-amount)
		);
	}

	.button--soft:focus-visible {
		outline: none;
		box-shadow:
			0 0 0 var(--button-focus-ring-offset) transparent,
			0 0 0 calc(var(--button-focus-ring-offset) + var(--button-focus-ring-width))
				color-mix(in oklch, var(--_color), transparent 50%);
	}

	.button--soft:disabled,
	.button--soft[aria-disabled='true'] {
		background-color: var(--button-disabled-bg);
		color: var(--button-disabled-text);
	}

	.button--link {
		background-color: transparent;
		color: var(--_color);
		border-color: transparent;
		text-decoration: underline;
		box-shadow: none;
	}

	.button--link.button--secondary {
		color: var(--button-secondary-text);
	}

	.button--link:hover:not(:disabled):not([aria-disabled='true']) {
		color: color-mix(
			in oklch,
			var(--_color),
			var(--button-mix-hover) var(--button-mix-hover-amount)
		);
	}

	.button--link:active:not(:disabled):not([aria-disabled='true']) {
		color: color-mix(
			in oklch,
			var(--_color),
			var(--button-mix-active) var(--button-mix-active-amount)
		);
	}

	.button--link:focus-visible {
		outline: none;
		box-shadow:
			0 0 0 var(--button-focus-ring-offset) transparent,
			0 0 0 calc(var(--button-focus-ring-offset) + var(--button-focus-ring-width))
				color-mix(in oklch, var(--_color), transparent 50%);
	}

	.button--link:disabled,
	.button--link[aria-disabled='true'] {
		color: var(--button-disabled-text);
	}

	.button--dash {
		background-color: transparent;
		color: var(--_color);
		border-color: color-mix(in oklch, var(--_color), transparent 40%);
		border-style: dashed;
	}

	.button--dash.button--secondary {
		color: var(--button-secondary-text);
	}

	.button--dash:hover:not(:disabled):not([aria-disabled='true']) {
		background-color: color-mix(in oklch, var(--_color), transparent 92%);
		color: color-mix(
			in oklch,
			var(--_color),
			var(--button-mix-hover) var(--button-mix-hover-amount)
		);
		border-color: color-mix(in oklch, var(--_color), transparent 20%);
	}

	.button--dash:active:not(:disabled):not([aria-disabled='true']) {
		background-color: color-mix(in oklch, var(--_color), transparent 85%);
		color: color-mix(
			in oklch,
			var(--_color),
			var(--button-mix-active) var(--button-mix-active-amount)
		);
		border-color: var(--_color);
	}

	.button--dash:focus-visible {
		outline: none;
		box-shadow:
			0 0 0 var(--button-focus-ring-offset) transparent,
			0 0 0 calc(var(--button-focus-ring-offset) + var(--button-focus-ring-width))
				color-mix(in oklch, var(--_color), transparent 50%);
	}

	.button--dash:disabled,
	.button--dash[aria-disabled='true'] {
		background-color: transparent;
		color: var(--button-disabled-text);
		border-color: var(--button-disabled-border);
	}

	.button--active {
		box-shadow: 0 0 0 var(--button-active-ring-width) var(--_color);
	}

	.button--full-width {
		width: 100%;
	}

	.button--loading {
		position: relative;
	}

	.button__content {
		display: inline-flex;
		align-items: center;
		gap: inherit;
	}

	.button__content--hidden {
		visibility: hidden;
	}

	.button--loading .button__content:not(.button__content--hidden) {
		opacity: 0.7;
	}

	.button__loader {
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}

	.button--icon .button__loader {
		position: absolute;
		inset: 0;
		display: flex;
	}
</style>
