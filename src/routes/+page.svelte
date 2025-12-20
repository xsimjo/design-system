<script lang="ts">
	import Button from '$lib/components/button/Button.svelte';
	import { Card } from '$lib/components/card';
	import { Header } from '$lib/components/header';
	import { Avatar } from '$lib/components/avatar';
	import { Tooltip } from '$lib/components/tooltip';

	type Theme = 'light' | 'dark' | 'dev';
	const themes: Theme[] = ['light', 'dark', 'dev'];

	let theme = $state<Theme>('light');

	function nextTheme() {
		const currentIndex = themes.indexOf(theme);
		theme = themes[(currentIndex + 1) % themes.length];
		document.documentElement.setAttribute('data-theme', theme);
	}

	function getThemeLabel(t: Theme): string {
		return t.charAt(0).toUpperCase() + t.slice(1);
	}

	const primitiveTokens = {
		'Colors - Blue': [
			'--color-blue-50',
			'--color-blue-100',
			'--color-blue-200',
			'--color-blue-300',
			'--color-blue-400',
			'--color-blue-500',
			'--color-blue-600',
			'--color-blue-700',
			'--color-blue-800',
			'--color-blue-900',
			'--color-blue-950'
		],
		'Colors - Slate': [
			'--color-slate-50',
			'--color-slate-100',
			'--color-slate-200',
			'--color-slate-300',
			'--color-slate-400',
			'--color-slate-500',
			'--color-slate-600',
			'--color-slate-700',
			'--color-slate-800',
			'--color-slate-900',
			'--color-slate-950'
		],
		'Colors - Gray': [
			'--color-white',
			'--color-black',
			'--color-gray-50',
			'--color-gray-100',
			'--color-gray-200',
			'--color-gray-300',
			'--color-gray-400',
			'--color-gray-500',
			'--color-gray-600',
			'--color-gray-700',
			'--color-gray-800',
			'--color-gray-900',
			'--color-gray-950'
		],
		Spacing: [
			'--space-0',
			'--space-1',
			'--space-2',
			'--space-3',
			'--space-4',
			'--space-5',
			'--space-6',
			'--space-8',
			'--space-10',
			'--space-12',
			'--space-16',
			'--space-20',
			'--space-24',
			'--space-32'
		],
		'Border Radius': [
			'--radius-none',
			'--radius-sm',
			'--radius-md',
			'--radius-lg',
			'--radius-xl',
			'--radius-2xl',
			'--radius-3xl',
			'--radius-full'
		],
		'Border Width': [
			'--border-width-0',
			'--border-width-1',
			'--border-width-2',
			'--border-width-4'
		],
		'Font Size': [
			'--font-size-xs',
			'--font-size-sm',
			'--font-size-md',
			'--font-size-lg',
			'--font-size-xl',
			'--font-size-2xl',
			'--font-size-3xl',
			'--font-size-4xl'
		],
		'Font Weight': [
			'--font-weight-normal',
			'--font-weight-medium',
			'--font-weight-semibold',
			'--font-weight-bold'
		],
		'Line Height': [
			'--line-height-none',
			'--line-height-tight',
			'--line-height-normal',
			'--line-height-relaxed'
		],
		Shadow: ['--shadow-sm', '--shadow-md', '--shadow-lg', '--shadow-xl', '--shadow-focus'],
		Transition: ['--transition-fast', '--transition-base', '--transition-slow'],
		'Z-Index': [
			'--z-base',
			'--z-dropdown',
			'--z-sticky',
			'--z-fixed',
			'--z-modal',
			'--z-popover',
			'--z-tooltip'
		],
		Opacity: [
			'--opacity-0',
			'--opacity-5',
			'--opacity-10',
			'--opacity-20',
			'--opacity-30',
			'--opacity-40',
			'--opacity-50',
			'--opacity-60',
			'--opacity-70',
			'--opacity-80',
			'--opacity-90',
			'--opacity-100'
		]
	};

	const semanticTokens = {
		Typography: ['--font-sans', '--font-mono'],
		Page: ['--page-bg', '--page-text'],
		Header: ['--header-bg', '--header-border', '--header-text'],
		Card: ['--card-bg', '--card-border', '--card-shadow', '--card-radius'],
		Section: ['--section-title', '--section-description', '--section-label'],
		'Button - Primary': [
			'--button-primary-bg',
			'--button-primary-bg-hover',
			'--button-primary-bg-active',
			'--button-primary-bg-disabled',
			'--button-primary-text',
			'--button-primary-text-hover',
			'--button-primary-text-active',
			'--button-primary-text-disabled',
			'--button-primary-border',
			'--button-primary-border-hover',
			'--button-primary-border-active',
			'--button-primary-border-disabled',
			'--button-primary-focus-ring'
		],
		'Button - Secondary': [
			'--button-secondary-bg',
			'--button-secondary-bg-hover',
			'--button-secondary-bg-active',
			'--button-secondary-bg-disabled',
			'--button-secondary-text',
			'--button-secondary-text-hover',
			'--button-secondary-text-active',
			'--button-secondary-text-disabled',
			'--button-secondary-border',
			'--button-secondary-border-hover',
			'--button-secondary-border-active',
			'--button-secondary-border-disabled',
			'--button-secondary-focus-ring'
		],
		'Button - Sizing': [
			'--button-sm-height',
			'--button-sm-padding-x',
			'--button-sm-padding-y',
			'--button-sm-font-size',
			'--button-sm-gap',
			'--button-sm-icon-size',
			'--button-md-height',
			'--button-md-padding-x',
			'--button-md-padding-y',
			'--button-md-font-size',
			'--button-md-gap',
			'--button-md-icon-size',
			'--button-lg-height',
			'--button-lg-padding-x',
			'--button-lg-padding-y',
			'--button-lg-font-size',
			'--button-lg-gap',
			'--button-lg-icon-size'
		],
		'Button - Shared': [
			'--button-font-family',
			'--button-font-weight',
			'--button-line-height',
			'--button-border-width',
			'--button-border-radius',
			'--button-shadow',
			'--button-shadow-hover',
			'--button-shadow-active',
			'--button-shadow-disabled',
			'--button-focus-ring-width',
			'--button-focus-ring-offset',
			'--button-focus-ring-opacity',
			'--button-transition',
			'--button-opacity-disabled',
			'--button-cursor-default',
			'--button-cursor-disabled'
		],
		'Avatar - Sizing': [
			'--avatar-sm-size',
			'--avatar-sm-font-size',
			'--avatar-sm-icon-size',
			'--avatar-md-size',
			'--avatar-md-font-size',
			'--avatar-md-icon-size',
			'--avatar-lg-size',
			'--avatar-lg-font-size',
			'--avatar-lg-icon-size'
		],
		'Avatar - Appearance': [
			'--avatar-bg',
			'--avatar-text',
			'--avatar-border',
			'--avatar-border-width',
			'--avatar-radius-circle',
			'--avatar-font-family',
			'--avatar-font-weight',
			'--avatar-transition'
		],
		'Avatar - Status': [
			'--avatar-status-size-sm',
			'--avatar-status-size-md',
			'--avatar-status-size-lg',
			'--avatar-status-border-width',
			'--avatar-status-border-color',
			'--avatar-status-online-bg',
			'--avatar-status-offline-bg',
			'--avatar-status-away-bg',
			'--avatar-status-busy-bg'
		],
		Tooltip: [
			'--tooltip-bg',
			'--tooltip-text',
			'--tooltip-shadow',
			'--tooltip-radius',
			'--tooltip-padding-x',
			'--tooltip-padding-y',
			'--tooltip-font-family',
			'--tooltip-font-size',
			'--tooltip-arrow-size',
			'--tooltip-arrow-color'
		]
	};

	function isColorToken(token: string): boolean {
		return token.startsWith('--color-');
	}
</script>

<svelte:head>
	<title>Design System Showcase</title>
</svelte:head>

<div class="showcase">
	<header class="page-header">
		<h1>Design System</h1>
		<Button variant="outline" color="neutral" size="sm" onclick={nextTheme}>
			Theme: {getThemeLabel(theme)}
		</Button>
	</header>

	<main class="content">
		<section class="section">
			<h2 class="section-title">Button</h2>
			<p class="description">A versatile button component with multiple variants and colors.</p>

			<div class="subsection">
				<h3>Style Variants (Filled color=primary)</h3>
				<div class="row">
					<Button variant="filled">Filled</Button>
					<Button variant="outline">Outline</Button>
					<Button variant="ghost">Ghost</Button>
					<Button variant="soft">Soft</Button>
					<Button variant="link">Link</Button>
					<Button variant="dash">Dash</Button>
				</div>
			</div>

			<div class="subsection">
				<h3>Colors (Filled variant)</h3>
				<div class="row">
					<Button color="primary">Primary</Button>
					<Button color="neutral">Neutral</Button>
					<Button color="accent">Accent</Button>
					<Button color="info">Info</Button>
					<Button color="success">Success</Button>
					<Button color="warning">Warning</Button>
					<Button color="error">Error</Button>
				</div>
			</div>

			<div class="subsection">
				<h3>Outline Variant Colors</h3>
				<div class="row">
					<Button variant="outline" color="primary">Primary</Button>
					<Button variant="outline" color="neutral">Neutral</Button>
					<Button variant="outline" color="success">Success</Button>
					<Button variant="outline" color="warning">Warning</Button>
					<Button variant="outline" color="error">Error</Button>
				</div>
			</div>

			<div class="subsection">
				<h3>Ghost Variant Colors</h3>
				<div class="row">
					<Button variant="ghost" color="primary">Primary</Button>
					<Button variant="ghost" color="neutral">Neutral</Button>
					<Button variant="ghost" color="success">Success</Button>
					<Button variant="ghost" color="warning">Warning</Button>
					<Button variant="ghost" color="error">Error</Button>
				</div>
			</div>

			<div class="subsection">
				<h3>Soft Variant Colors</h3>
				<div class="row">
					<Button variant="soft" color="primary">Primary</Button>
					<Button variant="soft" color="neutral">Neutral</Button>
					<Button variant="soft" color="success">Success</Button>
					<Button variant="soft" color="warning">Warning</Button>
					<Button variant="soft" color="error">Error</Button>
				</div>
			</div>

			<div class="subsection">
				<h3>Sizes</h3>
				<div class="row">
					<Button size="sm">Small</Button>
					<Button size="md">Medium</Button>
					<Button size="lg">Large</Button>
				</div>
			</div>

			<div class="subsection">
				<h3>Icon Buttons</h3>
				<div class="row">
					<Button icon size="sm" variant="filled" color="primary">+</Button>
					<Button icon size="md" variant="outline" color="neutral">×</Button>
					<Button icon size="lg" variant="ghost" color="error">!</Button>
				</div>
			</div>

			<div class="subsection">
				<h3>States</h3>
				<div class="row">
					<Button color="primary">Default</Button>
					<Button color="primary" disabled>Disabled</Button>
					<Button color="primary" active>Active</Button>
				</div>
				<div class="row">
					<Button variant="outline" color="neutral">Default</Button>
					<Button variant="outline" color="neutral" disabled>Disabled</Button>
				</div>
			</div>
		</section>

		<section class="section">
			<h2 class="section-title">Card</h2>
			<p class="description">
				A container component for grouping related content with optional header and footer.
			</p>

			<div class="subsection">
				<h3>Basic</h3>
				<Card>
					<p>A simple card with default padding.</p>
				</Card>
			</div>

			<div class="subsection">
				<h3>With Header and Footer</h3>
				<Card>
					{#snippet header()}
						<h4 class="card-title">Card Title</h4>
					{/snippet}

					<p>This card has a header and footer section with borders separating the content.</p>

					{#snippet footer()}
						<div class="row">
							<Button variant="secondary" size="sm">Cancel</Button>
							<Button variant="primary" size="sm">Save</Button>
						</div>
					{/snippet}
				</Card>
			</div>

			<div class="subsection">
				<h3>Interactive</h3>
				<div class="card-grid">
					<Card interactive>
						<h4 class="card-title">Hover Me</h4>
						<p>Interactive cards respond to hover with shadow and border changes.</p>
					</Card>
					<Card interactive>
						<h4 class="card-title">Click Target</h4>
						<p>Great for navigation or selection patterns.</p>
					</Card>
				</div>
			</div>
		</section>

		<section class="section">
			<h2 class="section-title">Header</h2>
			<p class="description">
				A persistent navigation element with logo, navigation items, and actions.
			</p>

			<div class="subsection">
				<h3>With Logo, Nav, and Actions</h3>
				<div class="header-preview">
					<Header sticky={false}>
						{#snippet logo()}
							<span class="logo-text">Logo</span>
						{/snippet}

						{#snippet nav()}
							<Button variant="secondary" size="sm">Home</Button>
							<Button variant="secondary" size="sm">About</Button>
							<Button variant="secondary" size="sm">Contact</Button>
						{/snippet}

						{#snippet actions()}
							<Button variant="secondary" size="sm">Sign In</Button>
							<Button variant="primary" size="sm">Sign Up</Button>
						{/snippet}
					</Header>
				</div>
			</div>

			<div class="subsection">
				<h3>Minimal</h3>
				<div class="header-preview">
					<Header sticky={false}>
						{#snippet logo()}
							<span class="logo-text">Brand</span>
						{/snippet}

						{#snippet actions()}
							<Button variant="primary" size="sm">Get Started</Button>
						{/snippet}
					</Header>
				</div>
			</div>
		</section>

		<section class="section">
			<h2 class="section-title">Avatar</h2>
			<p class="description">
				A visual representation of a user with support for images, initials, and status indicators.
			</p>

			<div class="subsection">
				<h3>Sizes</h3>
				<div class="row">
					<Avatar size="sm" name="John Doe" />
					<Avatar size="md" name="John Doe" />
					<Avatar size="lg" name="John Doe" />
				</div>
			</div>

			<div class="subsection">
				<h3>Content Types</h3>
				<div class="row">
					<Avatar src="https://i.pravatar.cc/150?img=1" alt="User avatar" />
					<Avatar name="Jane Doe" />
					<Avatar />
				</div>
				<p class="row-label">Image, Initials, and Icon fallback</p>
			</div>

			<div class="subsection">
				<h3>Status Indicators</h3>
				<div class="row">
					<Avatar name="Online User" status="online" />
					<Avatar name="Offline User" status="offline" />
					<Avatar name="Away User" status="away" />
					<Avatar name="Busy User" status="busy" />
				</div>
			</div>

			<div class="subsection">
				<h3>Combined Variants</h3>
				<div class="row">
					<Avatar
						size="lg"
						src="https://i.pravatar.cc/150?img=5"
						alt="Active user"
						status="online"
					/>
					<Avatar size="lg" name="Bob Wilson" status="away" />
					<Avatar size="sm" status="busy" />
				</div>
			</div>
		</section>

		<section class="section">
			<h2 class="section-title">Tooltip</h2>
			<p class="description">
				A small popup that displays additional information when hovering or focusing on an element.
			</p>

			<div class="subsection">
				<h3>Placements</h3>
				<div class="row">
					<Tooltip content="Tooltip on top" placement="top">
						<Button variant="secondary" size="sm">Top</Button>
					</Tooltip>
					<Tooltip content="Tooltip on bottom" placement="bottom">
						<Button variant="secondary" size="sm">Bottom</Button>
					</Tooltip>
					<Tooltip content="Tooltip on left" placement="left">
						<Button variant="secondary" size="sm">Left</Button>
					</Tooltip>
					<Tooltip content="Tooltip on right" placement="right">
						<Button variant="secondary" size="sm">Right</Button>
					</Tooltip>
				</div>
			</div>

			<div class="subsection">
				<h3>Without Arrow</h3>
				<div class="row">
					<Tooltip content="No arrow tooltip" showArrow={false}>
						<Button variant="secondary" size="sm">Hover me</Button>
					</Tooltip>
				</div>
			</div>

			<div class="subsection">
				<h3>With Different Content</h3>
				<div class="row">
					<Tooltip content="Click to save your changes">
						<Button variant="primary" size="sm">Save</Button>
					</Tooltip>
					<Tooltip content="View user profile">
						<Avatar name="Jane Doe" />
					</Tooltip>
				</div>
			</div>
		</section>

		<Card>
			<h2 class="section-title">Primitive Tokens</h2>
			<p class="description">
				Raw design values that serve as the foundation of the design system.
			</p>

			{#each Object.entries(primitiveTokens) as [category, tokens] (category)}
				<div class="subsection">
					<h3>{category}</h3>
					<div class="token-list">
						{#each tokens as token (token)}
							<div class="token-item">
								{#if isColorToken(token)}
									<span class="token-swatch" style="background-color: var({token});"></span>
								{/if}
								<code class="token-name">{token}</code>
								<span class="token-value">var({token})</span>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</Card>

		<Card>
			<h2 class="section-title">Semantic Tokens</h2>
			<p class="description">Purpose-driven tokens that change based on the active theme.</p>

			{#each Object.entries(semanticTokens) as [category, tokens] (category)}
				<div class="subsection">
					<h3>{category}</h3>
					<div class="token-list">
						{#each tokens as token (token)}
							<div class="token-item">
								{#if token.includes('-bg') || token.includes('-text') || token.includes('-border') || token.includes('-ring')}
									<span class="token-swatch" style="background-color: var({token});"></span>
								{/if}
								<code class="token-name">{token}</code>
								<span class="token-value">var({token})</span>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</Card>
	</main>
</div>

<style>
	.showcase {
		min-height: 100vh;
		background-color: var(--page-bg);
	}

	.page-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--space-4) var(--space-6);
		border-bottom: 1px solid var(--header-border);
		background-color: var(--header-bg);
	}

	.page-header h1 {
		margin: 0;
		font-size: var(--font-size-xl);
		font-weight: var(--font-weight-semibold);
		color: var(--header-text);
	}

	.content {
		max-width: 900px;
		margin: 0 auto;
		padding: var(--space-8);
		display: flex;
		flex-direction: column;
		gap: var(--space-6);
	}

	.section {
		padding: var(--space-6) 0;
		border-bottom: 1px solid var(--card-border);
	}

	.section:last-of-type {
		border-bottom: none;
	}

	.section-title {
		margin: 0 0 var(--space-2) 0;
		font-size: var(--font-size-2xl);
		font-weight: var(--font-weight-bold);
		color: var(--section-title);
	}

	.description {
		margin: 0 0 var(--space-6) 0;
		color: var(--section-description);
	}

	.subsection {
		margin-bottom: var(--space-6);
	}

	.subsection:last-child {
		margin-bottom: 0;
	}

	.subsection h3 {
		margin: 0 0 var(--space-3) 0;
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		color: var(--section-label);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.row {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-3);
		margin-bottom: var(--space-3);
	}

	.row:last-child {
		margin-bottom: 0;
	}

	.row-label {
		margin: var(--space-2) 0 0 0;
		font-size: var(--font-size-sm);
		color: var(--section-label);
	}

	.card-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--space-4);
	}

	.card-title {
		margin: 0 0 var(--space-2) 0;
		font-size: var(--font-size-lg);
		font-weight: var(--font-weight-semibold);
		color: var(--section-title);
	}

	.card-title + p {
		margin: 0;
	}

	.token-list {
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
	}

	.token-item {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		padding: var(--space-2);
		background-color: var(--page-bg);
		border-radius: var(--radius-sm);
	}

	.token-swatch {
		width: 24px;
		height: 24px;
		border-radius: var(--radius-sm);
		border: 1px solid var(--header-border);
		flex-shrink: 0;
	}

	.token-name {
		font-family: var(--font-mono);
		font-size: var(--font-size-sm);
		color: var(--section-title);
		flex-shrink: 0;
	}

	.token-value {
		font-family: var(--font-mono);
		font-size: var(--font-size-xs);
		color: var(--section-label);
		margin-left: auto;
	}

	.header-preview {
		border: 1px solid var(--card-border);
		border-radius: var(--radius-md);
		overflow: hidden;
	}

	.logo-text {
		font-size: var(--font-size-lg);
		font-weight: var(--font-weight-bold);
		color: var(--header-text);
	}
</style>
