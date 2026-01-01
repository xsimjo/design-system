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
		padding: var(--space-4);
		padding-left: var(--space-6);
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}

	.group {
		display: flex;
		flex-direction: column;
	}

	.group-header {
		margin-bottom: var(--space-2);
		color: color-mix(in oklch, var(--ui-surface-foreground), transparent 60%);
		font-size: var(--ui-text-sm);
		font-family: var(--ui-font-sans);
		font-weight: var(--ui-weight-bold);
	}

	.group-items {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
	}

	.nav-item {
		display: flex;
		align-items: center;
		height: 32px;
		background: transparent;
		color: var(--ui-surface-foreground);
		font-size: var(--ui-text-sm);
		font-weight: var(--ui-weight-medium);
		font-family: var(--ui-font-sans);
		text-decoration: none;
		transition: color var(--ui-duration) cubic-bezier(0.4, 0, 0.2, 1);
	}

	.nav-item:hover {
		color: var(--ui-primary);
	}
</style>
