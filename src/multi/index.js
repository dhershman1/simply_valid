import {
	isVisaCard,
	isVisaPanCard,
	isDiscoverCard,
	isAmericanExpressCard,
	isMasterCard,
	isDate,
	isDateShort,
	isDateProper
} from '../is/index';

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
	]
};

const find = (val, type) => {
	const validate = validationTypes[type];

	for (let i = 0; i < validate.length; i++) {
		if (validate[i](val).isValid) {
			return true;
		}
	}

	return false;
};

export const creditCard = (val) => {
	return find(val, 'creditCard');
};

export const date = (val) => {
	return find(val, 'date');

};
