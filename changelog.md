# Change Log v2+

## v2.1.0

> - Optimized the built in `extend` function
> - Added `passwordPattern` option for regex pass matching
> - Added `isVisaPanCard` which checks for the new PAN visa number length
> - Added `isDiscoverCard` which does as you expect and validates a dicover card number
> - Added `isBelowMax` which just validates the value is below the `max` option
> - Added `isAboveMin` which just validates the value is above the `min` option
> - Added `meetsMinMax` which verifies that the valid is between the `min` and `max` options
> - Added `meetsPassReq` which validates the value against the `passwordPattern` option
> - Added new validation method type `multi` which runs multiple validations in a single function for you (requested)
>   - It's used just like the other methods `validation(['multiMethod'], options)`
>   - Current Methods: `creditCard`, `date`, `cvn`, `zipPost`
> - Optimized/Cleaned up overall code
>   - ES6 cleanup
>   - Stricter eslint rules added to help organize things

## v2.0.0 - Quality of Life update

> - MAJOR re write of entire module
> - Method chaining is no longer supported to keep chains stay on v1.3.1!
> - Reduced validation methods to simple logic for large performance boosts
> - Dynamically writes validation story so as they fail they're recorded
> - Simplified Usage
> - Changed the `toMatch` property to `equalTo` in the options
> - Organized Methods based on their types `has`, `is`, etc...
> - This allowed large amounts of code cleanup in the main index file
> - Changed `matchesGiven` to `isEqual`
> - Removed `matchesCustom`
> - Added method `noLetters`
