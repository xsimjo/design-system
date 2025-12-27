<script lang="ts">
	type NavItem = {
		label: string;
		href: string;
	};

	type NavGroup = {
		title: string;
		items: NavItem[];
	};

	interface Props {
		groups: NavGroup[];
	}

	let { groups }: Props = $props();
</script>

<nav class="sidebar">
	{#each groups as group (group.title)}
		<div class="group">
			<div class="group-header">{group.title}</div>

			<ul class="group-items">
				{#each group.items as item (item.href)}
					<li>
						<a href={item.href} class="nav-item">
							{item.label}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	{/each}
</nav>

<style>
	.sidebar {
		width: 260px;
		padding: var(--spacing-md);
		padding-left: var(--space-6);
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
	}

	.group {
		display: flex;
		flex-direction: column;
	}

	.group-header {
		padding: 0 var(--spacing-sm);
		margin-bottom: var(--spacing-sm);
		color: color-mix(in oklch, var(--color-text-muted) 70%, transparent);
		font-size: var(--font-size-sm);
		font-family: var(--font-sans);
		font-weight: var(--font-weight-bold);
	}

	.group-items {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
	}

	.nav-item {
		display: flex;
		align-items: center;
		height: var(--field-height-sm);
		padding: 0 var(--spacing-sm);
		background: transparent;
		border-radius: var(--radius-button);
		color: var(--color-text);
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
		font-family: var(--font-sans);
		text-decoration: none;
		transition: background-color var(--transition-fast);
	}

	.nav-item:hover {
		background-color: color-mix(in oklch, var(--color-primary) 15%, transparent);
	}
</style>
