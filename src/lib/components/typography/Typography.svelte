<script lang="ts">
	import './typography.css';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	type Variant =
		| 'h1'
		| 'h2'
		| 'h3'
		| 'h4'
		| 'h5'
		| 'h6'
		| 'body-lg'
		| 'body'
		| 'body-sm'
		| 'body-xs'
		| 'label-lg'
		| 'label'
		| 'label-sm'
		| 'code';

	type Color =
		| 'default'
		| 'muted'
		| 'primary'
		| 'secondary'
		| 'success'
		| 'danger'
		| 'warning'
		| 'info';
	type Weight = 'normal' | 'medium' | 'semibold' | 'bold';
	type Align = 'left' | 'center' | 'right';

	const defaultElements: Record<Variant, string> = {
		h1: 'h1',
		h2: 'h2',
		h3: 'h3',
		h4: 'h4',
		h5: 'h5',
		h6: 'h6',
		'body-lg': 'p',
		body: 'p',
		'body-sm': 'p',
		'body-xs': 'p',
		'label-lg': 'span',
		label: 'span',
		'label-sm': 'span',
		code: 'code'
	};

	interface Props extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
		variant?: Variant;
		as?: string;
		color?: Color;
		weight?: Weight;
		align?: Align;
		truncate?: boolean;
		italic?: boolean;
		children: Snippet;
	}

	let {
		variant = 'body',
		as,
		color = 'default',
		weight,
		align,
		truncate = false,
		italic = false,
		children,
		class: className,
		...restProps
	}: Props = $props();

	let element = $derived(as ?? defaultElements[variant]);

	let classes = $derived(
		[
			'typography',
			`typography--${variant}`,
			color !== 'default' && `typography--${color}`,
			weight && `typography--weight-${weight}`,
			align && `typography--align-${align}`,
			truncate && 'typography--truncate',
			italic && 'typography--italic',
			className
		]
			.filter(Boolean)
			.join(' ')
	);
</script>

<svelte:element this={element} class={classes} {...restProps}>
	{@render children()}
</svelte:element>
