<script lang="ts">
	import CodeBlock from '$lib/components/code-block/CodeBlock.svelte';
	import Button from '$lib/components/button/Button.svelte';
	import ArrowRightIcon from '$lib/icons/ArrowRightIcon.svelte';
</script>

<svelte:head>
	<title>Introduction - Greenfield UI</title>
</svelte:head>

<article class="docs-page">
	<header class="page-header">
		<h1>Introduction</h1>
		<p class="lead">
			Greenfield UI is a component library for Svelte 5. It provides 21 accessible, themeable
			components with a token-based styling system that makes customization simple.
		</p>
	</header>

	<section class="section">
		<h2>Why Greenfield UI?</h2>
		<div class="principles">
			<div class="principle">
				<h3>Pure CSS</h3>
				<p>No CSS-in-JS runtime. Components use semantic CSS custom properties that you control.</p>
			</div>
			<div class="principle">
				<h3>Themeable</h3>
				<p>Override ~45 variables to customize everything. Dark mode works out of the box.</p>
			</div>
			<div class="principle">
				<h3>Accessible</h3>
				<p>
					ARIA attributes, keyboard navigation, and focus management built into every component.
				</p>
			</div>
			<div class="principle">
				<h3>Svelte 5</h3>
				<p>Built with runes, snippets, and modern patterns. Extends native HTML attributes.</p>
			</div>
		</div>
	</section>

	<section class="section">
		<h2>Quick Start</h2>
		<CodeBlock code="npm install @xsimjo/design-system" language="bash" />
		<p class="hint">Then import styles and components in your layout.</p>
		<CodeBlock
			code={`<script>
  import '@xsimjo/design-system/styles';
  import { Button } from '@xsimjo/design-system';
</script>

<html data-theme="light">
  <Button>Click me</Button>
</html>`}
			language="svelte"
		/>
	</section>

	<section class="section">
		<h2>Token Architecture</h2>
		<p class="section-intro">
			The styling system has three layers. You only need to touch the top layer to customize your
			theme.
		</p>
		<div class="architecture">
			<div class="layer layer--user">
				<span class="layer-label">You customize</span>
				<span class="layer-name">Theme Variables</span>
				<span class="layer-desc">~45 simple variables like colors, radii, spacing</span>
			</div>
			<div class="layer-arrow"></div>
			<div class="layer layer--auto">
				<span class="layer-label">Auto-computed</span>
				<span class="layer-name">Semantic Tokens</span>
				<span class="layer-desc">~400 component-specific tokens</span>
			</div>
			<div class="layer-arrow"></div>
			<div class="layer layer--base">
				<span class="layer-label">Foundation</span>
				<span class="layer-name">Primitives</span>
				<span class="layer-desc">Full color palettes, type scale, spacing</span>
			</div>
		</div>
	</section>

	<section class="section">
		<h2>Components</h2>
		<p class="section-intro">21 production-ready components organized by category.</p>
		<div class="component-grid">
			<div class="component-group">
				<h4>Layout</h4>
				<ul>
					<li>Header</li>
					<li>Sidebar</li>
					<li>Card</li>
				</ul>
			</div>
			<div class="component-group">
				<h4>Form</h4>
				<ul>
					<li>Button</li>
					<li>Input</li>
					<li>Select</li>
					<li>Checkbox</li>
					<li>Slider</li>
				</ul>
			</div>
			<div class="component-group">
				<h4>Feedback</h4>
				<ul>
					<li>Badge</li>
					<li>Toast</li>
					<li>Tooltip</li>
					<li>Progress Bar</li>
				</ul>
			</div>
			<div class="component-group">
				<h4>Overlay</h4>
				<ul>
					<li>Dialog</li>
					<li>Drawer</li>
				</ul>
			</div>
			<div class="component-group">
				<h4>Navigation</h4>
				<ul>
					<li>Tabs</li>
					<li>Breadcrumbs</li>
				</ul>
			</div>
			<div class="component-group">
				<h4>Data</h4>
				<ul>
					<li>Table</li>
					<li>Accordion</li>
					<li>CodeBlock</li>
				</ul>
			</div>
		</div>
	</section>

	<section class="section">
		<h2>Next Steps</h2>
		<div class="next-steps">
			<Button href="/docs/installation">
				Installation
				<ArrowRightIcon size={16} />
			</Button>
			<Button variant="outline" color="secondary" href="/docs/usage">Usage Guide</Button>
			<Button variant="outline" color="secondary" href="/docs/theming">Theming</Button>
		</div>
	</section>
</article>

<style>
	.docs-page {
		max-width: 100%;
	}

	.page-header {
		margin-bottom: var(--space-8);
		border-bottom: 1px solid var(--color-border);
		padding-bottom: var(--space-6);
	}

	h1 {
		font-size: var(--font-size-3xl);
		font-weight: var(--font-weight-bold);
		color: var(--color-text);
		margin-bottom: var(--space-3);
	}

	.lead {
		font-size: var(--font-size-lg);
		color: var(--color-text-muted);
		line-height: var(--line-height-relaxed);
		max-width: 640px;
	}

	.section {
		margin-bottom: var(--space-10);
	}

	.section-intro {
		color: var(--color-text-muted);
		margin-bottom: var(--space-4);
	}

	h2 {
		font-size: var(--font-size-xl);
		font-weight: var(--font-weight-semibold);
		color: var(--color-text);
		margin-bottom: var(--space-4);
	}

	.hint {
		font-size: var(--font-size-sm);
		color: var(--color-text-muted);
		margin: var(--space-3) 0;
	}

	/* Principles */
	.principles {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--space-4);
	}

	.principle {
		padding: var(--space-4);
		background: var(--color-bg-muted);
		border-radius: var(--radius-md);
	}

	.principle h3 {
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-semibold);
		color: var(--color-text);
		margin-bottom: var(--space-1);
	}

	.principle p {
		font-size: var(--font-size-sm);
		color: var(--color-text-muted);
		line-height: var(--line-height-relaxed);
	}

	/* Architecture */
	.architecture {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.layer {
		display: flex;
		flex-direction: column;
		padding: var(--space-4);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
	}

	.layer-label {
		font-size: var(--font-size-xs);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-text-muted);
		margin-bottom: var(--space-1);
	}

	.layer-name {
		font-weight: var(--font-weight-semibold);
		font-size: var(--font-size-base);
		color: var(--color-text);
	}

	.layer-desc {
		font-size: var(--font-size-sm);
		color: var(--color-text-muted);
	}

	.layer--user {
		background: color-mix(in oklch, var(--color-primary) 8%, var(--color-bg));
		border-color: color-mix(in oklch, var(--color-primary) 25%, var(--color-border));
	}

	.layer--user .layer-name {
		color: var(--color-primary);
	}

	.layer--auto {
		background: var(--color-bg-elevated);
	}

	.layer--base {
		background: var(--color-bg-muted);
	}

	.layer-arrow {
		width: 24px;
		height: 16px;
		align-self: center;
		border-left: 1px solid var(--color-border);
	}

	/* Component Grid */
	.component-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--space-4);
	}

	.component-group h4 {
		font-size: var(--font-size-xs);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-text-muted);
		margin-bottom: var(--space-2);
	}

	.component-group ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.component-group li {
		font-size: var(--font-size-sm);
		color: var(--color-text);
		padding: var(--space-1) 0;
	}

	/* Next Steps */
	.next-steps {
		display: flex;
		gap: var(--space-3);
		flex-wrap: wrap;
	}

	@media (max-width: 640px) {
		.principles {
			grid-template-columns: 1fr;
		}

		.component-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
