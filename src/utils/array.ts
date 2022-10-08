export const isArrayOfType = <T>(
	value: unknown,
	typeChecker: ((v: unknown) => v is T) | string | string[]
): value is T[] => {
	return (
		Array.isArray(value) &&
		value.every((v) => {
			if (typeof typeChecker === 'function') {
				return typeChecker(v);
			} else if (typeof typeChecker === 'string') {
				return typeof v === typeChecker;
			}
			return typeChecker.includes(typeof v);
		})
	);
};
