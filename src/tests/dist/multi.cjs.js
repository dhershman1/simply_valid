'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var test = _interopDefault(require('tape'));

/* eslint-disable max-len */
const isDate = val => (/^((1[0-2])|(0?[1-9]))[-/.]?((0?[1-9])|([1-2][0-9])|(3[0-1]))[-/.]?(([1-2]{1}[0-9]{3})|([0-9]{2}))$/m).test(val);

const isDateShort = val => (/^((1[0-2])|(0?[1-9]))[-/.]?((0?[1-9])|([1-2][0-9])|(3[0-1]))[-/.]?$/m).test(val);

const isDateProper = val => (/^(([1-2]{1}[0-9]{3})|([0-9]{2}))[-/.]?((1[0-2])|(0?[1-9]))[-/.]?((0?[1-9])|([1-2][0-9])|(3[0-1]))$/m).test(val);











const isZip = val => (/^\d{5}(-\d{4})?$/).test(val);

const isCAPostalCode = val => (/^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1} *\d{1}[A-Z]{1}\d{1}$/i).test(val);





const isVisaCard = val => (/^4[0-9]{15}$/).test(val);

const isVisaPanCard = val => (/^4[0-9]{18}$/).test(val);

const isMasterCard = val => (/^5[1-5][0-9]{14}$/).test(val);

const isAmericanExpressCard = val => (/^3(4|7)[0-9]{13}$/).test(val);

const isDiscoverCard = val => (/^6[0-9]{15}$/).test(val);

/* eslint-disable max-len */




const meetsCVN = val => val.length === 3 && (/[0-9]/).test(val);

const meetsCVNAmex = val => val.length === 4 && (/[0-9]/).test(val);

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

const creditCard = val => run(val, 'creditCard');

const date = val => run(val, 'date');

const cvn = val => run(val, 'cvn');

const zipPost = val => run(val, 'zipPost');

test('Test creditCard', t => {
  const results = creditCard('4012888888881881');

  t.ok(creditCard);
  t.ok(results, 'Valid Credit Card');

  const badResults = creditCard('AB4111111111111111');

  t.notOk(badResults, 'Invalid Credit Card');
  t.end();
});

test('Test cvn', t => {
  let results = cvn('555');

  t.ok(cvn);
  t.ok(results, 'Valid cvn code');
  results = cvn('5555');
  t.ok(results, 'Valid cvnAmex');

  const badResults = cvn('ABCVf');

  t.notOk(badResults, 'Invalid CVN code');
  t.end();
});

test('Test date', t => {
  const results = date('07/11/2017');

  t.ok(date);
  t.ok(results, 'Valid Date');

  const badResults = date('ff/05/yyyy');

  t.notok(badResults, 'Invalid date');
  t.end();
});

test('Test zipPost', t => {
  let results = zipPost('44055');

  t.ok(zipPost);
  t.ok(results, 'Proper zip code');
  results = zipPost('K1A0B1');
  t.ok(results, 'Proper Postal Code');

  const badResults = zipPost('FFFGG55555Y');

  t.notOk(badResults, 'Invalid Zip or Postal code');
  t.end();
});
