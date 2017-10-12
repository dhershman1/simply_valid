
export const hasValue = val => val && val.length !== 0;

export const hasNumbers = val => val.search(/[0-9]/) !== -1;

export const hasLetters = val => val.search(/[A-Z]/i) !== -1;

export const hasSpecialCharacters = val => val.search(/\W/) !== -1;

export const hasNumbersOrSpecials = val => hasNumbers(val) || hasSpecialCharacters(val);

export const hasUpperAndLowerCase = val => val.search(/[A-Z]/) !== -1 && val.search(/[a-z]/) !== -1;
