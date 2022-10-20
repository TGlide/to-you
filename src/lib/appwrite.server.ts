import { Account, Client, Databases } from 'appwrite';
import { APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID } from '$env/static/private';

export const client = new Client().setEndpoint(APPWRITE_ENDPOINT).setProject(APPWRITE_PROJECT_ID);
export const databases = new Databases(client);
export const account = new Account(client);

export enum AppwriteExceptionType {
	'INVALID_CREDENTIALS' = 'user_invalid_credentials'
}
