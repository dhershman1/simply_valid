export const isObject = x => Object.prototype.toString.call(x) === '[object Object]';

export const isIterable = x => typeof x === 'object';

export const extend = (...args) => args.reduce((acc, x) => {
  let key = '';

  for (key in x) {
    acc[key] = x[key];
  }

  return acc;
}, {});

export const each = (obj, cb) => {
  for (const prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      if (typeof obj[prop] === 'object') {
        each(obj[prop], cb);
      }
      cb(obj[prop], prop);
    }
  }

};

export const ensureArray = val => {
  if (Array.isArray(val)) {
    return val;
  }

  if (val === void 0) {
    return [];
  }

  return [val];
};

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

export const validateSchema = schema => {
  if (Array.isArray(schema) && schema.length) {
    return true;
  }

  if (isObject(schema) && Object.keys(schema).length) {
    return true;
  }

  return Boolean(schema.length);
};

export const luhn = val => {
  const numArr = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9];
  let len = val.length;
  let bit = 1;
  let sum = 0;
  let num = 0;

  while (len) {
    num = parseInt(val.charAt(--len), 10);
    sum += (bit ^= 1) ? numArr[num] : num; // eslint-disable-line
  }

  return sum && sum % 10 === 0;
};
