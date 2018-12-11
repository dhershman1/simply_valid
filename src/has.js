import { both, either, eq, test } from 'kyanite'

/**
 * @name hasValue
 * @since v1.0.0
 * @function
 * @category Has
 * @description Validates if the value is actually a value
 * @param {Any} val The value to validate against
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * const result = hasValue('11') // => true
 * const result = hasValue('') // => false
 */
export const hasValue = either(eq(0), Boolean)

/**
 * @name hasNumbers
 * @since v1.0.0
 * @function
 * @category Has
 * @description Validates if the value contains numbers or not
 * @param {String} val The value to validate against
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * const result = hasNumbers('11') // => true
 * const result = hasNumbers('eew2211') // => true
 * const result = hasNumbers('eerrt') // => false
 */
export const hasNumbers = test(/[0-9]/)

/**
 * @name hasLetters
 * @since v1.0.0
 * @function
 * @category Has
 * @description Validates if the value contains numbers or not
 * @param {String} val The value to validate against
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * const result = hasLetters('11') // => false
 * const result = hasLetters('eew2211') // => true
 * const result = hasLetters('eerrt') // => true
 */
export const hasLetters = test(/[A-Z]/i)

/**
 * @name hasSpecialCharacters
 * @since v1.0.0
 * @function
 * @category Has
 * @description Validates if the value contains Special Characters
 * @param {String} val The value to validate against
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * const result = hasSpecialCharacters('11%%$#') // => true
 * const result = hasSpecialCharacters('eew2211!@') // => true
 * const result = hasSpecialCharacters('eerrt') // => false
 */
export const hasSpecialCharacters = test(/\W/)

/**
 * @name hasNumbersOrSpecials
 * @since v1.0.0
 * @function
 * @category Has
 * @description Validates if the value contains Special Characters or numbers
 * @param {String} val The value to validate against
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * const result = hasNumbersOrSpecials('11%%$#') // => true
 * const result = hasNumbersOrSpecials('eew2211!@') // => true
 * const result = hasNumbersOrSpecials('eerrt') // => false
 */
export const hasNumbersOrSpecials = either(hasNumbers, hasSpecialCharacters)

/**
 * @name hasUpperAndLowerCase
 * @since v1.0.0
 * @function
 * @category Has
 * @description Validates if the value contains Special Characters or numbers
 * @param {String} val The value to validate against
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * const result = hasUpperAndLowerCase('11%%$#') // => false
 * const result = hasUpperAndLowerCase('Eew2211!@') // => true
 * const result = hasUpperAndLowerCase('eERrt') // => true
 */
export const hasUpperAndLowerCase = both(test(/[A-Z]/), test(/[a-z]/))
