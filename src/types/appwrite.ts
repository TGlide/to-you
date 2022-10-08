import { isArrayOfType } from '$utils/array';
import { isObjectType } from '$utils/object';
import type { Models } from 'appwrite';

export type ModelsDocument<T extends object = object> = Models.Document & T;

export function isModelsDocument<T extends object = object>(
	doc: unknown,
	docTypeChecker?: (value: unknown) => value is T
): doc is ModelsDocument<T> {
	return (
		isObjectType<Models.Document>(doc, {
			$id: 'string',
			$collectionId: 'string',
			$databaseId: 'string',
			$createdAt: 'string',
			$updatedAt: 'string',
			$permissions: (v) => isArrayOfType<string>(v, 'string')
		}) && (docTypeChecker ? docTypeChecker(doc) : true)
	);
}

export function isModelsDocumentList<T extends object = object>(
	docList: unknown,
	docTypeChecker?: (value: unknown) => value is T
): docList is Models.DocumentList<ModelsDocument<T>> {
	const documentChecker = (doc: unknown): doc is ModelsDocument<T> => {
		return isModelsDocument(doc, docTypeChecker);
	};

	return isObjectType<Models.DocumentList<ModelsDocument<T>>>(docList, {
		total: 'number',
		documents: (v) => isArrayOfType(v, documentChecker)
	});
}
