import { compose, isNil, match } from 'kyanite'

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
 * import { noSpecials } from 'simply_valid'
 *
 * noSpecials('AAAA') // => true
 * noSpecials('1122334') // => true
 * noSpecials('AAA12!#$') // => false
 */
export const noSpecials = val => compose(isNil, match(/\W/), val)

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
 * import { noNumbers } from 'simply_valid'
 *
 * noNumbers('AAAA') // => true
 * noNumbers('1122334') // => false
 * noNumbers('AAA12!#$') // => false
 */
export const noNumbers = val => compose(isNil, match(/[0-9]/), val)

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
 * import { noLetters } from 'simply_valid'
 *
 * noLetters('1122334') // => true
 * noLetters('AAAA') // => false
 * noLetters('AAA12!#$') // => false
 */
export const noLetters = (val = '') => compose(isNil, match(/[A-Z]/), val)
