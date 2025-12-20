<script lang="ts">
	import { Tooltip } from '$lib/components/tooltip';
	import { Avatar } from '$lib/components/avatar';
	import Button from '$lib/components/button/Button.svelte';
</script>

<section class="section">
	<h2 class="section-title">Tooltip</h2>
	<p class="description">
		A small popup that displays additional information when hovering or focusing on an element.
	</p>

	<div class="subsection">
		<h3>Placements</h3>
		<div class="row">
			<Tooltip content="Tooltip on top" placement="top">
				<Button variant="outline" color="secondary" size="sm">Top</Button>
			</Tooltip>
			<Tooltip content="Tooltip on bottom" placement="bottom">
				<Button variant="outline" color="secondary" size="sm">Bottom</Button>
			</Tooltip>
			<Tooltip content="Tooltip on left" placement="left">
				<Button variant="outline" color="secondary" size="sm">Left</Button>
			</Tooltip>
			<Tooltip content="Tooltip on right" placement="right">
				<Button variant="outline" color="secondary" size="sm">Right</Button>
			</Tooltip>
		</div>
	</div>

	<div class="subsection">
		<h3>Without Arrow</h3>
		<div class="row">
			<Tooltip content="No arrow tooltip" showArrow={false}>
				<Button variant="outline" color="secondary" size="sm">Hover me</Button>
			</Tooltip>
		</div>
	</div>

	<div class="subsection">
		<h3>With Different Content</h3>
		<div class="row">
			<Tooltip content="Click to save your changes">
				<Button size="sm">Save</Button>
			</Tooltip>
			<Tooltip content="View user profile">
				<Avatar name="Jane Doe" />
			</Tooltip>
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

	.row {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-3);
	}
</style>
