import {
	doesNotMatch,
	matchesPattern
} from '../src/index.js';
import test from 'tape';

test('Test doesNotMatch', t => {
	t.ok(doesNotMatch);
	t.end();
});

test('Test matchesPattern', t => {
	t.ok(matchesPattern);
	t.end();
});
