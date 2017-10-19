/* eslint-disable max-len */
import * as hasMethods from './has/index';
import * as isMethods from './is/index';
import * as meetsMethods from './meets/index';
import * as multiMethods from './multi/index';
import * as noMethods from './no/index';
import { each, ensureArray, extend, format, isObject, validateSchema } from './_internals/index';

const methods = extend({}, hasMethods, isMethods, meetsMethods, noMethods, multiMethods);

const runValidate = (data, options, useMethods) => {
  const story = [];
  const curriedMethods = [
    'isBelowMax',
    'isAboveMin',
    'isEmail',
    'isVin',
    'isVisaCard',
    'isVisaPanCard',
    'isMasterCard',
    'isAmericanExpressCard',
    'isDiscoverCard',
    'meetsPassReq',
    'meetsMinMax'
  ];

  useMethods.forEach(currMethod => {
    const methodFn = methods[currMethod];
    const isValid = curriedMethods.indexOf(currMethod) !== -1 ? methodFn(options)(data) : methodFn(data, options);

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

  each(obj, (val, prop) => {
    if (Object.prototype.hasOwnProperty.call(useMethods, prop)) {
      results[prop] = runValidate(val, opts, useMethods[prop]);
    }
  });

  return format(results);
};

const allValidWhere = (obj, opts, useMethods) => {
  const results = {};

  each(obj, (val, prop) => {
    results[prop] = runValidate(val, opts, useMethods);
  });

  return results;
};

const validateObj = (data, opts, useMethods) => {
  if (isObject(useMethods)) {
    return validWhere(data, opts, useMethods);
  }

  if (Array.isArray(useMethods)) {
    return allValidWhere(data, opts, useMethods);
  }

  // Assume it's a string at this point
  return runValidate(data, opts, ensureArray(useMethods));
};

const validateArr = (data, opts, useMethods) => {
  const results = {};

  data.forEach(val => {
    results[val] = runValidate(val, opts, useMethods);
  });

  return results;
};

const simplyValid = options => data => {
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

  if (!validateSchema(opts.schema)) {
    throw new Error('No schema provided for validation');
  }

  if (isObject(data)) {
    return validateObj(data, opts, opts.schema);
  }
  if (Array.isArray(data)) {
    return validateArr(data, opts, ensureArray(opts.schema));
  }

  return runValidate(data, opts, ensureArray(opts.schema));
};

export default simplyValid;
