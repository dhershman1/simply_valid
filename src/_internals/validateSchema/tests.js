import test from 'ava';
import validateSchema from './index';

test('Test validateSchema', t => {
  t.truthy(validateSchema(['isPositive']), 'Array with length is valid schema');
  t.truthy(validateSchema({ zip: ['isPositive'] }), 'Object with data is valid');
  t.truthy(validateSchema('isNegative'), 'Single string is valid schema');

  t.falsy(validateSchema([]), 'Empty array is not a valid schema');
  t.falsy(validateSchema({}), 'Empty Object is not a valid schema');
  t.falsy(validateSchema(''), 'Empty String is not a valid schema');

});
