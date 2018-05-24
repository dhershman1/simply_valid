(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.simplyValid = factory());
}(this, (function () { 'use strict';

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

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
  var isPhone = function isPhone() {
    var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
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
    if (m.max != null) {
      return !isNaN(val) && Number(val) < m.max;
    }
    return !isNaN(val) && Number(val) < m;
  });
  var isAboveMin = curry(function (m, val) {
    if (m.min != null) {
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
  var meetsCVN = function meetsCVN() {
    var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return val.length === 3 && /[0-9]/.test(val);
  };
  var meetsCVNAmex = function meetsCVNAmex() {
    var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return val.length === 4 && /[0-9]/.test(val);
  };
  var meetsTreadDepth = function meetsTreadDepth(val) {
    return /^(([0-1]?[0-9]|2[0-1])(\.[0-9])?|22)$/i.test(val);
  };
  var meetsPassReq = function meetsPassReq(val) {
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/;
    return passwordRegex.test(val);
  };

  var noSpecials = function noSpecials() {
    var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return val.match(/\W/) === null;
  };
  var noNumbers = function noNumbers() {
    var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return val.match(/[0-9]/) === null;
  };
  var noLetters = function noLetters() {
    var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
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



  var validationMethods = /*#__PURE__*/Object.freeze({
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

  var isObject = function isObject(x) {
    return Object.prototype.toString.call(x) === '[object Object]';
  };
  var ensureArray = function ensureArray(val) {
    if (Array.isArray(val)) {
      return val;
    }
    if (val === void 0) {
      return [];
    }
    return [val];
  };
  var format = function format(res) {
    var results = res.reduce(function (acc, _ref) {
      var isValid = _ref.isValid,
          story = _ref.story;
      if (!isValid) {
        var _acc$story;
        (_acc$story = acc.story).push.apply(_acc$story, _toConsumableArray(story));
      }
      return acc;
    }, {
      isValid: true,
      story: []
    });
    results.isValid = !results.story.length;
    return results;
  };
  var validate = function validate(data, schema, methods) {
    var story = [];
    var schemaArr = ensureArray(schema);
    var dataArr = ensureArray(data);
    dataArr.forEach(function (d) {
      var results = schemaArr.reduce(function (acc, fn) {
        if (!methods[fn](d)) {
          acc.push({
            test: fn,
            value: d
          });
        }
        return acc;
      }, []);
      story.push.apply(story, _toConsumableArray(results));
    });
    return {
      isValid: !story.length,
      story: story
    };
  };
  var validateDataObj = function validateDataObj(data, schema, methods) {
    return Object.keys(data).reduce(function (acc, k) {
      var value = data[k];
      if (isObject(value)) {
        return acc.concat(validateDataObj(value, schema[k], methods));
      }
      return acc.concat([validate(value, schema[k], methods)]);
    }, []);
  };
  var validateSchema = function validateSchema(schema) {
    return Array.isArray(schema) && schema.length || isObject(schema) && Object.keys(schema).length || Boolean(schema.length);
  };
  var setup = function setup(methods, opts) {
    return Object.keys(methods).reduce(function (acc, k) {
      if (typeof methods[k]() === 'function') {
        acc[k] = methods[k](opts);
      } else {
        acc[k] = methods[k];
      }
      return acc;
    }, {});
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
    var opts = Object.keys(options).reduce(function (acc, key) {
      if (acc[key]) {
        acc[key] = options[key];
      }
      return acc;
    }, defaults);
    var fns = setup(validationMethods, opts);
    if (!validateSchema(opts.schema)) {
      throw new Error('The schema is either invalid or one was not provided for validation');
    }
    if (isObject(data)) {
      return format(validateDataObj(data, opts.schema, fns));
    }
    return validate(data, opts.schema, fns);
  });

  return simplyValid;

})));
