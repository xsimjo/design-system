<script lang="ts">
	import type { ToastVariant } from './toast.svelte.ts';
	import Button from '$lib/components/button/Button.svelte';
	import CircleCheckIcon from '$lib/icons/CircleCheckIcon.svelte';
	import CircleXIcon from '$lib/icons/CircleXIcon.svelte';
	import TriangleAlertIcon from '$lib/icons/TriangleAlertIcon.svelte';
	import InfoIcon from '$lib/icons/InfoIcon.svelte';
	import XIcon from '$lib/icons/XIcon.svelte';

	interface Props {
		variant: ToastVariant;
		title: string;
		description?: string;
		dismissible?: boolean;
		onDismiss?: () => void;
	}

	let { variant, title, description, dismissible = true, onDismiss }: Props = $props();

	const iconComponents = {
		success: CircleCheckIcon,
		error: CircleXIcon,
		warning: TriangleAlertIcon,
		info: InfoIcon
	} as const;

	const IconComponent = $derived(iconComponents[variant]);
	const role = variant === 'error' || variant === 'warning' ? 'alert' : 'status';
</script>

<div class="toast toast--{variant}" {role} aria-live={role === 'alert' ? 'assertive' : 'polite'}>
	<div class="toast__accent"></div>
	<div class="toast__icon">
		<IconComponent size="var(--toast-icon-size)" />
	</div>
	<div class="toast__content">
		<p class="toast__title">{title}</p>
		{#if description}
			<p class="toast__description">{description}</p>
		{/if}
	</div>
	{#if dismissible}
		<Button
			variant="ghost"
			color="secondary"
			size="sm"
			icon
			aria-label="Dismiss"
			onclick={onDismiss}
		>
			<XIcon size={14} />
		</Button>
	{/if}
</div>

<style>
	.toast {
		position: relative;
		display: flex;
		align-items: flex-start;
		width: var(--toast-width);
		padding: var(--toast-padding-y) var(--toast-padding-x);
		gap: var(--toast-icon-gap);
		background-color: var(--toast-bg);
		border: var(--toast-border-width) solid var(--toast-border);
		border-radius: var(--toast-border-radius);
		box-shadow: var(--toast-shadow);
		overflow: hidden;
	}

	.toast__accent {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		width: var(--toast-accent-width);
	}

	.toast--success .toast__accent {
		background-color: var(--toast-accent-success);
	}

	.toast--error .toast__accent {
		background-color: var(--toast-accent-error);
	}

	.toast--warning .toast__accent {
		background-color: var(--toast-accent-warning);
	}

	.toast--info .toast__accent {
		background-color: var(--toast-accent-info);
	}

	.toast__icon {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-left: var(--toast-accent-width);
	}

	.toast--success .toast__icon {
		color: var(--toast-icon-success);
	}

	.toast--error .toast__icon {
		color: var(--toast-icon-error);
	}

	.toast--warning .toast__icon {
		color: var(--toast-icon-warning);
	}

	.toast--info .toast__icon {
		color: var(--toast-icon-info);
	}

	.toast__content {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: var(--toast-description-gap);
	}

	.toast__title {
		margin: 0;
		color: var(--toast-title-color);
		font-family: var(--toast-title-font-family);
		font-size: var(--toast-title-font-size);
		font-weight: var(--toast-title-font-weight);
		line-height: var(--toast-title-line-height);
	}

	.toast__description {
		margin: 0;
		color: var(--toast-description-color);
		font-size: var(--toast-description-font-size);
		font-weight: var(--toast-description-font-weight);
		line-height: var(--toast-description-line-height);
	}
</style>
