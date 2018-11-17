import {
  isCAPostalCode,
  isDate,
  isDateProper,
  isDateShort,
  isZip
} from './is'

const runner = (methods, val) => methods.some(fn => fn(val))

/**
 * @name date
 * @since v3.2.0
 * @function
 * @category Combo
 * @description Validates that the value is some kind of date (short, proper, or normal)
 * @param {String} val The date string value to validate
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * date('01/19'); // => true
 * date('01/15/2019'); // => true
 * date('2019/01/05'); // => true
 */
export const date = val => runner([isDate, isDateShort, isDateProper], val)

/**
 * @name zipOrPostal
 * @since v3.2.0
 * @function
 * @category Combo
 * @description Validates that the value is some kind of zip or postal code
 * @param {String} val The zip or postal code string to validate
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * zipOrPostal('55555'); // => true
 * zipOrPostal('K1A0B1'); // => true
 */
export const zipOrPostal = val => runner([isZip, isCAPostalCode], val)
