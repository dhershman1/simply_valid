import { curry, ensureArray, plan, type, whole } from 'kyanite'
import * as is from './is'
import * as no from './no'
import * as meets from './meets'
import * as has from './has'
import * as combo from './combo'

const validationMethods = {
  ...is,
  ...no,
  ...meets,
  ...has,
  ...combo
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

const runValidate = (data, schema, methods) => {
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

    if (type(value) === 'Object') {
      return acc.concat(validateDataObj(value, schema[k], methods))
    }

    return acc.concat([runValidate(value, schema[k], methods)])
  }, [])

const validateSchema = schema =>
  (Array.isArray(schema) && schema.length) ||
  (type(schema) === 'Object' && Object.keys(schema).length) ||
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
 * @name validate
 * @since v1.0.0
 * @category Main
 * @description The main validation functionality of simply valid
 * @param {Object} options The main options to setup simply_valid
 * @property {Any} schema The schema that the functionality of the module should be following
 * @property {Boolean} partial Determines whether objects with missing values should fail or not
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
 * const valid = validate({
    schema: hasValue
  });

  valid(test); // => { isValid: true, story: [] }
  valid(); // => { isValid: false, story: [{ test: hasValue, value: undefined }] }
  validate({
    schema: hasValue
  }, test); // => { isValid: true, story: [] }
 *
 * // Array Validation Schemas
 *
 * const valid = validate({
 *  schema: [hasValue, hasNumber]
 * });
 * valid(test1123); // => { isValid: true, story: [] }
 * valid(test); // => { isValid: false, story: [{ test: hasNumbers, value: test }] }
 *
 * // Object Validation Schema
 *
 * const valid = validate({
 *  schema: {
 *    test: [hasNumbers, hasLetters],
 *    thing: hasValue,
 *    other: {
 *      nestedThing: [isPositive, hasNumbers]
 *    }
 *  }
 * });
 * valid({
 *   test: cool112,
 *   thing: test,
 *   other: {
 *     nestedThing: 1234
 *   }
 * }); // => { isValid: true, story: [] }
 *
 * // Using partial
 * validate({
 *   schema: {
 *     zip: isNumber
 *     address: hasLetters
 *   },
 *   partial: false
 * }, { zip: 12345 }) // => { isValid: false, story: [{ test: 'hasLetters', value: undefined }] }
 */
const validate = (options, data) => {
  const defaults = {
    schema: [],
    partial: true,
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

  if (type(data) === 'Object') {
    return { isValid: plan(opts.schema, data) }
    // return format(validateDataObj(data, opts.schema, fns))
  }

  return runValidate(data, opts.schema, fns)
}

export default curry(validate)
