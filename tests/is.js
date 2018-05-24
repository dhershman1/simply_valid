import {
  isAboveMin,
  isAmexCard,
  isBelowMax,
  isCAPostalCode,
  isCorrectLength,
  isDate,
  isDateProper,
  isDateShort,
  isDiscoverCard,
  isEmail,
  isLicensePlate,
  isMasterCard,
  isNegative,
  isNotTooLong,
  isNotTooShort,
  isNumber,
  isPhone,
  isPositive,
  isVin,
  isVisaCard,
  isVisaPanCard,
  isZip
} from '../src/is'
import test from 'tape'

test('Testing isDate', t => {
  t.ok(isDate)
  t.ok(isDate('03-28-2017'), 'Returns that this is indeed a date')
  t.ok(isDate('03.28.2017'), 'Returns valid as date with dots')
  t.ok(isDate('03/28/2017'), 'Returns valid as date with slashes')
  t.ok(isDate('03/28/17'), 'Returns valid as date with slashes & short year')
  t.ok(isDate('03282017'), 'Returns valid as date with no specials')
  t.ok(isDate('032817'), 'Returns valid as date with short year & no specials')
  t.notOk(isDate('03-27'), 'Returns not full date')
  t.notOk(isDate('ff/05/yyyy'), 'Returns not proper date')
  t.end()
})

test('Testing isDateShort', t => {
  t.ok(isDateShort)
  t.ok(isDateShort('03-28'), 'Returns that this is indeed a date')
  t.ok(isDateShort('03.28'), 'Returns valid as date with dots')
  t.ok(isDateShort('03/28'), 'Returns valid as date with slashes')
  t.notOk(isDateShort('03-27-2018'), 'Returns not short date')
  t.notOk(isDateShort('ff/05/yyyy'), 'Returns not proper date')
  t.end()
})

test('Testing isDateProper', t => {
  t.ok(isDateProper)
  t.ok(isDateProper('2017-03-28'), 'Returns that this is indeed a proper date')
  t.ok(isDateProper('2017.03.28'), 'Returns valid as date with dots')
  t.ok(isDateProper('2017/03/28'), 'Returns valid as date with slashes')
  t.notOk(isDateProper('03-27-2018'), 'Returns invalid not a proper date')
  t.notOk(isDateProper('ff/05/yyyy'), 'Returns not proper date')
  t.end()
})

test('Testing isEmail', t => {
  t.ok(isEmail('coolkid17@AAAAAAHHHHHHHHHHHH.com'), 'valid yet annoying email address')
  t.ok(isEmail('coolkid778@aol.com'), 'Returned OK This is a email')
  t.ok(isEmail('IamEmail@cool.com'), 'That is indeed an email')
  t.notOk(isEmail('notEmail'), 'Indeed it is NOT an email')
  t.notOk(isEmail('coolkid77'), 'Returns invalid its not an email')
  t.notOk(isEmail('coolkid77@gmail'), 'Returns invalid email address format')
  t.notOk(isEmail('coolkid77@gmailcom'), 'Returns invalid email address format')
  t.notOk(isEmail('coolkid77@gmail-com'), 'Returns invalid email address format')
  t.notOk(isEmail('coolkid77gmail.com'), 'Returns invalid email address format')
  t.end()
})

test('Testing isNumber', t => {
  t.ok(isNumber)
  t.ok(isNumber('11234'), 'Is a number')
  t.ok(isNumber(11234), 'Is a number')
  t.notOk(isNumber('aaaaaa'), 'Is not a number')
  t.end()
})

test('Testing isPositive', t => {
  t.ok(isPositive)
  t.ok(isPositive('12'), 'Returned OK is a positive')
  t.ok(isPositive(12), 'Returned OK is a positive')
  t.notOk(isPositive('You Smell Good!'), 'This contains no positive numbers')
  t.notOk(isPositive(-1), 'Value is not positive')
  t.end()
})

test('Testing isNegative', t => {
  t.ok(isNegative)
  t.ok(isNegative('-12'), 'Returned OK is a Negative')
  t.ok(isNegative(-12), 'Returned OK is a Negative')
  t.notOk(isNegative('You Smell Bad!'), 'Is not a negative number')
  t.notOk(isNegative(5), '5 is not a negative number')
  t.notOk(isNegative(0), '0 is not a negative number')
  t.end()
})

test('Testing isVin', t => {
  t.ok(isVin('JM1CW2BL8C0127808'), 'Returned OK This is a VIN')
  t.notOk(isVin('JM1CW2BL8C012780865'), 'Returned not valid, too long to be vin')
  t.notOk(isVin('112'), 'Returned not valid, not a vin')
  t.end()
})

test('Testing isZip', t => {
  t.ok(isZip)
  t.ok(isZip('77885'), 'Returned OK This is a Zip Code')
  t.notOk(isZip('778885'), 'Returned invalid not a zip code')
  t.notOk(isZip(''), 'Returned invalid not a zip code')
  t.end()
})

test('Testing isCAPostalCode', t => {
  t.ok(isCAPostalCode)
  t.ok(isCAPostalCode('K1A0B1'), 'Returned OK This is a Postal Code')
  t.notOk(isCAPostalCode('77885'), 'Invalid postal code for CA')
  t.end()
})

test('Testing isPhone', t => {
  t.ok(isPhone)
  t.ok(isPhone('888-555-9987'), 'Returned OK This is a phone format')
  t.ok(isPhone('888.555.9987'), 'Returned OK This is a phone format')
  t.ok(isPhone('8885559987'), 'Returned OK This is a phone format')
  t.notOk(isPhone('88-444-8877'), 'Returned invalid this is not a valid phone')
  t.notOk(isPhone('8888-4444-8877'), 'Returned invalid this is not a valid phone')
  t.end()
})

test('Testing isLicensePlate', t => {
  t.ok(isLicensePlate)
  t.ok(isLicensePlate('SSS1829'), 'Returned OK This is a license plate format')
  t.ok(isLicensePlate('SSS-1829'), 'Returned OK This is a license plate format')
  t.ok(isLicensePlate('SSS•1829'), 'Returned OK This is a license plate format')
  t.notOk(isLicensePlate('SSS 18'), 'Invalid plate is too short')
  t.notOk(isLicensePlate('SSSS 188'), 'Invalid plate is too long')
  t.end()
})

test('Testing isVisaCard', t => {
  t.ok(isVisaCard(false)('4111111111111111'), 'Returned OK This is a Visa card format')
  t.notOk(isVisaCard(false)('5111111111111111'), 'Invalid lead number')
  t.notOk(isVisaCard(false)('41111111111111111'), 'Invalid to long')
  t.notOk(isVisaCard(false)('411111111111111'), 'Invalid to short')
  t.notOk(isVisaCard(false)('55544444444444GGF'), 'Invalid bad start number and has letters')
  t.notOk(isVisaCard(false)('4111111111111GGF'), 'Invalid bad has letters')
  t.end()
})

test('Testing isVisaPanCard', t => {
  t.ok(isVisaPanCard(false)('4111111111111111222'), 'Returned OK This is a Visa card format')
  t.notOk(isVisaPanCard(false)('5111111111111111222'), 'Invalid lead number')
  t.notOk(isVisaPanCard(false)('411111111111111112222'), 'Invalid to long')
  t.notOk(isVisaPanCard(false)('411111111111111222'), 'Invalid to short')
  t.notOk(isVisaPanCard(false)('55544444444444GGF'), 'Invalid bad start number and has letters')
  t.notOk(isVisaPanCard(false)('4111111111111GGF'), 'Invalid bad has letters')
  t.notOk(isVisaPanCard(true, 4111111111111111222), 'Invalid with test number in strict mode')
  t.end()
})

test('Testing isMasterCard', t => {
  t.ok(isMasterCard(false)('5511111111111111'), 'Returned OK This is a MasterCard format')
  t.notOk(isMasterCard(false)('5711111111111111'), 'Invalid 2nd digit (not 1-5)')
  t.notOk(isMasterCard(false)('7511111111111111'), 'Invalid 1st digit (not 5)')
  t.notOk(isMasterCard(false)('55511111111111111'), 'Invalid to long')
  t.notOk(isMasterCard(false)('551111111111111'), 'Invalid to short')
  t.notOk(isMasterCard(false)('551111111111111G'), 'Invalid to short')
  t.notOk(isMasterCard(false)('5511111111111111GG'), 'Invalid to short')
  t.end()
})

test('Testing isAmexCard', t => {
  t.ok(isAmexCard(false)('341111111111111'), 'Returned valid format')
  t.notOk(isAmexCard(false)('381111111111111'), 'Invalid 2nd digit (not 4 or 7)')
  t.notOk(isAmexCard(false)('541111111111111'), 'Invalid 1st digit (not 3)')
  t.notOk(isAmexCard(false)('3411111111111111'), 'Invalid to long')
  t.notOk(isAmexCard(false)('34111111111111'), 'Invalid to short')
  t.notOk(isAmexCard(false)('34111111111111GG'), 'Invalid to short')
  t.end()
})

test('Testing isDiscoverCard', t => {
  t.ok(isDiscoverCard(false)('6111111111111111'), 'Returned OK This is a Discover card format')
  t.notOk(isDiscoverCard(false)('5111111111111111'), 'Invalid lead number')
  t.notOk(isDiscoverCard(false)('41111111111111111'), 'Invalid to long')
  t.notOk(isDiscoverCard(false)('411111111111111'), 'Invalid to short')
  t.notOk(isDiscoverCard(false)('55544444444444GGF'), 'Invalid bad start number and has letters')
  t.notOk(isDiscoverCard(false)('4111111111111GGF'), 'Invalid bad has letters')
  t.end()
})

test('Testing isBelowMax', t => {
  const tstBelow = isBelowMax(8)

  t.ok(isBelowMax({ max: 8 }, 2), 'Testing handling of an object option set')
  t.ok(tstBelow)
  t.ok(tstBelow('7'), 'Returned OK This is below max')
  t.notOk(tstBelow('9'), 'Invalid exceeds/matches max')
  t.end()
})

test('Testing isAboveMin', t => {
  t.ok(isAboveMin({ min: 0 }, 2), 'Testing handling of an object option set')
  t.ok(isAboveMin(4)('5'), 'Returned OK This is above min')
  t.notOk(isAboveMin(4)('3'), 'Invalid below min')
  t.end()
})

test('Testing isNotTooShort', t => {
  const tst = isNotTooShort(1)

  t.ok(tst('The brown Cow'))
  t.notOk(tst(''))
  t.notOk(isNotTooShort(5, 'the'))
  t.ok(isNotTooShort(5, 'Brown Cow'))
  t.ok(isNotTooShort({ minLen: 5 }, 'Brown Cow'))
  t.end()
})

test('Testing isNotTooLong', t => {
  const tst = isNotTooLong(10)

  t.ok(tst('The Cow'))
  t.notOk(tst('The Cow Ate Grass'))
  t.ok(isNotTooLong(15, 'Another Cow'))
  t.notOk(isNotTooLong(5, 'Another Cow'))
  t.ok(isNotTooLong({ maxLen: 15 }, 'Brown Cow'))
  t.end()
})

test('Testing isCorrectLength', t => {
  const tst = isCorrectLength({
    maxLen: 10,
    minLen: 5
  })

  t.ok(tst('The Cow'))
  t.notOk(tst('The'))
  t.notOk(tst('The Cow Ate Grass'))

  t.ok(isCorrectLength({
    maxLen: 15,
    minLen: 3
  }, 'The Cow'))
  t.notOk(isCorrectLength({
    maxLen: 10,
    minLen: 3
  }, 'The Cow Ate Grass'))
  t.notOk(isCorrectLength({
    maxLen: 10,
    minLen: 3
  }, 'At'))
  t.end()
})
