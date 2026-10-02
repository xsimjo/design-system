export const SEGMENTED_CONTROL_KEY = Symbol('segmented-control');

export interface SegmentedControlContext {
	activeValue: () => string;
	focusValue: () => string | undefined;
	select: (value: string) => void;
	size: () => 'sm' | 'md' | 'lg';
	disabled: () => boolean;
	error: () => boolean;
	register: (value: string) => void;
	unregister: (value: string) => void;
}
