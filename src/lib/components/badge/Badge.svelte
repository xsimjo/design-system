<script lang="ts">
	import './badge.css';
	import XIcon from '$lib/icons/XIcon.svelte';

	interface Props {
		label: string;
		variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'neutral';
		size?: 'sm' | 'md' | 'lg';
		disabled?: boolean;
		onremove?: () => void;
	}

	let { label, variant = 'primary', size = 'md', disabled = false, onremove }: Props = $props();
</script>

<span
	class="badge badge--{variant} badge--{size}"
	class:badge--has-remove={!!onremove}
	class:badge--disabled={disabled}
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
