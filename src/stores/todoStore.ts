import type { Todo, TodoDocument } from '$types/todo';
import { writable } from 'svelte/store';

type Store = TodoDocument[];

const createTodoStore = () => {
	const store = writable<Store>([]);

	const add = (todo: TodoDocument) => {
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
						...data,
					};
				}

				return todo;
			})
		);
	};

	return { ...store, add, remove, updateTodo };
};

export const todos = createTodoStore();
