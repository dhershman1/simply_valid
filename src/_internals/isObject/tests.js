import isObject from './index';
import test from 'ava';

test('Test isObject', t => {
  t.truthy(isObject({ test: 'value' }), 'Data is an object');
  t.falsy(isObject(['1']), 'Array is not a true object');
  t.truthy(isObject({
    test: ['val'],
    inner: {
      test2: 'val'
    }
  }), 'Complex Object is an object');
  t.truthy(isObject({}), 'Empty object is still an object');

});
