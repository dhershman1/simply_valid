import extend from './extend'
import isObject from './isObject'
import * as methods from '../index'

const set = (fn, opts) => {
  if (typeof fn('test') === 'function') {
    return fn(opts)
  }

  return fn
}

const arrSchema = (opts, schema) => {
  const useSchema = schema || opts.schema

  return useSchema.reduce((acc, fn) => {
    acc[fn] = set(methods[fn], opts)

    return acc
  }, {})
}

const objSchema = (opts, schema) => {
  const useSchema = schema || opts.schema
  let results = {}

  for (const prop in useSchema) {
    const current = useSchema[prop]

    if (Array.isArray(current)) {
      results = extend({}, results, arrSchema(opts, current))
      continue
    }

    if (isObject(current)) {
      results = extend({}, results, objSchema(opts, current))
      continue
    }

    if (methods[current]) {
      results[current] = set(methods[current], opts)
    }
  }

  return results
}

export default (opts) => {
  const setting = {}

  if (isObject(opts.schema)) {
    return objSchema(opts)
  }

  if (Array.isArray(opts.schema)) {
    return arrSchema(opts)
  }

  setting[opts.schema] = set(methods[opts.schema], opts)

  return setting
}
