function extend() {
	var extended = {};
	var key = '';
	var prop = '';
	var argument = '';

	for (key in arguments) {
		argument = arguments[key];

		for (prop in argument) {
			if (Object.prototype.hasOwnProperty.call(argument, prop)) {
				extended[prop] = argument[prop];
			}
		}
	}

	return extended;
}

/* eslint no-useless-escape: 0 */

module.exports = (val, options) => {
	var defaults = {
		maxLength: 20,
		minLength: 1,
		basePattern: '',
		antiPattern: '',
		vinPattern: /^[a-hj-npr-z0-9]{9}[a-hj-npr-tv-y1-9]{1}[a-hj-npr-z0-9]{7}$/i,
		emailPattern: /^[\w\u00c0-\u017f][\w.-_\u00c0-\u017f]*[\w\u00c0-\u017f]+[@][\w\u00c0-\u017f][\w.-_\u00c0-\u017f]*[\w\u00c0-\u017f]+\.[a-z]{2,4}$/ig,
		toMatch: ''
	};
	var story = [];
	var passing = false;
	// This acts as our fallback global options
	var opts = extend({}, defaults, options);

	return {
		// Has Tests
		/**
		 * Validates that a value does exists
		 * @return {object} returns itself to continue the chain
		 */
		hasValue: function hasValue() {
			if (val && val.length > 0) {
				passing = true;
			} else {
				passing = false;
				story.push({
					isValid: false,
					test: 'hasValue'
				});
			}

			return this;
		},

		/**
		 * Validates that a value has numbers
		 * @return {object} returns itself to continue the chain
		 */
		hasNumbers: function hasNumbers() {
			if (val.search(/\d/) !== -1) {
				passing = true;
			} else {
				passing = false;
				story.push({
					isValid: false,
					test: 'hasNumbers'
				});
			}

			return this;
		},

		/**
		 * Validates that a value has has letters
		 * @return {object} returns itself to continue the chain
		 */
		hasLetters: function hasLetters() {
			if (val.search(/[A-Z]\d?/i) !== -1) {
				passing = true;
			} else {
				passing = false;
				story.push({
					isValid: false,
					test: 'hasLetters'
				});
			}

			return this;
		},

		/**
		 * Validates that a value has the custom regex pattern
		 * @return {object} returns itself to continue the chain
		 */
		hasCustom: function hasCustom() {
			if (val.search(opts.basePattern) !== -1) {
				passing = true;
			} else {
				passing = false;
				story.push({
					isValid: false,
					test: 'hasCustom',
					customRegex: opts.basePattern
				});
			}

			return this;
		},

		/**
		 * Validates that a value had numbers or special characters
		 * @return {object} returns itself to continue the chain
		 */
		hasNumbersOrSpecials: function hasNumbersOrSpecials() {
			if (val.search(/\d/) !== -1 || val.search(/\W/) !== -1) {
				passing = true;
			} else {
				passing = false;
				story.push({
					isValid: false,
					test: 'hasNumbersOrSpecials'
				});
			}

			return this;
		},

		/**
		 * Validates that a value had special characters
		 * @return {object} returns itself to continue the chain
		 */
		hasSpecialCharacters: function hasSpecialCharacters() {
			if (val.search(/\W/) !== -1) {
				passing = true;
			} else {
				passing = false;
				story.push({
					isValid: false,
					test: 'hasSpecialCharacters'
				});
			}

			return this;
		},

		/**
		 * Validates that a value has upper and lower case varters
		 * @return {object} returns itself to continue the chain
		 */
		hasUpperAndLowerCase: function hasUpperAndLowerCase() {
			if (val.search(/[A-Z]/) !== -1 && val.search(/[a-z]/) !== -1) {
				passing = true;
			} else {
				passing = false;
				story.push({
					isValid: false,
					test: 'hasUpperAndLowerCase'
				});
			}

			return this;
		},

		// Match Tests
		/**
		 * Validates that a value matches the given option
		 * @return {object} returns itself to continue the chain
		 */
		matchesGiven: function matchesGiven() {
			if (val === opts.toMatch) {
				passing = true;
			} else {
				passing = false;
				story.push({
					isValid: false,
					test: 'matchesGiven'
				});
			}

			return this;
		},

		/**
		 * Validates that a value matches the desired pattern
		 * @return {object} returns itself to continue the chain
		 */
		matchesPattern: function matchesPattern() {
			if (opts.basePattern.test(val)) {
				passing = true;
			} else {
				passing = false;
				story.push({
					isValid: false,
					test: 'matchesPattern'
				});
			}

			return this;
		},

		/**
		 * Validates that a value does not match the anti pattern
		 * @return {object} returns itself to continue the chain
		 */
		doesNotMatch: function doesNotMatch() {
			if (!opts.antiPattern.test(val)) {
				passing = true;
			} else {
				passing = false;
				story.push({
					isValid: false,
					test: 'doesNotMatch'
				});
			}

			return this;
		},

		// Is Tests
		/**
		 * Validates that a value is indeed a date
		 * @return {object} returns itself to continue the chain
		 */
		isDate: function isDate() {
			var reg = /^((1[0-2])|(0?[1-9]))[-/.]?((0?[1-9])|([1-2][0-9])|(3[0-1]))[-/.]?(([1-2]{1}[0-9]{3})|([0-9]{2}))$/m;

			if (reg.test(val)) {
				passing = true;
			} else {
				passing = false;
				story.push({
					isValid: false,
					test: 'isDate'
				});
			}

			return this;
		},

		isDateShort: function isDateShort() {
			var reg = /^((1[0-2])|(0?[1-9]))[-/.]?((0?[1-9])|([1-2][0-9])|(3[0-1]))[-/.]?$/m;

			if (reg.test(val)) {
				passing = true;
			} else {
				passing = false;
				story.push({
					isValid: false,
					test: 'isDate'
				});
			}

			return this;
		},

		/**
		 * Validates that a value is a proper date
		 * @return {object} returns itself to continue the chain
		 */
		isDateProper: function isDateProper() {
			var reg = /^(([1-2]{1}[0-9]{3})|([0-9]{2}))[-/.]?((1[0-2])|(0?[1-9]))[-/.]?((0?[1-9])|([1-2][0-9])|(3[0-1]))$/m;

			if (reg.test(val)) {
				passing = true;
			} else {
				passing = false;
				story.push({
					isValid: false,
					test: 'isDateProper'
				});
			}

			return this;
		},

		/**
		 * Validates that a value is in email format
		 * @return {object} returns itself to continue the chain
		 */
		isEmail: function isEmail() {
			if (opts.emailPattern.test(val)) {
				passing = true;
			} else {
				passing = false;
				story.push({
					isValid: false,
					test: 'isEmail'
				});
			}

			return this;
		},

		/**
		* Verfies if the string is a number
		* @return {object} returns itself to continue the chain
		*/
		isNumber: function isNumber() {
			if (!isNaN(val)) {
				passing = true;
			} else {
				passing = false;
				story.push({
					isValid: false,
					test: 'isNumber'
				});
			}

			return this;
		},

		/**
		 * Validates that a value is a positive number
		 * @return {object} returns itself to continue the chain
		 */
		isPositive: function isPositive() {
			if (Number(val) > -1) {
				passing = true;
			} else {
				passing = false;
				story.push({
					isValid: false,
					test: 'isPositive'
				});
			}

			return this;
		},

		/**
		 * Validates that a value is a negative number
		 * @return {object} returns itself to continue the chain
		 */
		isNegative: function isNegative() {
			if (Number(val) < 0) {
				passing = true;
			} else {
				passing = false;
				story.push({
					isValid: false,
					test: 'isNegative'
				});
			}

			return this;
		},

		/**
		 * Validates that a value is in VIN format
		 * @return {object} returns itself to continue the chain
		 */
		isVin: function isVin() {
			if (opts.vinPattern.test(val)) {
				passing = true;
			} else {
				passing = false;
				story.push({
					isValid: false,
					test: 'isVin'
				});
			}

			return this;
		},

		/**
		 * Validates that a value meets a zip code format
		 * @return {object} returns itself to continue the chain
		 */
		isZip: function isZip() {
			if ((/^\d{5}(-\d{4})?$/).test(val)) {
				passing = true;
			} else {
				passing = false;
				story.push({
					isValid: false,
					test: 'isZip'
				});
			}

			return this;
		},

		/**
		 * Validates that a value meets a Canada postal code format
		 * @return {object} returns itself to continue the chain
		 */
		isCAPostalCode: function isCAPostalCode() {
			if ((/^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1} *\d{1}[A-Z]{1}\d{1}$/i).test(val)) {
				passing = true;
			} else {
				passing = false;
				story.push({
					isValid: false,
					test: 'isPostalCode'
				});
			}

			return this;
		},

		/**
		 * Validates that a value is a proper phone format
		 * @return {object} returns itself to continue the chain
		 */
		isPhone: function isPhone() {
			if ((/^[0-9]{10}$/g).test(val.replace(/\W/g, ''))) {
				passing = true;
			} else {
				passing = false;
				story.push({
					isValid: false,
					test: 'isPhone'
				});
			}

			return this;
		},

		/**
		 * Validates that a value is a proper license plate format
		 * @return {object} returns itself to continue the chain
		 */
		isLicensePlate: function isLicensePlate() {
			if ((/^([A-Z]|[0-9]){1,3}(\s|-|•)?([A-Z]|[0-9]){3,5}$/ig).test(val)) {
				passing = true;
			} else {
				passing = false;
				story.push({
					isValid: false,
					test: 'isLicensePlate'
				});
			}

			return this;
		},

		/**
		 * Validates that a value is in a visa card format
		 * @return {object} returns itself to continue the chain
		 */
		isVisaCard: function isVisaCard() {
			if ((/^4[0-9]{15}$/).test(val)) {
				passing = true;
			} else {
				passing = false;
				story.push({
					isValid: false,
					test: 'isVisaCard'
				});
			}

			return this;
		},

		/**
		 * Validates that a value is in a master card format
		 * @return {object} returns itself to continue the chain
		 */
		isMasterCard: function isMasterCard() {
			if ((/^5[1-5][0-9]{14}$/).test(val)) {
				passing = true;
			} else {
				passing = false;
				story.push({
					isValid: false,
					test: 'isMasterCard'
				});
			}

			return this;
		},

		/**
		 * Validates that a value is in a american express format
		 * @return {object} returns itself to continue the chain
		 */
		isAmericanExpressCard: function isAmericanExpressCard() {
			if ((/^3(4|7)[0-9]{13}$/).test(val)) {
				passing = true;
			} else {
				passing = false;
				story.push({
					isValid: false,
					test: 'isMasterCard'
				});
			}

			return this;
		},

		// Meets Tests
		/**
		* Verfies if the string meets the desired length
		* @return {object} returns itself to continue the chain
		*/
		meetsLength: function meetsLength() {

			if (val.length >= opts.minLength && val.length <= opts.maxLength) {
				passing = true;
			} else {
				passing = false;
				story.push({
					isValid: false,
					test: 'meetsLength'
				});
			}

			return this;
		},

		/**
		 * Validates that a value meets a 2 digit or 4 digit format
		 * @return {object} returns itself to continue the chain
		 */
		meetsYearStandard: function meetsYearStandard() {
			if ((/(^[0-9]{2}$)|(^[1-2]{1}[0-9]{3}$)/).test(val)) {
				passing = true;
			} else {
				passing = false;
				story.push({
					isValid: false,
					test: 'meetsYearStandard'
				});
			}

			return this;
		},

		/**
		 * Validates that a value meets a proper cvn format
		 * @return {object} returns itself to continue the chain
		 */
		meetsCVN: function meetsCVN() {
			if (val.length === 3 && (/[0-9]/).test(val)) {
				passing = true;
			} else {
				passing = false;
				story.push({
					isValid: false,
					test: 'meetsCVN'
				});
			}

			return this;
		},

		/**
		 * Validates that a value meets a proper cvn amex format
		 * @return {object} returns itself to continue the chain
		 */
		meetsCVNAmex: function meetsCVNAmex() {
			if (val.length === 4 && (/[0-9]/).test(val)) {
				passing = true;
			} else {
				passing = false;
				story.push({
					isValid: false,
					test: 'meetsCVNAmex'
				});
			}

			return this;
		},

		/**
		 * Validates that a value meets a tread depth format
		 * @return {object} returns itself to continue the chain
		 */
		meetsTreadDepth: function meetsTreadDepth() {
			if ((/^(([0-1]?[0-9]|2[0-1])(\.[0-9])?|22)$/i).test(val)) {
				passing = true;
			} else {
				passing = false;
				story.push({
					isValid: false,
					test: 'meetsTreadDepth'
				});
			}

			return this;
		},

		// No Tests
		/**
		* Verfies if the string holds any special characters
		* @return {Boolean} returns itself to continue the chain
		*/
		noSpecials: function noSpecials() {
			if (!(/\W/).test(val)) {
				passing = true;
			} else {
				passing = false;
				story.push({
					isValid: false,
					test: 'noSpecials'
				});
			}

			return this;
		},

		/**
		 * Validates that a value contains no numbers
		 * @return {object} returns itself to continue the chain
		 */
		noNumbers: function noNumbers() {
			if (!(/[0-9]/ig).test(val)) {
				passing = true;
			} else {
				passing = false;
				story.push({
					isValid: false,
					test: 'noNumbers'
				});
			}

			return this;
		},

		/**
		 * Signifies the end of the function chain
		 * @return {object} returns a passing property or a failing property with an array of failures
		 */
		finish: function finish() {
			var response = {
				isValid: (passing && story.length === 0)
			};

			if (!response.isValid) {
				response.story = story;
			}

			return response;
		}
	};
};
