<script lang="ts">
	import { Avatar } from '$lib/components/avatar';
</script>

<section class="section">
	<h2 class="section-title">Avatar</h2>
	<p class="description">
		A visual representation of a user with support for images, initials, and status indicators.
	</p>

	<div class="subsection">
		<h3>Sizes</h3>
		<div class="row">
			<Avatar size="sm" name="John Doe" />
			<Avatar size="md" name="John Doe" />
			<Avatar size="lg" name="John Doe" />
		</div>
	</div>

	<div class="subsection">
		<h3>Content Types</h3>
		<div class="row">
			<Avatar src="https://i.pravatar.cc/150?img=1" alt="User avatar" />
			<Avatar name="Jane Doe" />
			<Avatar />
		</div>
		<p class="row-label">Image, Initials, and Icon fallback</p>
	</div>

	<div class="subsection">
		<h3>Status Indicators</h3>
		<div class="row">
			<Avatar name="Online User" status="online" />
			<Avatar name="Offline User" status="offline" />
			<Avatar name="Away User" status="away" />
			<Avatar name="Busy User" status="busy" />
		</div>
	</div>

	<div class="subsection">
		<h3>Combined Variants</h3>
		<div class="row">
			<Avatar size="lg" src="https://i.pravatar.cc/150?img=5" alt="Active user" status="online" />
			<Avatar size="lg" name="Bob Wilson" status="away" />
			<Avatar size="sm" status="busy" />
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
		margin-bottom: var(--space-3);
	}

	.row:last-child {
		margin-bottom: 0;
	}

	.row-label {
		margin: var(--space-2) 0 0 0;
		font-size: var(--font-size-sm);
		color: var(--section-label);
	}
</style>
