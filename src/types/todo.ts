import { isObjectType } from '$utils/object';
import { isModelsDocument, type ModelsDocument } from './appwrite';

export type Todo = {
	title: string;
	checked?: boolean;
};

export type TodoDocument = ModelsDocument<Todo>;

export function isTodo(value: unknown): value is Todo {
	return isObjectType<Todo>(value, {
		title: 'string',
		checked: ['undefined', 'boolean']
	});
}

// TODO: test
export function isTodoDocument(doc: unknown): doc is TodoDocument {
	return isModelsDocument(doc, isTodo);
}
