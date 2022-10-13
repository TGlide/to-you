import type { Load } from '@sveltejs/kit';
import { isModelsDocumentList } from '$types/appwrite';
import { isTodo } from '$types/todo';

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
