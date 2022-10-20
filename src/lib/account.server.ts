import { account } from './appwrite.server';

export async function isAuthenticated() {
	try {
		await account.get();
		return true;
	} catch (e) {
		return false;
	}
}
