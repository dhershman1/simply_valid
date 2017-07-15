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

export default (val, type) => {
	const validate = validationTypes[type];

	for (let i = 0; i < validate.length; i++) {
		if (validate[i](val)) {
			return true;
		}
	}

	return false;
};
