import { isTodoDocument, type TodoDocument } from '$types/todo';
import type { RealtimeResponseEvent } from 'appwrite';
import { onMount } from 'svelte';
import { client, DB_ID } from './appwrite';

export const TODO_COLLECTION_ID = '63415ce7a6a6b5cbaf60';

const subscribeTodos = (callback: (event: RealtimeResponseEvent<TodoDocument>) => void) => {
	return client.subscribe<TodoDocument>(
		`databases.${DB_ID}.collections.${TODO_COLLECTION_ID}.documents`,
		(e) => {
			if (!isTodoDocument(e.payload)) throw new Error('Invalid todo document on realtime event');
			callback(e);
		}
	);
};

export const subscribeTodosOnMount = (callback: Parameters<typeof subscribeTodos>[0]) => {
	onMount(() => {
		const unsubscribe = subscribeTodos(callback);
		return () => {
			unsubscribe();
		};
	});
};
