import { isObjectType } from '$utils/object';
import { isModelsDocument, type ModelsDocument } from './appwrite';

export type Todo = {
	title: string;
	checked?: boolean;
};

export type TodoInput = Pick<Todo, 'title'>;

export type TodoDocument = ModelsDocument<Todo>;

export function isTodo(value: unknown): value is Todo {
	return isObjectType<Todo>(value, {
		title: 'string',
		checked: ['undefined', 'boolean']
	});
}

export function isTodoInput(value: unknown): value is TodoInput {
	return isObjectType<TodoInput>(value, {
		title: 'string'
	});
}

// TODO: test
export function isTodoDocument(doc: unknown): doc is TodoDocument {
	return isModelsDocument(doc, isTodo);
}
