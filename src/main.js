/* eslint-disable max-len */
import curry from './_internals/curry'
import * as validationMethods from './index'

const isObject = x => Object.prototype.toString.call(x) === '[object Object]'

const ensureArray = val => {
  if (Array.isArray(val)) {
    return val
  }

  if (val === void 0) {
    return []
  }

  return [val]
}

// Format the response to keep it consistent
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

const validateDataObj = (data, schema, methods) =>
  Object.keys(data).reduce((acc, k) => {
    const value = data[k]

    if (isObject(value)) {
      return acc.concat(validateDataObj(value, schema[k], methods))
    }

    return acc.concat([validate(value, schema[k], methods)])
  }, [])

const validateSchema = schema =>
  (Array.isArray(schema) && schema.length) ||
  (isObject(schema) && Object.keys(schema).length) ||
  Boolean(schema.length)

const setup = (methods, opts) =>
  Object.keys(methods).reduce((acc, k) => {
    if (typeof methods[k]() === 'function') {
      acc[k] = methods[k](opts)
    } else {
      acc[k] = methods[k]
    }

    return acc
  }, {})

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
 *    other: {
 *      nestedThing: ['isPositive', 'hasNumbers']
 *    }
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
  const opts = Object.keys(options).reduce((acc, key) => {
    if (acc[key]) {
      acc[key] = options[key]
    }

    return acc
  }, defaults)

  const fns = setup(validationMethods, opts)

  if (!validateSchema(opts.schema)) {
    throw new Error('The schema is either invalid or one was not provided for validation')
  }

  if (isObject(data)) {
    return format(validateDataObj(data, opts.schema, fns))
  }

  return validate(data, opts.schema, fns)
})

export default simplyValid
