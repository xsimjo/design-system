export const BREADCRUMBS_KEY = Symbol('breadcrumbs');

export interface BreadcrumbsContext {
	getSeparator: () => 'chevron' | 'slash';
}
