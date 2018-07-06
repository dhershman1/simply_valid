# Change Log

## v4.0.0

### BREAKING CHANGES

- `isVin`, `isEmail`, and `meetsPassReq` no longer accept a regex overwrite the built in ones are optimized and specialized for each of these fields
- Regex options removed from available options lists to send in for the same as above reasons
- `hasValue` (As stated in the fixed section) will no longer consider the number or sting 0 as a falsey value
- Removal of long deprecated `isAmericanExpressCard` in favor of `isAmexCard`
- Marked `v1.0.0 - v2.2.0` as deprecated
- You now need to be more specific about nested objects in the schema if they're nested via your data

### New

- Extreme Architecture cleanup, flattened all of the file systems
- Improved Flow/Optimizations
- Converted from `eslint` to `standardjs`
- Added `maxLen` and `minLen` to options in the object
- Added `isNotTooShort` which verifies if the value is longer or equal to `minLen`
- Added `isNotTooLong` which verifies if the value is shorter or equal to `maxLen`
- Added `isCorrectLength` which verifies if the value is between or equal to `maxLen` or `minLen`
- There is now a non compressed version of the built module if you want to use it in a dev environment located with the compressed version in `dist/simply-valid.js`
- Converted back to `tape` from `ava`

### Updated

- Updated documentation scripts to be faster and have a little more info
- Slight documentation cleanup
- The reponse of the main validation functionality will be much more consistent `{ isValid: Boolean, story: Array }`

### Fixed

- `hasValue` Rule will no longer treat the number 0 as a falsy value
- Some documentation pieces had copy/paste errors that needed addressed
- Nested objects not being validated as expected
- Methods that could break on an undefined will no longer bomb out
- Methods `isAboveMin` and `isBelowMax` edge case fixed if you passed 0 for the min or max property when sending an object
