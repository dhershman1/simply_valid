import { curry, type } from 'kyanite'

const validateSchema = schema =>
  (Array.isArray(schema) && schema.length) ||
  (type(schema) === 'Object' && Object.keys(schema).length) ||
  Boolean(schema.length)

/**
 * @name validate
 * @since v1.0.0
 * @function
 * @category Main
 * @description The main validation functionality of simply valid
 * @param {Object} options The main options to setup simply_valid
 * @property {Any} schema The schema that the functionality of the module should be following
 * @property {Boolean} partial Determines whether objects with missing values should fail or not
 * @param {Any} data The data that we want to run the validation functionality against
 * @returns {Object} Returns an object with a isValid prop telling if validation was a success, and a story which is an array of objects of which validation methods failed
 *
 * @example
 * const placeholder = true
 */
const validate = (options, data) => {
  const defaults = {
    schema: [],
    partial: true
  }
  const opts = Object.keys(options).reduce((acc, key) => {
    if (acc[key]) {
      acc[key] = options[key]
    }

    return acc
  }, defaults)

  if (!validateSchema(opts.schema)) {
    throw new Error('The schema is either invalid or one was not provided for validation')
  }
}

export default curry(validate)
