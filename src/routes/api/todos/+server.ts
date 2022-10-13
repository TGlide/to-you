import { error, json, type RequestHandler } from '@sveltejs/kit';
import { databases, DB_ID } from '$lib/appwrite';
import { TODO_COLLECTION_ID } from '$lib/todos';

export const GET: RequestHandler = async () => {
	try {
		const documents = await databases.listDocuments(DB_ID, TODO_COLLECTION_ID);

		return json(documents);
	} catch (e) {
		console.error('api/todos error:', e);
		throw error(400);
	}
};
