<script lang="ts">
	import Modal from '$lib/components/modal/Modal.svelte';
	import Button from '$lib/components/button/Button.svelte';
	import Input from '$lib/components/input/Input.svelte';
	import Field from '$lib/components/field/Field.svelte';
	import FieldLabel from '$lib/components/field/FieldLabel.svelte';
	import CodeExample from '$lib/internal/CodeExample.svelte';
	import TableOfContents from '$lib/internal/TableOfContents.svelte';
	import TrashIcon from '$lib/icons/TrashIcon.svelte';
	import TriangleAlertIcon from '$lib/icons/TriangleAlertIcon.svelte';

	let basicOpen = $state(false);
	let withFooterOpen = $state(false);
	let formOpen = $state(false);
	let destructiveOpen = $state(false);
	let sizeSmOpen = $state(false);
	let sizeLgOpen = $state(false);
	let sizeXlOpen = $state(false);
	let sizeFullOpen = $state(false);
	let noEscapeOpen = $state(false);
	let customHeaderOpen = $state(false);

	const tocSections = [
		{ id: 'examples', label: 'Examples' },
		{ id: 'basic', label: 'Basic Usage', indent: true },
		{ id: 'with-footer', label: 'With Footer', indent: true },
		{ id: 'form-modal', label: 'Form Modal', indent: true },
		{ id: 'destructive', label: 'Destructive Action', indent: true },
		{ id: 'sizes', label: 'Sizes', indent: true },
		{ id: 'custom-header', label: 'Custom Header', indent: true },
		{ id: 'behavior', label: 'Behavior Control', indent: true },
		{ id: 'api', label: 'API' },
		{ id: 'modal-props', label: 'Modal Props', indent: true },
		{ id: 'css-tokens', label: 'CSS Tokens' }
	];
</script>

<svelte:head>
	<title>Modal - Greenfield UI</title>
</svelte:head>

<div class="docs-layout">
	<article class="docs-content">
		<header class="page-header">
			<h1>Modal</h1>
			<p class="lead">
				A dialog overlay that renders content above the page. Built on the native
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
					code={`<Button onclick={() => (open = true)}>Open modal</Button>

<Modal bind:open title="Welcome back">
  <p>This is the modal body. It can contain any content.</p>
</Modal>`}
				>
					<Button onclick={() => (basicOpen = true)}>Open modal</Button>
					<Modal bind:open={basicOpen} title="Welcome back">
						<p>This is the modal body. It can contain any content.</p>
					</Modal>
				</CodeExample>
			</div>

			<div id="with-footer" class="example-block">
				<h3>With Footer</h3>
				<p class="example-desc">
					Use the <code>footer</code> snippet to add action buttons. They are right-aligned by default.
				</p>
				<CodeExample
					code={`<Modal bind:open title="Save changes?">
  <p>You have unsaved changes. Would you like to save them before leaving?</p>
  {#snippet footer()}
    <Button variant="ghost" onclick={() => (open = false)}>Discard</Button>
    <Button onclick={() => (open = false)}>Save changes</Button>
  {/snippet}
</Modal>`}
				>
					<Button onclick={() => (withFooterOpen = true)}>Save changes?</Button>
					<Modal bind:open={withFooterOpen} title="Save changes?">
						<p>You have unsaved changes. Would you like to save them before leaving?</p>
						{#snippet footer()}
							<Button variant="ghost" onclick={() => (withFooterOpen = false)}>Discard</Button>
							<Button onclick={() => (withFooterOpen = false)}>Save changes</Button>
						{/snippet}
					</Modal>
				</CodeExample>
			</div>

			<div id="form-modal" class="example-block">
				<h3>Form Modal</h3>
				<p class="example-desc">Modals work great for forms and multi-step flows.</p>
				<CodeExample
					code={`<Modal bind:open title="Invite team member">
  <form class="form-grid">
    <Field>
      <FieldLabel>Email address</FieldLabel>
      <Input type="email" placeholder="colleague@company.com" fullWidth />
    </Field>
    <Field>
      <FieldLabel>Role</FieldLabel>
      <Input placeholder="e.g. Editor, Viewer" fullWidth />
    </Field>
  </form>
  {#snippet footer()}
    <Button variant="ghost" onclick={() => (open = false)}>Cancel</Button>
    <Button onclick={() => (open = false)}>Send invite</Button>
  {/snippet}
</Modal>`}
				>
					<Button onclick={() => (formOpen = true)}>Invite team member</Button>
					<Modal bind:open={formOpen} title="Invite team member">
						<form class="form-grid">
							<Field>
								<FieldLabel>Email address</FieldLabel>
								<Input type="email" placeholder="colleague@company.com" fullWidth />
							</Field>
							<Field>
								<FieldLabel>Role</FieldLabel>
								<Input placeholder="e.g. Editor, Viewer" fullWidth />
							</Field>
						</form>
						{#snippet footer()}
							<Button variant="ghost" onclick={() => (formOpen = false)}>Cancel</Button>
							<Button onclick={() => (formOpen = false)}>Send invite</Button>
						{/snippet}
					</Modal>
				</CodeExample>
			</div>

			<div id="destructive" class="example-block">
				<h3>Destructive Action</h3>
				<p class="example-desc">Use a danger button in the footer for irreversible actions.</p>
				<CodeExample
					code={`<Modal bind:open title="Delete project">
  <div class="destructive-body">
    <TriangleAlertIcon size={20} />
    <p>
      This will permanently delete <strong>my-project</strong> and all its data.
      This action cannot be undone.
    </p>
  </div>
  {#snippet footer()}
    <Button variant="ghost" onclick={() => (open = false)}>Cancel</Button>
    <Button color="danger" onclick={() => (open = false)}>
      <TrashIcon size={16} /> Delete project
    </Button>
  {/snippet}
</Modal>`}
				>
					<Button color="danger" variant="outline" onclick={() => (destructiveOpen = true)}>
						<TrashIcon size={16} /> Delete project
					</Button>
					<Modal bind:open={destructiveOpen} title="Delete project">
						<div class="destructive-body">
							<TriangleAlertIcon size={20} />
							<p>
								This will permanently delete <strong>my-project</strong> and all its data. This action
								cannot be undone.
							</p>
						</div>
						{#snippet footer()}
							<Button variant="ghost" onclick={() => (destructiveOpen = false)}>Cancel</Button>
							<Button color="danger" onclick={() => (destructiveOpen = false)}>
								<TrashIcon size={16} /> Delete project
							</Button>
						{/snippet}
					</Modal>
				</CodeExample>
			</div>

			<div id="sizes" class="example-block">
				<h3>Sizes</h3>
				<p class="example-desc">
					Five width variants: <code>sm</code> (400px), <code>md</code> (512px, default),
					<code>lg</code> (640px), <code>xl</code> (768px), and <code>full</code> (viewport width).
				</p>
				<CodeExample
					code={`<Modal bind:open size="sm" title="Small modal">...</Modal>
<Modal bind:open size="lg" title="Large modal">...</Modal>
<Modal bind:open size="xl" title="Extra large modal">...</Modal>
<Modal bind:open size="full" title="Full width">...</Modal>`}
				>
					<div class="size-buttons">
						<Button variant="outline" onclick={() => (sizeSmOpen = true)}>sm</Button>
						<Button variant="outline" onclick={() => (sizeLgOpen = true)}>lg</Button>
						<Button variant="outline" onclick={() => (sizeXlOpen = true)}>xl</Button>
						<Button variant="outline" onclick={() => (sizeFullOpen = true)}>full</Button>
					</div>

					<Modal bind:open={sizeSmOpen} size="sm" title="Small modal">
						<p>This modal uses <code>size="sm"</code> — 400px wide.</p>
					</Modal>
					<Modal bind:open={sizeLgOpen} size="lg" title="Large modal">
						<p>This modal uses <code>size="lg"</code> — 640px wide.</p>
					</Modal>
					<Modal bind:open={sizeXlOpen} size="xl" title="Extra large modal">
						<p>This modal uses <code>size="xl"</code> — 768px wide.</p>
					</Modal>
					<Modal bind:open={sizeFullOpen} size="full" title="Full width">
						<p>This modal uses <code>size="full"</code> — spans the full viewport width.</p>
					</Modal>
				</CodeExample>
			</div>

			<div id="custom-header" class="example-block">
				<h3>Custom Header</h3>
				<p class="example-desc">
					Provide a <code>header</code> snippet for full control over the header area. When provided,
					it replaces the default title + close button.
				</p>
				<CodeExample
					code={`<Modal bind:open>
  {#snippet header()}
    <div class="modal__header">
      <div class="custom-header-content">
        <span class="badge">New</span>
        <h2 class="modal__title">What's new in v2.0</h2>
      </div>
    </div>
  {/snippet}
  <p>Release notes content here.</p>
</Modal>`}
				>
					<Button onclick={() => (customHeaderOpen = true)}>Custom header</Button>
					<Modal bind:open={customHeaderOpen}>
						{#snippet header()}
							<div class="modal__header">
								<div class="custom-header-content">
									<span class="release-badge">New</span>
									<h2 class="modal__title">What's new in v2.0</h2>
								</div>
								<button
									class="modal__close"
									onclick={() => (customHeaderOpen = false)}
									aria-label="Close"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									>
										<path d="M18 6 6 18" /><path d="m6 6 12 12" />
									</svg>
								</button>
							</div>
						{/snippet}
						<p>Release notes content here. The header is fully customizable via the snippet API.</p>
					</Modal>
				</CodeExample>
			</div>

			<div id="behavior" class="example-block">
				<h3>Behavior Control</h3>
				<p class="example-desc">
					Disable backdrop clicks and Escape key for flows that require explicit confirmation.
				</p>
				<CodeExample
					code={`<Modal
  bind:open
  title="Required action"
  closeOnClickOutside={false}
  closeOnEscape={false}
>
  <p>You must make a choice before continuing.</p>
  {#snippet footer()}
    <Button variant="ghost" onclick={() => (open = false)}>Decline</Button>
    <Button onclick={() => (open = false)}>Accept</Button>
  {/snippet}
</Modal>`}
				>
					<Button onclick={() => (noEscapeOpen = true)}>Non-dismissible</Button>
					<Modal
						bind:open={noEscapeOpen}
						title="Required action"
						closeOnClickOutside={false}
						closeOnEscape={false}
					>
						<p>
							This modal cannot be dismissed by clicking outside or pressing Escape. You must use
							the buttons below.
						</p>
						{#snippet footer()}
							<Button variant="ghost" onclick={() => (noEscapeOpen = false)}>Decline</Button>
							<Button onclick={() => (noEscapeOpen = false)}>Accept & continue</Button>
						{/snippet}
					</Modal>
				</CodeExample>
			</div>
		</section>

		<section id="api" class="doc-section">
			<h2>API</h2>

			<div id="modal-props" class="api-table">
				<h3>Modal Props</h3>
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
							<td><code>'sm' | 'md' | 'lg' | 'xl' | 'full'</code></td>
							<td><code>'md'</code></td>
							<td>Width of the modal panel</td>
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
							<td>Footer content, right-aligned (action buttons)</td>
						</tr>
						<tr>
							<td><code>children</code></td>
							<td><code>Snippet</code></td>
							<td>required</td>
							<td>Modal body content</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>

		<section id="css-tokens" class="doc-section">
			<h2>CSS Tokens</h2>
			<p class="section-intro">
				Override these tokens to customize the modal's appearance per theme.
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
							<td><code>--modal-backdrop-color</code></td>
							<td>var(--ui-backdrop)</td>
							<td>Backdrop overlay color</td>
						</tr>
						<tr>
							<td><code>--modal-backdrop-blur</code></td>
							<td>var(--ui-backdrop-blur)</td>
							<td>Backdrop blur amount</td>
						</tr>
						<tr>
							<td><code>--modal-surface</code></td>
							<td>var(--ui-surface-overlay)</td>
							<td>Panel background</td>
						</tr>
						<tr>
							<td><code>--modal-surface-foreground</code></td>
							<td>var(--ui-surface-overlay-foreground)</td>
							<td>Panel text color</td>
						</tr>
						<tr>
							<td><code>--modal-shadow</code></td>
							<td>0 25px 50px -12px ...</td>
							<td>Panel drop shadow</td>
						</tr>
						<tr>
							<td><code>--modal-border-radius</code></td>
							<td>calc(var(--ui-base-radius) * 1.5)</td>
							<td>Panel corner radius</td>
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
							<td><code>--modal-sm-width</code></td>
							<td>400px</td>
							<td>Width for size="sm"</td>
						</tr>
						<tr>
							<td><code>--modal-md-width</code></td>
							<td>512px</td>
							<td>Width for size="md"</td>
						</tr>
						<tr>
							<td><code>--modal-lg-width</code></td>
							<td>640px</td>
							<td>Width for size="lg"</td>
						</tr>
						<tr>
							<td><code>--modal-xl-width</code></td>
							<td>768px</td>
							<td>Width for size="xl"</td>
						</tr>
						<tr>
							<td><code>--modal-padding</code></td>
							<td>24px</td>
							<td>Inner padding for all sections</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="token-group">
				<h3>Header & Close Button</h3>
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
							<td><code>--modal-title-size</code></td>
							<td>var(--ui-text-lg)</td>
							<td>Title font size</td>
						</tr>
						<tr>
							<td><code>--modal-title-weight</code></td>
							<td>var(--ui-weight-semibold)</td>
							<td>Title font weight</td>
						</tr>
						<tr>
							<td><code>--modal-close-color</code></td>
							<td>color-mix(...)</td>
							<td>Close button icon color</td>
						</tr>
						<tr>
							<td><code>--modal-close-hover-bg</code></td>
							<td>color-mix(...)</td>
							<td>Close button hover background</td>
						</tr>
						<tr>
							<td><code>--modal-close-size</code></td>
							<td>32px</td>
							<td>Close button dimensions</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="token-group">
				<h3>Footer & Motion</h3>
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
							<td><code>--modal-footer-gap</code></td>
							<td>12px</td>
							<td>Gap between footer buttons</td>
						</tr>
						<tr>
							<td><code>--modal-transition</code></td>
							<td>var(--ui-base-duration) var(--ui-base-easing)</td>
							<td>Enter animation duration/easing</td>
						</tr>
						<tr>
							<td><code>--modal-enter-offset</code></td>
							<td>12px</td>
							<td>Panel Y-offset at animation start</td>
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

	/* Example-specific styles */
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

	.destructive-body {
		display: flex;
		gap: var(--space-3);
		align-items: flex-start;
		color: var(--ui-danger);
	}

	.destructive-body p {
		margin: 0;
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 20%);
		font-size: var(--ui-text-sm);
		line-height: var(--ui-leading-normal);
	}

	.custom-header-content {
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
	}

	.release-badge {
		display: inline-flex;
		align-items: center;
		font-size: var(--ui-text-xs);
		font-weight: var(--ui-weight-semibold);
		padding: 2px 8px;
		background: color-mix(in oklch, var(--ui-primary), transparent 85%);
		color: var(--ui-primary);
		border-radius: 9999px;
		width: fit-content;
	}

	@media (max-width: 1024px) {
		.docs-layout {
			grid-template-columns: 1fr;
		}
	}
</style>
