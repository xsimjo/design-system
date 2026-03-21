<script lang="ts">
	import './button.css';
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import Spinner from '$lib/components/spinner/Spinner.svelte';

	interface Props extends Omit<HTMLButtonAttributes, 'children'> {
		variant?: 'filled' | 'outline' | 'ghost' | 'soft' | 'link' | 'dash';
		color?:
			| 'primary'
			| 'secondary'
			| 'accent'
			| 'success'
			| 'danger'
			| 'warning'
			| 'info'
			| 'neutral';
		size?: 'sm' | 'md' | 'lg';
		isIcon?: boolean;
		isLoading?: boolean;
		fullWidth?: boolean;
		children: Snippet;
	}

	let {
		variant = 'filled',
		color = 'primary',
		size = 'md',
		isIcon = false,
		isLoading = false,
		fullWidth = false,
		disabled = false,
		children,
		...restProps
	}: Props = $props();

	const isDisabled = $derived(disabled || isLoading);
</script>

<button
	class="button button--{variant} button--{color} button--{size}"
	class:button--icon={isIcon}
	class:button--loading={isLoading}
	class:button--full-width={fullWidth}
	disabled={isDisabled}
	{...restProps}
>
	{#if isLoading}
		<span class="button__loader">
			<Spinner />
		</span>
	{/if}
	<span class="button__content" class:button__content--hidden={isLoading && isIcon}>
		{@render children()}
	</span>
</button>
