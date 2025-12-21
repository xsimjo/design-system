<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	import { untrack } from 'svelte';
	import Toast from './Toast.svelte';
	import { toastStore, type Toast as ToastType } from './toast.svelte.ts';

	type Position =
		| 'top-left'
		| 'top-center'
		| 'top-right'
		| 'bottom-left'
		| 'bottom-center'
		| 'bottom-right';

	interface Props {
		position?: Position;
		maxToasts?: number;
	}

	let { position = 'top-right', maxToasts = 5 }: Props = $props();

	// eslint-disable-next-line svelte/prefer-svelte-reactivity -- intentionally non-reactive to avoid effect loops
	const timers = new Map<string, ReturnType<typeof setTimeout>>();
	// eslint-disable-next-line svelte/prefer-svelte-reactivity -- intentionally non-reactive to avoid effect loops
	const pausedToasts = new Set<string>();

	const flyDirection = $derived.by(() => {
		if (position.includes('left')) return { x: -100 };
		if (position.includes('right')) return { x: 100 };
		if (position.startsWith('top')) return { y: -100 };
		return { y: 100 };
	});

	const visibleToasts = $derived(toastStore.toasts.slice(-maxToasts));

	function getDefaultDuration(variant: ToastType['variant']): number {
		const durations: Record<ToastType['variant'], string> = {
			success: '--toast-duration-success',
			error: '--toast-duration-error',
			warning: '--toast-duration-warning',
			info: '--toast-duration-info'
		};
		const cssValue = getComputedStyle(document.documentElement).getPropertyValue(
			durations[variant]
		);
		return parseInt(cssValue) || 5000;
	}

	function startTimer(toast: ToastType) {
		if (pausedToasts.has(toast.id) || timers.has(toast.id)) return;

		const duration = toast.duration ?? getDefaultDuration(toast.variant);
		const timer = setTimeout(() => {
			timers.delete(toast.id);
			toastStore.remove(toast.id);
		}, duration);
		timers.set(toast.id, timer);
	}

	function pauseTimer(id: string) {
		pausedToasts.add(id);
		const timer = timers.get(id);
		if (timer) {
			clearTimeout(timer);
			timers.delete(id);
		}
	}

	function resumeTimer(toast: ToastType) {
		pausedToasts.delete(toast.id);
		startTimer(toast);
	}

	function handleDismiss(id: string) {
		const timer = timers.get(id);
		if (timer) {
			clearTimeout(timer);
			timers.delete(id);
		}
		toastStore.remove(id);
	}

	$effect(() => {
		const toasts = visibleToasts;
		untrack(() => {
			toasts.forEach((toast) => {
				startTimer(toast);
			});
		});
	});
</script>

<div class="toast-container toast-container--{position}" aria-label="Notifications">
	{#each visibleToasts as toast (toast.id)}
		<div
			class="toast-wrapper"
			in:fly={{ ...flyDirection, duration: 200 }}
			out:fade={{ duration: 150 }}
			onmouseenter={() => pauseTimer(toast.id)}
			onmouseleave={() => resumeTimer(toast)}
			onfocusin={() => pauseTimer(toast.id)}
			onfocusout={() => resumeTimer(toast)}
			role="presentation"
		>
			<Toast
				variant={toast.variant}
				title={toast.title}
				description={toast.description}
				dismissible={toast.dismissible}
				onDismiss={() => handleDismiss(toast.id)}
			/>
		</div>
	{/each}
</div>

<style>
	.toast-container {
		position: fixed;
		z-index: var(--toast-container-z-index);
		display: flex;
		flex-direction: column;
		gap: var(--toast-container-gap);
		padding: var(--toast-container-padding);
		pointer-events: none;
	}

	.toast-container--top-left {
		top: 0;
		left: 0;
		align-items: flex-start;
	}

	.toast-container--top-center {
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		align-items: center;
	}

	.toast-container--top-right {
		top: 0;
		right: 0;
		align-items: flex-end;
	}

	.toast-container--bottom-left {
		bottom: 0;
		left: 0;
		align-items: flex-start;
		flex-direction: column-reverse;
	}

	.toast-container--bottom-center {
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		align-items: center;
		flex-direction: column-reverse;
	}

	.toast-container--bottom-right {
		bottom: 0;
		right: 0;
		align-items: flex-end;
		flex-direction: column-reverse;
	}

	.toast-wrapper {
		pointer-events: auto;
	}

	@media (prefers-reduced-motion: reduce) {
		.toast-wrapper {
			transition: none;
		}
	}
</style>
