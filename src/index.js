/* eslint-disable max-len */
import * as hasMethods from './has/index';
import * as isMethods from './is/index';
import * as meetsMethods from './meets/index';
import * as multiMethods from './multi/index';
import * as noMethods from './no/index';
import { each, ensureArray, extend, format, isObject, validateSchema } from './_internals/index';

const methods = extend({}, hasMethods, isMethods, meetsMethods, noMethods, multiMethods);

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

const checkCurried = (options, currMethod, data) => {
  const methodFn = methods[currMethod];

  if (curriedMethods.indexOf(currMethod) !== -1) {
    return methodFn(options)(data);
  }

  return methodFn(data, options);
};

const validateArr = (data, options, useMethods) => {
  const results = { isValid: true };
  const story = [];

  data.forEach(val => {

    useMethods.forEach(currMethod => {
      const isValid = checkCurried(options, currMethod, val);

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

  });

  if (story.length) {
    return {
      isValid: false,
      story
    };
  }

  return results;
};

const validate = (data, options, useMethods) => {
  const story = [];

  useMethods.forEach(currMethod => {
    const isValid = checkCurried(options, currMethod, data);

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
      if (Array.isArray(val)) {
        results[prop] = validateArr(val, opts, useMethods[prop]);
      } else if (Object.prototype.hasOwnProperty.call(useMethods, prop)) {
        results[prop] = validate(val, opts, useMethods[prop]);
      }
    });
  } else {
    each(obj, (val, prop) => {
      if (Array.isArray(val)) {
        results[prop] = validateArr(val, opts, useMethods);
      } else {
        results[prop] = validate(val, opts, useMethods);
      }
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
    return runSchemaObj(data, opts, opts.schema);
  }
  if (Array.isArray(data)) {
    return runSchemaArr(data, opts, opts.schema);
  }

  return validate(data, opts, ensureArray(opts.schema));
};

export default simplyValid;
