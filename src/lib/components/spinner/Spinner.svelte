<script lang="ts">
	import './spinner.css';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		size?: 'sm' | 'md' | 'lg';
		variant?:
			'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
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
	class:spinner--accent={variant === 'accent'}
	class:spinner--success={variant === 'success'}
	class:spinner--warning={variant === 'warning'}
	class:spinner--danger={variant === 'danger'}
	class:spinner--info={variant === 'info'}
	class:spinner--neutral={variant === 'neutral'}
	role="status"
	{...restProps}
>
	<span class="spinner__track"></span>
	<span class="spinner__indicator"></span>
	<span class="spinner__label">{label ?? 'Loading'}</span>
</div>
