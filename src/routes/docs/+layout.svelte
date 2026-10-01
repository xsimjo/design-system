<script lang="ts">
	import type { Snippet } from 'svelte';
	import SiteHeader from '$internal/SiteHeader.svelte';
	import MobileMenu from '$internal/MobileMenu.svelte';
	import DocsSidebar from '$internal/DocsSidebar.svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	let isMobileMenuOpen = $state(false);

	const navGroups = [
		{
			title: 'Getting Started',
			items: [
				{ label: 'Introduction', href: '/docs' },
				{ label: 'Installation', href: '/docs/installation' },
				{ label: 'Usage', href: '/docs/usage' },
				{ label: 'Theming', href: '/docs/theming' }
			]
		},
		{
			title: 'Form',
			items: [
				{ label: 'Button', href: '/docs/button' },
				{ label: 'Input', href: '/docs/input' },
				{ label: 'Textarea', href: '/docs/textarea' },
				{ label: 'Select', href: '/docs/select' },
				{ label: 'Checkbox', href: '/docs/checkbox' },
				{ label: 'Radio', href: '/docs/radio' },
				{ label: 'Switch', href: '/docs/switch' },
				{ label: 'Slider', href: '/docs/slider' },
				{ label: 'Rating', href: '/docs/rating' },
				{ label: 'Field', href: '/docs/field' },
				{ label: 'ColorPicker', href: '/docs/color-picker' },
				{ label: 'Combobox', href: '/docs/combobox' },
				{ label: 'DatePicker', href: '/docs/datepicker' },
				{ label: 'TimePicker', href: '/docs/timepicker' },
				{ label: 'MultiSelect', href: '/docs/multiselect' },
				{ label: 'FileInput', href: '/docs/file-input' },
				{ label: 'BadgeInput', href: '/docs/badge-input' }
			]
		},
		{
			title: 'Data Display',
			items: [
				{ label: 'Avatar', href: '/docs/avatar' },
				{ label: 'Badge', href: '/docs/badge' },
				{ label: 'Card', href: '/docs/card' },
				{ label: 'Table', href: '/docs/table' },
				{ label: 'Typography', href: '/docs/typography' },
				{ label: 'Skeleton', href: '/docs/skeleton' }
			]
		},
		{
			title: 'Feedback',
			items: [
				{ label: 'Alert', href: '/docs/alert' },
				{ label: 'Progress', href: '/docs/progress' },
				{ label: 'Spinner', href: '/docs/spinner' },
				{ label: 'Toast', href: '/docs/toast' },
				{ label: 'Tooltip', href: '/docs/tooltip' }
			]
		},
		{
			title: 'Overlay',
			items: [
				{ label: 'Drawer', href: '/docs/drawer' },
				{ label: 'Dropdown', href: '/docs/dropdown' },
				{ label: 'Modal', href: '/docs/modal' },
				{ label: 'Popover', href: '/docs/popover' }
			]
		},
		{
			title: 'Navigation',
			items: [
				{ label: 'Accordion', href: '/docs/accordion' },
				{ label: 'Breadcrumbs', href: '/docs/breadcrumbs' },
				{ label: 'Pagination', href: '/docs/pagination' },
				{ label: 'SideNav', href: '/docs/side-nav' },
				{ label: 'Tabs', href: '/docs/tabs' }
			]
		}
	];
</script>

<svelte:head>
	<title>Documentation - Greenfield UI</title>
</svelte:head>

<div class="docs">
	<SiteHeader>
		{#snippet hamburger()}
			<MobileMenu bind:isOpen={isMobileMenuOpen} />
		{/snippet}
	</SiteHeader>

	<div class="layout">
		{#if isMobileMenuOpen}
			<button
				class="mobile-backdrop"
				onclick={() => (isMobileMenuOpen = false)}
				aria-label="Close navigation"
			></button>
		{/if}

		<aside class="sidebar-container" class:sidebar-container--open={isMobileMenuOpen}>
			<DocsSidebar groups={navGroups} onclose={() => (isMobileMenuOpen = false)} />
		</aside>

		<main class="content">
			{@render children()}
		</main>
	</div>
</div>

<style>
	.docs {
		min-height: 100vh;
		background-color: var(--ui-surface);
		display: flex;
		flex-direction: column;
	}

	.layout {
		display: flex;
		flex: 1;
		max-width: 1500px;
		margin: 0 auto;
		width: 100%;
		min-height: calc(100vh - var(--header-height));
	}

	.sidebar-container {
		position: sticky;
		top: var(--header-height);
		width: 260px;
		height: calc(100vh - var(--header-height));
		overflow-y: auto;
		flex-shrink: 0;
		padding-left: var(--space-3);
	}

	.content {
		flex: 1;
		max-width: 1240px;
		padding: var(--space-8);
		display: flex;
		flex-direction: column;
		gap: var(--space-6);
	}

	.mobile-backdrop {
		display: none;
	}

	@media (max-width: 768px) {
		.sidebar-container {
			position: fixed;
			top: var(--header-height);
			left: 0;
			width: 280px;
			height: calc(100vh - var(--header-height));
			background-color: var(--ui-surface);
			z-index: var(--z-overlay, 40);
			transform: translateX(-100%);
			transition: transform var(--ui-base-duration) var(--ui-base-easing);
			padding-left: var(--space-3);
			border-right: 1px solid var(--ui-border);
			overflow-y: auto;
		}

		.sidebar-container--open {
			transform: translateX(0);
		}

		.mobile-backdrop {
			display: block;
			position: fixed;
			inset: 0;
			top: var(--header-height);
			background-color: color-mix(in oklch, var(--ui-surface-foreground) 50%, transparent);
			z-index: calc(var(--z-overlay, 40) - 1);
			border: none;
			cursor: default;
		}

		.content {
			padding: var(--space-4);
		}
	}
</style>
