import {
	isAmericanExpressCard,
	isCAPostalCode,
	isDate,
	isDateProper,
	isDateShort,
	isDiscoverCard,
	isMasterCard,
	isVisaCard,
	isVisaPanCard,
	isZip
} from '../is/index';
import {
	meetsCVN,
	meetsCVNAmex
} from '../meets/index';

const validationTypes = {
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

const executeValidation = (val, type) => {
	const validationList = validationTypes[type];

	for (let i = 0; i < validationList.length; i++) {
		if (validationList[i](val).isValid) {
			return true;
		}
	}

	return false;
};

export const creditCard = val => executeValidation(val, 'creditCard');

export const date = val => executeValidation(val, 'date');

export const cvn = val => executeValidation(val, 'cvn');

export const zipPost = val => executeValidation(val, 'zipPost');
