import {
  creditCard,
  cvn,
  date,
  zipPost
} from './index.js';
import test from 'tape';

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
