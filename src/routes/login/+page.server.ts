import { isAuthenticated } from '$lib/account.server';
import { account, AppwriteExceptionType } from '$lib/appwrite.server';
import { isAccountInput } from '$types/account';
import { isAppwriteException } from '$types/appwrite';
import { formDataToObject } from '$utils/object';
import { redirect, type Load } from '@sveltejs/kit';
import type { Actions } from './$types';

export const load: Load = async () => {
	if (await isAuthenticated()) {
		throw redirect(307, '/');
	}
};

export const actions: Actions = {
	default: async ({ request }) => {
		const data = formDataToObject(await request.formData());
		if (!isAccountInput(data)) {
			throw new Error('Invalid data');
		}

		try {
			const a = await account.createEmailSession(data.email, data.password);
		} catch (error) {
			if (isAppwriteException(error) && error.type === AppwriteExceptionType.INVALID_CREDENTIALS) {
				const res = await account.create('unique()', data.email, data.password, data.name);
				console.log(res);
			} else {
				console.log(error);
			}
		}
	}
};
