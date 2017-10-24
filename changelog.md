# Change Log v3

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