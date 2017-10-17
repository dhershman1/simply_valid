'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var test = _interopDefault(require('tape'));

const hasValue = val => val && val.length !== 0;

const hasNumbers = val => (/[0-9]/).test(val);

const hasLetters = val => (/[A-Z]/i).test(val);

const hasSpecialCharacters = val => (/\W/).test(val);

const hasNumbersOrSpecials = val => hasNumbers(val) || hasSpecialCharacters(val);

const hasUpperAndLowerCase = val => (/[A-Z]/).test(val) && (/[a-z]/).test(val);

test('Test hasLetters', t => {
  t.ok(hasLetters);
  t.ok(hasLetters('test'), 'Has letters');
  t.notOk(hasLetters(''), 'Has no letters');
  t.notOk(hasLetters('111222'), 'Has only numbers');
  t.end();
});

test('Test hasNumbers', t => {
  t.ok(hasNumbers);
  t.ok(hasNumbers('1123AF'), 'Has Numbers');
  t.notOk(hasNumbers('aaaaa'), 'Has no numbers');
  t.end();
});

test('Test hasNumbersOrSpecials', t => {
  t.ok(hasNumbersOrSpecials);
  t.ok(hasNumbersOrSpecials('33421@#!'), 'Has Numbers and Specials');
  t.ok(hasNumbersOrSpecials('aaaa@#!'), 'Has Specials');
  t.ok(hasNumbersOrSpecials('aaaa222'), 'Has Numbers');
  t.notOk(hasNumbersOrSpecials('aaaaa'), 'Only Letters');
  t.end();
});

test('Test hasSpecialCharacters', t => {
  t.ok(hasSpecialCharacters);
  t.ok(hasSpecialCharacters('aa$$##'), 'Has Specials');
  t.notOk(hasSpecialCharacters('aaaa'), 'Has no specials');
  t.end();
});

test('Test hasUpperAndLowerCase', t => {
  t.ok(hasUpperAndLowerCase);
  t.ok(hasUpperAndLowerCase('aAAAaaa'), 'Has both upper and lower case');
  t.notOk(hasUpperAndLowerCase('aaaaa'), 'Has only lower case');
  t.end();
});

test('Test hasValue', t => {
  t.ok(hasValue);
  t.ok(hasValue('test'), 'Has a value');
  t.notOk(hasValue(''), 'Has no value');
  t.end();
});
