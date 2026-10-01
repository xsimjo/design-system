<script lang="ts">
	import Alert from '$lib/components/alert/Alert.svelte';
	import CodeExample from '$internal/CodeExample.svelte';
	import TableOfContents from '$internal/TableOfContents.svelte';
	import DocsPage from '$internal/DocsPage.svelte';
	import PageHeader from '$internal/PageHeader.svelte';
	import DocSection from '$internal/DocSection.svelte';
	import ExampleBlock from '$internal/ExampleBlock.svelte';
	import PropsTable from '$internal/PropsTable.svelte';

	const tocSections = [
		{ id: 'examples', label: 'Examples' },
		{ id: 'variants', label: 'Variants', indent: true },
		{ id: 'title', label: 'With Title', indent: true },
		{ id: 'dismissible', label: 'Dismissible', indent: true },
		{ id: 'api', label: 'API' },
		{ id: 'css-tokens', label: 'CSS Tokens' }
	];
</script>

<svelte:head>
	<title>Alert - Greenfield UI</title>
</svelte:head>

<DocsPage>
	<PageHeader
		title="Alert"
		description="Inline contextual feedback banner. Communicates status, warnings, or informational messages with an optional title and dismiss button."
	/>

	<DocSection id="examples" title="Examples">
		<ExampleBlock id="variants" title="Variants">
			<p class="example-desc">
				Four semantic variants: <code>info</code>, <code>success</code>,
				<code>warning</code>, and <code>danger</code>.
			</p>
			<CodeExample
				code={`<Alert variant="info">Your session will expire in 10 minutes.</Alert>
<Alert variant="success">Your changes have been saved successfully.</Alert>
<Alert variant="warning">This action cannot be undone.</Alert>
<Alert variant="danger">Failed to connect to the server.</Alert>`}
				previewClass="column"
			>
				<Alert variant="info">Your session will expire in 10 minutes.</Alert>
				<Alert variant="success">Your changes have been saved successfully.</Alert>
				<Alert variant="warning">This action cannot be undone.</Alert>
				<Alert variant="danger">Failed to connect to the server.</Alert>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="title" title="With Title">
			<p class="example-desc">
				Use the <code>title</code> prop to add a bold heading above the content.
			</p>
			<CodeExample
				code={`<Alert variant="info" title="Heads up">
  There is a scheduled maintenance window on Sunday from 2–4 AM UTC.
</Alert>
<Alert variant="success" title="Payment received">
  Your invoice has been paid and a receipt has been sent to your email.
</Alert>
<Alert variant="warning" title="Unsaved changes">
  You have unsaved changes. Leave the page to discard them.
</Alert>
<Alert variant="danger" title="Account suspended">
  Your account has been suspended. Contact support to resolve this.
</Alert>`}
				previewClass="column"
			>
				<Alert variant="info" title="Heads up">
					There is a scheduled maintenance window on Sunday from 2–4 AM UTC.
				</Alert>
				<Alert variant="success" title="Payment received">
					Your invoice has been paid and a receipt has been sent to your email.
				</Alert>
				<Alert variant="warning" title="Unsaved changes">
					You have unsaved changes. Leave the page to discard them.
				</Alert>
				<Alert variant="danger" title="Account suspended">
					Your account has been suspended. Contact support to resolve this.
				</Alert>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="dismissible" title="Dismissible">
			<p class="example-desc">
				Set <code>dismissible</code> to show a close button. The alert unmounts itself when
				dismissed. Use <code>ondismiss</code> to react to the event.
			</p>
			<CodeExample
				code={`<Alert variant="info" title="New features available" dismissible>
  Check out the changelog to see what's new in this release.
</Alert>
<Alert variant="warning" dismissible ondismiss={() => console.log('dismissed')}>
  Your free trial expires in 3 days.
</Alert>`}
				previewClass="column"
			>
				<Alert variant="info" title="New features available" dismissible>
					Check out the changelog to see what's new in this release.
				</Alert>
				<Alert variant="warning" dismissible>Your free trial expires in 3 days.</Alert>
			</CodeExample>
		</ExampleBlock>
	</DocSection>

	<DocSection id="api" title="API">
		<PropsTable
			title="Alert Props"
			columns={['Prop', 'Type', 'Default', 'Description']}
			rows={[
				[
					'variant',
					"'info' | 'success' | 'warning' | 'danger'",
					"'info'",
					'Semantic color variant'
				],
				['title', 'string', 'undefined', 'Optional bold heading above the content'],
				['dismissible', 'boolean', 'false', 'Shows a dismiss button that unmounts the alert'],
				['ondismiss', '() => void', 'undefined', 'Called when the alert is dismissed'],
				['children', 'Snippet', 'required', 'Body content of the alert']
			]}
		/>
		<p class="api-note">
			All standard <code>HTMLDivElement</code> attributes are forwarded to the root element.
		</p>
	</DocSection>

	<DocSection id="css-tokens" title="CSS Tokens">
		<PropsTable
			columns={['Token', 'Default', 'Description']}
			rows={[
				['--alert-bg-info', 'color-mix(--ui-info, transparent 88%)', 'Background for info variant'],
				[
					'--alert-bg-success',
					'color-mix(--ui-success, transparent 88%)',
					'Background for success variant'
				],
				[
					'--alert-bg-warning',
					'color-mix(--ui-warning, transparent 88%)',
					'Background for warning variant'
				],
				[
					'--alert-bg-danger',
					'color-mix(--ui-danger, transparent 88%)',
					'Background for danger variant'
				],
				['--alert-border-info', 'color-mix(--ui-info, transparent 60%)', 'Border for info variant'],
				[
					'--alert-border-success',
					'color-mix(--ui-success, transparent 60%)',
					'Border for success variant'
				],
				[
					'--alert-border-warning',
					'color-mix(--ui-warning, transparent 60%)',
					'Border for warning variant'
				],
				[
					'--alert-border-danger',
					'color-mix(--ui-danger, transparent 60%)',
					'Border for danger variant'
				],
				['--alert-radius', 'var(--ui-base-radius)', 'Border radius'],
				['--alert-padding-x', 'calc(var(--ui-base-spacing) * 8)', 'Horizontal padding'],
				['--alert-padding-y', 'calc(var(--ui-base-spacing) * 6)', 'Vertical padding'],
				[
					'--alert-gap',
					'calc(var(--ui-base-spacing) * 6)',
					'Gap between icon, body, and dismiss button'
				]
			]}
		/>
	</DocSection>

	{#snippet sidebar()}
		<TableOfContents sections={tocSections} />
	{/snippet}
</DocsPage>
