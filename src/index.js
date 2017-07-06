import * as hasMethods from './has/index';
import * as isMethods from './is/index';
import * as matchMethods from './match/index';
import * as meetsMethods from './meets/index';
import * as noMethods from './no/index';

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

const methods = extend({}, hasMethods, isMethods, matchMethods, meetsMethods, noMethods);

export default (methodArr, options) => {
	const defaults = {
		maxLength: 20,
		minLength: 1,
		basePattern: '',
		antiPattern: '',
		vinPattern: /^[a-hj-npr-z0-9]{9}[a-hj-npr-tv-y1-9]{1}[a-hj-npr-z0-9]{7}$/i,
		emailPattern: /^[\w\u00c0-\u017f][\w.-_\u00c0-\u017f]*[\w\u00c0-\u017f]+[@][\w\u00c0-\u017f][\w.-_\u00c0-\u017f]*[\w\u00c0-\u017f]+\.[a-z]{2,4}$/i,
		equalTo: ''
	};

	// This acts as our fallback global options
	const opts = extend({}, defaults, options);


	return (val, calledOpts = {}) => {
		let story = [];
		const customOpts = extend({}, opts, calledOpts);

		methodArr.forEach(currMethod => {
			if (methods[currMethod](val, customOpts)) {
				story.push({
					test: currMethod,
					value: val
				});
			}
		});

		if (story.length) {
			return {
				isValid: false,
				story
			};
		}

		return {isValid: true};
	};
};
