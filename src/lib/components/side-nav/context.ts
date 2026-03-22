export const SIDE_NAV_KEY = Symbol('side-nav');

export interface SideNavContext {
	readonly collapsed: () => boolean;
	readonly depth: () => number;
}
