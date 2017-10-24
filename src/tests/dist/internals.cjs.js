'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var test = _interopDefault(require('tape'));

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

test('Test isObject', t => {
  t.ok(isObject({ test: 'value' }), 'Data is an object');
  t.notOk(isObject(['1']), 'Array is not a true object');
  t.ok(isObject({
    test: ['val'],
    inner: {
      test2: 'val'
    }
  }), 'Complex Object is an object');
  t.ok(isObject({}), 'Empty object is still an object');

  t.end();
});

test('Test extend', t => {
  const results = extend({
    test: 'val'
  }, {
    test: 'newVal',
    arr: ['1', '2']
  });

  t.ok(results, 'Results did return');
  t.ok(isObject(results), 'Results are still an object');
  t.equal(results.test, 'newVal', 'Old value was overwritten with new value');
  t.ok(results.arr, 'There is a new arr property');
  t.equal(results.arr[0], '1', 'First arr position is 1');
  t.equal(results.arr[1], '2', 'Second arr position is 2');

  t.end();
});

test('Test each on Object', t => {
  each({
    test: 'newVal',
    arr: ['1', '2'],
    inner: {
      sauce: 'bbq'
    }
  }, (val, prop) => {
    t.ok(val, `Value: ${val} is present`);
    t.ok(prop, `Prop: ${prop} is present`);
  });

  t.end();
});

test('Test each on Array', t => {
  each(['test', 'value', 'again'], (val, prop) => {
    t.ok(val, `Value: ${val} is present`);
    t.ok(prop, `Prop: ${prop} is present`);
  });

  t.end();
});

test('Test ensureArray', t => {
  const testArr = ['1', '2', '3'];

  t.deepEqual(ensureArray(testArr), testArr, 'Value is already an array and is returned');
  t.deepEqual(ensureArray(undefined), [], 'Undefined is no value so return an empty array'); // eslint-disable-line
  t.deepEqual(ensureArray(1), [1], 'Single value sent in, return it wrapped in an array');

  t.end();
});

test('Test foramt', t => {
  const passingTest = {
    zip: { isValid: true },
    address: { isValid: true }
  };
  const failingTest = {
    zip: {
      isValid: false,
      story: [{
        test: 'isNumber',
        value: 'cool'
      }]
    },
    address: { isValid: true }
  };

  const passingResults = format(passingTest);
  const failingResults = format(failingTest);

  t.ok(passingResults, 'Formatted and returned');
  t.ok(passingResults.isValid, 'Passing is indeed valid');
  t.equal(passingResults.story.length, 0, 'There is no story for the passing test');
  t.ok(failingResults, 'Failing results returned and formatted');
  t.notOk(failingResults.isValid, 'The failing results are not valid');
  t.equal(failingResults.story.length, 1, 'There is a story length in failing results');
  t.deepEqual(failingResults.story[0], {
    test: 'isNumber',
    value: 'cool',
    propName: 'zip'
  }, 'story is equal to a valid formatted object');

  t.end();
});

test('Test validateSchema', t => {
  t.ok(validateSchema(['isPositive']), 'Array with length is valid schema');
  t.ok(validateSchema({ zip: ['isPositive'] }), 'Object with data is valid');
  t.ok(validateSchema('isNegative'), 'Single string is valid schema');

  t.notOk(validateSchema([]), 'Empty array is not a valid schema');
  t.notOk(validateSchema({}), 'Empty Object is not a valid schema');
  t.notOk(validateSchema(''), 'Empty String is not a valid schema');

  t.end();
});

test('Test luhn', t => {
  t.ok(luhn('4111111111111111'), 'Valid Visa card number');
  t.ok(luhn('5387109830289055'), 'Valid Master card');
  t.ok(luhn('6011906326377506'), 'Valid Discover Card');
  t.ok(luhn('341258393919545'), 'Valid Amex card');

  t.notOk(luhn('41111111111111111'), 'Invalid Visa');
  t.notOk(luhn('5511111111111111'), 'Invalid Master Card');
  t.notOk(luhn('381111111111111'), 'Invalid Amex Card');
  t.notOk(luhn('6111111111111111'), 'Invalid Discover Card');

  t.end();
});
