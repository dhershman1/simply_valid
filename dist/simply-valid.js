(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.simplyValid = factory());
}(this, (function () { 'use strict';

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var hasValue = function hasValue(val) {
  return val === 0 || Boolean(val);
};
var hasNumbers = function hasNumbers(val) {
  return /[0-9]/.test(val);
};
var hasLetters = function hasLetters(val) {
  return /[A-Z]/i.test(val);
};
var hasSpecialCharacters = function hasSpecialCharacters(val) {
  return /\W/.test(val);
};
var hasNumbersOrSpecials = function hasNumbersOrSpecials(val) {
  return hasNumbers(val) || hasSpecialCharacters(val);
};
var hasUpperAndLowerCase = function hasUpperAndLowerCase(val) {
  return /[A-Z]/.test(val) && /[a-z]/.test(val);
};

var curry = function curry(f) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  return f.length <= args.length ? f.apply(void 0, args) : function () {
    for (var _len2 = arguments.length, more = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      more[_key2] = arguments[_key2];
    }
    return curry.apply(void 0, [f].concat(args, more));
  };
};

var luhn = function luhn(val) {
  var numArr = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9];
  var stringVal = String(val);
  var len = stringVal.length;
  var bit = 1;
  var sum = 0;
  var num = 0;
  while (len) {
    num = parseInt(stringVal.charAt(--len), 10);
    sum += (bit ^= 1) ? numArr[num] : num;
  }
  return sum && sum % 10 === 0;
};
var isNotTooShort = curry(function (rule, val) {
  if (rule.minLen) {
    return val.length >= rule.minLen;
  }
  return val.length >= rule;
});
var isNotTooLong = curry(function (rule, val) {
  if (rule.maxLen) {
    return val.length <= rule.maxLen;
  }
  return val.length <= rule;
});
var isCorrectLength = curry(function (_ref, val) {
  var maxLen = _ref.maxLen,
      minLen = _ref.minLen;
  return isNotTooShort(minLen, val) && isNotTooLong(maxLen, val);
});
var isDate = function isDate(val) {
  return /^((1[0-2])|(0?[1-9]))[-/.]?((0?[1-9])|([1-2][0-9])|(3[0-1]))[-/.]?(([1-2]{1}[0-9]{3})|([0-9]{2}))$/m.test(val);
};
var isDateShort = function isDateShort(val) {
  return /^((1[0-2])|(0?[1-9]))[-/.]?((0?[1-9])|([1-2][0-9])|(3[0-1]))[-/.]?$/m.test(val);
};
var isDateProper = function isDateProper(val) {
  return /^(([1-2]{1}[0-9]{3})|([0-9]{2}))[-/.]?((1[0-2])|(0?[1-9]))[-/.]?((0?[1-9])|([1-2][0-9])|(3[0-1]))$/m.test(val);
};
var isEmail = function isEmail(val) {
  var emailRegex = /^[\w\u00c0-\u017f][\w.-_\u00c0-\u017f]*[\w\u00c0-\u017f]+[@][\w\u00c0-\u017f][\w.-_\u00c0-\u017f]*[\w\u00c0-\u017f]+\.[a-z]{2,4}$/i;
  return emailRegex.test(val);
};
var isNumber = function isNumber(val) {
  return !isNaN(val);
};
var isPositive = function isPositive(val) {
  return !isNaN(val) && Number(val) >= 0;
};
var isNegative = function isNegative(val) {
  return !isNaN(val) && Number(val) < 0;
};
var isVin = function isVin(val) {
  var vinRegex = /^[a-hj-npr-z0-9]{9}[a-hj-npr-tv-y1-9]{1}[a-hj-npr-z0-9]{7}$/i;
  return vinRegex.test(val);
};
var isZip = function isZip(val) {
  return /^\d{5}(-\d{4})?$/.test(val);
};
var isCAPostalCode = function isCAPostalCode(val) {
  return /^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1} *\d{1}[A-Z]{1}\d{1}$/i.test(val);
};
var isPhone = function isPhone(val) {
  return /^[0-9]{10}$/.test(val.replace(/\W/g, ''));
};
var isLicensePlate = function isLicensePlate(val) {
  return /^([A-Z]|[0-9]){1,3}(\s|-|•)?([A-Z]|[0-9]){3,5}$/i.test(val);
};
var isVisaCard = curry(function (strict, val) {
  if (strict) {
    return luhn(val);
  }
  return /^4[0-9]{15}$/.test(val);
});
var isVisaPanCard = curry(function (strict, val) {
  if (strict) {
    return luhn(val);
  }
  return /^4[0-9]{18}$/.test(val);
});
var isMasterCard = curry(function (strict, val) {
  if (strict) {
    return luhn(val);
  }
  return /^5[1-5][0-9]{14}$/.test(val);
});
var isAmexCard = curry(function (strict, val) {
  if (strict) {
    return luhn(val);
  }
  return /^3(4|7)[0-9]{13}$/.test(val);
});
var isDiscoverCard = curry(function (strict, val) {
  if (strict) {
    return luhn(val);
  }
  return /^6[0-9]{15}$/.test(val);
});
var isBelowMax = curry(function (m, val) {
  if (m.max) {
    return !isNaN(val) && Number(val) < m.max;
  }
  return !isNaN(val) && Number(val) < m;
});
var isAboveMin = curry(function (m, val) {
  if (m.min) {
    return !isNaN(val) && Number(val) > m.min;
  }
  return !isNaN(val) && Number(val) > m;
});

var meetsMinMax = curry(function (_ref, val) {
  var min = _ref.min,
      max = _ref.max;
  return !isNaN(val) && Number(val) >= min && Number(val) <= max;
});
var meetsYearStandard = function meetsYearStandard(val) {
  return /(^[0-9]{2}$)|(^[1-2]{1}[0-9]{3}$)/.test(val);
};
var meetsCVN = function meetsCVN(val) {
  return val.length === 3 && /[0-9]/.test(val);
};
var meetsCVNAmex = function meetsCVNAmex(val) {
  return val.length === 4 && /[0-9]/.test(val);
};
var meetsTreadDepth = function meetsTreadDepth(val) {
  return /^(([0-1]?[0-9]|2[0-1])(\.[0-9])?|22)$/i.test(val);
};
var meetsPassReq = function meetsPassReq(val) {
  var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/;
  return passwordRegex.test(val);
};

var noSpecials = function noSpecials(val) {
  return val.match(/\W/) === null;
};
var noNumbers = function noNumbers(val) {
  return val.match(/[0-9]/) === null;
};
var noLetters = function noLetters(val) {
  return val.match(/[A-Z]/i) === null;
};

var runner = function runner(val, methods) {
  for (var i = 0, len = methods.length; i < len; i++) {
    if (methods[i](val)) {
      return true;
    }
  }
  return false;
};
var creditCard = function creditCard(val) {
  return runner(val, [isAmexCard(true), isDiscoverCard(true), isMasterCard(true), isVisaCard(true)]);
};
var date = function date(val) {
  return runner(val, [isDate, isDateShort, isDateProper]);
};
var cvn = function cvn(val) {
  return runner(val, [meetsCVN, meetsCVNAmex]);
};
var zipOrPostal = function zipOrPostal(val) {
  return runner(val, [isZip, isCAPostalCode]);
};



var methods = /*#__PURE__*/Object.freeze({
hasValue: hasValue,
hasNumbers: hasNumbers,
hasLetters: hasLetters,
hasSpecialCharacters: hasSpecialCharacters,
hasNumbersOrSpecials: hasNumbersOrSpecials,
hasUpperAndLowerCase: hasUpperAndLowerCase,
isNotTooShort: isNotTooShort,
isNotTooLong: isNotTooLong,
isCorrectLength: isCorrectLength,
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
isAmexCard: isAmexCard,
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
noLetters: noLetters,
creditCard: creditCard,
date: date,
cvn: cvn,
zipOrPostal: zipOrPostal
});

var each = function each(data, cb) {
  var i = 0;
  var keys = Object.keys(data);
  var len = keys.length;
  for (i; i < len; i++) {
    var prop = keys[i];
    if (Object.prototype.hasOwnProperty.call(data, prop)) {
      if (_typeof(data[prop]) === 'object') {
        each(data[prop], cb);
        continue;
      }
      cb(data[prop], prop);
    }
  }
};

var ensureArray = (function (val) {
  if (Array.isArray(val)) {
    return val;
  }
  if (val === void 0) {
    return [];
  }
  return [val];
});

var isObject = (function (x) {
  return Object.prototype.toString.call(x) === '[object Object]';
});

var setMethods = {};
var extend = function extend() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return args.reduce(function (acc, x) {
    var key = '';
    for (key in x) {
      acc[key] = x[key];
    }
    return acc;
  }, {});
};
var format = function format(obj) {
  var results = {
    isValid: true,
    story: []
  };
  for (var prop in obj) {
    if (obj[prop].isValid) {
      continue;
    }
    var _obj$prop$story = _slicedToArray(obj[prop].story, 1),
        story = _obj$prop$story[0];
    story.propName = prop;
    results.story.push(story);
  }
  if (results.story.length) {
    results.isValid = false;
    return results;
  }
  return results;
};
var setup = function setup(opts) {
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
var validate = function validate(data, options, useMethods) {
  var story = [];
  useMethods.forEach(function (currMethod) {
    var isValid = setMethods[currMethod](data);
    if (!isValid) {
      story.push({
        test: currMethod,
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
  return {
    isValid: true
  };
};
var validWhere = function validWhere(obj, opts, useMethods) {
  var results = {};
  if (isObject(useMethods)) {
    each(obj, function (val, prop) {
      if (Object.prototype.hasOwnProperty.call(useMethods, prop)) {
        results[prop] = validate(val, opts, ensureArray(useMethods[prop]));
      }
    });
  } else {
    each(obj, function (val, prop) {
      results[prop] = validate(val, opts, useMethods);
    });
  }
  return format(results);
};
var runSchemaObj = function runSchemaObj(data, opts, useMethods) {
  if (isObject(useMethods) || Array.isArray(useMethods)) {
    return validWhere(data, opts, useMethods);
  }
  return validate(data, opts, ensureArray(useMethods));
};
var runSchemaArr = function runSchemaArr(data, opts, useMethods) {
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
var validateSchema = function validateSchema(schema) {
  return Array.isArray(schema) && schema.length || isObject(schema) && Object.keys(schema).length || Boolean(schema.length);
};
var simplyValid = curry(function (options, data) {
  var defaults = {
    schema: [],
    strictCard: false,
    max: Infinity,
    min: -Infinity,
    maxLen: 100,
    minLen: 1
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
});

return simplyValid;

})));
