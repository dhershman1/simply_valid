import * as hasMethods from './has/index';
import * as isMethods from './is/index';
import * as matchMethods from './match/index';
import * as meetsMethods from './meets/index';
import * as noMethods from './no/index';
import * as multi from './multi/index';

const extend = (...args) => {

	return args.reduce((acc, x) => {
		let key = '';

		for (key in x) {
			acc[key] = x[key];
		}

		return acc;
	}, {});
};

// Our collection of validation methods extend them so we get their methods and thats it
const methods = extend(hasMethods, isMethods, matchMethods, meetsMethods, noMethods, multi);

export default (methodArr, options) => {
	// Set our default options that can be overwritten if needed.
	const defaults = {
		maxLength: 20,
		minLength: 1,
		basePattern: '',
		antiPattern: '',
		vinPattern: /^[a-hj-npr-z0-9]{9}[a-hj-npr-tv-y1-9]{1}[a-hj-npr-z0-9]{7}$/i,
		emailPattern: /^[\w\u00c0-\u017f][\w.-_\u00c0-\u017f]*[\w\u00c0-\u017f]+[@][\w\u00c0-\u017f][\w.-_\u00c0-\u017f]*[\w\u00c0-\u017f]+\.[a-z]{2,4}$/i,
		equalTo: ''
	};

	// Collect and set a good portion of options to keep a global set
	const opts = extend(defaults, options);

	return (val, calledOpts = {}) => {
		// Initialize an empty story on call
		let story = [];
		// Create a custom options object in case options are being changed per call
		const customOpts = extend(opts, calledOpts);

		methodArr.forEach(currMethod => {
			customOpts.type = currMethod;
			if (methods[currMethod](val, customOpts)) {
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
				story
			};
		}

		return {isValid: true};
	};
};
