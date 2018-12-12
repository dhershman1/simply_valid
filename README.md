[![npm](https://img.shields.io/npm/v/simply_valid.svg?style=flat-square)](https://www.npmjs.com/package/simply_valid)
[![David](https://img.shields.io/david/dhershman1/simply_valid.svg?style=flat-square)](https://david-dm.org/dhershman1/simply_valid)
[![David](https://img.shields.io/david/dev/dhershman1/simply_valid.svg?style=flat-square)](https://david-dm.org/dhershman1/simply_valid?type=dev)
[![Travis](https://img.shields.io/travis/dhershman1/simply_valid.svg?style=flat-square)](https://travis-ci.org/dhershman1/simply_valid)
[![Coverage Status](https://img.shields.io/coveralls/github/dhershman1/simply_valid.svg?style=flat-square)](https://coveralls.io/github/dhershman1/simply_valid?branch=master)

# Simply Valid

A simple and lightweight validation system. Ships with prebuilt rules and accepts custom rules.

## Documentation

Find individual documentation per function on the site: **[You can click here to go there](https://www.dusty.codes/documentation/simply_valid)**

## Content
* [Philosophy](#philosophy)
* [Parameters](#parameters)
* [Usage](#usage)
* [Schema](#schema)
* [Custom Rules](#custom-rules)
* [Return](#return)

## Philosophy

The idea behind `simply_valid` was a ui free data driven validation system. It started as something I wanted at work over our current validation library and then grew into this. (You can see the inspiration of some of the validation types that lives currently in the functions)

I wanted this module to be `fast`, `easy to use`, and above all as `plug and play` as I could get it.

With the schema system in place for the module you can easily validate complex objects such as form data put into an object, applying an array of rules or even just a single rule to your data value. Making it easy to create validation `instances` for different forms or multiple data styles.

## Parameters

- `schema` - `Object`: An object of rules to overwrite the default rules
- `data` - `String|Array|Object`: Data is the value sent in with the 2nd call made to simplyValid (curried call)

## Usage

Using Standard JS
```js
import { validate } from 'simply_valid'

validate(schema, data)

// Or
const valid = validate(schema)

valid(data)
```

Using commonjs
```js
const { validate } = require('simply_valid')

validate(schema, data)

// Or
const valid = validate(schema)

valid(data)
```

Using a CDN
```html
<!-- It is recommended to replace @latest with a strict version number -->
<script src="https://cdn.jsdelivr.net/npm/simply_valid@latest/dist/simply-valid.min.js"></script>
<script>
  validate(schema, data)

  // Or
  const valid = validate(schema)

  valid(data)
</script>
```

In the browser
```html
<script src="path/to/dist/simplyValid.min.js"></script>
<script>
  validate(schema, data)

  // Or
  const valid = validate(schema)

  valid(data)
</script>
```

## Schema

Simply_Valid supports a schema system, the schema should be either an `Array` or `Object` type. Even when using just one function

> **Note** If you are validating an object the schema **MUST** also be an object

Examples:
```js
import { validate, hasValue, isNumber, isPositive, hasLetters, hasNumbers, isZip, noNumbers } from 'simply_valid'

// Single/Primitive data value
validate([isNumber], 2) // => { isValid: true }
validate([isNumber, isPositive], 3) // => { isValid: true }

// Array of Data
validate([isNumber], [1, 2, 3]) // => { isValid: true }
validate([isNumber, isPositive], [1, 2, 3]) // => { isValid: true }
validate([isNumber, isPositive], [1, 2, -3]) // => { isValid: false, rule: 'isPositive', data: [1, 2, -3] }

// Object of Data
validate({
  zip: isZip,
  address: [hasLetters, hasNumbers]
}, {
  zip: 11234,
  address: '123 test dr'
}) // => { isValid: true }

// Object with nested data
validate({
  zip: isZip,
  address: validate({ num: isNumber, name: [hasLetters, noNumbers] })
}, {
  zip: 11234,
  address: {
    num: 123,
    name: 'test dr'
  }
})
```

## Custom Rules

Simply_Valid also supports the use of custom rules

- Custom rules returns will be treated on a true/false basis so try to have them return a boolean
- If you want a multi param rules name to show up in a failure make sure you name the inner function
- The inner function should be the same name but with an underscore at the start (it will be formatted out)
```js
import { validate } from 'simply_valid'

const isEven = val => val % 2 === 0
// For multi param functions you need to use the function keyword
// If you want the name to show up in failures, it also relies on partial execution
const notMin = function notMin (min) {
  // The inner function should be named the same but with a _ in front of it
  // (This gets removed when you get the rule)
  // This ensures you get an accurate rule back in your object
  return function _notMin (val) {
    return val !== min
  }
}
const schema = {
  foo: isEven,
  bar: [isEven, notMin(4)]
}

validate(schema, { foo: 4, bar: 6 }) // => { isValid: true }
validate(schema, { foo:4, bar: 4 }) // => { isValid: false, rule: 'notMin', data: 4 }
validate(schema, { foo:4, bar: 5 }) // => { isValid: false, rule: 'isEven', data: 5 }
```

## Return

Simply_Valid when exit out with information on the very first failure it encounters.

```js
// Passing Validation
{ isValid: true }

// Failing returns will look like this
{
  isValid: false,
  prop: 'propName',
  rule: 'functionName'
  data: 'cool'
}
```
