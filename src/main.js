/* eslint-disable max-len */
import curry from './_internals/curry'
import ensureArray from './_internals/ensure-array'
import extend from './_internals/extend'
import isObject from './_internals/isObject'
import setup from './_internals/setup'

const flatten = list =>
  list.reduce((acc, x) =>
    acc.concat(Array.isArray(x) ? flatten(x) : x), [])

const format = res => {
  const results = res.reduce((acc, { isValid, story }) => {
    if (!isValid) {
      acc.story.push(...story)
    }

    return acc
  }, {
    isValid: true,
    story: []
  })

  results.isValid = !results.story.length

  return results
}

const validate = (data, schema, methods) => {
  const story = []
  const schemaArr = ensureArray(schema)
  const dataArr = ensureArray(data)

  dataArr.forEach(d => {
    const results = schemaArr.reduce((acc, fn) => {
      console.log(fn)
      if (!methods[fn](d)) {
        acc.push({
          test: fn,
          value: d
        })
      }

      return acc
    }, [])

    story.push(...results)
  })

  return {
    isValid: !story.length,
    story
  }
}

const validateDataObj = (data, schema, methods) => {
  const keys = Object.keys(data)

  return keys.map(k => {
    const value = data[k]

    if (isObject(value)) {
      return validateDataObj(value, schema[k], methods)
    }

    return validate(value, schema[k], methods)
  })
}

const validateSchema = schema =>
  (Array.isArray(schema) && schema.length) ||
  (isObject(schema) && Object.keys(schema).length) ||
  Boolean(schema.length)

/**
 * @name simplyValid
 * @since v1.0.0
 * @category Main
 * @description The main validation functionality of simply valid
 * @param {Object} options The main options to setup simply_valid
 * @property {Any} schema The schema that the functionality of the module should be following
 * @property {Boolean} strictCard Whether or not we should run card validation strictly or not
 * @property {Number} max The max number used for max validation methods
 * @property {Number} min The min number used for min validation methods
 * @property {Number} maxLen The maximum length a value can be
 * @property {Number} minLen The minimum length a value can be
 * @param {Any} data The data that we want to run the validation functionality against
 * @returns {Object} Returns an object with a isValid prop telling if validation was a success, and a story which is an array of objects of which validation methods failed
 *
 * @example
 * // Simple validation schemas
 *
 * const validate = simplyValid({
    schema: 'hasValue'
  });

  validate('test'); // => { isValid: true }
  validate(''); // => { isValid: false, story: [{ test: 'hasValue', value: '' }] }
  simplyValid({
    schema: 'hasValue'
  }, 'test'); // => { isValid: true }
 *
 * // Array Validation Schemas
 *
 * const validate = simplyValid({
 *  schema: ['hasValue', 'hasNumber']
 * });
 * validate('test1123'); // => { isValid: true }
 * validate('test'); // => { isValid: false, story: [{ test: 'hasNumbers', value: 'test' }] }
 *
 * // Object Validation Schema
 *
 * const validate = simplyValid({
 *  schema: {
 *    test: ['hasNumbers', 'hasLetters'],
 *    thing: 'hasValue',
 *    nestedThing: ['isPositive', 'hasNumbers']
 *  }
 * });
 * validate({
 *   test: 'cool112',
 *   thing: 'test',
 *   other: {
 *     nestedThing: '1234'
 *   }
 * }); // => { isValid: true }
 */
const simplyValid = curry((options, data) => {
  const defaults = {
    schema: [],
    strictCard: false,
    max: Infinity,
    min: -Infinity,
    maxLen: 100,
    minLen: 1
  }
  const opts = extend({}, defaults, options)
  const setMethods = setup(opts)

  console.log(setMethods)

  if (!validateSchema(opts.schema)) {
    throw new Error('The schema is either invalid or one was not provided for validation')
  }

  if (isObject(data)) {
    return format(flatten(validateDataObj(data, opts.schema, setMethods)))
  }

  return validate(data, opts.schema, setMethods)
})

export default simplyValid
