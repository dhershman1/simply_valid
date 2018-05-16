# Simply Valid v3.x.x

**The following Documentation is for v3.x.x**

A simple to use data driven validation system

Have a suggestion? Feel free to post them over in the github issues section and I will happily check them out!

## Documentation

Find main documentation [HERE](https://www.dusty.codes/documentation/simply_valid)

## Contents
* [Options](#options)
* [Defaults](#defaults)
* [Usage](#usage)
* [Schema](#schema)
* [Return](#return)
* [Methods](#methods)
  * [Has Methods](#has-methods)
  * [Is Methods](#is-methods)
  * [Meets Methods](#meets-methods)
  * [No Methods](#no-methods)
  * [Combo Methods](#combo-methods)

## Changelog

**Make sure to check the changelog for breaking changes!**
**You can view old changelogs inside of the [old-changelogs](https://github.com/dhershman1/simply_valid/blob/master/old-changelogs) folder**

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
    zip: 'isNumber',
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

- `simply_valid/has` - Return the `has` methods
- `simply_valid/is` - Return the `is` methods
- `simply_valid/meets` - Return the `meets` methods
- `simply_valid/no` - Return the `no` methods
- `simply_valid/combo` - Return the `combo` methods
- `simply_valid/esm` - Return `all` methods
- `simply_valid` - Returns the validation functionality built into `Simply_Valid` (Includes all of the methods by default)

## **has** Methods

### hasValue
Checks if the value is actually a value

#### Usage
```js
import {hasValue} from 'simply_valid/has';

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
import {hasNumbers} from 'simply_valid/has';

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
import {hasLetter} from 'simply_valid/has';

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
import {hasNumbersOrSpecials} from 'simply_valid/has';

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
import {hasSpecialCharacters} from 'simply_valid/has';

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
import {hasUpperAndLowerCase} from 'simply_valid/has';

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
import {isDate} from 'simply_valid/is';

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
import {isDateShort} from 'simply_valid/is';

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
import {isDateProper} from 'simply_valid/is';

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

#### Arguments

- `emailPattern` - Regex pattern to validate the email again, already has a default set (see above)

#### Usage
```js
import {isEmail} from 'simply_valid/is';

isEmail()('coolKid112@aim.com');

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
import {isNumber} from 'simply_valid/is';

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
import {isPositive} from 'simply_valid/is';

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
import {isNegative} from 'simply_valid/is';

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
import {isLicensePlate} from 'simply_valid/is';

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
import {isPhone} from 'simply_valid/is';

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
import {isZip} from 'simply_valid/is';

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
import {isCAPostalCode} from 'simply_valid/is';

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

#### Arguments

- `vinPattern` - Used to set the regex pattern to validate against (has one by default)

#### Usage
```js
import {isVin} from 'simply_valid/is';

// You can set a custom regex or leave it empty to use the default one
isVin(vinRegex)('JM1CW2BL8C0127808');

// OR
import {simplyValid} from 'simply_valid';

const validation = simplyValid({
  schema: 'isVin'
});

validation('JM1CW2BL8C0127808');
```

### isVisaCard
Checks if the value is a proper Visa card format

#### Arguments

- `strictCard` - Used to set if the value should be ran in the luhn algorithm or not

#### Usage
```js
import {isVisaCard} from 'simply_valid/is';

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

#### Arguments

- `strictCard` - Used to set if the value should be ran in the luhn algorithm or not

#### Usage
```js
import {isVisaPanCard} from 'simply_valid/is';

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

#### Arguments

- `strictCard` - Used to set if the value should be ran in the luhn algorithm or not

#### Usage
```js
import {isMasterCard} from 'simply_valid/is';

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

#### Arguments

- `strictCard` - Used to set if the value should be ran in the luhn algorithm or not

#### Usage
```js
import {isAmericanExpressCard} from 'simply_valid/is';

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

#### Arguments

- `strictCard` - Used to set if the value should be ran in the luhn algorithm or not

#### Usage
```js
import {isDiscoverCard} from 'simply_valid/is';

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

#### Arguments

- `max` - The maxium value to validate against

#### Usage
```js
import {isBelowMax} from 'simply_valid/is';

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

#### Arguments

- `min` - The minimum value to validate against

#### Usage
```js
import {isAboveMin} from 'simply_valid/is';

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

#### Arguments

- `max` - The maxium value to validate against
- `min` - The minimum value to validate against

#### Usage
```js
import {meetsMinMax} from 'simply_valid/meets';

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
import {meetsYearStandard} from 'simply_valid/meets';

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
import {meetsCVN} from 'simply_valid/meets';

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
import {meetsCVNAmex} from 'simply_valid/meets';

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
import {meetsTreadDepth} from 'simply_valid/meets';

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

- `passPattern` - The regex pattern to match against (has a default)

#### Usage
```js
import {meetsPassReq} from 'simply_valid/meets';

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
import {noSpecials} from 'simply_valid/no';

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
import {noNumbers} from 'simply_valid/no';

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
import {noLetters} from 'simply_valid/no';

noLetters('1123');

// OR
import {simplyValid} from 'simply_valid';

const validation = simplyValid({
  schema: 'noLetters'
});

validation('1123');
```

## **combo** Methods

### creditCard
Checks if our value is a valid credit card or not (strictly checks)

Uses the methods:

- `isVisaCard`
- `isDiscoverCard`
- `isMasterCard`
- `isAmexCard`

#### Usage
```js
import { creditCard } from 'simply_valid/combo';

creditCard('4012888888881881'); //=> true

// OR
import {simplyValid} from 'simply_valid';

const validation = simplyValid({
  schema: 'creditCard'
});

validation('4012888888881881'); // => {isValid: true}
```

### date
Checks if our value is a valid date of some kind

Uses the methods:

- `isDate`
- `isDateShort`
- `isDateProper`

#### Usage
```js
import { date } from 'simply_valid/combo';

date('01/18'); //=> true
date('01/20/18'); //=> true

// OR
import {simplyValid} from 'simply_valid';

const validation = simplyValid({
  schema: 'date'
});

validation('01/18'); // => {isValid: true}
validation('01/20/18'); // => {isValid: true}
```

### cvn
Checks if our value is a valid cvn of some kind **NOTE it does not take a credit card type into account, so an amex cvn will still pass**

Uses the methods:

- `meetsCVN`
- `meetsCVNAmex`

#### Usage
```js
import { cvn } from 'simply_valid/combo';

cvn('333'); //=> true
cvn('3333'); //=> true

// OR
import {simplyValid} from 'simply_valid';

const validation = simplyValid({
  schema: 'cvn'
});

validation('333'); // => {isValid: true}
validation('3333'); // => {isValid: true}
```

### zipOrPostal
Checks if our value is a valid Zip or Postal code

Uses the methods:

- `isZip`
- `isCAPostalCode`

#### Usage
```js
import { zipOrPostal } from 'simply_valid/combo';

zipOrPostal('44444'); //=> true
zipOrPostal('K1A0B1'); //=> true

// OR
import {simplyValid} from 'simply_valid';

const validation = simplyValid({
  schema: 'zipOrPostal'
});

validation('44444'); // => {isValid: true}
validation('K1A0B1'); // => {isValid: true}
```
