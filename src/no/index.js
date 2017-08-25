export const noSpecials = val => val.match(/\W/) === null;

export const noNumbers = val => val.match(/[0-9]/) === null;

export const noLetters = val => val.match(/[A-Z]/i) === null;
