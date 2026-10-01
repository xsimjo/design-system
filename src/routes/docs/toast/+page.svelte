<script lang="ts">
	import Toaster from '$lib/components/toast/Toaster.svelte';
	import { toast, type ToastPosition } from '$lib/components/toast/toast.svelte.js';
	import Button from '$lib/components/button/Button.svelte';
	import Select from '$lib/components/select/Select.svelte';
	import CodeExample from '$internal/CodeExample.svelte';
	import TableOfContents from '$internal/TableOfContents.svelte';
	import DocsPage from '$internal/DocsPage.svelte';
	import PageHeader from '$internal/PageHeader.svelte';
	import DocSection from '$internal/DocSection.svelte';
	import ExampleBlock from '$internal/ExampleBlock.svelte';
	import PropsTable from '$internal/PropsTable.svelte';

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

<DocsPage>
	<PageHeader title="Toast">
		<p class="lead">
			Ephemeral notification messages that appear in a fixed corner of the viewport. Powered by <code
				>@floating-ui/dom</code
			>
			for precise, overflow-safe positioning. Triggered programmatically via the
			<code>toast</code> store.
		</p>
	</PageHeader>

	<DocSection id="examples" title="Examples">
		<ExampleBlock id="variants" title="Variants">
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
		</ExampleBlock>

		<ExampleBlock id="with-description" title="With Description">
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
		</ExampleBlock>

		<ExampleBlock id="persistent" title="Persistent">
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
		</ExampleBlock>

		<ExampleBlock id="position" title="Position">
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
		</ExampleBlock>

		<ExampleBlock id="appearance" title="Appearance">
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
		</ExampleBlock>

		<ExampleBlock id="programmatic" title="Programmatic API">
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
		</ExampleBlock>
	</DocSection>

	<DocSection id="api" title="API">
		<PropsTable
			title="Toaster Props"
			columns={['Prop', 'Type', 'Default', 'Description']}
			rows={[
				[
					'position',
					"'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'",
					"'bottom-right'",
					'Corner of the viewport where toasts appear'
				],
				['margin', 'number', '16', 'Gap in px between the toast container and the viewport edge'],
				['showBorder', 'boolean', 'false', 'Show a colored left accent stripe on each toast'],
				[
					'showProgress',
					'boolean',
					'true',
					'Show a countdown progress bar at the bottom of timed toasts'
				]
			]}
		/>

		<PropsTable
			title="toast store methods"
			columns={['Method', 'Returns', 'Description']}
			rows={[
				['toast.add(message, options?)', 'string', 'Adds a toast. Returns its id.'],
				['toast.success(message, options?)', 'string', "Shorthand for variant: 'success'"],
				['toast.danger(message, options?)', 'string', "Shorthand for variant: 'danger'"],
				['toast.warning(message, options?)', 'string', "Shorthand for variant: 'warning'"],
				['toast.info(message, options?)', 'string', "Shorthand for variant: 'info'"],
				['toast.dismiss(id)', 'void', 'Immediately removes the toast with the given id'],
				['toast.clear()', 'void', 'Removes all active toasts']
			]}
		/>

		<PropsTable
			title="ToastOptions"
			columns={['Property', 'Type', 'Default', 'Description']}
			rows={[
				['description', 'string', '—', 'Secondary detail text shown below the message'],
				[
					'variant',
					"'success' | 'danger' | 'warning' | 'info' | 'neutral'",
					"'neutral'",
					'Color and icon variant'
				],
				['duration', 'number', '4000', 'Auto-dismiss delay in ms. Set to 0 for persistent'],
				['dismissible', 'boolean', 'true', 'Whether to show the dismiss button']
			]}
		/>
	</DocSection>

	{#snippet sidebar()}
		<TableOfContents sections={tocSections} />
	{/snippet}
</DocsPage>

<style>
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
</style>
