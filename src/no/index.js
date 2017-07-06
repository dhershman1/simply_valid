export const noSpecials = (val) => ((/\W/).test(val));

export const noNumbers = (val) => ((/[0-9]/).test(val));
