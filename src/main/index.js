/* eslint-disable max-len */
import * as methods from '../esm';
import curry from '../_internals/curry';
import each from '../_internals/each';
import ensureArray from '../_internals/ensureArray';
import extend from '../_internals/extend';
import format from '../_internals/format';
import isObject from '../_internals/isObject';
import validateSchema from '../_internals/validateSchema';

let setMethods = {};

const setup = opts => {
  const results = {};

  for (const prop in methods) {
    const func = methods[prop];

    if (typeof func('test') === 'function') {
      results[prop] = func(opts);
    } else {
      results[prop] = func;
    }
  }

  return results;
};

const validate = (data, options, useMethods) => {
  const story = [];

  useMethods.forEach(currMethod => {
    const isValid = setMethods[currMethod](data);

    if (!isValid) {
      // If something comes back as a failure we need to push it into the story
      story.push({
        // What test did we fail on
        test: currMethod,
        // The value used when the failure happened
        value: data
      });
    }
  });

  if (story.length) {
    return {
      isValid: false,
      story
    };
  }

  return { isValid: true };
};

const validWhere = (obj, opts, useMethods) => {
  const results = {};

  if (isObject(useMethods)) {
    each(obj, (val, prop) => {
      if (Object.prototype.hasOwnProperty.call(useMethods, prop)) {
        results[prop] = validate(val, opts, ensureArray(useMethods[prop]));
      }
    });
  } else {
    each(obj, (val, prop) => {
      results[prop] = validate(val, opts, useMethods);
    });
  }

  return format(results);
};

const runSchemaObj = (data, opts, useMethods) => {
  if (isObject(useMethods) || Array.isArray(useMethods)) {
    return validWhere(data, opts, useMethods);
  }

  // Assume it's a string at this point
  return validate(data, opts, ensureArray(useMethods));
};

const runSchemaArr = (data, opts, useMethods) => {
  const results = {};
  const arrResults = [];

  data.forEach(val => {
    if (isObject(val)) {
      arrResults.push(runSchemaObj(val, opts, useMethods));
    } else {
      results[val] = validate(val, opts, ensureArray(useMethods));
    }
  });

  return Object.keys(results).length ? results : format(arrResults);
};

/**
 * @name simplyValid
 * @description The main validation functionality of simply valid
 * @param {Object} options The main options to setup simply_valid
 * @property {Any} schema The schema that the functionality of the module should be following
 * @property {Boolean} strictCard Whether or not we should run card validation strictly or not
 * @property {Number} max The max number used for max validation methods
 * @property {Number} min The min number used for min validation methods
 * @property {RegExp} vinPattern The RegExp pattern for vin validation
 * @property {RegExp} emailPattern The RegExp pattern for email validation
 * @property {RegExp} passwordPattern The RegExp pattern for password validation
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
    vinPattern: /^[a-hj-npr-z0-9]{9}[a-hj-npr-tv-y1-9]{1}[a-hj-npr-z0-9]{7}$/i,
    emailPattern: /^[\w\u00c0-\u017f][\w.-_\u00c0-\u017f]*[\w\u00c0-\u017f]+[@][\w\u00c0-\u017f][\w.-_\u00c0-\u017f]*[\w\u00c0-\u017f]+\.[a-z]{2,4}$/i,
    passwordPattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/
  };
  const opts = extend({}, defaults, options);

  setMethods = setup(opts);

  if (!validateSchema(opts.schema)) {
    throw new Error('No schema provided for validation');
  }

  if (isObject(data)) {
    return runSchemaObj(data, opts, opts.schema);
  }
  if (Array.isArray(data)) {
    return runSchemaArr(data, opts, opts.schema);
  }

  return validate(data, opts, ensureArray(opts.schema));
});

export default simplyValid;
