# Change Log v3

## v3.0.0

> - Simply_valid lost its roots of being simple, so I am hoping to bring it back to that
> - **BREAKING CHANGES**
>   - Removed `matchesPattern` method
>   - Removed `doesNotMatch` method
>   - Removed `isEqual` method
>   - Removed `hasCustom` method
>   - Removed `meetsLength` method
> - Dropped the options in our object that those methods used
>   - Removed `maxLength` option
>   - Removed `minLength` option
>   - Removed `basePattern` option
>   - Removed `antiPattern` option
>   - Removed `equalTo` option
> - Removed the use of the `search` method since it has very little support
> - If using methods individually you can now pass only the value without the need to wrap it in an object
> - Created an esm folder that will export all of the methods if you are importing them individually
