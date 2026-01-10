<script lang="ts">
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

<style>
	.dropdown-item {
		all: unset;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		gap: var(--dropdown-item-gap);
		width: 100%;
		min-height: var(--dropdown-item-height);
		padding: var(--dropdown-item-padding-y) var(--dropdown-item-padding-x);
		font-family: var(--ui-font-sans);
		font-size: var(--dropdown-item-font-size);
		font-weight: var(--dropdown-item-font-weight);
		color: var(--dropdown-surface-foreground);
		border-radius: var(--dropdown-item-border-radius);
		cursor: pointer;
		transition:
			background var(--dropdown-transition),
			color var(--dropdown-transition);
	}

	.dropdown-item:hover:not(.dropdown-item--disabled) {
		background: var(--dropdown-item-hover-bg);
	}

	.dropdown-item:active:not(.dropdown-item--disabled) {
		background: var(--dropdown-item-active-bg);
	}

	.dropdown-item:focus-visible {
		outline: none;
		background: var(--dropdown-item-hover-bg);
	}

	.dropdown-item--selected {
		background: var(--dropdown-item-selected-bg);
		color: var(--dropdown-item-selected-color);
	}

	.dropdown-item--selected:hover:not(.dropdown-item--disabled) {
		background: var(--dropdown-item-selected-bg);
	}

	.dropdown-item--destructive {
		color: var(--dropdown-item-destructive-color);
	}

	.dropdown-item--destructive:hover:not(.dropdown-item--disabled) {
		background: var(--dropdown-item-destructive-hover-bg);
	}

	.dropdown-item--disabled {
		opacity: var(--dropdown-item-disabled-opacity);
		cursor: not-allowed;
	}

	.dropdown-item__icon,
	.dropdown-item__trailing {
		display: flex;
		align-items: center;
		flex-shrink: 0;
	}

	.dropdown-item__content {
		flex: 1;
		text-align: left;
	}

	.dropdown-item__trailing {
		margin-left: auto;
	}
</style>
