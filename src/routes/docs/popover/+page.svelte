<script lang="ts">
	import Popover from '$lib/components/popover/Popover.svelte';
	import PopoverHeader from '$lib/components/popover/PopoverHeader.svelte';
	import PopoverContent from '$lib/components/popover/PopoverContent.svelte';
	import PopoverFooter from '$lib/components/popover/PopoverFooter.svelte';
	import Button from '$lib/components/button/Button.svelte';
	import CodeExample from '$lib/internal/CodeExample.svelte';
	import TableOfContents from '$lib/internal/TableOfContents.svelte';
	import DocsPage from '$lib/internal/DocsPage.svelte';
	import PageHeader from '$lib/internal/PageHeader.svelte';
	import DocSection from '$lib/internal/DocSection.svelte';
	import ExampleBlock from '$lib/internal/ExampleBlock.svelte';
	import PropsTable from '$lib/internal/PropsTable.svelte';
	import type { Placement } from '@floating-ui/dom';

	const topPlacements: Placement[] = ['top-start', 'top', 'top-end'];
	const leftPlacements: Placement[] = ['left-start', 'left', 'left-end'];
	const rightPlacements: Placement[] = ['right-start', 'right', 'right-end'];
	const bottomPlacements: Placement[] = ['bottom-start', 'bottom', 'bottom-end'];

	const tocSections = [
		{ id: 'examples', label: 'Examples' },
		{ id: 'basic', label: 'Basic', indent: true },
		{ id: 'sub-components', label: 'Sub-components', indent: true },
		{ id: 'placements', label: 'Placements', indent: true },
		{ id: 'controlled', label: 'Controlled', indent: true },
		{ id: 'no-arrow', label: 'Without Arrow', indent: true },
		{ id: 'persistent', label: 'Persistent', indent: true },
		{ id: 'api', label: 'API' },
		{ id: 'css-tokens', label: 'CSS Tokens' }
	];

	let controlledOpen = $state(false);
</script>

<svelte:head>
	<title>Popover - Greenfield UI</title>
</svelte:head>

<DocsPage>
	<PageHeader
		title="Popover"
		description="A click-triggered floating panel for rich content — titles, descriptions, and actions. Positioned with @floating-ui/dom and kept in sync via autoUpdate while open. Dismisses on outside click or Escape."
	/>

	<DocSection id="examples" title="Examples">
		<ExampleBlock id="basic" title="Basic">
			<p class="example-desc">
				Wrap any trigger element with <code>Popover</code> and pass a
				<code>content</code> snippet. Without sub-components the snippet renders directly in the panel
				with no padding — full control over layout. Click outside or press Escape to dismiss.
			</p>
			<CodeExample
				code={`<Popover>
  {#snippet content()}
    <p style="padding: 12px">Click outside or press Escape to dismiss.</p>
  {/snippet}
  <Button>Open Popover</Button>
</Popover>`}
			>
				<div class="example-row">
					<Popover>
						{#snippet content()}
							<p style="padding: 12px">Click outside or press Escape to dismiss.</p>
						{/snippet}
						<Button>Open Popover</Button>
					</Popover>
				</div>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="sub-components" title="Sub-components">
			<p class="example-desc">
				Use <code>PopoverHeader</code>, <code>PopoverContent</code>, and
				<code>PopoverFooter</code> to compose structured panels. Each brings its own padding and
				dividers. <code>PopoverHeader</code> automatically renders a close button when nested inside
				a <code>Popover</code>.
			</p>
			<CodeExample
				code={`<Popover>
  {#snippet content()}
    <PopoverHeader>What's new</PopoverHeader>
    <PopoverContent>
      <p>Version 2.0 ships with a redesigned token system and five new components.</p>
    </PopoverContent>
  {/snippet}
  <Button variant="outline" color="secondary">What's new</Button>
</Popover>

<Popover>
  {#snippet content()}
    <PopoverHeader>Delete item</PopoverHeader>
    <PopoverContent>
      <p>This action cannot be undone. Are you sure?</p>
    </PopoverContent>
    <PopoverFooter>
      <Button size="sm" variant="ghost" color="secondary">Cancel</Button>
      <Button size="sm" color="danger">Delete</Button>
    </PopoverFooter>
  {/snippet}
  <Button color="danger" variant="outline">Delete item</Button>
</Popover>`}
			>
				<div class="example-row">
					<Popover>
						{#snippet content()}
							<PopoverHeader>What's new</PopoverHeader>
							<PopoverContent>
								<p>Version 2.0 ships with a redesigned token system and five new components.</p>
							</PopoverContent>
						{/snippet}
						<Button variant="outline" color="secondary">What's new</Button>
					</Popover>
					<Popover>
						{#snippet content()}
							<PopoverHeader>Delete item</PopoverHeader>
							<PopoverContent>
								<p>This action cannot be undone. Are you sure?</p>
							</PopoverContent>
							<PopoverFooter>
								<Button size="sm" variant="ghost" color="secondary">Cancel</Button>
								<Button size="sm" color="danger">Delete</Button>
							</PopoverFooter>
						{/snippet}
						<Button color="danger" variant="outline">Delete item</Button>
					</Popover>
				</div>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="placements" title="Placements">
			<p class="example-desc">
				All 12 floating-ui placements. The <code>flip</code> middleware automatically switches to the
				opposite side when viewport space is insufficient.
			</p>
			<CodeExample
				code={`<Popover placement="top-start">…</Popover>
<Popover placement="top">…</Popover>
<Popover placement="top-end">…</Popover>
<Popover placement="right-start">…</Popover>
<Popover placement="right">…</Popover>
<Popover placement="right-end">…</Popover>
<Popover placement="bottom-end">…</Popover>
<Popover placement="bottom">…</Popover>
<Popover placement="bottom-start">…</Popover>
<Popover placement="left-end">…</Popover>
<Popover placement="left">…</Popover>
<Popover placement="left-start">…</Popover>`}
			>
				<div class="placement-grid">
					<div class="placement-row placement-row--top">
						{#each topPlacements as p (p)}
							<Popover placement={p}>
								{#snippet content()}<p style="padding: 8px">{p}</p>{/snippet}
								<Button variant="outline" color="secondary" size="sm">{p}</Button>
							</Popover>
						{/each}
					</div>
					<div class="placement-sides">
						<div class="placement-col placement-col--left">
							{#each leftPlacements as p (p)}
								<Popover placement={p}>
									{#snippet content()}<p style="padding: 8px">{p}</p>{/snippet}
									<Button variant="outline" color="secondary" size="sm">{p}</Button>
								</Popover>
							{/each}
						</div>
						<div class="placement-spacer"></div>
						<div class="placement-col placement-col--right">
							{#each rightPlacements as p (p)}
								<Popover placement={p}>
									{#snippet content()}<p style="padding: 8px">{p}</p>{/snippet}
									<Button variant="outline" color="secondary" size="sm">{p}</Button>
								</Popover>
							{/each}
						</div>
					</div>
					<div class="placement-row placement-row--bottom">
						{#each bottomPlacements as p (p)}
							<Popover placement={p}>
								{#snippet content()}<p style="padding: 8px">{p}</p>{/snippet}
								<Button variant="outline" color="secondary" size="sm">{p}</Button>
							</Popover>
						{/each}
					</div>
				</div>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="controlled" title="Controlled">
			<p class="example-desc">
				Bind <code>open</code> to control the popover from outside. This lets you open or close it programmatically
				from other parts of your UI.
			</p>
			<CodeExample
				code={`<Popover bind:open={controlledOpen}>
  {#snippet content()}
    <PopoverHeader>Controlled popover</PopoverHeader>
    <PopoverContent>
      <p>This popover is controlled externally.</p>
    </PopoverContent>
  {/snippet}
  <Button>Trigger</Button>
</Popover>

<Button variant="outline" color="secondary" onclick={() => (controlledOpen = true)}>
  Open from outside
</Button>
<Button variant="ghost" color="secondary" onclick={() => (controlledOpen = false)}>
  Close from outside
</Button>`}
			>
				<div class="example-row example-row--wrap">
					<Popover bind:open={controlledOpen}>
						{#snippet content()}
							<PopoverHeader>Controlled popover</PopoverHeader>
							<PopoverContent>
								<p>This popover is controlled externally.</p>
							</PopoverContent>
						{/snippet}
						<Button>Trigger</Button>
					</Popover>
					<Button variant="outline" color="secondary" onclick={() => (controlledOpen = true)}>
						Open from outside
					</Button>
					<Button variant="ghost" color="secondary" onclick={() => (controlledOpen = false)}>
						Close from outside
					</Button>
				</div>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="no-arrow" title="Without Arrow">
			<p class="example-desc">
				Set <code>showArrow={`{false}`}</code> for a cleaner panel appearance without the directional
				indicator.
			</p>
			<CodeExample
				code={`<Popover showArrow={false}>
  {#snippet content()}
    <PopoverHeader>Settings</PopoverHeader>
    <PopoverContent>
      <p>Manage your notification preferences and display options here.</p>
    </PopoverContent>
  {/snippet}
  <Button variant="outline" color="secondary">Settings</Button>
</Popover>`}
			>
				<div class="example-row">
					<Popover showArrow={false}>
						{#snippet content()}
							<PopoverHeader>Settings</PopoverHeader>
							<PopoverContent>
								<p>Manage your notification preferences and display options here.</p>
							</PopoverContent>
						{/snippet}
						<Button variant="outline" color="secondary">Settings</Button>
					</Popover>
				</div>
			</CodeExample>
		</ExampleBlock>

		<ExampleBlock id="persistent" title="Persistent">
			<p class="example-desc">
				Set <code>closeOnClickOutside={`{false}`}</code> to keep the popover open when the user clicks
				elsewhere. Useful for guided flows or forms where accidental dismissal would be disruptive. The
				close button and Escape key still work.
			</p>
			<CodeExample
				code={`<Popover closeOnClickOutside={false}>
  {#snippet content()}
    <PopoverHeader>Keyboard shortcut</PopoverHeader>
    <PopoverContent>
      <p>Press <kbd>⌘K</kbd> at any time to open the command palette.</p>
    </PopoverContent>
  {/snippet}
  <Button variant="outline" color="secondary">Show tip</Button>
</Popover>`}
			>
				<div class="example-row">
					<Popover closeOnClickOutside={false}>
						{#snippet content()}
							<PopoverHeader>Keyboard shortcut</PopoverHeader>
							<PopoverContent>
								<p>Press <kbd>⌘K</kbd> at any time to open the command palette.</p>
							</PopoverContent>
						{/snippet}
						<Button variant="outline" color="secondary">Show tip</Button>
					</Popover>
				</div>
			</CodeExample>
		</ExampleBlock>
	</DocSection>

	<DocSection id="api" title="API">
		<PropsTable
			title="Popover Props"
			columns={['Prop', 'Type', 'Default', 'Description']}
			rows={[
				['open', 'boolean', 'false', 'Bindable open state. Set to true to open programmatically.'],
				[
					'placement',
					'Placement',
					"'bottom'",
					'Preferred floating-ui placement. Accepts all 12 values: top, bottom, left, right, and their -start / -end variants. Flips automatically.'
				],
				[
					'showArrow',
					'boolean',
					'true',
					'Renders the directional arrow connecting the panel to its trigger.'
				],
				[
					'popoverOffset',
					'number',
					'12',
					'Distance in pixels between the trigger and the floating panel.'
				],
				[
					'closeOnClickOutside',
					'boolean',
					'true',
					'Closes the popover when the user clicks outside the panel and trigger.'
				],
				['closeOnEscape', 'boolean', 'true', 'Closes the popover when the Escape key is pressed.'],
				[
					'content',
					'Snippet',
					'\u2014',
					'Panel content. Renders directly with no padding \u2014 use sub-components to add structure.'
				],
				[
					'children',
					'Snippet',
					'required',
					'The trigger element(s) that toggle the popover on click.'
				]
			]}
		/>

		<PropsTable
			title="PopoverHeader Props"
			columns={['Prop', 'Type', 'Default', 'Description']}
			rows={[
				[
					'showClose',
					'boolean',
					'true',
					'Renders a close button using the popover context. Only has effect when nested inside a Popover.'
				],
				['children', 'Snippet', 'required', 'Header title content.']
			]}
		/>

		<PropsTable
			title="PopoverContent / PopoverFooter Props"
			columns={['Prop', 'Type', 'Default', 'Description']}
			rows={[
				[
					'children',
					'Snippet',
					'required',
					'Content to render inside the padded section. PopoverFooter is a right-aligned flex row with a top divider.'
				]
			]}
		/>
	</DocSection>

	<DocSection id="css-tokens" title="CSS Tokens">
		<p class="example-desc" style="margin-bottom: var(--space-4)">
			All tokens are defined in <code>[data-theme]</code> scope and can be overridden per-theme or locally.
		</p>
		<PropsTable
			columns={['Token', 'Default value', 'Description']}
			rows={[
				['--popover-bg', '--ui-surface-raised', 'Panel background color'],
				['--popover-color', '--ui-surface-raised-foreground', 'Panel text color'],
				['--popover-border', '--ui-border', 'Border color'],
				['--popover-border-width', '--ui-border-width', 'Border width'],
				['--popover-border-radius', '--ui-base-radius', 'Corner radius'],
				['--popover-shadow', '--ui-depth', 'Drop shadow'],
				['--popover-padding', '--ui-base-spacing \u00d7 2', 'Inner padding'],
				['--popover-min-width', '--ui-base-spacing \u00d7 28', 'Minimum panel width'],
				[
					'--popover-max-width',
					'--ui-base-spacing \u00d7 52',
					'Maximum panel width before text wraps'
				],
				['--popover-z-index', '--ui-z-overlay', 'Stacking order'],
				['--popover-arrow-size', '8px', 'Arrow square dimension'],
				['--popover-title-size', '--ui-text-sm', 'Header title font size'],
				['--popover-title-weight', '--ui-weight-semibold', 'Header title font weight'],
				['--popover-body-size', '--ui-text-sm', 'Body text font size'],
				['--popover-close-size', '--ui-base-spacing \u00d7 3', 'Close button hit area dimension'],
				['--popover-duration', '--ui-base-duration', 'Enter/leave animation duration'],
				['--popover-easing', '--ui-base-easing', 'Enter/leave animation easing function']
			]}
		/>
	</DocSection>

	{#snippet sidebar()}
		<TableOfContents sections={tocSections} />
	{/snippet}
</DocsPage>

<style>
	.example-row {
		display: flex;
		align-items: center;
		gap: var(--space-4);
		flex-wrap: wrap;
		padding: var(--space-8) var(--space-4);
	}

	.example-row--wrap {
		flex-wrap: wrap;
	}

	.placement-grid {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
		padding: var(--space-8) var(--space-4);
	}

	.placement-row {
		display: flex;
		justify-content: center;
		gap: var(--space-2);
	}

	.placement-sides {
		display: flex;
		align-items: center;
		gap: var(--space-2);
	}

	.placement-col {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.placement-spacer {
		flex: 1;
		min-height: calc(var(--space-4) * 3);
	}

	kbd {
		font-family: var(--ui-font-mono);
		font-size: var(--font-size-xs);
		background: color-mix(in oklch, var(--ui-neutral), transparent 80%);
		border: 1px solid var(--ui-border);
		border-radius: calc(var(--ui-base-radius) * 0.375);
		padding: 1px 5px;
	}
</style>
