<script lang="ts">
	import { componentTokens } from '$internal/generated/component-tokens.js';
	import PropsTable from '$internal/PropsTable.svelte';

	interface Props {
		/** Component folder name, e.g. `badge-input`. */
		component: string;
		title?: string;
		/**
		 * `[token, description]` pairs. The default value is read from the component CSS.
		 * With `sizes`, the token is a pattern containing `{size}` and the description is
		 * unused, since each size gets its own column.
		 */
		tokens: [string, string][];
		/** Renders one column per size, resolving `{size}` in each token pattern. */
		sizes?: string[];
	}

	let { component, title, tokens, sizes }: Props = $props();

	const values = $derived(componentTokens[component] ?? {});

	// A token documented here but absent from the CSS is drift; say so in the table
	// rather than rendering a plausible-looking blank.
	const missing = '(not defined in CSS)';

	const columns = $derived(
		sizes ? ['Token', ...sizes.map((s) => s.toUpperCase())] : ['Token', 'Default', 'Description']
	);

	const rows = $derived(
		sizes
			? tokens.map(([pattern]) => [
					pattern,
					...sizes.map((size) => values[pattern.replace('{size}', size)] ?? missing)
				])
			: tokens.map(([name, description]) => [name, values[name] ?? missing, description])
	);
</script>

<PropsTable {title} {columns} {rows} />
