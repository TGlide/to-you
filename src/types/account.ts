import { isObjectType } from '$utils/object';

export type AccountInput = {
	email: string;
	password: string;
	name: string;
};

export function isAccountInput(value: unknown): value is AccountInput {
	return isObjectType<AccountInput>(value, {
		name: 'string',
		email: 'string',
		password: 'string'
	});
}
