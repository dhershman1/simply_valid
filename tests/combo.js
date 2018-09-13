import { creditCard, cvn, date, zipOrPostal } from '../src/combo'
import test from 'tape'

test('Test creditCard', t => {
  t.true(creditCard('4012888888881881'), 'Valid Credit Card')
  t.false(creditCard('AB4111111111111111'), 'Invalid Credit Card')
  t.end()
})

test('Test cvn', t => {
  t.true(cvn('555'), 'Valid cvn code')
  t.true(cvn('5555'), 'Valid cvnAmex')
  t.false(cvn('ABCVf'), 'Invalid CVN code')
  t.end()
})

test('Test date', t => {
  t.true(date('07/11/2017'), 'Valid Date')
  t.false(date('ff/05/yyyy'), 'Invalid date')
  t.end()
})

test('Test zipPost', t => {
  t.true(zipOrPostal('44055'), 'Proper zip code')
  t.true(zipOrPostal('K1A0B1'), 'Proper Postal Code')
  t.false(zipOrPostal('FFFGG55555Y'), 'Invalid Zip or Postal code')
  t.end()
})
