import { validate, isNumber, hasLetters, hasNumbers, isPositive, meetsPassReq, noLetters, meetsMinMax } from '../src/index'
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

  // console.log(isValid(testData))
  // console.log(isValid({ zip: 44114, address: 1123 }))
  console.log(validate({
    zip: isNumber,
    address: [hasLetters, hasNumbers],
    between: meetsMinMax(1, 10),
    pass: meetsPassReq,
    nested: validate({ inner: noLetters })
  }, testData))
  console.log(validate([isNumber, isPositive], -1))

  t.ok(true)
  t.end()
})
