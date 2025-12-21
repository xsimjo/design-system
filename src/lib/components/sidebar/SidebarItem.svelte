<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes, HTMLAnchorAttributes } from 'svelte/elements';

	type BaseProps = {
		active?: boolean;
		disabled?: boolean;
		icon?: Snippet;
		children: Snippet;
	};

	type ButtonProps = BaseProps &
		HTMLAttributes<HTMLButtonElement> & {
			href?: never;
		};

	type AnchorProps = BaseProps &
		HTMLAnchorAttributes & {
			href: string;
		};

	type Props = ButtonProps | AnchorProps;

	let { active = false, disabled = false, icon, children, href, ...restProps }: Props = $props();
</script>

{#if href && !disabled}
	<a
		{href}
		class="sidebar-item"
		class:sidebar-item--active={active}
		aria-current={active ? 'page' : undefined}
		{...restProps as HTMLAnchorAttributes}
	>
		{#if icon}
			<span class="sidebar-item__icon">
				{@render icon()}
			</span>
		{/if}
		<span class="sidebar-item__text">
			{@render children()}
		</span>
	</a>
{:else}
	<button
		type="button"
		class="sidebar-item"
		class:sidebar-item--active={active}
		class:sidebar-item--disabled={disabled}
		{disabled}
		aria-disabled={disabled}
		{...restProps as HTMLAttributes<HTMLButtonElement>}
	>
		{#if icon}
			<span class="sidebar-item__icon">
				{@render icon()}
			</span>
		{/if}
		<span class="sidebar-item__text">
			{@render children()}
		</span>
	</button>
{/if}

<style>
	.sidebar-item {
		display: flex;
		align-items: center;
		gap: var(--sidebar-item-gap);
		width: 100%;
		padding: var(--sidebar-item-padding-y) var(--sidebar-item-padding-x);
		background-color: var(--sidebar-item-bg);
		color: var(--sidebar-item-text);
		font-family: var(--sidebar-item-font-family);
		font-size: var(--sidebar-item-font-size);
		font-weight: var(--sidebar-item-font-weight);
		line-height: var(--sidebar-item-line-height);
		text-decoration: none;
		border: none;
		border-radius: var(--sidebar-item-border-radius);
		cursor: var(--sidebar-cursor-default);
		transition: all var(--sidebar-transition);
		text-align: left;
	}

	.sidebar-item:hover:not(.sidebar-item--disabled) {
		background-color: var(--sidebar-item-bg-hover);
		color: var(--sidebar-item-text-hover);
	}

	.sidebar-item:hover:not(.sidebar-item--disabled) .sidebar-item__icon {
		color: var(--sidebar-icon-color-hover);
	}

	.sidebar-item--active {
		background-color: var(--sidebar-item-bg-active);
		color: var(--sidebar-item-text-active);
	}

	.sidebar-item--active .sidebar-item__icon {
		color: var(--sidebar-icon-color-active);
	}

	.sidebar-item--disabled {
		color: var(--sidebar-item-text-disabled);
		cursor: var(--sidebar-cursor-disabled);
		opacity: var(--sidebar-opacity-disabled);
	}

	.sidebar-item--disabled .sidebar-item__icon {
		color: var(--sidebar-icon-color-disabled);
	}

	.sidebar-item:focus-visible {
		outline: none;
		box-shadow:
			0 0 0 var(--sidebar-focus-ring-offset) var(--sidebar-bg),
			0 0 0 calc(var(--sidebar-focus-ring-offset) + var(--sidebar-focus-ring-width))
				var(--sidebar-focus-ring-color);
	}

	.sidebar-item__icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: var(--sidebar-icon-size);
		height: var(--sidebar-icon-size);
		color: var(--sidebar-icon-color);
		flex-shrink: 0;
	}

	.sidebar-item__text {
		flex: 1;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	:global(.sidebar--collapsed) .sidebar-item__text {
		opacity: 0;
		width: 0;
		overflow: hidden;
	}

	:global(.sidebar--collapsed) .sidebar-item {
		justify-content: center;
		padding: var(--sidebar-item-padding-y);
	}
</style>
