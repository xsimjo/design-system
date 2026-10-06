<script lang="ts" module>
	const iconSizes: Record<string, number> = { sm: 12, md: 16, lg: 24, xl: 32 };
</script>

<script lang="ts">
	import './avatar.css';
	import type { HTMLAttributes } from 'svelte/elements';
	import UserIcon from '$lib/icons/UserIcon.svelte';

	interface Props extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
		src?: string;
		alt?: string;
		initials?: string;
		size?: 'sm' | 'md' | 'lg' | 'xl';
		shape?: 'circle' | 'square';
		color?: 'primary' | 'secondary' | 'neutral';
		status?: 'online' | 'offline' | 'away' | 'busy';
	}

	let {
		src,
		alt = '',
		initials,
		size = 'md',
		shape = 'circle',
		color = 'neutral',
		status,
		...restProps
	}: Props = $props();

	let errorSrc = $state<string | undefined>(undefined);

	const displayInitials = $derived(initials ? initials.slice(0, 2).toUpperCase() : '');
	const showImage = $derived(!!src && src !== errorSrc);
	const showInitials = $derived(!showImage && !!displayInitials);
</script>

<span class="avatar-wrapper" {...restProps}>
	<span class="avatar avatar--{size} avatar--{shape} avatar--{color}">
		{#if showImage}
			<img class="avatar__image" {src} {alt} onerror={() => (errorSrc = src)} />
		{:else if showInitials}
			<span class="avatar__initials" aria-hidden="true">{displayInitials}</span>
		{:else}
			<span class="avatar__icon" aria-hidden="true">
				<UserIcon size={iconSizes[size]} />
			</span>
		{/if}
	</span>

	{#if status}
		<span class="avatar__status avatar__status--{status}" aria-hidden="true"></span>
	{/if}
</span>
