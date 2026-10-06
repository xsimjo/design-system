<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Snippet } from 'svelte';
	import SiteHeader from '$internal/SiteHeader.svelte';
	import MobileMenu from '$internal/MobileMenu.svelte';
	import DocsSidebar, { type NavGroup } from '$internal/DocsSidebar.svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	let isMobileMenuOpen = $state(false);

	const navGroups: NavGroup[] = [
		{
			title: 'Getting Started',
			items: [
				{ label: 'Introduction', href: resolve('/docs') },
				{ label: 'Installation', href: resolve('/docs/installation') },
				{ label: 'Usage', href: resolve('/docs/usage') },
				{ label: 'Theming', href: resolve('/docs/theming') }
			]
		},
		{
			title: 'Form',
			items: [
				{ label: 'Button', href: resolve('/docs/button') },
				{ label: 'Input', href: resolve('/docs/input') },
				{ label: 'Textarea', href: resolve('/docs/textarea') },
				{ label: 'Select', href: resolve('/docs/select') },
				{ label: 'Checkbox', href: resolve('/docs/checkbox') },
				{ label: 'Radio', href: resolve('/docs/radio') },
				{ label: 'Switch', href: resolve('/docs/switch') },
				{ label: 'SegmentedControl', href: resolve('/docs/segmented-control') },
				{ label: 'Slider', href: resolve('/docs/slider') },
				{ label: 'Rating', href: resolve('/docs/rating') },
				{ label: 'Field', href: resolve('/docs/field') },
				{ label: 'ColorPicker', href: resolve('/docs/color-picker') },
				{ label: 'Combobox', href: resolve('/docs/combobox') },
				{ label: 'DatePicker', href: resolve('/docs/datepicker') },
				{ label: 'TimePicker', href: resolve('/docs/timepicker') },
				{ label: 'MultiSelect', href: resolve('/docs/multiselect') },
				{ label: 'FileInput', href: resolve('/docs/file-input') },
				{ label: 'BadgeInput', href: resolve('/docs/badge-input') }
			]
		},
		{
			title: 'Data Display',
			items: [
				{ label: 'Avatar', href: resolve('/docs/avatar') },
				{ label: 'Badge', href: resolve('/docs/badge') },
				{ label: 'BarChart', href: resolve('/docs/bar-chart') },
				{ label: 'Card', href: resolve('/docs/card') },
				{ label: 'Highlight', href: resolve('/docs/highlight') },
				{ label: 'Table', href: resolve('/docs/table') },
				{ label: 'Typography', href: resolve('/docs/typography') },
				{ label: 'Skeleton', href: resolve('/docs/skeleton') }
			]
		},
		{
			title: 'Feedback',
			items: [
				{ label: 'Alert', href: resolve('/docs/alert') },
				{ label: 'Progress', href: resolve('/docs/progress') },
				{ label: 'Spinner', href: resolve('/docs/spinner') },
				{ label: 'Toast', href: resolve('/docs/toast') },
				{ label: 'Tooltip', href: resolve('/docs/tooltip') }
			]
		},
		{
			title: 'Overlay',
			items: [
				{ label: 'Drawer', href: resolve('/docs/drawer') },
				{ label: 'Dropdown', href: resolve('/docs/dropdown') },
				{ label: 'Modal', href: resolve('/docs/modal') },
				{ label: 'Popover', href: resolve('/docs/popover') }
			]
		},
		{
			title: 'Navigation',
			items: [
				{ label: 'Accordion', href: resolve('/docs/accordion') },
				{ label: 'Breadcrumbs', href: resolve('/docs/breadcrumbs') },
				{ label: 'Pagination', href: resolve('/docs/pagination') },
				{ label: 'SideNav', href: resolve('/docs/side-nav') },
				{ label: 'Tabs', href: resolve('/docs/tabs') }
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
