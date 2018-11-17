/**
 * @name noSpecials
 * @since v1.0.0
 * @function
 * @category No
 * @description Validates if the value has no special characters
 * @param {String} val The value to validate against
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * noSpecials('AAAA'); // => true
 * noSpecials('1122334') // => true
 * noSpecials('AAA12!#$'); // => false
 */
export const noSpecials = (val = '') => val.match(/\W/) === null

/**
 * @name noNumbers
 * @since v1.0.0
 * @function
 * @category No
 * @description Validates if the value has no numbers
 * @param {String} val The value to validate against
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * noNumbers('AAAA'); // => true
 * noNumbers('1122334') // => false
 * noNumbers('AAA12!#$'); // => false
 */
export const noNumbers = (val = '') => val.match(/[0-9]/) === null

/**
 * @name noLetters
 * @since v1.0.0
 * @function
 * @category No
 * @description Validates if the value has no Letters
 * @param {String} val The value to validate against
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * noLetters('1122334') // => true
 * noLetters('AAAA'); // => false
 * noLetters('AAA12!#$'); // => false
 */
export const noLetters = (val = '') => val.match(/[A-Z]/i) === null
