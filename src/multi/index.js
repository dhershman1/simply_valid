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

const run = (val, type) => {
  const validationList = validationTypes[type];

  for (let i = 0; i < validationList.length; i++) {
    if (validationList[i](val)) {
      return true;
    }

    continue;
  }

  return false;
};

export const creditCard = val => run(val, 'creditCard');

export const date = val => run(val, 'date');

export const cvn = val => run(val, 'cvn');

export const zipPost = val => run(val, 'zipPost');
