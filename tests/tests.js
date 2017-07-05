'use strict';

const test = require('tape');
const validate = require('../dist/simply_valid.umd.js');

const testData = {
	zip: '11445',
	address: '1132 Cool St'
};

test('Test hasValue()', t => {
	const custom = validate(['hasValue'], true);

	t.ok(validate(testData.zip).hasValue().finish().isValid, 'Value Test passed');
	t.notOk(validate('').hasValue().finish().isValid, 'Value is not present so test is not valid');
	t.ok(custom(testData.zip).isValid, 'Custom Function returned valid');
	t.notOk(custom('').isValid, 'Custom function invalid no value found');
	t.end();
});

test('Test hasNumbers()', t => {
	const custom = validate(['hasNumbers'], true);

	t.ok(validate(testData.zip).hasNumbers().finish().isValid, 'Value has numbers');
	t.notOk(validate('$$#@').hasNumbers().finish().isValid, 'No numbers invalid test');
	t.ok(custom(testData.zip).isValid, 'Value has numbers');
	t.notOk(custom('$$#@').isValid, 'No numbers invalid test');
	t.end();
});

test('Test hasLetters()', t => {
	const custom = validate(['hasLetters'], true);

	t.ok(validate(testData.address).hasLetters().finish().isValid, 'Value has letters');
	t.notOk(validate(testData.zip).hasLetters().finish().isValid, 'No letters invalid test');
	t.ok(custom(testData.address).isValid, 'Value has letters');
	t.notOk(custom(testData.zip).isValid, 'No letters invalid test');
	t.end();
});

test('Test hasCustom()', t => {
	t.ok(validate(testData.zip, {
		basePattern: '[0-9]'
	}).hasCustom().finish().isValid, 'Custom Test passed');
	t.end();
});

test('Test hasNumbersOrSpecials()', t => {
	const custom = validate(['hasNumbersOrSpecials'], true);

	t.ok(validate(testData.address).hasNumbersOrSpecials().finish().isValid, 'Has Numbers passed');
	t.ok(validate('$$%#@@HI!').hasNumbersOrSpecials().finish().isValid, 'Has Special Characters');
	t.notOk(validate('HELLO').hasNumbersOrSpecials().finish().isValid, 'Does not have numbers or special chars');
	t.ok(custom(testData.address).isValid, 'Has Numbers passed');
	t.ok(custom('$$%#@@HI!').isValid, 'Has Special Characters');
	t.notOk(custom('HELLO').isValid, 'Does not have numbers or special chars');
	t.end();
});

test('Test hasSpecialCharacters()', t => {
	const custom = validate(['hasSpecialCharacters'], true);

	t.ok(validate('$$%#@@HI!').hasSpecialCharacters().finish().isValid, 'Has Special Characters');
	t.notOk(validate('HELLO').hasSpecialCharacters().finish().isValid, 'Does not have Special Characters');
	t.ok(custom('$$%#@@HI!').isValid, 'Has Special Characters');
	t.notOk(custom('HELLO').isValid, 'Does not have Special Characters');
	t.end();
});

test('Test hasUpperAndLowerCase()', t => {
	const custom = validate(['hasUpperAndLowerCase'], true);

	t.ok(validate('Hi').hasUpperAndLowerCase().finish().isValid, 'Has Upper and Lower Case');
	t.notOk(validate('hi').hasUpperAndLowerCase().finish().isValid, 'Does not have upper and lower case');
	t.ok(custom('Hi').isValid, 'Has Upper and Lower Case');
	t.notOk(custom('hi').isValid, 'Does not have upper and lower case');
	t.end();
});

test('Test isNumber()', t => {
	const custom = validate(['isNumber'], true);

	t.ok(validate(testData.zip).isNumber().finish().isValid, 'Should return that it is a number');
	t.notOk(validate('Cheese').isNumber().finish().isValid, 'Is not a number');
	t.ok(custom(testData.zip).isValid, 'Should return that it is a number');
	t.notOk(custom('Cheese').isValid, 'Is not a number');
	t.end();
});

test('Test isPositive()', t => {
	const custom = validate(['isPositive'], true);

	t.ok(validate('12').isPositive().finish().isValid, 'Returned OK is a positive');
	t.ok(validate(12).isPositive().finish().isValid, 'Returned OK is a positive');
	t.notOk(validate('You Smell Good!').isPositive().finish().isValid, 'This contains no positive numbers');
	t.equal(validate('You Smell Good!').isPositive().finish().story.length, 1, 'Story returned with a length of 1');
	t.notOk(validate(-1).isPositive().finish().isValid, 'Value is not positive');
	t.ok(custom('12').isValid, 'Returned OK is a positive');
	t.ok(custom(12).isValid, 'Returned OK is a positive');
	t.notOk(custom('You Smell Good!').isValid, 'This contains no positive numbers');
	t.equal(custom('You Smell Good!').story.length, 1, 'Story returned with a length of 1');
	t.notOk(custom(-1).isValid, 'Value is not positive');
	t.end();
});

test('Test isNegative()', t => {
	const custom = validate(['isNegative'], true);

	t.ok(validate('-12').isNegative().finish().isValid, 'Returned OK is a Negative');
	t.ok(validate(-12).isNegative().finish().isValid, 'Returned OK is a Negative');
	t.notOk(validate('You Smell Bad!').isNegative().finish().isValid, 'Is not a negative number');
	t.notOk(validate(5).isNegative().finish().isValid, '5 is not a negative number');
	t.notOk(validate(0).isNegative().finish().isValid, '0 is not a negative number');
	t.ok(custom('-12').isValid, 'Returned OK is a Negative');
	t.ok(custom(-12).isValid, 'Returned OK is a Negative');
	t.notOk(custom('You Smell Bad!').isValid, 'Is not a negative number');
	t.notOk(custom(5).isValid, '5 is not a negative number');
	t.notOk(custom(0).isValid, '0 is not a negative number');
	t.end();
});

test('Test isVin()', t => {
	const custom = validate(['isVin'], true);

	t.ok(validate('JM1CW2BL8C0127808').isVin().finish().isValid, 'Returned OK This is a VIN');
	t.notOk(validate('JM1CW2BL8C012780865').isVin().finish().isValid, 'Returned not valid, too long to be vin');
	t.notOk(validate('112').isVin().finish().isValid, 'Returned not valid, not a vin');
	t.ok(custom('JM1CW2BL8C0127808').isValid, 'Returned OK This is a VIN');
	t.notOk(custom('JM1CW2BL8C012780865').isValid, 'Returned not valid, too long to be vin');
	t.notOk(custom('112').isValid, 'Returned not valid, not a vin');
	t.end();
});

test('Test isDate()', t => {
	const custom = validate(['isDate'], true);

	t.ok(validate('03-28-2017').isDate().finish().isValid, 'Returns that this is indeed a date');
	t.ok(validate('03.28.2017').isDate().finish().isValid, 'Returns valid as date with dots');
	t.ok(validate('03/28/2017').isDate().finish().isValid, 'Returns valid as date with slashes');
	t.ok(validate('03/28/17').isDate().finish().isValid, 'Returns valid as date with slashes & short year');
	t.ok(validate('03282017').isDate().finish().isValid, 'Returns valid as date with no specials');
	t.ok(validate('032817').isDate().finish().isValid, 'Returns valid as date with short year & no specials');
	t.notOk(validate('03-27').isDate().finish().isValid, 'Returns not full date');
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
	const custom = validate(['isDateShort'], true);

	t.ok(validate('03-28').isDateShort().finish().isValid, 'Returns that this is indeed a date');
	t.ok(validate('03.28').isDateShort().finish().isValid, 'Returns valid as date with dots');
	t.ok(validate('03/28').isDateShort().finish().isValid, 'Returns valid as date with slashes');
	t.notOk(validate('03-27-2018').isDateShort().finish().isValid, 'Returns not short date');
	t.ok(custom('03-28').isValid, 'Returns that this is indeed a date');
	t.ok(custom('03.28').isValid, 'Returns valid as date with dots');
	t.ok(custom('03/28').isValid, 'Returns valid as date with slashes');
	t.notOk(custom('03-27-2018').isValid, 'Returns not short date');
	t.end();
});

test('Test isDateProper()', t => {
	const custom = validate(['isDateProper'], true);

	t.ok(validate('2017-03-28').isDateProper().finish().isValid, 'Returns that this is indeed a proper date');
	t.ok(validate('2017.03.28').isDateProper().finish().isValid, 'Returns valid as date with dots');
	t.ok(validate('2017/03/28').isDateProper().finish().isValid, 'Returns valid as date with slashes');
	t.notOk(validate('03-27-2018').isDateProper().finish().isValid, 'Returns invalid not a proper date');
	t.ok(custom('2017-03-28').isValid, 'Returns that this is indeed a proper date');
	t.ok(custom('2017.03.28').isValid, 'Returns valid as date with dots');
	t.ok(custom('2017/03/28').isValid, 'Returns valid as date with slashes');
	t.notOk(custom('03-27-2018').isValid, 'Returns invalid not a proper date');
	t.end();
});

test('Test isEmail()', t => {
	const custom = validate(['isEmail'], true);

	t.ok(validate('coolkid778@aol.com').isEmail().finish().isValid, 'Returned OK This is a email');
	t.ok(validate('coolkid17@AAAAAAHHHHHHHHHHHH.com').isEmail().finish().isValid, 'valid yet annoying email address');
	t.ok(validate('IamEmail@cool.com').isEmail().finish().isValid, 'That is indeed an email');
	t.notOk(validate('notEmail').isEmail().finish().isValid, 'Indeed it is NOT an email');
	t.notOk(validate('coolkid77').isEmail().finish().isValid, 'Returns invalid its not an email');
	t.notOk(validate('coolkid77@gmail').isEmail().finish().isValid, 'Returns invalid email address format');
	t.notOk(validate('coolkid77@gmailcom').isEmail().finish().isValid, 'Returns invalid email address format');
	t.notOk(validate('coolkid77@gmail-com').isEmail().finish().isValid, 'Returns invalid email address format');
	t.notOk(validate('coolkid77gmail.com').isEmail().finish().isValid, 'Returns invalid email address format');
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
	const custom = validate(['isZip'], true);

	t.ok(validate('77885').isZip().finish().isValid, 'Returned OK This is a Zip Code');
	t.notOk(validate('778885').isZip().finish().isValid, 'Returned invalid not a zip code');
	t.notOk(validate('').isZip().finish().isValid, 'Returned invalid not a zip code');
	t.ok(custom('77885').isValid, 'Returned OK This is a Zip Code');
	t.notOk(custom('778885').isValid, 'Returned invalid not a zip code');
	t.notOk(custom('').isValid, 'Returned invalid not a zip code');
	t.end();
});

test('Test isCAPostalCode()', t => {
	const custom = validate(['isCAPostalCode'], true);

	t.ok(validate('K1A0B1').isCAPostalCode().finish().isValid, 'Returned OK This is a Postal Code');
	t.notOk(validate('77885').isCAPostalCode().finish().isValid, 'Invalid postal code for CA');
	t.ok(custom('K1A0B1').isValid, 'Returned OK This is a Postal Code');
	t.notOk(custom('77885').isValid, 'Invalid postal code for CA');
	t.end();
});

test('Test isPhone()', t => {
	const custom = validate(['isPhone'], true);

	t.ok(validate('888-555-9987').isPhone().finish().isValid, 'Returned OK This is a phone format');
	t.ok(validate('888.555.9987').isPhone().finish().isValid, 'Returned OK This is a phone format');
	t.ok(validate('8885559987').isPhone().finish().isValid, 'Returned OK This is a phone format');
	t.notOk(validate('88-444-8877').isPhone().finish().isValid, 'Returned invalid this is not a valid phone');
	t.notOk(validate('8888-4444-8877').isPhone().finish().isValid, 'Returned invalid this is not a valid phone');
	t.ok(custom('888-555-9987').isValid, 'Returned OK This is a phone format');
	t.ok(custom('888.555.9987').isValid, 'Returned OK This is a phone format');
	t.ok(custom('8885559987').isValid, 'Returned OK This is a phone format');
	t.notOk(custom('88-444-8877').isValid, 'Returned invalid this is not a valid phone');
	t.notOk(custom('8888-4444-8877').isValid, 'Returned invalid this is not a valid phone');
	t.end();
});

test('Test isLicensePlate()', t => {
	const custom = validate(['isLicensePlate'], true);

	t.ok(validate('SSS1829').isLicensePlate().finish().isValid, 'Returned OK This is a license plate format');
	t.ok(validate('SSS-1829').isLicensePlate().finish().isValid, 'Returned OK This is a license plate format');
	t.ok(validate('SSS•1829').isLicensePlate().finish().isValid, 'Returned OK This is a license plate format');
	t.notOk(validate('SSS 18').isLicensePlate().finish().isValid, 'Invalid plate is too short');
	t.notOk(validate('SSSS 188').isLicensePlate().finish().isValid, 'Invalid plate is too long');
	t.ok(custom('SSS1829').isValid, 'Returned OK This is a license plate format');
	t.ok(custom('SSS-1829').isValid, 'Returned OK This is a license plate format');
	t.ok(custom('SSS•1829').isValid, 'Returned OK This is a license plate format');
	t.notOk(custom('SSS 18').isValid, 'Invalid plate is too short');
	t.notOk(custom('SSSS 188').isValid, 'Invalid plate is too long');
	t.end();
});

test('Test isVisaCard()', t => {
	const custom = validate(['isVisaCard'], true);

	t.ok(validate('4111111111111111').isVisaCard().finish().isValid, 'Returned OK This is a Visa card format');
	t.notOk(validate('5111111111111111').isVisaCard().finish().isValid, 'Invalid lead number');
	t.notOk(validate('41111111111111111').isVisaCard().finish().isValid, 'Invalid to long');
	t.notOk(validate('411111111111111').isVisaCard().finish().isValid, 'Invalid to short');
	t.notOk(validate('55544444444444GGF').isVisaCard().finish().isValid, 'Invalid bad start number and has letters');
	t.notOk(validate('4111111111111GGF').isVisaCard().finish().isValid, 'Invalid bad has letters');
	t.ok(custom('4111111111111111').isValid, 'Returned OK This is a Visa card format');
	t.notOk(custom('5111111111111111').isValid, 'Invalid lead number');
	t.notOk(custom('41111111111111111').isValid, 'Invalid to long');
	t.notOk(custom('411111111111111').isValid, 'Invalid to short');
	t.notOk(custom('55544444444444GGF').isValid, 'Invalid bad start number and has letters');
	t.notOk(custom('4111111111111GGF').isValid, 'Invalid bad has letters');
	t.end();
});

test('Test isMasterCard()', t => {
	const custom = validate(['isMasterCard'], true);

	t.ok(validate('5511111111111111').isMasterCard().finish().isValid, 'Returned OK This is a MasterCard format');
	t.notOk(validate('5711111111111111').isMasterCard().finish().isValid, 'Invalid 2nd digit (not 1-5)');
	t.notOk(validate('7511111111111111').isMasterCard().finish().isValid, 'Invalid 1st digit (not 5)');
	t.notOk(validate('55511111111111111').isMasterCard().finish().isValid, 'Invalid to long');
	t.notOk(validate('551111111111111').isMasterCard().finish().isValid, 'Invalid to short');
	t.notOk(validate('551111111111111G').isMasterCard().finish().isValid, 'Invalid to short');
	t.notOk(validate('5511111111111111GG').isMasterCard().finish().isValid, 'Invalid to short');
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
	const custom = validate(['isAmericanExpressCard'], true);

	t.ok(validate('341111111111111').isAmericanExpressCard().finish().isValid, 'Returned valid format');
	t.notOk(validate('381111111111111').isAmericanExpressCard().finish().isValid, 'Invalid 2nd digit (not 4 or 7)');
	t.notOk(validate('541111111111111').isAmericanExpressCard().finish().isValid, 'Invalid 1st digit (not 3)');
	t.notOk(validate('3411111111111111').isAmericanExpressCard().finish().isValid, 'Invalid to long');
	t.notOk(validate('34111111111111').isAmericanExpressCard().finish().isValid, 'Invalid to short');
	t.notOk(validate('34111111111111GG').isAmericanExpressCard().finish().isValid, 'Invalid to short');
	t.ok(custom('341111111111111').isValid, 'Returned valid format');
	t.notOk(custom('381111111111111').isValid, 'Invalid 2nd digit (not 4 or 7)');
	t.notOk(custom('541111111111111').isValid, 'Invalid 1st digit (not 3)');
	t.notOk(custom('3411111111111111').isValid, 'Invalid to long');
	t.notOk(custom('34111111111111').isValid, 'Invalid to short');
	t.notOk(custom('34111111111111GG').isValid, 'Invalid to short');
	t.end();
});

test('Test matchesCustom()', t => {
	t.ok(validate('Cheese').matchesCustom(/[A-Z]/gi).finish().isValid, 'Matched custom pattern');
	t.ok(validate('2').matchesCustom(/[0-9]/gi).finish().isValid, 'Matched custom pattern');
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
	const custom = validate(['matchesPattern'], {
		basePattern: /[a-z]/i
	}, true);

	t.ok(validate('Chicken', {
		basePattern: /[a-z]/ig
	}).matchesPattern().finish().isValid, 'Given value matches pattern');
	t.notOk(validate('123456', {
		basePattern: /[a-z]/ig
	}).matchesPattern().finish().isValid, 'Given value does not match pattern');
	t.ok(custom('Chicken').isValid, 'Given value matches pattern');
	t.notOk(custom('123456').isValid, 'Given value does not match pattern');
	t.end();
});

test('Test doesNotMatch()', t => {
	const custom = validate(['doesNotMatch'], true);

	t.notOk(validate('CoolKid112', {
		antiPattern: /[A-Z]/ig
	}).doesNotMatch().finish().isValid, 'Given value matched anti pattern');
	t.ok(validate('CoolKid112', {
		antiPattern: /\s/ig
	}).doesNotMatch().finish().isValid, 'Given value did not get a match in anti pattern');
	t.notOk(custom('CoolKid112', {
		antiPattern: /[A-Z]/ig
	}).isValid, 'Given value matched anti pattern');
	t.ok(custom('CoolKid112', {
		antiPattern: /\s/ig
	}).isValid, 'Given value did not get a match in anti pattern');
	t.end();
});

test('Test meetsLength()', t => {
	const custom = validate(['meetsLength'], true);

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
	t.ok(custom(testData.zip, {
		maxLength: 5,
		minLength: 5
	}).isValid, 'Returns OK within our length limits');
	t.notOk(custom(testData.zip, {
		maxLength: 6,
		minLength: 6
	}).isValid, 'Invalid does not meet min length');
	t.notOk(custom(testData.zip, {
		maxLength: 4,
		minLength: 4
	}).isValid, 'Invalid does not meet max length');
	t.end();
});

test('Test meetsYearStandard()', t => {
	const custom = validate(['meetsYearStandard'], true);

	t.ok(validate('2017').meetsYearStandard().finish().isValid, 'Proper 4 digit format');
	t.ok(validate('17').meetsYearStandard().finish().isValid, 'Proper 2 digit format');
	t.notOk(validate('178').meetsYearStandard().finish().isValid, 'Invalid 3 digit format');
	t.ok(custom('2017').isValid, 'Proper 4 digit format');
	t.ok(custom('17').isValid, 'Proper 2 digit format');
	t.notOk(custom('178').isValid, 'Invalid 3 digit format');
	t.end();
});

test('Test meetsCVN()', t => {
	const custom = validate(['meetsCVN'], true);

	t.ok(validate('201').meetsCVN().finish().isValid, 'Proper 3 digit CVN format');
	t.notOk(validate('2011').meetsCVN().finish().isValid, 'Invalid format for CVN');
	t.ok(custom('201').isValid, 'Proper 3 digit CVN format');
	t.notOk(custom('2011').isValid, 'Invalid format for CVN');
	t.end();
});

test('Test meetsCVNAmex()', t => {
	t.ok(validate('2081').meetsCVNAmex().finish().isValid, 'Proper 4 digit CVN Amex format');
	t.notOk(validate('208').meetsCVNAmex().finish().isValid, 'Invalid format for CVN Amex');
	t.end();
});

test('Test meetsTreadDepth()', t => {
	const custom = validate(['meetsTreadDepth'], true);

	t.ok(validate('12').meetsTreadDepth().finish().isValid, 'Proper tread depth format');
	t.notOk(validate('AA').meetsTreadDepth().finish().isValid, 'Invalid tread depth format');
	t.ok(custom('12').isValid, 'Proper tread depth format');
	t.notOk(custom('AA').isValid, 'Invalid tread depth format');
	t.end();
});

test('Test noSpecials()', t => {
	const custom = validate(['noSpecials'], true);

	t.ok(validate(testData.zip).noSpecials().finish().isValid, 'Returned OK no specials');
	t.ok(validate('IAmCool123').noSpecials().finish().isValid, 'Returned valid no specials in sentence');
	t.notOk(validate('I am cool 123').noSpecials().finish().isValid, 'Returned invalid spaces in sentence');
	t.notOk(validate('Cool!!@').noSpecials().finish().isValid, 'Invalid does have specials');
	t.equal(validate('Cool!!@').noSpecials().finish().story.length, 1, 'Put error in story');
	t.ok(custom(testData.zip).isValid, 'Returned OK no specials');
	t.ok(custom('IAmCool123').isValid, 'Returned valid no specials in sentence');
	t.notOk(custom('I am cool 123').isValid, 'Returned invalid spaces in sentence');
	t.notOk(custom('Cool!!@').isValid, 'Invalid does have specials');
	t.equal(custom('Cool!!@').story.length, 1, 'Put error in story');
	t.end();
});

test('Test noNumbers()', t => {
	const custom = validate(['noNumbers'], true);

	t.ok(validate('Chicken').noNumbers().finish().isValid, 'Returned OK no Numbers');
	t.notOk(validate('chicken1').noNumbers().finish().isValid, 'Invalid value contained numbers');
	t.ok(custom('Chicken').isValid, 'Returned OK no Numbers');
	t.notOk(custom('chicken1').isValid, 'Invalid value contained numbers');
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
