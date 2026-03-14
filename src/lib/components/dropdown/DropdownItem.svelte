<script lang="ts">
	import './dropdown.css';
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface Props extends HTMLButtonAttributes {
		disabled?: boolean;
		destructive?: boolean;
		selected?: boolean;
		children: Snippet;
		leadingIcon?: Snippet;
		trailingIcon?: Snippet;
	}

	let {
		disabled = false,
		destructive = false,
		selected = false,
		children,
		leadingIcon,
		trailingIcon,
		...restProps
	}: Props = $props();
</script>

<button
	role="menuitem"
	tabindex="-1"
	class="dropdown-item"
	class:dropdown-item--destructive={destructive}
	class:dropdown-item--selected={selected}
	class:dropdown-item--disabled={disabled}
	aria-disabled={disabled}
	{disabled}
	{...restProps}
>
	{#if leadingIcon}
		<span class="dropdown-item__icon">
			{@render leadingIcon()}
		</span>
	{/if}
	<span class="dropdown-item__content">
		{@render children()}
	</span>
	{#if trailingIcon}
		<span class="dropdown-item__trailing">
			{@render trailingIcon()}
		</span>
	{/if}
</button>
