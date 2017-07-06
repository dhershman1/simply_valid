[![Build Status](https://travis-ci.org/dhershman1/simply_valid.svg?branch=master)](https://travis-ci.org/dhershman1/simply_valid)

# Simply Valid

**The following Documentation is for v2+ for v1.x.x see README-1.x.x.md**

A simple to use data driven validation system

**NOTE: Only supports IE 9+**

## Contents
* [Custom Function](#setting-methods-to-a-custom-function)
* [Methods](#methods)
  * [Has Methods](#has-methods)
  * [Match Methods](#match-methods)
  * [Is Methods](#is-methods)
  * [Meets Methods](#meets-methods)
  * [No Methods](#no-methods)

## Changelog

You can find the changelog here: https://github.com/dhershman1/simply_valid/blob/master/changelog.md

## Parameters

- `methods` - `Array`: Array of validation method names to run. (see list below)
- `options` - `Object`: An object of rules to overwrite the default rules

## Options

- `minLength` - `Number`: The minimum length of a value `Default: 1`
- `maxLength` - `Number`: The maximum length of a value `Default: 20`
- `basePattern` - `Regex`: The base regex pattern you want to match
- `antiPattern` - `Regex`: The base regex pattern you want to ensure does NOT get a match
- `emailPattern` - `Regex`: The pattern used to match emails (There is a default pattern set already)
- `vinPattern` - `Regex`: The pattern used to match VINs (There is a default pattern set already)
- `equalTo` - `String|Number`: The value you want to match against when calling basic match methods

## Usage
Using Standardized JS
```js
import simplyValid from 'simply_valid';

simplyValid([methods], options);
```

Using commonjs
```js
var validation = require('simply_valid');

validation([methods], options);
// See Below for a full usage example
```

In the browser
```html
<script src="path/to/dist/simplyValid.umd.js"></script>
<script>
simplyValid([methods], options);
</script>
```

## Methods

All methods return one of the following:

If everything passes you will get back a simple object `{isValid: true}`

If some of your validation methods fail you should expect the following:

```js
{
	isValid: false,
	story: [{
		test: 'Test Name',
		value: 'Values it failed on'
	}]
}
```

**You can also stack validation methods**

You can set multiple validation methods to your function, like so:

```js
import simplyValid from 'simply_valid';

const validation = simplyValid(['hasValue', 'isPositive']);
validation(1);
// Output: {isValid: true}
validation(-1);
/*
	{
		isValid: false,
		story: [{
			test: 'isPositive',
			value: -1
		}]
	}
 */
```

**You can Also set options as needed on the fly per call**

This is useful if you need to set dynamic regex or dynamic options for your data.

```js
const validation = simplyValid(['hasCustom'], {
  basePattern: /[A-Z]/
});

validation('CoolKid112');
// Output: {isValid: true}
validation(11123, {
	basePattern: /[0-9]/
});
// Output: {isValid: true}
```

## **has** Methods

### hasValue
Checks if the value is actually a value

#### Usage
```js
const validation = simplyValid(['hasValue']);

validation('CoolKid112');
```

### hasNumbers
Checks if the value has a number

#### Usage
```js
const validation = simplyValid(['hasNumbers']);

validation('CoolKid112');
```

### hasLetters
Checks if the value has a letter

#### Usage
```js
const validation = simplyValid(['hasLetters']);

validation('CoolKid112');
```

### hasCustom
Checks if the value contains a character within your `basePattern` value

#### Usage
```js
const validation = simplyValid(['hasCustom'], {
  basePattern: /[A-Z]/
});

validation('CoolKid112');
```

### hasNumbersOrSpecials
Checks if the value contains numbers or special characters

#### Usage
```js
const validation = simplyValid(['hasNumbersOrSpecials']);

validation('CoolKid112');
```

### hasSpecialCharacters
Checks if the value contains any special characters

#### Usage
```js
const validation = simplyValid(['hasSpecialCharacters']);

validation('CoolKid112');
```

### hasUpperAndLowerCase
Checks if the value contains a upper and lower case character

#### Usage
```js
const validation = simplyValid(['hasUpperAndLowerCase']);

validation('CoolKid112');
```

## **match** Methods

### matchesPattern
Checks if the value matches the `basePattern` option

#### Usage
```js
const validation = simplyValid(['matchesPattern'], {
	basePattern: /[a-z][0-9]/ig
});

validation('CoolKid112');
```

### doesNotMatch
Verifies a value does not match the `antiPattern` option

#### Usage
```js
const validation = simplyValid(['matchesPattern'], {
	antiPattern: /[0-9]/g
});

validation('CoolKid');
```

## **is** Methods

### isDate
Checks if the value is a valid date (US)

#### Usage
```js
const validation = simplyValid(['isDate']);

validation('03-28-2017');
```

### isDateShort
Checks if the value is a valid date (US) in short tense

#### Usage
```js
const validation = simplyValid(['isDateShort']);

validation('03-28');
```

### isDateProper
Checks if the value is a valid date (US) in proper format

#### Usage
```js
const validation = simplyValid(['isDateProper']);

validation('2017-03-28');
```

### isEqual
Replaces `matchGiven`, does what it says runs a `strict` compare test on the value

#### Usage

```js
const validation = simplyValid(['isEqual'], {
	equalTo: 'CoolKid112'
});

validation('CoolKid112');
```

### isEmail
Checks if the value is a valid email uses the `emailPattern` option to validate against

#### Usage
```js
const validation = simplyValid(['isEmail']);

validation('cOoLkId112@aol.com');
```

### isNumber
Checks if the value is a number

#### Usage
```js
const validation = simplyValid(['isNumber']);

validation('112');
```

### isPositive
Checks if the value is both a number **AND** that it is positive

#### Usage
```js
const validation = simplyValid(['isPositive']);

validation('112');
```

### isNegative
Checks if the value is both a number **AND** that it is negative

#### Usage
```js
const validation = simplyValid(['isNegative']);

validation('-112');
```

### isLicensePlate
Checks if the value matches a license plate format

#### Usage
```js
const validation = simplyValid(['isLicensePlate']);

validation('SSS1829');
```

### isPhone
Checks if the value matches a proper phone length (accepts both formatted and unformatted numbers)

#### Usage
```js
const validation = simplyValid(['isPhone']);

validation('440-555-7799');
```

### isZip
Checks if the value matches a proper zip code format

#### Usage
```js
const validation = simplyValid(['isZip']);

validation('44114');
```

### isCAPostalCode
Checks if the value matches a proper Canada postal code format

#### Usage
```js
const validation = simplyValid(['isCAPostalCode']);

validation('K1A0B1');
```

### isVin
Checks if the value is a valid VIN uses the property `vinPattern` in options

#### Usage
```js
const validation = simplyValid(['isVin']);

validation('JM1CW2BL8C0127808');
```

### isVisaCard
Checks if the value is a proper Visa card format

#### Usage
```js
const validation = simplyValid(['isVisaCard']);

validation('4111111111111111');
```

### isMasterCard
Checks if the value is a proper MasterCard format

#### Usage
```js
const validation = simplyValid(['isMasterCard']);

validation('5511111111111111');
```

### isAmericanExpressCard
Checks if the value is a proper American Express card format

#### Usage
```js
const validation = simplyValid(['isAmericanExpressCard']);

validation('341111111111111');
```

## **meets** Methods

### meetsLength
Checks if our value meets our desired length uses the `minLength` and `maxLength` properties in options

#### Usage
```js
const validation = simplyValid(['meetsLength'], {
	minLength: 1,
	maxLength: 20
});

validation('Chicken');
```

### meetsYearStandard
Checks if our value meets the proper 2 or 4 digit year standard

#### Usage
```js
const validation = simplyValid(['meetsYearStandard']);

validation('2017');
validation('17');
```

### meetsCVN
Checks if our value is a proper CVN

#### Usage
```js
const validation = simplyValid(['meetsCVN']);

validation('333');
```

### meetsCVNAmex
Checks if our value is a proper Amex CVN

#### Usage
```js
const validation = simplyValid(['meetsCVNAmex']);

validation('3343');
```

### meetsTreadDepth
Checks if our value meets a tread depth format

#### Usage
```js
const validation = simplyValid(['meetsTreadDepth']);

validation('22');
```

## **no** Methods

### noSpecials
Checks if our value contains any special characters

#### Usage
```js
const validation = simplyValid(['noSpecials']);

validation('Chicken');
```

### noNumbers
Verifies our value contains no numbers

#### Usage
```js
const validation = simplyValid(['noNumbers']);

validation('Chicken');
```

### noLetters
Verifies our value contains no letters

#### Usage
```js
const validation = simplyValid(['noLetters']);

validation('1123');
```
