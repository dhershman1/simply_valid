# Change Log v3

## v3.2.4 (Unreleased)

### New

- Extreme Architecture cleanup, flattened all of the file systems
- Improved Flow/Optimizations
- Converted from `eslint` to `standardjs`

### Updated

- Updated documentation scripts to be faster and have a little more info

## v3.2.3

- Fixed build process for simplyValid validation using `.default`
- Fixed needing to call main when using CDN style of simply_valid

## v3.2.2

- Rebuilt entire build process replacing webpack with a rollup build system this gives us a fairly large decrease in overall file size
- Fixed some typos in documentation

## v3.2.1

- Setup documentation generation
- Better Currying setup for curried functions
- Better documentation

## v3.2.0

- Welcome back "multi" methods now they are called "Combo" methods
- Combo methods can be required directly as well with `simply_valid/combo` Which contains the following
    - `creditCard` - Strictly validates the value that it is some card (except `visaPanCards`)
    - `date` - Validates that the value is a date of some kind
    - `cvn` - Validates that the value is a CVN of some kind (Warning: Does not match a card type like `simple-card` does)
    - `zipOrPostal` - Validates that the value is a Zip or Postal code
- You can now send methods as a single string when using object schema
- `isAmericanExpressCard` is now depricated please use `isAmexCard` however `isAmericanExpressCard` will work still for now

## v3.1.2

- Typo Fixes for README
- Updated use examples in README

## v3.1.1

> - Converted to webpack for compiling the module down
> - Overhaul of how the module handles itself
> - Fix so that `_internals` is no longer being included in the build
> - Converted unit tests over to use `ava`
> - Small code optimization tweaks

## v3.1.0

> - Introduction to better destructuring, and requiring support
> - Introduced the ability to do `simply_valid/{{method}}`
>   - Added `simply_valid/has` - Brings in `has` methods only
>   - Added `simply_valid/is` - Brings in `is` methods only
>   - Added `simply_valid/meets` - Brings in `meets` methods only
>   - Added `simply_valid/no` - Brings in `no` methods only
>   - Added `simply_valid/esm` - Brings in `all` of the methods
>   - Of course you can still use just `simply_valid` to run the validation module as a whole

## v3.0.2

> - Small file organization changes
> - Tweak the `.npmignore` file
> - Drop the testing rollup configs since they're no longer needed

## v3.0.1

> - Fixed some over zealous code
> - Removed un needed logic checks for looping data
> - Simplified the need for looping
> - Fix for esm folder
> - Clean up imports
> - Improved flow with curry functions
> - Turn Compressed builds back on

## v3.0.0

### BREAKING CHANGES
> - Removed Methods
>   - `matchesPattern`
>   - `doesNotMatch`
>   - `isEqual`
>   - `hasCustom`
>   - `meetsLength`
> - Removed Options
>   - `maxLength`
>   - `minLength`
>   - `basePattern`
>   - `antiPattern`
>   - `equalTo`
> - Temporarily removed `multi` methods (they still exist in the code base though)
>   - `creditCard`
>   - `cvn`
>   - `date`
>   - `zipPost`
> - Calling methods individually is now curried so you will need to call it once to set settings and then again with your data
> - Changed how overall usage works for the module

### New

> - The main `simplyValid` function is curried
> - Added ability to validate objects
>   - Will traverse the data object recursively
> - Added ability to validate arrays of data
> - Added `schema` to options, this will be where you tell simply valid which validatons to run
>   - Your schema will reflect what properties to validate and how
>   - `schema` accepts an `Array`, `Object` or `String` type
> - Added the `strictCard` option which is enabled by default, and runs validation against a `luhn` algorithm instead of `regex`
> - You can also send in an array of Objects to validate now, so long as you either provide an object schema to validate against

### Improvements

> - Removed the use of the `search` method since it has very little support
>    - Should fix support for IE
> - Created an esm folder that will export all of the methods if you are importing only methods
> - When using methods individually they are now curried, so you call it once with the settings and then again with the data
> - Overall improvements in how the module is used
> - Quality of life improvements to make things simple again