import { date, zipOrPostal } from '../src/combo'
import test from 'tape'

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
