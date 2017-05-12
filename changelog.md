# Change Log

## v1.2.1

> * Huge code cleanup
> * Performance improvements
> * Fixed some error message typos
> * Removed `if else` setup
>   * Each method now runs a `if` check to determine if a failure happens and thats it
>   * Cleaned up `finish()`

## v1.2.0

> - Added ability to create a variable of validation methods that are ran on a value
> - Unit tested this new feature
> - Cleaned up code slightly
> - Removed Deps
> - Finished cleaning up ES6 that I missed (Sorry about that)

## v1.1.1

> - Fixed Typo in an error message

## v1.1.0

> - Added `isDateShort` method, to account for 4 digit date formats
> - Doubled test count to test more situations
> - Fixed `hasUpperAndLowerCase` not properly checking for both lower AND upper case
> - Fixed `hasLetters` to use a stricter regex so number only strings don't pass
> - Upgraded `isLicensePlate` to be more capable in capturing a larger variety of plate formats
>   - Please Note: Length checks should be doubled checked based on location since style varies by location
> - Fixed `noNumber` to use a better regex for proper validation
> - Fixed `finish` Sometimes reporting bad responses if the test after the bad test failed
> - Converted to non ES6 standards for better front end support
