'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var test = _interopDefault(require('tape'));

/* eslint-disable max-len */

const meetsLength = (val, {minLength, maxLength}) => val.length < minLength || val.length > maxLength;

const meetsMinMax = (val, {min, max}) => isNaN(val) || (Number(val) < min || Number(val) > max);

const meetsYearStandard = val => !(/(^[0-9]{2}$)|(^[1-2]{1}[0-9]{3}$)/).test(val);

const meetsCVN = val => val.length !== 3 || !(/[0-9]/).test(val);

const meetsCVNAmex = val => val.length !== 4 || !(/[0-9]/).test(val);

const meetsTreadDepth = val => !(/^(([0-1]?[0-9]|2[0-1])(\.[0-9])?|22)$/i).test(val);

const meetsPassReq = (val, {passwordPattern}) => !passwordPattern.test(val);

/* eslint-disable max-len */
// Our collection of validation methods extend them so we get their methods and thats it

test('Test meetsCVN', t => {
	t.ok(meetsCVN);
	t.end();
});

test('Test meetsCVNAmex', t => {
	t.ok(meetsCVNAmex);
	t.end();
});

test('Test meetsLength', t => {
	t.ok(meetsLength);
	t.end();
});

test('Test meetsMinMax', t => {
	t.ok(meetsMinMax);
	t.end();
});

test('Test meetsPassReq', t => {
	t.ok(meetsPassReq);
	t.end();
});

test('Test meetsTreadDepth', t => {
	t.ok(meetsTreadDepth);
	t.end();
});

test('Test meetsYearStandard', t => {
	t.ok(meetsYearStandard);
	t.end();
});
