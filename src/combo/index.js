import {
  isAmexCard,
  isCAPostalCode,
  isDate,
  isDateProper,
  isDateShort,
  isDiscoverCard,
  isMasterCard,
  isVisaCard,
  isZip
} from '../is';
import {
  meetsCVN,
  meetsCVNAmex
} from '../meets';

const runner = (val, methods) => {
  for (let i = 0, len = methods.length; i < len; i++) {
    if (methods[i](val)) {
      return true;
    }
  }

  return false;
};


export const creditCard = val => runner(val, [
  isAmexCard(true),
  isDiscoverCard(true),
  isMasterCard(true),
  isVisaCard(true)
]);

export const date = val => runner(val, [isDate, isDateShort, isDateProper]);

export const cvn = val => runner(val, [meetsCVN, meetsCVNAmex]);

export const zipOrPostal = val => runner(val, [isZip, isCAPostalCode]);
