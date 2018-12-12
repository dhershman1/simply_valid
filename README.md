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

In the browser
```html
<script src="path/to/dist/simplyValid.min.js"></script>
<script>
  validate(schema, data)

  // Or
  var valid = validate(schema)

  valid(data)
</script>
```

## Schema

#### Flat Array

You can pass schema an `Array` of methods
```js
import { hasValue, hasLetters, validate } from 'simply_valid'

const valid = validate([hasValue, hasLetters])

valid('123abc') // => { isValid: true }
valid() // => { isValid: false, rule: 'hasValue' data: undefined }
valid(123) // => { isValid: false, rule: 'hasLetters', data: 123 }
```

#### Flat Object

You can pass schema an `Object` now which would be used if you are validating your own object
```js
import { isNumber, hasLetters, hasNumbers, validate } from 'simply_valid'

const valid = validate({
  zip: isNumber,
  address: [hasLetters, hasNumbers]
})
const data = {
  zip: '11445',
  address: '1132 Cool St'
}

valid(data) // => { isValid: true }
valid({ zip: 'abc', address: '1123 Test Dr' }) // => { isValid: false, prop: 'zip', rule: 'isNumber', data: 'abc' }
```

#### Mixed

You can even mix it up! (Or even use your own methods)
```js
import { isNumber, hasLetters, validate } from 'simply_valid'

const isEven = val => val % 2 === 0
const valid = validate({
    zip: isNumber,
    num: [isNumber, isEven],
    address: {
      street: hasLetters,
      streetNum: isNumber
    }
  })

valid({
  zip: 11445,
  num: 4,
  address: {
    street: 'Cool St',
    streetNum: 123
  }
})
// Output: { isValid: true }

```

## Custom Rules

Simply_Valid also supports the use of custom rules
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

I tried to keep it so you can always expect the same level of return no matter how you are using `simply_valid`

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
