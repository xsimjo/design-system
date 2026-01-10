<script lang="ts">
	import CodeBlock from '$lib/internal/CodeBlock.svelte';
	import Button from '$lib/components/button/Button.svelte';
	import ArrowRightIcon from '$lib/icons/ArrowRightIcon.svelte';
</script>

<svelte:head>
	<title>Installation - Greenfield UI</title>
</svelte:head>

<article class="docs-page">
	<header class="page-header">
		<h1>Installation</h1>
		<p class="lead">Get Greenfield UI set up in your Svelte 5 project.</p>
	</header>

	<section class="section">
		<h2>Requirements</h2>
		<ul class="requirements">
			<li><strong>Svelte 5</strong> — Built with runes and snippets</li>
			<li><strong>Modern browsers</strong> — Chrome 111+, Firefox 113+, Safari 16.4+</li>
			<li>
				<strong>Shiki</strong> (optional) — Required only if using the CodeBlock component
			</li>
		</ul>
	</section>

	<section class="section">
		<h2>Install the package</h2>
		<CodeBlock code="npm install @xsimjo/design-system" language="bash" />
		<p class="alt">Or with other package managers:</p>
		<CodeBlock
			code={`pnpm add @xsimjo/design-system
yarn add @xsimjo/design-system`}
			language="bash"
		/>
	</section>

	<section class="section">
		<h2>Import styles</h2>
		<p class="section-intro">
			Add the global styles to your root layout. This includes primitives, semantic tokens, and base
			styles.
		</p>
		<CodeBlock
			code={`// src/routes/+layout.svelte
import '@xsimjo/design-system/styles';`}
			language="javascript"
		/>
	</section>

	<section class="section">
		<h2>Set a theme</h2>
		<p class="section-intro">
			Add the <code>data-theme</code> attribute to your <code>&lt;html&gt;</code> element. The
			library ships with <code>light</code> and <code>dark</code> themes.
		</p>
		<CodeBlock
			code={`<!-- src/app.html -->
<!doctype html>
<html lang="en" data-theme="light">
  <head>%sveltekit.head%</head>
  <body>%sveltekit.body%</body>
</html>`}
			language="html"
		/>
		<p class="hint">
			To switch themes at runtime, update the attribute:
			<code>document.documentElement.setAttribute('data-theme', 'dark')</code>
		</p>
	</section>

	<section class="section">
		<h2>Import components</h2>
		<p class="section-intro">Import components from the main package entry point.</p>
		<CodeBlock
			code={`import { Button, Card, Input } from '@xsimjo/design-system';

// Use in your Svelte component
<Card>
  <Input label="Email" placeholder="you@example.com" />
  <Button>Submit</Button>
</Card>`}
			language="svelte"
		/>
	</section>

	<section class="section">
		<h2>Optional: CodeBlock setup</h2>
		<p class="section-intro">
			The CodeBlock component uses Shiki for syntax highlighting. Install it as a peer dependency if
			you need code highlighting.
		</p>
		<CodeBlock code="npm install shiki" language="bash" />
	</section>

	<section class="section">
		<h2>Project structure</h2>
		<p class="section-intro">A typical setup looks like this:</p>
		<CodeBlock
			code={`src/
├── app.html              # Set data-theme here
├── routes/
│   └── +layout.svelte    # Import styles here
└── lib/
    └── ...               # Your app code`}
			language="text"
		/>
	</section>

	<section class="section next">
		<h2>Next: Usage</h2>
		<p class="section-intro">Learn how to use components and understand the API patterns.</p>
		<Button href="/docs/usage">
			Usage Guide
			<ArrowRightIcon size={16} />
		</Button>
	</section>
</article>

<style>
	.docs-page {
		max-width: 100%;
	}

	.page-header {
		margin-bottom: var(--space-8);
		border-bottom: 1px solid var(--ui-border);
		padding-bottom: var(--space-6);
	}

	h1 {
		font-size: var(--font-size-3xl);
		font-weight: var(--ui-weight-bold);
		color: var(--ui-surface-foreground);
		margin-bottom: var(--space-3);
	}

	.lead {
		font-size: var(--ui-text-lg);
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 40%);
		line-height: var(--line-height-relaxed);
	}

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

	h2 {
		font-size: var(--ui-text-lg);
		font-weight: 600;
		color: var(--ui-surface-foreground);
		margin-bottom: var(--space-3);
	}

	.requirements {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.requirements li {
		font-size: var(--ui-text-sm);
		color: var(--ui-surface-foreground);
		line-height: var(--line-height-relaxed);
	}

	.requirements strong {
		color: var(--ui-surface-foreground);
	}

	.alt {
		font-size: var(--ui-text-sm);
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 40%);
		margin: var(--space-3) 0;
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

	.next {
		border-top: 1px solid var(--ui-border);
		padding-top: var(--space-8);
		margin-top: var(--space-10);
	}
</style>
