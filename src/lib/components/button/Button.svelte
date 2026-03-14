<script lang="ts">
	import './button.css';
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes, HTMLAnchorAttributes } from 'svelte/elements';
	import Spinner from '$lib/components/spinner/Spinner.svelte';

	type BaseProps = {
		variant?: 'filled' | 'outline' | 'ghost' | 'soft' | 'link' | 'dash';
		color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'neutral';
		size?: 'sm' | 'md' | 'lg';
		icon?: boolean;
		active?: boolean;
		loading?: boolean;
		fullWidth?: boolean;
		disabled?: boolean;
		children: Snippet;
	};

	type Props = BaseProps &
		Omit<HTMLButtonAttributes, keyof BaseProps> & {
			href?: string;
		};

	let {
		variant = 'filled',
		color = 'primary',
		size = 'md',
		icon = false,
		active = false,
		loading = false,
		fullWidth = false,
		disabled = false,
		href,
		children,
		...restProps
	}: Props = $props();

	const isDisabled = $derived(disabled || loading);
</script>

{#if href}
	<a
		{href}
		class="button button--{variant} button--{color} button--{size}"
		class:button--icon={icon}
		class:button--active={active}
		class:button--loading={loading}
		class:button--full-width={fullWidth}
		aria-disabled={isDisabled || undefined}
		{...restProps as HTMLAnchorAttributes}
	>
		{#if loading}
			<span class="button__loader">
				<Spinner />
			</span>
		{/if}
		<span class="button__content" class:button__content--hidden={loading && icon}>
			{@render children()}
		</span>
	</a>
{:else}
	<button
		class="button button--{variant} button--{color} button--{size}"
		class:button--icon={icon}
		class:button--active={active}
		class:button--loading={loading}
		class:button--full-width={fullWidth}
		disabled={isDisabled}
		{...restProps}
	>
		{#if loading}
			<span class="button__loader">
				<Spinner />
			</span>
		{/if}
		<span class="button__content" class:button__content--hidden={loading && icon}>
			{@render children()}
		</span>
	</button>
{/if}
