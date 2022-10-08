import type { Load } from '@sveltejs/kit';
import { isModelsDocumentList } from '$types/appwrite';
import { isTodo } from '$types/todo';

export const load: Load = async ({ fetch }) => {
	const todosRes = await fetch('/api/todos');
	const todos = await todosRes.json();
	if (isModelsDocumentList(todos, isTodo)) {
		console.log(todos);
		return {
			todos
		};
	}

	throw new Error('Failed to load todos');
};
