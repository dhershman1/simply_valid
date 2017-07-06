export const matchesPattern = (val, {basePattern}) => (!basePattern.test(val));

export const doesNotMatch = (val, {antiPattern}) => (antiPattern.test(val));
