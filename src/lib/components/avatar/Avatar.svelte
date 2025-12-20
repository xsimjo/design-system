<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import UserIcon from '$lib/icons/UserIcon.svelte';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		src?: string;
		alt?: string;
		name?: string;
		size?: 'sm' | 'md' | 'lg';
		status?: 'online' | 'offline' | 'away' | 'busy';
	}

	let { src, alt, name, size = 'md', status, ...restProps }: Props = $props();

	function getInitials(name: string): string {
		return name
			.split(' ')
			.map((part) => part[0])
			.slice(0, 2)
			.join('')
			.toUpperCase();
	}

	function getStatusLabel(status: string): string {
		return status.charAt(0).toUpperCase() + status.slice(1);
	}

	const initials = $derived(name ? getInitials(name) : '');
	const ariaLabel = $derived(alt || name || 'User avatar');
	const iconSize = $derived(size === 'sm' ? 16 : size === 'lg' ? 24 : 20);
</script>

<div class="avatar-wrapper avatar-wrapper--{size}" {...restProps}>
	<div class="avatar avatar--{size}" aria-label={ariaLabel} role="img">
		{#if src}
			<img class="avatar__image" {src} alt={alt || name || ''} />
		{:else if initials}
			<span class="avatar__initials" aria-hidden="true">{initials}</span>
		{:else}
			<span class="avatar__icon" aria-hidden="true">
				<UserIcon size={iconSize} />
			</span>
		{/if}
	</div>

	{#if status}
		<span class="avatar__status avatar__status--{status}" aria-label={getStatusLabel(status)}
		></span>
	{/if}
</div>

<style>
	.avatar-wrapper {
		display: inline-flex;
		position: relative;
		flex-shrink: 0;
		vertical-align: middle;
	}

	.avatar-wrapper--sm {
		width: var(--avatar-sm-size);
		height: var(--avatar-sm-size);
	}

	.avatar-wrapper--md {
		width: var(--avatar-md-size);
		height: var(--avatar-md-size);
	}

	.avatar-wrapper--lg {
		width: var(--avatar-lg-size);
		height: var(--avatar-lg-size);
	}

	.avatar {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		background-color: var(--avatar-bg);
		color: var(--avatar-text);
		border: var(--avatar-border-width) solid var(--avatar-border);
		border-radius: var(--avatar-radius-circle);
		font-family: var(--avatar-font-family);
		font-weight: var(--avatar-font-weight);
		line-height: var(--avatar-line-height);
		text-align: center;
		text-transform: uppercase;
		user-select: none;
		transition: all var(--avatar-transition);
		overflow: hidden;
	}

	.avatar--sm {
		font-size: var(--avatar-sm-font-size);
	}

	.avatar--md {
		font-size: var(--avatar-md-font-size);
	}

	.avatar--lg {
		font-size: var(--avatar-lg-font-size);
	}

	.avatar__image {
		width: 100%;
		height: 100%;
		object-fit: var(--avatar-img-object-fit);
		display: block;
	}

	.avatar__initials {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.avatar__icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.avatar__status {
		position: absolute;
		bottom: 0;
		right: 0;
		border-radius: var(--radius-full);
		border: var(--avatar-status-border-width) solid var(--avatar-status-border-color);
		box-sizing: border-box;
	}

	.avatar-wrapper--sm .avatar__status {
		width: var(--avatar-status-size-sm);
		height: var(--avatar-status-size-sm);
	}

	.avatar-wrapper--md .avatar__status {
		width: var(--avatar-status-size-md);
		height: var(--avatar-status-size-md);
	}

	.avatar-wrapper--lg .avatar__status {
		width: var(--avatar-status-size-lg);
		height: var(--avatar-status-size-lg);
	}

	.avatar__status--online {
		background-color: var(--avatar-status-online-bg);
	}

	.avatar__status--offline {
		background-color: var(--avatar-status-offline-bg);
	}

	.avatar__status--away {
		background-color: var(--avatar-status-away-bg);
	}

	.avatar__status--busy {
		background-color: var(--avatar-status-busy-bg);
	}
</style>
