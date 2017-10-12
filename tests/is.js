import {
	isAboveMin,
	isAmericanExpressCard,
	isBelowMax,
	isCAPostalCode,
	isDate,
	isDateProper,
	isDateShort,
	isDiscoverCard,
	isEmail,
	isLicensePlate,
	isMasterCard,
	isNegative,
	isNumber,
	isPhone,
	isPositive,
	isVin,
	isVisaCard,
	isVisaPanCard,
	isZip
} from '../dist/simply_valid.cjs.js';
import test from 'tape';

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
