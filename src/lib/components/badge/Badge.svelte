<script lang="ts">
	import './badge.css';
	import type { HTMLAttributes } from 'svelte/elements';
	import XIcon from '$lib/icons/XIcon.svelte';

	interface Props extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
		label: string;
		variant?:
			'primary' | 'secondary' | 'accent' | 'success' | 'danger' | 'warning' | 'info' | 'neutral';
		size?: 'sm' | 'md' | 'lg';
		disabled?: boolean;
		onremove?: () => void;
	}

	let {
		label,
		variant = 'primary',
		size = 'md',
		disabled = false,
		onremove,
		...restProps
	}: Props = $props();
</script>

<span
	class="badge badge--{variant} badge--{size}"
	class:badge--has-remove={!!onremove}
	class:badge--disabled={disabled}
	{...restProps}
>
	<span class="badge__label">{label}</span>
	{#if onremove}
		<button
			type="button"
			class="badge__remove"
			aria-label="Remove {label}"
			tabindex={-1}
			{disabled}
			onclick={(e) => {
				e.stopPropagation();
				onremove();
			}}
		>
			<XIcon size={10} />
		</button>
	{/if}
</span>
