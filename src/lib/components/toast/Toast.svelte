<script lang="ts">
	import './toast.css';
	import { toast, type ToastItem } from './toast.svelte.js';
	import Progress from '$lib/components/progress/Progress.svelte';
	import XIcon from '$lib/icons/XIcon.svelte';
	import CircleCheckIcon from '$lib/icons/CircleCheckIcon.svelte';
	import CircleXIcon from '$lib/icons/CircleXIcon.svelte';
	import TriangleAlertIcon from '$lib/icons/TriangleAlertIcon.svelte';
	import InfoIcon from '$lib/icons/InfoIcon.svelte';

	interface Props extends ToastItem {
		showBorder: boolean;
		showProgress: boolean;
	}

	let {
		id,
		message,
		description,
		variant,
		duration,
		dismissible,
		showBorder,
		showProgress
	}: Props = $props();

	const VARIANT_ICONS = {
		success: CircleCheckIcon,
		danger: CircleXIcon,
		warning: TriangleAlertIcon,
		info: InfoIcon
	} as const;

	const IconComponent = $derived(VARIANT_ICONS[variant as keyof typeof VARIANT_ICONS] ?? null);

	let exiting = $state(false);
	let progressValue = $state(100);
	let progressDuration = $state(duration);
	let hovered = $state(false);
	let remaining = duration; // non-reactive, updated manually on pause/resume

	function dismiss() {
		exiting = true;
	}

	function handleTransitionEnd(e: TransitionEvent) {
		if (exiting && e.propertyName === 'max-height') {
			toast.dismiss(id);
		}
	}

	function handleMouseEnter() {
		if (duration > 0) hovered = true;
	}

	function handleMouseLeave() {
		hovered = false;
	}

	$effect(() => {
		if (duration <= 0 || hovered) return;

		const startTime = Date.now();
		let cancelled = false;
		let raf2 = 0;

		// Snap the progress bar to the correct position instantly, then animate
		progressDuration = 0;
		progressValue = (remaining / duration) * 100;

		const raf1 = requestAnimationFrame(() => {
			if (cancelled) return;
			progressDuration = remaining;
			raf2 = requestAnimationFrame(() => {
				if (cancelled) return;
				progressValue = 0;
			});
		});

		const timer = setTimeout(dismiss, remaining);

		return () => {
			cancelled = true;
			remaining = Math.max(0, remaining - (Date.now() - startTime));
			progressDuration = 0;
			progressValue = (remaining / duration) * 100;
			clearTimeout(timer);
			cancelAnimationFrame(raf1);
			cancelAnimationFrame(raf2);
		};
	});
</script>

<div
	class="toast toast--{variant}"
	class:toast--exiting={exiting}
	class:toast--bordered={showBorder}
	ontransitionend={handleTransitionEnd}
	onmouseenter={handleMouseEnter}
	onmouseleave={handleMouseLeave}
	role="status"
	aria-live="polite"
	aria-atomic="true"
	style={duration > 0 ? `--toast-progress-duration: ${progressDuration}ms` : undefined}
>
	{#if IconComponent}
		<span class="toast__icon" aria-hidden="true">
			<IconComponent size={16} />
		</span>
	{/if}

	<div class="toast__body">
		<span class="toast__message">{message}</span>
		{#if description}
			<span class="toast__description">{description}</span>
		{/if}
	</div>

	{#if dismissible}
		<button
			type="button"
			class="toast__dismiss"
			aria-label="Dismiss notification"
			onclick={dismiss}
		>
			<XIcon size={14} />
		</button>
	{/if}

	{#if duration > 0 && showProgress}
		<div class="toast__progress" aria-hidden="true">
			<Progress
				value={progressValue}
				max={100}
				size="xs"
				variant="neutral"
				label="Time remaining"
			/>
		</div>
	{/if}
</div>
