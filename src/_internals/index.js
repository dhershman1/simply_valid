export const isObject = x => Object.prototype.toString.call(x) === '[object Object]';

/**
 * Extend or merge an object
 * @param {Object} args The objects to combine
 */
export const extend = (...args) => args.reduce((acc, x) => {
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
export const ensureArray = val => {
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
export const each = (data, cb) => {
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
export const format = obj => {
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
export const validateSchema = schema => {
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
export const luhn = val => {
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
