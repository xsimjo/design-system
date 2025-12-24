<script lang="ts">
	import Input from '$lib/components/input/Input.svelte';
	import SearchIcon from '$lib/icons/SearchIcon.svelte';
	import MailIcon from '$lib/icons/MailIcon.svelte';

	let inputValue = $state('');
</script>

<section class="section">
	<h2 class="section-title">Input</h2>
	<p class="description">
		A text input field for collecting user data, with support for labels, icons, and validation
		states.
	</p>

	<div class="subsection">
		<h3>Basic</h3>
		<div class="column">
			<Input placeholder="Enter text..." />
			<Input label="Email" type="email" placeholder="you@example.com" />
		</div>
	</div>

	<div class="subsection">
		<h3>Sizes</h3>
		<div class="column">
			<Input size="sm" placeholder="Small input" />
			<Input size="md" placeholder="Medium input" />
			<Input size="lg" placeholder="Large input" />
		</div>
	</div>

	<div class="subsection">
		<h3>With Labels & Helper Text</h3>
		<div class="column">
			<Input label="Username" placeholder="Enter username" helperText="Choose a unique username" />
			<Input
				label="Password"
				type="password"
				placeholder="Enter password"
				helperText="Must be at least 8 characters"
			/>
		</div>
	</div>

	<div class="subsection">
		<h3>With Icons</h3>
		<div class="column">
			<Input placeholder="Search...">
				{#snippet iconLeft()}
					<SearchIcon size="100%" />
				{/snippet}
			</Input>
			<Input label="Email" type="email" placeholder="you@example.com">
				{#snippet iconLeft()}
					<MailIcon size="100%" />
				{/snippet}
			</Input>
		</div>
	</div>

	<div class="subsection">
		<h3>States</h3>
		<div class="column">
			<Input label="Default" placeholder="Default state" />
			<Input label="Disabled" placeholder="Cannot edit" disabled />
			<Input label="Readonly" value="Read-only value" readonly />
			<Input label="Error" placeholder="Invalid input" error helperText="This field is required" />
			<Input
				label="Success"
				value="valid@email.com"
				success
				helperText="Email address is available"
			/>
		</div>
	</div>

	<div class="subsection">
		<h3>Interactive Example</h3>
		<div class="column">
			<Input bind:value={inputValue} label="Type something" placeholder="Start typing..." />
			<p class="status">Current value: <strong>{inputValue || '(empty)'}</strong></p>
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

	.column {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
		max-width: 400px;
	}

	.status {
		margin: 0;
		font-size: var(--font-size-sm);
		color: var(--section-description);
	}

	.status strong {
		color: var(--section-title);
	}
</style>
