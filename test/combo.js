import { creditCard, cvn, date, zipOrPostal } from '../src/combo'
import test from 'ava'

test('Test creditCard', t => {
  const results = creditCard('4012888888881881')

  t.truthy(creditCard)
  t.truthy(results, 'Valid Credit Card')

  const badResults = creditCard('AB4111111111111111')

  t.falsy(badResults, 'Invalid Credit Card')
})

test('Test cvn', t => {
  let results = cvn('555')

  t.truthy(cvn)
  t.truthy(results, 'Valid cvn code')
  results = cvn('5555')
  t.truthy(results, 'Valid cvnAmex')

  const badResults = cvn('ABCVf')

  t.falsy(badResults, 'Invalid CVN code')
})

test('Test date', t => {
  const results = date('07/11/2017')

  t.truthy(date)
  t.truthy(results, 'Valid Date')

  const badResults = date('ff/05/yyyy')

  t.falsy(badResults, 'Invalid date')
})

test('Test zipPost', t => {
  let results = zipOrPostal('44055')

  t.truthy(zipOrPostal)
  t.truthy(results, 'Proper zip code')
  results = zipOrPostal('K1A0B1')
  t.truthy(results, 'Proper Postal Code')

  const badResults = zipOrPostal('FFFGG55555Y')

  t.falsy(badResults, 'Invalid Zip or Postal code')
})
