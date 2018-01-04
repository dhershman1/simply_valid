/* eslint-disable max-len */

import luhn from '../_internals/luhn';

const emailRegex = /^[\w\u00c0-\u017f][\w.-_\u00c0-\u017f]*[\w\u00c0-\u017f]+[@][\w\u00c0-\u017f][\w.-_\u00c0-\u017f]*[\w\u00c0-\u017f]+\.[a-z]{2,4}$/i;
const vinRegex = /^[a-hj-npr-z0-9]{9}[a-hj-npr-tv-y1-9]{1}[a-hj-npr-z0-9]{7}$/i;

export const isDate = val => (/^((1[0-2])|(0?[1-9]))[-/.]?((0?[1-9])|([1-2][0-9])|(3[0-1]))[-/.]?(([1-2]{1}[0-9]{3})|([0-9]{2}))$/m).test(val);

export const isDateShort = val => (/^((1[0-2])|(0?[1-9]))[-/.]?((0?[1-9])|([1-2][0-9])|(3[0-1]))[-/.]?$/m).test(val);

export const isDateProper = val => (/^(([1-2]{1}[0-9]{3})|([0-9]{2}))[-/.]?((1[0-2])|(0?[1-9]))[-/.]?((0?[1-9])|([1-2][0-9])|(3[0-1]))$/m).test(val);

export const isEmail = (email = emailRegex) => val => {
  if (email.emailPattern) {
    return email.emailPattern.test(val);
  }

  return email.test(val);
};

export const isNumber = val => !isNaN(val);

export const isPositive = val => !isNaN(val) && Number(val) >= 0;

export const isNegative = val => !isNaN(val) && Number(val) < 0;

export const isVin = (vin = vinRegex) => val => {
  if (vin.vinPattern) {
    return vin.vinPattern.test(val);
  }

  return vin.test(val);
};

export const isZip = val => (/^\d{5}(-\d{4})?$/).test(val);

export const isCAPostalCode = val => (/^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1} *\d{1}[A-Z]{1}\d{1}$/i).test(val);

export const isPhone = val => (/^[0-9]{10}$/).test(val.replace(/\W/g, ''));

export const isLicensePlate = val => (/^([A-Z]|[0-9]){1,3}(\s|-|•)?([A-Z]|[0-9]){3,5}$/i).test(val);

export const isVisaCard = (strict = true) => val => {
  if (strict) {
    return luhn(val);
  }

  return (/^4[0-9]{15}$/).test(val);
};

export const isVisaPanCard = (strict = true) => val => {
  if (strict) {
    return luhn(val);
  }

  return (/^4[0-9]{18}$/).test(val);
};

export const isMasterCard = (strict = true) => val => {
  if (strict) {
    return luhn(val);
  }

  return (/^5[1-5][0-9]{14}$/).test(val);
};

export const isAmexCard = (strict = true) => val => {
  if (strict) {
    return luhn(val);
  }

  return (/^3(4|7)[0-9]{13}$/).test(val);
};

export const isAmericanExpressCard = (strict = true) => val => isAmexCard(strict)(val);

export const isDiscoverCard = (strict = true) => val => {
  if (strict) {
    return luhn(val);
  }

  return (/^6[0-9]{15}$/).test(val);
};

export const isBelowMax = (m = Infinity) => val => {
  if (m.max) {
    return !isNaN(val) && Number(val) < m.max;
  }

  return !isNaN(val) && Number(val) < m;
};

export const isAboveMin = (m = -Infinity) => val => {
  if (m.min) {
    return !isNaN(val) && Number(val) > m.min;
  }

  return !isNaN(val) && Number(val) > m;
};
