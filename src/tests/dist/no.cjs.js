'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var test = _interopDefault(require('tape'));

const noSpecials = val => val.match(/\W/) === null;

const noNumbers = val => val.match(/[0-9]/) === null;

const noLetters = val => val.match(/[A-Z]/i) === null;

test('Test noLetters', t => {
  let results = noLetters('1123450');

  t.ok(noLetters);
  t.ok(results, 'First results set no letters found');

  results = noLetters('GHJffre1123');
  t.notOk(results, 'Letters found in string');
  t.end();
});

test('Test noNumbers', t => {
  let results = noNumbers('abcdefGHIJK');

  t.ok(noNumbers);
  t.ok(results, 'No numbers found');

  results = noNumbers('abc1234');
  t.notOk(results, 'Numbers found in string');
  t.end();
});

test('Test noSpecials', t => {
  let results = noSpecials('cool');

  t.ok(noSpecials);
  t.ok(results, 'No specials found');

  results = noSpecials('cool!');
  t.notOk(results, 'Specials found in string');
  t.end();
});
