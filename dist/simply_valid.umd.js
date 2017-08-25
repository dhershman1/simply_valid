(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.simplyValid = global.simplyValid || {})));
}(this, (function (exports) { 'use strict';

var hasValue = function (val) { return val && val.length !== 0; };

var hasNumbers = function (val) { return val.search(/[0-9]/) !== -1; };

var hasLetters = function (val) { return val.search(/[A-Z]/i) !== -1; };

var hasCustom = function (val, ref) {
	var basePattern = ref.basePattern;

	return val.search(basePattern) !== -1;
};

var hasSpecialCharacters = function (val) { return val.search(/\W/) !== -1; };

var hasNumbersOrSpecials = function (val) { return hasNumbers(val) || hasSpecialCharacters(val); };

var hasUpperAndLowerCase = function (val) { return val.search(/[A-Z]/) !== -1 && val.search(/[a-z]/) !== -1; };


var hasMethods = Object.freeze({
	hasValue: hasValue,
	hasNumbers: hasNumbers,
	hasLetters: hasLetters,
	hasCustom: hasCustom,
	hasSpecialCharacters: hasSpecialCharacters,
	hasNumbersOrSpecials: hasNumbersOrSpecials,
	hasUpperAndLowerCase: hasUpperAndLowerCase
});

/* eslint-disable max-len */
var isDate = function (val) { return (/^((1[0-2])|(0?[1-9]))[-/.]?((0?[1-9])|([1-2][0-9])|(3[0-1]))[-/.]?(([1-2]{1}[0-9]{3})|([0-9]{2}))$/m).test(val); };

var isDateShort = function (val) { return (/^((1[0-2])|(0?[1-9]))[-/.]?((0?[1-9])|([1-2][0-9])|(3[0-1]))[-/.]?$/m).test(val); };

var isDateProper = function (val) { return (/^(([1-2]{1}[0-9]{3})|([0-9]{2}))[-/.]?((1[0-2])|(0?[1-9]))[-/.]?((0?[1-9])|([1-2][0-9])|(3[0-1]))$/m).test(val); };

var isEqual = function (val, ref) {
	var equalTo = ref.equalTo;

	return val === equalTo;
};

var isEmail = function (val, ref) {
	var emailPattern = ref.emailPattern;

	return emailPattern.test(val);
};

var isNumber = function (val) { return !isNaN(val); };

var isPositive = function (val) { return !isNaN(val) && Number(val) >= 0; };

var isNegative = function (val) { return !isNaN(val) && Number(val) < 0; };

var isVin = function (val, ref) {
	var vinPattern = ref.vinPattern;

	return vinPattern.test(val);
};

var isZip = function (val) { return (/^\d{5}(-\d{4})?$/).test(val); };

var isCAPostalCode = function (val) { return (/^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1} *\d{1}[A-Z]{1}\d{1}$/i).test(val); };

var isPhone = function (val) { return (/^[0-9]{10}$/).test(val.replace(/\W/g, '')); };

var isLicensePlate = function (val) { return (/^([A-Z]|[0-9]){1,3}(\s|-|•)?([A-Z]|[0-9]){3,5}$/i).test(val); };

var isVisaCard = function (val) { return (/^4[0-9]{15}$/).test(val); };

var isVisaPanCard = function (val) { return (/^4[0-9]{18}$/).test(val); };

var isMasterCard = function (val) { return (/^5[1-5][0-9]{14}$/).test(val); };

var isAmericanExpressCard = function (val) { return (/^3(4|7)[0-9]{13}$/).test(val); };

var isDiscoverCard = function (val) { return (/^6[0-9]{15}$/).test(val); };

var isBelowMax = function (val, ref) {
	var max = ref.max;

	return !isNaN(val) && Number(val) < max;
};

var isAboveMin = function (val, ref) {
	var min = ref.min;

	return !isNaN(val) && Number(val) > min;
};


var isMethods = Object.freeze({
	isDate: isDate,
	isDateShort: isDateShort,
	isDateProper: isDateProper,
	isEqual: isEqual,
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
	isAboveMin: isAboveMin
});

var matchesPattern = function (val, ref) {
	var basePattern = ref.basePattern;

	return basePattern.test(val);
};

var doesNotMatch = function (val, ref) {
	var antiPattern = ref.antiPattern;

	return !antiPattern.test(val);
};


var matchMethods = Object.freeze({
	matchesPattern: matchesPattern,
	doesNotMatch: doesNotMatch
});

var meetsLength = function (val, ref) {
	var minLength = ref.minLength;
	var maxLength = ref.maxLength;

	return val.length >= minLength && val.length <= maxLength;
};

var meetsMinMax = function (val, ref) {
	var min = ref.min;
	var max = ref.max;

	return !isNaN(val) && (Number(val) >= min && Number(val) <= max);
};

var meetsYearStandard = function (val) { return (/(^[0-9]{2}$)|(^[1-2]{1}[0-9]{3}$)/).test(val); };

var meetsCVN = function (val) { return val.length === 3 && (/[0-9]/).test(val); };

var meetsCVNAmex = function (val) { return val.length === 4 && (/[0-9]/).test(val); };

var meetsTreadDepth = function (val) { return (/^(([0-1]?[0-9]|2[0-1])(\.[0-9])?|22)$/i).test(val); };

var meetsPassReq = function (val, ref) {
	var passwordPattern = ref.passwordPattern;

	return passwordPattern.test(val);
};


var meetsMethods = Object.freeze({
	meetsLength: meetsLength,
	meetsMinMax: meetsMinMax,
	meetsYearStandard: meetsYearStandard,
	meetsCVN: meetsCVN,
	meetsCVNAmex: meetsCVNAmex,
	meetsTreadDepth: meetsTreadDepth,
	meetsPassReq: meetsPassReq
});

var validationTypes = {
	creditCard: [
		isVisaCard,
		isVisaPanCard,
		isDiscoverCard,
		isAmericanExpressCard,
		isMasterCard
	],
	date: [
		isDate,
		isDateShort,
		isDateProper
	],
	cvn: [
		meetsCVN,
		meetsCVNAmex
	],
	zipPost: [
		isZip,
		isCAPostalCode
	]
};

var executeValidation = function (val, type) {
	var validationList = validationTypes[type];

	for (var i = 0; i < validationList.length; i++) {
		if (!validationList[i](val)) {
			return true;
		}

		continue;
	}

	return false;
};

var creditCard = function (val) { return executeValidation(val, 'creditCard'); };

var date = function (val) { return executeValidation(val, 'date'); };

var cvn = function (val) { return executeValidation(val, 'cvn'); };

var zipPost = function (val) { return executeValidation(val, 'zipPost'); };


var multiMethods = Object.freeze({
	creditCard: creditCard,
	date: date,
	cvn: cvn,
	zipPost: zipPost
});

var noSpecials = function (val) { return val.match(/\W/) === null; };

var noNumbers = function (val) { return val.match(/[0-9]/) === null; };

var noLetters = function (val) { return val.match(/[A-Z]/i) === null; };


var noMethods = Object.freeze({
	noSpecials: noSpecials,
	noNumbers: noNumbers,
	noLetters: noLetters
});

/* eslint-disable max-len */
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

// Our collection of validation methods extend them so we get their methods and thats it

var validation = function (methodArr, options) {
	var methods = extend(hasMethods, isMethods, matchMethods, meetsMethods, noMethods, multiMethods);
	// Set our default options that can be overwritten if needed.
	var defaults = {
		max: Infinity,
		min: -Infinity,
		maxLength: 20,
		minLength: 1,
		basePattern: '',
		antiPattern: '',
		vinPattern: /^[a-hj-npr-z0-9]{9}[a-hj-npr-tv-y1-9]{1}[a-hj-npr-z0-9]{7}$/i,
		emailPattern: /^[\w\u00c0-\u017f][\w.-_\u00c0-\u017f]*[\w\u00c0-\u017f]+[@][\w\u00c0-\u017f][\w.-_\u00c0-\u017f]*[\w\u00c0-\u017f]+\.[a-z]{2,4}$/i,
		// Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
		passwordPattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/,
		equalTo: ''
	};

	// Collect and set a good portion of options to keep a global set
	var opts = extend(defaults, options);

	return function (val, calledOpts) {
		if ( calledOpts === void 0 ) calledOpts = {};

		// Initialize an empty story on call
		var story = [];
		// Create a custom options object in case options are being changed per call
		var customOpts = extend(opts, calledOpts);

		methodArr.forEach(function (currMethod) {
			customOpts.type = currMethod;
			if (!methods[currMethod](val, customOpts)) {
				// If something comes back as a failure we need to push it into the story
				story.push({
					// What test did we fail on
					test: currMethod,
					// The value used when the failure happened
					value: val
				});
			}
		});

		// If story has any kind of length, then something failed so send that back
		if (story.length) {
			return {
				isValid: false,
				story: story
			};
		}

		return {isValid: true};
	};
};

exports.validation = validation;
exports.hasValue = hasValue;
exports.hasNumbers = hasNumbers;
exports.hasLetters = hasLetters;
exports.hasCustom = hasCustom;
exports.hasSpecialCharacters = hasSpecialCharacters;
exports.hasNumbersOrSpecials = hasNumbersOrSpecials;
exports.hasUpperAndLowerCase = hasUpperAndLowerCase;
exports.isDate = isDate;
exports.isDateShort = isDateShort;
exports.isDateProper = isDateProper;
exports.isEqual = isEqual;
exports.isEmail = isEmail;
exports.isNumber = isNumber;
exports.isPositive = isPositive;
exports.isNegative = isNegative;
exports.isVin = isVin;
exports.isZip = isZip;
exports.isCAPostalCode = isCAPostalCode;
exports.isPhone = isPhone;
exports.isLicensePlate = isLicensePlate;
exports.isVisaCard = isVisaCard;
exports.isVisaPanCard = isVisaPanCard;
exports.isMasterCard = isMasterCard;
exports.isAmericanExpressCard = isAmericanExpressCard;
exports.isDiscoverCard = isDiscoverCard;
exports.isBelowMax = isBelowMax;
exports.isAboveMin = isAboveMin;
exports.matchesPattern = matchesPattern;
exports.doesNotMatch = doesNotMatch;
exports.meetsLength = meetsLength;
exports.meetsMinMax = meetsMinMax;
exports.meetsYearStandard = meetsYearStandard;
exports.meetsCVN = meetsCVN;
exports.meetsCVNAmex = meetsCVNAmex;
exports.meetsTreadDepth = meetsTreadDepth;
exports.meetsPassReq = meetsPassReq;
exports.creditCard = creditCard;
exports.date = date;
exports.cvn = cvn;
exports.zipPost = zipPost;
exports.noSpecials = noSpecials;
exports.noNumbers = noNumbers;
exports.noLetters = noLetters;

Object.defineProperty(exports, '__esModule', { value: true });

})));
