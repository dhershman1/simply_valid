import extend from './index';
import isObject from '../isObject';
import test from 'ava';

test('Test extend', t => {
  const results = extend({
    test: 'val'
  }, {
    test: 'newVal',
    arr: ['1', '2']
  });

  t.truthy(results, 'Results did return');
  t.truthy(isObject(results), 'Results are still an object');
  t.is(results.test, 'newVal', 'Old value was overwritten with new value');
  t.truthy(results.arr, 'There is a new arr property');
  t.is(results.arr[0], '1', 'First arr position is 1');
  t.is(results.arr[1], '2', 'Second arr position is 2');

});
