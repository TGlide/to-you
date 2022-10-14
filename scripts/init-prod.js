import { execSync } from 'child_process';
import dotenv from 'dotenv';

dotenv.config();

const {
	PROD_APPWRITE_ENDPOINT: endpoint,
	PROD_APPWRITE_PROJECT_ID: projectId,
	PROD_APPWRITE_API_KEY: apiKey
} = process.env;

console.log('Resetting Appwrite client');
execSync(`appwrite client --reset`);

console.log('Setting appwrite keys...');
execSync(`appwrite client --endpoint=${endpoint} --projectId=${projectId} --key=${apiKey}`);
