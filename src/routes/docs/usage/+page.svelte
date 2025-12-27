<script lang="ts">
	import CodeBlock from '$lib/internal/CodeBlock.svelte';
	import Button from '$lib/components/button/Button.svelte';
	import ArrowRightIcon from '$lib/icons/ArrowRightIcon.svelte';
</script>

<svelte:head>
	<title>Usage - Greenfield UI</title>
</svelte:head>

<article class="docs-page">
	<header class="page-header">
		<h1>Usage</h1>
		<p class="lead">Learn the component API patterns and how to compose them in your app.</p>
	</header>

	<section class="section">
		<h2>Importing components</h2>
		<p class="section-intro">All components are named exports from the main package.</p>
		<CodeBlock
			code={`import { Button, Card, Input, Dialog } from '@xsimjo/design-system';`}
			language="typescript"
		/>
	</section>

	<section class="section">
		<h2>Props</h2>
		<p class="section-intro">
			Components extend native HTML attributes. Any prop you'd pass to the underlying element works
			on the component.
		</p>
		<CodeBlock
			code={`<!-- All valid HTML button attributes work -->
<Button
  type="submit"
  disabled={isLoading}
  aria-label="Submit form"
  onclick={handleSubmit}
>
  Submit
</Button>`}
			language="svelte"
		/>
		<div class="prop-table">
			<h3>Common props</h3>
			<table>
				<thead>
					<tr>
						<th>Prop</th>
						<th>Components</th>
						<th>Values</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td><code>size</code></td>
						<td>Button, Input, Select, Badge</td>
						<td><code>'sm' | 'md' | 'lg'</code></td>
					</tr>
					<tr>
						<td><code>color</code></td>
						<td>Button, Badge</td>
						<td><code>'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'</code></td>
					</tr>
					<tr>
						<td><code>variant</code></td>
						<td>Button</td>
						<td><code>'filled' | 'outline' | 'ghost' | 'soft' | 'link'</code></td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>

	<section class="section">
		<h2>Snippets</h2>
		<p class="section-intro">
			Components use Svelte 5 snippets for flexible content composition. Pass content to named slots
			using the <code>{`{#snippet}`}</code> syntax.
		</p>
		<CodeBlock
			code={`<Card>
  {#snippet header()}
    <h2>Card Title</h2>
    <Badge color="success">Active</Badge>
  {/snippet}

  <p>Card content goes here.</p>

  {#snippet footer()}
    <Button>Save</Button>
  {/snippet}
</Card>`}
			language="svelte"
		/>
		<p class="hint">
			The default slot (children) doesn't need <code>{`{#snippet}`}</code> — just put content directly
			inside.
		</p>
	</section>

	<section class="section">
		<h2>Two-way binding</h2>
		<p class="section-intro">
			Form components and dialogs support two-way binding with <code>bind:</code>.
		</p>
		<CodeBlock
			code={`let email = $state('');
let dialogOpen = $state(false);

<Input bind:value={email} label="Email" />

<Button onclick={() => dialogOpen = true}>Open</Button>
<Dialog bind:open={dialogOpen} title="Confirm">
  Are you sure?
</Dialog>`}
			language="svelte"
		/>
	</section>

	<section class="section">
		<h2>Icon slots</h2>
		<p class="section-intro">Input and Button components accept icons as snippets.</p>
		<CodeBlock
			code={`<Input placeholder="Search...">
  {#snippet iconLeft()}
    <SearchIcon size={16} />
  {/snippet}
</Input>

<Button>
  Continue
  <ArrowRightIcon size={16} />
</Button>`}
			language="svelte"
		/>
	</section>

	<section class="section">
		<h2>Form states</h2>
		<p class="section-intro">Input and Select support validation states and helper text.</p>
		<CodeBlock
			code={`<Input
  label="Email"
  value={email}
  error={!isValid}
  helperText={!isValid ? 'Please enter a valid email' : ''}
/>

<Input
  label="Username"
  value={username}
  success={isAvailable}
  helperText={isAvailable ? 'Username is available' : ''}
/>`}
			language="svelte"
		/>
	</section>

	<section class="section">
		<h2>Button loading state</h2>
		<p class="section-intro">Show a spinner and disable interaction during async operations.</p>
		<CodeBlock
			code={`let isSubmitting = $state(false);

async function handleSubmit() {
  isSubmitting = true;
  await saveData();
  isSubmitting = false;
}

<Button loading={isSubmitting} onclick={handleSubmit}>
  Save Changes
</Button>`}
			language="svelte"
		/>
		<div class="demo">
			<Button loading>Saving...</Button>
			<Button>Normal</Button>
		</div>
	</section>

	<section class="section">
		<h2>Toast notifications</h2>
		<p class="section-intro">
			Use the toast store to show notifications. Add <code>ToastContainer</code> to your layout.
		</p>
		<CodeBlock
			code={`import { ToastContainer, toast } from '@xsimjo/design-system';

function showSuccess() {
  toast.success('Changes saved successfully');
}

<Button onclick={showSuccess}>Save</Button>
<ToastContainer />`}
			language="svelte"
		/>
	</section>

	<section class="section">
		<h2>Accessibility</h2>
		<p class="section-intro">
			Components include ARIA attributes and keyboard navigation by default.
		</p>
		<ul class="a11y-list">
			<li><strong>Dialog</strong> — Focus trap, Escape to close, aria-modal</li>
			<li>
				<strong>Input</strong> — Labels linked via aria-labelledby, error states via aria-invalid
			</li>
			<li><strong>Button</strong> — Disabled state removes from tab order</li>
			<li><strong>Tabs</strong> — Arrow key navigation, aria-selected</li>
		</ul>
	</section>

	<section class="section next">
		<h2>Next: Theming</h2>
		<p class="section-intro">Learn how to customize colors, spacing, and component styles.</p>
		<Button href="/docs/theming">
			Theming Guide
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
	}

	.section {
		margin-bottom: var(--space-8);
	}

	.section-intro {
		color: var(--color-text-muted);
		margin-bottom: var(--space-3);
		line-height: var(--line-height-relaxed);
	}

	.section-intro code {
		background: var(--color-bg-muted);
		padding: 2px 6px;
		border-radius: var(--radius-sm);
		font-family: var(--font-mono);
		font-size: 0.9em;
	}

	h2 {
		font-size: var(--font-size-lg);
		font-weight: var(--font-weight-semibold);
		color: var(--color-text);
		margin-bottom: var(--space-3);
	}

	h3 {
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-semibold);
		color: var(--color-text);
		margin-bottom: var(--space-2);
		margin-top: var(--space-4);
	}

	.hint {
		font-size: var(--font-size-sm);
		color: var(--color-text-muted);
		margin-top: var(--space-3);
		line-height: var(--line-height-relaxed);
	}

	.hint code {
		background: var(--color-bg-muted);
		padding: 2px 6px;
		border-radius: var(--radius-sm);
		font-family: var(--font-mono);
		font-size: 0.85em;
	}

	/* Prop table */
	.prop-table {
		margin-top: var(--space-4);
	}

	table {
		width: 100%;
		border-collapse: collapse;
		font-size: var(--font-size-sm);
	}

	th,
	td {
		text-align: left;
		padding: var(--space-2) var(--space-3);
		border-bottom: 1px solid var(--color-border);
	}

	th {
		font-weight: var(--font-weight-medium);
		color: var(--color-text-muted);
		font-size: var(--font-size-xs);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	td {
		color: var(--color-text);
	}

	td code {
		background: var(--color-bg-muted);
		padding: 2px 6px;
		border-radius: var(--radius-sm);
		font-family: var(--font-mono);
		font-size: 0.85em;
	}

	/* Demo */
	.demo {
		display: flex;
		gap: var(--space-3);
		margin-top: var(--space-4);
		padding: var(--space-4);
		background: var(--color-bg-muted);
		border-radius: var(--radius-md);
	}

	/* A11y list */
	.a11y-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.a11y-list li {
		font-size: var(--font-size-sm);
		color: var(--color-text);
		line-height: var(--line-height-relaxed);
	}

	.a11y-list strong {
		color: var(--color-text);
	}

	.next {
		border-top: 1px solid var(--color-border);
		padding-top: var(--space-8);
		margin-top: var(--space-10);
	}
</style>
