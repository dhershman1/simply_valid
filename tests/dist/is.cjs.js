'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var test = _interopDefault(require('tape'));

/* eslint-disable max-len */
const isDate = val => !(/^((1[0-2])|(0?[1-9]))[-/.]?((0?[1-9])|([1-2][0-9])|(3[0-1]))[-/.]?(([1-2]{1}[0-9]{3})|([0-9]{2}))$/m).test(val);

const isDateShort = val => !(/^((1[0-2])|(0?[1-9]))[-/.]?((0?[1-9])|([1-2][0-9])|(3[0-1]))[-/.]?$/m).test(val);

const isDateProper = val => !(/^(([1-2]{1}[0-9]{3})|([0-9]{2}))[-/.]?((1[0-2])|(0?[1-9]))[-/.]?((0?[1-9])|([1-2][0-9])|(3[0-1]))$/m).test(val);

const isEqual = (val, {equalTo}) => val !== equalTo;

const isEmail = (val, {emailPattern}) => !emailPattern.test(val);

const isNumber = val => isNaN(val);

const isPositive = val => isNaN(val) || Number(val) < 0;

const isNegative = val => isNaN(val) || Number(val) >= 0;

const isVin = (val, {vinPattern}) => !vinPattern.test(val);

const isZip = val => !(/^\d{5}(-\d{4})?$/).test(val);

const isCAPostalCode = val => !(/^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1} *\d{1}[A-Z]{1}\d{1}$/i).test(val);

const isPhone = val => !(/^[0-9]{10}$/).test(val.replace(/\W/g, ''));

const isLicensePlate = val => !(/^([A-Z]|[0-9]){1,3}(\s|-|•)?([A-Z]|[0-9]){3,5}$/i).test(val);

const isVisaCard = val => !(/^4[0-9]{15}$/).test(val);

const isVisaPanCard = val => !(/^4[0-9]{18}$/).test(val);

const isMasterCard = val => !(/^5[1-5][0-9]{14}$/).test(val);

const isAmericanExpressCard = val => !(/^3(4|7)[0-9]{13}$/).test(val);

const isDiscoverCard = val => !(/^6[0-9]{15}$/).test(val);

const isBelowMax = (val, {max}) => isNaN(val) || Number(val) > max;

const isAboveMin = (val, {min}) => isNaN(val) || Number(val) < min;

/* eslint-disable max-len */
// Our collection of validation methods extend them so we get their methods and thats it

test('Testing isDate', t => {
	t.ok(isDate);
	t.end();
});

test('Testing isDateShort', t => {
	t.ok(isDateShort);
	t.end();
});

test('Testing isDateProper', t => {
	t.ok(isDateProper);
	t.end();
});

test('Testing isEqual', t => {
	t.ok(isEqual);
	t.end();
});

test('Testing isEmail', t => {
	t.ok(isEmail);
	t.end();
});

test('Testing isNumber', t => {
	t.ok(isNumber);
	t.end();
});

test('Testing isPositive', t => {
	t.ok(isPositive);
	t.end();
});

test('Testing isNegative', t => {
	t.ok(isNegative);
	t.end();
});

test('Testing isVin', t => {
	t.ok(isVin);
	t.end();
});

test('Testing isZip', t => {
	t.ok(isZip);
	t.end();
});

test('Testing isCAPostalCode', t => {
	t.ok(isCAPostalCode);
	t.end();
});

test('Testing isPhone', t => {
	t.ok(isPhone);
	t.end();
});

test('Testing isLicensePlate', t => {
	t.ok(isLicensePlate);
	t.end();
});

test('Testing isVisaCard', t => {
	t.ok(isVisaCard);
	t.end();
});

test('Testing isVisaPanCard', t => {
	t.ok(isVisaPanCard);
	t.end();
});

test('Testing isMasterCard', t => {
	t.ok(isMasterCard);
	t.end();
});

test('Testing isAmericanExpressCard', t => {
	t.ok(isAmericanExpressCard);
	t.end();
});

test('Testing isDiscoverCard', t => {
	t.ok(isDiscoverCard);
	t.end();
});

test('Testing isBelowMax', t => {
	t.ok(isBelowMax);
	t.end();
});

test('Testing isAboveMin', t => {
	t.ok(isAboveMin);
	t.end();
});
