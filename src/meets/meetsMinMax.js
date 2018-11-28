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
 * meetsMinMax(0, 10, 11) // => false
 *
 * // It's also curried
 *
 * const fn = meetsMinMax(0, 10)
 *
 * fn(11) // => false
 * fn(9) // => true
 */
function init (...args) {
  const [min, max, val] = args

  // Build an internal currying tool that still provides the function
  // And it's name for our report in case it fails
  switch (args.length) {
    case 0:
      return init
    case 1:
      return function meetsMinMax (_max, _val) {
        if (!_val) {
          return function meetsMinMax (value) {
            return init(min, _max, value)
          }
        }

        return init(min, _max, _val)
      }
    case 2:
      return function meetsMinMax (_val) {
        return init(min, max, _val)
      }
    default:
      return !isNaN(val) && (Number(val) >= min && Number(val) <= max)
  }
}

export default init
