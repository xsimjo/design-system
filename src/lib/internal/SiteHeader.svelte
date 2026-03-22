<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import Header from '$lib/internal/Header.svelte';
	import Tooltip from '$lib/internal/Tooltip.svelte';
	import ThemeSwitcher from '$lib/internal/ThemeSwitcher.svelte';
	import Button from '$lib/components/button/Button.svelte';
	import GithubIcon from '$lib/icons/GithubIcon.svelte';
	import PaletteIcon from '$lib/icons/PaletteIcon.svelte';

	interface Props extends HTMLAttributes<HTMLElement> {
		hamburger?: Snippet;
	}

	let { hamburger, ...restProps }: Props = $props();
</script>

<Header sticky maxWidth="1500px" {hamburger} {...restProps}>
	{#snippet logo()}
		<a href="/" class="logo-link">
			<PaletteIcon size={28} />
			<span class="header-title">Greenfield</span>
			<span class="header-subtitle">UI</span>
		</a>
	{/snippet}
	{#snippet nav()}
		<a href="/docs"><Button variant="ghost" color="secondary" size="sm">Documentation</Button></a>
		<a href="/showcase"><Button variant="ghost" color="secondary" size="sm">Showcase</Button></a>
	{/snippet}
	{#snippet actions()}
		<Tooltip text="View on GitHub" position="bottom">
			<Button
				variant="ghost"
				color="secondary"
				size="sm"
				isIcon
				onclick={() => window.open('https://github.com', '_blank')}
			>
				<GithubIcon size={18} />
			</Button>
		</Tooltip>
		<ThemeSwitcher />
		<Button variant="outline" color="secondary" size="sm">v0.0.22</Button>
	{/snippet}
</Header>

<style>
	.logo-link {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		color: var(--ui-surface-foreground);
		text-decoration: none;
	}

	.header-title {
		font-size: var(--ui-text-xl);
		font-weight: var(--ui-weight-bold);
		color: var(--ui-surface-foreground);
		letter-spacing: -0.02em;
	}

	.header-subtitle {
		font-size: var(--ui-text-xl);
		font-weight: var(--ui-weight-normal);
		color: var(--ui-primary);
		letter-spacing: -0.02em;
	}
</style>
