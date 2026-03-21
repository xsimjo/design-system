<script lang="ts">
	import Drawer from '$lib/components/drawer/Drawer.svelte';
	import DrawerHeader from '$lib/components/drawer/DrawerHeader.svelte';
	import DrawerBody from '$lib/components/drawer/DrawerBody.svelte';
	import DrawerFooter from '$lib/components/drawer/DrawerFooter.svelte';
	import Button from '$lib/components/button/Button.svelte';
	import Input from '$lib/components/input/Input.svelte';
	import Field from '$lib/components/field/Field.svelte';
	import FieldLabel from '$lib/components/field/FieldLabel.svelte';
	import CodeExample from '$lib/internal/CodeExample.svelte';
	import TableOfContents from '$lib/internal/TableOfContents.svelte';

	let basicOpen = $state(false);
	let withFooterOpen = $state(false);
	let leftOpen = $state(false);
	let compoundOpen = $state(false);
	let formOpen = $state(false);
	let sizeSmOpen = $state(false);
	let sizeLgOpen = $state(false);
	let sizeXlOpen = $state(false);
	let noEscapeOpen = $state(false);

	const tocSections = [
		{ id: 'examples', label: 'Examples' },
		{ id: 'basic', label: 'Basic Usage', indent: true },
		{ id: 'with-footer', label: 'With Footer', indent: true },
		{ id: 'left-placement', label: 'Left Placement', indent: true },
		{ id: 'compound', label: 'Compound Components', indent: true },
		{ id: 'form-drawer', label: 'Form Drawer', indent: true },
		{ id: 'sizes', label: 'Sizes', indent: true },
		{ id: 'behavior', label: 'Behavior Control', indent: true },
		{ id: 'api', label: 'API' },
		{ id: 'drawer-props', label: 'Drawer Props', indent: true },
		{ id: 'drawer-header-props', label: 'DrawerHeader Props', indent: true },
		{ id: 'css-tokens', label: 'CSS Tokens' }
	];
</script>

<svelte:head>
	<title>Drawer - Greenfield UI</title>
</svelte:head>

<div class="docs-layout">
	<article class="docs-content">
		<header class="page-header">
			<h1>Drawer</h1>
			<p class="lead">
				A panel that slides in from the edge of the viewport. Built on the native
				<code>&lt;dialog&gt;</code> element for automatic focus trapping, Escape key handling, and screen
				reader accessibility.
			</p>
		</header>

		<section id="examples" class="doc-section">
			<h2>Examples</h2>

			<div id="basic" class="example-block">
				<h3>Basic Usage</h3>
				<p class="example-desc">
					Use the <code>title</code> prop for a simple header with a built-in close button.
				</p>
				<CodeExample
					code={`<Button onclick={() => (open = true)}>Open drawer</Button>

<Drawer bind:open title="Details">
  <p>This is the drawer body content.</p>
</Drawer>`}
				>
					<Button onclick={() => (basicOpen = true)}>Open drawer</Button>
					<Drawer bind:open={basicOpen} title="Details">
						<p>This is the drawer body content. It slides in from the right by default.</p>
					</Drawer>
				</CodeExample>
			</div>

			<div id="with-footer" class="example-block">
				<h3>With Footer</h3>
				<p class="example-desc">
					Use the <code>footer</code> snippet to add action buttons.
				</p>
				<CodeExample
					code={`<Drawer bind:open title="Settings">
  <p>Adjust your preferences below.</p>
  {#snippet footer()}
    <Button variant="ghost" onclick={() => (open = false)}>Cancel</Button>
    <Button onclick={() => (open = false)}>Save</Button>
  {/snippet}
</Drawer>`}
				>
					<Button onclick={() => (withFooterOpen = true)}>Settings</Button>
					<Drawer bind:open={withFooterOpen} title="Settings">
						<p>Adjust your preferences below.</p>
						{#snippet footer()}
							<Button variant="ghost" onclick={() => (withFooterOpen = false)}>Cancel</Button>
							<Button onclick={() => (withFooterOpen = false)}>Save</Button>
						{/snippet}
					</Drawer>
				</CodeExample>
			</div>

			<div id="left-placement" class="example-block">
				<h3>Left Placement</h3>
				<p class="example-desc">
					Set <code>placement="left"</code> to slide the drawer in from the left edge.
				</p>
				<CodeExample
					code={`<Drawer bind:open placement="left" title="Navigation">
  <p>Navigation links go here.</p>
</Drawer>`}
				>
					<Button onclick={() => (leftOpen = true)}>Open left drawer</Button>
					<Drawer bind:open={leftOpen} placement="left" title="Navigation">
						<p>Navigation links go here. The drawer slides in from the left edge.</p>
					</Drawer>
				</CodeExample>
			</div>

			<div id="compound" class="example-block">
				<h3>Compound Components</h3>
				<p class="example-desc">
					Use <code>DrawerHeader</code>, <code>DrawerBody</code>, and <code>DrawerFooter</code> for full
					control over the drawer layout.
				</p>
				<CodeExample
					code={`<Drawer bind:open>
  <DrawerHeader title="Edit profile" />
  <DrawerBody>
    <p>Scrollable content goes here.</p>
  </DrawerBody>
  <DrawerFooter>
    <Button variant="ghost" onclick={() => (open = false)}>Cancel</Button>
    <Button onclick={() => (open = false)}>Save</Button>
  </DrawerFooter>
</Drawer>`}
				>
					<Button onclick={() => (compoundOpen = true)}>Compound drawer</Button>
					<Drawer bind:open={compoundOpen}>
						<DrawerHeader title="Edit profile" />
						<DrawerBody>
							<p>
								This drawer uses compound components for full layout control. The body is scrollable
								and the footer stays pinned at the bottom.
							</p>
						</DrawerBody>
						<DrawerFooter>
							<Button variant="ghost" onclick={() => (compoundOpen = false)}>Cancel</Button>
							<Button onclick={() => (compoundOpen = false)}>Save</Button>
						</DrawerFooter>
					</Drawer>
				</CodeExample>
			</div>

			<div id="form-drawer" class="example-block">
				<h3>Form Drawer</h3>
				<p class="example-desc">Drawers work great for forms and settings panels.</p>
				<CodeExample
					code={`<Drawer bind:open title="Add contact">
  <form class="form-grid">
    <Field>
      <FieldLabel>Full name</FieldLabel>
      <Input placeholder="Jane Doe" fullWidth />
    </Field>
    <Field>
      <FieldLabel>Email</FieldLabel>
      <Input type="email" placeholder="jane@example.com" fullWidth />
    </Field>
  </form>
  {#snippet footer()}
    <Button variant="ghost" onclick={() => (open = false)}>Cancel</Button>
    <Button onclick={() => (open = false)}>Add contact</Button>
  {/snippet}
</Drawer>`}
				>
					<Button onclick={() => (formOpen = true)}>Add contact</Button>
					<Drawer bind:open={formOpen} title="Add contact">
						<form class="form-grid">
							<Field>
								<FieldLabel>Full name</FieldLabel>
								<Input placeholder="Jane Doe" fullWidth />
							</Field>
							<Field>
								<FieldLabel>Email</FieldLabel>
								<Input type="email" placeholder="jane@example.com" fullWidth />
							</Field>
						</form>
						{#snippet footer()}
							<Button variant="ghost" onclick={() => (formOpen = false)}>Cancel</Button>
							<Button onclick={() => (formOpen = false)}>Add contact</Button>
						{/snippet}
					</Drawer>
				</CodeExample>
			</div>

			<div id="sizes" class="example-block">
				<h3>Sizes</h3>
				<p class="example-desc">
					Four width variants: <code>sm</code> (400px), <code>md</code> (512px, default),
					<code>lg</code> (640px), and <code>xl</code> (768px).
				</p>
				<CodeExample
					code={`<Drawer bind:open size="sm" title="Small">...</Drawer>
<Drawer bind:open size="lg" title="Large">...</Drawer>
<Drawer bind:open size="xl" title="Extra large">...</Drawer>`}
				>
					<div class="size-buttons">
						<Button variant="outline" onclick={() => (sizeSmOpen = true)}>sm</Button>
						<Button variant="outline" onclick={() => (sizeLgOpen = true)}>lg</Button>
						<Button variant="outline" onclick={() => (sizeXlOpen = true)}>xl</Button>
					</div>

					<Drawer bind:open={sizeSmOpen} size="sm" title="Small drawer">
						<p>This drawer uses <code>size="sm"</code> — 400px wide.</p>
					</Drawer>
					<Drawer bind:open={sizeLgOpen} size="lg" title="Large drawer">
						<p>This drawer uses <code>size="lg"</code> — 640px wide.</p>
					</Drawer>
					<Drawer bind:open={sizeXlOpen} size="xl" title="Extra large drawer">
						<p>This drawer uses <code>size="xl"</code> — 768px wide.</p>
					</Drawer>
				</CodeExample>
			</div>

			<div id="behavior" class="example-block">
				<h3>Behavior Control</h3>
				<p class="example-desc">
					Disable backdrop clicks and Escape key for flows that require explicit confirmation.
				</p>
				<CodeExample
					code={`<Drawer
  bind:open
  title="Required action"
  closeOnClickOutside={false}
  closeOnEscape={false}
>
  <p>You must make a choice.</p>
  {#snippet footer()}
    <Button variant="ghost" onclick={() => (open = false)}>Decline</Button>
    <Button onclick={() => (open = false)}>Accept</Button>
  {/snippet}
</Drawer>`}
				>
					<Button onclick={() => (noEscapeOpen = true)}>Non-dismissible</Button>
					<Drawer
						bind:open={noEscapeOpen}
						title="Required action"
						closeOnClickOutside={false}
						closeOnEscape={false}
					>
						<p>
							This drawer cannot be dismissed by clicking outside or pressing Escape. You must use
							the buttons below.
						</p>
						{#snippet footer()}
							<Button variant="ghost" onclick={() => (noEscapeOpen = false)}>Decline</Button>
							<Button onclick={() => (noEscapeOpen = false)}>Accept</Button>
						{/snippet}
					</Drawer>
				</CodeExample>
			</div>
		</section>

		<section id="api" class="doc-section">
			<h2>API</h2>

			<div id="drawer-props" class="api-table">
				<h3>Drawer Props</h3>
				<table class="props-table">
					<thead>
						<tr>
							<th>Prop</th>
							<th>Type</th>
							<th>Default</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>open</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Bindable open state</td>
						</tr>
						<tr>
							<td><code>size</code></td>
							<td><code>'sm' | 'md' | 'lg' | 'xl'</code></td>
							<td><code>'md'</code></td>
							<td>Width of the drawer panel</td>
						</tr>
						<tr>
							<td><code>placement</code></td>
							<td><code>'left' | 'right'</code></td>
							<td><code>'right'</code></td>
							<td>Which edge the drawer slides from</td>
						</tr>
						<tr>
							<td><code>title</code></td>
							<td><code>string</code></td>
							<td><code>—</code></td>
							<td>Renders a default header with title text and close button</td>
						</tr>
						<tr>
							<td><code>closeOnClickOutside</code></td>
							<td><code>boolean</code></td>
							<td><code>true</code></td>
							<td>Close when clicking the backdrop</td>
						</tr>
						<tr>
							<td><code>closeOnEscape</code></td>
							<td><code>boolean</code></td>
							<td><code>true</code></td>
							<td>Close on Escape key</td>
						</tr>
						<tr>
							<td><code>header</code></td>
							<td><code>Snippet</code></td>
							<td><code>—</code></td>
							<td>Custom header content, overrides <code>title</code></td>
						</tr>
						<tr>
							<td><code>footer</code></td>
							<td><code>Snippet</code></td>
							<td><code>—</code></td>
							<td>Footer content, right-aligned</td>
						</tr>
						<tr>
							<td><code>children</code></td>
							<td><code>Snippet</code></td>
							<td>required</td>
							<td>Drawer body content</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div id="drawer-header-props" class="api-table">
				<h3>DrawerHeader Props</h3>
				<table class="props-table">
					<thead>
						<tr>
							<th>Prop</th>
							<th>Type</th>
							<th>Default</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>title</code></td>
							<td><code>string</code></td>
							<td><code>—</code></td>
							<td>Title text rendered as an h2</td>
						</tr>
						<tr>
							<td><code>children</code></td>
							<td><code>Snippet</code></td>
							<td><code>—</code></td>
							<td>Custom header content, overrides <code>title</code></td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>

		<section id="css-tokens" class="doc-section">
			<h2>CSS Tokens</h2>
			<p class="section-intro">
				Override these tokens to customize the drawer's appearance per theme.
			</p>

			<div class="token-group">
				<h3>Backdrop & Surface</h3>
				<table class="props-table">
					<thead>
						<tr>
							<th>Token</th>
							<th>Default</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>--drawer-backdrop-color</code></td>
							<td>var(--ui-backdrop)</td>
							<td>Backdrop overlay color</td>
						</tr>
						<tr>
							<td><code>--drawer-backdrop-blur</code></td>
							<td>var(--ui-backdrop-blur)</td>
							<td>Backdrop blur amount</td>
						</tr>
						<tr>
							<td><code>--drawer-surface</code></td>
							<td>var(--ui-surface-overlay)</td>
							<td>Panel background</td>
						</tr>
						<tr>
							<td><code>--drawer-surface-foreground</code></td>
							<td>var(--ui-surface-overlay-foreground)</td>
							<td>Panel text color</td>
						</tr>
						<tr>
							<td><code>--drawer-shadow</code></td>
							<td>var(--ui-depth)</td>
							<td>Panel drop shadow</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="token-group">
				<h3>Sizing</h3>
				<table class="props-table">
					<thead>
						<tr>
							<th>Token</th>
							<th>Default</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>--drawer-sm-width</code></td>
							<td>400px</td>
							<td>Width for size="sm"</td>
						</tr>
						<tr>
							<td><code>--drawer-md-width</code></td>
							<td>512px</td>
							<td>Width for size="md"</td>
						</tr>
						<tr>
							<td><code>--drawer-lg-width</code></td>
							<td>640px</td>
							<td>Width for size="lg"</td>
						</tr>
						<tr>
							<td><code>--drawer-xl-width</code></td>
							<td>768px</td>
							<td>Width for size="xl"</td>
						</tr>
						<tr>
							<td><code>--drawer-padding</code></td>
							<td>24px</td>
							<td>Inner padding for all sections</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="token-group">
				<h3>Header, Footer & Motion</h3>
				<table class="props-table">
					<thead>
						<tr>
							<th>Token</th>
							<th>Default</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>--drawer-title-size</code></td>
							<td>var(--ui-text-lg)</td>
							<td>Title font size</td>
						</tr>
						<tr>
							<td><code>--drawer-title-weight</code></td>
							<td>var(--ui-weight-semibold)</td>
							<td>Title font weight</td>
						</tr>
						<tr>
							<td><code>--drawer-close-color</code></td>
							<td>color-mix(...)</td>
							<td>Close button icon color</td>
						</tr>
						<tr>
							<td><code>--drawer-close-hover-bg</code></td>
							<td>color-mix(...)</td>
							<td>Close button hover background</td>
						</tr>
						<tr>
							<td><code>--drawer-footer-gap</code></td>
							<td>12px</td>
							<td>Gap between footer buttons</td>
						</tr>
						<tr>
							<td><code>--drawer-transition</code></td>
							<td>var(--ui-base-duration) var(--ui-base-easing)</td>
							<td>Animation duration/easing</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>
	</article>

	<TableOfContents sections={tocSections} />
</div>

<style>
	.docs-layout {
		display: grid;
		grid-template-columns: 1fr 180px;
		gap: var(--space-12);
	}

	.docs-content {
		min-width: 0;
	}

	.page-header {
		margin-bottom: var(--space-8);
	}

	h1 {
		font-size: var(--font-size-3xl);
		font-weight: var(--ui-weight-bold);
		color: var(--ui-surface-foreground);
		margin: 0 0 var(--space-3) 0;
	}

	.lead {
		font-size: var(--ui-text-lg);
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 40%);
		line-height: var(--line-height-relaxed);
		margin: 0;
	}

	.doc-section {
		margin-bottom: var(--space-12);
		scroll-margin-top: var(--space-4);
	}

	.doc-section h2 {
		font-size: var(--font-size-2xl);
		font-weight: var(--ui-weight-bold);
		color: var(--ui-surface-foreground);
		margin: 0 0 var(--space-6) 0;
		padding-bottom: var(--space-3);
		border-bottom: 1px solid var(--ui-border);
	}

	.section-intro {
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 40%);
		font-size: var(--ui-text-base);
		line-height: var(--line-height-relaxed);
		margin: 0 0 var(--space-6) 0;
	}

	.example-block {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
		margin-bottom: var(--space-8);
		scroll-margin-top: var(--space-4);
	}

	.example-block h3 {
		font-size: var(--ui-text-lg);
		font-weight: 600;
		color: var(--ui-surface-foreground);
		margin: 0;
	}

	.example-desc {
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 40%);
		margin: 0;
	}

	.api-table,
	.token-group {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		margin-bottom: var(--space-6);
	}

	.api-table h3,
	.token-group h3 {
		font-size: var(--ui-text-lg);
		font-weight: 600;
		color: var(--ui-surface-foreground);
		margin: 0;
	}

	.props-table {
		width: 100%;
		border-collapse: collapse;
		font-size: var(--ui-text-sm);
	}

	.props-table th,
	.props-table td {
		padding: var(--space-2) var(--space-3);
		text-align: left;
		border-bottom: 1px solid var(--ui-border);
	}

	.props-table th {
		font-weight: 600;
		background: color-mix(in oklch, var(--ui-neutral), transparent 85%);
	}

	.props-table code {
		font-family: var(--ui-font-mono);
		font-size: var(--font-size-xs);
		background: color-mix(in oklch, var(--ui-neutral), transparent 85%);
		padding: 2px 6px;
		border-radius: calc(var(--ui-base-radius) * 0.5);
	}

	.form-grid {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}

	.size-buttons {
		display: flex;
		gap: var(--space-3);
		flex-wrap: wrap;
	}

	@media (max-width: 1024px) {
		.docs-layout {
			grid-template-columns: 1fr;
		}
	}
</style>
