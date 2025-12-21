<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = HTMLAttributes<HTMLHRElement>;

	let { ...restProps }: Props = $props();
</script>

<hr class="sidebar-divider" {...restProps} />

<style>
	.sidebar-divider {
		width: 100%;
		height: 0;
		margin: var(--sidebar-divider-margin) 0;
		padding: 0;
		border: none;
		border-top: var(--sidebar-divider-width) solid var(--sidebar-divider-color);
	}
</style>
