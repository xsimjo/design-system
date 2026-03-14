<script lang="ts">
	import './dropdown.css';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = HTMLAttributes<HTMLDivElement>;

	let { ...restProps }: Props = $props();
</script>

<div class="dropdown-divider" role="separator" {...restProps}></div>
