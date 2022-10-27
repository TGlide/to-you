import type { ModelsDocument } from '$types/appwrite';
import type { Todo } from '$types/todo';
import { writable } from 'svelte/store';

const createTodoStore = (defaultValue?: ModelsDocument<Todo>[]) => {
	const store = writable<ModelsDocument<Todo>[]>(defaultValue ?? []);

	const add = (todo: ModelsDocument<Todo>) => {
		store.update((todos) => [...todos, todo]);
	};

	const remove = (id: string) => {
		store.update((todos) => todos.filter((todo) => todo.$id !== id));
	};

	const updateTodo = (id: string, data: Partial<Todo>) => {
		store.update((todos) =>
			todos.map((todo) => {
				if (todo.$id === id) {
					return {
						...todo,
						...data
					};
				}

				return todo;
			})
		);
	};

	return { ...store, add, remove, updateTodo };
};

export const todoStore = createTodoStore([]);
