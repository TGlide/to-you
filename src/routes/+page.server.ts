import type { Load } from '@sveltejs/kit';
import { isModelsDocumentList } from '$types/appwrite';
import { isTodo, isAddTodoInput, type TodoDocument, isUpdateTodoInput } from '$types/todo';
import type { Actions } from './$types';
import { formDataToObject, objectFilter } from '$utils/object';
import { databases } from '$lib/appwrite.server';
import { DATABASE_ID, TODO_COLLECTION_ID } from '$env/static/private';

export const load: Load = async ({ fetch }) => {
	const todosRes = await fetch('/api/todos');
	if (!todosRes.ok) throw new Error('Failed to load todos');

	const todos = await todosRes.json();

	if (isModelsDocumentList(todos, isTodo)) {
		return {
			todos
		};
	}

	throw new Error('Failed to load todos');
};

export const actions: Actions = {
	add: async ({ request }) => {
		const data = formDataToObject(await request.formData());
		if (!isAddTodoInput(data)) {
			throw new Error('Invalid data');
		}

		await databases.createDocument<TodoDocument>(DATABASE_ID, TODO_COLLECTION_ID, 'unique()', data);
	},
	delete: async ({ request }) => {
		const { id } = formDataToObject(await request.formData());

		if (typeof id !== 'string') {
			throw new Error('Invalid data');
		}

		await databases.deleteDocument(DATABASE_ID, TODO_COLLECTION_ID, id);
	},
	update: async ({ request }) => {
		const data = formDataToObject(await request.formData(), {
			transformers: { checked: (v) => (v === 'on' ? true : false) },
			defaultValues: { checked: false }
		});
		if (!isUpdateTodoInput(data)) {
			throw new Error('Invalid data');
		}

		const updateObj = objectFilter(data, (k) => k !== 'id');

		await databases.updateDocument<TodoDocument>(
			DATABASE_ID,
			TODO_COLLECTION_ID,
			data.id,
			updateObj
		);
	}
};
