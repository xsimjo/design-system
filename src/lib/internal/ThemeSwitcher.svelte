<script lang="ts">
	import { onMount } from 'svelte';
	import Dropdown from '$lib/components/dropdown/Dropdown.svelte';
	import DropdownItem from '$lib/components/dropdown/DropdownItem.svelte';
	import Button from '$lib/components/button/Button.svelte';
	import SunIcon from '$lib/icons/SunIcon.svelte';
	import MoonIcon from '$lib/icons/MoonIcon.svelte';
	import CodeIcon from '$lib/icons/CodeIcon.svelte';
	import ClipboardListIcon from '$lib/icons/ClipboardListIcon.svelte';
	import CheckIcon from '$lib/icons/CheckIcon.svelte';
	import type { Component } from 'svelte';

	interface ThemeConfig {
		id: string;
		label: string;
		icon: Component<{ size?: number | string }>;
	}

	const themes: ThemeConfig[] = [
		{ id: 'light', label: 'Light', icon: SunIcon },
		{ id: 'dark', label: 'Dark', icon: MoonIcon },
		{ id: 'dev', label: 'Developer', icon: CodeIcon },
		{ id: 'formbuilder', label: 'Form Builder', icon: ClipboardListIcon }
	];

	let currentTheme = $state('light');

	onMount(() => {
		const stored = document.documentElement.getAttribute('data-theme');
		if (stored) {
			currentTheme = stored;
		}
	});

	function setTheme(themeId: string) {
		currentTheme = themeId;
		document.documentElement.setAttribute('data-theme', themeId);
	}

	const currentThemeConfig = $derived(themes.find((t) => t.id === currentTheme) || themes[0]);
</script>

<Dropdown placement="bottom-end">
	{#snippet trigger()}
		<Button variant="ghost" color="secondary" size="sm" isIcon>
			<currentThemeConfig.icon size={18} />
		</Button>
	{/snippet}
	{#each themes as theme (theme.id)}
		<DropdownItem selected={currentTheme === theme.id} onclick={() => setTheme(theme.id)}>
			{#snippet leadingIcon()}
				<theme.icon size={16} />
			{/snippet}
			{theme.label}
			{#snippet trailingIcon()}
				{#if currentTheme === theme.id}
					<CheckIcon size={16} />
				{/if}
			{/snippet}
		</DropdownItem>
	{/each}
</Dropdown>
