function extend(...objs) {
	let extended = {};

	for (let key in objs) {
		let arg = objs[key];

		for (let prop in arg) {
			if (Object.prototype.hasOwnProperty.call(arg, prop)) {
				extended[prop] = arg[prop];
			}
		}
	}

	return extended;
}

const getMethods = (val, opts) => {
	let story = [];

	return {
		// Has Tests
		/**
		 * Validates that a value does exists
		 * @return {object} returns itself to continue the chain
		 */
		hasValue: function hasValue() {
			if (!val && val.length === 0) {
				story.push({
					test: 'hasValue',
					value: val
				});
			}

			return this;
		},

		/**
		 * Validates that a value has numbers
		 * @return {object} returns itself to continue the chain
		 */
		hasNumbers: function hasNumbers() {
			if (val.search(/\d/) === -1) {
				story.push({
					test: 'hasNumbers',
					value: val
				});
			}

			return this;
		},

		/**
		 * Validates that a value has has letters
		 * @return {object} returns itself to continue the chain
		 */
		hasLetters: function hasLetters() {
			if (val.search(/[A-Z]\d?/i) === -1) {
				story.push({
					test: 'hasLetters',
					value: val
				});
			}

			return this;
		},

		/**
		 * Validates that a value has the custom regex pattern
		 * @return {object} returns itself to continue the chain
		 */
		hasCustom: function hasCustom() {
			if (val.search(opts.basePattern) === -1) {
				story.push({
					test: 'hasCustom',
					customRegex: opts.basePattern,
					value: val
				});
			}

			return this;
		},

		/**
		 * Validates that a value had numbers or special characters
		 * @return {object} returns itself to continue the chain
		 */
		hasNumbersOrSpecials: function hasNumbersOrSpecials() {
			if (val.search(/\d/) === -1 && val.search(/\W/) === -1) {
				story.push({
					test: 'hasNumbersOrSpecials',
					value: val
				});
			}

			return this;
		},

		/**
		 * Validates that a value had special characters
		 * @return {object} returns itself to continue the chain
		 */
		hasSpecialCharacters: function hasSpecialCharacters() {
			if (val.search(/\W/) === -1) {
				story.push({
					test: 'hasSpecialCharacters',
					value: val
				});
			}

			return this;
		},

		/**
		 * Validates that a value has upper and lower case varters
		 * @return {object} returns itself to continue the chain
		 */
		hasUpperAndLowerCase: function hasUpperAndLowerCase() {
			if (val.search(/[A-Z]/) === -1 || val.search(/[a-z]/) === -1) {
				story.push({
					test: 'hasUpperAndLowerCase',
					value: val
				});
			}

			return this;
		},

		// Match Tests

		/**
		 * Matches against a custom pattern
		 * @method matchesCustom
		 * @param  {String}      pattern This should be a REGEX string
		 * @return {Object}              returns itself to continue the chain
		 */
		matchesCustom: function matchesCustom(pattern) {
			if (!pattern.test(val)) {
				story.push({
					test: 'matchesCustom',
					customPattern: pattern,
					value: val
				});
			}

			return this;
		},

		/**
		 * Validates that a value matches the given option
		 * @return {object} returns itself to continue the chain
		 */
		matchesGiven: function matchesGiven() {
			if (val !== opts.toMatch) {
				story.push({
					test: 'matchesGiven',
					value: val
				});
			}

			return this;
		},

		/**
		 * Validates that a value matches the desired pattern
		 * @return {object} returns itself to continue the chain
		 */
		matchesPattern: function matchesPattern() {
			if (!opts.basePattern.test(val)) {
				story.push({
					test: 'matchesPattern',
					value: val
				});
			}

			return this;
		},

		/**
		 * Validates that a value does not match the anti pattern
		 * @return {object} returns itself to continue the chain
		 */
		doesNotMatch: function doesNotMatch() {
			if (opts.antiPattern.test(val)) {
				story.push({
					test: 'doesNotMatch',
					value: val
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
			const reg = /^((1[0-2])|(0?[1-9]))[-/.]?((0?[1-9])|([1-2][0-9])|(3[0-1]))[-/.]?(([1-2]{1}[0-9]{3})|([0-9]{2}))$/m;

			if (!reg.test(val)) {
				story.push({
					test: 'isDate',
					value: val
				});
			}

			return this;
		},

		isDateShort: function isDateShort() {
			const reg = /^((1[0-2])|(0?[1-9]))[-/.]?((0?[1-9])|([1-2][0-9])|(3[0-1]))[-/.]?$/m;

			if (!reg.test(val)) {
				story.push({
					test: 'isDateShort',
					value: val
				});
			}

			return this;
		},

		/**
		 * Validates that a value is a proper date
		 * @return {object} returns itself to continue the chain
		 */
		isDateProper: function isDateProper() {
			const reg = /^(([1-2]{1}[0-9]{3})|([0-9]{2}))[-/.]?((1[0-2])|(0?[1-9]))[-/.]?((0?[1-9])|([1-2][0-9])|(3[0-1]))$/m;

			if (!reg.test(val)) {
				story.push({
					test: 'isDateProper',
					value: val
				});
			}

			return this;
		},

		/**
		 * Validates that a value is in email format
		 * @return {object} returns itself to continue the chain
		 */
		isEmail: function isEmail() {
			if (!opts.emailPattern.test(val)) {
				story.push({
					test: 'isEmail',
					value: val
				});
			}

			return this;
		},

		/**
		* Verfies if the string is a number
		* @return {object} returns itself to continue the chain
		*/
		isNumber: function isNumber() {
			if (isNaN(val)) {
				story.push({
					test: 'isNumber',
					value: val
				});
			}

			return this;
		},

		/**
		 * Validates that a value is a positive number
		 * @return {object} returns itself to continue the chain
		 */
		isPositive: function isPositive() {
			if (isNaN(val) || Number(val) < 0) {
				story.push({
					test: 'isPositive',
					value: val
				});
			}

			return this;
		},

		/**
		 * Validates that a value is a negative number
		 * @return {object} returns itself to continue the chain
		 */
		isNegative: function isNegative() {
			if (isNaN(val) || Number(val) >= 0) {
				story.push({
					test: 'isNegative',
					value: val
				});
			}

			return this;
		},

		/**
		 * Validates that a value is in VIN format
		 * @return {object} returns itself to continue the chain
		 */
		isVin: function isVin() {
			if (!opts.vinPattern.test(val)) {
				story.push({
					test: 'isVin',
					value: val
				});
			}

			return this;
		},

		/**
		 * Validates that a value meets a zip code format
		 * @return {object} returns itself to continue the chain
		 */
		isZip: function isZip() {
			if (!(/^\d{5}(-\d{4})?$/).test(val)) {
				story.push({
					test: 'isZip',
					value: val
				});
			}

			return this;
		},

		/**
		 * Validates that a value meets a Canada postal code format
		 * @return {object} returns itself to continue the chain
		 */
		isCAPostalCode: function isCAPostalCode() {
			if (!(/^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1} *\d{1}[A-Z]{1}\d{1}$/i).test(val)) {
				story.push({
					test: 'isCAPostalCode',
					value: val
				});
			}

			return this;
		},

		/**
		 * Validates that a value is a proper phone format
		 * @return {object} returns itself to continue the chain
		 */
		isPhone: function isPhone() {
			if (!(/^[0-9]{10}$/).test(val.replace(/\W/g, ''))) {
				story.push({
					test: 'isPhone',
					value: val
				});
			}

			return this;
		},

		/**
		 * Validates that a value is a proper license plate format
		 * @return {object} returns itself to continue the chain
		 */
		isLicensePlate: function isLicensePlate() {
			if (!(/^([A-Z]|[0-9]){1,3}(\s|-|•)?([A-Z]|[0-9]){3,5}$/i).test(val)) {
				story.push({
					test: 'isLicensePlate',
					value: val
				});
			}

			return this;
		},

		/**
		 * Validates that a value is in a visa card format
		 * @return {object} returns itself to continue the chain
		 */
		isVisaCard: function isVisaCard() {
			if (!(/^4[0-9]{15}$/).test(val)) {
				story.push({
					test: 'isVisaCard',
					value: val
				});
			}

			return this;
		},

		/**
		 * Validates that a value is in a master card format
		 * @return {object} returns itself to continue the chain
		 */
		isMasterCard: function isMasterCard() {
			if (!(/^5[1-5][0-9]{14}$/).test(val)) {
				story.push({
					test: 'isMasterCard',
					value: val
				});
			}

			return this;
		},

		/**
		 * Validates that a value is in a american express format
		 * @return {object} returns itself to continue the chain
		 */
		isAmericanExpressCard: function isAmericanExpressCard() {
			if (!(/^3(4|7)[0-9]{13}$/).test(val)) {
				story.push({
					test: 'isAmericanExpressCard',
					value: val
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
			if (val.length < opts.minLength || val.length > opts.maxLength) {
				story.push({
					test: 'meetsLength',
					value: val
				});
			}

			return this;
		},

		/**
		 * Validates that a value meets a 2 digit or 4 digit format
		 * @return {object} returns itself to continue the chain
		 */
		meetsYearStandard: function meetsYearStandard() {
			if (!(/(^[0-9]{2}$)|(^[1-2]{1}[0-9]{3}$)/).test(val)) {
				story.push({
					test: 'meetsYearStandard',
					value: val
				});
			}

			return this;
		},

		/**
		 * Validates that a value meets a proper cvn format
		 * @return {object} returns itself to continue the chain
		 */
		meetsCVN: function meetsCVN() {
			if (val.length !== 3 || !(/[0-9]/).test(val)) {
				story.push({
					test: 'meetsCVN',
					value: val
				});
			}

			return this;
		},

		/**
		 * Validates that a value meets a proper cvn amex format
		 * @return {object} returns itself to continue the chain
		 */
		meetsCVNAmex: function meetsCVNAmex() {
			if (val.length !== 4 || !(/[0-9]/).test(val)) {
				story.push({
					test: 'meetsCVNAmex',
					value: val
				});
			}

			return this;
		},

		/**
		 * Validates that a value meets a tread depth format
		 * @return {object} returns itself to continue the chain
		 */
		meetsTreadDepth: function meetsTreadDepth() {
			if (!(/^(([0-1]?[0-9]|2[0-1])(\.[0-9])?|22)$/i).test(val)) {
				story.push({
					test: 'meetsTreadDepth',
					value: val
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
			if ((/\W/).test(val)) {
				story.push({
					test: 'noSpecials',
					value: val
				});
			}

			return this;
		},

		/**
		 * Validates that a value contains no numbers
		 * @return {object} returns itself to continue the chain
		 */
		noNumbers: function noNumbers() {
			if ((/[0-9]/).test(val)) {
				story.push({
					test: 'noNumbers',
					value: val
				});
			}

			return this;
		},

		/**
		 * Signifies the end of the function chain
		 * @return {object} returns a passing property or a failing property with an array of failures
		 */
		finish: function finish() {
			let response = {
				isValid: (story.length === 0)
			};

			if (!response.isValid) {
				response.story = story;
			}

			return response;
		}
	};
};

const createMethod = (methodArr, opts) => {
	return (val, options) => {
		const customOpts = extend({}, opts, options);
		const methods = getMethods(val, customOpts);

		methodArr.forEach(currMethod => methods[currMethod]());

		return methods.finish();
	};
};

export default (val, options, useCreate) => {
	let defaults = {
		maxLength: 20,
		minLength: 1,
		basePattern: '',
		antiPattern: '',
		vinPattern: /^[a-hj-npr-z0-9]{9}[a-hj-npr-tv-y1-9]{1}[a-hj-npr-z0-9]{7}$/i,
		emailPattern: /^[\w\u00c0-\u017f][\w.-_\u00c0-\u017f]*[\w\u00c0-\u017f]+[@][\w\u00c0-\u017f][\w.-_\u00c0-\u017f]*[\w\u00c0-\u017f]+\.[a-z]{2,4}$/i,
		toMatch: ''
	};

	// This acts as our fallback global options
	const opts = extend({}, defaults, options);

	if ((typeof options === 'boolean' && options) || useCreate) {
		return createMethod(val, opts);
	}

	return getMethods(val, opts);
};
