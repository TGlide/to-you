import type { Load } from '@sveltejs/kit';
import { isModelsDocumentList } from '$types/appwrite';
import { isTodo, isTodoInput, type TodoDocument } from '$types/todo';
import type { Actions } from './$types';
import { formDataToObject } from '$utils/object';
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
		if (!isTodoInput(data)) {
			throw new Error('Invalid data');
		}

		await databases.createDocument<TodoDocument>(DATABASE_ID, TODO_COLLECTION_ID, 'unique()', data);

		return { cool: true };
	}
};
