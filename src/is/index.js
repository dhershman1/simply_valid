/* eslint-disable max-len */

import curry from '../_internals/curry';
import luhn from '../_internals/luhn';

const emailRegex = /^[\w\u00c0-\u017f][\w.-_\u00c0-\u017f]*[\w\u00c0-\u017f]+[@][\w\u00c0-\u017f][\w.-_\u00c0-\u017f]*[\w\u00c0-\u017f]+\.[a-z]{2,4}$/i;
const vinRegex = /^[a-hj-npr-z0-9]{9}[a-hj-npr-tv-y1-9]{1}[a-hj-npr-z0-9]{7}$/i;

/**
 * @name isDate
 * @description Validates if a normal date is valid or not
 * @param {String} val The value to validate against
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * const result = isDate('1/2/2019'); // => true
 */
export const isDate = val => (/^((1[0-2])|(0?[1-9]))[-/.]?((0?[1-9])|([1-2][0-9])|(3[0-1]))[-/.]?(([1-2]{1}[0-9]{3})|([0-9]{2}))$/m).test(val);

/**
 * @name isDateShort
 * @description Validates if a short date is valid or not
 * @param {String} val The value to validate against
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * const result = isDateShort('1/19'); // => true
 */
export const isDateShort = val => (/^((1[0-2])|(0?[1-9]))[-/.]?((0?[1-9])|([1-2][0-9])|(3[0-1]))[-/.]?$/m).test(val);

/**
 * @name isDateProper
 * @description Validates if a "Proper" date is valid or not
 * @param {String} val The value to validate against
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * const result = isDateProper('2019/1/2'); // => true
 */
export const isDateProper = val => (/^(([1-2]{1}[0-9]{3})|([0-9]{2}))[-/.]?((1[0-2])|(0?[1-9]))[-/.]?((0?[1-9])|([1-2][0-9])|(3[0-1]))$/m).test(val);

/**
 * @name isEmail
 * @description Validates if a email is valid or not using the email regex
 * @param {RegExp|Void} email The Regex to use for validating the email string (pass falsy value for default)
 * @param {String} val The value to validate against
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * const result = isEmail('default', 'dusty@gmail.com'); // => true
 * const result = isEmail('default')('dusty@gmail.com'); // => true
 */
export const isEmail = curry((email, val) => {
  if (email === 'default') {
    return emailRegex.test(val);
  }
  if (email.emailPattern) {
    return email.emailPattern.test(val);
  }

  return email.test(val);
});

/**
 * @name isNumber
 * @description Validates if a provided value is a valid number or not
 * @param {String|Number} val The value to validate against
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * const result = isNumber('2'); // => true
 * const result = isNumber(2); // => true
 */
export const isNumber = val => !isNaN(val);

/**
 * @name isPositive
 * @description Validates if a provided value is a positive number
 * @param {String|Number} val The value to validate against
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * const result = isPositive('2'); // => true
 * const result = isPositive(2); // => true
 * const result = isPositive(-2); // => false
 */
export const isPositive = val => !isNaN(val) && Number(val) >= 0;

/**
 * @name isNegative
 * @description Validates if a provided value is a negative number
 * @param {String|Number} val The value to validate against
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * const result = isNegative('-2'); // => true
 * const result = isNegative(-2); // => true
 * const result = isNegative(2); // => false
 */
export const isNegative = val => !isNaN(val) && Number(val) < 0;

/**
 * @name isVin
 * @description Validates if a provided value is a valid vin number
 * @param {RegExp|Void} vin The Regex to use for validating the vin string (pass falsy value for default)
 * @param {String} val The value to validate against
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * const result = isVin('default', 'JM1CW2BL8C0127808'); // => true
 * const result = isVin('default')('JM1CW2BL8C0127808'); // => true
 */
export const isVin = curry((vin, val) => {
  if (vin === 'default') {
    return vinRegex.test(val);
  }
  if (vin.vinPattern) {
    return vin.vinPattern.test(val);
  }

  return vin.test(val);
});

/**
 * @name isZip
 * @description Validates if a provided value is a correct American zip code
 * @param {String} val The value to validate against
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * const result = isZip('44444'); // => true
 * const result = isZip('232'); // => false
 */
export const isZip = val => (/^\d{5}(-\d{4})?$/).test(val);

/**
 * @name isCAPostalCode
 * @description Validates if a provided value is a valid CA postal Code
 * @param {String} val The value to validate against
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * const result = isZip('K1A0B1'); // => true
 * const result = isZip('44444'); // => false
 */
export const isCAPostalCode = val => (/^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1} *\d{1}[A-Z]{1}\d{1}$/i).test(val);

/**
 * @name isPhone
 * @description Validates if a provided value is a valid Phone number
 * @param {String} val The value to validate against
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * const result = isPhone('555-666-7777'); // => true
 * const result = isPhone('5556667777'); // => true
 */
export const isPhone = val => (/^[0-9]{10}$/).test(val.replace(/\W/g, ''));

/**
 * @name isLicensePlate
 * @description Validates if a provided value is a valid Phone number
 * @param {String} val The value to validate against
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * const result = isLicensePlate('SSS1829'); // => true
 * const result = isLicensePlate('SSS-1829'); // => true
 * const result = isLicensePlate('SSSS 188'); // => false
 */
export const isLicensePlate = val => (/^([A-Z]|[0-9]){1,3}(\s|-|•)?([A-Z]|[0-9]){3,5}$/i).test(val);

/**
 * @name isVisaCard
 * @description Validates if a provided value is a valid Visa credit card
 * @param {Boolean|Void} strict Determines if the card should be strictly validated
 * @param {String} val The value to validate against
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * const result = isVisaCard(true, '4111111111111111'); // => true
 * const result = isVisaCard(true)('4111111111111111'); // => true
 */
export const isVisaCard = curry((strict, val) => {
  if (strict) {
    return luhn(val);
  }

  return (/^4[0-9]{15}$/).test(val);
});

/**
 * @name isVisaPanCard
 * @description Validates if a provided value is a valid Visa Pan credit card
 * @param {Boolean|Void} strict Determines if the card should be strictly validated
 * @param {String} val The value to validate against
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * const result = isVisaPanCard(true, '4111111111111111222'); // => true
 * const result = isVisaPanCard(true)('4111111111111111222'); // => true
 */
export const isVisaPanCard = curry((strict, val) => {
  if (strict) {
    return luhn(val);
  }

  return (/^4[0-9]{18}$/).test(val);
});

/**
 * @name isMasterCard
 * @description Validates if a provided value is a valid Master card
 * @param {Boolean|Void} strict Determines if the card should be strictly validated
 * @param {String} val The value to validate against
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * const result = isMasterCard(true, '5387109830289055'); // => true
 * const result = isMasterCard(true)('5387109830289055'); // => true
 */
export const isMasterCard = curry((strict, val) => {
  if (strict) {
    return luhn(val);
  }

  return (/^5[1-5][0-9]{14}$/).test(val);
});

/**
 * @name isAmexCard
 * @description Validates if a provided value is a valid American Express card
 * @param {Boolean|Void} strict Determines if the card should be strictly validated (pass true or leave empty value for default)
 * @param {String} val The value to validate against
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * const result = isMasterCard(true, '341111111111111'); // => true
 * const result = isMasterCard(true)('341111111111111'); // => true
 */
export const isAmexCard = curry((strict, val) => {
  if (strict) {
    return luhn(val);
  }

  return (/^3(4|7)[0-9]{13}$/).test(val);
});

/**
 * @name isAmericanExpressCard
 * @description Validates if a provided value is a valid American Express card (depricated)
 * @param {Boolean|Void} strict Determines if the card should be strictly validated
 * @param {String} val The value to validate against
 * @returns {Boolean} Returns true or false based on the validation test
 * @deprecated in favor of isAmexCard
 *
 * @example
 * const result = isAmericanExpressCard(true, '341111111111111'); // => true
 * const result = isAmericanExpressCard(true)('341111111111111'); // => true
 */
export const isAmericanExpressCard = isAmexCard;

/**
 * @name isDiscoverCard
 * @description Validates if a provided value is a valid American Express card (depricated)
 * @param {Boolean|Void} strict Determines if the card should be strictly validated
 * @param {String} val The value to validate against
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * const result = isDiscoverCard(true, '6111111111111111'); // => true
 * const result = isDiscoverCard(true)('6111111111111111'); // => true
 */
export const isDiscoverCard = curry((strict, val) => {
  if (strict) {
    return luhn(val);
  }

  return (/^6[0-9]{15}$/).test(val);
});

/**
 * @name isBelowMax
 * @description Validates if a provided value is a below the set maximum
 * @param {Number} m The max to validate against
 * @param {String} val The value to validate with
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * const result = isBelowMax(20, '19'); // => true
 * const result = isBelowMax(20)('19'); // => true
 */
export const isBelowMax = curry((m, val) => {
  if (m.max) {
    return !isNaN(val) && Number(val) < m.max;
  }

  return !isNaN(val) && Number(val) < m;
});

/**
 * @name isAboveMin
 * @description Validates if a provided value is a below the set minimum
 * @param {Number} m The min to validate against
 * @param {String} val The value to validate with
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * const result = isAboveMin(15, '19'); // => true
 * const result = isAboveMin(15)('19'); // => true
 */
export const isAboveMin = curry((m, val) => {
  if (m.min) {
    return !isNaN(val) && Number(val) > m.min;
  }

  return !isNaN(val) && Number(val) > m;
});
