<script lang="ts">
	import Drawer from '$lib/components/drawer/Drawer.svelte';
	import DrawerHeader from '$lib/components/drawer/DrawerHeader.svelte';
	import DrawerBody from '$lib/components/drawer/DrawerBody.svelte';
	import DrawerFooter from '$lib/components/drawer/DrawerFooter.svelte';
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
	import TokenTable from '$internal/TokenTable.svelte';

	let basicOpen = $state(false);
	let withFooterOpen = $state(false);
	let leftOpen = $state(false);
	let compoundOpen = $state(false);
	let formOpen = $state(false);
	let sizeSmOpen = $state(false);
	let sizeLgOpen = $state(false);
	let sizeXlOpen = $state(false);
	let noEscapeOpen = $state(false);
	let noBlurOpen = $state(false);

	const tocSections = [
		{ id: 'examples', label: 'Examples' },
		{ id: 'basic', label: 'Basic Usage', indent: true },
		{ id: 'with-footer', label: 'With Footer', indent: true },
		{ id: 'left-placement', label: 'Left Placement', indent: true },
		{ id: 'compound', label: 'Compound Components', indent: true },
		{ id: 'form-drawer', label: 'Form Drawer', indent: true },
		{ id: 'sizes', label: 'Sizes', indent: true },
		{ id: 'behavior', label: 'Behavior Control', indent: true },
		{ id: 'no-blur', label: 'Without Blur', indent: true },
		{ id: 'api', label: 'API' },
		{ id: 'drawer-props', label: 'Drawer Props', indent: true },
		{ id: 'drawer-header-props', label: 'DrawerHeader Props', indent: true },
		{ id: 'css-tokens', label: 'CSS Tokens' }
	];
</script>

<svelte:head>
	<title>Drawer - Greenfield UI</title>
</svelte:head>

<DocsPage>
	<PageHeader title="Drawer">
		<p class="lead">
			A panel that slides in from the edge of the viewport. Built on the native
			<code>&lt;dialog&gt;</code> element for automatic focus trapping, Escape key handling, and screen
			reader accessibility.
		</p>
	</PageHeader>

	<DocSection id="examples" title="Examples">
		<ExampleBlock id="basic" title="Basic Usage">
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
		</ExampleBlock>

		<ExampleBlock id="with-footer" title="With Footer">
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
		</ExampleBlock>

		<ExampleBlock id="left-placement" title="Left Placement">
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
		</ExampleBlock>

		<ExampleBlock id="compound" title="Compound Components">
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
		</ExampleBlock>

		<ExampleBlock
			id="form-drawer"
			title="Form Drawer"
			description="Drawers work great for forms and settings panels."
		>
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
		</ExampleBlock>

		<ExampleBlock id="sizes" title="Sizes">
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
		</ExampleBlock>

		<ExampleBlock
			id="behavior"
			title="Behavior Control"
			description="Disable backdrop clicks and Escape key for flows that require explicit confirmation."
		>
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
						This drawer cannot be dismissed by clicking outside or pressing Escape. You must use the
						buttons below.
					</p>
					{#snippet footer()}
						<Button variant="ghost" onclick={() => (noEscapeOpen = false)}>Decline</Button>
						<Button onclick={() => (noEscapeOpen = false)}>Accept</Button>
					{/snippet}
				</Drawer>
			</CodeExample>
		</ExampleBlock>
		<ExampleBlock
			id="no-blur"
			title="Without Blur"
			description="Set backdropBlur to false to keep the page behind the backdrop sharp. The backdrop color still dims it."
		>
			<CodeExample
				code={`<Drawer bind:open title="No blur" backdropBlur={false}>
  <p>The page behind is dimmed but not blurred.</p>
</Drawer>`}
			>
				<Button onclick={() => (noBlurOpen = true)}>Open without blur</Button>
				<Drawer bind:open={noBlurOpen} title="No blur" backdropBlur={false}>
					<p>The page behind is dimmed but not blurred.</p>
				</Drawer>
			</CodeExample>
		</ExampleBlock>
	</DocSection>

	<DocSection id="api" title="API">
		<PropsTable
			id="drawer-props"
			title="Drawer Props"
			columns={['Prop', 'Type', 'Default', 'Description']}
			rows={[
				['open', 'boolean', 'false', 'Bindable open state'],
				['size', "'sm' | 'md' | 'lg' | 'xl'", "'md'", 'Width of the drawer panel'],
				['placement', "'left' | 'right'", "'right'", 'Which edge the drawer slides from'],
				['title', 'string', '\u2014', 'Renders a default header with title text and close button'],
				['closeOnClickOutside', 'boolean', 'true', 'Close when clicking the backdrop'],
				['closeOnEscape', 'boolean', 'true', 'Close on Escape key'],
				['backdropBlur', 'boolean', 'true', 'Blur the page behind the backdrop'],
				['header', 'Snippet', '\u2014', 'Custom header content, overrides title'],
				['footer', 'Snippet', '\u2014', 'Footer content, right-aligned'],
				['children', 'Snippet', 'required', 'Drawer body content']
			]}
		/>

		<PropsTable
			id="drawer-header-props"
			title="DrawerHeader Props"
			columns={['Prop', 'Type', 'Default', 'Description']}
			rows={[
				['title', 'string', '\u2014', 'Title text rendered as an h2'],
				['children', 'Snippet', '\u2014', 'Custom header content, overrides title']
			]}
		/>
	</DocSection>

	<DocSection id="css-tokens" title="CSS Tokens">
		<p class="section-intro">
			Override these tokens to customize the drawer's appearance per theme.
		</p>

		<TokenTable
			component="drawer"
			tokens={[
				['--drawer-backdrop-color', 'Backdrop overlay color'],
				['--drawer-backdrop-blur', 'Backdrop blur amount'],
				['--drawer-surface', 'Panel background'],
				['--drawer-surface-foreground', 'Panel text color'],
				['--drawer-shadow', 'Panel drop shadow']
			]}
		/>

		<TokenTable
			component="drawer"
			tokens={[
				['--drawer-sm-width', 'Width for size="sm"'],
				['--drawer-md-width', 'Width for size="md"'],
				['--drawer-lg-width', 'Width for size="lg"'],
				['--drawer-xl-width', 'Width for size="xl"'],
				['--drawer-padding', 'Inner padding for all sections']
			]}
		/>

		<TokenTable
			component="drawer"
			tokens={[
				['--drawer-title-size', 'Title font size'],
				['--drawer-title-weight', 'Title font weight'],
				['--drawer-close-color', 'Close button icon color'],
				['--drawer-close-hover-bg', 'Close button hover background'],
				['--drawer-footer-gap', 'Gap between footer buttons'],
				['--drawer-transition', 'Animation duration/easing']
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
</style>
