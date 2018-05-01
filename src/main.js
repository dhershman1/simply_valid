/* eslint-disable max-len */
import * as methods from './index'
import curry from './_internals/curry'
import each from './_internals/each'
import ensureArray from './_internals/ensure-array'
import isObject from './_internals/isObject'

let setMethods = {}

const extend = (...args) => args.reduce((acc, x) => {
  let key = ''

  for (key in x) {
    acc[key] = x[key]
  }

  return acc
}, {})

const format = obj => {
  const results = {
    isValid: true,
    story: []
  }

  for (const prop in obj) {
    if (obj[prop].isValid) {
      continue
    }

    const [story] = obj[prop].story

    story.propName = prop
    results.story.push(story)
  }

  if (results.story.length) {
    results.isValid = false

    return results
  }

  return results
}

const setup = opts => {
  const results = {}

  for (const prop in methods) {
    const func = methods[prop]

    if (typeof func('test') === 'function') {
      results[prop] = func(opts)
    } else {
      results[prop] = func
    }
  }

  return results
}

const validate = (data, options, useMethods) => {
  const story = []

  useMethods.forEach(currMethod => {
    const isValid = setMethods[currMethod](data)

    if (!isValid) {
      // If something comes back as a failure we need to push it into the story
      story.push({
        // What test did we fail on
        test: currMethod,
        // The value used when the failure happened
        value: data
      })
    }
  })

  if (story.length) {
    return {
      isValid: false,
      story
    }
  }

  return { isValid: true }
}

const validWhere = (obj, opts, useMethods) => {
  const results = {}

  if (isObject(useMethods)) {
    each(obj, (val, prop) => {
      if (Object.prototype.hasOwnProperty.call(useMethods, prop)) {
        results[prop] = validate(val, opts, ensureArray(useMethods[prop]))
      }
    })
  } else {
    each(obj, (val, prop) => {
      results[prop] = validate(val, opts, useMethods)
    })
  }

  return format(results)
}

const runSchemaObj = (data, opts, useMethods) => {
  if (isObject(useMethods) || Array.isArray(useMethods)) {
    return validWhere(data, opts, useMethods)
  }

  // Assume it's a string at this point
  return validate(data, opts, ensureArray(useMethods))
}

const runSchemaArr = (data, opts, useMethods) => {
  const results = {}
  const arrResults = []

  data.forEach(val => {
    if (isObject(val)) {
      arrResults.push(runSchemaObj(val, opts, useMethods))
    } else {
      results[val] = validate(val, opts, ensureArray(useMethods))
    }
  })

  return Object.keys(results).length ? results : format(arrResults)
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
    min: -Infinity
  }
  const opts = extend({}, defaults, options)

  setMethods = setup(opts)

  if (!validateSchema(opts.schema)) {
    throw new Error('No schema provided for validation')
  }

  if (isObject(data)) {
    return runSchemaObj(data, opts, opts.schema)
  }
  if (Array.isArray(data)) {
    return runSchemaArr(data, opts, opts.schema)
  }

  return validate(data, opts, ensureArray(opts.schema))
})

export default simplyValid
