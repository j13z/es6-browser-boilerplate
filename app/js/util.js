/**
 * Functional variant of `Function.prototype.bind`, without `this`.
 */
export const bind = (f, ...boundArgs) =>
	(...args) => f.apply(null, [...boundArgs, ...args]);
