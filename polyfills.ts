if (typeof window !== "undefined" && !("setImmediate" in window)) {
	(
		window as unknown as {
			setImmediate?: (
				fn: (...args: unknown[]) => void,
				...args: unknown[]
			) => number;
		}
	).setImmediate = (
		fn: (...args: unknown[]) => void,
		...args: unknown[]
	): number => {
		return window.setTimeout(() => fn(...args), 0);
	};
}
