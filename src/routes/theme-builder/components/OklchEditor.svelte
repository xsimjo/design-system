<script lang="ts">
	import { onMount } from 'svelte';
	import ColorPicker from '$lib/components/color-picker/ColorPicker.svelte';
	import { parseOklch, serializeOklch, oklchToHex, hexToOklch } from '../lib/color-utils.js';

	interface Props {
		value: string;
		hasAlpha?: boolean;
		label?: string;
		onchange?: (value: string) => void;
	}

	let { value, hasAlpha = false, label = '', onchange }: Props = $props();

	let hexValue = $state('#000000');
	let isMounted = $state(false);
	let isInternalUpdate = false;

	onMount(() => {
		isMounted = true;
		syncFromParent();
	});

	function syncFromParent() {
		const parsed = parseOklch(value);
		if (parsed) {
			isInternalUpdate = true;
			hexValue = oklchToHex(parsed.l, parsed.c, parsed.h);
			isInternalUpdate = false;
		}
	}

	// When parent value changes, update the hex display
	$effect(() => {
		void value;
		if (isMounted) {
			syncFromParent();
		}
	});

	// When user picks a color, convert hex → oklch and notify parent
	$effect(() => {
		const hex = hexValue;
		if (!isMounted || isInternalUpdate) return;
		const parsed = parseOklch(value);
		if (!parsed) return;
		const result = hexToOklch(hex);
		const newValue = hasAlpha
			? serializeOklch(result.l, result.c, result.h, parsed.a)
			: serializeOklch(result.l, result.c, result.h);
		onchange?.(newValue);
	});
</script>

<ColorPicker bind:value={hexValue} fullWidth aria-label="{label} color picker" />
