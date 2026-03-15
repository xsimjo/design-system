<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = HTMLAttributes<HTMLHRElement>;

	let { ...restProps }: Props = $props();
</script>

<hr class="field-separator" {...restProps} />
