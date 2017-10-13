import {
  meetsCVN,
  meetsCVNAmex,
  meetsMinMax,
  meetsPassReq,
  meetsTreadDepth,
  meetsYearStandard
} from './index.js';
import test from 'tape';

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
