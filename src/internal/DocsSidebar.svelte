<script lang="ts">
	import { page } from '$app/stores';
	import SideNav from '$lib/components/side-nav/SideNav.svelte';
	import SideNavItem from '$lib/components/side-nav/SideNavItem.svelte';
	import SideNavLabel from '$lib/components/side-nav/SideNavLabel.svelte';

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
		onclose?: () => void;
	}

	let { groups, onclose }: Props = $props();

	const pathname = $derived($page.url.pathname);
</script>

<SideNav>
	{#each groups as group, i (group.title)}
		<SideNavLabel style={i > 0 ? 'margin-top: calc(var(--ui-base-spacing) * 3)' : undefined}>
			{group.title}
		</SideNavLabel>
		{#each group.items as item (item.href)}
			<SideNavItem href={item.href} isActive={pathname === item.href} onclick={() => onclose?.()}>
				{item.label}
			</SideNavItem>
		{/each}
	{/each}
</SideNav>
