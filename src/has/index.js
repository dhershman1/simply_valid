
export const hasValue = val => val && val.length !== 0;

export const hasNumbers = val => (/[0-9]/).test(val);

export const hasLetters = val => (/[A-Z]/i).test(val);

export const hasSpecialCharacters = val => (/\W/).test(val);

export const hasNumbersOrSpecials = val => hasNumbers(val) || hasSpecialCharacters(val);

export const hasUpperAndLowerCase = val => (/[A-Z]/).test(val) && (/[a-z]/).test(val);
