<script lang="ts">
	import './popover.css';
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="popover__footer">
	{@render children()}
</div>
