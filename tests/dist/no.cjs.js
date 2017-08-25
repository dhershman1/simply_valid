'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var test = _interopDefault(require('tape'));

/* eslint-disable max-len */

const noSpecials = val => (/\W/).test(val);

const noNumbers = val => (/[0-9]/).test(val);

const noLetters = val => (/[A-Z]/i).test(val);

/* eslint-disable max-len */
// Our collection of validation methods extend them so we get their methods and thats it

test('Test noLetters', t => {
	let results = noLetters('1123450');

	t.ok(noLetters);
	t.notOk(results, 'First results set no letters found');

	results = noLetters('GHJffre1123');
	t.ok(results, 'Letters found in string');
	t.end();
});

test('Test noNumbers', t => {
	let results = noNumbers('abcdefGHIJK');

	t.ok(noNumbers);
	t.notOk(results, 'No numbers found');

	results = noNumbers('abc1234');
	t.ok(results, 'Numbers found in string');
	t.end();
});

test('Test noSpecials', t => {
	let results = noSpecials('cool');

	t.ok(noSpecials);
	t.notOk(results, 'No specials found');

	results = noSpecials('cool!');
	t.ok(results, 'Specials found in string');
	t.end();
});
