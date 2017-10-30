'use strict';

const hasValue = val => val && val.length !== 0;

const hasNumbers = val => (/[0-9]/).test(val);

const hasLetters = val => (/[A-Z]/i).test(val);

const hasSpecialCharacters = val => (/\W/).test(val);

const hasNumbersOrSpecials = val => hasNumbers(val) || hasSpecialCharacters(val);

const hasUpperAndLowerCase = val => (/[A-Z]/).test(val) && (/[a-z]/).test(val);

const isObject = x => Object.prototype.toString.call(x) === '[object Object]';

/**
 * Extend or merge an object
 * @param {Object} args The objects to combine
 */
const extend = (...args) => args.reduce((acc, x) => {
  let key = '';

  for (key in x) {
    acc[key] = x[key];
  }

  return acc;
}, {});

/**
 * Safety measure to ensure an array is always present
 * @param {*} val value to ensure is an array
 */
const ensureArray = val => {
  if (Array.isArray(val)) {
    return val;
  }

  if (val === void 0) {
    return [];
  }

  return [val];
};

/**
 * Recursively iterate through an object or array and return the values
 * @param {Object} obj Object to iterate through
 * @param {Function} cb callback to send values back to
 */
const each = (data, cb) => {
  let i = 0;
  const keys = Object.keys(data);
  const len = keys.length;

  for (i; i < len; i++) {
    const prop = keys[i];

    if (Object.prototype.hasOwnProperty.call(data, prop)) {
      if (typeof data[prop] === 'object') {
        each(data[prop], cb);
        continue;
      }
      cb(data[prop], prop);
    }
  }
};

/**
 * Formats the results object sent back to the user
 * @param {Object} obj Object to be formatted
 */
const format = obj => {
  const results = {
    isValid: true,
    story: []
  };

  for (const prop in obj) {
    if (obj[prop].isValid) {
      continue;
    }

    const [story] = obj[prop].story;

    story.propName = prop;
    results.story.push(story);
  }

  if (results.story.length) {
    results.isValid = false;

    return results;
  }

  return results;
};

/**
 * Validates the sent in schema is useable
 * @param {*} schema The schema value to validate
 */
const validateSchema = schema => {
  if (Array.isArray(schema) && schema.length) {
    return true;
  }

  if (isObject(schema) && Object.keys(schema).length) {
    return true;
  }

  return Boolean(schema.length);
};

/**
 * Validates a credit card using the luhn algorithm
 * @param {String} val The card number string to validate
 */
const luhn = val => {
  const numArr = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9];
  const stringVal = String(val);
  let len = stringVal.length;
  let bit = 1;
  let sum = 0;
  let num = 0;

  while (len) {
    num = parseInt(stringVal.charAt(--len), 10);
    sum += (bit ^= 1) ? numArr[num] : num; // eslint-disable-line
  }

  return sum && sum % 10 === 0;
};

/* eslint-disable max-len */

const emailRegex = /^[\w\u00c0-\u017f][\w.-_\u00c0-\u017f]*[\w\u00c0-\u017f]+[@][\w\u00c0-\u017f][\w.-_\u00c0-\u017f]*[\w\u00c0-\u017f]+\.[a-z]{2,4}$/i;
const vinRegex = /^[a-hj-npr-z0-9]{9}[a-hj-npr-tv-y1-9]{1}[a-hj-npr-z0-9]{7}$/i;

const isDate = val => (/^((1[0-2])|(0?[1-9]))[-/.]?((0?[1-9])|([1-2][0-9])|(3[0-1]))[-/.]?(([1-2]{1}[0-9]{3})|([0-9]{2}))$/m).test(val);

const isDateShort = val => (/^((1[0-2])|(0?[1-9]))[-/.]?((0?[1-9])|([1-2][0-9])|(3[0-1]))[-/.]?$/m).test(val);

const isDateProper = val => (/^(([1-2]{1}[0-9]{3})|([0-9]{2}))[-/.]?((1[0-2])|(0?[1-9]))[-/.]?((0?[1-9])|([1-2][0-9])|(3[0-1]))$/m).test(val);

const isEmail = (email = emailRegex) => val => {
  if (email.emailPattern) {
    return email.emailPattern.test(val);
  }

  return email.test(val);
};

const isNumber = val => !isNaN(val);

const isPositive = val => !isNaN(val) && Number(val) >= 0;

const isNegative = val => !isNaN(val) && Number(val) < 0;

const isVin = (vin = vinRegex) => val => {
  if (vin.vinPattern) {
    return vin.vinPattern.test(val);
  }

  return vin.test(val);
};

const isZip = val => (/^\d{5}(-\d{4})?$/).test(val);

const isCAPostalCode = val => (/^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1} *\d{1}[A-Z]{1}\d{1}$/i).test(val);

const isPhone = val => (/^[0-9]{10}$/).test(val.replace(/\W/g, ''));

const isLicensePlate = val => (/^([A-Z]|[0-9]){1,3}(\s|-|•)?([A-Z]|[0-9]){3,5}$/i).test(val);

const isVisaCard = (strict = true) => val => {
  if (strict) {
    return luhn(val);
  }

  return (/^4[0-9]{15}$/).test(val);
};

const isVisaPanCard = (strict = true) => val => {
  if (strict) {
    return luhn(val);
  }

  return (/^4[0-9]{18}$/).test(val);
};

const isMasterCard = (strict = true) => val => {
  if (strict) {
    return luhn(val);
  }

  return (/^5[1-5][0-9]{14}$/).test(val);
};

const isAmericanExpressCard = (strict = true) => val => {
  if (strict) {
    return luhn(val);
  }

  return (/^3(4|7)[0-9]{13}$/).test(val);
};

const isDiscoverCard = (strict = true) => val => {
  if (strict) {
    return luhn(val);
  }

  return (/^6[0-9]{15}$/).test(val);
};

const isBelowMax = (m = Infinity) => val => {
  if (m.max) {
    return !isNaN(val) && Number(val) < m.max;
  }

  return !isNaN(val) && Number(val) < m;
};

const isAboveMin = (m = -Infinity) => val => {
  if (m.min) {
    return !isNaN(val) && Number(val) > m.min;
  }

  return !isNaN(val) && Number(val) > m;
};

/* eslint-disable max-len */
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/;

const meetsMinMax = ({ min = -Infinity, max = Infinity }) => val => !isNaN(val) && (Number(val) >= min && Number(val) <= max);

const meetsYearStandard = val => (/(^[0-9]{2}$)|(^[1-2]{1}[0-9]{3}$)/).test(val);

const meetsCVN = val => val.length === 3 && (/[0-9]/).test(val);

const meetsCVNAmex = val => val.length === 4 && (/[0-9]/).test(val);

const meetsTreadDepth = val => (/^(([0-1]?[0-9]|2[0-1])(\.[0-9])?|22)$/i).test(val);

const meetsPassReq = (pass = passwordRegex) => val => {
  if (pass.passwordPattern) {
    return pass.passwordPattern.test(val);
  }

  return pass.test(val);
};

const noSpecials = val => val.match(/\W/) === null;

const noNumbers = val => val.match(/[0-9]/) === null;

const noLetters = val => val.match(/[A-Z]/i) === null;



var methods = Object.freeze({
	hasValue: hasValue,
	hasNumbers: hasNumbers,
	hasLetters: hasLetters,
	hasSpecialCharacters: hasSpecialCharacters,
	hasNumbersOrSpecials: hasNumbersOrSpecials,
	hasUpperAndLowerCase: hasUpperAndLowerCase,
	isDate: isDate,
	isDateShort: isDateShort,
	isDateProper: isDateProper,
	isEmail: isEmail,
	isNumber: isNumber,
	isPositive: isPositive,
	isNegative: isNegative,
	isVin: isVin,
	isZip: isZip,
	isCAPostalCode: isCAPostalCode,
	isPhone: isPhone,
	isLicensePlate: isLicensePlate,
	isVisaCard: isVisaCard,
	isVisaPanCard: isVisaPanCard,
	isMasterCard: isMasterCard,
	isAmericanExpressCard: isAmericanExpressCard,
	isDiscoverCard: isDiscoverCard,
	isBelowMax: isBelowMax,
	isAboveMin: isAboveMin,
	meetsMinMax: meetsMinMax,
	meetsYearStandard: meetsYearStandard,
	meetsCVN: meetsCVN,
	meetsCVNAmex: meetsCVNAmex,
	meetsTreadDepth: meetsTreadDepth,
	meetsPassReq: meetsPassReq,
	noSpecials: noSpecials,
	noNumbers: noNumbers,
	noLetters: noLetters
});

/* eslint-disable max-len */
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
        results[prop] = validate(val, opts, useMethods[prop]);
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
};

module.exports = simplyValid;
