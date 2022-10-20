import { DATABASE_ID, TODO_COLLECTION_ID } from '$env/static/private';
import { isAuthenticated } from '$lib/account.server';
import { databases } from '$lib/appwrite.server';
import { isModelsDocumentList } from '$types/appwrite';
import { isAddTodoInput, isTodo, isUpdateTodoInput, type TodoDocument } from '$types/todo';

import { formDataToObject, objectFilter } from '$utils/object';
import { redirect, type Load } from '@sveltejs/kit';
import type { Actions } from './$types';

export const load: Load = async () => {
	if (!(await isAuthenticated())) {
		throw redirect(307, '/login');
	}

	const todos = await databases.listDocuments(DATABASE_ID, TODO_COLLECTION_ID);

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
			transformers: { checked: (v) => v === 'true' },
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
