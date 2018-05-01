import {
  hasLetters,
  hasNumbers,
  hasNumbersOrSpecials,
  hasSpecialCharacters,
  hasUpperAndLowerCase,
  hasValue
} from '../src/has'
import test from 'ava'

test('Test hasLetters', t => {
  t.truthy(hasLetters)
  t.truthy(hasLetters('test'), 'Has letters')
  t.falsy(hasLetters(''), 'Has no letters')
  t.falsy(hasLetters('111222'), 'Has only numbers')
})

test('Test hasNumbers', t => {
  t.truthy(hasNumbers)
  t.truthy(hasNumbers('1123AF'), 'Has Numbers')
  t.falsy(hasNumbers('aaaaa'), 'Has no numbers')
})

test('Test hasNumbersOrSpecials', t => {
  t.truthy(hasNumbersOrSpecials)
  t.truthy(hasNumbersOrSpecials('33421@#!'), 'Has Numbers and Specials')
  t.truthy(hasNumbersOrSpecials('aaaa@#!'), 'Has Specials')
  t.truthy(hasNumbersOrSpecials('aaaa222'), 'Has Numbers')
  t.falsy(hasNumbersOrSpecials('aaaaa'), 'Only Letters')
})

test('Test hasSpecialCharacters', t => {
  t.truthy(hasSpecialCharacters)
  t.truthy(hasSpecialCharacters('aa$$##'), 'Has Specials')
  t.falsy(hasSpecialCharacters('aaaa'), 'Has no specials')
})

test('Test hasUpperAndLowerCase', t => {
  t.truthy(hasUpperAndLowerCase)
  t.truthy(hasUpperAndLowerCase('aAAAaaa'), 'Has both upper and lower case')
  t.falsy(hasUpperAndLowerCase('aaaaa'), 'Has only lower case')
})

test('Test hasValue', t => {
  t.truthy(hasValue)
  t.truthy(hasValue('test'), 'Has a value')
  t.falsy(hasValue(''), 'Has no value')
  t.truthy(hasValue(0), 'Still true for number zero values')
})
