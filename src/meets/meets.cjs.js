'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var test = _interopDefault(require('tape'));

/* eslint-disable max-len */
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/;

const meetsMinMax = (val, { min = -Infinity, max = Infinity }) => !isNaN(val) && (Number(val) >= min && Number(val) <= max);

const meetsYearStandard = val => (/(^[0-9]{2}$)|(^[1-2]{1}[0-9]{3}$)/).test(val);

const meetsCVN = val => val.length === 3 && (/[0-9]/).test(val);

const meetsCVNAmex = val => val.length === 4 && (/[0-9]/).test(val);

const meetsTreadDepth = val => (/^(([0-1]?[0-9]|2[0-1])(\.[0-9])?|22)$/i).test(val);

const meetsPassReq = (val, pass = passwordRegex) => {
  if (pass.passwordPattern) {
    return pass.passwordPattern.test(val);
  }

  return pass.test(val);
};

test('Test meetsCVN', t => {
  t.ok(meetsCVN);
  t.ok(meetsCVN('201'), 'Proper 3 digit CVN format');
  t.notOk(meetsCVN('2011'), 'Invalid format for CVN');
  t.end();
});

test('Test meetsCVNAmex', t => {
  t.ok(meetsCVNAmex);
  t.ok(meetsCVNAmex('2031'), 'Proper 3 digit CVN format');
  t.notOk(meetsCVNAmex('201'), 'Invalid format for CVN');
  t.end();
});

test('Test meetsMinMax', t => {
  t.ok(meetsMinMax);
  t.ok(meetsMinMax(3, {
    min: 0,
    max: 5
  }), 'Returns OK within our min/max');
  t.notOk(meetsMinMax(6, {
    min: 0,
    max: 5
  }), 'Invalid exceeds max');
  t.end();
});

test('Test meetsPassReq', t => {
  t.ok(meetsPassReq);
  t.ok(meetsPassReq('cOol12$d'), 'Meets Password requirement');
  t.notOk(meetsPassReq('AA'), 'Invalid Does not meet password requirement');
  t.end();
});

test('Test meetsTreadDepth', t => {
  t.ok(meetsTreadDepth);
  t.ok(meetsTreadDepth('12'), 'Proper tread depth format');
  t.notOk(meetsTreadDepth('AA'), 'Invalid tread depth format');
  t.end();
});

test('Test meetsYearStandard', t => {
  t.ok(meetsYearStandard);
  t.ok(meetsYearStandard('2017'), 'Proper 4 digit format');
  t.ok(meetsYearStandard('17'), 'Proper 2 digit format');
  t.notOk(meetsYearStandard('178'), 'Invalid 3 digit format');
  t.end();
});
