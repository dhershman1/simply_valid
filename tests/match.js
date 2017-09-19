import {
	doesNotMatch,
	matchesPattern
} from '../dist/simply_valid.cjs.js';
import test from 'tape';

test('Test doesNotMatch', t => {
	t.ok(doesNotMatch);
	t.end();
});

test('Test matchesPattern', t => {
	t.ok(matchesPattern);
	t.end();
});
