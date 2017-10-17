# Change Log v3

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

### New

> - The main `simplyValid` function is curried
> - Added ability to validate objects
>   - Will traverse the data object recursively
> - Added ability to validate arrays of data
> - Added `schema` to options, this will be where you tell simply valid which validatons to run
>   - Your schema will reflect what properties to validate and how
>   - `schema` accepts an `Array`, `Object` or `String` type
> - All methods that accept options are now `curried` so the first is to set options, the next is to validate
> - Added the `strictCard` option which is enabled by default, and runs validation against a `luhn` algorithm instead of `regex`

### Improvements

> - Removed the use of the `search` method since it has very little support
> - Created an esm folder that will export all of the methods if you are importing only methods
> - When using methods individually the 2nd param sent in no longer needs to be an `Object`