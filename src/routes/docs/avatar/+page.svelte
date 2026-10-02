<script lang="ts">
	import Avatar from '$lib/components/avatar/Avatar.svelte';
	import CodeExample from '$internal/CodeExample.svelte';
	import TableOfContents from '$internal/TableOfContents.svelte';
	import DocsPage from '$internal/DocsPage.svelte';
	import PageHeader from '$internal/PageHeader.svelte';
	import DocSection from '$internal/DocSection.svelte';
	import ExampleBlock from '$internal/ExampleBlock.svelte';
	import PropsTable from '$internal/PropsTable.svelte';
	import TokenTable from '$internal/TokenTable.svelte';

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

<DocsPage>
	<PageHeader
		title="Avatar"
		description="Displays a user's profile image, initials, or a fallback icon. Supports multiple sizes, shapes, color variants, and an optional status indicator."
	/>

	<DocSection id="examples" title="Examples">
		<ExampleBlock id="sizes" title="Sizes">
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
		</ExampleBlock>

		<ExampleBlock id="shapes" title="Shapes">
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
		</ExampleBlock>

		<ExampleBlock id="initials" title="Initials">
			<p class="example-desc">
				Provide an <code>initials</code> string — up to two characters are displayed. When omitted a fallback
				icon is shown instead.
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
		</ExampleBlock>

		<ExampleBlock id="colors" title="Colors">
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
		</ExampleBlock>

		<ExampleBlock id="status" title="Status">
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
		</ExampleBlock>

		<ExampleBlock id="image" title="Image">
			<p class="example-desc">
				Provide <code>src</code> and <code>alt</code> to display a photo. If the image fails to
				load, the component falls back to <code>initials</code> (if provided) or the default icon.
			</p>
			<CodeExample
				code={`<Avatar src="https://i.pravatar.cc/150?img=1" alt="Alice" size="lg" />
<Avatar src="https://i.pravatar.cc/150?img=5" alt="Bob" size="lg" status="online" />
<Avatar src="https://example.invalid/broken.jpg" alt="Fallback" initials="FB" size="lg" />`}
				previewClass="row"
			>
				<Avatar src="https://i.pravatar.cc/150?img=1" alt="Alice" size="lg" />
				<Avatar src="https://i.pravatar.cc/150?img=5" alt="Bob" size="lg" status="online" />
				<Avatar src="https://example.invalid/broken.jpg" alt="Fallback" initials="FB" size="lg" />
			</CodeExample>
		</ExampleBlock>
	</DocSection>

	<DocSection id="api" title="API">
		<PropsTable
			title="Avatar Props"
			columns={['Prop', 'Type', 'Default', 'Description']}
			rows={[
				['src', 'string', 'undefined', 'Image source URL'],
				['alt', 'string', "''", 'Alt text for the image element'],
				[
					'initials',
					'string',
					'undefined',
					'Text to show when no image is available; truncated to 2 characters'
				],
				['size', "'sm' | 'md' | 'lg' | 'xl'", "'md'", 'Avatar size'],
				['shape', "'circle' | 'square'", "'circle'", 'Border radius shape'],
				[
					'color',
					"'primary' | 'secondary' | 'neutral'",
					"'neutral'",
					'Background color for initials and icon fallback'
				],
				[
					'status',
					"'online' | 'offline' | 'away' | 'busy'",
					'undefined',
					'Shows a status indicator dot'
				]
			]}
		/>
		<p class="api-note">
			All standard <code>HTMLSpanElement</code> attributes are forwarded to the root element.
		</p>
	</DocSection>

	<DocSection id="css-tokens" title="CSS Tokens">
		<TokenTable
			component="avatar"
			tokens={[
				['--avatar-size-sm', 'Width and height for sm'],
				['--avatar-size-md', 'Width and height for md'],
				['--avatar-size-lg', 'Width and height for lg'],
				['--avatar-size-xl', 'Width and height for xl'],
				['--avatar-font-size-sm', 'Initials font size for sm'],
				['--avatar-font-size-md', 'Initials font size for md'],
				['--avatar-font-size-lg', 'Initials font size for lg'],
				['--avatar-font-size-xl', 'Initials font size for xl'],
				['--avatar-radius-circle', 'Border radius for circle shape'],
				['--avatar-radius-square', 'Border radius for square shape'],
				['--avatar-bg-primary', 'Background for primary color variant'],
				['--avatar-fg-primary', 'Foreground for primary color variant'],
				['--avatar-bg-secondary', 'Background for secondary color variant'],
				['--avatar-fg-secondary', 'Foreground for secondary color variant'],
				['--avatar-bg-neutral', 'Background for neutral color variant'],
				['--avatar-fg-neutral', 'Foreground for neutral color variant'],
				['--avatar-border-width', 'Border width'],
				['--avatar-border-color', 'Border color'],
				['--avatar-status-size', 'Status dot diameter'],
				['--avatar-status-border-width', 'Status dot border width'],
				[
					'--avatar-status-border-color',
					'Status dot border color (matches background for separation)'
				],
				['--avatar-status-online', 'Online status dot color'],
				['--avatar-status-offline', 'Offline status dot color'],
				['--avatar-status-away', 'Away status dot color'],
				['--avatar-status-busy', 'Busy status dot color']
			]}
		/>
	</DocSection>

	{#snippet sidebar()}
		<TableOfContents sections={tocSections} />
	{/snippet}
</DocsPage>
