'use strict';

const test = require('tape');
const validate = require('../dist/simply_valid.umd.js');

const testData = {
	zip: '11445',
	address: '1132 Cool St'
};

test('Test hasValue()', t => {
	t.ok(validate(testData.zip).hasValue().finish().isValid, 'Value Test passed');
	t.notOk(validate('').hasValue().finish().isValid, 'Value is not present so test is not valid');
	t.end();
});

test('Test hasNumbers()', t => {
	t.ok(validate(testData.zip).hasNumbers().finish().isValid, 'Value has numbers');
	t.notOk(validate('$$#@').hasNumbers().finish().isValid, 'No numbers invalid test');
	t.end();
});

test('Test hasLetters()', t => {
	t.ok(validate(testData.address).hasLetters().finish().isValid, 'Value has letters');
	t.notOk(validate(testData.zip).hasLetters().finish().isValid, 'No letters invalid test');
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
	t.notOk(validate('HELLO').hasNumbersOrSpecials().finish().isValid, 'Does not have numbers or special chars');
	t.end();
});

test('Test hasSpecialCharacters()', t => {
	t.ok(validate('$$%#@@HI!').hasSpecialCharacters().finish().isValid, 'Has Special Characters');
	t.notOk(validate('HELLO').hasSpecialCharacters().finish().isValid, 'Does not have Special Characters');
	t.end();
});

test('Test hasUpperAndLowerCase()', t => {
	t.ok(validate('Hi').hasUpperAndLowerCase().finish().isValid, 'Has Upper and Lower Case');
	t.notOk(validate('hi').hasUpperAndLowerCase().finish().isValid, 'Does not have upper and lower case');
	t.end();
});

test('Test isNumber()', t => {
	t.ok(validate(testData.zip).isNumber().finish().isValid, 'Should return that it is a number');
	t.notOk(validate('Cheese').isNumber().finish().isValid, 'Is not a number');
	t.end();
});

test('Test isPositive()', t => {
	t.ok(validate('12').isPositive().finish().isValid, 'Returned OK is a positive');
	t.ok(validate(12).isPositive().finish().isValid, 'Returned OK is a positive');
	t.notOk(validate('You Smell Good!').isPositive().finish().isValid, 'This contains no positive numbers');
	t.equal(validate('You Smell Good!').isPositive().finish().story.length, 1, 'Story returned with a length of 1');
	t.notOk(validate(-1).isPositive().finish().isValid, 'Value is not positive');
	t.end();
});

test('Test isNegative()', t => {
	t.ok(validate('-12').isNegative().finish().isValid, 'Returned OK is a Negative');
	t.ok(validate(-12).isNegative().finish().isValid, 'Returned OK is a Negative');
	t.notOk(validate('You Smell Bad!').isNegative().finish().isValid, 'Is not a negative number');
	t.notOk(validate(5).isNegative().finish().isValid, '5 is not a negative number');
	t.notOk(validate(0).isNegative().finish().isValid, '0 is not a negative number');
	t.end();
});

test('Test isVin()', t => {
	t.ok(validate('JM1CW2BL8C0127808').isVin().finish().isValid, 'Returned OK This is a VIN');
	t.notOk(validate('JM1CW2BL8C012780865').isVin().finish().isValid, 'Returned not valid, too long to be vin');
	t.notOk(validate('112').isVin().finish().isValid, 'Returned not valid, not a vin');
	t.end();
});

test('Test isDate()', t => {
	t.ok(validate('03-28-2017').isDate().finish().isValid, 'Returns that this is indeed a date');
	t.ok(validate('03.28.2017').isDate().finish().isValid, 'Returns valid as date with dots');
	t.ok(validate('03/28/2017').isDate().finish().isValid, 'Returns valid as date with slashes');
	t.ok(validate('03/28/17').isDate().finish().isValid, 'Returns valid as date with slashes & short year');
	t.ok(validate('03282017').isDate().finish().isValid, 'Returns valid as date with no specials');
	t.ok(validate('032817').isDate().finish().isValid, 'Returns valid as date with short year & no specials');
	t.notOk(validate('03-27').isDate().finish().isValid, 'Returns not full date');
	t.end();
});

test('Test isDateShort()', t => {
	t.ok(validate('03-28').isDateShort().finish().isValid, 'Returns that this is indeed a date');
	t.ok(validate('03.28').isDateShort().finish().isValid, 'Returns valid as date with dots');
	t.ok(validate('03/28').isDateShort().finish().isValid, 'Returns valid as date with slashes');
	t.notOk(validate('03-27-2018').isDateShort().finish().isValid, 'Returns not short date');
	t.end();
});

test('Test isDateProper()', t => {
	t.ok(validate('2017-03-28').isDateProper().finish().isValid, 'Returns that this is indeed a proper date');
	t.ok(validate('2017.03.28').isDateProper().finish().isValid, 'Returns valid as date with dots');
	t.ok(validate('2017/03/28').isDateProper().finish().isValid, 'Returns valid as date with slashes');
	t.notOk(validate('03-27-2018').isDateProper().finish().isValid, 'Returns invalid not a proper date');
	t.end();
});

test('Test isEmail()', t => {
	t.ok(validate('coolkid778@aol.com').isEmail().finish().isValid, 'Returned OK This is a email');
	t.ok(validate('coolkid17@AAAAAAHHHHHHHHHHHH.com').isEmail().finish().isValid, 'valid yet annoying email address');
	t.ok(validate('IamEmail@cool.com').isEmail().finish().isValid, 'That is indeed an email');
	t.notOk(validate('notEmail').isEmail().finish().isValid, 'Indeed it is NOT an email');
	t.notOk(validate('coolkid77').isEmail().finish().isValid, 'Returns invalid its not an email');
	t.notOk(validate('coolkid77@gmail').isEmail().finish().isValid, 'Returns invalid email address format');
	t.notOk(validate('coolkid77@gmailcom').isEmail().finish().isValid, 'Returns invalid email address format');
	t.notOk(validate('coolkid77@gmail-com').isEmail().finish().isValid, 'Returns invalid email address format');
	t.notOk(validate('coolkid77gmail.com').isEmail().finish().isValid, 'Returns invalid email address format');
	t.end();
});

test('Test isZip()', t => {
	t.ok(validate('77885').isZip().finish().isValid, 'Returned OK This is a Zip Code');
	t.notOk(validate('778885').isZip().finish().isValid, 'Returned invalid not a zip code');
	t.notOk(validate('').isZip().finish().isValid, 'Returned invalid not a zip code');
	t.end();
});

test('Test isCAPostalCode()', t => {
	t.ok(validate('K1A0B1').isCAPostalCode().finish().isValid, 'Returned OK This is a Postal Code');
	t.notOk(validate('77885').isCAPostalCode().finish().isValid, 'Invalid postal code for CA');
	t.end();
});

test('Test isPhone()', t => {
	t.ok(validate('888-555-9987').isPhone().finish().isValid, 'Returned OK This is a phone format');
	t.ok(validate('888.555.9987').isPhone().finish().isValid, 'Returned OK This is a phone format');
	t.ok(validate('8885559987').isPhone().finish().isValid, 'Returned OK This is a phone format');
	t.notOk(validate('88-444-8877').isPhone().finish().isValid, 'Returned invalid this is not a valid phone');
	t.notOk(validate('8888-4444-8877').isPhone().finish().isValid, 'Returned invalid this is not a valid phone');
	t.end();
});

test('Test isLicensePlate()', t => {
	t.ok(validate('SSS1829').isLicensePlate().finish().isValid, 'Returned OK This is a license plate format');
	t.ok(validate('SSS-1829').isLicensePlate().finish().isValid, 'Returned OK This is a license plate format');
	t.ok(validate('SSS•1829').isLicensePlate().finish().isValid, 'Returned OK This is a license plate format');
	t.notOk(validate('SSS 18').isLicensePlate().finish().isValid, 'Invalid plate is too short');
	t.notOk(validate('SSSS 188').isLicensePlate().finish().isValid, 'Invalid plate is too long');
	t.end();
});

test('Test isVisaCard()', t => {
	t.ok(validate('4111111111111111').isVisaCard().finish().isValid, 'Returned OK This is a Visa card format');
	t.notOk(validate('5111111111111111').isVisaCard().finish().isValid, 'Invalid lead number');
	t.notOk(validate('41111111111111111').isVisaCard().finish().isValid, 'Invalid to long');
	t.notOk(validate('411111111111111').isVisaCard().finish().isValid, 'Invalid to short');
	t.notOk(validate('55544444444444GGF').isVisaCard().finish().isValid, 'Invalid bad start number and has letters');
	t.notOk(validate('4111111111111GGF').isVisaCard().finish().isValid, 'Invalid bad has letters');
	t.end();
});

test('Test isMasterCard()', t => {
	t.ok(validate('5511111111111111').isMasterCard().finish().isValid, 'Returned OK This is a MasterCard format');
	t.notOk(validate('5711111111111111').isMasterCard().finish().isValid, 'Invalid 2nd digit (not 1-5)');
	t.notOk(validate('7511111111111111').isMasterCard().finish().isValid, 'Invalid 1st digit (not 5)');
	t.notOk(validate('55511111111111111').isMasterCard().finish().isValid, 'Invalid to long');
	t.notOk(validate('551111111111111').isMasterCard().finish().isValid, 'Invalid to short');
	t.notOk(validate('551111111111111G').isMasterCard().finish().isValid, 'Invalid to short');
	t.notOk(validate('5511111111111111GG').isMasterCard().finish().isValid, 'Invalid to short');
	t.end();
});

test('Test isAmericanExpressCard()', t => {
	t.ok(validate('341111111111111').isAmericanExpressCard().finish().isValid, 'Returned valid format');
	t.notOk(validate('381111111111111').isAmericanExpressCard().finish().isValid, 'Invalid 2nd digit (not 4 or 7)');
	t.notOk(validate('541111111111111').isAmericanExpressCard().finish().isValid, 'Invalid 1st digit (not 3)');
	t.notOk(validate('3411111111111111').isAmericanExpressCard().finish().isValid, 'Invalid to long');
	t.notOk(validate('34111111111111').isAmericanExpressCard().finish().isValid, 'Invalid to short');
	t.notOk(validate('34111111111111GG').isAmericanExpressCard().finish().isValid, 'Invalid to short');
	t.end();
});

test('Test matchesGiven()', t => {
	t.ok(validate('Chicken', {
		toMatch: 'Chicken'
	}).matchesGiven().finish().isValid, 'Given value matches option');
	t.notOk(validate(5, {
		toMatch: '5'
	}).matchesGiven().finish().isValid, 'Given Number does NOT match string version');
	t.notOk(validate('Cow', {
		toMatch: 'Chicken'
	}).matchesGiven().finish().isValid, 'Given value does not match option');
	t.end();
});

test('Test matchesPattern()', t => {
	t.ok(validate('Chicken', {
		basePattern: /[a-z]/ig
	}).matchesPattern().finish().isValid, 'Given value matches pattern');
	t.notOk(validate('123456', {
		basePattern: /[a-z]/ig
	}).matchesPattern().finish().isValid, 'Given value does not match pattern');
	t.end();
});

test('Test doesNotMatch()', t => {
	t.notOk(validate('CoolKid112', {
		antiPattern: /[A-Z]/ig
	}).doesNotMatch().finish().isValid, 'Given value matched anti pattern');
	t.ok(validate('CoolKid112', {
		antiPattern: /\s/ig
	}).doesNotMatch().finish().isValid, 'Given value did not get a match in anti pattern');
	t.end();
});

test('Test meetsLength()', t => {
	t.ok(validate(testData.zip, {
		maxLength: 5,
		minLength: 5
	}).meetsLength().finish().isValid, 'Returns OK within our length limits');
	t.notOk(validate(testData.zip, {
		maxLength: 6,
		minLength: 6
	}).meetsLength().finish().isValid, 'Invalid does not meet min length');
	t.notOk(validate(testData.zip, {
		maxLength: 4,
		minLength: 4
	}).meetsLength().finish().isValid, 'Invalid does not meet max length');
	t.end();
});

test('Test meetsYearStandard()', t => {
	t.ok(validate('2017').meetsYearStandard().finish().isValid, 'Proper 4 digit format');
	t.ok(validate('17').meetsYearStandard().finish().isValid, 'Proper 2 digit format');
	t.notOk(validate('178').meetsYearStandard().finish().isValid, 'Invalid 3 digit format');
	t.end();
});

test('Test meetsCVN()', t => {
	t.ok(validate('201').meetsCVN().finish().isValid, 'Proper 3 digit CVN format');
	t.notOk(validate('2011').meetsCVN().finish().isValid, 'Invalid format for CVN');
	t.end();
});

test('Test meetsCVNAmex()', t => {
	t.ok(validate('2081').meetsCVNAmex().finish().isValid, 'Proper 4 digit CVN Amex format');
	t.notOk(validate('208').meetsCVNAmex().finish().isValid, 'Invalid format for CVN Amex');
	t.end();
});

test('Test meetsTreadDepth()', t => {
	t.ok(validate('12').meetsTreadDepth().finish().isValid, 'Proper tread depth format');
	t.notOk(validate('AA').meetsTreadDepth().finish().isValid, 'Invalid tread depth format');
	t.end();
});

test('Test noSpecials()', t => {
	t.ok(validate(testData.zip).noSpecials().finish().isValid, 'Returned OK no specials');
	t.ok(validate('IAmCool123').noSpecials().finish().isValid, 'Returned valid no specials in sentence');
	t.notOk(validate('I am cool 123').noSpecials().finish().isValid, 'Returned invalid spaces in sentence');
	t.notOk(validate('Cool!!@').noSpecials().finish().isValid, 'Invalid does have specials');
	t.equal(validate('Cool!!@').noSpecials().finish().story.length, 1, 'Put error in story');
	t.end();
});

test('Test noNumbers()', t => {
	t.ok(validate('Chicken').noNumbers().finish().isValid, 'Returned OK no Numbers');
	t.notOk(validate('chicken1').noNumbers().finish().isValid, 'Invalid value contained numbers');
	t.end();
});


test('Test a Chain of Validations', t => {

	t.ok(validate(10).isNumber().noSpecials().isPositive().finish().isValid, 'Chain came back successful');
	t.ok(validate('Passw0rd!')
		.hasUpperAndLowerCase()
		.hasSpecialCharacters()
		.hasNumbers()
		.finish().isValid, 'Chain returned valid');
	t.end();
});

test('Test a Chain of Validations for Failure', t => {
	let results = validate('cow', {
		maxLength: 10,
		minLength: 5
	}).isNumber().isPositive().meetsLength().finish();

	t.notOk(results.isValid, 'Chain came back unsuccessful');
	t.equal(results.story.length, 3, 'All methods added to story');

	results = validate('cow', {
		maxLength: 10,
		minLength: 3
	}).hasLetters().isPositive().meetsLength().finish();

	t.notOk(results.isValid, 'Chain came back unsuccessful');
	t.equal(results.story.length, 1, 'All methods added to story');
	t.end();
});

/* Run Tests against new custom style method */
test('Test CustomMethod Passing', t => {
	let custom = validate(['isNumber', 'isPositive'], {}, true);
	let results = custom(4);

	t.ok(results, 'Returned OK');
	t.ok(results.isValid, 'Value returned as Valid');

	results = custom('1000');
	t.ok(results.isValid, 'String but still holds a complete number, and is valid');

	custom = validate(['meetsLength', 'hasLetters'], {
		minLength: 3,
		maxLength: 5
	}, true);

	results = custom('h100');
	t.ok(results.isValid, 'Meets length and hasLetters valid');
	t.end();
});

test('Test Custom with only 2 arguments', t => {
	const custom = validate(['hasSpecialCharacters', 'hasLetters'], true);
	let results = custom('cool!@');

	t.ok(results.isValid, 'Results are valid');
	t.notOk(custom('cool').isValid, 'Results invalid no specials');
	t.notOk(custom('!@!$@#!').isValid, 'Results invalid no letters');
	t.end();
});

test('Test CustomMethod Failed', t => {
	const custom = validate(['isNumber', 'isPositive'], {}, true);
	let results = custom(-4);

	t.ok(results, 'Returned OK');
	t.notOk(results.isValid, 'Value returned as Invalid');

	results = custom('-1000');
	t.notOk(results.isValid, 'Value is originally a string but still a number, but is invalid');

	results = custom('cheese');
	t.notOk(results.isValid, 'Nothing about this is valid');
	t.equal(results.story.length, 2, 'Both tests should be recorded in the story');
	t.equal(results.story[0].test, 'isNumber', 'First failed test is the iNumber method');
	t.equal(results.story[1].test, 'isPositive', 'Second failed test is the isPositive method');
	t.end();
});
