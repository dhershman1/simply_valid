import luhn from './index';
import test from 'ava';

test('Test luhn', t => {
  t.truthy(luhn('4111111111111111'), 'Valid Visa card number');
  t.truthy(luhn('5387109830289055'), 'Valid Master card');
  t.truthy(luhn('6011906326377506'), 'Valid Discover Card');
  t.truthy(luhn('341258393919545'), 'Valid Amex card');

  t.falsy(luhn('41111111111111111'), 'Invalid Visa');
  t.falsy(luhn('5511111111111111'), 'Invalid Master Card');
  t.falsy(luhn('381111111111111'), 'Invalid Amex Card');
  t.falsy(luhn('6111111111111111'), 'Invalid Discover Card');

});
