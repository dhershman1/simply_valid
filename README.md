[![npm](https://img.shields.io/npm/v/simply_valid.svg?style=flat)](https://www.npmjs.com/package/simply_valid) [![Downloads](https://img.shields.io/npm/dm/simply_valid.svg?style=flat)](https://www.npmjs.com/package/simply_valid) [![dependencies Status](https://david-dm.org/dhershman1/simply_valid/status.svg)](https://david-dm.org/dhershman1/simply_valid) [![devDependencies Status](https://david-dm.org/dhershman1/simply_valid/dev-status.svg)](https://david-dm.org/dhershman1/simply_valid?type=dev) [![Build Status](https://travis-ci.org/dhershman1/simply_valid.svg?branch=master)](https://travis-ci.org/dhershman1/simply_valid)

# Simply Valid

**The following Documentation is for v3+ for older versions of the Docs please see the `old-readmes` folder**

A simple to use data driven validation system

Have a suggestion? Feel free to post them over in the github issues section and I will happily check them out!

## Onward Goals

I felt like Simply_Valid lost what I originally created it for at the beginning, which is the ability to actually be `Simple` I was lucky enough to run into a few use cases where using simply_valid actually became more of a chore, and the more I looked at it or tweaked it the further it drifted from being `Simple`.

The goal for v3.0.0 is a complete re work to get back to the roots of why I built this module, as well as to address a lot of the pain points I personally have run into while attempting to use it. Pain points like not being able to validate against an object, or an array, making it more functional, better UMD support and making it do a lot of the lifting on it's end that really the user shouldn't have to worry about. All that while still dilvering the same type of return you'd expect no matter how you are using it. 

I am proud to say that I think I am back at that point where simply_valid is true to it's simple to use data driven validation. I hope you as well will find v3.0.0 to be a much needed release and thank you for the continued support!

## Contents
* [Options](#options)
* [Defaults](#defaults)
* [Browser Support](#browser-support)
* [Usage](#usage)
* [Schema](#schema)
* [Return](#return)
* [Methods](#methods)
  * [Has Methods](#has-methods)
  * [Is Methods](#is-methods)
  * [Meets Methods](#meets-methods)
  * [No Methods](#no-methods)

## Changelog

**Make sure to check the changelog for breaking changes!**

You can find the changelog here: https://github.com/dhershman1/simply_valid/blob/master/changelog.md

## Parameters

- `options` - `Object`: An object of rules to overwrite the default rules
- `data` - `String|Array|Object`: Data is the value sent in with the 2nd call made to simplyValid (curried call)

## Options

- `schema` - `Object|Array|String` - The validation methods you want simply valid to use
- `strictCard` - `Boolean` - If credit card validation should use the `luhn` algorithm strictly
- `max` - `Number`: The maximum of a value
- `min` - `Number`: The minimum of a value
- `emailPattern` - `Regex`: The pattern used to match emails (There is a default pattern set already)
- `vinPattern` - `Regex`: The pattern used to match VINs (There is a default pattern set already)
- `passwordPattern` - `Regex`: The pattern used to validate a password string (Has a default pattern set already)

## Defaults

```js
const defaults = {
  schema: [],
  strictCard: true,
  max: Infinity,
  min: -Infinity,
  vinPattern: /^[a-hj-npr-z0-9]{9}[a-hj-npr-tv-y1-9]{1}[a-hj-npr-z0-9]{7}$/i,
  emailPattern: /^[\w\u00c0-\u017f][\w.-_\u00c0-\u017f]*[\w\u00c0-\u017f]+[@][\w\u00c0-\u017f][\w.-_\u00c0-\u017f]*[\w\u00c0-\u017f]+\.[a-z]{2,4}$/i,
  passwordPattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/
};
```

## Browser Support
![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) |
--- | --- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | Untested | Untested | Latest ✔ | 9+ ✔

## Usage

However you can also call any of the built in validation methods the same way if you only need one or two. Making tree shaking that much better

Using Standardized JS
```js
import simplyValid from 'simply_valid';

simplyValid(options)(data);

// Or
const validate = simplyValid(options);

validate(data);
```

Using commonjs
```js
const simplyValid = require('simply_valid');

simplyValid(options)(data);

// Or
const validate = simplyValid(options);

validate(data);
```

In the browser
```html
<script src="path/to/dist/simplyValid.umd.js"></script>
<script>
  simplyValid(options)(data);

  // Or
  var validate = simplyValid(options);
  
  validate(data);
</script>
```

## Schema

New in v3.0.0 is simply_valids support for a new `schema` system this is set in the options passed in on your first call, the `schema` can be an `Object`, `Array`, or `String` This replaces the old methods array parameter in v2.x.x. 

You can pass schema an `Array` of methods just like passing it an array of methods from v2.x.x

```js
import simplyValid from 'simply_valid';

const validate = simplyValid({
  schema: ['hasValue', 'hasLetters']
});

validate(data);
```

You can pass schema an `Object` now which would be used if you are validating your own object

```js
import simplyValid from 'simply_valid';

const validate = simplyValid({
  schema: {
    zip: ['isNumber'],
    address: ['hasLetters', 'hasNumbers']
  }
});
const data = {
  zip: '11445',
  address: '1132 Cool St'
};

validate(data);
// Output: {isValid: true, story: []}

```

You can even pass it a single string if desired

```js
import simplyValid from 'simply_valid';

const validate = simplyValid({
  schema: 'hasValue'
});

validate(data);
```

## Return

I tried to keep it so you can always expect the same level of return no matter how you are using `simply_valid`

```js
// Passing returns will look like
// Default passing object
{ isValid: true }

// For passing object validation
{
  isValid: true,
  story: []
}

// Failing returns will look like
// This is the default failing object
{
  isValid: false,
  story: [{
    test: 'isNumber',
    value: 'cool' 
  }]
}
// For failing object validation
{
  isValid: false,
  story: [ {
    test: 'isNumber',
    value: 'cool',
    propName: 'zip'
    } ]
}
```

## Methods

**NOTE** v3.0.0 will temporarily be dropping `multi` style methods. I would like to rethink the approach and re add them later on 

## **has** Methods

### hasValue
Checks if the value is actually a value

#### Usage
```js
import {hasValue} from 'simply_valid';

hasValue('CoolKid112');

// OR
import simplyValid from 'simply_valid';

const validation = simplyValid({
  schema: 'hasValue'
});

validation('CoolKid112');
```

### hasNumbers
Checks if the value has a number

#### Usage
```js
import {hasNumbers} from 'simply_valid';

hasNumber('CoolKid112');

// OR
import {simplyValid} from 'simply_valid';

const validation = simplyValid({
  schema: 'hasNumbers'
});

validation('CoolKid112');
```

### hasLetters
Checks if the value has a letter

#### Usage
```js
import {hasLetter} from 'simply_valid';

hasLetter('CoolKid112');

// OR
import {simplyValid} from 'simply_valid';

const validation = simplyValid({
  schema: 'hasLetters'
});

validation('CoolKid112');
```

### hasNumbersOrSpecials
Checks if the value contains numbers or special characters

#### Usage
```js
import {hasNumbersOrSpecials} from 'simply_valid';

hasNumbersOrSpecials('CoolKid112');

// OR
import {simplyValid} from 'simply_valid';
const validation = simplyValid({
  schema: 'hasNumbersOrSpecials'
});

validation('CoolKid112');
```

### hasSpecialCharacters
Checks if the value contains any special characters

#### Usage
```js
import {hasSpecialCharacters} from 'simply_valid';

hasSpecialCharacters('CoolKid112');

// OR
import {simplyValid} from 'simply_valid';
const validation = simplyValid({
  schema: 'hasSpecialCharacters'
});

validation('CoolKid112');
```

### hasUpperAndLowerCase
Checks if the value contains a upper and lower case character

#### Usage
```js
import {hasUpperAndLowerCase} from 'simply_valid';

hasUpperAndLowerCase('CoolKid112');

// OR
import {simplyValid} from 'simply_valid';
const validation = simplyValid({
  schema: 'hasUpperAndLowerCase'
});

validation('CoolKid112');
```

## **is** Methods

### isDate
Checks if the value is a valid date (US)

#### Usage
```js
import {isDate} from 'simply_valid';

isDate('03-28-2017');

// OR
import {simplyValid} from 'simply_valid';

const validation = simplyValid({
  schema: 'isDate'
});

validation('03-28-2017');
```

### isDateShort
Checks if the value is a valid date (US) in short tense

#### Usage
```js
import {isDateShort} from 'simply_valid';

isDateShort('03-28');

// OR
import {simplyValid} from 'simply_valid';

const validation = simplyValid({
  schema: 'isDateShort'
});

validation('03-28');
```

### isDateProper
Checks if the value is a valid date (US) in proper format

#### Usage
```js
import {isDateProper} from 'simply_valid';

isDateProper('2017-03-28');

// OR
import {simplyValid} from 'simply_valid';

const validation = simplyValid({
  schema: 'isDateProper'
});

validation('2017-03-28');
```

### isEmail
Checks if the value is a valid email uses the `emailPattern` option to validate against

#### Usage
```js
import {isEmail} from 'simply_valid';

isEmail('coolKid112@aim.com');

// OR
import {simplyValid} from 'simply_valid';

const validation = simplyValid({
  schema: 'isEmail'
});

validation('cOoLkId112@aol.com');
```

### isNumber
Checks if the value is a number

#### Usage
```js
import {isNumber} from 'simply_valid';

isNumber('112');

// OR
import {simplyValid} from 'simply_valid';

const validation = simplyValid({
  schema: 'isNumber'
});

validation('112');
```

### isPositive
Checks if the value is both a number **AND** that it is positive

#### Usage
```js
import {isPositive} from 'simply_valid';

isPositive('112');

// OR
import {simplyValid} from 'simply_valid';

const validation = simplyValid({
  schema: 'isPositive'
});

validation('112');
```

### isNegative
Checks if the value is both a number **AND** that it is negative

#### Usage
```js
import {isNegative} from 'simply_valid';

isNegative('-122');

// OR
import {simplyValid} from 'simply_valid';

const validation = simplyValid({
  schema: 'isNegative'
});

validation('-112');
```

### isLicensePlate
Checks if the value matches a license plate format

#### Usage
```js
import {isLicensePlate} from 'simply_valid';

isLicensePlate('SSS1829');

// OR
import {simplyValid} from 'simply_valid';

const validation = simplyValid({
  schema: 'isLicensePlate'
});

validation('SSS1829');
```

### isPhone
Checks if the value matches a proper phone length (accepts both formatted and unformatted numbers)

#### Usage
```js
import {isPhone} from 'simply_valid';

isPhone('555-555-5555');

// OR
import {simplyValid} from 'simply_valid';

const validation = simplyValid({
  schema: 'isPhone'
});

validation('555-555-5555');
```

### isZip
Checks if the value matches a proper zip code format

#### Usage
```js
import {isZip} from 'simply_valid';

isZip('55555');

// OR
import {simplyValid} from 'simply_valid';

const validation = simplyValid({
  schema: 'isZip'
});

validation('55555');
```

### isCAPostalCode
Checks if the value matches a proper Canada postal code format

#### Usage
```js
import {isCAPostalCode} from 'simply_valid';

isCAPostalCode('K1A0B1');

// OR
import {simplyValid} from 'simply_valid';

const validation = simplyValid({
  schema: 'isCAPostalCode'
});

validation('K1A0B1');
```

### isVin
Checks if the value is a valid VIN uses the property `vinPattern` in options

#### Usage
```js
import {isVin} from 'simply_valid';

isVin('JM1CW2BL8C0127808');

// OR
import {simplyValid} from 'simply_valid';

const validation = simplyValid({
  schema: 'isVin'
});

validation('JM1CW2BL8C0127808');
```

### isVisaCard
Checks if the value is a proper Visa card format

#### Usage
```js
import {isVisaCard} from 'simply_valid';

isVisaCard(false)('4111111111111111');

// OR set it and re use
const validate = isVisaCard(false);

validate('4111111111111111');

// OR
import {simplyValid} from 'simply_valid';

const validation = simplyValid({
  schema: 'isVisaCard'
});

validation('4111111111111111');
```

### isVisaPanCard
Checks if the value is a visa pan card value

#### Usage
```js
import {isVisaPanCard} from 'simply_valid';

isVisaPanCard(false)('4111111111111111222');

// OR set it and re use
const validate = isVisaPanCard(false);

validate('4111111111111111222');

// OR
import {simplyValid} from 'simply_valid';

const validation = simplyValid({
  schema: 'isVisaPanCard'
});

validation('4111111111111111222');
```

### isMasterCard
Checks if the value is a proper MasterCard format

#### Usage
```js
import {isMasterCard} from 'simply_valid';

isMasterCard(false)('5511111111111111');

// OR set it and re use
const validate = isMasterCard(false);

validate('5511111111111111');

// OR
import {simplyValid} from 'simply_valid';


const validation = simplyValid({
  schema: 'isMasterCard',
  strictCard: false
});

validation('5511111111111111');
```

### isAmericanExpressCard
Checks if the value is a proper American Express card format

#### Usage
```js
import {isAmericanExpressCard} from 'simply_valid';

isAmericanExpressCard(false)('34111111111111');

// OR set it and re use
const validate = isAmericanExpressCard(false);

validate('34111111111111');

// OR
import {simplyValid} from 'simply_valid';

const validation = simplyValid({
  schema: 'isAmericanExpressCard',
  strictCard: false
});

validation('341111111111111');
```

### isDiscoverCard
Checks if the value is a proper Discover card format

#### Usage
```js
import {isDiscoverCard} from 'simply_valid';

isDiscoverCard(false)('6111111111111111');

// OR set it and re use
const validate = isDiscoverCard(false);

validate('6111111111111111');

// OR
import {simplyValid} from 'simply_valid';

const validation = simplyValid({
  schema: 'isDiscoverCard',
  strictCard: false
});

validation('6111111111111111');
```

### isBelowMax
Checks if the value is below our maxLength

#### Usage
```js
import {isBelowMax} from 'simply_valid';

isBelowMax(20)('12');

// OR set it and re use
validate = isBelowMax(20);

validate('12');
validate('18');

// OR setup a schema
import {simplyValid} from 'simply_valid';

const validation = simplyValid({
  schema: 'isBelowMax'
  max: 20,
});

validation('12345');
```

### isAboveMin
Checks if the value is above our minLength

#### Usage
```js
import {isAboveMin} from 'simply_valid';

isAboveMin(2)('12');

// OR set it and re use
validate = isAboveMin(2);

validate('12');
validate('3');


// OR setup a schema
import {simplyValid} from 'simply_valid';

const validation = simplyValid({
  schema: 'isAboveMin',
  min: 2
});

validation('12345');
```

### meetsMinMax
Checks if our value meets within our `min` and `max` properties in options

#### Usage
```js
import {meetsMinMax} from 'simply_valid';

meetsMinMax('15', {
  min: 1,
  max: 20
});

// OR
import {simplyValid} from 'simply_valid';

const validation = simplyValid({
  min: 1,
  max: 20,
  schema: 'meetsMinMax'
});

validation('15');
```

### meetsYearStandard
Checks if our value meets the proper 2 or 4 digit year standard

#### Usage
```js
import {meetsYearStandard} from 'simply_valid';

meetsYearStandard('2017');
meetsYearStandard('17');

// OR
import {simplyValid} from 'simply_valid';

const validation = simplyValid({
  schema: 'meetsYearStandard'
});

validation('2017');
validation('17');
```

### meetsCVN
Checks if our value is a proper CVN

#### Usage
```js
import {meetsCVN} from 'simply_valid';

meetsCVN('333');

// OR
import {simplyValid} from 'simply_valid';

const validation = simplyValid({
  schema: 'meetsCVN'
});

validation('333');
```

### meetsCVNAmex
Checks if our value is a proper Amex CVN

#### Usage
```js
import {meetsCVNAmex} from 'simply_valid';

meetsCVNAmex('3343');

// OR
import {simplyValid} from 'simply_valid';

const validation = simplyValid({
  schema: 'meetsCVNAmex'
});

validation('3343');
```

### meetsTreadDepth
Checks if our value meets a tread depth format

#### Usage
```js
import {meetsTreadDepth} from 'simply_valid';

meetsTreadDepth('22');

// OR
import {simplyValid} from 'simply_valid';

const validation = simplyValid({
  schema: 'meetsTreadDepth'
});

validation('22');
```

### meetsPassReq
Checks if our value meets the `passwordPattern` option regex

#### Usage
```js
import {meetsPassReq} from 'simply_valid';

meetsPassReq(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/)('cOol12$d');

// OR set it and re use
const validate = meetsPassReq(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/);

validate('cOol12$d');

// OR
import {simplyValid} from 'simply_valid';

const validation = simplyValid({
  schema: 'meetsPassReq'
});

validation('cOol12$d');
```

## **no** Methods

### noSpecials
Checks if our value contains any special characters

#### Usage
```js
import {noSpecials} from 'simply_valid';

noSpecials('Chicken');

// OR
import {simplyValid} from 'simply_valid';

const validation = simplyValid({
  schema: 'noSpecials'
});

validation('Chicken');
```

### noNumbers
Verifies our value contains no numbers

#### Usage
```js
import {noNumbers} from 'simply_valid';

noNumbers('Chicken');

// OR
import {simplyValid} from 'simply_valid';

const validation = simplyValid({
  schema: 'noNumbers'
});

validation('Chicken');
```

### noLetters
Verifies our value contains no letters

#### Usage
```js
import {noLetters} from 'simply_valid';

noLetters('1123');

// OR
import {simplyValid} from 'simply_valid';

const validation = simplyValid({
  schema: 'noLetters'
});

validation('1123');
```
