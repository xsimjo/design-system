<script lang="ts">
	import SiteHeader from '$lib/internal/SiteHeader.svelte';
	import MobileMenu from '$lib/internal/MobileMenu.svelte';
	import Button from '$lib/components/button/Button.svelte';
	import Card from '$lib/components/card/Card.svelte';
	import CardHeader from '$lib/components/card/CardHeader.svelte';
	import CardBody from '$lib/components/card/CardBody.svelte';
	import Input from '$lib/components/input/Input.svelte';
	import Field from '$lib/components/field/Field.svelte';
	import FieldLabel from '$lib/components/field/FieldLabel.svelte';
	import FieldDescription from '$lib/components/field/FieldDescription.svelte';
	import Alert from '$lib/components/alert/Alert.svelte';
	import Badge from '$lib/components/badge/Badge.svelte';
	import Switch from '$lib/components/switch/Switch.svelte';
	import Progress from '$lib/components/progress/Progress.svelte';
	import Avatar from '$lib/components/avatar/Avatar.svelte';
	import Checkbox from '$lib/components/checkbox/Checkbox.svelte';
	import ArrowRightIcon from '$lib/icons/ArrowRightIcon.svelte';
	import PaletteIcon from '$lib/icons/PaletteIcon.svelte';
	import CodeIcon from '$lib/icons/CodeIcon.svelte';
	import AccessibilityIcon from '$lib/icons/AccessibilityIcon.svelte';
	import ZapIcon from '$lib/icons/ZapIcon.svelte';
	import DownloadIcon from '$lib/icons/DownloadIcon.svelte';
	import CopyIcon from '$lib/icons/CopyIcon.svelte';
	import CheckIcon from '$lib/icons/CheckIcon.svelte';
	import SendIcon from '$lib/icons/SendIcon.svelte';
	import HeartIcon from '$lib/icons/HeartIcon.svelte';
	import Footer from '$lib/internal/Footer.svelte';

	const installCommand = 'npm install @xsimjo/design-system';
	const importExample = "import { Button } from '@xsimjo/design-system'";
	const useExample = '<Button>Click me</Button>';
	let isCopied = $state(false);
	let isMobileMenuOpen = $state(false);
	let switchValue = $state(true);
	let checkboxValue = $state(true);

	async function copyInstall() {
		await navigator.clipboard.writeText(installCommand);
		isCopied = true;
		setTimeout(() => (isCopied = false), 2000);
	}

	const features = [
		{
			icon: CodeIcon,
			title: 'Pure CSS Tokens',
			description:
				'Three-layer token system — primitives, semantic, and component — all in plain CSS custom properties. No runtime, no build step overhead.'
		},
		{
			icon: PaletteIcon,
			title: 'Multi-Theme',
			description:
				'Switch between Light, Dark, and Developer themes with a single data attribute. 57 semantic tokens per theme.'
		},
		{
			icon: AccessibilityIcon,
			title: 'Accessible',
			description:
				'ARIA patterns, keyboard navigation, focus management, and reduced-motion support built into every component from day one.'
		},
		{
			icon: ZapIcon,
			title: 'Svelte 5 Runes',
			description:
				'Built exclusively with Svelte 5 runes — $props, $state, $derived, $bindable. No legacy reactivity, no compatibility shims.'
		}
	];

	const stats = [
		{ value: '35+', label: 'Components' },
		{ value: '57', label: 'Design Tokens' },
		{ value: '3', label: 'Themes' },
		{ value: '0', label: 'Runtime Dependencies' }
	];
</script>

<svelte:head>
	<title>Greenfield UI — Svelte 5 Design System</title>
	<meta
		name="description"
		content="A token-based Svelte 5 component library with multi-theme support, accessible components, and pure CSS custom properties."
	/>
</svelte:head>

<div class="landing">
	<!-- Header -->
	<SiteHeader>
		{#snippet hamburger()}
			<MobileMenu bind:isOpen={isMobileMenuOpen}>
				{#snippet links()}
					<a href="/docs">Documentation</a>
					<a href="/docs/button">Components</a>
					<a href="/docs/theming">Theming</a>
					<a href="/docs/installation">Installation</a>
				{/snippet}
			</MobileMenu>
		{/snippet}
	</SiteHeader>

	<!-- Hero -->
	<section class="hero">
		<div class="hero-inner">
			<div class="hero-badge">
				<Badge label="v0.0.22" variant="primary" />
				<span class="hero-badge-text">Latest Release</span>
			</div>

			<h1 class="hero-title">
				Build beautiful interfaces
				<span class="hero-title-accent">with tokens, not tricks</span>
			</h1>

			<p class="hero-subtitle">
				A Svelte 5 component library powered by a three-layer CSS token system. Swap themes
				instantly, customize everything with variables, ship accessible UI out of the box.
			</p>

			<div class="hero-install">
				<div class="install-box">
					<span class="install-prompt">$</span>
					<code class="install-text">{installCommand}</code>
					<button class="install-copy" onclick={copyInstall} aria-label="Copy install command">
						{#if isCopied}
							<CheckIcon size={16} />
						{:else}
							<CopyIcon size={16} />
						{/if}
					</button>
				</div>
			</div>

			<div class="hero-actions">
				<a href="/docs">
					<Button size="lg">
						Get Started
						<ArrowRightIcon size={18} />
					</Button>
				</a>
				<a href="/docs/button">
					<Button variant="outline" color="secondary" size="lg">Browse Components</Button>
				</a>
			</div>

			<div class="hero-stats">
				{#each stats as stat (stat.label)}
					<div class="stat">
						<span class="stat-value">{stat.value}</span>
						<span class="stat-label">{stat.label}</span>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Features -->
	<section class="features">
		<div class="section-inner">
			<div class="section-header">
				<h2 class="section-title">Designed for real products</h2>
				<p class="section-subtitle">
					Every architectural decision optimizes for maintainability, themability, and developer
					experience.
				</p>
			</div>

			<div class="features-grid">
				{#each features as feature, i (feature.title)}
					<div class="feature-card" style="animation-delay: {i * 80}ms">
						<div class="feature-icon">
							<feature.icon size={24} />
						</div>
						<h3 class="feature-title">{feature.title}</h3>
						<p class="feature-description">{feature.description}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Component Showcase -->
	<section class="showcase">
		<div class="section-inner">
			<div class="section-header">
				<h2 class="section-title">Components that feel right</h2>
				<p class="section-subtitle">
					35+ production-ready components, all sharing the same token foundation. Here's a taste.
				</p>
			</div>

			<div class="showcase-grid">
				<!-- Buttons -->
				<div class="showcase-card">
					<span class="showcase-label">Buttons</span>
					<div class="showcase-content">
						<div class="showcase-row">
							<Button variant="filled">Primary</Button>
							<Button variant="outline" color="secondary">Outline</Button>
							<Button variant="ghost" color="accent">Ghost</Button>
						</div>
						<div class="showcase-row">
							<Button variant="filled" color="success" size="sm">
								<CheckIcon size={14} />
								Approve
							</Button>
							<Button variant="filled" color="danger" size="sm">Reject</Button>
							<Button variant="outline" color="warning" size="sm">Review</Button>
						</div>
						<div class="showcase-row">
							<Button variant="filled" size="sm" isIcon aria-label="Like"
								><HeartIcon size={16} /></Button
							>
							<Button variant="outline" color="secondary" size="sm" isIcon aria-label="Send"
								><SendIcon size={16} /></Button
							>
							<Button variant="ghost" color="accent" size="sm" isIcon aria-label="Download"
								><DownloadIcon size={16} /></Button
							>
						</div>
					</div>
				</div>

				<!-- Card -->
				<div class="showcase-card">
					<span class="showcase-label">Cards & Badges</span>
					<div class="showcase-content">
						<Card>
							<CardHeader>
								<div class="showcase-card-header">
									<Avatar initials="GF" size="sm" />
									<div>
										<div class="showcase-card-name">Greenfield UI</div>
										<div class="showcase-card-meta">Design System</div>
									</div>
									<Badge label="Stable" variant="success" />
								</div>
							</CardHeader>
							<CardBody>
								<p class="showcase-card-body">
									Token-based theming with 57 semantic variables across 3 built-in themes.
								</p>
								<div class="showcase-badge-row">
									<Badge label="Svelte 5" variant="primary" />
									<Badge label="CSS Tokens" variant="accent" />
									<Badge label="A11y" variant="info" />
								</div>
							</CardBody>
						</Card>
					</div>
				</div>

				<!-- Form Controls -->
				<div class="showcase-card">
					<span class="showcase-label">Form Controls</span>
					<div class="showcase-content">
						<Field>
							<FieldLabel>Email address</FieldLabel>
							<Input type="email" placeholder="you@example.com" />
							<FieldDescription>We'll never share your email.</FieldDescription>
						</Field>
						<div class="showcase-controls-row">
							<label class="showcase-inline-label">
								<Switch bind:checked={switchValue} />
								Notifications
							</label>
							<label class="showcase-inline-label">
								<Checkbox bind:checked={checkboxValue} />
								Remember me
							</label>
						</div>
					</div>
				</div>

				<!-- Feedback -->
				<div class="showcase-card">
					<span class="showcase-label">Feedback</span>
					<div class="showcase-content">
						<Alert variant="success">Changes saved successfully.</Alert>
						<Alert variant="info">New version available — v0.0.22</Alert>
						<Alert variant="warning">API rate limit at 85% capacity.</Alert>
						<Progress value={72} size="sm" variant="primary" />
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Quick Install -->
	<section class="install-section">
		<div class="section-inner">
			<div class="install-card">
				<div class="install-card-content">
					<h2 class="install-title">Start building in seconds</h2>
					<p class="install-description">
						Install the package, import a component, and you're ready. No config files, no setup
						wizards, no build plugins.
					</p>
					<div class="install-steps">
						<div class="install-step">
							<span class="step-number">1</span>
							<div class="step-content">
								<span class="step-label">Install</span>
								<code class="step-code">npm install @xsimjo/design-system</code>
							</div>
						</div>
						<div class="install-step">
							<span class="step-number">2</span>
							<div class="step-content">
								<span class="step-label">Import</span>
								<code class="step-code">{importExample}</code>
							</div>
						</div>
						<div class="install-step">
							<span class="step-number">3</span>
							<div class="step-content">
								<span class="step-label">Use</span>
								<code class="step-code">{useExample}</code>
							</div>
						</div>
					</div>
					<div class="install-cta">
						<a href="/docs/installation">
							<Button>
								Read the install guide
								<ArrowRightIcon size={16} />
							</Button>
						</a>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Footer -->
	<Footer maxWidth="1500px" />
</div>

<style>
	/* ======================================================================
	   LANDING PAGE
	   ====================================================================== */
	.landing {
		min-height: 100vh;
		background-color: var(--ui-surface);
		display: flex;
		flex-direction: column;
	}

	/* ---- Hero ---- */
	.hero {
		padding: var(--space-24) var(--space-6) var(--space-16);
		display: flex;
		justify-content: center;
		position: relative;
		overflow: hidden;
	}

	.hero::before {
		content: '';
		position: absolute;
		top: -40%;
		left: 50%;
		transform: translateX(-50%);
		width: 800px;
		height: 800px;
		background: radial-gradient(
			ellipse at center,
			color-mix(in oklch, var(--ui-primary) 8%, transparent) 0%,
			color-mix(in oklch, var(--ui-accent) 4%, transparent) 40%,
			transparent 70%
		);
		pointer-events: none;
		border-radius: 50%;
	}

	.hero-inner {
		max-width: 720px;
		text-align: center;
		position: relative;
		z-index: 1;
	}

	.hero-badge {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		margin-bottom: var(--space-6);
		animation: fadeUp 600ms var(--ui-base-easing) both;
	}

	.hero-badge-text {
		font-size: var(--ui-text-sm);
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 40%);
	}

	.hero-title {
		font-size: clamp(36px, 5vw, 56px);
		font-weight: var(--ui-weight-bold);
		line-height: var(--ui-leading-tight);
		color: var(--ui-surface-foreground);
		margin: 0 0 var(--space-6) 0;
		letter-spacing: -0.03em;
		animation: fadeUp 600ms var(--ui-base-easing) 80ms both;
	}

	.hero-title-accent {
		display: block;
		background: linear-gradient(
			135deg,
			var(--ui-primary) 0%,
			var(--ui-accent) 50%,
			var(--ui-info) 100%
		);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.hero-subtitle {
		font-size: var(--ui-text-lg);
		line-height: var(--ui-leading-relaxed);
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 30%);
		margin: 0 0 var(--space-8) 0;
		max-width: 560px;
		margin-left: auto;
		margin-right: auto;
		animation: fadeUp 600ms var(--ui-base-easing) 160ms both;
	}

	.hero-install {
		margin-bottom: var(--space-8);
		animation: fadeUp 600ms var(--ui-base-easing) 240ms both;
	}

	.install-box {
		display: inline-flex;
		align-items: center;
		gap: var(--space-3);
		padding: var(--space-3) var(--space-4);
		background-color: var(--ui-surface-raised);
		border: 1px solid var(--ui-border);
		border-radius: calc(var(--ui-base-radius) + 2px);
		font-family: var(--ui-font-mono);
		font-size: var(--ui-text-sm);
	}

	.install-prompt {
		color: var(--ui-primary);
		font-weight: var(--ui-weight-semibold);
		user-select: none;
	}

	.install-text {
		color: var(--ui-surface-foreground);
	}

	.install-copy {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--space-1);
		background: none;
		border: 1px solid var(--ui-border);
		border-radius: var(--ui-base-radius);
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 40%);
		cursor: pointer;
		transition: all var(--ui-base-duration) var(--ui-base-easing);
	}

	.install-copy:hover {
		color: var(--ui-surface-foreground);
		background-color: color-mix(in oklch, var(--ui-surface-foreground) 6%, transparent);
	}

	.hero-actions {
		display: flex;
		gap: var(--space-3);
		justify-content: center;
		margin-bottom: var(--space-12);
		animation: fadeUp 600ms var(--ui-base-easing) 320ms both;
	}

	.hero-actions a {
		text-decoration: none;
	}

	.hero-stats {
		display: flex;
		justify-content: center;
		gap: var(--space-10);
		animation: fadeUp 600ms var(--ui-base-easing) 400ms both;
	}

	.stat {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-1);
	}

	.stat-value {
		font-size: var(--ui-text-2xl);
		font-weight: var(--ui-weight-bold);
		color: var(--ui-surface-foreground);
		font-variant-numeric: tabular-nums;
	}

	.stat-label {
		font-size: var(--ui-text-xs);
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 50%);
		text-transform: uppercase;
		letter-spacing: 0.06em;
		font-weight: var(--ui-weight-medium);
	}

	/* ---- Sections (shared) ---- */
	.section-inner {
		max-width: 1500px;
		margin: 0 auto;
		padding: 0 var(--space-6);
	}

	.section-header {
		text-align: center;
		margin-bottom: var(--space-12);
	}

	.section-title {
		font-size: clamp(24px, 3vw, 36px);
		font-weight: var(--ui-weight-bold);
		color: var(--ui-surface-foreground);
		margin: 0 0 var(--space-3) 0;
		letter-spacing: -0.02em;
	}

	.section-subtitle {
		font-size: var(--ui-text-lg);
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 35%);
		margin: 0;
		max-width: 540px;
		margin-left: auto;
		margin-right: auto;
		line-height: var(--ui-leading-relaxed);
	}

	/* ---- Features ---- */
	.features {
		padding: var(--space-16) 0;
		background-color: var(--ui-surface-raised);
		border-top: 1px solid var(--ui-border);
		border-bottom: 1px solid var(--ui-border);
	}

	.features-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: var(--space-6);
	}

	.feature-card {
		padding: var(--space-6);
		border-radius: calc(var(--ui-base-radius) + 4px);
		border: 1px solid var(--ui-border);
		background-color: var(--ui-surface);
		transition: border-color var(--ui-base-duration) var(--ui-base-easing);
		animation: fadeUp 500ms var(--ui-base-easing) both;
	}

	.feature-card:hover {
		border-color: color-mix(in oklch, var(--ui-primary) 40%, var(--ui-border));
	}

	.feature-icon {
		width: 44px;
		height: 44px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: calc(var(--ui-base-radius) + 2px);
		background-color: color-mix(in oklch, var(--ui-primary) 10%, transparent);
		color: var(--ui-primary);
		margin-bottom: var(--space-4);
	}

	.feature-title {
		font-size: var(--ui-text-base);
		font-weight: var(--ui-weight-semibold);
		color: var(--ui-surface-foreground);
		margin: 0 0 var(--space-2) 0;
	}

	.feature-description {
		font-size: var(--ui-text-sm);
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 35%);
		line-height: var(--ui-leading-relaxed);
		margin: 0;
	}

	/* ---- Showcase ---- */
	.showcase {
		padding: var(--space-16) 0;
	}

	.showcase-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--space-6);
	}

	.showcase-card {
		padding: var(--space-6);
		background-color: var(--ui-surface-raised);
		border: 1px solid var(--ui-border);
		border-radius: calc(var(--ui-base-radius) + 4px);
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}

	.showcase-label {
		font-size: var(--ui-text-xs);
		font-weight: var(--ui-weight-semibold);
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 50%);
	}

	.showcase-content {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
	}

	.showcase-row {
		display: flex;
		gap: var(--space-2);
		flex-wrap: wrap;
		align-items: center;
	}

	.showcase-card-header {
		display: flex;
		align-items: center;
		gap: var(--space-3);
	}

	.showcase-card-header > :last-child {
		margin-left: auto;
	}

	.showcase-card-name {
		font-size: var(--ui-text-sm);
		font-weight: var(--ui-weight-semibold);
		color: var(--ui-surface-foreground);
		line-height: var(--ui-leading-tight);
	}

	.showcase-card-meta {
		font-size: var(--ui-text-xs);
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 50%);
	}

	.showcase-card-body {
		font-size: var(--ui-text-sm);
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 25%);
		margin: 0;
		line-height: var(--ui-leading-relaxed);
	}

	.showcase-badge-row {
		display: flex;
		gap: var(--space-2);
		flex-wrap: wrap;
	}

	.showcase-controls-row {
		display: flex;
		gap: var(--space-6);
		align-items: center;
	}

	.showcase-inline-label {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		font-size: var(--ui-text-sm);
		color: var(--ui-surface-foreground);
		cursor: pointer;
	}

	/* ---- Install Section ---- */
	.install-section {
		padding: var(--space-16) 0;
		background-color: var(--ui-surface-raised);
		border-top: 1px solid var(--ui-border);
	}

	.install-card {
		max-width: 640px;
		margin: 0 auto;
	}

	.install-card-content {
		text-align: center;
	}

	.install-title {
		font-size: clamp(24px, 3vw, 32px);
		font-weight: var(--ui-weight-bold);
		color: var(--ui-surface-foreground);
		margin: 0 0 var(--space-3) 0;
		letter-spacing: -0.02em;
	}

	.install-description {
		font-size: var(--ui-text-base);
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 35%);
		margin: 0 0 var(--space-8) 0;
		line-height: var(--ui-leading-relaxed);
	}

	.install-steps {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
		text-align: left;
		margin-bottom: var(--space-8);
	}

	.install-step {
		display: flex;
		align-items: center;
		gap: var(--space-4);
		padding: var(--space-3) var(--space-4);
		background-color: var(--ui-surface);
		border: 1px solid var(--ui-border);
		border-radius: var(--ui-base-radius);
	}

	.step-number {
		width: 28px;
		height: 28px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		background-color: color-mix(in oklch, var(--ui-primary) 12%, transparent);
		color: var(--ui-primary);
		font-size: var(--ui-text-sm);
		font-weight: var(--ui-weight-bold);
		flex-shrink: 0;
	}

	.step-content {
		display: flex;
		flex-direction: column;
		gap: 2px;
		min-width: 0;
	}

	.step-label {
		font-size: var(--ui-text-xs);
		font-weight: var(--ui-weight-semibold);
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 40%);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.step-code {
		font-family: var(--ui-font-mono);
		font-size: var(--ui-text-sm);
		color: var(--ui-surface-foreground);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.install-cta {
		display: flex;
		justify-content: center;
	}

	.install-cta a {
		text-decoration: none;
	}

	/* ---- Footer ---- */
	/* ---- Animation ---- */
	@keyframes fadeUp {
		from {
			opacity: 0;
			transform: translateY(12px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* ---- Responsive ---- */
	@media (max-width: 1024px) {
		.features-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 768px) {
		.hero {
			padding: var(--space-16) var(--space-4) var(--space-10);
		}

		.hero-title {
			font-size: 32px;
		}

		.hero-stats {
			gap: var(--space-6);
		}

		.stat-value {
			font-size: var(--ui-text-xl);
		}

		.features-grid {
			grid-template-columns: 1fr;
		}

		.showcase-grid {
			grid-template-columns: 1fr;
		}

		.install-box {
			font-size: var(--ui-text-xs);
			padding: var(--space-2) var(--space-3);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.hero-badge,
		.hero-title,
		.hero-subtitle,
		.hero-install,
		.hero-actions,
		.hero-stats,
		.feature-card {
			animation: none;
		}
	}
</style>
