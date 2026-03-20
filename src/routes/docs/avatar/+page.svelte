<script lang="ts">
	import Avatar from '$lib/components/avatar/Avatar.svelte';
	import CodeExample from '$lib/internal/CodeExample.svelte';
	import TableOfContents from '$lib/internal/TableOfContents.svelte';

	const tocSections = [
		{ id: 'examples', label: 'Examples' },
		{ id: 'sizes', label: 'Sizes', indent: true },
		{ id: 'shapes', label: 'Shapes', indent: true },
		{ id: 'initials', label: 'Initials', indent: true },
		{ id: 'colors', label: 'Colors', indent: true },
		{ id: 'status', label: 'Status', indent: true },
		{ id: 'image', label: 'Image', indent: true },
		{ id: 'api', label: 'API' },
		{ id: 'css-tokens', label: 'CSS Tokens' }
	];
</script>

<svelte:head>
	<title>Avatar - Greenfield UI</title>
</svelte:head>

<div class="docs-layout">
	<article class="docs-content">
		<header class="page-header">
			<h1>Avatar</h1>
			<p class="lead">
				Displays a user's profile image, initials, or a fallback icon. Supports multiple sizes,
				shapes, color variants, and an optional status indicator.
			</p>
		</header>

		<section id="examples" class="doc-section">
			<h2>Examples</h2>

			<div id="sizes" class="example-block">
				<h3>Sizes</h3>
				<p class="example-desc">
					Four sizes: <code>sm</code>, <code>md</code> (default), <code>lg</code>, and
					<code>xl</code>.
				</p>
				<CodeExample
					code={`<Avatar size="sm" initials="AB" />
<Avatar size="md" initials="AB" />
<Avatar size="lg" initials="AB" />
<Avatar size="xl" initials="AB" />`}
					previewClass="row"
				>
					<Avatar size="sm" initials="AB" />
					<Avatar size="md" initials="AB" />
					<Avatar size="lg" initials="AB" />
					<Avatar size="xl" initials="AB" />
				</CodeExample>
			</div>

			<div id="shapes" class="example-block">
				<h3>Shapes</h3>
				<p class="example-desc">
					Use <code>shape="circle"</code> (default) or <code>shape="square"</code>.
				</p>
				<CodeExample
					code={`<Avatar shape="circle" initials="JD" size="lg" />
<Avatar shape="square" initials="JD" size="lg" />`}
					previewClass="row"
				>
					<Avatar shape="circle" initials="JD" size="lg" />
					<Avatar shape="square" initials="JD" size="lg" />
				</CodeExample>
			</div>

			<div id="initials" class="example-block">
				<h3>Initials</h3>
				<p class="example-desc">
					Provide an <code>initials</code> string — up to two characters are displayed. When omitted a
					fallback icon is shown instead.
				</p>
				<CodeExample
					code={`<Avatar initials="A" size="lg" />
<Avatar initials="JD" size="lg" />
<Avatar initials="John Doe" size="lg" />
<Avatar size="lg" />`}
					previewClass="row"
				>
					<Avatar initials="A" size="lg" />
					<Avatar initials="JD" size="lg" />
					<Avatar initials="John Doe" size="lg" />
					<Avatar size="lg" />
				</CodeExample>
			</div>

			<div id="colors" class="example-block">
				<h3>Colors</h3>
				<p class="example-desc">
					The <code>color</code> prop sets the background color for initials and icon fallbacks:
					<code>neutral</code> (default), <code>primary</code>, or <code>secondary</code>.
				</p>
				<CodeExample
					code={`<Avatar color="neutral" initials="JD" size="lg" />
<Avatar color="primary" initials="JD" size="lg" />
<Avatar color="secondary" initials="JD" size="lg" />`}
					previewClass="row"
				>
					<Avatar color="neutral" initials="JD" size="lg" />
					<Avatar color="primary" initials="JD" size="lg" />
					<Avatar color="secondary" initials="JD" size="lg" />
				</CodeExample>
			</div>

			<div id="status" class="example-block">
				<h3>Status</h3>
				<p class="example-desc">
					Add a status dot with the <code>status</code> prop: <code>online</code>,
					<code>offline</code>, <code>away</code>, or <code>busy</code>.
				</p>
				<CodeExample
					code={`<Avatar initials="JD" size="lg" status="online" />
<Avatar initials="JD" size="lg" status="away" />
<Avatar initials="JD" size="lg" status="busy" />
<Avatar initials="JD" size="lg" status="offline" />`}
					previewClass="row"
				>
					<Avatar initials="JD" size="lg" status="online" />
					<Avatar initials="JD" size="lg" status="away" />
					<Avatar initials="JD" size="lg" status="busy" />
					<Avatar initials="JD" size="lg" status="offline" />
				</CodeExample>
			</div>

			<div id="image" class="example-block">
				<h3>Image</h3>
				<p class="example-desc">
					Provide <code>src</code> and <code>alt</code> to display a photo. If the image fails to
					load, the component falls back to <code>initials</code> (if provided) or the default icon.
				</p>
				<CodeExample
					code={`<Avatar src="https://i.pravatar.cc/150?img=1" alt="Alice" size="lg" />
<Avatar src="https://i.pravatar.cc/150?img=5" alt="Bob" size="lg" status="online" />
<Avatar src="/broken-url.jpg" alt="Fallback" initials="FB" size="lg" />`}
					previewClass="row"
				>
					<Avatar src="https://i.pravatar.cc/150?img=1" alt="Alice" size="lg" />
					<Avatar src="https://i.pravatar.cc/150?img=5" alt="Bob" size="lg" status="online" />
					<Avatar src="/broken-url.jpg" alt="Fallback" initials="FB" size="lg" />
				</CodeExample>
			</div>
		</section>

		<section id="api" class="doc-section">
			<h2>API</h2>
			<div class="api-table">
				<h3>Avatar Props</h3>
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
							<td><code>src</code></td>
							<td><code>string</code></td>
							<td><code>undefined</code></td>
							<td>Image source URL</td>
						</tr>
						<tr>
							<td><code>alt</code></td>
							<td><code>string</code></td>
							<td><code>''</code></td>
							<td>Alt text for the image element</td>
						</tr>
						<tr>
							<td><code>initials</code></td>
							<td><code>string</code></td>
							<td><code>undefined</code></td>
							<td>Text to show when no image is available; truncated to 2 characters</td>
						</tr>
						<tr>
							<td><code>size</code></td>
							<td><code>'sm' | 'md' | 'lg' | 'xl'</code></td>
							<td><code>'md'</code></td>
							<td>Avatar size</td>
						</tr>
						<tr>
							<td><code>shape</code></td>
							<td><code>'circle' | 'square'</code></td>
							<td><code>'circle'</code></td>
							<td>Border radius shape</td>
						</tr>
						<tr>
							<td><code>color</code></td>
							<td><code>'primary' | 'secondary' | 'neutral'</code></td>
							<td><code>'neutral'</code></td>
							<td>Background color for initials and icon fallback</td>
						</tr>
						<tr>
							<td><code>status</code></td>
							<td><code>'online' | 'offline' | 'away' | 'busy'</code></td>
							<td><code>undefined</code></td>
							<td>Shows a status indicator dot</td>
						</tr>
					</tbody>
				</table>
			</div>
			<p class="api-note">
				All standard <code>HTMLSpanElement</code> attributes are forwarded to the root element.
			</p>
		</section>

		<section id="css-tokens" class="doc-section">
			<h2>CSS Tokens</h2>
			<div class="api-table">
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
							<td><code>--avatar-size-sm</code></td>
							<td><code>calc(var(--ui-base-spacing) * 3)</code></td>
							<td>Width and height for sm</td>
						</tr>
						<tr>
							<td><code>--avatar-size-md</code></td>
							<td><code>calc(var(--ui-base-spacing) * 4)</code></td>
							<td>Width and height for md</td>
						</tr>
						<tr>
							<td><code>--avatar-size-lg</code></td>
							<td><code>calc(var(--ui-base-spacing) * 6)</code></td>
							<td>Width and height for lg</td>
						</tr>
						<tr>
							<td><code>--avatar-size-xl</code></td>
							<td><code>calc(var(--ui-base-spacing) * 8)</code></td>
							<td>Width and height for xl</td>
						</tr>
						<tr>
							<td><code>--avatar-font-size-sm</code></td>
							<td><code>var(--ui-text-xs)</code></td>
							<td>Initials font size for sm</td>
						</tr>
						<tr>
							<td><code>--avatar-font-size-md</code></td>
							<td><code>var(--ui-text-sm)</code></td>
							<td>Initials font size for md</td>
						</tr>
						<tr>
							<td><code>--avatar-font-size-lg</code></td>
							<td><code>var(--ui-text-base)</code></td>
							<td>Initials font size for lg</td>
						</tr>
						<tr>
							<td><code>--avatar-font-size-xl</code></td>
							<td><code>var(--ui-text-lg)</code></td>
							<td>Initials font size for xl</td>
						</tr>
						<tr>
							<td><code>--avatar-radius-circle</code></td>
							<td><code>9999px</code></td>
							<td>Border radius for circle shape</td>
						</tr>
						<tr>
							<td><code>--avatar-radius-square</code></td>
							<td><code>var(--ui-base-radius)</code></td>
							<td>Border radius for square shape</td>
						</tr>
						<tr>
							<td><code>--avatar-bg-primary</code></td>
							<td><code>var(--ui-primary)</code></td>
							<td>Background for primary color variant</td>
						</tr>
						<tr>
							<td><code>--avatar-fg-primary</code></td>
							<td><code>var(--ui-primary-foreground)</code></td>
							<td>Foreground for primary color variant</td>
						</tr>
						<tr>
							<td><code>--avatar-bg-secondary</code></td>
							<td><code>var(--ui-secondary)</code></td>
							<td>Background for secondary color variant</td>
						</tr>
						<tr>
							<td><code>--avatar-fg-secondary</code></td>
							<td><code>var(--ui-secondary-foreground)</code></td>
							<td>Foreground for secondary color variant</td>
						</tr>
						<tr>
							<td><code>--avatar-bg-neutral</code></td>
							<td><code>color-mix(in oklch, var(--ui-neutral), transparent 70%)</code></td>
							<td>Background for neutral color variant</td>
						</tr>
						<tr>
							<td><code>--avatar-fg-neutral</code></td>
							<td><code>var(--ui-surface-foreground)</code></td>
							<td>Foreground for neutral color variant</td>
						</tr>
						<tr>
							<td><code>--avatar-border-width</code></td>
							<td><code>var(--ui-border-width)</code></td>
							<td>Border width</td>
						</tr>
						<tr>
							<td><code>--avatar-border-color</code></td>
							<td><code>var(--ui-border)</code></td>
							<td>Border color</td>
						</tr>
						<tr>
							<td><code>--avatar-status-size</code></td>
							<td><code>calc(var(--ui-base-spacing) * 1.5)</code></td>
							<td>Status dot diameter</td>
						</tr>
						<tr>
							<td><code>--avatar-status-border-width</code></td>
							<td><code>calc(var(--ui-border-width) * 2)</code></td>
							<td>Status dot border width</td>
						</tr>
						<tr>
							<td><code>--avatar-status-border-color</code></td>
							<td><code>var(--ui-surface)</code></td>
							<td>Status dot border color (matches background for separation)</td>
						</tr>
						<tr>
							<td><code>--avatar-status-online</code></td>
							<td><code>var(--ui-success)</code></td>
							<td>Online status dot color</td>
						</tr>
						<tr>
							<td><code>--avatar-status-offline</code></td>
							<td><code>color-mix(in oklch, var(--ui-neutral), transparent 40%)</code></td>
							<td>Offline status dot color</td>
						</tr>
						<tr>
							<td><code>--avatar-status-away</code></td>
							<td><code>var(--ui-warning)</code></td>
							<td>Away status dot color</td>
						</tr>
						<tr>
							<td><code>--avatar-status-busy</code></td>
							<td><code>var(--ui-danger)</code></td>
							<td>Busy status dot color</td>
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

	.api-note {
		font-size: var(--ui-text-sm);
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 40%);
		margin: 0;
	}

	.api-note code {
		font-family: var(--ui-font-mono);
		font-size: var(--font-size-xs);
		background: color-mix(in oklch, var(--ui-neutral), transparent 85%);
		padding: 2px 6px;
		border-radius: calc(var(--ui-base-radius) * 0.5);
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
