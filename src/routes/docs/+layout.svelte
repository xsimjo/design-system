<script lang="ts">
	import type { Snippet } from 'svelte';
	import Button from '$lib/components/button/Button.svelte';
	import Header from '$lib/internal/Header.svelte';
	import Tooltip from '$lib/internal/Tooltip.svelte';
	import ThemeSwitcher from '$lib/internal/ThemeSwitcher.svelte';
	import DocsSidebar from '$lib/internal/DocsSidebar.svelte';
	import GithubIcon from '$lib/icons/GithubIcon.svelte';
	import PaletteIcon from '$lib/icons/PaletteIcon.svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	const navGroups = [
		{
			title: 'Docs',
			items: [
				{ label: 'Introduction', href: '/docs' },
				{ label: 'Installation', href: '/docs/installation' },
				{ label: 'Usage', href: '/docs/usage' },
				{ label: 'Theming', href: '/docs/theming' }
			]
		},
		{
			title: 'Components',
			items: [
				{ label: 'Accordion', href: '/docs/accordion' },
				{ label: 'Alert', href: '/docs/alert' },
				{ label: 'Avatar', href: '/docs/avatar' },
				{ label: 'Breadcrumbs', href: '/docs/breadcrumbs' },
				{ label: 'Button', href: '/docs/button' },
				{ label: 'Card', href: '/docs/card' },
				{ label: 'Checkbox', href: '/docs/checkbox' },
				{ label: 'Radio', href: '/docs/radio' },
				{ label: 'Rating', href: '/docs/rating' },
				{ label: 'Switch', href: '/docs/switch' },
				{ label: 'Dropdown', href: '/docs/dropdown' },
				{ label: 'Modal', href: '/docs/modal' },
				{ label: 'Pagination', href: '/docs/pagination' },
				{ label: 'Popover', href: '/docs/popover' },
				{ label: 'Progress', href: '/docs/progress' },
				{ label: 'Field', href: '/docs/field' },
				{ label: 'Input', href: '/docs/input' },
				{ label: 'Badge', href: '/docs/badge' },
				{ label: 'BadgeInput', href: '/docs/badge-input' },
				{ label: 'FileInput', href: '/docs/file-input' },
				{ label: 'Combobox', href: '/docs/combobox' },
				{ label: 'DatePicker', href: '/docs/datepicker' },
				{ label: 'TimePicker', href: '/docs/timepicker' },
				{ label: 'MultiSelect', href: '/docs/multiselect' },
				{ label: 'Select', href: '/docs/select' },
				{ label: 'Slider', href: '/docs/slider' },
				{ label: 'Skeleton', href: '/docs/skeleton' },
				{ label: 'Spinner', href: '/docs/spinner' },
				{ label: 'Table', href: '/docs/table' },
				{ label: 'Tabs', href: '/docs/tabs' },
				{ label: 'Textarea', href: '/docs/textarea' },
				{ label: 'Toast', href: '/docs/toast' },
				{ label: 'Tooltip', href: '/docs/tooltip' },
				{ label: 'Typography', href: '/docs/typography' }
			]
		}
	];
</script>

<svelte:head>
	<title>Documentation - Greenfield UI</title>
</svelte:head>

<div class="docs">
	<Header sticky maxWidth="1400px">
		{#snippet logo()}
			<a href="/" class="logo-link">
				<PaletteIcon size={28} />
				<span class="header-title">Greenfield</span>
				<span class="header-subtitle">UI</span>
			</a>
		{/snippet}
		{#snippet nav()}
			<a href="/"><Button variant="ghost" color="secondary" size="sm">Home</Button></a>
			<a href="/docs"><Button variant="ghost" color="secondary" size="sm">Documentation</Button></a>
			<Button variant="ghost" color="secondary" size="sm">Components</Button>
			<Button variant="ghost" color="secondary" size="sm">Themes</Button>
		{/snippet}
		{#snippet actions()}
			<Tooltip text="View on GitHub" position="bottom">
				<Button
					variant="ghost"
					color="secondary"
					size="sm"
					icon
					onclick={() => window.open('https://github.com', '_blank')}
				>
					<GithubIcon size={18} />
				</Button>
			</Tooltip>
			<ThemeSwitcher />
			<Button variant="outline" color="secondary" size="sm">v0.1.0</Button>
		{/snippet}
	</Header>

	<div class="layout">
		<aside class="sidebar-container">
			<DocsSidebar groups={navGroups} />
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

	.logo-link {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		color: var(--ui-surface-foreground);
		text-decoration: none;
	}

	.header-title {
		font-size: var(--font-size-xl);
		font-weight: var(--ui-weight-bold);
		color: var(--ui-surface-foreground);
		letter-spacing: -0.02em;
	}

	.header-subtitle {
		font-size: var(--font-size-xl);
		font-weight: var(--ui-weight-normal);
		color: var(--ui-primary);
		letter-spacing: -0.02em;
	}

	.layout {
		display: flex;
		flex: 1;
		max-width: 1400px;
		margin: 0 auto;
		min-height: calc(100vh - var(--header-height));
	}

	.sidebar-container {
		position: sticky;
		top: var(--header-height);
		height: calc(100vh - var(--header-height));
		overflow-y: auto;
		flex-shrink: 0;
	}

	.content {
		flex: 1;
		max-width: 1150px;
		padding: var(--space-8);
		display: flex;
		flex-direction: column;
		gap: var(--space-6);
	}
</style>
