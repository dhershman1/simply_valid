import curry from './_internals/curry'

/**
 * @name meetsMinMax
 * @since v1.0.0
 * @category Meets
 * @description Validates if the value contains numbers or not
 * @param {Number} $0.min The min value to compare to
 * @param {Number} $0.max The min value to compare to
 * @param {String} val The value to validate against
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * const minMax = meetsMinMax({
 *   min: 0,
 *   max: 10
 * });
 * const result = minMax(5); // => true
 *
 * // OR
 *
 * const result = meetsMinMax('11'); // => false
 * const result = meetsMinMax('eew2211'); // => true
 * const result = meetsMinMax('eerrt'); // => true
 */
export const meetsMinMax = curry(({
  min,
  max
}, val) => !isNaN(val) && (Number(val) >= min && Number(val) <= max))

/**
 * @name meetsYearStandard
 * @since v1.0.0
 * @category Meets
 * @description Validates if the value is a valid year string
 * @param {String} val The value to validate against
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * const result = meetsYearStandard('2017'); // => true
 * const result = meetsYearStandard('17'); // => true
 * const result = meetsYearStandard('178'); // => false
 */
export const meetsYearStandard = val => (/(^[0-9]{2}$)|(^[1-2]{1}[0-9]{3}$)/).test(val)

/**
 * @name meetsCVN
 * @since v1.0.0
 * @category Meets
 * @description Validates if the value is a valid CVN code
 * @param {String} val The value to validate against
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * const result = meetsCVN('201'); // => true
 * const result = meetsCVN('1777'); // => false
 */
export const meetsCVN = val => val.length === 3 && (/[0-9]/).test(val)

/**
 * @name meetsCVNAmex
 * @since v1.0.0
 * @category Meets
 * @description Validates if the value is a valid Amex CVN code
 * @param {String} val The value to validate against
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * const result = meetsCVNAmex('201'); // => false
 * const result = meetsCVNAmex('1777'); // => true
 */
export const meetsCVNAmex = val => val.length === 4 && (/[0-9]/).test(val)

/**
 * @name meetsTreadDepth
 * @since v1.0.0
 * @category Meets
 * @description Validates if the value is a valid treaddepth style
 * @param {String} val The value to validate against
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * const result = meetsTreadDepth('12'); // => true
 * const result = meetsTreadDepth('AA'); // => false
 */
export const meetsTreadDepth = val => (/^(([0-1]?[0-9]|2[0-1])(\.[0-9])?|22)$/i).test(val)

/**
 * @name meetsPassReq
 * @since v1.0.0
 * @category Meets
 * @description Validates if the value is a valid treaddepth style
 * @param {(RegExp|String)} pass Accepts a RegexExp or the 'default' string to use the default regex
 * @param {String} val The value to validate against
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * const pass = meetsPassReq('default');
 * const result = pass('cOol12$d'); // => true
 *
 * // OR
 *
 * const result = meetsPassReq('default', 'cOol12$d'); // => true
 * const result = meetsPassReq('default')('cOol12$d') // => true
 * const result = meetsPassReq('default', 'AA'); // => false
 */
export const meetsPassReq = curry((pass, val) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/

  if (pass === 'default') {
    return passwordRegex.test(val)
  }
  if (pass.passwordPattern) {
    return pass.passwordPattern.test(val)
  }

  return pass.test(val)
})
