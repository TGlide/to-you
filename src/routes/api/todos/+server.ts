import { DATABASE_ID, TODO_COLLECTION_ID } from '$env/static/private';
import { databases } from '$lib/appwrite.server';
import { strippedDocument } from '$types/appwrite';
import { isTodoDocument, isTodoInput, type TodoDocument } from '$types/todo';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	try {
		const documents = await databases.listDocuments(DATABASE_ID, TODO_COLLECTION_ID);
		return json(documents);
	} catch (e) {
		console.error('api/todos error:', e);
		throw error(400);
	}
};

export const POST: RequestHandler = async ({ request }) => {
	try {
		const data = await request.json();
		if (!isTodoInput(data)) {
			throw new Error('Invalid data');
		}

		const todo = await databases.createDocument<TodoDocument>(
			DATABASE_ID,
			TODO_COLLECTION_ID,
			'unique()',
			data
		);
		return json(todo);
	} catch (e) {
		console.error('api/todos error:', e);
		throw error(400);
	}
};

export const UPDATE: RequestHandler = async ({ request }) => {
	try {
		const data = await request.json();
		if (!isTodoDocument(data)) {
			throw new Error('Invalid data');
		}

		const todo = await databases.updateDocument<TodoDocument>(
			DATABASE_ID,
			TODO_COLLECTION_ID,
			data.$id,
			strippedDocument(data)
		);
		return json(todo);
	} catch (e) {
		console.error('api/todos error:', e);
		throw error(400);
	}
};

export const DELETE: RequestHandler = async ({ request }) => {
	try {
		const { id } = await request.json();
		if (typeof id !== 'string') {
			throw new Error('Invalid data');
		}

		await databases.deleteDocument(DATABASE_ID, TODO_COLLECTION_ID, id);
		return new Response(undefined, { status: 204 });
	} catch (e) {
		console.error('api/todos error:', e);
		throw error(400);
	}
};
