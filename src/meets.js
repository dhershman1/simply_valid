import { test } from 'kyanite'

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
 * import { meetsYearStandard } from 'simply_valid'
 *
 * meetsYearStandard('2017'); // => true
 * meetsYearStandard('17'); // => true
 * meetsYearStandard('178'); // => false
 */
export const meetsYearStandard = val => test(/(^[0-9]{2}$)|(^[1-2]{1}[0-9]{3}$)/, val)

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
 * import { meetsTreadDepth } from 'simply_valid'
 *
 * meetsTreadDepth('12'); // => true
 * meetsTreadDepth('AA'); // => false
 */
export const meetsTreadDepth = val => test(/^(([0-1]?[0-9]|2[0-1])(\.[0-9])?|22)$/i, val)

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
 * import { meetsPassReq } from 'simply_valid'
 *
 * meetsPassReq('cOol12$d'); // => true
 */
export const meetsPassReq = val => test(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/, val)
