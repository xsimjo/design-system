export const DRAWER_KEY = Symbol('drawer');

export interface DrawerContext {
	close: () => void;
	readonly titleId: string;
	readonly bodyId: string;
}
