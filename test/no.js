import {
  noLetters,
  noNumbers,
  noSpecials
} from '../src/no'
import test from 'ava'

test('Test noLetters', t => {
  let results = noLetters('1123450')

  t.truthy(noLetters)
  t.truthy(results, 'First results set no letters found')

  results = noLetters('GHJffre1123')
  t.falsy(results, 'Letters found in string')
})

test('Test noNumbers', t => {
  let results = noNumbers('abcdefGHIJK')

  t.truthy(noNumbers)
  t.truthy(results, 'No numbers found')

  results = noNumbers('abc1234')
  t.falsy(results, 'Numbers found in string')
})

test('Test noSpecials', t => {
  let results = noSpecials('cool')

  t.truthy(noSpecials)
  t.truthy(results, 'No specials found')

  results = noSpecials('cool!')
  t.falsy(results, 'Specials found in string')
})
