export const FIELD_KEY = Symbol('field');

export interface FieldContext {
	readonly id: string;
	readonly error: string | undefined;
	readonly required: boolean;
	readonly disabled: boolean;
	readonly descriptionIds: string[];
	registerDescription(id: string): void;
	unregisterDescription(id: string): void;
}
