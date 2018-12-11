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
 * import { hasValue } from 'simply_valid'
 *
 * const result = hasValue('11') // => true
 * const result = hasValue('') // => false
 */
export const hasValue = val => either(eq(0), Boolean, val)

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
 * import { hasNumbers } from 'simply_valid'
 *
 * const result = hasNumbers('11') // => true
 * const result = hasNumbers('eew2211') // => true
 * const result = hasNumbers('eerrt') // => false
 */
export const hasNumbers = val => test(/[0-9]/, val)

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
 * import { hasLetters } from 'simply_valid'
 *
 * const result = hasLetters('11') // => false
 * const result = hasLetters('eew2211') // => true
 * const result = hasLetters('eerrt') // => true
 */
export const hasLetters = val => test(/[A-Z]/i, val)

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
 * import { hasSpecialCharacters } from 'simply_valid'
 *
 * const result = hasSpecialCharacters('11%%$#') // => true
 * const result = hasSpecialCharacters('eew2211!@') // => true
 * const result = hasSpecialCharacters('eerrt') // => false
 */
export const hasSpecialCharacters = val => test(/\W/, val)

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
 * import { hasNumbersOrSpecials } from 'simply_valid'
 *
 * const result = hasNumbersOrSpecials('11%%$#') // => true
 * const result = hasNumbersOrSpecials('eew2211!@') // => true
 * const result = hasNumbersOrSpecials('eerrt') // => false
 */
export const hasNumbersOrSpecials = val => either(hasNumbers, hasSpecialCharacters, val)

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
 * import { hasUpperAndLowerCase } from 'simply_valid'
 *
 * const result = hasUpperAndLowerCase('11%%$#') // => false
 * const result = hasUpperAndLowerCase('Eew2211!@') // => true
 * const result = hasUpperAndLowerCase('eERrt') // => true
 */
export const hasUpperAndLowerCase = val => both(test(/[A-Z]/), test(/[a-z]/), val)
