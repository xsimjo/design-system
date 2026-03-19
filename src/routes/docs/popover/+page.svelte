<script lang="ts">
	import Popover from '$lib/components/popover/Popover.svelte';
	import PopoverHeader from '$lib/components/popover/PopoverHeader.svelte';
	import PopoverContent from '$lib/components/popover/PopoverContent.svelte';
	import PopoverFooter from '$lib/components/popover/PopoverFooter.svelte';
	import Button from '$lib/components/button/Button.svelte';
	import CodeExample from '$lib/internal/CodeExample.svelte';
	import TableOfContents from '$lib/internal/TableOfContents.svelte';
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

<div class="docs-layout">
	<article class="docs-content">
		<header class="page-header">
			<h1>Popover</h1>
			<p class="lead">
				A click-triggered floating panel for rich content — titles, descriptions, and actions.
				Positioned with <code>@floating-ui/dom</code> and kept in sync via
				<code>autoUpdate</code> while open. Dismisses on outside click or Escape.
			</p>
		</header>

		<section id="examples" class="doc-section">
			<h2>Examples</h2>

			<div id="basic" class="example-block">
				<h3>Basic</h3>
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
			</div>

			<div id="sub-components" class="example-block">
				<h3>Sub-components</h3>
				<p class="example-desc">
					Use <code>PopoverHeader</code>, <code>PopoverContent</code>, and
					<code>PopoverFooter</code> to compose structured panels. Each brings its own padding and
					dividers. <code>PopoverHeader</code> automatically renders a close button when nested
					inside a <code>Popover</code>.
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
			</div>

			<div id="placements" class="example-block">
				<h3>Placements</h3>
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
			</div>

			<div id="controlled" class="example-block">
				<h3>Controlled</h3>
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
			</div>

			<div id="no-arrow" class="example-block">
				<h3>Without Arrow</h3>
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
			</div>

			<div id="persistent" class="example-block">
				<h3>Persistent</h3>
				<p class="example-desc">
					Set <code>closeOnClickOutside={`{false}`}</code> to keep the popover open when the user clicks
					elsewhere. Useful for guided flows or forms where accidental dismissal would be disruptive.
					The close button and Escape key still work.
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
			</div>
		</section>

		<section id="api" class="doc-section">
			<h2>API</h2>
			<div class="api-table">
				<h3>Popover Props</h3>
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
							<td>Bindable open state. Set to <code>true</code> to open programmatically.</td>
						</tr>
						<tr>
							<td><code>placement</code></td>
							<td><code>Placement</code></td>
							<td><code>'bottom'</code></td>
							<td
								>Preferred floating-ui placement. Accepts all 12 values: <code>top</code>,
								<code>bottom</code>, <code>left</code>, <code>right</code>, and their
								<code>-start</code> / <code>-end</code> variants. Flips automatically.</td
							>
						</tr>
						<tr>
							<td><code>showArrow</code></td>
							<td><code>boolean</code></td>
							<td><code>true</code></td>
							<td>Renders the directional arrow connecting the panel to its trigger.</td>
						</tr>
						<tr>
							<td><code>popoverOffset</code></td>
							<td><code>number</code></td>
							<td><code>12</code></td>
							<td>Distance in pixels between the trigger and the floating panel.</td>
						</tr>
						<tr>
							<td><code>closeOnClickOutside</code></td>
							<td><code>boolean</code></td>
							<td><code>true</code></td>
							<td>Closes the popover when the user clicks outside the panel and trigger.</td>
						</tr>
						<tr>
							<td><code>closeOnEscape</code></td>
							<td><code>boolean</code></td>
							<td><code>true</code></td>
							<td>Closes the popover when the Escape key is pressed.</td>
						</tr>
						<tr>
							<td><code>content</code></td>
							<td><code>Snippet</code></td>
							<td>—</td>
							<td
								>Panel content. Renders directly with no padding — use sub-components to add
								structure.</td
							>
						</tr>
						<tr>
							<td><code>children</code></td>
							<td><code>Snippet</code></td>
							<td><code>required</code></td>
							<td>The trigger element(s) that toggle the popover on click.</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="api-table">
				<h3>PopoverHeader Props</h3>
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
							<td><code>showClose</code></td>
							<td><code>boolean</code></td>
							<td><code>true</code></td>
							<td
								>Renders a close button using the popover context. Only has effect when nested
								inside a <code>Popover</code>.</td
							>
						</tr>
						<tr>
							<td><code>children</code></td>
							<td><code>Snippet</code></td>
							<td><code>required</code></td>
							<td>Header title content.</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="api-table">
				<h3>PopoverContent / PopoverFooter Props</h3>
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
							<td><code>children</code></td>
							<td><code>Snippet</code></td>
							<td><code>required</code></td>
							<td
								>Content to render inside the padded section. <code>PopoverFooter</code> is a right-aligned
								flex row with a top divider.</td
							>
						</tr>
					</tbody>
				</table>
			</div>
		</section>

		<section id="css-tokens" class="doc-section">
			<h2>CSS Tokens</h2>
			<p class="example-desc" style="margin-bottom: var(--space-4)">
				All tokens are defined in <code>[data-theme]</code> scope and can be overridden per-theme or locally.
			</p>
			<table class="props-table">
				<thead>
					<tr>
						<th>Token</th>
						<th>Default value</th>
						<th>Description</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td><code>--popover-bg</code></td>
						<td><code>--ui-surface-raised</code></td>
						<td>Panel background color</td>
					</tr>
					<tr>
						<td><code>--popover-color</code></td>
						<td><code>--ui-surface-raised-foreground</code></td>
						<td>Panel text color</td>
					</tr>
					<tr>
						<td><code>--popover-border</code></td>
						<td><code>--ui-border</code></td>
						<td>Border color</td>
					</tr>
					<tr>
						<td><code>--popover-border-width</code></td>
						<td><code>--ui-border-width</code></td>
						<td>Border width</td>
					</tr>
					<tr>
						<td><code>--popover-border-radius</code></td>
						<td><code>--ui-base-radius</code></td>
						<td>Corner radius</td>
					</tr>
					<tr>
						<td><code>--popover-shadow</code></td>
						<td><code>--ui-depth</code></td>
						<td>Drop shadow</td>
					</tr>
					<tr>
						<td><code>--popover-padding</code></td>
						<td><code>--ui-base-spacing × 2</code></td>
						<td>Inner padding</td>
					</tr>
					<tr>
						<td><code>--popover-min-width</code></td>
						<td><code>--ui-base-spacing × 28</code></td>
						<td>Minimum panel width</td>
					</tr>
					<tr>
						<td><code>--popover-max-width</code></td>
						<td><code>--ui-base-spacing × 52</code></td>
						<td>Maximum panel width before text wraps</td>
					</tr>
					<tr>
						<td><code>--popover-z-index</code></td>
						<td><code>--ui-z-overlay</code></td>
						<td>Stacking order</td>
					</tr>
					<tr>
						<td><code>--popover-arrow-size</code></td>
						<td><code>8px</code></td>
						<td>Arrow square dimension</td>
					</tr>
					<tr>
						<td><code>--popover-title-size</code></td>
						<td><code>--ui-text-sm</code></td>
						<td>Header title font size</td>
					</tr>
					<tr>
						<td><code>--popover-title-weight</code></td>
						<td><code>--ui-weight-semibold</code></td>
						<td>Header title font weight</td>
					</tr>
					<tr>
						<td><code>--popover-body-size</code></td>
						<td><code>--ui-text-sm</code></td>
						<td>Body text font size</td>
					</tr>
					<tr>
						<td><code>--popover-close-size</code></td>
						<td><code>--ui-base-spacing × 3</code></td>
						<td>Close button hit area dimension</td>
					</tr>
					<tr>
						<td><code>--popover-duration</code></td>
						<td><code>--ui-base-duration</code></td>
						<td>Enter/leave animation duration</td>
					</tr>
					<tr>
						<td><code>--popover-easing</code></td>
						<td><code>--ui-base-easing</code></td>
						<td>Enter/leave animation easing function</td>
					</tr>
				</tbody>
			</table>
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

	kbd {
		font-family: var(--ui-font-mono);
		font-size: var(--font-size-xs);
		background: color-mix(in oklch, var(--ui-neutral), transparent 80%);
		border: 1px solid var(--ui-border);
		border-radius: calc(var(--ui-base-radius) * 0.375);
		padding: 1px 5px;
	}

	@media (max-width: 1024px) {
		.docs-layout {
			grid-template-columns: 1fr;
		}
	}
</style>
