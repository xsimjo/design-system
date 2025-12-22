<script lang="ts">
	import CodeBlock from '$lib/components/code-block/CodeBlock.svelte';

	const lightTheme = `[data-theme='light'] {
  /* Fonts */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: ui-monospace, 'SF Mono', 'Monaco', 'Courier New', monospace;

  /* Colors */
  --color-primary: oklch(54.61% 0.215 262.88);
  --color-secondary: oklch(55.37% 0.03 259.39);
  --color-success: oklch(56.16% 0.154 150.07);
  --color-warning: oklch(62.67% 0.161 50.32);
  --color-error: oklch(55.27% 0.195 27.33);
  --color-info: oklch(56.36% 0.175 243.87);
  --color-link: oklch(54.61% 0.215 262.88);
  --color-link-hover: oklch(48.83% 0.213 264.38);

  /* Surfaces */
  --color-bg: oklch(100% 0 0);
  --color-bg-elevated: oklch(100% 0 0);
  --color-bg-muted: oklch(96.68% 0.007 247.9);
  --color-text: oklch(20.82% 0.031 265.75);
  --color-text-muted: oklch(55.37% 0.03 259.39);
  --color-border: oklch(92.88% 0.013 255.51);

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 oklch(0% 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px oklch(0% 0 0 / 0.1), 0 2px 4px -1px oklch(0% 0 0 / 0.06);
  --shadow-lg: 0 10px 15px -3px oklch(0% 0 0 / 0.1), 0 4px 6px -2px oklch(0% 0 0 / 0.05);
  --shadow-xl: 0 20px 25px -5px oklch(0% 0 0 / 0.1), 0 10px 10px -5px oklch(0% 0 0 / 0.04);

  /* Radii */
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
  --radius-button: var(--radius-md);
  --radius-input: var(--radius-md);
  --radius-card: var(--radius-lg);
  --radius-badge: var(--radius-sm);
  --radius-dialog: var(--radius-lg);
  --radius-slider: var(--radius-full);

  /* Field sizes */
  --field-height-sm: 32px;
  --field-height-md: 40px;
  --field-height-lg: 48px;

  /* Borders & Focus */
  --border-width: 1px;
  --focus-ring-width: 3px;
  --focus-ring-color: oklch(54.61% 0.215 262.88 / 0.3);
  --color-hover-mix: black;
  --color-hover-amount: 10%;

  /* Backdrop */
  --backdrop-color: oklch(0% 0 0 / 0.5);
  --backdrop-blur: 4px;

  /* Transitions */
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-base: 200ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 300ms cubic-bezier(0.4, 0, 0.2, 1);

  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
}`;
</script>

<svelte:head>
	<title>Theming - Greenfield UI</title>
</svelte:head>

<article class="docs-page">
	<header class="page-header">
		<h1>Theming</h1>
		<p class="lead">
			Customize your design system by overriding CSS variables. Switch themes with the
			<code>data-theme</code> attribute on <code>&lt;html&gt;</code>.
		</p>
	</header>

	<section class="section">
		<h2>Architecture</h2>
		<div class="architecture">
			<div class="layer layer--themes">
				<span class="layer-name">Themes</span>
				<span class="layer-desc">~45 variables you override</span>
			</div>
			<div class="layer-arrow">→</div>
			<div class="layer layer--semantic">
				<span class="layer-name">Semantic Tokens</span>
				<span class="layer-desc">~400 component tokens (auto-computed)</span>
			</div>
			<div class="layer-arrow">→</div>
			<div class="layer layer--primitives">
				<span class="layer-name">Primitives</span>
				<span class="layer-desc">Raw palettes, scales, typography</span>
			</div>
		</div>
	</section>

	<section class="section">
		<h2>Theme Variables</h2>
		<p class="section-desc">
			Override any of these variables to customize your theme. Colors use OKLCH format:
			<code>oklch(lightness chroma hue)</code>.
		</p>
		<div class="full-height">
			<CodeBlock code={lightTheme} language="css" />
		</div>
	</section>

	<section class="section">
		<h2>Creating a Custom Theme</h2>
		<p class="section-desc">
			Only override what you need — everything else inherits from the base.
		</p>
		<CodeBlock
			code={`[data-theme='brand'] {
  --color-primary: oklch(55% 0.18 145);
  --color-bg: oklch(98% 0.01 145);
  --radius-button: 9999px;
}`}
			language="css"
		/>
	</section>
</article>

<style>
	.docs-page {
		max-width: 100%;
	}

	.page-header {
		margin-bottom: var(--space-8);
	}

	h1 {
		font-size: var(--font-size-3xl);
		font-weight: var(--font-weight-bold);
		color: var(--color-text);
		margin-bottom: var(--space-2);
	}

	.lead {
		font-size: var(--font-size-lg);
		color: var(--color-text-muted);
		line-height: var(--line-height-relaxed);
	}

	.lead code {
		background: var(--color-bg-muted);
		padding: 2px 6px;
		border-radius: var(--radius-sm);
		font-size: 0.9em;
	}

	.section {
		margin-bottom: var(--space-10);
	}

	.section-desc {
		font-size: var(--font-size-sm);
		color: var(--color-text-muted);
		margin-bottom: var(--space-4);
	}

	.section-desc code {
		background: var(--color-bg-muted);
		padding: 2px 6px;
		border-radius: var(--radius-sm);
		font-size: var(--font-size-xs);
	}

	h2 {
		font-size: var(--font-size-xl);
		font-weight: var(--font-weight-semibold);
		color: var(--color-text);
		margin-bottom: var(--space-3);
	}

	/* Architecture */
	.architecture {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		flex-wrap: wrap;
	}

	.layer {
		display: flex;
		flex-direction: column;
		padding: var(--space-3) var(--space-4);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
		min-width: 180px;
	}

	.layer-name {
		font-weight: var(--font-weight-semibold);
		font-size: var(--font-size-sm);
		color: var(--color-text);
	}

	.layer-desc {
		font-size: var(--font-size-xs);
		color: var(--color-text-muted);
	}

	.layer--themes {
		background: color-mix(in oklch, var(--color-primary) 10%, var(--color-bg-elevated));
		border-color: color-mix(in oklch, var(--color-primary) 30%, var(--color-border));
	}

	.layer--themes .layer-name {
		color: var(--color-primary);
	}

	.layer--semantic {
		background: var(--color-bg-elevated);
	}

	.layer--primitives {
		background: var(--color-bg-muted);
	}

	.layer-arrow {
		color: var(--color-text-muted);
		font-size: var(--font-size-lg);
	}

	code {
		font-family: var(--font-mono);
	}

	.full-height :global(.codeblock__content) {
		max-height: none;
	}
</style>
