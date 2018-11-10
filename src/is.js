import { between, curry, isNil } from 'kyanite'

const luhn = val => {
  const numArr = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9]
  const stringVal = String(val)
  let len = stringVal.length
  let bit = 1
  let sum = 0
  let num = 0

  while (len) {
    num = parseInt(stringVal.charAt(--len), 10)
    bit ^= 1
    sum += bit ? numArr[num] : num
  }

  return sum && sum % 10 === 0
}

/**
 * @name isNotTooShort
 * @since v4.0.0
 * @category Is
 * @description Validates if the value is longer or equal to the minLen option
 * @param {Number} rule The length the value needs to be greater than or equal to
 * @param {String} val The value to validate against
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * isNotTooShort(5, 'the cow ate grass'); // => true
 * isNotTooShort(5, 'the'); // => false
 *
 * // OR
 *
 * const check = isNotTooShort(5);
 *
 * check('the cow ate grass'); // => true
 * check('the'); // => false
 */
export const isNotTooShort = curry((rule, val) => {
  if (rule.minLen) {
    return val.length >= rule.minLen
  }

  return val.length >= rule
})

/**
 * @name isNotTooLong
 * @since v4.0.0
 * @category Is
 * @description Validates if the value is shorter or equal to the maxLen option
 * @param {Number} rule The length the value needs to be Less than or equal to
 * @param {String} val The value to validate against
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * isNotTooLong(5, 'the'); // => true
 * isNotTooLong(5, 'the cow ate grass'); // => false
 *
 * // OR
 *
 * const check = isNotTooLong(5);
 *
 * check('the'); // => true
 * check('the cow ate grass'); // => false
 */
export const isNotTooLong = curry((rule, val) => {
  if (rule.maxLen) {
    return val.length <= rule.maxLen
  }

  return val.length <= rule
})

/**
 * @name isCorrectLength
 * @since v4.0.0
 * @category Is
 * @description Validates if the value is between or equal to the maxLen and minLen options
 * @param {Object} rule Object containing the two numbers to stay between
 * @param {Number} rule.maxLen The length the value needs to be Less than or equal to
 * @param {Number} rule.minLen The length the value needs to be greater than or equal to
 * @param {String} val The value to validate against
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * isCorrectLength({
 *  maxLen: 10,
 *  minLen: 1
 * }, 'the'); // => true
 * isCorrectLength({
 *  maxLen: 10,
 *  minLen: 1
 * }, 'the cow ate grass'); // => false
 *
 * // OR
 *
 * const check = isCorrectLength({
 *  maxLen: 10,
 *  minLen: 1
 * });
 *
 * check('the'); // => true
 * check('the cow ate grass'); // => false
 */
export const isCorrectLength = curry(({ maxLen, minLen }, val) =>
  isNotTooShort(minLen, val) && isNotTooLong(maxLen, val))

/**
 * @name isDate
 * @since v1.0.0
 * @category Is
 * @description Validates if a normal date is valid or not
 * @param {String} val The value to validate against
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * isDate('1/2/2019'); // => true
 */
export const isDate = val =>
  (/^((1[0-2])|(0?[1-9]))[-/.]?((0?[1-9])|([1-2][0-9])|(3[0-1]))[-/.]?(([1-2]{1}[0-9]{3})|([0-9]{2}))$/m).test(val)

/**
 * @name isDateShort
 * @since v1.0.0
 * @category Is
 * @description Validates if a short date is valid or not
 * @param {String} val The value to validate against
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * isDateShort('1/19'); // => true
 * isDateShort('13/19'); // => false
 */
export const isDateShort = val => (/^((1[0-2])|(0?[1-9]))[-/.]?((0?[1-9])|([1-2][0-9])|(3[0-1]))[-/.]?$/m).test(val)

/**
 * @name isDateProper
 * @since v1.0.0
 * @category Is
 * @description Validates if a "Proper" date is valid or not
 * @param {String} val The value to validate against
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * isDateProper('2019/1/2'); // => true
 */
export const isDateProper = val =>
  (/^(([1-2]{1}[0-9]{3})|([0-9]{2}))[-/.]?((1[0-2])|(0?[1-9]))[-/.]?((0?[1-9])|([1-2][0-9])|(3[0-1]))$/m).test(val)

/**
 * @name isEmail
 * @since v1.0.0
 * @category Is
 * @description Validates if a email is valid or not using the email regex
 * @param {String} val The value to validate against
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * isEmail('dusty@gmail.com'); // => true
 */
export const isEmail = val => {
  const emailRegex = /^[\w\u00c0-\u017f][\w.-_\u00c0-\u017f]*[\w\u00c0-\u017f]+[@][\w\u00c0-\u017f][\w.-_\u00c0-\u017f]*[\w\u00c0-\u017f]+\.[a-z]{2,4}$/i

  return emailRegex.test(val)
}

/**
 * @name isNumber
 * @since v1.0.0
 * @category Is
 * @description Validates if a provided value is a valid number or not
 * @param {String|Number} val The value to validate against
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * isNumber('2'); // => true
 * isNumber(2); // => true
 */
export const isNumber = val => !isNaN(val)

/**
 * @name isPositive
 * @since v1.0.0
 * @category Is
 * @description Validates if a provided value is a positive number
 * @param {String|Number} val The value to validate against
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * isPositive('2'); // => true
 * isPositive(2); // => true
 * isPositive(-2); // => false
 */
export const isPositive = val => !isNaN(val) && Number(val) >= 0

/**
 * @name isNegative
 * @since v1.0.0
 * @category Is
 * @description Validates if a provided value is a negative number
 * @param {String|Number} val The value to validate against
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * isNegative('-2'); // => true
 * isNegative(-2); // => true
 * isNegative(2); // => false
 */
export const isNegative = val => !isNaN(val) && Number(val) < 0

/**
 * @name isVin
 * @since v1.0.0
 * @category Is
 * @description Validates if a provided value is a valid vin number
 * @param {String} val The value to validate against
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * vin('JM1CW2BL8C0127808'); // => true
 */
export const isVin = val => {
  const vinRegex = /^[a-hj-npr-z0-9]{9}[a-hj-npr-tv-y1-9]{1}[a-hj-npr-z0-9]{7}$/i

  return vinRegex.test(val)
}

/**
 * @name isZip
 * @since v1.0.0
 * @category Is
 * @description Validates if a provided value is a correct American zip code
 * @param {String} val The value to validate against
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * isZip('44444'); // => true
 * isZip('232'); // => false
 */
export const isZip = val => (/^\d{5}(-\d{4})?$/).test(val)

/**
 * @name isCAPostalCode
 * @since v1.0.0
 * @category Is
 * @description Validates if a provided value is a valid CA postal Code
 * @param {String} val The value to validate against
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * isCAPostalCode('K1A0B1'); // => true
 * isCAPostalCode('44444'); // => false
 */
export const isCAPostalCode = val => (/^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1} *\d{1}[A-Z]{1}\d{1}$/i).test(val)

/**
 * @name isPhone
 * @since v1.0.0
 * @category Is
 * @description Validates if a provided value is a valid Phone number
 * @param {String} val The value to validate against
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * isPhone('555-666-7777'); // => true
 * isPhone('5556667777'); // => true
 */
export const isPhone = (val = '') => (/^[0-9]{10}$/).test(val.replace(/\W/g, ''))

/**
 * @name isLicensePlate
 * @since v1.0.0
 * @category Is
 * @description Validates if a provided value is a valid Phone number
 * @param {String} val The value to validate against
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * isLicensePlate('SSS1829'); // => true
 * isLicensePlate('SSS-1829'); // => true
 * isLicensePlate('SSSS 188'); // => false
 */
export const isLicensePlate = val => (/^([A-Z]|[0-9]){1,3}(\s|-|•)?([A-Z]|[0-9]){3,5}$/i).test(val)

/**
 * @name isVisaCard
 * @since v1.0.0
 * @category Is
 * @description Validates if a provided value is a valid Visa credit card
 * @param {Boolean} strict Determines if the card should be strictly validated
 * @param {String} val The value to validate against
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * const isVisa = isVisaCard(true);
 * isVisa('4111111111111111'); // => true
 *
 * // OR
 *
 * isVisaCard(true, '4111111111111111'); // => true
 * isVisaCard(true)('4111111111111111'); // => true
 */
export const isVisaCard = curry((strict, val) => {
  if (strict) {
    return luhn(val)
  }

  return (/^4[0-9]{15}$/).test(val)
})

/**
 * @name isVisaPanCard
 * @since v1.0.0
 * @category Is
 * @description Validates if a provided value is a valid Visa Pan credit card
 * @param {Boolean} strict Determines if the card should be strictly validated
 * @param {String} val The value to validate against
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * const visaPan = isVisaPanCard(true);
 * visaPan('4111111111111111222'); // => false
 *
 * // OR
 *
 * isVisaPanCard(true, '4111111111111111222'); // => false
 * isVisaPanCard(true)('4111111111111111222'); // => false
 * isVisaPanCard(false)('4111111111111111222'); // => true
 * // Since the provided number is a fake the luhn algorithm will fail it
 */
export const isVisaPanCard = curry((strict, val) => {
  if (strict) {
    return luhn(val)
  }

  return (/^4[0-9]{18}$/).test(val)
})

/**
 * @name isMasterCard
 * @since v1.0.0
 * @category Is
 * @description Validates if a provided value is a valid Master card
 * @param {Boolean} strict Determines if the card should be strictly validated
 * @param {String} val The value to validate against
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * const master = isMasterCard(true);
 * master('5511111111111111'); // => false
 *
 * // OR
 *
 * isMasterCard(true, '5511111111111111'); // => false
 * isMasterCard(true)('5511111111111111'); // => false
 * // Since the provided number is a fake the luhn algorithm will fail it
 */
export const isMasterCard = curry((strict, val) => {
  if (strict) {
    return luhn(val)
  }

  return (/^5[1-5][0-9]{14}$/).test(val)
})

/**
 * @name isAmexCard
 * @since v3.2.0
 * @category Is
 * @description Validates if a provided value is a valid American Express card
 * @param {Boolean} strict Determines if the card should be strictly validated
 * @param {String} val The value to validate against
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * const amex = isAmexCard(true);
 * amex('341111111111111'); // => false
 *
 * // OR
 *
 * isAmexCard(true, '341111111111111'); // => false
 * isAmexCard(true)('341111111111111'); // => false
 * isAmexCard(false)('341111111111111'); // => true
 * // Since the provided number is a fake the luhn algorithm will fail it
 */
export const isAmexCard = curry((strict, val) => {
  if (strict) {
    return luhn(val)
  }

  return (/^3(4|7)[0-9]{13}$/).test(val)
})

/**
 * @name isDiscoverCard
 * @since v1.0.0
 * @category Is
 * @description Validates if a provided value is a valid American Express card
 * @param {Boolean} strict Determines if the card should be strictly validated
 * @param {String} val The value to validate against
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * const discover = isDiscoverCard(true);
 * discover('6111111111111111'); // => false
 *
 * // OR
 *
 * isDiscoverCard(true, '6111111111111111'); // => false
 * isDiscoverCard(true)('6111111111111111'); // => false
 * isDiscoverCard(false, '6111111111111111'); // => true
 * // Since the provided number is a fake the luhn algorithm will fail it
 */
export const isDiscoverCard = curry((strict, val) => {
  if (strict) {
    return luhn(val)
  }

  return (/^6[0-9]{15}$/).test(val)
})

/**
 * @name isBelowMax
 * @since v1.0.0
 * @category Is
 * @description Validates if a provided value is a below the set maximum
 * @param {Number} m The max to validate against
 * @param {String} val The value to validate with
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * const below = isBelowMax(20);
 * below('19'); // => true
 *
 * // OR
 *
 * isBelowMax(20, '19'); // => true
 * isBelowMax(20)('19'); // => true
 */
export const isBelowMax = curry((m, val) => {
  if (m.max != null) {
    return !isNaN(val) && Number(val) < m.max
  }

  return !isNaN(val) && Number(val) < m
})

/**
 * @name isAboveMin
 * @since v1.0.0
 * @category Is
 * @description Validates if a provided value is a below the set minimum
 * @param {Number} m The min to validate against
 * @param {String} val The value to validate with
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * const above = isAboveMin(15);
 * above('19'); // => true
 *
 * // OR
 *
 * isAboveMin(15, '19'); // => true
 * isAboveMin(15)('19'); // => true
 */
export const isAboveMin = curry((m, val) => {
  if (m.min != null) {
    return !isNaN(val) && Number(val) > m.min
  }

  return !isNaN(val) && Number(val) > m
})

/**
 * @name isBetween
 * @since v5.0.0
 * @category Is
 * @description Checks if the provided value is between the max and min
 * @param {Object} m The object containing max and min values
 * @param {Number} m.max The maximum the value should be below
 * @param {Number} m.min The minimum the value should be above
 * @param {Number} val The value to compare
 * @returns {Boolean} Whether or not the number is between the max and min numbers
 * @example
 * isBetween({ max: 10, min: 5 }, 6) // => true
 * isBetween({ max: 10, min: 5 }, 3) // => false
 *
 * // It's also curried
 * const fn = isBetween({ max: 10, min: 5 })
 *
 * fn(6) // => true
 * fn(3) // => false
 */
const _isBetween = (m, val) => !isNaN(val) && between(m.min, m.max, val)

export const isBetween = curry(_isBetween)
