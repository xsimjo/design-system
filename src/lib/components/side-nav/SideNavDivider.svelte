<script lang="ts">
	import './side-nav.css';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = HTMLAttributes<HTMLHRElement>;

	let { ...restProps }: Props = $props();
</script>

<hr class="side-nav-divider" {...restProps} />
