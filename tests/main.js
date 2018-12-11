import { isBetween, validate, isNumber, hasLetters, hasNumbers, isPositive, meetsPassReq, noLetters } from '../src/index'
import test from 'tape'

const testData = {
  zip: '11445',
  address: '1132 Cool St',
  pass: 'turd',
  between: 20
}

test('Rando', t => {
  const isValid = validate({
    zip: isNumber,
    address: hasNumbers
  })

  const isEven = val => val % 2 === 0
  // Multi param functions must be partial
  // And the value always comes last
  const notMin = function notMin (min) {
    return function _notMin (val) {
      return val !== min
    }
  }

  console.log(validate({
    foo: isEven,
    bar: [isEven, notMin(4)]
  }, {
      foo: 4,
      bar: 5
    }))

  testData.nested = { inner: '10a' }

  // console.log(isValid(testData))
  // console.log(isValid({ zip: 44114, address: 1123 }))
  // console.log(validate({
  //   zip: isNumber,
  //   address: [hasLetters, hasNumbers],
    // between: isBetween(1, 10),
    // pass: meetsPassReq,
  //   nested: validate({ inner: noLetters })
  // }, testData))
  // console.log(validate([isNumber, isPositive], -1))

  t.ok(true)
  t.end()
})
