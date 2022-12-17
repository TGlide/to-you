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

export const range = (start: number, end: number, step = 1) => {
	const arr = [];
	for (let i = start; i < end; i += step) {
		arr.push(i);
	}
	return arr;
};
