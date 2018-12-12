import { isBetween, validate, isNumber, hasLetters, hasNumbers, meetsPassReq, isPositive, noNumbers } from '../src/index'
import test from 'tape'

test('validate -- Single function with data', t => {
  t.same(validate([isNumber], 2), { isValid: true })
  t.same(validate([isPositive], -2), { isValid: false, rule: 'isPositive', data: -2 })
  t.end()
})

test('validate -- Single data functionality', t => {
  const v = validate([isNumber, isPositive])

  t.same(v(1), { isValid: true })
  t.same(v('1'), { isValid: true })
  t.same(v(-1), { isValid: false, rule: 'isPositive', data: -1 })
  t.same(v('-1'), { isValid: false, rule: 'isPositive', data: '-1' })
  t.same(v('abc'), { isValid: false, rule: 'isNumber', data: 'abc' })
  t.end()
})

test('validate -- Array based functionality', t => {
  const v = validate([isNumber, isPositive])

  t.same(v([1, 2, 3]), { isValid: true })
  t.same(v([1, '2', 3]), { isValid: true })
  t.same(v([1, 2, -3]), { isValid: false, rule: 'isPositive', data: [1, 2, -3] })
  t.same(v([1, 2, '-3']), { isValid: false, rule: 'isPositive', data: [1, 2, '-3'] })
  t.same(v([1, 2, 'abc']), { isValid: false, rule: 'isNumber', data: [1, 2, 'abc'] })
  t.end()
})

test('validate -- Object based functionality', t => {
  const v = validate({
    zip: isNumber,
    addres: [hasNumbers, hasLetters],
    pass: meetsPassReq,
    between: isBetween([0, 20])
  })

  t.same(v({
    zip: '11445',
    address: '1132 Cool St',
    pass: 'turd',
    between: 20
  }), { isValid: false, prop: 'pass', rule: 'meetsPassReq', data: 'turd' })
  t.same(v({
    zip: '11445',
    address: '1132 Cool St',
    pass: 'c00Lk1d$17',
    between: 20
  }), { isValid: true })
  t.end()
})

test('validate -- Objects with nested data', t => {
  const data = {
    zip: 114455,
    address: {
      streetNum: 123,
      streetName: 'test dr'
    }
  }
  const v = validate({
    zip: isNumber,
    address: validate({ streetNum: isNumber, streetName: [hasLetters, noNumbers] })
  })

  t.same(v(data), { isValid: true })
  t.end()
})
