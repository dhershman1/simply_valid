import { between, test } from 'kyanite'

/**
 * @name isDate
 * @since v1.0.0
 * @function
 * @category Is
 * @description Validates if a normal date is valid or not
 * @param {String} val The value to validate against
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * import { isDate } from 'simply_valid'
 *
 * isDate('1/2/2019') // => true
 */
export const isDate = val =>
  test(/^((1[0-2])|(0?[1-9]))[-/.]?((0?[1-9])|([1-2][0-9])|(3[0-1]))[-/.]?(([1-2]{1}[0-9]{3})|([0-9]{2}))$/m, val)

/**
 * @name isDateShort
 * @since v1.0.0
 * @function
 * @category Is
 * @description Validates if a short date is valid or not
 * @param {String} val The value to validate against
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * import { isDateShort } from 'simply_valid'
 *
 * isDateShort('1/19') // => true
 * isDateShort('13/19') // => false
 */
export const isDateShort = val => test(/^((1[0-2])|(0?[1-9]))[-/.]?((0?[1-9])|([1-2][0-9])|(3[0-1]))[-/.]?$/m, val)

/**
 * @name isDateProper
 * @since v1.0.0
 * @function
 * @category Is
 * @description Validates if a "Proper" date is valid or not
 * @param {String} val The value to validate against
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * import { isDateProper } from 'simply_valid'
 *
 * isDateProper('2019/1/2') // => true
 */
export const isDateProper = val =>
  test(/^(([1-2]{1}[0-9]{3})|([0-9]{2}))[-/.]?((1[0-2])|(0?[1-9]))[-/.]?((0?[1-9])|([1-2][0-9])|(3[0-1]))$/m, val)

/**
 * @name isEmail
 * @since v1.0.0
 * @function
 * @category Is
 * @description Validates if a email is valid or not using the email regex
 * @param {String} val The value to validate against
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * import { isEmail } from 'simply_valid'
 *
 * isEmail('test@tester.com') // => true
 */
export const isEmail = val =>
  test(/^[\w\u00c0-\u017f][\w.-_\u00c0-\u017f]*[\w\u00c0-\u017f]+[@][\w\u00c0-\u017f][\w.-_\u00c0-\u017f]*[\w\u00c0-\u017f]+\.[a-z]{2,4}$/i, val)

/**
 * @name isNumber
 * @since v1.0.0
 * @function
 * @category Is
 * @description Validates if a provided value is a valid number or not
 * @param {String|Number} val The value to validate against
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * import { isNumber } from 'simply_valid'
 *
 * isNumber('2') // => true
 * isNumber(2) // => true
 */
export const isNumber = val => !isNaN(val)

/**
 * @name isPositive
 * @since v1.0.0
 * @function
 * @category Is
 * @description Validates if a provided value is a positive number
 * @param {Number} val The value to validate against
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * import { isPositive } from 'simply_valid'
 *
 * isPositive('2') // => true
 * isPositive(2) // => true
 * isPositive(-2) // => false
 */
export const isPositive = val => !isNaN(val) && val >= 0

/**
 * @name isNegative
 * @since v1.0.0
 * @function
 * @category Is
 * @description Validates if a provided value is a negative number
 * @param {Number} val The value to validate against
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * import { isNegative } from 'simply_valid'
 *
 * isNegative('-2') // => true
 * isNegative(-2) // => true
 * isNegative(2) // => false
 */
export const isNegative = val => !isNaN(val) && val < 0

/**
 * @name isVin
 * @since v1.0.0
 * @function
 * @category Is
 * @description Validates if a provided value is a valid vin number
 * @param {String} val The value to validate against
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * import { isVin } from 'simply_valid'
 *
 * vin('JM1CW2BL8C0127808') // => true
 */
export const isVin = val => test(/^[a-hj-npr-z0-9]{9}[a-hj-npr-tv-y1-9]{1}[a-hj-npr-z0-9]{7}$/i, val)

/**
 * @name isZip
 * @since v1.0.0
 * @function
 * @category Is
 * @description Validates if a provided value is a correct American zip code
 * @param {String} val The value to validate against
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * import { isZip } from 'simply_valid'
 *
 * isZip('44444') // => true
 * isZip('232') // => false
 */
export const isZip = val => test(/^\d{5}(-\d{4})?$/, val)

/**
 * @name isCAPostalCode
 * @since v1.0.0
 * @function
 * @category Is
 * @description Validates if a provided value is a valid CA postal Code
 * @param {String} val The value to validate against
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * import { isCAPostalCode } from 'simply_valid'
 *
 * isCAPostalCode('K1A0B1') // => true
 * isCAPostalCode('44444') // => false
 */
export const isCAPostalCode = val => test(/^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1} *\d{1}[A-Z]{1}\d{1}$/i, val)

/**
 * @name isPhone
 * @since v1.0.0
 * @function
 * @category Is
 * @description Validates if a provided value is a valid Phone number
 * @param {String} val The value to validate against
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * import { isPhone } from 'simply_valid'
 *
 * isPhone('555-666-7777') // => true
 * isPhone('5556667777') // => true
 */
export const isPhone = (val = '') => test(/^[0-9]{10}$/, val.replace(/\W/g, ''))

/**
 * @name isLicensePlate
 * @since v1.0.0
 * @function
 * @category Is
 * @description Validates if a provided value is a valid Phone number
 * @param {String} val The value to validate against
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * import { isLicensePlate } from 'simply_valid'
 *
 * isLicensePlate('SSS1829') // => true
 * isLicensePlate('SSS-1829') // => true
 * isLicensePlate('SSSS 188') // => false
 */
export const isLicensePlate = val => test(/^([A-Z]|[0-9]){1,3}(\s|-|•)?([A-Z]|[0-9]){3,5}$/i, val)

/**
 * @name isBelowMax
 * @since v1.0.0
 * @function
 * @category Is
 * @description Validates if a provided value is a below the set maximum
 * @param {Number} m The max to validate against
 * @param {Number} val The value to validate with
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * import { isBelowMax } from 'simply_valid'
 *
 * const below = isBelowMax(20)
 * below(19) // => true
 *
 * // OR
 *
 * isBelowMax(20, 19) // => true
 * isBelowMax(20)(19) // => true
 */
export const isBelowMax = (...args) => {
  const [max, val] = args

  if (args.length === 1) {
    return function _isBelowMax (_c) {
      return isBelowMax(max, _c)
    }
  }

  return !isNaN(val) && val < max
}

/**
 * @name isAboveMin
 * @since v1.0.0
 * @function
 * @category Is
 * @description Validates if a provided value is a below the set minimum
 * @param {Number} m The min to validate against
 * @param {Number} val The value to validate with
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * import { isAboveMin } from 'simply_valid'
 *
 * const above = isAboveMin(15)
 * above(19) // => true
 *
 * // OR
 *
 * isAboveMin(15, 19) // => true
 * isAboveMin(15)(19) // => true
 */
export const isAboveMin = (...args) => {
  const [min, val] = args

  if (args.length === 1) {
    return function _isAboveMin (_c) {
      return isAboveMin(min, _c)
    }
  }

  return !isNaN(val) && val > min
}

/**
 * @name isBetween
 * @since v5.0.0
 * @function
 * @category Is
 * @description Checks if the provided value is between the max and min
 * @param {Array} arr An array of 2 values, the first is the min the 2nd is the max
 * @param {Number} val The value to compare
 * @returns {Boolean} Whether or not the number is between the max and min numbers
 * @example
 * isBetween([5, 10], 6) // => true
 * isBetween([5, 10], 3) // => false
 *
 * // It's also curried
 * const fn = isBetween([5, 10])
 *
 * fn(6) // => true
 * fn(3) // => false
 */
export const isBetween = (arr, val) => {
  const [min, max] = arr

  if (!val) {
    return function _isBetween (_c) {
      return isBetween([min, max], _c)
    }
  }

  return !isNaN(val) && between(min, max, val)
}
