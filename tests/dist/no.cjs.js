'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var no = require('simply-valid/no');
var test = _interopDefault(require('tape'));

test('Test noLetters', t => {
	let results = no.noLetters('1123450');

	t.ok(no.noLetters);
	t.notOk(results, 'First results set no letters found');

	results = no.noLetters('GHJffre1123');
	t.ok(results, 'Letters found in string');
	t.end();
});

test('Test noNumbers', t => {
	let results = no.noNumbers('abcdefGHIJK');

	t.ok(no.noNumbers);
	t.notOk(results, 'No numbers found');

	results = no.noNumbers('abc1234');
	t.ok(results, 'Numbers found in string');
	t.end();
});

test('Test noSpecials', t => {
	let results = no.noSpecials('cool');

	t.ok(no.noSpecials);
	t.notOk(results, 'No specials found');

	results = no.noSpecials('cool!');
	t.ok(results, 'Specials found in string');
	t.end();
});
