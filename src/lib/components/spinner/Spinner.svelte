<script lang="ts">
	import './spinner.css';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		size?: 'sm' | 'md' | 'lg';
		variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
		label?: string;
	}

	let { size, variant, label, ...restProps }: Props = $props();
</script>

<div
	class="spinner"
	class:spinner--sm={size === 'sm'}
	class:spinner--md={size === 'md'}
	class:spinner--lg={size === 'lg'}
	class:spinner--primary={variant === 'primary'}
	class:spinner--secondary={variant === 'secondary'}
	class:spinner--success={variant === 'success'}
	class:spinner--warning={variant === 'warning'}
	class:spinner--danger={variant === 'danger'}
	role="status"
	aria-live="polite"
	aria-label={label ?? 'Loading'}
	{...restProps}
>
	<span class="spinner__track"></span>
	<span class="spinner__indicator"></span>
	<span class="visually-hidden">{label ?? 'Loading'}</span>
</div>
