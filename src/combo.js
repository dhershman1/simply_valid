import {
  isAmexCard,
  isCAPostalCode,
  isDate,
  isDateProper,
  isDateShort,
  isDiscoverCard,
  isMasterCard,
  isVisaCard,
  isZip
} from './is'
import {
  meetsCVN,
  meetsCVNAmex
} from './meets'

const runner = (val, methods) => {
  for (let i = 0, len = methods.length; i < len; i++) {
    if (methods[i](val)) {
      return true
    }
  }

  return false
}

/**
 * @name creditCard
 * @since v3.2.0
 * @category Combo
 * @description
 * Validates that the value is some kind of credit card (excludes the visa pan card however)
 * it runs validation in strict mode by default
 * @param {String} val The credit card number value to validate
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * const result = creditCard('4111111111111111'); // => true
 * const result = creditCard('AB4111111111111111'); // => false
 */
export const creditCard = val => runner(val, [
  isAmexCard(true),
  isDiscoverCard(true),
  isMasterCard(true),
  isVisaCard(true)
])

/**
 * @name date
 * @since v3.2.0
 * @category Combo
 * @description Validates that the value is some kind of date (short, proper, or normal)
 * @param {String} val The date string value to validate
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * const result = date('01/19'); // => true
 * const result = date('01/15/2019'); // => true
 * const result = date('2019/01/05'); // => true
 */
export const date = val => runner(val, [isDate, isDateShort, isDateProper])

/**
 * @name cvn
 * @since v3.2.0
 * @category Combo
 * @description Validates that the value is either a normal or amex CVN number
 * @param {String} val The cvn string to run validation against
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * const result = cvn('333'); // => true
 * const result = cvn('4444'); // => true
 * const result = cvn('55555'); // => false
 */
export const cvn = val => runner(val, [meetsCVN, meetsCVNAmex])

/**
 * @name zipOrPostal
 * @since v3.2.0
 * @category Combo
 * @description Validates that the value is some kind of zip or postal code
 * @param {String} val The zip or postal code string to validate
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * const result = zipOrPostal('55555'); // => true
 * const result = zipOrPostal('K1A0B1'); // => true
 */
export const zipOrPostal = val => runner(val, [isZip, isCAPostalCode])
