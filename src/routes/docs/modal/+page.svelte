<script lang="ts">
	import Modal from '$lib/components/modal/Modal.svelte';
	import Button from '$lib/components/button/Button.svelte';
	import Input from '$lib/components/input/Input.svelte';
	import Field from '$lib/components/field/Field.svelte';
	import FieldLabel from '$lib/components/field/FieldLabel.svelte';
	import CodeExample from '$internal/CodeExample.svelte';
	import TableOfContents from '$internal/TableOfContents.svelte';
	import DocsPage from '$internal/DocsPage.svelte';
	import PageHeader from '$internal/PageHeader.svelte';
	import DocSection from '$internal/DocSection.svelte';
	import ExampleBlock from '$internal/ExampleBlock.svelte';
	import PropsTable from '$internal/PropsTable.svelte';
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

<DocsPage>
	<PageHeader
		title="Modal"
		description="A dialog overlay that renders content above the page. Built on the native <dialog> element for automatic focus trapping, Escape key handling, and screen reader accessibility."
	/>

	<DocSection id="examples" title="Examples">
		<ExampleBlock id="basic" title="Basic Usage">
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
		</ExampleBlock>

		<ExampleBlock id="with-footer" title="With Footer">
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
		</ExampleBlock>

		<ExampleBlock
			id="form-modal"
			title="Form Modal"
			description="Modals work great for forms and multi-step flows."
		>
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
		</ExampleBlock>

		<ExampleBlock
			id="destructive"
			title="Destructive Action"
			description="Use a danger button in the footer for irreversible actions."
		>
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
							This will permanently delete <strong>my-project</strong> and all its data. This action cannot
							be undone.
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
		</ExampleBlock>

		<ExampleBlock id="sizes" title="Sizes">
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
		</ExampleBlock>

		<ExampleBlock id="custom-header" title="Custom Header">
			<p class="example-desc">
				Provide a <code>header</code> snippet for full control over the header area. When provided, it
				replaces the default title + close button.
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
		</ExampleBlock>

		<ExampleBlock
			id="behavior"
			title="Behavior Control"
			description="Disable backdrop clicks and Escape key for flows that require explicit confirmation."
		>
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
						This modal cannot be dismissed by clicking outside or pressing Escape. You must use the
						buttons below.
					</p>
					{#snippet footer()}
						<Button variant="ghost" onclick={() => (noEscapeOpen = false)}>Decline</Button>
						<Button onclick={() => (noEscapeOpen = false)}>Accept & continue</Button>
					{/snippet}
				</Modal>
			</CodeExample>
		</ExampleBlock>
	</DocSection>

	<DocSection id="api" title="API">
		<PropsTable
			title="Modal Props"
			columns={['Prop', 'Type', 'Default', 'Description']}
			rows={[
				['open', 'boolean', 'false', 'Bindable open state'],
				['size', "'sm' | 'md' | 'lg' | 'xl' | 'full'", "'md'", 'Width of the modal panel'],
				['title', 'string', '\u2014', 'Renders a default header with title text and close button'],
				['closeOnClickOutside', 'boolean', 'true', 'Close when clicking the backdrop'],
				['closeOnEscape', 'boolean', 'true', 'Close on Escape key'],
				['header', 'Snippet', '\u2014', 'Custom header content, overrides title'],
				['footer', 'Snippet', '\u2014', 'Footer content, right-aligned (action buttons)'],
				['children', 'Snippet', 'required', 'Modal body content']
			]}
		/>
	</DocSection>

	<DocSection id="css-tokens" title="CSS Tokens">
		<p class="section-intro">
			Override these tokens to customize the modal's appearance per theme.
		</p>

		<PropsTable
			title="Backdrop & Surface"
			columns={['Token', 'Default', 'Description']}
			rows={[
				['--modal-backdrop-color', 'var(--ui-backdrop)', 'Backdrop overlay color'],
				['--modal-backdrop-blur', 'var(--ui-backdrop-blur)', 'Backdrop blur amount'],
				['--modal-surface', 'var(--ui-surface-overlay)', 'Panel background'],
				['--modal-surface-foreground', 'var(--ui-surface-overlay-foreground)', 'Panel text color'],
				['--modal-shadow', '0 25px 50px -12px ...', 'Panel drop shadow'],
				['--modal-border-radius', 'calc(var(--ui-base-radius) * 1.5)', 'Panel corner radius']
			]}
		/>

		<PropsTable
			title="Sizing"
			columns={['Token', 'Default', 'Description']}
			rows={[
				['--modal-sm-width', '400px', 'Width for size="sm"'],
				['--modal-md-width', '512px', 'Width for size="md"'],
				['--modal-lg-width', '640px', 'Width for size="lg"'],
				['--modal-xl-width', '768px', 'Width for size="xl"'],
				['--modal-padding', '24px', 'Inner padding for all sections']
			]}
		/>

		<PropsTable
			title="Header & Close Button"
			columns={['Token', 'Default', 'Description']}
			rows={[
				['--modal-title-size', 'var(--ui-text-lg)', 'Title font size'],
				['--modal-title-weight', 'var(--ui-weight-semibold)', 'Title font weight'],
				['--modal-close-color', 'color-mix(...)', 'Close button icon color'],
				['--modal-close-hover-bg', 'color-mix(...)', 'Close button hover background'],
				['--modal-close-size', '32px', 'Close button dimensions']
			]}
		/>

		<PropsTable
			title="Footer & Motion"
			columns={['Token', 'Default', 'Description']}
			rows={[
				['--modal-footer-gap', '12px', 'Gap between footer buttons'],
				[
					'--modal-transition',
					'var(--ui-base-duration) var(--ui-base-easing)',
					'Enter animation duration/easing'
				],
				['--modal-enter-offset', '12px', 'Panel Y-offset at animation start']
			]}
		/>
	</DocSection>

	{#snippet sidebar()}
		<TableOfContents sections={tocSections} />
	{/snippet}
</DocsPage>

<style>
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
</style>
