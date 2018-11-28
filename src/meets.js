import _curry3 from './internal/_curry3'

/**
 * @name meetsMinMax
 * @since v1.0.0
 * @function
 * @category Meets
 * @description Validates if the value contains numbers or not
 * @param {Number} min The min value to compare to
 * @param {Number} max The min value to compare to
 * @param {String} val The value to validate against
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * const minMax = meetsMinMax({
 *   min: 0,
 *   max: 10
 * });
 *
 * minMax(5); // => true
 *
 * // OR
 *
 * meetsMinMax({ min: 0, max: 10 }, '11'); // => false
 */
export const meetsMinMax = _curry3((min, max, val) => !isNaN(val) && (Number(val) >= min && Number(val) <= max))

/**
 * @name meetsYearStandard
 * @since v1.0.0
 * @function
 * @category Meets
 * @description Validates if the value is a valid year string
 * @param {String} val The value to validate against
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * meetsYearStandard('2017'); // => true
 * meetsYearStandard('17'); // => true
 * meetsYearStandard('178'); // => false
 */
export const meetsYearStandard = val => (/(^[0-9]{2}$)|(^[1-2]{1}[0-9]{3}$)/).test(val)

/**
 * @name meetsTreadDepth
 * @since v1.0.0
 * @function
 * @category Meets
 * @description Validates if the value is a valid treaddepth style
 * @param {String} val The value to validate against
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * meetsTreadDepth('12'); // => true
 * meetsTreadDepth('AA'); // => false
 */
export const meetsTreadDepth = val => (/^(([0-1]?[0-9]|2[0-1])(\.[0-9])?|22)$/i).test(val)

/**
 * @name meetsPassReq
 * @since v1.0.0
 * @function
 * @category Meets
 * @description Validates if the value is a valid treaddepth style
 * @param {String} val The value to validate against
 * @returns {Boolean} Returns true or false based on the validation test
 *
 * @example
 * meetsPassReq('cOol12$d'); // => true
 */
export const meetsPassReq = val => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/

  return passwordRegex.test(val)
}
