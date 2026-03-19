<script lang="ts">
	import Toaster from '$lib/components/toast/Toaster.svelte';
	import { toast, type ToastPosition } from '$lib/components/toast/toast.svelte.js';
	import Button from '$lib/components/button/Button.svelte';
	import Select from '$lib/components/select/Select.svelte';
	import CodeExample from '$lib/internal/CodeExample.svelte';
	import TableOfContents from '$lib/internal/TableOfContents.svelte';

	let position = $state<ToastPosition>('bottom-right');
	let showBorder = $state(false);
	let showProgress = $state(true);

	const positionOptions = [
		{ value: 'bottom-right', label: 'bottom-right' },
		{ value: 'bottom-left', label: 'bottom-left' },
		{ value: 'bottom-center', label: 'bottom-center' },
		{ value: 'top-right', label: 'top-right' },
		{ value: 'top-left', label: 'top-left' },
		{ value: 'top-center', label: 'top-center' }
	];

	const positionCode = '<Toaster position="top-right" />';
	const appearanceCode = '<Toaster showBorder showProgress />';

	const variantsCode =
		'<' +
		`script>
  import { Toaster, toast } from '@xsimjo/design-system';
</` +
		`script>

<Toaster />

<button onclick={() => toast.success('Changes saved')}>Success</button>
<button onclick={() => toast.danger('Action failed')}>Danger</button>
<button onclick={() => toast.warning('Session expiring')}>Warning</button>
<button onclick={() => toast.info('Update available')}>Info</button>
<button onclick={() => toast.add('Clipboard copied')}>Neutral</button>`;

	const tocSections = [
		{ id: 'examples', label: 'Examples' },
		{ id: 'variants', label: 'Variants', indent: true },
		{ id: 'with-description', label: 'With Description', indent: true },
		{ id: 'persistent', label: 'Persistent', indent: true },
		{ id: 'position', label: 'Position', indent: true },
		{ id: 'appearance', label: 'Appearance', indent: true },
		{ id: 'programmatic', label: 'Programmatic API', indent: true },
		{ id: 'api', label: 'API' }
	];
</script>

<svelte:head>
	<title>Toast - Greenfield UI</title>
</svelte:head>

<Toaster {position} {showBorder} {showProgress} />

<div class="docs-layout">
	<article class="docs-content">
		<header class="page-header">
			<h1>Toast</h1>
			<p class="lead">
				Ephemeral notification messages that appear in a fixed corner of the viewport. Powered by <code
					>@floating-ui/dom</code
				>
				for precise, overflow-safe positioning. Triggered programmatically via the
				<code>toast</code> store.
			</p>
		</header>

		<section id="examples" class="doc-section">
			<h2>Examples</h2>

			<div id="variants" class="example-block">
				<h3>Variants</h3>
				<p class="example-desc">
					Five semantic variants: <code>success</code>, <code>danger</code>,
					<code>warning</code>, <code>info</code>, and <code>neutral</code>.
				</p>
				<CodeExample code={variantsCode}>
					<div class="button-row">
						<Button
							variant="outline"
							color="success"
							onclick={() => toast.success('Changes saved successfully.')}>Success</Button
						>
						<Button
							variant="outline"
							color="danger"
							onclick={() => toast.danger('Something went wrong.')}>Danger</Button
						>
						<Button
							variant="outline"
							color="warning"
							onclick={() => toast.warning('Your session is about to expire.')}>Warning</Button
						>
						<Button
							variant="outline"
							color="info"
							onclick={() => toast.info('A new update is available.')}>Info</Button
						>
						<Button
							variant="outline"
							color="secondary"
							onclick={() => toast.add('Copied to clipboard.')}>Neutral</Button
						>
					</div>
				</CodeExample>
			</div>

			<div id="with-description" class="example-block">
				<h3>With Description</h3>
				<p class="example-desc">
					Pass a <code>description</code> for secondary detail text below the message.
				</p>
				<CodeExample
					code={`toast.success('Profile updated', {
  description: 'Your changes have been saved to the server.'
});

toast.danger('Upload failed', {
  description: 'The file exceeds the 10 MB size limit.'
});`}
				>
					<div class="button-row">
						<Button
							variant="outline"
							color="success"
							onclick={() =>
								toast.success('Profile updated', {
									description: 'Your changes have been saved to the server.'
								})}>With description</Button
						>
						<Button
							variant="outline"
							color="danger"
							onclick={() =>
								toast.danger('Upload failed', {
									description: 'The file exceeds the 10 MB size limit.'
								})}>With error detail</Button
						>
					</div>
				</CodeExample>
			</div>

			<div id="persistent" class="example-block">
				<h3>Persistent</h3>
				<p class="example-desc">
					Set <code>duration: 0</code> to prevent auto-dismissal. The user must manually close the toast.
				</p>
				<CodeExample
					code={`toast.info('Deployment in progress', {
  description: 'This may take a few minutes.',
  duration: 0
});`}
				>
					<Button
						variant="outline"
						color="info"
						onclick={() =>
							toast.info('Deployment in progress', {
								description: 'This may take a few minutes.',
								duration: 0
							})}>Show persistent toast</Button
					>
				</CodeExample>
			</div>

			<div id="position" class="example-block">
				<h3>Position</h3>
				<p class="example-desc">
					The <code>Toaster</code> accepts a <code>position</code> prop. Try switching it below.
				</p>
				<CodeExample code={positionCode}>
					<div class="position-demo">
						<Select options={positionOptions} bind:value={position} placeholder="Select position" />
						<Button
							variant="outline"
							color="secondary"
							onclick={() => toast.info('Position: ' + position)}>Trigger toast</Button
						>
					</div>
				</CodeExample>
			</div>

			<div id="appearance" class="example-block">
				<h3>Appearance</h3>
				<p class="example-desc">
					Toggle <code>showBorder</code> to add a colored left accent stripe, and
					<code>showProgress</code> to show a countdown bar at the bottom of timed toasts.
				</p>
				<CodeExample code={appearanceCode}>
					<div class="appearance-demo">
						<label class="toggle-label">
							<input type="checkbox" bind:checked={showBorder} />
							<code>showBorder</code>
						</label>
						<label class="toggle-label">
							<input type="checkbox" bind:checked={showProgress} />
							<code>showProgress</code>
						</label>
						<div class="button-row">
							<Button
								variant="outline"
								color="success"
								onclick={() => toast.success('Changes saved successfully.')}>Success</Button
							>
							<Button
								variant="outline"
								color="danger"
								onclick={() => toast.danger('Something went wrong.')}>Danger</Button
							>
							<Button
								variant="outline"
								color="info"
								onclick={() => toast.info('A new update is available.')}>Info</Button
							>
						</div>
					</div>
				</CodeExample>
			</div>

			<div id="programmatic" class="example-block">
				<h3>Programmatic API</h3>
				<p class="example-desc">
					Use <code>toast.dismiss(id)</code> or <code>toast.clear()</code> to remove toasts programmatically.
				</p>
				<CodeExample
					code={`const id = toast.warning('File queued for upload', { duration: 0 });

// later…
toast.dismiss(id);

// or remove all at once
toast.clear();`}
				>
					<div class="button-row">
						<Button
							variant="outline"
							color="warning"
							onclick={() => {
								toast.warning('File queued for upload', { duration: 0 });
							}}>Add persistent</Button
						>
						<Button variant="ghost" color="danger" onclick={() => toast.clear()}>Clear all</Button>
					</div>
				</CodeExample>
			</div>
		</section>

		<section id="api" class="doc-section">
			<h2>API</h2>

			<div class="api-table">
				<h3>Toaster Props</h3>
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
							<td><code>position</code></td>
							<td
								><code
									>'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' |
									'bottom-right'</code
								></td
							>
							<td><code>'bottom-right'</code></td>
							<td>Corner of the viewport where toasts appear</td>
						</tr>
						<tr>
							<td><code>margin</code></td>
							<td><code>number</code></td>
							<td><code>16</code></td>
							<td>Gap in px between the toast container and the viewport edge</td>
						</tr>
						<tr>
							<td><code>showBorder</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Show a colored left accent stripe on each toast</td>
						</tr>
						<tr>
							<td><code>showProgress</code></td>
							<td><code>boolean</code></td>
							<td><code>true</code></td>
							<td>Show a countdown progress bar at the bottom of timed toasts</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="api-table">
				<h3>toast store methods</h3>
				<table class="props-table">
					<thead>
						<tr>
							<th>Method</th>
							<th>Returns</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>toast.add(message, options?)</code></td>
							<td><code>string</code></td>
							<td>Adds a toast. Returns its id.</td>
						</tr>
						<tr>
							<td><code>toast.success(message, options?)</code></td>
							<td><code>string</code></td>
							<td>Shorthand for <code>variant: 'success'</code></td>
						</tr>
						<tr>
							<td><code>toast.danger(message, options?)</code></td>
							<td><code>string</code></td>
							<td>Shorthand for <code>variant: 'danger'</code></td>
						</tr>
						<tr>
							<td><code>toast.warning(message, options?)</code></td>
							<td><code>string</code></td>
							<td>Shorthand for <code>variant: 'warning'</code></td>
						</tr>
						<tr>
							<td><code>toast.info(message, options?)</code></td>
							<td><code>string</code></td>
							<td>Shorthand for <code>variant: 'info'</code></td>
						</tr>
						<tr>
							<td><code>toast.dismiss(id)</code></td>
							<td><code>void</code></td>
							<td>Immediately removes the toast with the given id</td>
						</tr>
						<tr>
							<td><code>toast.clear()</code></td>
							<td><code>void</code></td>
							<td>Removes all active toasts</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="api-table">
				<h3>ToastOptions</h3>
				<table class="props-table">
					<thead>
						<tr>
							<th>Property</th>
							<th>Type</th>
							<th>Default</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>description</code></td>
							<td><code>string</code></td>
							<td><code>—</code></td>
							<td>Secondary detail text shown below the message</td>
						</tr>
						<tr>
							<td><code>variant</code></td>
							<td><code>'success' | 'danger' | 'warning' | 'info' | 'neutral'</code></td>
							<td><code>'neutral'</code></td>
							<td>Color and icon variant</td>
						</tr>
						<tr>
							<td><code>duration</code></td>
							<td><code>number</code></td>
							<td><code>4000</code></td>
							<td>Auto-dismiss delay in ms. Set to <code>0</code> for persistent</td>
						</tr>
						<tr>
							<td><code>dismissible</code></td>
							<td><code>boolean</code></td>
							<td><code>true</code></td>
							<td>Whether to show the dismiss button</td>
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

	.lead code {
		font-family: var(--ui-font-mono);
		font-size: var(--font-size-xs);
		background: color-mix(in oklch, var(--ui-neutral), transparent 85%);
		padding: 2px 6px;
		border-radius: calc(var(--ui-base-radius) * 0.5);
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

	.example-desc code {
		font-family: var(--ui-font-mono);
		font-size: var(--font-size-xs);
		background: color-mix(in oklch, var(--ui-neutral), transparent 85%);
		padding: 2px 6px;
		border-radius: calc(var(--ui-base-radius) * 0.5);
	}

	.button-row {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		flex-wrap: wrap;
	}

	.position-demo {
		display: flex;
		align-items: center;
		gap: var(--space-3);
	}

	.appearance-demo {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
	}

	.toggle-label {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		cursor: pointer;
		font-size: var(--ui-text-sm);
		color: var(--ui-surface-foreground);
		user-select: none;
	}

	.api-table {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		margin-bottom: var(--space-6);
	}

	.api-table h3 {
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

	@media (max-width: 1024px) {
		.docs-layout {
			grid-template-columns: 1fr;
		}
	}
</style>
