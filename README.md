[![Build Status](https://travis-ci.org/dhershman1/simply_valid.svg?branch=master)](https://travis-ci.org/dhershman1/simply_valid)
# Simply Valid

A simple to use data driven validation system

## Changelog
> v1.2.0
> - Added ability to create a variable of validation methods that are ran on a value
> - Unit tested this new feature
> - Cleaned up code slightly
> - Removed Deps
> - Finished cleaning up ES6 that I missed (Sorry about that)

> v1.1.1
> - Fixed Typo in an error message

> v1.1.0
> - Added `isDateShort` method, to account for 4 digit date formats
> - Doubled test count to test more situations
> - Fixed `hasUpperAndLowerCase` not properly checking for both lower AND upper case
> - Fixed `hasLetters` to use a stricter regex so number only strings don't pass
> - Upgraded `isLicensePlate` to be more capable in capturing a larger variety of plate formats
>  - Please Note: Length checks should be doubled checked based on location since style varies by location
> - Fixed `noNumber` to use a better regex for proper validation
> - Fixed `finish` Sometimes reporting bad responses if the test after the bad test failed
> - Converted to non ES6 standards for better front end support

## Parameters

- `val` - `String|Number`: The value set that is going to be validated `Required`
- `options` - `Object`: An object of rules to overwrite the default rules

## Options

- `minLength` - `Number`: The minimum length of a value `Default: 1`
- `maxLength` - `Number`: The maximum length of a value `Default: 20`
- `basePattern` - `Regex`: The base regex pattern you want to match
- `antiPattern` - `Regex`: The base regex pattern you want to ensure does NOT get a match
- `emailPattern` - `Regex`: The pattern used to match emails (There is a default pattern set already)
- `vinPattern` - `Regex`: The pattern used to match VINs (There is a default pattern set already)
- `toMatch` - `String|Number`: The value you want to match against when calling basic match methods

## Usage
You can call it as an object to use each method individually or via a chain
```js
var validation = require('simply_valid');

validation(val, options).method();
// As of v1.2.0+ you can now also setup a custom variable of methods
validation([methods], options, true);
// OR
validation([methods], true);
// See Below for a full usage example
```

## Setting methods to a custom function
To use the new feature in v1.2.0+ simple set the methods you want and then call your variable with your value.
```js
var validation = require('simply_valid');

var myValidation = validation(['isNumber', 'isPositive'], true);
myValidation(4);
// Outputs: { isValid: true }
myValidation(-4);
// Outputs: { isValid: false, story: [ { isValid: false, test: 'isPositive' } ] }
```
And that's really it, I built this into simply valid for those who need to do a lot of the same validation, and don't want to have to keep typing the same chains over and over and over again.

## Methods

## **misc** Methods

### finish
Signifies the end of the chain every method is chainable besides finish, if you do not call finish at the end of your chain, you **will** not get any data back.

##### Usage
```js
validate('Chicken').noNumbers().finish();
```

## **has** Methods

### hasValue
Checks if the value is actually a value

##### Usage
```js
validate('CoolKid112').hasValue().finish();
```

### hasNumbers
Checks if the value has a number

##### Usage
```js
validate('CoolKid112').hasNumbers().finish();
```

### hasLetters
Checks if the value has a letter

##### Usage
```js
validate('CoolKid112').hasLetters().finish();
```

### hasCustom
Checks if the value contains a character within your `basePattern` value

##### Usage
```js
validate('CoolKid112', {
  basePattern: /[A-Z]/
}).hasCustom().finish();
```

### hasNumbersOrSpecials
Checks if the value contains numbers or special characters

##### Usage
```js
validate('CoolKid112').hasNumbersOrSpecials().finish();
```

### hasSpecialCharacters
Checks if the value contains any special characters

##### Usage
```js
validate('CoolKid112').hasSpecialCharacters().finish();
```

### hasUpperAndLowerCase
Checks if the value contains a upper and lower case character

##### Usage
```js
validate('CoolKid112').hasUpperAndLowerCase().finish();
```

## **match** Methods

### matchesGiven
Checks if the value matches the `toMatch` value given in options

##### Usage
```js
validate('CoolKid112', {
  toMatch: 'CoolKid112'
}).matchesGiven().finish();
```

### matchesPattern
Checks if the value matches the `basePattern` option

##### Usage
```js
validate('CoolKid112', {
  basePattern: /[a-z][0-9]/ig
}).matchesPattern().finish();
```

### doesNotMatch
Verifies a value does not match the `antiPattern` option

##### Usage
```js
validate('CoolKid112', {
  antiPattern: 'NotCoolKid211'
}).doesNotMatch().finish();
```

## **is** Methods

### isDate
Checks if the value is a valid date (US)

##### Usage
```js
validate('03-28-2017').isDate().finish();
```

### isDateShort
Checks if the value is a valid date (US)

##### Usage
```js
validate('03-28').isDateShort().finish();
```

### isDateProper
Checks if the value is a valid date (US)

##### Usage
```js
validate('2017-03-28').isDateProper().finish();
```

### isEmail
Checks if the value is a valid email

##### Usage
```js
validate('cOoLkId112@aol.com').isEmail().finish();
// You can also set your own email pattern for regex if you want
validate('cOoLkId112@aol.com', {
  emailPattern: /[a-z]/ig
}).isEmail().finish();
```

### isNumber
Checks if the value is a number

##### Usage
```js
validate('112').isNumber().finish();
```

### isPositive
Checks if the value is positive

##### Usage
```js
validate('112').isPositive().finish();
```

### isNegative
Checks if the value is Negative

##### Usage
```js
validate('-112').isNegative().finish();
```

### isLicensePlate
Checks if the value matches a license plate format

##### Usage
```js
validate('SSS1829').isLicensePlate().finish();
```

### isPhone
Checks if the value matches a proper phone length (accepts both formatted and unformatted numbers)

##### Usage
```js
validate('440-555-7799').isPhone().finish();
```

### isZip
Checks if the value matches a proper zip code format

##### Usage
```js
validate('44114').isZip().finish();
```

### isCAPostalCode
Checks if the value matches a proper Canada postal code format

(Universal method coming soon?)

##### Usage
```js
validate('K1A0B1').isCAPostalCode().finish();
```

### isVin
Checks if the value is a valid VIN

##### Usage
```js
validate('JM1CW2BL8C0127808').isVin().finish();
// You can also set your own vin pattern for regex if you want
validate('JM1CW2BL8C0127808', {
  emailPattern: /[a-z]/ig
}).isVin().finish();
```

### isVisaCard
Checks if the value is a proper Visa card format

##### Usage
```js
validate('4111111111111111').isVisaCard().finish();
```

### isMasterCard
Checks if the value is a proper MasterCard format

##### Usage
```js
validate('5511111111111111').isMasterCard().finish();
```

### isAmericanExpressCard
Checks if the value is a proper American Express card format

##### Usage
```js
validate('341111111111111').isAmericanExpressCard().finish();
```

## **meets** Methods

### meetsLength
Checks if our value meets our desired length

##### Usage
```js
validate('Chicken').meetsLength().finish();
```

### meetsYearStandard
Checks if our value meets the proper 2 or 4 digit year standard

##### Usage
```js
validate('2017').meetsYearStandard().finish();
validate('17').meetsYearStandard().finish();
```

### meetsCVN
Checks if our value is a proper CVN

##### Usage
```js
validate('333').meetsCVN().finish();
```

### meetsCVNAmex
Checks if our value is a proper Amex CVN

##### Usage
```js
validate('3343').meetsCVNAmex().finish();
```

### meetsTreadDepth
Checks if our value meets a tread depth format

##### Usage
```js
validate('22').meetsTreadDepth().finish();
```

## **no** Methods

### noSpecials
Checks if our value contains any special characters

##### Usage
```js
validate('Chicken').noSpecials().finish();
```

### noNumbers
Verifies our value contains no numbers

##### Usage
```js
validate('Chicken').noNumbers().finish();
```
