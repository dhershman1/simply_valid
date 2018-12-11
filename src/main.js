import { always, branch, curry, ensureArray, eq, type } from 'kyanite'

/**
 * @private
 * @function
 * Runs an array of validation functions against given data
 * @param {Array} methods An Array of validation functions
 * @param {Array} data The data to validate
 */
const arrValidate = curry((methods, data) => {
  if (!Array.isArray(methods)) {
    return data.every(methods)
  }

  for (let i = 0, len = methods.length; i < len; i++) {
    const fn = methods[i]

    if (!ensureArray(data).every(fn)) {
      return {
        isValid: false,
        rule: fn.name.replace('_', ''),
        data
      }
    }
  }

  return {
    isValid: true
  }
})

/**
 * @function
 * @private
 * Runs a validation schema against a provided object of data
 * If the schema is an object the data provided must also be an object
 * @param {Object} schema The object schema of validation methods
 * @param {Object} data The data object to validate
 */
const objValidate = (schema, data) => {
  if (type(data) !== 'Object') {
    throw new TypeError('Data must be an object if the provided schema is an object')
  }

  const keys = Object.keys(schema)

  for (let i = 0, len = keys.length; i < len; i++) {
    const k = keys[i]
    const fn = schema[k]
    const value = data[k]

    // Run the proper function to handle these situations
    const valid = branch(
      always(Array.isArray(fn)),
      arrValidate(fn),
      fn,
      value
    )

    // A nested validate call failed, so back out and show that return
    if (eq(valid.isValid, false)) {
      return valid
    }

    // Check to see if the function passed or not
    if (!valid) {
      return {
        isValid: false,
        prop: k,
        rule: fn.name.replace('_', ''),
        data: value
      }
    }
  }

  return {
    isValid: true
  }
}

/**
 * @name validate
 * @since v1.0.0
 * @function
 * @category Main
 * @description The main validation functionality of simply valid
 * @param {Object|Array} schema The schema that the functionality of the module should be following
 * @param {Any} data The data that we want to run the validation functionality against
 * @returns {Object} Returns an object with a isValid prop telling if validation was a success, and a story which is an array of objects of which validation methods failed
 *
 * @example
 * import { validate, isNumber, hasNumber, hasLetters, noNumbers } from 'simply_valid'
 *
 * // Validating Objects
 * validate({ zip: isNumber, address: [hasNumbers, hasLetters] }, { zip: 12345, address: '123 Test St' })
 * // => { isValid: true }
 *
 * // Validating Nested Objects (Call validate again on nested objects)
 * validate({
 *   zip: isNumber,
 *   address: validate({
 *     num: isNumber,
 *     street: [noNumbers, hasLetters]
 *   })
 * }, {
 *   zip: 12345,
 *   address: {
 *     num: 123,
 *     stree: 'Test St'
 *   }
 * })
 * // => { isValid: true }
 *
 * // Validating Arrays
 * validate([isNumber, isPositive], [1, 2, 3, 4, 5])
 * // => { isValid: true }
 *
 * // This is also all curried
 * const fn = validate({ zip: isNumber, address: [hasLetters, hasNumbers] })
 *
 * fn({ zip: 12345, address: '123 Test St' }) // => { isValid: true }
 */
const validate = (schema, data) => {
  if (!Array.isArray(schema) && type(schema) !== 'Object') {
    throw new TypeError('The Schema should either be an Array or Object')
  }

  if (Array.isArray(schema)) {
    return arrValidate(schema, data)
  }

  return objValidate(schema, data)
}

export default curry(validate)
