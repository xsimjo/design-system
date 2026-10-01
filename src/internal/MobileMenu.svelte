<script lang="ts">
	import type { Snippet } from 'svelte';
	import Button from '$lib/components/button/Button.svelte';
	import MenuIcon from '$lib/icons/MenuIcon.svelte';
	import XIcon from '$lib/icons/XIcon.svelte';

	interface Props {
		isOpen?: boolean;
		onchange?: (isOpen: boolean) => void;
		links?: Snippet;
	}

	let { isOpen = $bindable(false), onchange, links }: Props = $props();

	function close() {
		isOpen = false;
		onchange?.(false);
	}

	function toggle() {
		isOpen = !isOpen;
		onchange?.(isOpen);
	}
</script>

<Button
	variant="ghost"
	color="secondary"
	size="sm"
	isIcon
	onclick={toggle}
	aria-label={isOpen ? 'Close menu' : 'Open menu'}
	aria-expanded={isOpen}
>
	{#if isOpen}
		<XIcon size={20} />
	{:else}
		<MenuIcon size={20} />
	{/if}
</Button>

{#if isOpen && links}
	<button class="mobile-backdrop" onclick={close} aria-label="Close navigation"></button>
	<nav class="mobile-nav">
		{@render links()}
	</nav>
{/if}

<style>
	.mobile-backdrop {
		display: none;
	}

	.mobile-nav {
		display: none;
	}

	@media (max-width: 768px) {
		.mobile-backdrop {
			display: block;
			position: fixed;
			inset: 0;
			top: var(--header-height);
			background-color: color-mix(in oklch, var(--ui-surface-foreground) 50%, transparent);
			z-index: calc(var(--z-dropdown) - 1);
			border: none;
			cursor: default;
		}

		.mobile-nav {
			display: flex;
			flex-direction: column;
			position: fixed;
			top: var(--header-height);
			left: 0;
			width: 260px;
			height: calc(100vh - var(--header-height));
			background-color: var(--ui-surface);
			border-right: 1px solid var(--ui-border);
			z-index: var(--z-dropdown);
			padding: var(--space-4);
			gap: var(--space-1);
			overflow-y: auto;
			animation: slideIn 200ms var(--ui-base-easing);
		}

		.mobile-nav :global(a) {
			display: block;
			padding: var(--space-2) var(--space-3);
			font-size: var(--ui-text-sm);
			color: var(--ui-surface-foreground);
			text-decoration: none;
			border-radius: var(--ui-base-radius);
			transition: background-color var(--ui-base-duration) var(--ui-base-easing);
		}

		.mobile-nav :global(a:hover) {
			background-color: color-mix(in oklch, var(--ui-surface-foreground) 6%, transparent);
		}
	}

	@keyframes slideIn {
		from {
			transform: translateX(-100%);
		}
		to {
			transform: translateX(0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.mobile-nav {
			animation: none;
		}
	}
</style>
