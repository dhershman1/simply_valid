import isObject from '../isObject';

/* eslint-disable no-extra-parens */

const objType = schema => (Array.isArray(schema) && schema.length) || (isObject(schema) && Object.keys(schema).length);

export default schema => objType(schema) || Boolean(schema.length);
