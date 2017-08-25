import {
	noLetters,
	noNumbers,
	noSpecials
} from '../src/index.js';
import test from 'tape';

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
