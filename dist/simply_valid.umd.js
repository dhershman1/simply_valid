(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.simplyValid = factory());
}(this, (function () { 'use strict';

var hasValue = function (val) { return val && val.length !== 0; };

var hasNumbers = function (val) { return (/[0-9]/).test(val); };

var hasLetters = function (val) { return (/[A-Z]/i).test(val); };

var hasSpecialCharacters = function (val) { return (/\W/).test(val); };

var hasNumbersOrSpecials = function (val) { return hasNumbers(val) || hasSpecialCharacters(val); };

var hasUpperAndLowerCase = function (val) { return (/[A-Z]/).test(val) && (/[a-z]/).test(val); };

var isObject = function (x) { return Object.prototype.toString.call(x) === '[object Object]'; };

/**
 * Extend or merge an object
 * @param {Object} args The objects to combine
 */
var extend = function () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.reduce(function (acc, x) {
  var key = '';

  for (key in x) {
    acc[key] = x[key];
  }

  return acc;
}, {});
};

/**
 * Safety measure to ensure an array is always present
 * @param {*} val value to ensure is an array
 */
var ensureArray = function (val) {
  if (Array.isArray(val)) {
    return val;
  }

  if (val === void 0) {
    return [];
  }

  return [val];
};

/**
 * Recursively iterate through an object or array and return the values
 * @param {Object} obj Object to iterate through
 * @param {Function} cb callback to send values back to
 */
var each = function (data, cb) {
  var i = 0;
  var keys = Object.keys(data);
  var len = keys.length;

  for (i; i < len; i++) {
    var prop = keys[i];

    if (Object.prototype.hasOwnProperty.call(data, prop)) {
      if (typeof data[prop] === 'object') {
        each(data[prop], cb);
        continue;
      }
      cb(data[prop], prop);
    }
  }
};

/**
 * Formats the results object sent back to the user
 * @param {Object} obj Object to be formatted
 */
var format = function (obj) {
  var results = {
    isValid: true,
    story: []
  };

  for (var prop in obj) {
    if (obj[prop].isValid) {
      continue;
    }

    var ref = obj[prop].story;
    var story = ref[0];

    story.propName = prop;
    results.story.push(story);
  }

  if (results.story.length) {
    results.isValid = false;

    return results;
  }

  return results;
};

/**
 * Validates the sent in schema is useable
 * @param {*} schema The schema value to validate
 */
var validateSchema = function (schema) {
  if (Array.isArray(schema) && schema.length) {
    return true;
  }

  if (isObject(schema) && Object.keys(schema).length) {
    return true;
  }

  return Boolean(schema.length);
};

/**
 * Validates a credit card using the luhn algorithm
 * @param {String} val The card number string to validate
 */
var luhn = function (val) {
  var numArr = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9];
  var stringVal = String(val);
  var len = stringVal.length;
  var bit = 1;
  var sum = 0;
  var num = 0;

  while (len) {
    num = parseInt(stringVal.charAt(--len), 10);
    sum += (bit ^= 1) ? numArr[num] : num; // eslint-disable-line
  }

  return sum && sum % 10 === 0;
};

/* eslint-disable max-len */

var emailRegex = /^[\w\u00c0-\u017f][\w.-_\u00c0-\u017f]*[\w\u00c0-\u017f]+[@][\w\u00c0-\u017f][\w.-_\u00c0-\u017f]*[\w\u00c0-\u017f]+\.[a-z]{2,4}$/i;
var vinRegex = /^[a-hj-npr-z0-9]{9}[a-hj-npr-tv-y1-9]{1}[a-hj-npr-z0-9]{7}$/i;

var isDate = function (val) { return (/^((1[0-2])|(0?[1-9]))[-/.]?((0?[1-9])|([1-2][0-9])|(3[0-1]))[-/.]?(([1-2]{1}[0-9]{3})|([0-9]{2}))$/m).test(val); };

var isDateShort = function (val) { return (/^((1[0-2])|(0?[1-9]))[-/.]?((0?[1-9])|([1-2][0-9])|(3[0-1]))[-/.]?$/m).test(val); };

var isDateProper = function (val) { return (/^(([1-2]{1}[0-9]{3})|([0-9]{2}))[-/.]?((1[0-2])|(0?[1-9]))[-/.]?((0?[1-9])|([1-2][0-9])|(3[0-1]))$/m).test(val); };

var isEmail = function (email) {
  if ( email === void 0 ) email = emailRegex;

  return function (val) {
  if (email.emailPattern) {
    return email.emailPattern.test(val);
  }

  return email.test(val);
};
};

var isNumber = function (val) { return !isNaN(val); };

var isPositive = function (val) { return !isNaN(val) && Number(val) >= 0; };

var isNegative = function (val) { return !isNaN(val) && Number(val) < 0; };

var isVin = function (vin) {
  if ( vin === void 0 ) vin = vinRegex;

  return function (val) {
  if (vin.vinPattern) {
    return vin.vinPattern.test(val);
  }

  return vin.test(val);
};
};

var isZip = function (val) { return (/^\d{5}(-\d{4})?$/).test(val); };

var isCAPostalCode = function (val) { return (/^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1} *\d{1}[A-Z]{1}\d{1}$/i).test(val); };

var isPhone = function (val) { return (/^[0-9]{10}$/).test(val.replace(/\W/g, '')); };

var isLicensePlate = function (val) { return (/^([A-Z]|[0-9]){1,3}(\s|-|•)?([A-Z]|[0-9]){3,5}$/i).test(val); };

var isVisaCard = function (strict) {
  if ( strict === void 0 ) strict = true;

  return function (val) {
  if (strict) {
    return luhn(val);
  }

  return (/^4[0-9]{15}$/).test(val);
};
};

var isVisaPanCard = function (strict) {
  if ( strict === void 0 ) strict = true;

  return function (val) {
  if (strict) {
    return luhn(val);
  }

  return (/^4[0-9]{18}$/).test(val);
};
};

var isMasterCard = function (strict) {
  if ( strict === void 0 ) strict = true;

  return function (val) {
  if (strict) {
    return luhn(val);
  }

  return (/^5[1-5][0-9]{14}$/).test(val);
};
};

var isAmericanExpressCard = function (strict) {
  if ( strict === void 0 ) strict = true;

  return function (val) {
  if (strict) {
    return luhn(val);
  }

  return (/^3(4|7)[0-9]{13}$/).test(val);
};
};

var isDiscoverCard = function (strict) {
  if ( strict === void 0 ) strict = true;

  return function (val) {
  if (strict) {
    return luhn(val);
  }

  return (/^6[0-9]{15}$/).test(val);
};
};

var isBelowMax = function (m) {
  if ( m === void 0 ) m = Infinity;

  return function (val) {
  if (m.max) {
    return !isNaN(val) && Number(val) < m.max;
  }

  return !isNaN(val) && Number(val) < m;
};
};

var isAboveMin = function (m) {
  if ( m === void 0 ) m = -Infinity;

  return function (val) {
  if (m.min) {
    return !isNaN(val) && Number(val) > m.min;
  }

  return !isNaN(val) && Number(val) > m;
};
};

/* eslint-disable max-len */
var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/;

var meetsMinMax = function (ref) {
  var min = ref.min; if ( min === void 0 ) min = -Infinity;
  var max = ref.max; if ( max === void 0 ) max = Infinity;

  return function (val) { return !isNaN(val) && (Number(val) >= min && Number(val) <= max); };
};

var meetsYearStandard = function (val) { return (/(^[0-9]{2}$)|(^[1-2]{1}[0-9]{3}$)/).test(val); };

var meetsCVN = function (val) { return val.length === 3 && (/[0-9]/).test(val); };

var meetsCVNAmex = function (val) { return val.length === 4 && (/[0-9]/).test(val); };

var meetsTreadDepth = function (val) { return (/^(([0-1]?[0-9]|2[0-1])(\.[0-9])?|22)$/i).test(val); };

var meetsPassReq = function (pass) {
  if ( pass === void 0 ) pass = passwordRegex;

  return function (val) {
  if (pass.passwordPattern) {
    return pass.passwordPattern.test(val);
  }

  return pass.test(val);
};
};

var noSpecials = function (val) { return val.match(/\W/) === null; };

var noNumbers = function (val) { return val.match(/[0-9]/) === null; };

var noLetters = function (val) { return val.match(/[A-Z]/i) === null; };



var methods = Object.freeze({
	hasValue: hasValue,
	hasNumbers: hasNumbers,
	hasLetters: hasLetters,
	hasSpecialCharacters: hasSpecialCharacters,
	hasNumbersOrSpecials: hasNumbersOrSpecials,
	hasUpperAndLowerCase: hasUpperAndLowerCase,
	isDate: isDate,
	isDateShort: isDateShort,
	isDateProper: isDateProper,
	isEmail: isEmail,
	isNumber: isNumber,
	isPositive: isPositive,
	isNegative: isNegative,
	isVin: isVin,
	isZip: isZip,
	isCAPostalCode: isCAPostalCode,
	isPhone: isPhone,
	isLicensePlate: isLicensePlate,
	isVisaCard: isVisaCard,
	isVisaPanCard: isVisaPanCard,
	isMasterCard: isMasterCard,
	isAmericanExpressCard: isAmericanExpressCard,
	isDiscoverCard: isDiscoverCard,
	isBelowMax: isBelowMax,
	isAboveMin: isAboveMin,
	meetsMinMax: meetsMinMax,
	meetsYearStandard: meetsYearStandard,
	meetsCVN: meetsCVN,
	meetsCVNAmex: meetsCVNAmex,
	meetsTreadDepth: meetsTreadDepth,
	meetsPassReq: meetsPassReq,
	noSpecials: noSpecials,
	noNumbers: noNumbers,
	noLetters: noLetters
});

/* eslint-disable max-len */
var setMethods = {};

var setup = function (opts) {
  var results = {};

  for (var prop in methods) {
    var func = methods[prop];

    if (typeof func('test') === 'function') {
      results[prop] = func(opts);
    } else {
      results[prop] = func;
    }
  }

  return results;
};

var validate = function (data, options, useMethods) {
  var story = [];

  useMethods.forEach(function (currMethod) {
    var isValid = setMethods[currMethod](data);

    if (!isValid) {
      // If something comes back as a failure we need to push it into the story
      story.push({
        // What test did we fail on
        test: currMethod,
        // The value used when the failure happened
        value: data
      });
    }
  });

  if (story.length) {
    return {
      isValid: false,
      story: story
    };
  }

  return { isValid: true };
};

var validWhere = function (obj, opts, useMethods) {
  var results = {};

  if (isObject(useMethods)) {
    each(obj, function (val, prop) {
      if (Object.prototype.hasOwnProperty.call(useMethods, prop)) {
        results[prop] = validate(val, opts, useMethods[prop]);
      }
    });
  } else {
    each(obj, function (val, prop) {
      results[prop] = validate(val, opts, useMethods);
    });
  }

  return format(results);
};

var runSchemaObj = function (data, opts, useMethods) {
  if (isObject(useMethods) || Array.isArray(useMethods)) {
    return validWhere(data, opts, useMethods);
  }

  // Assume it's a string at this point
  return validate(data, opts, ensureArray(useMethods));
};

var runSchemaArr = function (data, opts, useMethods) {
  var results = {};
  var arrResults = [];

  data.forEach(function (val) {
    if (isObject(val)) {
      arrResults.push(runSchemaObj(val, opts, useMethods));
    } else {
      results[val] = validate(val, opts, ensureArray(useMethods));
    }
  });

  return Object.keys(results).length ? results : format(arrResults);
};

var simplyValid = function (options) { return function (data) {
  var defaults = {
    schema: [],
    strictCard: false,
    max: Infinity,
    min: -Infinity,
    vinPattern: /^[a-hj-npr-z0-9]{9}[a-hj-npr-tv-y1-9]{1}[a-hj-npr-z0-9]{7}$/i,
    emailPattern: /^[\w\u00c0-\u017f][\w.-_\u00c0-\u017f]*[\w\u00c0-\u017f]+[@][\w\u00c0-\u017f][\w.-_\u00c0-\u017f]*[\w\u00c0-\u017f]+\.[a-z]{2,4}$/i,
    passwordPattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/
  };
  var opts = extend({}, defaults, options);

  setMethods = setup(opts);

  if (!validateSchema(opts.schema)) {
    throw new Error('No schema provided for validation');
  }

  if (isObject(data)) {
    return runSchemaObj(data, opts, opts.schema);
  }
  if (Array.isArray(data)) {
    return runSchemaArr(data, opts, opts.schema);
  }

  return validate(data, opts, ensureArray(opts.schema));
}; };

return simplyValid;

})));
