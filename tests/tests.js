'use strict';

const test = require('tape');
const validate = require('../index.js');

const testData = {
	zip: '11445',
	address: '1132 Cool St'
};

test('Test hasValue()', t => {
	t.ok(validate(testData.zip).hasValue().finish().isValid, 'Value Test passed');
	t.end();
});

test('Test hasNumbers()', t => {
	t.ok(validate(testData.zip).hasNumbers().finish().isValid, 'Value has numbers');
	t.end();
});

test('Test hasLetters()', t => {
	t.ok(validate(testData.address).hasLetters().finish().isValid, 'Value has letters');
	t.end();
});

test('Test hasCustom()', t => {
	t.ok(validate(testData.zip, {
		basePattern: '[0-9]'
	}).hasCustom().finish().isValid, 'Custom Test passed');
	t.end();
});

test('Test hasNumbersOrSpecials()', t => {
	t.ok(validate(testData.address).hasNumbersOrSpecials().finish().isValid, 'Has Numbers passed');
	t.ok(validate('$$%#@@HI!').hasNumbersOrSpecials().finish().isValid, 'Has Special Characters');
	t.end();
});

test('Test hasSpecialCharacters()', t => {
	t.ok(validate('$$%#@@HI!').hasSpecialCharacters().finish().isValid, 'Has Special Characters');
	t.end();
});

test('Test hasUpperAndLowerCase()', t => {
	t.ok(validate('Hi').hasUpperAndLowerCase().finish().isValid, 'Has Upper and Lower Case');
	t.end();
});

test('Test isEmail()', t => {
	t.ok(validate('IamEmail@cool.com').isEmail().finish().isValid, 'That is indeed an email');
	t.end();
});

test('Test isNumber()', t => {
	t.ok(validate(testData.zip).isNumber().finish().isValid, 'Should return that it is a number');
	t.end();
});

test('Test isNumber() Fail', t => {
	const results = validate('chicken').isNumber().finish();

	t.notOk(results.isValid, 'This is NOT a number');
	t.equal(results.story.length, 1, 'Story returned with a length of 1');
	t.end();
});

test('Test isPositive()', t => {

	t.ok(validate('12').isPositive().finish().isValid, 'Returned OK is a positive');
	t.end();
});

test('Test isPositive() Fail', t => {
	const results = validate('You Smell Good!').isPositive().finish();

	t.notOk(results.isValid, 'This contains no positive numbers');
	t.equal(results.story.length, 1, 'Story returned with a length of 1');
	t.end();
});

test('Test isNegative()', t => {
	t.ok(validate('-12').isNegative().finish().isValid, 'Returned OK is a Negative');
	t.end();
});

test('Test isNegative() Fail', t => {
	const results = validate('You Smell Bad!').isNegative().finish();

	t.notOk(results.isValid, 'This contains no negative numbers');
	t.equal(results.story.length, 1, 'Story returned with a length of 1');
	t.end();
});

test('Test isVin()', t => {
	t.ok(validate('JM1CW2BL8C0127808').isVin().finish().isValid, 'Returned OK This is a VIN');
	t.end();
});

test('Test isDate()', t => {
	t.ok(validate('03-28-2017').isDate().finish().isValid, 'Returns that this is indeed a date');
	t.end();
});

test('Test isDateProper()', t => {
	t.ok(validate('2017-03-28').isDateProper().finish().isValid, 'Returns that this is indeed a proper date');
	t.end();
});

test('Test isEmail()', t => {
	t.ok(validate('coolkid778@aol.com').isEmail().finish().isValid, 'Returned OK This is a email');
	t.end();
});

test('Test isZip()', t => {
	t.ok(validate('77885').isZip().finish().isValid, 'Returned OK This is a Zip Code');
	t.end();
});

test('Test isCAPostalCode()', t => {
	t.ok(validate('K1A0B1').isCAPostalCode().finish().isValid, 'Returned OK This is a Postal Code');
	t.end();
});

test('Test isPhone()', t => {
	t.ok(validate('888-555-9987').isPhone().finish().isValid, 'Returned OK This is a phone format');
	t.end();
});

test('Test isLicensePlate()', t => {
	t.ok(validate('SSS1829').isLicensePlate().finish().isValid, 'Returned OK This is a license plate format');
	t.end();
});

test('Test isVisaCard()', t => {
	t.ok(validate('4111111111111111').isVisaCard().finish().isValid, 'Returned OK This is a Visa card format');
	t.end();
});

test('Test isMasterCard()', t => {
	t.ok(validate('5511111111111111').isMasterCard().finish().isValid, 'Returned OK This is a MasterCard format');
	t.end();
});

test('Test isAmericanExpressCard()', t => {
	t.ok(validate('341111111111111').isAmericanExpressCard().finish().isValid, 'Returned OK This is a American Express card format');
	t.end();
});

test('Test matchesGiven()', t => {
	t.ok(validate('Chicken', {
		toMatch: 'Chicken'
	}).matchesGiven().finish().isValid, 'Given value matches option');
	t.end();
});

test('Test matchesPattern()', t => {
	t.ok(validate('Chicken', {
		basePattern: /[a-z]/i
	}).matchesPattern().finish().isValid, 'Given value matches pattern');
	t.end();
});

test('Test doesNotMatch()', t => {
	t.ok(validate('CoolKid112', {
		antiPattern: /\?/ig
	}).doesNotMatch().finish().isValid, 'Given value matched anti pattern');
	t.end();
});

test('Test meetsLength()', t => {
	t.ok(validate(testData.zip, {
		maxLength: 5,
		minLength: 5
	}).meetsLength().finish().isValid, 'Returns OK within our length limits');
	t.end();
});

test('Test meetsLength() Fail', t => {
	const results = validate('chicken', {
		maxLength: 10,
		minLength: 10
	}).meetsLength().finish();

	t.notOk(results.isValid, 'This does not meet length requirements');
	t.equal(results.story.length, 1, 'Story returned with a length of 1');
	t.end();
});

test('Test meetsYearStandard()', t => {
	t.ok(validate('2017').meetsYearStandard().finish().isValid, 'Proper 4 digit format');
	t.ok(validate('17').meetsYearStandard().finish().isValid, 'Proper 2 digit format');
	t.notOk(validate('178').meetsYearStandard().finish().isValid, 'inProper 3 digit format');
	t.end();
});

test('Test meetsCVN()', t => {
	t.ok(validate('201').meetsCVN().finish().isValid, 'Proper 3 digit CVN format');
	t.end();
});

test('Test meetsCVNAmex()', t => {
	t.ok(validate('2081').meetsCVNAmex().finish().isValid, 'Proper 4 digit CVN Amex format');
	t.end();
});

test('Test meetsTreadDepth()', t => {
	t.ok(validate('12').meetsTreadDepth().finish().isValid, 'Proper tread depth format');
	t.end();
});

test('Test noSpecials()', t => {
	t.ok(validate(testData.zip).noSpecials().finish().isValid, 'Returned OK no specials');
	t.end();
});

test('Test noSpecials() Fail', t => {
	const results = validate('$#@%#@Cheese').noSpecials().finish();

	t.notOk(results.isValid, 'This contains special characters');
	t.equal(results.story.length, 1, 'Story returned with a length of 1');
	t.end();
});

test('Test noNumbers()', t => {
	t.ok(validate('Chicken').noNumbers().finish().isValid, 'Returned OK no Numbers');
	t.end();
});


test('Test a Chain of Validations', t => {

	t.ok(validate(10).isNumber().isPositive().finish().isValid, 'Chain came back successful');
	t.end();
});

test('Test a Chain of Validations for Failure', t => {
	const results = validate('cow', {
		maxLength: 10,
		minLength: 5
	}).isNumber().isPositive().meetsLength().finish();

	t.notOk(results.isValid, 'Chain came back unsuccessful');
	t.end();
});
