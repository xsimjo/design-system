<script lang="ts">
	import CodeBlock from '$lib/internal/CodeBlock.svelte';
	import DocsPage from '$lib/internal/DocsPage.svelte';
	import PageHeader from '$lib/internal/PageHeader.svelte';
	import Button from '$lib/components/button/Button.svelte';
</script>

<svelte:head>
	<title>Theming - Greenfield UI</title>
</svelte:head>

<DocsPage>
	<PageHeader
		title="Theming"
		description="Customize your design system by overriding CSS variables. The three-layer architecture means you only need to set ~45 variables to completely transform the look."
		isBordered
	/>

	<section class="section">
		<h2>How it works</h2>
		<div class="architecture">
			<div class="layer layer--user">
				<span class="layer-label">Your theme</span>
				<span class="layer-name">~45 Variables</span>
				<span class="layer-desc">Colors, radii, spacing, shadows</span>
			</div>
			<div class="layer-connector"></div>
			<div class="layer layer--auto">
				<span class="layer-label">Auto-generated</span>
				<span class="layer-name">~400 Semantic Tokens</span>
				<span class="layer-desc">Component-specific: --button-bg, --card-shadow, etc.</span>
			</div>
		</div>
		<p class="hint">
			You set <code>--color-primary</code>, and the system computes
			<code>--button-color-primary</code>, <code>--badge-primary-bg</code>, hover states, and more.
		</p>
	</section>

	<section class="section">
		<h2>Switching themes</h2>
		<p class="section-intro">
			Themes are activated via the <code>data-theme</code> attribute on <code>&lt;html&gt;</code>.
		</p>
		<CodeBlock
			code={`<!-- Static: set in app.html -->
<html data-theme="light">

<!-- Dynamic: toggle at runtime -->
document.documentElement.dataset.theme = 'dark';`}
			language="html"
		/>
	</section>

	<section class="section">
		<h2>Built-in themes</h2>
		<div class="theme-list">
			<div class="theme-item">
				<span class="theme-name">light</span>
				<span class="theme-desc">White background, dark text, subtle shadows</span>
			</div>
			<div class="theme-item">
				<span class="theme-name">dark</span>
				<span class="theme-desc">Dark background, light text</span>
			</div>
			<div class="theme-item">
				<span class="theme-name">dev</span>
				<span class="theme-desc">Monospace font, compact sizing, for dev tools</span>
			</div>
		</div>
	</section>

	<section class="section">
		<h2>Creating a custom theme</h2>
		<p class="section-intro">
			Create a CSS file that targets <code>[data-theme='your-theme']</code>. Override only the
			variables you want to change.
		</p>
		<CodeBlock
			code={`/* src/lib/styles/themes/brand.css */
[data-theme='brand'] {
  /* Colors */
  --color-primary: oklch(55% 0.18 280);
  --color-secondary: oklch(50% 0.05 280);

  /* Surfaces */
  --color-bg: oklch(99% 0.005 280);
  --color-bg-elevated: oklch(100% 0 0);
  --color-bg-muted: oklch(97% 0.01 280);

  /* Radii - make it rounded */
  --radius-button: 9999px;
  --radius-input: 12px;
  --radius-card: 16px;
}`}
			language="css"
		/>
		<p class="hint">
			Import your theme after the base styles, then use <code>data-theme="brand"</code>.
		</p>
	</section>

	<section class="section">
		<h2>Theme variables reference</h2>
		<p class="section-intro">
			All variables you can override, organized by category. Colors use
			<a href="https://oklch.com" target="_blank" rel="noopener">OKLCH</a> format for better color mixing.
		</p>

		<div class="var-group">
			<h3>Colors (14)</h3>
			<CodeBlock
				code={`--color-primary        /* Brand color for buttons, links */
--color-secondary      /* Neutral actions */
--color-success        /* Success states */
--color-warning        /* Warning states */
--color-error          /* Error states */
--color-info           /* Informational */
--color-link           /* Link text */
--color-link-hover     /* Link hover */

--color-bg             /* Page background */
--color-bg-elevated    /* Cards, dialogs */
--color-bg-muted       /* Subtle backgrounds */
--color-text           /* Primary text */
--color-text-muted     /* Secondary text */
--color-border         /* Borders, dividers */`}
				language="css"
			/>
		</div>

		<div class="var-group">
			<h3>Radii (8)</h3>
			<CodeBlock
				code={`--radius-sm            /* 4px - small elements */
--radius-md            /* 6px - default */
--radius-lg            /* 8px - large elements */

--radius-button        /* Button corners */
--radius-input         /* Input corners */
--radius-card          /* Card corners */
--radius-badge         /* Badge corners */
--radius-dialog        /* Dialog corners */`}
				language="css"
			/>
		</div>

		<div class="var-group">
			<h3>Shadows (4)</h3>
			<CodeBlock
				code={`--shadow-sm            /* Subtle elevation */
--shadow-md            /* Cards, dropdowns */
--shadow-lg            /* Dialogs */
--shadow-xl            /* Popovers */`}
				language="css"
			/>
		</div>

		<div class="var-group">
			<h3>Sizing (3)</h3>
			<CodeBlock
				code={`--field-height-sm      /* 32px - compact inputs/buttons */
--field-height-md      /* 40px - default */
--field-height-lg      /* 48px - large */`}
				language="css"
			/>
		</div>

		<div class="var-group">
			<h3>Typography (2)</h3>
			<CodeBlock
				code={`--font-sans            /* UI text */
--font-mono            /* Code, monospace */`}
				language="css"
			/>
		</div>

		<div class="var-group">
			<h3>Borders & Focus (5)</h3>
			<CodeBlock
				code={`--border-width         /* Default border width */
--focus-ring-width     /* Focus outline width */
--focus-ring-color     /* Focus outline color */
--color-hover-mix      /* Color to mix for hovers */
--color-hover-amount   /* How much to darken/lighten */`}
				language="css"
			/>
		</div>

		<div class="var-group">
			<h3>Backdrop (2)</h3>
			<CodeBlock
				code={`--backdrop-color       /* Dialog/drawer overlay */
--backdrop-blur        /* Blur amount for overlay */`}
				language="css"
			/>
		</div>

		<div class="var-group">
			<h3>Transitions (3)</h3>
			<CodeBlock
				code={`--transition-fast      /* 150ms - micro interactions */
--transition-base      /* 200ms - default */
--transition-slow      /* 300ms - larger animations */`}
				language="css"
			/>
		</div>

		<div class="var-group">
			<h3>Spacing (4)</h3>
			<CodeBlock
				code={`--spacing-xs           /* 4px */
--spacing-sm           /* 8px */
--spacing-md           /* 16px */
--spacing-lg           /* 24px */`}
				language="css"
			/>
		</div>
	</section>

	<section class="section">
		<h2>Dark mode example</h2>
		<p class="section-intro">A complete dark theme override:</p>
		<CodeBlock
			code={`[data-theme='dark'] {
  --color-primary: oklch(65% 0.2 262);
  --color-secondary: oklch(60% 0.02 260);
  --color-success: oklch(65% 0.15 150);
  --color-warning: oklch(70% 0.15 50);
  --color-error: oklch(60% 0.2 25);
  --color-info: oklch(65% 0.15 245);

  --color-bg: oklch(15% 0.01 260);
  --color-bg-elevated: oklch(20% 0.01 260);
  --color-bg-muted: oklch(18% 0.01 260);
  --color-text: oklch(95% 0.01 260);
  --color-text-muted: oklch(65% 0.02 260);
  --color-border: oklch(30% 0.01 260);

  --shadow-sm: 0 1px 2px oklch(0% 0 0 / 0.3);
  --shadow-md: 0 4px 8px oklch(0% 0 0 / 0.4);

  --color-hover-mix: white;
  --color-hover-amount: 15%;
}`}
			language="css"
		/>
	</section>

	<section class="section">
		<h2>Tips</h2>
		<ul class="tips-list">
			<li>
				<strong>Start with colors</strong> — Most themes only need to change the 14 color variables.
			</li>
			<li>
				<strong>Use OKLCH</strong> — The format <code>oklch(lightness chroma hue)</code> makes it easy
				to create consistent palettes.
			</li>
			<li>
				<strong>Test both themes</strong> — If you customize light mode, check that dark mode still works.
			</li>
			<li>
				<strong>Check contrast</strong> — Ensure text has sufficient contrast against backgrounds (4.5:1
				minimum).
			</li>
		</ul>
	</section>

	<section class="section next">
		<h2>Next: Components</h2>
		<p class="section-intro">Explore the full component library.</p>
		<a href="/docs/button"><Button>View Components</Button></a>
	</section>
</DocsPage>

<style>
	.section {
		margin-bottom: var(--space-8);
	}

	.section-intro {
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 40%);
		margin-bottom: var(--space-3);
		line-height: var(--line-height-relaxed);
	}

	.section-intro code {
		background: color-mix(in oklch, var(--ui-neutral), transparent 85%);
		padding: 2px 6px;
		border-radius: calc(var(--ui-base-radius) * 0.5);
		font-family: var(--ui-font-mono);
		font-size: 0.9em;
	}

	.section-intro a {
		color: var(--ui-primary);
	}

	.section-intro a:hover {
		color: color-mix(in oklch, var(--ui-primary), var(--ui-hover-mix) var(--ui-hover-amount));
	}

	h2 {
		font-size: var(--ui-text-lg);
		font-weight: 600;
		color: var(--ui-surface-foreground);
		margin-bottom: var(--space-3);
	}

	h3 {
		font-size: var(--ui-text-sm);
		font-weight: 600;
		color: var(--ui-surface-foreground);
		margin-bottom: var(--space-2);
	}

	.hint {
		font-size: var(--ui-text-sm);
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 40%);
		margin-top: var(--space-3);
		line-height: var(--line-height-relaxed);
	}

	.hint code {
		background: color-mix(in oklch, var(--ui-neutral), transparent 85%);
		padding: 2px 6px;
		border-radius: calc(var(--ui-base-radius) * 0.5);
		font-family: var(--ui-font-mono);
		font-size: 0.85em;
	}

	.architecture {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		flex-wrap: wrap;
	}

	.layer {
		display: flex;
		flex-direction: column;
		padding: var(--space-4);
		border-radius: calc(var(--ui-base-radius) * 0.75);
		border: 1px solid var(--ui-border);
		flex: 1;
		min-width: 200px;
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

	.layer-connector {
		font-size: var(--font-size-xl);
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 40%);
	}

	.layer-connector::before {
		content: '\2192';
	}

	.theme-list {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.theme-item {
		display: flex;
		gap: var(--space-4);
		padding: var(--space-3);
		background: color-mix(in oklch, var(--ui-neutral), transparent 85%);
		border-radius: calc(var(--ui-base-radius) * 0.75);
	}

	.theme-name {
		font-family: var(--ui-font-mono);
		font-size: var(--ui-text-sm);
		font-weight: var(--ui-weight-medium);
		color: var(--ui-primary);
		min-width: 60px;
	}

	.theme-desc {
		font-size: var(--ui-text-sm);
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 40%);
	}

	.var-group {
		margin-bottom: var(--space-6);
	}

	.tips-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
	}

	.tips-list li {
		font-size: var(--ui-text-sm);
		color: var(--ui-surface-foreground);
		line-height: var(--line-height-relaxed);
		padding-left: var(--space-4);
		position: relative;
	}

	.tips-list li::before {
		content: '\2022';
		position: absolute;
		left: 0;
		color: var(--ui-primary);
	}

	.tips-list strong {
		color: var(--ui-surface-foreground);
	}

	.tips-list code {
		background: color-mix(in oklch, var(--ui-neutral), transparent 85%);
		padding: 2px 6px;
		border-radius: calc(var(--ui-base-radius) * 0.5);
		font-family: var(--ui-font-mono);
		font-size: 0.85em;
	}

	.next {
		border-top: 1px solid var(--ui-border);
		padding-top: var(--space-8);
		margin-top: var(--space-10);
	}
</style>
