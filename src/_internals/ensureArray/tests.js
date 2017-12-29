import ensureArray from './index';
import test from 'ava';

test('Test ensureArray', t => {
  const testArr = ['1', '2', '3'];

  t.deepEqual(ensureArray(testArr), testArr, 'Value is already an array and is returned');
  t.deepEqual(ensureArray(undefined), [], 'Undefined is no value so return an empty array'); // eslint-disable-line
  t.deepEqual(ensureArray(1), [1], 'Single value sent in, return it wrapped in an array');

});
