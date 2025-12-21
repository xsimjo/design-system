<script lang="ts">
	import type { SVGAttributes } from 'svelte/elements';

	interface Props extends SVGAttributes<SVGSVGElement> {
		size?: number | string;
	}

	let { size = 24, ...restProps }: Props = $props();
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	style="width: {size}; height: {size}"
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="2"
	stroke-linecap="round"
	stroke-linejoin="round"
	{...restProps}
>
	<line x1="12" x2="12" y1="20" y2="10" />
	<line x1="18" x2="18" y1="20" y2="4" />
	<line x1="6" x2="6" y1="20" y2="14" />
</svg>
