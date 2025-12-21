<script lang="ts">
	import Typography from '$lib/components/typography/Typography.svelte';
</script>

<section class="section">
	<h2 class="section-title">Typography</h2>
	<p class="description">
		A flexible text component for consistent typography across the design system.
	</p>

	<div class="subsection">
		<h3>Headings</h3>
		<div class="stack">
			<Typography variant="h1">Heading 1</Typography>
			<Typography variant="h2">Heading 2</Typography>
			<Typography variant="h3">Heading 3</Typography>
			<Typography variant="h4">Heading 4</Typography>
			<Typography variant="h5">Heading 5</Typography>
			<Typography variant="h6">Heading 6</Typography>
		</div>
	</div>

	<div class="subsection">
		<h3>Headings (No Margin)</h3>
		<div class="row row--wrap">
			<Typography variant="h1" noMargin>H1</Typography>
			<Typography variant="h2" noMargin>H2</Typography>
			<Typography variant="h3" noMargin>H3</Typography>
			<Typography variant="h4" noMargin>H4</Typography>
			<Typography variant="h5" noMargin>H5</Typography>
			<Typography variant="h6" noMargin>H6</Typography>
		</div>
	</div>

	<div class="subsection">
		<h3>Body Text</h3>
		<div class="stack">
			<Typography variant="body-lg">
				Body Large: The quick brown fox jumps over the lazy dog. This text is designed for
				introductory paragraphs and emphasized content.
			</Typography>
			<Typography variant="body-md">
				Body Medium: The quick brown fox jumps over the lazy dog. This is the default body text
				size, suitable for most content.
			</Typography>
			<Typography variant="body-sm">
				Body Small: The quick brown fox jumps over the lazy dog. Used for supplementary information
				or dense content areas.
			</Typography>
		</div>
	</div>

	<div class="subsection">
		<h3>Labels</h3>
		<div class="row row--align-center">
			<Typography variant="label-lg">Label Large</Typography>
			<Typography variant="label-md">Label Medium</Typography>
			<Typography variant="label-sm">Label Small</Typography>
		</div>
	</div>

	<div class="subsection">
		<h3>Special Variants</h3>
		<div class="stack">
			<div>
				<Typography variant="overline">Overline Text</Typography>
			</div>
			<div>
				<Typography variant="caption">
					Caption: Additional information or metadata displayed in a smaller, muted style.
				</Typography>
			</div>
			<div>
				<Typography variant="body-md">
					Inline code example: Use the <Typography variant="code">npm install</Typography> command to
					install dependencies.
				</Typography>
			</div>
			<div>
				<Typography variant="link" href="https://svelte.dev">Visit Svelte Documentation</Typography>
			</div>
		</div>
	</div>

	<div class="subsection">
		<h3>Text Alignment</h3>
		<div class="stack">
			<Typography variant="body-md" align="left">Left aligned text (default)</Typography>
			<Typography variant="body-md" align="center">Center aligned text</Typography>
			<Typography variant="body-md" align="right">Right aligned text</Typography>
			<Typography variant="body-md" align="justify">
				Justified text spans the full width. The quick brown fox jumps over the lazy dog. This
				demonstrates how justified text distributes space evenly between words.
			</Typography>
		</div>
	</div>

	<div class="subsection">
		<h3>Element Override</h3>
		<div class="stack">
			<Typography variant="h2" as="p" noMargin>Styled as H2, rendered as paragraph</Typography>
			<Typography variant="body-md" as="span">Styled as body-md, rendered as span</Typography>
		</div>
	</div>
</section>

<style>
	.section {
		padding: var(--space-6) 0;
		border-bottom: 1px solid var(--card-border);
	}

	.section-title {
		margin: 0 0 var(--space-2) 0;
		font-size: var(--font-size-2xl);
		font-weight: var(--font-weight-bold);
		color: var(--section-title);
	}

	.description {
		margin: 0 0 var(--space-6) 0;
		color: var(--section-description);
	}

	.subsection {
		margin-bottom: var(--space-6);
	}

	.subsection:last-child {
		margin-bottom: 0;
	}

	.subsection h3 {
		margin: 0 0 var(--space-3) 0;
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		color: var(--section-label);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.stack {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.row {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-3);
		margin-bottom: var(--space-3);
	}

	.row:last-child {
		margin-bottom: 0;
	}

	.row--align-center {
		align-items: center;
	}

	.row--wrap {
		align-items: baseline;
	}
</style>
