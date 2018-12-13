import {
  meetsPassReq,
  meetsTreadDepth,
  meetsYearStandard
} from '../src/meets'
import test from 'tape'

test('Test meetsPassReq', t => {
  t.ok(meetsPassReq)
  t.ok(meetsPassReq('cOol12$d'), 'Meets Password requirement')
  t.notOk(meetsPassReq('AA'), 'Invalid Does not meet password requirement')
  t.end()
})

test('Test meetsTreadDepth', t => {
  t.ok(meetsTreadDepth)
  t.ok(meetsTreadDepth('12'), 'Proper tread depth format')
  t.notOk(meetsTreadDepth('AA'), 'Invalid tread depth format')
  t.end()
})

test('Test meetsYearStandard', t => {
  t.ok(meetsYearStandard)
  t.ok(meetsYearStandard('2017'), 'Proper 4 digit format')
  t.ok(meetsYearStandard('17'), 'Proper 2 digit format')
  t.notOk(meetsYearStandard('178'), 'Invalid 3 digit format')
  t.end()
})
