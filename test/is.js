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
import test from 'ava'

test('Testing isDate', t => {
  t.truthy(isDate)
  t.truthy(isDate('03-28-2017'), 'Returns that this is indeed a date')
  t.truthy(isDate('03.28.2017'), 'Returns valid as date with dots')
  t.truthy(isDate('03/28/2017'), 'Returns valid as date with slashes')
  t.truthy(isDate('03/28/17'), 'Returns valid as date with slashes & short year')
  t.truthy(isDate('03282017'), 'Returns valid as date with no specials')
  t.truthy(isDate('032817'), 'Returns valid as date with short year & no specials')
  t.falsy(isDate('03-27'), 'Returns not full date')
  t.falsy(isDate('ff/05/yyyy'), 'Returns not proper date')
})

test('Testing isDateShort', t => {
  t.truthy(isDateShort)
  t.truthy(isDateShort('03-28'), 'Returns that this is indeed a date')
  t.truthy(isDateShort('03.28'), 'Returns valid as date with dots')
  t.truthy(isDateShort('03/28'), 'Returns valid as date with slashes')
  t.falsy(isDateShort('03-27-2018'), 'Returns not short date')
  t.falsy(isDateShort('ff/05/yyyy'), 'Returns not proper date')
})

test('Testing isDateProper', t => {
  t.truthy(isDateProper)
  t.truthy(isDateProper('2017-03-28'), 'Returns that this is indeed a proper date')
  t.truthy(isDateProper('2017.03.28'), 'Returns valid as date with dots')
  t.truthy(isDateProper('2017/03/28'), 'Returns valid as date with slashes')
  t.falsy(isDateProper('03-27-2018'), 'Returns invalid not a proper date')
  t.falsy(isDateProper('ff/05/yyyy'), 'Returns not proper date')
})

test('Testing isEmail', t => {
  t.truthy(isEmail('coolkid17@AAAAAAHHHHHHHHHHHH.com'), 'valid yet annoying email address')
  t.truthy(isEmail('coolkid778@aol.com'), 'Returned OK This is a email')
  t.truthy(isEmail('IamEmail@cool.com'), 'That is indeed an email')
  t.falsy(isEmail('notEmail'), 'Indeed it is NOT an email')
  t.falsy(isEmail('coolkid77'), 'Returns invalid its not an email')
  t.falsy(isEmail('coolkid77@gmail'), 'Returns invalid email address format')
  t.falsy(isEmail('coolkid77@gmailcom'), 'Returns invalid email address format')
  t.falsy(isEmail('coolkid77@gmail-com'), 'Returns invalid email address format')
  t.falsy(isEmail('coolkid77gmail.com'), 'Returns invalid email address format')
})

test('Testing isNumber', t => {
  t.truthy(isNumber)
  t.truthy(isNumber('11234'), 'Is a number')
  t.truthy(isNumber(11234), 'Is a number')
  t.falsy(isNumber('aaaaaa'), 'Is not a number')
})

test('Testing isPositive', t => {
  t.truthy(isPositive)
  t.truthy(isPositive('12'), 'Returned OK is a positive')
  t.truthy(isPositive(12), 'Returned OK is a positive')
  t.falsy(isPositive('You Smell Good!'), 'This contains no positive numbers')
  t.falsy(isPositive(-1), 'Value is not positive')
})

test('Testing isNegative', t => {
  t.truthy(isNegative)
  t.truthy(isNegative('-12'), 'Returned OK is a Negative')
  t.truthy(isNegative(-12), 'Returned OK is a Negative')
  t.falsy(isNegative('You Smell Bad!'), 'Is not a negative number')
  t.falsy(isNegative(5), '5 is not a negative number')
  t.falsy(isNegative(0), '0 is not a negative number')
})

test('Testing isVin', t => {
  t.truthy(isVin('JM1CW2BL8C0127808'), 'Returned OK This is a VIN')
  t.falsy(isVin('JM1CW2BL8C012780865'), 'Returned not valid, too long to be vin')
  t.falsy(isVin('112'), 'Returned not valid, not a vin')
})

test('Testing isZip', t => {
  t.truthy(isZip)
  t.truthy(isZip('77885'), 'Returned OK This is a Zip Code')
  t.falsy(isZip('778885'), 'Returned invalid not a zip code')
  t.falsy(isZip(''), 'Returned invalid not a zip code')
})

test('Testing isCAPostalCode', t => {
  t.truthy(isCAPostalCode)
  t.truthy(isCAPostalCode('K1A0B1'), 'Returned OK This is a Postal Code')
  t.falsy(isCAPostalCode('77885'), 'Invalid postal code for CA')
})

test('Testing isPhone', t => {
  t.truthy(isPhone)
  t.truthy(isPhone('888-555-9987'), 'Returned OK This is a phone format')
  t.truthy(isPhone('888.555.9987'), 'Returned OK This is a phone format')
  t.truthy(isPhone('8885559987'), 'Returned OK This is a phone format')
  t.falsy(isPhone('88-444-8877'), 'Returned invalid this is not a valid phone')
  t.falsy(isPhone('8888-4444-8877'), 'Returned invalid this is not a valid phone')
})

test('Testing isLicensePlate', t => {
  t.truthy(isLicensePlate)
  t.truthy(isLicensePlate('SSS1829'), 'Returned OK This is a license plate format')
  t.truthy(isLicensePlate('SSS-1829'), 'Returned OK This is a license plate format')
  t.truthy(isLicensePlate('SSS•1829'), 'Returned OK This is a license plate format')
  t.falsy(isLicensePlate('SSS 18'), 'Invalid plate is too short')
  t.falsy(isLicensePlate('SSSS 188'), 'Invalid plate is too long')
})

test('Testing isVisaCard', t => {
  t.truthy(isVisaCard(false)('4111111111111111'), 'Returned OK This is a Visa card format')
  t.falsy(isVisaCard(false)('5111111111111111'), 'Invalid lead number')
  t.falsy(isVisaCard(false)('41111111111111111'), 'Invalid to long')
  t.falsy(isVisaCard(false)('411111111111111'), 'Invalid to short')
  t.falsy(isVisaCard(false)('55544444444444GGF'), 'Invalid bad start number and has letters')
  t.falsy(isVisaCard(false)('4111111111111GGF'), 'Invalid bad has letters')
})

test('Testing isVisaPanCard', t => {
  t.truthy(isVisaPanCard(false)('4111111111111111222'), 'Returned OK This is a Visa card format')
  t.falsy(isVisaPanCard(false)('5111111111111111222'), 'Invalid lead number')
  t.falsy(isVisaPanCard(false)('411111111111111112222'), 'Invalid to long')
  t.falsy(isVisaPanCard(false)('411111111111111222'), 'Invalid to short')
  t.falsy(isVisaPanCard(false)('55544444444444GGF'), 'Invalid bad start number and has letters')
  t.falsy(isVisaPanCard(false)('4111111111111GGF'), 'Invalid bad has letters')
})

test('Testing isMasterCard', t => {
  t.truthy(isMasterCard(false)('5511111111111111'), 'Returned OK This is a MasterCard format')
  t.falsy(isMasterCard(false)('5711111111111111'), 'Invalid 2nd digit (not 1-5)')
  t.falsy(isMasterCard(false)('7511111111111111'), 'Invalid 1st digit (not 5)')
  t.falsy(isMasterCard(false)('55511111111111111'), 'Invalid to long')
  t.falsy(isMasterCard(false)('551111111111111'), 'Invalid to short')
  t.falsy(isMasterCard(false)('551111111111111G'), 'Invalid to short')
  t.falsy(isMasterCard(false)('5511111111111111GG'), 'Invalid to short')
})

test('Testing isAmexCard', t => {
  t.truthy(isAmexCard(false)('341111111111111'), 'Returned valid format')
  t.falsy(isAmexCard(false)('381111111111111'), 'Invalid 2nd digit (not 4 or 7)')
  t.falsy(isAmexCard(false)('541111111111111'), 'Invalid 1st digit (not 3)')
  t.falsy(isAmexCard(false)('3411111111111111'), 'Invalid to long')
  t.falsy(isAmexCard(false)('34111111111111'), 'Invalid to short')
  t.falsy(isAmexCard(false)('34111111111111GG'), 'Invalid to short')
})

test('Testing isDiscoverCard', t => {
  t.truthy(isDiscoverCard(false)('6111111111111111'), 'Returned OK This is a Discover card format')
  t.falsy(isDiscoverCard(false)('5111111111111111'), 'Invalid lead number')
  t.falsy(isDiscoverCard(false)('41111111111111111'), 'Invalid to long')
  t.falsy(isDiscoverCard(false)('411111111111111'), 'Invalid to short')
  t.falsy(isDiscoverCard(false)('55544444444444GGF'), 'Invalid bad start number and has letters')
  t.falsy(isDiscoverCard(false)('4111111111111GGF'), 'Invalid bad has letters')
})

test('Testing isBelowMax', t => {
  const tstBelow = isBelowMax(8)

  t.truthy(tstBelow)
  t.truthy(tstBelow('7'), 'Returned OK This is below max')
  t.falsy(tstBelow('9'), 'Invalid exceeds/matches max')
})

test('Testing isAboveMin', t => {
  t.truthy(isAboveMin(4)('5'), 'Returned OK This is above min')
  t.falsy(isAboveMin(4)('3'), 'Invalid below min')
})

test('Testing isNotTooShort', t => {
  const tst = isNotTooShort(1)

  t.truthy(tst('The brown Cow'))
  t.falsy(tst(''))
  t.falsy(isNotTooShort(5, 'the'))
  t.truthy(isNotTooShort(5, 'Brown Cow'))
})

test('Testing isNotTooLong', t => {
  const tst = isNotTooLong(10)

  t.truthy(tst('The Cow'))
  t.falsy(tst('The Cow Ate Grass'))
  t.truthy(isNotTooLong(15, 'Another Cow'))
  t.falsy(isNotTooLong(5, 'Another Cow'))
})

test('Testing isCorrectLength', t => {
  const tst = isCorrectLength({
    maxLen: 10,
    minLen: 5
  })

  t.truthy(tst('The Cow'))
  t.falsy(tst('The'))
  t.falsy(tst('The Cow Ate Grass'))

  t.truthy(isCorrectLength({
    maxLen: 15,
    minLen: 3
  }, 'The Cow'))
  t.falsy(isCorrectLength({
    maxLen: 10,
    minLen: 3
  }, 'The Cow Ate Grass'))
  t.falsy(isCorrectLength({
    maxLen: 10,
    minLen: 3
  }, 'At'))
})
