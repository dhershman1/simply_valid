import each from './index';
import test from 'ava';

test('Test each on Array', t => {
  each(['test', 'value', 'again'], (val, prop) => {
    t.truthy(val, `Value: ${val} is present`);
    t.truthy(prop, `Prop: ${prop} is present`);
  });

});
