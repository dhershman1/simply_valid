import { meetsMinMax, validate, isNumber, hasLetters, hasNumbers, isPositive, meetsPassReq, noLetters } from '../src/index'
// import meetsMinMax from '../src/meets/meetsMinMax'
import test from 'tape'

const testData = {
  zip: '11445',
  address: '1132 Cool St',
  pass: 'turd',
  between: 20
}

test('Rando', t => {
  // const isValid = validate({
  //   zip: isNumber,
  //   address: hasLetters
  // })

  testData.nested = { inner: '10' }

  // const fn = meetsMinMax(0)

  // console.log(fn(10))

  // console.log(isValid(testData))
  // console.log(isValid({ zip: 44114, address: 1123 }))
  console.log(validate({
    zip: isNumber,
    address: [hasLetters, hasNumbers],
    between: meetsMinMax(1, 10),
    pass: meetsPassReq,
    nested: validate({ inner: noLetters })
  }, testData))
  // console.log(validate([isNumber, isPositive], -1))

  t.ok(true)
  t.end()
})
