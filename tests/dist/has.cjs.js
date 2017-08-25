'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var test = _interopDefault(require('tape'));

const hasValue = val => !val && val.length === 0;

const hasNumbers = val => val.search(/\d/) === -1;

const hasLetters = val => val.search(/[A-Z]\d?/i) === -1;

const hasCustom = (val, {basePattern}) => val.search(basePattern) === -1;

const hasNumbersOrSpecials = val => val.search(/\d/) === -1 && val.search(/\W/) === -1;

const hasSpecialCharacters = val => val.search(/\W/) === -1;

const hasUpperAndLowerCase = val => val.search(/[A-Z]/) === -1 || val.search(/[a-z]/) === -1;

/* eslint-disable max-len */

/* eslint-disable max-len */
// Our collection of validation methods extend them so we get their methods and thats it

test('Test hasCustom', t => {
	t.ok(hasCustom);
	t.end();
});

test('Test hasLetters', t => {
	t.ok(hasLetters);
	t.end();
});

test('Test hasNumbers', t => {
	t.ok(hasNumbers);
	t.end();
});

test('Test hasNumbersOrSpecials', t => {
	t.ok(hasNumbersOrSpecials);
	t.end();
});

test('Test hasSpecialCharacters', t => {
	t.ok(hasSpecialCharacters);
	t.end();
});

test('Test hasUpperAndLowerCase', t => {
	t.ok(hasUpperAndLowerCase);
	t.end();
});

test('Test hasValue', t => {
	t.ok(hasValue);
	t.end();
});
