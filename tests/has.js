import {
	hasCustom,
	hasLetters,
	hasNumbers,
	hasNumbersOrSpecials,
	hasSpecialCharacters,
	hasUpperAndLowerCase,
	hasValue
} from '../dist/simply_valid.umd.js';
import test from 'tape';

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
