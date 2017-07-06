
export const hasValue = (val) => (!val && val.length === 0);

export const hasNumbers = (val) => (val.search(/\d/) === -1);

export const hasLetters = (val) => (val.search(/[A-Z]\d?/i) === -1);

export const hasCustom = (val, {basePattern}) => (val.search(basePattern) === -1);

export const hasNumbersOrSpecials = (val) => ((val.search(/\d/) === -1 && val.search(/\W/) === -1));

export const hasSpecialCharacters = (val) => (val.search(/\W/) === -1);

export const hasUpperAndLowerCase = (val) => (val.search(/[A-Z]/) === -1 || val.search(/[a-z]/) === -1);
