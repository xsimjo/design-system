<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = HTMLAttributes<HTMLDivElement>;

	let { ...restProps }: Props = $props();
</script>

<div class="dropdown-divider" role="separator" {...restProps}></div>

<style>
	.dropdown-divider {
		height: 1px;
		margin: var(--dropdown-divider-margin) 0;
		background-color: var(--dropdown-divider-color);
	}
</style>
