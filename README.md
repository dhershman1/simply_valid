[![npm](https://img.shields.io/npm/v/simply_valid.svg?style=flat-square)](https://www.npmjs.com/package/simply_valid)
[![David](https://img.shields.io/david/dhershman1/simply_valid.svg?style=flat-square)](https://david-dm.org/dhershman1/simply_valid)
[![David](https://img.shields.io/david/dev/dhershman1/simply_valid.svg?style=flat-square)](https://david-dm.org/dhershman1/simply_valid?type=dev)
[![Travis](https://img.shields.io/travis/dhershman1/simply_valid.svg?style=flat-square)](https://travis-ci.org/dhershman1/simply_valid)
[![Coverage Status](https://img.shields.io/coveralls/github/dhershman1/simply_valid.svg?style=flat-square)](https://coveralls.io/github/dhershman1/simply_valid?branch=master)

# Simply Valid

A simple to use data driven validation system

Have a suggestion? Feel free to post them over in the github issues section and I will happily check them out!

## Documentation

Find individual documentation per function on the site: **[You can click here to go there](https://www.dusty.codes/documentation/simply_valid)**

## Changelog

You can find the changelog here: https://github.com/dhershman1/simply_valid/blob/master/changelog.md

## Old Readmes

You can find Non-depricated old readmes [HERE](https://github.com/dhershman1/simply_valid/blob/master/old-readmes)

## Contents
* [Philosophy](#philosophy)
* [Parameters](#parameters)
* [Options](#options)
* [Defaults](#defaults)
* [Usage](#usage)
* [Schema](#schema)
* [Methods](#methods)
* [Return](#return)

## Philosophy

The idea behind `simply_valid` was a ui free data driven validation system. It started as something I wanted at work over our current validation library and then grew into this. (You can see the inspiration of some of the validation types that lives currently in the functions)

I wanted this module to be `fast`, `easy to use`, and above all as `plug and play` as I could get it.

With the schema system in place for the module you can easily validate complex objects such as form data put into an object, applying an array of rules or even just a single rule to your data value. Making it easy to create validation `instances` for different forms or multiple data styles.

## Parameters

- `options` - `Object`: An object of rules to overwrite the default rules
- `data` - `String|Array|Object`: Data is the value sent in with the 2nd call made to simplyValid (curried call)

## Options

- `schema` - `Object|Array|String` - The validation methods you want simply valid to use
- `strictCard` - `Boolean` - If credit card validation should use the `luhn` algorithm strictly
- `max` - `Number`: The maximum of a value
- `min` - `Number`: The minimum of a value
- `maxLen` - `Number`: The maximum length of a value
- `minLen` - `Number`: The minimum length of a value

## Defaults

```js
const defaults = {
  schema: [],
  strictCard: true,
  max: Infinity,
  min: -Infinity,
  maxLen: 100,
  minLen: 1
};
```

## Usage

However you can also call any of the built in validation methods the same way if you only need one or two. Making tree shaking that much better

Using Standardized JS
```js
import simplyValid from 'simply_valid';

simplyValid(options, data);

// Or
const validate = simplyValid(options);

validate(data);
```

Using commonjs
```js
const simplyValid = require('simply_valid');

simplyValid(options, data);

// Or
const validate = simplyValid(options);

validate(data);
```

In the browser
```html
<script src="path/to/dist/simplyValid.min.js"></script>
<script>
  simplyValid(options, data);

  // Or
  var validate = simplyValid(options);

  validate(data);
</script>
```

## Schema

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

## Methods

You can simply require in a chunk of validation functions if you only need a certain set of them in your app

- `simply_valid/has` - Return the `has` methods
- `simply_valid/is` - Return the `is` methods
- `simply_valid/meets` - Return the `meets` methods
- `simply_valid/no` - Return the `no` methods
- `simply_valid/combo` - Return the `combo` methods
- `simply_valid/esm` - Return `all` methods
- `simply_valid` - Returns the validation functionality built into `Simply_Valid` (Includes all of the methods by default)

## Return

I tried to keep it so you can always expect the same level of return no matter how you are using `simply_valid`

```js
// Passing Validation
{
  isValid: true,
  story: []
}

// Failing returns will look like this
{
  isValid: false,
  story: [{
    test: 'isNumber',
    value: 'cool'
  }]
}
```
