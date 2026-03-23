export type TokenType =
	| 'color-oklch'
	| 'color-oklch-alpha'
	| 'dimension'
	| 'shadow'
	| 'font-stack'
	| 'number'
	| 'percentage'
	| 'duration'
	| 'easing'
	| 'color-keyword';

export type TokenGroup =
	| 'Colors'
	| 'Surfaces'
	| 'Backdrop'
	| 'Border'
	| 'Typography'
	| 'Radius'
	| 'Depth'
	| 'Focus'
	| 'Interaction'
	| 'Motion'
	| 'Spacing'
	| 'Z-index';

export interface TokenMeta {
	name: string;
	group: TokenGroup;
	type: TokenType;
	label: string;
	min?: number;
	max?: number;
	step?: number;
	options?: string[];
}

export const TOKEN_GROUPS: TokenGroup[] = [
	'Colors',
	'Surfaces',
	'Backdrop',
	'Border',
	'Typography',
	'Radius',
	'Depth',
	'Focus',
	'Interaction',
	'Motion',
	'Spacing',
	'Z-index'
];

export const TOKEN_DEFS: TokenMeta[] = [
	// Colors (16)
	{ name: '--ui-primary', group: 'Colors', type: 'color-oklch', label: 'Primary' },
	{
		name: '--ui-primary-foreground',
		group: 'Colors',
		type: 'color-oklch',
		label: 'Primary Foreground'
	},
	{ name: '--ui-secondary', group: 'Colors', type: 'color-oklch', label: 'Secondary' },
	{
		name: '--ui-secondary-foreground',
		group: 'Colors',
		type: 'color-oklch',
		label: 'Secondary Foreground'
	},
	{ name: '--ui-accent', group: 'Colors', type: 'color-oklch', label: 'Accent' },
	{
		name: '--ui-accent-foreground',
		group: 'Colors',
		type: 'color-oklch',
		label: 'Accent Foreground'
	},
	{ name: '--ui-success', group: 'Colors', type: 'color-oklch', label: 'Success' },
	{
		name: '--ui-success-foreground',
		group: 'Colors',
		type: 'color-oklch',
		label: 'Success Foreground'
	},
	{ name: '--ui-warning', group: 'Colors', type: 'color-oklch', label: 'Warning' },
	{
		name: '--ui-warning-foreground',
		group: 'Colors',
		type: 'color-oklch',
		label: 'Warning Foreground'
	},
	{ name: '--ui-danger', group: 'Colors', type: 'color-oklch', label: 'Danger' },
	{
		name: '--ui-danger-foreground',
		group: 'Colors',
		type: 'color-oklch',
		label: 'Danger Foreground'
	},
	{ name: '--ui-info', group: 'Colors', type: 'color-oklch', label: 'Info' },
	{
		name: '--ui-info-foreground',
		group: 'Colors',
		type: 'color-oklch',
		label: 'Info Foreground'
	},
	{ name: '--ui-neutral', group: 'Colors', type: 'color-oklch', label: 'Neutral' },
	{
		name: '--ui-neutral-foreground',
		group: 'Colors',
		type: 'color-oklch',
		label: 'Neutral Foreground'
	},

	// Surfaces (6)
	{ name: '--ui-surface', group: 'Surfaces', type: 'color-oklch', label: 'Surface' },
	{
		name: '--ui-surface-foreground',
		group: 'Surfaces',
		type: 'color-oklch',
		label: 'Surface Foreground'
	},
	{
		name: '--ui-surface-raised',
		group: 'Surfaces',
		type: 'color-oklch',
		label: 'Surface Raised'
	},
	{
		name: '--ui-surface-raised-foreground',
		group: 'Surfaces',
		type: 'color-oklch',
		label: 'Surface Raised Foreground'
	},
	{
		name: '--ui-surface-overlay',
		group: 'Surfaces',
		type: 'color-oklch',
		label: 'Surface Overlay'
	},
	{
		name: '--ui-surface-overlay-foreground',
		group: 'Surfaces',
		type: 'color-oklch',
		label: 'Surface Overlay Foreground'
	},

	// Backdrop (2)
	{ name: '--ui-backdrop', group: 'Backdrop', type: 'color-oklch-alpha', label: 'Backdrop' },
	{
		name: '--ui-backdrop-blur',
		group: 'Backdrop',
		type: 'dimension',
		label: 'Backdrop Blur',
		min: 0,
		max: 32,
		step: 1
	},

	// Border (2)
	{ name: '--ui-border', group: 'Border', type: 'color-oklch', label: 'Border Color' },
	{
		name: '--ui-border-width',
		group: 'Border',
		type: 'dimension',
		label: 'Border Width',
		min: 0,
		max: 4,
		step: 1
	},

	// Typography (18)
	{ name: '--ui-font-sans', group: 'Typography', type: 'font-stack', label: 'Sans Font' },
	{ name: '--ui-font-mono', group: 'Typography', type: 'font-stack', label: 'Mono Font' },
	{
		name: '--ui-text-xs',
		group: 'Typography',
		type: 'dimension',
		label: 'Text XS',
		min: 8,
		max: 24,
		step: 1
	},
	{
		name: '--ui-text-sm',
		group: 'Typography',
		type: 'dimension',
		label: 'Text SM',
		min: 8,
		max: 24,
		step: 1
	},
	{
		name: '--ui-text-base',
		group: 'Typography',
		type: 'dimension',
		label: 'Text Base',
		min: 10,
		max: 28,
		step: 1
	},
	{
		name: '--ui-text-lg',
		group: 'Typography',
		type: 'dimension',
		label: 'Text LG',
		min: 12,
		max: 32,
		step: 1
	},
	{
		name: '--ui-text-xl',
		group: 'Typography',
		type: 'dimension',
		label: 'Text XL',
		min: 14,
		max: 36,
		step: 1
	},
	{
		name: '--ui-text-2xl',
		group: 'Typography',
		type: 'dimension',
		label: 'Text 2XL',
		min: 16,
		max: 48,
		step: 1
	},
	{
		name: '--ui-text-3xl',
		group: 'Typography',
		type: 'dimension',
		label: 'Text 3XL',
		min: 20,
		max: 60,
		step: 1
	},
	{
		name: '--ui-text-4xl',
		group: 'Typography',
		type: 'dimension',
		label: 'Text 4XL',
		min: 24,
		max: 72,
		step: 1
	},
	{
		name: '--ui-leading-none',
		group: 'Typography',
		type: 'number',
		label: 'Leading None',
		min: 0.8,
		max: 2,
		step: 0.05
	},
	{
		name: '--ui-leading-tight',
		group: 'Typography',
		type: 'number',
		label: 'Leading Tight',
		min: 1,
		max: 2,
		step: 0.05
	},
	{
		name: '--ui-leading-normal',
		group: 'Typography',
		type: 'number',
		label: 'Leading Normal',
		min: 1,
		max: 2.5,
		step: 0.05
	},
	{
		name: '--ui-leading-relaxed',
		group: 'Typography',
		type: 'number',
		label: 'Leading Relaxed',
		min: 1,
		max: 3,
		step: 0.05
	},
	{
		name: '--ui-weight-normal',
		group: 'Typography',
		type: 'number',
		label: 'Weight Normal',
		min: 100,
		max: 900,
		step: 100
	},
	{
		name: '--ui-weight-medium',
		group: 'Typography',
		type: 'number',
		label: 'Weight Medium',
		min: 100,
		max: 900,
		step: 100
	},
	{
		name: '--ui-weight-semibold',
		group: 'Typography',
		type: 'number',
		label: 'Weight Semibold',
		min: 100,
		max: 900,
		step: 100
	},
	{
		name: '--ui-weight-bold',
		group: 'Typography',
		type: 'number',
		label: 'Weight Bold',
		min: 100,
		max: 900,
		step: 100
	},

	// Radius (1)
	{
		name: '--ui-base-radius',
		group: 'Radius',
		type: 'dimension',
		label: 'Base Radius',
		min: 0,
		max: 32,
		step: 1
	},

	// Depth (1)
	{ name: '--ui-depth', group: 'Depth', type: 'shadow', label: 'Depth Shadow' },

	// Focus (2)
	{
		name: '--ui-ring-width',
		group: 'Focus',
		type: 'dimension',
		label: 'Ring Width',
		min: 0,
		max: 6,
		step: 1
	},
	{
		name: '--ui-ring-offset',
		group: 'Focus',
		type: 'dimension',
		label: 'Ring Offset',
		min: 0,
		max: 6,
		step: 1
	},

	// Interaction (3)
	{
		name: '--ui-hover-mix',
		group: 'Interaction',
		type: 'color-keyword',
		label: 'Hover Mix Color',
		options: ['black', 'white']
	},
	{
		name: '--ui-hover-amount',
		group: 'Interaction',
		type: 'percentage',
		label: 'Hover Amount',
		min: 0,
		max: 30,
		step: 1
	},
	{
		name: '--ui-active-amount',
		group: 'Interaction',
		type: 'percentage',
		label: 'Active Amount',
		min: 0,
		max: 30,
		step: 1
	},

	// Motion (3)
	{
		name: '--ui-base-duration',
		group: 'Motion',
		type: 'duration',
		label: 'Base Duration',
		min: 0,
		max: 600,
		step: 10
	},
	{ name: '--ui-base-easing', group: 'Motion', type: 'easing', label: 'Base Easing' },
	{
		name: '--ui-enter-offset',
		group: 'Motion',
		type: 'dimension',
		label: 'Enter Offset',
		min: -20,
		max: 0,
		step: 1
	},

	// Spacing (1)
	{
		name: '--ui-base-spacing',
		group: 'Spacing',
		type: 'dimension',
		label: 'Base Spacing',
		min: 2,
		max: 16,
		step: 1
	},

	// Z-index (2)
	{
		name: '--ui-z-overlay',
		group: 'Z-index',
		type: 'number',
		label: 'Overlay Z-index',
		min: 100,
		max: 9999,
		step: 100
	},
	{
		name: '--ui-z-tooltip',
		group: 'Z-index',
		type: 'number',
		label: 'Tooltip Z-index',
		min: 100,
		max: 9999,
		step: 100
	}
];
