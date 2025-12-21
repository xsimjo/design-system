<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes, HTMLAnchorAttributes } from 'svelte/elements';

	type Variant =
		| 'h1'
		| 'h2'
		| 'h3'
		| 'h4'
		| 'h5'
		| 'h6'
		| 'body-lg'
		| 'body-md'
		| 'body-sm'
		| 'label-lg'
		| 'label-md'
		| 'label-sm'
		| 'caption'
		| 'overline'
		| 'code'
		| 'link';

	type Align = 'left' | 'center' | 'right' | 'justify';

	type ElementType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'code' | 'a';

	interface Props extends HTMLAttributes<HTMLElement>, HTMLAnchorAttributes {
		variant?: Variant;
		as?: ElementType;
		align?: Align;
		noMargin?: boolean;
		children: Snippet;
	}

	const variantElementMap: Record<Variant, ElementType> = {
		h1: 'h1',
		h2: 'h2',
		h3: 'h3',
		h4: 'h4',
		h5: 'h5',
		h6: 'h6',
		'body-lg': 'p',
		'body-md': 'p',
		'body-sm': 'p',
		'label-lg': 'span',
		'label-md': 'span',
		'label-sm': 'span',
		caption: 'span',
		overline: 'span',
		code: 'code',
		link: 'a'
	};

	let {
		variant = 'body-md',
		as,
		align,
		noMargin = false,
		children,
		...restProps
	}: Props = $props();

	const element = $derived(as ?? variantElementMap[variant]);
</script>

<svelte:element
	this={element}
	class="typography typography--{variant}"
	class:typography--no-margin={noMargin}
	class:typography--align-left={align === 'left'}
	class:typography--align-center={align === 'center'}
	class:typography--align-right={align === 'right'}
	class:typography--align-justify={align === 'justify'}
	{...restProps}
>
	{@render children()}
</svelte:element>

<style>
	.typography {
		font-family: var(--typography-font-family);
		transition: var(--typography-transition);
	}

	.typography--h1 {
		font-size: var(--typography-h1-font-size);
		font-weight: var(--typography-h1-font-weight);
		line-height: var(--typography-h1-line-height);
		color: var(--typography-h1-color);
		margin-top: var(--typography-h1-margin-top);
		margin-bottom: var(--typography-h1-margin-bottom);
	}

	.typography--h2 {
		font-size: var(--typography-h2-font-size);
		font-weight: var(--typography-h2-font-weight);
		line-height: var(--typography-h2-line-height);
		color: var(--typography-h2-color);
		margin-top: var(--typography-h2-margin-top);
		margin-bottom: var(--typography-h2-margin-bottom);
	}

	.typography--h3 {
		font-size: var(--typography-h3-font-size);
		font-weight: var(--typography-h3-font-weight);
		line-height: var(--typography-h3-line-height);
		color: var(--typography-h3-color);
		margin-top: var(--typography-h3-margin-top);
		margin-bottom: var(--typography-h3-margin-bottom);
	}

	.typography--h4 {
		font-size: var(--typography-h4-font-size);
		font-weight: var(--typography-h4-font-weight);
		line-height: var(--typography-h4-line-height);
		color: var(--typography-h4-color);
		margin-top: var(--typography-h4-margin-top);
		margin-bottom: var(--typography-h4-margin-bottom);
	}

	.typography--h5 {
		font-size: var(--typography-h5-font-size);
		font-weight: var(--typography-h5-font-weight);
		line-height: var(--typography-h5-line-height);
		color: var(--typography-h5-color);
		margin-top: var(--typography-h5-margin-top);
		margin-bottom: var(--typography-h5-margin-bottom);
	}

	.typography--h6 {
		font-size: var(--typography-h6-font-size);
		font-weight: var(--typography-h6-font-weight);
		line-height: var(--typography-h6-line-height);
		color: var(--typography-h6-color);
		margin-top: var(--typography-h6-margin-top);
		margin-bottom: var(--typography-h6-margin-bottom);
	}

	.typography--body-lg {
		font-size: var(--typography-body-lg-font-size);
		font-weight: var(--typography-body-lg-font-weight);
		line-height: var(--typography-body-lg-line-height);
		color: var(--typography-body-lg-color);
		margin: 0;
	}

	.typography--body-md {
		font-size: var(--typography-body-md-font-size);
		font-weight: var(--typography-body-md-font-weight);
		line-height: var(--typography-body-md-line-height);
		color: var(--typography-body-md-color);
		margin: 0;
	}

	.typography--body-sm {
		font-size: var(--typography-body-sm-font-size);
		font-weight: var(--typography-body-sm-font-weight);
		line-height: var(--typography-body-sm-line-height);
		color: var(--typography-body-sm-color);
		margin: 0;
	}

	.typography--label-lg {
		font-size: var(--typography-label-lg-font-size);
		font-weight: var(--typography-label-lg-font-weight);
		line-height: var(--typography-label-lg-line-height);
		color: var(--typography-label-lg-color);
	}

	.typography--label-md {
		font-size: var(--typography-label-md-font-size);
		font-weight: var(--typography-label-md-font-weight);
		line-height: var(--typography-label-md-line-height);
		color: var(--typography-label-md-color);
	}

	.typography--label-sm {
		font-size: var(--typography-label-sm-font-size);
		font-weight: var(--typography-label-sm-font-weight);
		line-height: var(--typography-label-sm-line-height);
		color: var(--typography-label-sm-color);
	}

	.typography--caption {
		font-size: var(--typography-caption-font-size);
		font-weight: var(--typography-caption-font-weight);
		line-height: var(--typography-caption-line-height);
		color: var(--typography-caption-color);
	}

	.typography--overline {
		font-size: var(--typography-overline-font-size);
		font-weight: var(--typography-overline-font-weight);
		line-height: var(--typography-overline-line-height);
		color: var(--typography-overline-color);
		text-transform: var(--typography-overline-text-transform);
		letter-spacing: var(--typography-overline-letter-spacing);
	}

	.typography--code {
		font-family: var(--typography-code-font-family);
		font-size: var(--typography-code-font-size);
		font-weight: var(--typography-code-font-weight);
		line-height: var(--typography-code-line-height);
		color: var(--typography-code-color);
		background-color: var(--typography-code-bg);
		padding-inline: var(--typography-code-padding-x);
		padding-block: var(--typography-code-padding-y);
		border-radius: var(--typography-code-border-radius);
	}

	.typography--link {
		color: var(--typography-link-color);
		text-decoration: var(--typography-link-text-decoration);
		cursor: pointer;
	}

	.typography--link:hover {
		color: var(--typography-link-color-hover);
		text-decoration: var(--typography-link-text-decoration-hover);
	}

	.typography--no-margin {
		margin: 0;
	}

	.typography--align-left {
		text-align: left;
	}

	.typography--align-center {
		text-align: center;
	}

	.typography--align-right {
		text-align: right;
	}

	.typography--align-justify {
		text-align: justify;
	}
</style>
