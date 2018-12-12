(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('kyanite')) :
  typeof define === 'function' && define.amd ? define(['exports', 'kyanite'], factory) :
  (factory((global.simplyValid = {}),global.kyanite));
}(this, (function (exports,kyanite) { 'use strict';

  var hasValue = function hasValue(val) {
    return kyanite.either(kyanite.eq(0), Boolean, val);
  };
  var hasNumbers = function hasNumbers(val) {
    return kyanite.test(/[0-9]/, val);
  };
  var hasLetters = function hasLetters(val) {
    return kyanite.test(/[A-Z]/i, val);
  };
  var hasSpecialCharacters = function hasSpecialCharacters(val) {
    return kyanite.test(/\W/, val);
  };
  var hasNumbersOrSpecials = function hasNumbersOrSpecials(val) {
    return kyanite.either(hasNumbers, hasSpecialCharacters, val);
  };
  var hasUpperAndLowerCase = function hasUpperAndLowerCase(val) {
    return kyanite.both(kyanite.test(/[A-Z]/), kyanite.test(/[a-z]/), val);
  };

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

  var isDate = function isDate(val) {
    return kyanite.test(/^((1[0-2])|(0?[1-9]))[-/.]?((0?[1-9])|([1-2][0-9])|(3[0-1]))[-/.]?(([1-2]{1}[0-9]{3})|([0-9]{2}))$/m, val);
  };
  var isDateShort = function isDateShort(val) {
    return kyanite.test(/^((1[0-2])|(0?[1-9]))[-/.]?((0?[1-9])|([1-2][0-9])|(3[0-1]))[-/.]?$/m, val);
  };
  var isDateProper = function isDateProper(val) {
    return kyanite.test(/^(([1-2]{1}[0-9]{3})|([0-9]{2}))[-/.]?((1[0-2])|(0?[1-9]))[-/.]?((0?[1-9])|([1-2][0-9])|(3[0-1]))$/m, val);
  };
  var isEmail = function isEmail(val) {
    return kyanite.test(/^[\w\u00c0-\u017f][\w.-_\u00c0-\u017f]*[\w\u00c0-\u017f]+[@][\w\u00c0-\u017f][\w.-_\u00c0-\u017f]*[\w\u00c0-\u017f]+\.[a-z]{2,4}$/i, val);
  };
  var isNumber = function isNumber(val) {
    return !isNaN(val);
  };
  var isPositive = function isPositive(val) {
    return !isNaN(val) && val >= 0;
  };
  var isNegative = function isNegative(val) {
    return !isNaN(val) && val < 0;
  };
  var isVin = function isVin(val) {
    return kyanite.test(/^[a-hj-npr-z0-9]{9}[a-hj-npr-tv-y1-9]{1}[a-hj-npr-z0-9]{7}$/i, val);
  };
  var isZip = function isZip(val) {
    return kyanite.test(/^\d{5}(-\d{4})?$/, val);
  };
  var isCAPostalCode = function isCAPostalCode(val) {
    return kyanite.test(/^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1} *\d{1}[A-Z]{1}\d{1}$/i, val);
  };
  var isPhone = function isPhone() {
    var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return kyanite.test(/^[0-9]{10}$/, val.replace(/\W/g, ''));
  };
  var isLicensePlate = function isLicensePlate(val) {
    return kyanite.test(/^([A-Z]|[0-9]){1,3}(\s|-|•)?([A-Z]|[0-9]){3,5}$/i, val);
  };
  var isBelowMax = function isBelowMax() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    var max = args[0],
        val = args[1];
    if (args.length === 1) {
      return function _isBelowMax(_c) {
        return isBelowMax(max, _c);
      };
    }
    return !isNaN(val) && val < max;
  };
  var isAboveMin = function isAboveMin() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    var min = args[0],
        val = args[1];
    if (args.length === 1) {
      return function _isAboveMin(_c) {
        return isAboveMin(min, _c);
      };
    }
    return !isNaN(val) && val > min;
  };
  var isBetween = function isBetween(arr, val) {
    var _arr = _slicedToArray(arr, 2),
        min = _arr[0],
        max = _arr[1];
    if (!val) {
      return function _isBetween(_c) {
        return isBetween([min, max], _c);
      };
    }
    return !isNaN(val) && kyanite.between(min, max, val);
  };

  var meetsYearStandard = function meetsYearStandard(val) {
    return kyanite.test(/(^[0-9]{2}$)|(^[1-2]{1}[0-9]{3}$)/, val);
  };
  var meetsTreadDepth = function meetsTreadDepth(val) {
    return kyanite.test(/^(([0-1]?[0-9]|2[0-1])(\.[0-9])?|22)$/i, val);
  };
  var meetsPassReq = function meetsPassReq(val) {
    return kyanite.test(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/, val);
  };

  var noSpecials = function noSpecials(val) {
    return kyanite.compose(kyanite.isNil, kyanite.match(/\W/), val);
  };
  var noNumbers = function noNumbers(val) {
    return kyanite.compose(kyanite.isNil, kyanite.match(/[0-9]/), val);
  };
  var noLetters = function noLetters() {
    var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return kyanite.compose(kyanite.isNil, kyanite.match(/[A-Z]/), val);
  };

  var runner = function runner(methods, val) {
    return methods.some(function (fn) {
      return fn(val);
    });
  };
  var date = function date(val) {
    return runner([isDate, isDateShort, isDateProper], val);
  };
  var zipOrPostal = function zipOrPostal(val) {
    return runner([isZip, isCAPostalCode], val);
  };

  var arrValidate = kyanite.curry(function (methods, data) {
    if (!Array.isArray(methods)) {
      return data.every(methods);
    }
    for (var i = 0, len = methods.length; i < len; i++) {
      var fn = methods[i];
      if (!kyanite.ensureArray(data).every(fn)) {
        return {
          isValid: false,
          rule: fn.name.replace('_', ''),
          data: data
        };
      }
    }
    return {
      isValid: true
    };
  });
  var objValidate = function objValidate(schema, data) {
    if (kyanite.type(data) !== 'Object') {
      throw new TypeError('Data must be an object if the provided schema is an object');
    }
    var keys = Object.keys(schema);
    for (var i = 0, len = keys.length; i < len; i++) {
      var k = keys[i];
      var fn = schema[k];
      var value = data[k];
      var valid = kyanite.branch(kyanite.always(Array.isArray(fn)), arrValidate(fn), fn, value);
      if (kyanite.eq(valid.isValid, false)) {
        return valid;
      }
      if (!valid) {
        return {
          isValid: false,
          prop: k,
          rule: fn.name.replace('_', ''),
          data: value
        };
      }
    }
    return {
      isValid: true
    };
  };
  var validate = function validate(schema, data) {
    if (!Array.isArray(schema) && kyanite.type(schema) !== 'Object') {
      throw new TypeError('The Schema should either be an Array or Object');
    }
    if (Array.isArray(schema)) {
      return arrValidate(schema, data);
    }
    return objValidate(schema, data);
  };
  var main = kyanite.curry(validate);

  exports.validate = main;
  exports.hasValue = hasValue;
  exports.hasNumbers = hasNumbers;
  exports.hasLetters = hasLetters;
  exports.hasSpecialCharacters = hasSpecialCharacters;
  exports.hasNumbersOrSpecials = hasNumbersOrSpecials;
  exports.hasUpperAndLowerCase = hasUpperAndLowerCase;
  exports.isDate = isDate;
  exports.isDateShort = isDateShort;
  exports.isDateProper = isDateProper;
  exports.isEmail = isEmail;
  exports.isNumber = isNumber;
  exports.isPositive = isPositive;
  exports.isNegative = isNegative;
  exports.isVin = isVin;
  exports.isZip = isZip;
  exports.isCAPostalCode = isCAPostalCode;
  exports.isPhone = isPhone;
  exports.isLicensePlate = isLicensePlate;
  exports.isBelowMax = isBelowMax;
  exports.isAboveMin = isAboveMin;
  exports.isBetween = isBetween;
  exports.meetsYearStandard = meetsYearStandard;
  exports.meetsTreadDepth = meetsTreadDepth;
  exports.meetsPassReq = meetsPassReq;
  exports.noSpecials = noSpecials;
  exports.noNumbers = noNumbers;
  exports.noLetters = noLetters;
  exports.date = date;
  exports.zipOrPostal = zipOrPostal;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
