'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var test = _interopDefault(require('tape'));

/* eslint-disable max-len */
const emailRegex = /^[\w\u00c0-\u017f][\w.-_\u00c0-\u017f]*[\w\u00c0-\u017f]+[@][\w\u00c0-\u017f][\w.-_\u00c0-\u017f]*[\w\u00c0-\u017f]+\.[a-z]{2,4}$/i;
const vinRegex = /^[a-hj-npr-z0-9]{9}[a-hj-npr-tv-y1-9]{1}[a-hj-npr-z0-9]{7}$/i;

const isDate = val => (/^((1[0-2])|(0?[1-9]))[-/.]?((0?[1-9])|([1-2][0-9])|(3[0-1]))[-/.]?(([1-2]{1}[0-9]{3})|([0-9]{2}))$/m).test(val);

const isDateShort = val => (/^((1[0-2])|(0?[1-9]))[-/.]?((0?[1-9])|([1-2][0-9])|(3[0-1]))[-/.]?$/m).test(val);

const isDateProper = val => (/^(([1-2]{1}[0-9]{3})|([0-9]{2}))[-/.]?((1[0-2])|(0?[1-9]))[-/.]?((0?[1-9])|([1-2][0-9])|(3[0-1]))$/m).test(val);

const isEmail = (val, email = emailRegex) => {
  if (email.emailPattern) {
    return email.emailPattern.test(val);
  }

  return email.test(val);
};

const isNumber = val => !isNaN(val);

const isPositive = val => !isNaN(val) && Number(val) >= 0;

const isNegative = val => !isNaN(val) && Number(val) < 0;

const isVin = (val, vin = vinRegex) => {
  if (vin.vinPattern) {
    return vin.vinPattern.test(val);
  }

  return vin.test(val);
};

const isZip = val => (/^\d{5}(-\d{4})?$/).test(val);

const isCAPostalCode = val => (/^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1} *\d{1}[A-Z]{1}\d{1}$/i).test(val);

const isPhone = val => (/^[0-9]{10}$/).test(val.replace(/\W/g, ''));

const isLicensePlate = val => (/^([A-Z]|[0-9]){1,3}(\s|-|•)?([A-Z]|[0-9]){3,5}$/i).test(val);

const isVisaCard = val => (/^4[0-9]{15}$/).test(val);

const isVisaPanCard = val => (/^4[0-9]{18}$/).test(val);

const isMasterCard = val => (/^5[1-5][0-9]{14}$/).test(val);

const isAmericanExpressCard = val => (/^3(4|7)[0-9]{13}$/).test(val);

const isDiscoverCard = val => (/^6[0-9]{15}$/).test(val);

const isBelowMax = (val, m = Infinity) => {
  if (m.max) {
    return !isNaN(val) && Number(val) < m.max;
  }

  return !isNaN(val) && Number(val) < m;
};

const isAboveMin = (val, m = -Infinity) => {
  if (m.min) {
    return !isNaN(val) && Number(val) > m.min;
  }

  return !isNaN(val) && Number(val) > m;
};

test('Testing isDate', t => {
  t.ok(isDate);
  t.ok(isDate('03-28-2017'), 'Returns that this is indeed a date');
  t.ok(isDate('03.28.2017'), 'Returns valid as date with dots');
  t.ok(isDate('03/28/2017'), 'Returns valid as date with slashes');
  t.ok(isDate('03/28/17'), 'Returns valid as date with slashes & short year');
  t.ok(isDate('03282017'), 'Returns valid as date with no specials');
  t.ok(isDate('032817'), 'Returns valid as date with short year & no specials');
  t.notOk(isDate('03-27'), 'Returns not full date');
  t.notOk(isDate('ff/05/yyyy'), 'Returns not proper date');
  t.end();
});

test('Testing isDateShort', t => {
  t.ok(isDateShort);
  t.ok(isDateShort('03-28'), 'Returns that this is indeed a date');
  t.ok(isDateShort('03.28'), 'Returns valid as date with dots');
  t.ok(isDateShort('03/28'), 'Returns valid as date with slashes');
  t.notOk(isDateShort('03-27-2018'), 'Returns not short date');
  t.notOk(isDateShort('ff/05/yyyy'), 'Returns not proper date');
  t.end();
});

test('Testing isDateProper', t => {
  t.ok(isDateProper);
  t.ok(isDateProper('2017-03-28'), 'Returns that this is indeed a proper date');
  t.ok(isDateProper('2017.03.28'), 'Returns valid as date with dots');
  t.ok(isDateProper('2017/03/28'), 'Returns valid as date with slashes');
  t.notOk(isDateProper('03-27-2018'), 'Returns invalid not a proper date');
  t.notOk(isDateProper('ff/05/yyyy'), 'Returns not proper date');
  t.end();
});

test('Testing isEmail', t => {
  t.ok(isEmail);
  t.ok(isEmail('coolkid17@AAAAAAHHHHHHHHHHHH.com'), 'valid yet annoying email address');
  t.ok(isEmail('coolkid778@aol.com'), 'Returned OK This is a email');
  t.ok(isEmail('IamEmail@cool.com'), 'That is indeed an email');
  t.notOk(isEmail('notEmail'), 'Indeed it is NOT an email');
  t.notOk(isEmail('coolkid77'), 'Returns invalid its not an email');
  t.notOk(isEmail('coolkid77@gmail'), 'Returns invalid email address format');
  t.notOk(isEmail('coolkid77@gmailcom'), 'Returns invalid email address format');
  t.notOk(isEmail('coolkid77@gmail-com'), 'Returns invalid email address format');
  t.notOk(isEmail('coolkid77gmail.com'), 'Returns invalid email address format');
  t.end();
});

test('Testing isNumber', t => {
  t.ok(isNumber);
  t.ok(isNumber('11234'), 'Is a number');
  t.notOk(isNumber('aaaaaa'), 'Is not a number');
  t.end();
});

test('Testing isPositive', t => {
  t.ok(isPositive);
  t.ok(isPositive('12'), 'Returned OK is a positive');
  t.ok(isPositive(12), 'Returned OK is a positive');
  t.notOk(isPositive('You Smell Good!'), 'This contains no positive numbers');
  t.notOk(isPositive(-1), 'Value is not positive');
  t.end();
});

test('Testing isNegative', t => {
  t.ok(isNegative);
  t.ok(isNegative('-12'), 'Returned OK is a Negative');
  t.ok(isNegative(-12), 'Returned OK is a Negative');
  t.notOk(isNegative('You Smell Bad!'), 'Is not a negative number');
  t.notOk(isNegative(5), '5 is not a negative number');
  t.notOk(isNegative(0), '0 is not a negative number');
  t.end();
});

test('Testing isVin', t => {
  t.ok(isVin);
  t.ok(isVin('JM1CW2BL8C0127808'), 'Returned OK This is a VIN');
  t.notOk(isVin('JM1CW2BL8C012780865'), 'Returned not valid, too long to be vin');
  t.notOk(isVin('112'), 'Returned not valid, not a vin');
  t.end();
});

test('Testing isZip', t => {
  t.ok(isZip);
  t.ok(isZip('77885'), 'Returned OK This is a Zip Code');
  t.notOk(isZip('778885'), 'Returned invalid not a zip code');
  t.notOk(isZip(''), 'Returned invalid not a zip code');
  t.end();
});

test('Testing isCAPostalCode', t => {
  t.ok(isCAPostalCode);
  t.ok(isCAPostalCode('K1A0B1'), 'Returned OK This is a Postal Code');
  t.notOk(isCAPostalCode('77885'), 'Invalid postal code for CA');
  t.end();
});

test('Testing isPhone', t => {
  t.ok(isPhone);
  t.ok(isPhone('888-555-9987'), 'Returned OK This is a phone format');
  t.ok(isPhone('888.555.9987'), 'Returned OK This is a phone format');
  t.ok(isPhone('8885559987'), 'Returned OK This is a phone format');
  t.notOk(isPhone('88-444-8877'), 'Returned invalid this is not a valid phone');
  t.notOk(isPhone('8888-4444-8877'), 'Returned invalid this is not a valid phone');
  t.end();
});

test('Testing isLicensePlate', t => {
  t.ok(isLicensePlate);
  t.ok(isLicensePlate('SSS1829'), 'Returned OK This is a license plate format');
  t.ok(isLicensePlate('SSS-1829'), 'Returned OK This is a license plate format');
  t.ok(isLicensePlate('SSS•1829'), 'Returned OK This is a license plate format');
  t.notOk(isLicensePlate('SSS 18'), 'Invalid plate is too short');
  t.notOk(isLicensePlate('SSSS 188'), 'Invalid plate is too long');
  t.end();
});

test('Testing isVisaCard', t => {
  t.ok(isVisaCard);
  t.ok(isVisaCard('4111111111111111'), 'Returned OK This is a Visa card format');
  t.notOk(isVisaCard('5111111111111111'), 'Invalid lead number');
  t.notOk(isVisaCard('41111111111111111'), 'Invalid to long');
  t.notOk(isVisaCard('411111111111111'), 'Invalid to short');
  t.notOk(isVisaCard('55544444444444GGF'), 'Invalid bad start number and has letters');
  t.notOk(isVisaCard('4111111111111GGF'), 'Invalid bad has letters');
  t.end();
});

test('Testing isVisaPanCard', t => {
  t.ok(isVisaPanCard);
  t.ok(isVisaPanCard('4111111111111111222'), 'Returned OK This is a Visa card format');
  t.notOk(isVisaPanCard('5111111111111111222'), 'Invalid lead number');
  t.notOk(isVisaPanCard('411111111111111112222'), 'Invalid to long');
  t.notOk(isVisaPanCard('411111111111111222'), 'Invalid to short');
  t.notOk(isVisaPanCard('55544444444444GGF'), 'Invalid bad start number and has letters');
  t.notOk(isVisaPanCard('4111111111111GGF'), 'Invalid bad has letters');
  t.end();
});

test('Testing isMasterCard', t => {
  t.ok(isMasterCard);
  t.ok(isMasterCard('5511111111111111'), 'Returned OK This is a MasterCard format');
  t.notOk(isMasterCard('5711111111111111'), 'Invalid 2nd digit (not 1-5)');
  t.notOk(isMasterCard('7511111111111111'), 'Invalid 1st digit (not 5)');
  t.notOk(isMasterCard('55511111111111111'), 'Invalid to long');
  t.notOk(isMasterCard('551111111111111'), 'Invalid to short');
  t.notOk(isMasterCard('551111111111111G'), 'Invalid to short');
  t.notOk(isMasterCard('5511111111111111GG'), 'Invalid to short');
  t.end();
});

test('Testing isAmericanExpressCard', t => {
  t.ok(isAmericanExpressCard);
  t.ok(isAmericanExpressCard('341111111111111'), 'Returned valid format');
  t.notOk(isAmericanExpressCard('381111111111111'), 'Invalid 2nd digit (not 4 or 7)');
  t.notOk(isAmericanExpressCard('541111111111111'), 'Invalid 1st digit (not 3)');
  t.notOk(isAmericanExpressCard('3411111111111111'), 'Invalid to long');
  t.notOk(isAmericanExpressCard('34111111111111'), 'Invalid to short');
  t.notOk(isAmericanExpressCard('34111111111111GG'), 'Invalid to short');
  t.end();
});

test('Testing isDiscoverCard', t => {
  t.ok(isDiscoverCard);
  t.ok(isDiscoverCard('6111111111111111'), 'Returned OK This is a Discover card format');
  t.notOk(isDiscoverCard('5111111111111111'), 'Invalid lead number');
  t.notOk(isDiscoverCard('41111111111111111'), 'Invalid to long');
  t.notOk(isDiscoverCard('411111111111111'), 'Invalid to short');
  t.notOk(isDiscoverCard('55544444444444GGF'), 'Invalid bad start number and has letters');
  t.notOk(isDiscoverCard('4111111111111GGF'), 'Invalid bad has letters');
  t.end();
});

test('Testing isBelowMax', t => {
  t.ok(isBelowMax);
  t.ok(isBelowMax('7', 8), 'Returned OK This is below max');
  t.notOk(isBelowMax('9', 8), 'Invalid exceeds/matches max');
  t.end();
});

test('Testing isAboveMin', t => {
  t.ok(isAboveMin);
  t.ok(isAboveMin('5', 4), 'Returned OK This is above min');
  t.notOk(isAboveMin('3', 4), 'Invalid below min');
  t.end();
});
