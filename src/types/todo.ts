import { isObjectType } from '$utils/object';
import { isModelsDocument, type ModelsDocument } from './appwrite';

export type Todo = {
	title: string;
	points: number;
	checked?: boolean;
};

export type AddTodoInput = Pick<Todo, 'title'>;
export type UpdateTodoInput = Partial<Todo> & { id: string };

export type TodoDocument = ModelsDocument<Todo>;

export function isTodo(value: unknown): value is Todo {
	return isObjectType<Todo>(value, {
		title: 'string',
		checked: ['undefined', 'boolean'],
		points: 'number'
	});
}

export function isAddTodoInput(value: unknown): value is AddTodoInput {
	return isObjectType<AddTodoInput>(value, {
		title: 'string'
	});
}

export function isUpdateTodoInput(value: unknown): value is UpdateTodoInput {
	return isObjectType<UpdateTodoInput>(value, {
		title: ['string', 'undefined'],
		checked: ['undefined', 'boolean'],
		id: 'string',
		points: ['undefined', 'number']
	});
}

// TODO: test
export function isTodoDocument(doc: unknown): doc is TodoDocument {
	return isModelsDocument(doc, isTodo);
}
