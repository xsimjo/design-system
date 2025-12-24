<script lang="ts">
	import type { SVGAttributes } from 'svelte/elements';

	interface Props extends SVGAttributes<SVGSVGElement> {
		size?: number | string;
	}

	let { size = 24, ...restProps }: Props = $props();
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	style="width: {size}px; height: {size}px"
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="2"
	stroke-linecap="round"
	stroke-linejoin="round"
	{...restProps}
>
	<circle cx="16" cy="4" r="1" />
	<path d="m18 19 1-7-6 1" />
	<path d="m5 8 3-3 5.5 3-2.36 3.5" />
	<path d="M4.24 14.5a5 5 0 0 0 6.88 6" />
	<path d="M13.76 17.5a5 5 0 0 0-6.88-6" />
</svg>
