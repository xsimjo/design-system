<script lang="ts">
	import CodeBlock from '$lib/internal/CodeBlock.svelte';
	import DocsPage from '$lib/internal/DocsPage.svelte';
	import PageHeader from '$lib/internal/PageHeader.svelte';
	import Button from '$lib/components/button/Button.svelte';
	import ArrowRightIcon from '$lib/icons/ArrowRightIcon.svelte';
</script>

<svelte:head>
	<title>Introduction - Greenfield UI</title>
</svelte:head>

<DocsPage>
	<PageHeader
		title="Introduction"
		description="Greenfield UI is a component library for Svelte 5. It provides accessible, themeable components with a token-based styling system that makes customization simple."
		isBordered
	/>

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
${'</' + 'script>'}

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
				<span class="layer-desc">Component-specific tokens</span>
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
		<p class="section-intro">Production-ready components.</p>
		<div class="component-grid">
			<div class="component-group">
				<h4>Form</h4>
				<ul>
					<li>Button</li>
				</ul>
			</div>
			<div class="component-group">
				<h4>Feedback</h4>
				<ul>
					<li>Spinner</li>
				</ul>
			</div>
		</div>
	</section>

	<section class="section">
		<h2>Next Steps</h2>
		<div class="next-steps">
			<a href="/docs/installation"><Button>Installation <ArrowRightIcon size={16} /></Button></a>
			<a href="/docs/usage"><Button variant="outline" color="secondary">Usage Guide</Button></a>
			<a href="/docs/theming"><Button variant="outline" color="secondary">Theming</Button></a>
		</div>
	</section>
</DocsPage>

<style>
	.section {
		margin-bottom: var(--space-10);
	}

	.section-intro {
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 40%);
		margin-bottom: var(--space-4);
	}

	h2 {
		font-size: var(--font-size-xl);
		font-weight: 600;
		color: var(--ui-surface-foreground);
		margin-bottom: var(--space-4);
	}

	.hint {
		font-size: var(--ui-text-sm);
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 40%);
		margin: var(--space-3) 0;
	}

	.principles {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--space-4);
	}

	.principle {
		padding: var(--space-4);
		background: color-mix(in oklch, var(--ui-neutral), transparent 85%);
		border-radius: calc(var(--ui-base-radius) * 0.75);
	}

	.principle h3 {
		font-size: var(--ui-text-sm);
		font-weight: 600;
		color: var(--ui-surface-foreground);
		margin-bottom: var(--space-1);
	}

	.principle p {
		font-size: var(--ui-text-sm);
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 40%);
		line-height: var(--line-height-relaxed);
	}

	.architecture {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.layer {
		display: flex;
		flex-direction: column;
		padding: var(--space-4);
		border-radius: calc(var(--ui-base-radius) * 0.75);
		border: 1px solid var(--ui-border);
	}

	.layer-label {
		font-size: var(--font-size-xs);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 40%);
		margin-bottom: var(--space-1);
	}

	.layer-name {
		font-weight: 600;
		font-size: var(--ui-text-base);
		color: var(--ui-surface-foreground);
	}

	.layer-desc {
		font-size: var(--ui-text-sm);
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 40%);
	}

	.layer--user {
		background: color-mix(in oklch, var(--ui-primary) 8%, var(--ui-surface));
		border-color: color-mix(in oklch, var(--ui-primary) 25%, var(--ui-border));
	}

	.layer--user .layer-name {
		color: var(--ui-primary);
	}

	.layer--auto {
		background: var(--ui-surface-raised);
	}

	.layer--base {
		background: color-mix(in oklch, var(--ui-neutral), transparent 85%);
	}

	.layer-arrow {
		width: 24px;
		height: 16px;
		align-self: center;
		border-left: 1px solid var(--ui-border);
	}

	.component-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--space-4);
	}

	.component-group h4 {
		font-size: var(--font-size-xs);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 40%);
		margin-bottom: var(--space-2);
	}

	.component-group ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.component-group li {
		font-size: var(--ui-text-sm);
		color: var(--ui-surface-foreground);
		padding: var(--space-1) 0;
	}

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
			grid-template-columns: 1fr;
		}
	}
</style>
