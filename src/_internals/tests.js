import { each, ensureArray, extend, format, isObject, luhn, validateSchema } from './index';
import test from 'tape';

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
