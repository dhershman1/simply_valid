'use strict';

const test = require('tape');
const validate = require('../dist/simply_valid.umd.js').simplyValid;

const testData = {
	zip: '11445',
	address: '1132 Cool St'
};

test('Test hasValue()', t => {
	const custom = validate(['hasValue']);

	t.ok(custom(testData.zip).isValid, 'Custom Function returned valid');
	t.notOk(custom('').isValid, 'Custom function invalid no value found');
	t.end();
});

test('Test hasNumbers()', t => {
	const custom = validate(['hasNumbers']);

	t.ok(custom(testData.zip).isValid, 'Value has numbers');
	t.notOk(custom('$$#@').isValid, 'No numbers invalid test');
	t.end();
});

test('Test hasLetters()', t => {
	const custom = validate(['hasLetters']);

	t.ok(custom(testData.address).isValid, 'Value has letters');
	t.notOk(custom(testData.zip).isValid, 'No letters invalid test');
	t.end();
});

test('Test hasNumbersOrSpecials()', t => {
	const custom = validate(['hasNumbersOrSpecials']);

	t.ok(custom(testData.address).isValid, 'Has Numbers passed');
	t.ok(custom('$$%#@@HI!').isValid, 'Has Special Characters');
	t.notOk(custom('HELLO').isValid, 'Does not have numbers or special chars');
	t.end();
});

test('Test hasSpecialCharacters()', t => {
	const custom = validate(['hasSpecialCharacters']);

	t.ok(custom('$$%#@@HI!').isValid, 'Has Special Characters');
	t.notOk(custom('HELLO').isValid, 'Does not have Special Characters');
	t.end();
});

test('Test hasUpperAndLowerCase()', t => {
	const custom = validate(['hasUpperAndLowerCase']);

	t.ok(custom('Hi').isValid, 'Has Upper and Lower Case');
	t.notOk(custom('hi').isValid, 'Does not have upper and lower case');
	t.end();
});

test('Test isNumber()', t => {
	const custom = validate(['isNumber']);

	t.ok(custom(testData.zip).isValid, 'Should return that it is a number');
	t.notOk(custom('Cheese').isValid, 'Is not a number');
	t.end();
});

test('Test isPositive()', t => {
	const custom = validate(['isPositive']);

	t.ok(custom('12').isValid, 'Returned OK is a positive');
	t.ok(custom(12).isValid, 'Returned OK is a positive');
	t.notOk(custom('You Smell Good!').isValid, 'This contains no positive numbers');
	t.equal(custom('You Smell Good!').story.length, 1, 'Story returned with a length of 1');
	t.notOk(custom(-1).isValid, 'Value is not positive');
	t.end();
});

test('Test isNegative()', t => {
	const custom = validate(['isNegative']);

	t.ok(custom('-12').isValid, 'Returned OK is a Negative');
	t.ok(custom(-12).isValid, 'Returned OK is a Negative');
	t.notOk(custom('You Smell Bad!').isValid, 'Is not a negative number');
	t.notOk(custom(5).isValid, '5 is not a negative number');
	t.notOk(custom(0).isValid, '0 is not a negative number');
	t.end();
});

test('Test isVin()', t => {
	const custom = validate(['isVin']);

	t.ok(custom('JM1CW2BL8C0127808').isValid, 'Returned OK This is a VIN');
	t.notOk(custom('JM1CW2BL8C012780865').isValid, 'Returned not valid, too long to be vin');
	t.notOk(custom('112').isValid, 'Returned not valid, not a vin');
	t.end();
});

test('Test isDate()', t => {
	const custom = validate(['isDate']);

	t.ok(custom('03-28-2017').isValid, 'Returns that this is indeed a date');
	t.ok(custom('03.28.2017').isValid, 'Returns valid as date with dots');
	t.ok(custom('03/28/2017').isValid, 'Returns valid as date with slashes');
	t.ok(custom('03/28/17').isValid, 'Returns valid as date with slashes & short year');
	t.ok(custom('03282017').isValid, 'Returns valid as date with no specials');
	t.ok(custom('032817').isValid, 'Returns valid as date with short year & no specials');
	t.notOk(custom('03-27').isValid, 'Returns not full date');
	t.end();
});

test('Test isDateShort()', t => {
	const custom = validate(['isDateShort']);

	t.ok(custom('03-28').isValid, 'Returns that this is indeed a date');
	t.ok(custom('03.28').isValid, 'Returns valid as date with dots');
	t.ok(custom('03/28').isValid, 'Returns valid as date with slashes');
	t.notOk(custom('03-27-2018').isValid, 'Returns not short date');
	t.end();
});

test('Test isDateProper()', t => {
	const custom = validate(['isDateProper']);

	t.ok(custom('2017-03-28').isValid, 'Returns that this is indeed a proper date');
	t.ok(custom('2017.03.28').isValid, 'Returns valid as date with dots');
	t.ok(custom('2017/03/28').isValid, 'Returns valid as date with slashes');
	t.notOk(custom('03-27-2018').isValid, 'Returns invalid not a proper date');
	t.end();
});

test('Test isEmail()', t => {
	const custom = validate(['isEmail']);

	t.ok(custom('coolkid17@AAAAAAHHHHHHHHHHHH.com').isValid, 'valid yet annoying email address');
	t.ok(custom('coolkid778@aol.com').isValid, 'Returned OK This is a email');
	t.ok(custom('IamEmail@cool.com').isValid, 'That is indeed an email');
	t.notOk(custom('notEmail').isValid, 'Indeed it is NOT an email');
	t.notOk(custom('coolkid77').isValid, 'Returns invalid its not an email');
	t.notOk(custom('coolkid77@gmail').isValid, 'Returns invalid email address format');
	t.notOk(custom('coolkid77@gmailcom').isValid, 'Returns invalid email address format');
	t.notOk(custom('coolkid77@gmail-com').isValid, 'Returns invalid email address format');
	t.notOk(custom('coolkid77gmail.com').isValid, 'Returns invalid email address format');
	t.end();
});


test('Test isZip()', t => {
	const custom = validate(['isZip']);

	t.ok(custom('77885').isValid, 'Returned OK This is a Zip Code');
	t.notOk(custom('778885').isValid, 'Returned invalid not a zip code');
	t.notOk(custom('').isValid, 'Returned invalid not a zip code');
	t.end();
});

test('Test isCAPostalCode()', t => {
	const custom = validate(['isCAPostalCode']);

	t.ok(custom('K1A0B1').isValid, 'Returned OK This is a Postal Code');
	t.notOk(custom('77885').isValid, 'Invalid postal code for CA');
	t.end();
});

test('Test isPhone()', t => {
	const custom = validate(['isPhone']);

	t.ok(custom('888-555-9987').isValid, 'Returned OK This is a phone format');
	t.ok(custom('888.555.9987').isValid, 'Returned OK This is a phone format');
	t.ok(custom('8885559987').isValid, 'Returned OK This is a phone format');
	t.notOk(custom('88-444-8877').isValid, 'Returned invalid this is not a valid phone');
	t.notOk(custom('8888-4444-8877').isValid, 'Returned invalid this is not a valid phone');
	t.end();
});

test('Test isLicensePlate()', t => {
	const custom = validate(['isLicensePlate']);

	t.ok(custom('SSS1829').isValid, 'Returned OK This is a license plate format');
	t.ok(custom('SSS-1829').isValid, 'Returned OK This is a license plate format');
	t.ok(custom('SSS•1829').isValid, 'Returned OK This is a license plate format');
	t.notOk(custom('SSS 18').isValid, 'Invalid plate is too short');
	t.notOk(custom('SSSS 188').isValid, 'Invalid plate is too long');
	t.end();
});

test('Test isVisaCard()', t => {
	const custom = validate(['isVisaCard']);

	t.ok(custom('4111111111111111').isValid, 'Returned OK This is a Visa card format');
	t.notOk(custom('5111111111111111').isValid, 'Invalid lead number');
	t.notOk(custom('41111111111111111').isValid, 'Invalid to long');
	t.notOk(custom('411111111111111').isValid, 'Invalid to short');
	t.notOk(custom('55544444444444GGF').isValid, 'Invalid bad start number and has letters');
	t.notOk(custom('4111111111111GGF').isValid, 'Invalid bad has letters');
	t.end();
});

test('Test isVisaPanCard()', t => {
	const custom = validate(['isVisaPanCard']);

	t.ok(custom('4111111111111111222').isValid, 'Returned OK This is a Visa card format');
	t.notOk(custom('5111111111111111222').isValid, 'Invalid lead number');
	t.notOk(custom('411111111111111112222').isValid, 'Invalid to long');
	t.notOk(custom('411111111111111222').isValid, 'Invalid to short');
	t.notOk(custom('55544444444444GGF').isValid, 'Invalid bad start number and has letters');
	t.notOk(custom('4111111111111GGF').isValid, 'Invalid bad has letters');
	t.end();
});

test('Test isMasterCard()', t => {
	const custom = validate(['isMasterCard']);

	t.ok(custom('5511111111111111').isValid, 'Returned OK This is a MasterCard format');
	t.notOk(custom('5711111111111111').isValid, 'Invalid 2nd digit (not 1-5)');
	t.notOk(custom('7511111111111111').isValid, 'Invalid 1st digit (not 5)');
	t.notOk(custom('55511111111111111').isValid, 'Invalid to long');
	t.notOk(custom('551111111111111').isValid, 'Invalid to short');
	t.notOk(custom('551111111111111G').isValid, 'Invalid to short');
	t.notOk(custom('5511111111111111GG').isValid, 'Invalid to short');
	t.end();
});

test('Test isAmericanExpressCard()', t => {
	const custom = validate(['isAmericanExpressCard']);

	t.ok(custom('341111111111111').isValid, 'Returned valid format');
	t.notOk(custom('381111111111111').isValid, 'Invalid 2nd digit (not 4 or 7)');
	t.notOk(custom('541111111111111').isValid, 'Invalid 1st digit (not 3)');
	t.notOk(custom('3411111111111111').isValid, 'Invalid to long');
	t.notOk(custom('34111111111111').isValid, 'Invalid to short');
	t.notOk(custom('34111111111111GG').isValid, 'Invalid to short');
	t.end();
});

test('Test isDiscoverCard()', t => {
	const custom = validate(['isDiscoverCard']);

	t.ok(custom('6111111111111111').isValid, 'Returned OK This is a Discover card format');
	t.notOk(custom('5111111111111111').isValid, 'Invalid lead number');
	t.notOk(custom('41111111111111111').isValid, 'Invalid to long');
	t.notOk(custom('411111111111111').isValid, 'Invalid to short');
	t.notOk(custom('55544444444444GGF').isValid, 'Invalid bad start number and has letters');
	t.notOk(custom('4111111111111GGF').isValid, 'Invalid bad has letters');
	t.end();
});

test('Test isBelowMax()', t => {
	const custom = validate(['isBelowMax'], {
		max: 8
	});

	t.ok(custom('7').isValid, 'Returned OK This is below max');
	t.notOk(custom('9').isValid, 'Invalid exceeds/matches max');
	t.end();
});

test('Test isAboveMin()', t => {
	const custom = validate(['isAboveMin'], {
		min: 4
	});

	t.ok(custom('5').isValid, 'Returned OK This is above min');
	t.notOk(custom('3').isValid, 'Invalid below min');
	t.end();
});

test('Test meetsMinMax()', t => {
	const custom = validate(['meetsMinMax'], {
		max: 5,
		min: 0
	});

	t.ok(custom(3).isValid, 'Returns OK within our min/max');
	t.notOk(custom(6).isValid, 'Invalid exceeds max');
	t.end();
});

test('Test meetsYearStandard()', t => {
	const custom = validate(['meetsYearStandard']);

	t.ok(custom('2017').isValid, 'Proper 4 digit format');
	t.ok(custom('17').isValid, 'Proper 2 digit format');
	t.notOk(custom('178').isValid, 'Invalid 3 digit format');
	t.end();
});

test('Test meetsCVN()', t => {
	const custom = validate(['meetsCVN']);

	t.ok(custom('201').isValid, 'Proper 3 digit CVN format');
	t.notOk(custom('2011').isValid, 'Invalid format for CVN');
	t.end();
});

test('Test meetsCVNAmex()', t => {
	const custom = validate(['meetsCVNAmex']);

	t.ok(custom('5301').isValid, 'Is an Amex CVN');
	t.notOk(custom('201').isValid, 'Invalid format for Amex CVN');
	t.end();
});

test('Test meetsTreadDepth()', t => {
	const custom = validate(['meetsTreadDepth']);

	t.ok(custom('12').isValid, 'Proper tread depth format');
	t.notOk(custom('AA').isValid, 'Invalid tread depth format');
	t.end();
});

test('Test meetsPassReq()', t => {
	const custom = validate(['meetsPassReq']);

	t.ok(custom('cOol12$d').isValid, 'Meets Password requirement');
	t.notOk(custom('AA').isValid, 'Invalid Does not meet password requirement');
	t.end();
});

test('Test noSpecials()', t => {
	const custom = validate(['noSpecials']);

	t.ok(custom(testData.zip).isValid, 'Returned OK no specials');
	t.ok(custom('IAmCool123').isValid, 'Returned valid no specials in sentence');
	t.notOk(custom('I am cool 123').isValid, 'Returned invalid spaces in sentence');
	t.notOk(custom('Cool!!@').isValid, 'Invalid does have specials');
	t.equal(custom('Cool!!@').story.length, 1, 'Put error in story');
	t.end();
});

test('Test noNumbers()', t => {
	const custom = validate(['noNumbers']);

	t.ok(custom('Chicken').isValid, 'Returned OK no Numbers');
	t.notOk(custom('chicken1').isValid, 'Invalid value contained numbers');
	t.end();
});

test('Test noLetters()', t => {
	const custom = validate(['noLetters']);

	t.ok(custom('1123').isValid, 'Returned OK no Letters');
	t.notOk(custom('chicken1').isValid, 'Invalid value contained letters');
	t.end();
});

test('Test creditCard()', t => {
	const custom = validate(['creditCard']);

	t.ok(custom('378282246310005').isValid, 'American Express Card validated');
	t.ok(custom('6011111111111117').isValid, 'Discover Card validated');
	t.ok(custom('5555555555554444').isValid, 'Master Card validated');
	t.ok(custom('4012888888881881').isValid, 'Visa Card validated');

	t.end();
});

test('Test date()', t => {
	const custom = validate(['date']);

	t.ok(custom('2017-03-28').isValid, 'Returns that this is indeed a proper date');
	t.ok(custom('03-28-2017').isValid, 'US standard date validated');
	t.ok(custom('03-28').isValid, 'Standard short date validated');

	t.end();
});

test('Test cvn()', t => {
	const custom = validate(['cvn']);

	t.ok(custom('2115').isValid, 'Returns that this is indeed a proper date');
	t.ok(custom('211').isValid, 'US standard date validated');

	t.end();
});

test('Test zipPost()', t => {
	const custom = validate(['zipPost']);

	t.ok(custom(testData.zip).isValid, 'Returns valid us zip');
	t.ok(custom('K1A 0B1').isValid, 'Returns valid Canada Zip');

	t.end();
});

test('Test simple stack of methods', t => {
	const custom = validate(['noSpecials', 'noNumbers']);


	t.ok(custom('Cool').isValid, 'No specials or numbers passed');
	t.notOk(custom('Cool12').isValid, 'Failed because numbers');
	t.notOk(custom('Cool12!').isValid, 'Failed because numbers & specials');
	t.end();
});
