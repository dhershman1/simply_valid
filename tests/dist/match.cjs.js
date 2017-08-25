'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var test = _interopDefault(require('tape'));

/* eslint-disable max-len */

const matchesPattern = (val, {basePattern}) => !basePattern.test(val);

const doesNotMatch = (val, {antiPattern}) => antiPattern.test(val);

/* eslint-disable max-len */
// Our collection of validation methods extend them so we get their methods and thats it

test('Test doesNotMatch', t => {
	t.ok(doesNotMatch);
	t.end();
});

test('Test matchesPattern', t => {
	t.ok(matchesPattern);
	t.end();
});
