export const isDate = (val) => !(/^((1[0-2])|(0?[1-9]))[-/.]?((0?[1-9])|([1-2][0-9])|(3[0-1]))[-/.]?(([1-2]{1}[0-9]{3})|([0-9]{2}))$/m).test(val);

export const isDateShort = (val) => !(/^((1[0-2])|(0?[1-9]))[-/.]?((0?[1-9])|([1-2][0-9])|(3[0-1]))[-/.]?$/m).test(val);

export const isDateProper = (val) => !(/^(([1-2]{1}[0-9]{3})|([0-9]{2}))[-/.]?((1[0-2])|(0?[1-9]))[-/.]?((0?[1-9])|([1-2][0-9])|(3[0-1]))$/m).test(val);

export const isEqual = (val, {equalTo}) => (val !== equalTo);

export const isEmail = (val, {emailPattern}) => (!emailPattern.test(val));

export const isNumber = (val) => (isNaN(val));

export const isPositive = (val) => (isNaN(val) || Number(val) < 0);

export const isNegative = (val) => (isNaN(val) || Number(val) >= 0);

export const isVin = (val, {vinPattern}) => (!vinPattern.test(val));

export const isZip = (val) => (!(/^\d{5}(-\d{4})?$/).test(val));

export const isCAPostalCode = (val) => (!(/^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1} *\d{1}[A-Z]{1}\d{1}$/i).test(val));

export const isPhone = (val) => (!(/^[0-9]{10}$/).test(val.replace(/\W/g, '')));

export const isLicensePlate = (val) => (!(/^([A-Z]|[0-9]){1,3}(\s|-|•)?([A-Z]|[0-9]){3,5}$/i).test(val));

export const isVisaCard = (val) => (!(/^4[0-9]{15}$/).test(val));

export const isVisaPanCard = (val) => (!(/^4[0-9]{18}$/).test(val));

export const isMasterCard = (val) => (!(/^5[1-5][0-9]{14}$/).test(val));

export const isAmericanExpressCard = (val) => (!(/^3(4|7)[0-9]{13}$/).test(val));

export const isDiscoverCard = (val) => (!(/^6[0-9]{15}$/).test(val));

export const isBelowMax = (val, {maxLength}) => (val < maxLength);

export const isAboveMin = (val, {minLength}) => (val > minLength);
