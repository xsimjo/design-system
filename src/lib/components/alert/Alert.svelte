<script lang="ts">
	import './alert.css';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';
	import Button from '$lib/components/button/Button.svelte';
	import XIcon from '$lib/icons/XIcon.svelte';
	import InfoIcon from '$lib/icons/InfoIcon.svelte';
	import CircleCheckIcon from '$lib/icons/CircleCheckIcon.svelte';
	import TriangleAlertIcon from '$lib/icons/TriangleAlertIcon.svelte';
	import CircleXIcon from '$lib/icons/CircleXIcon.svelte';

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
		variant?: 'info' | 'success' | 'warning' | 'danger';
		title?: string;
		dismissible?: boolean;
		ondismiss?: () => void;
		children: Snippet;
	}

	let {
		variant = 'info',
		title,
		dismissible = false,
		ondismiss,
		children,
		...restProps
	}: Props = $props();

	let visible = $state(true);

	function dismiss() {
		visible = false;
		ondismiss?.();
	}
</script>

{#if visible}
	<div
		class="alert alert--{variant}"
		role="alert"
		aria-live="polite"
		aria-atomic="true"
		{...restProps}
	>
		<span class="alert__icon" aria-hidden="true">
			{#if variant === 'success'}
				<CircleCheckIcon size={18} />
			{:else if variant === 'warning'}
				<TriangleAlertIcon size={18} />
			{:else if variant === 'danger'}
				<CircleXIcon size={18} />
			{:else}
				<InfoIcon size={18} />
			{/if}
		</span>

		<div class="alert__body">
			{#if title}
				<p class="alert__title">{title}</p>
			{/if}
			<div class="alert__content">
				{@render children()}
			</div>
		</div>

		{#if dismissible}
			<span class="alert__dismiss">
				<Button
					variant="ghost"
					color="neutral"
					size="sm"
					icon
					aria-label="Dismiss alert"
					onclick={dismiss}
				>
					<XIcon size={14} />
				</Button>
			</span>
		{/if}
	</div>
{/if}
