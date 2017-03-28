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
