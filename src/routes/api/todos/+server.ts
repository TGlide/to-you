import { error, json, type RequestHandler } from '@sveltejs/kit';
import { databases } from '$lib/appwrite.server';

export const GET: RequestHandler = async (request) => {
	try {
		const documents = await databases.listDocuments('63415cd1876844f8311e', '63415ce7a6a6b5cbaf60');
		return json(documents);
	} catch (e) {
		return error(400, JSON.stringify(e));
	}
};
