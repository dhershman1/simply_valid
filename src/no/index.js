/**
 * @name noSpecials
 * @description Validates if the value has no special characters
 * @param {String} val The value to validate against
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * const result = noSpecials('AAAA'); // => true
 * const result = noSpecials('1122334') // => true
 * const result = noSpecials('AAA12!#$'); // => false
 */
export const noSpecials = val => val.match(/\W/) === null;

/**
 * @name noNumbers
 * @description Validates if the value has no numbers
 * @param {String} val The value to validate against
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * const result = noNumbers('AAAA'); // => true
 * const result = noNumbers('1122334') // => false
 * const result = noNumbers('AAA12!#$'); // => false
 */
export const noNumbers = val => val.match(/[0-9]/) === null;

/**
 * @name noLetters
 * @description Validates if the value has no Letters
 * @param {String} val The value to validate against
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * const result = noLetters('1122334') // => true
 * const result = noLetters('AAAA'); // => false
 * const result = noLetters('AAA12!#$'); // => false
 */
export const noLetters = val => val.match(/[A-Z]/i) === null;
