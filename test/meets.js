import {
  meetsCVN,
  meetsCVNAmex,
  meetsMinMax,
  meetsPassReq,
  meetsTreadDepth,
  meetsYearStandard
} from '../src/meets'
import test from 'ava'

test('Test meetsCVN', t => {
  t.truthy(meetsCVN)
  t.truthy(meetsCVN('201'), 'Proper 3 digit CVN format')
  t.falsy(meetsCVN('2011'), 'Invalid format for CVN')
})

test('Test meetsCVNAmex', t => {
  t.truthy(meetsCVNAmex)
  t.truthy(meetsCVNAmex('2031'), 'Proper 3 digit CVN format')
  t.falsy(meetsCVNAmex('201'), 'Invalid format for CVN')
})

test('Test meetsMinMax', t => {
  t.truthy(meetsMinMax)
  t.truthy(meetsMinMax({
    min: 0,
    max: 5
  })(3), 'Returns OK within our min/max')
  t.falsy(meetsMinMax({
    min: 0,
    max: 5
  })(6), 'Invalid exceeds max')
})

test('Test meetsPassReq', t => {
  t.truthy(meetsPassReq)
  t.truthy(meetsPassReq('cOol12$d'), 'Meets Password requirement')
  t.falsy(meetsPassReq('AA'), 'Invalid Does not meet password requirement')
})

test('Test meetsTreadDepth', t => {
  t.truthy(meetsTreadDepth)
  t.truthy(meetsTreadDepth('12'), 'Proper tread depth format')
  t.falsy(meetsTreadDepth('AA'), 'Invalid tread depth format')
})

test('Test meetsYearStandard', t => {
  t.truthy(meetsYearStandard)
  t.truthy(meetsYearStandard('2017'), 'Proper 4 digit format')
  t.truthy(meetsYearStandard('17'), 'Proper 2 digit format')
  t.falsy(meetsYearStandard('178'), 'Invalid 3 digit format')
})
