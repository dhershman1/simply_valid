import * as methods from '../src/index'
import setup from '../src/_internals/setup'
import test from 'ava'

test('Testing setup', t => {
  const schema = {
    email: 'isEmail',
    zip: 'isZip',
    name: ['hasValue', 'hasLetters'],
    phone: {
      area: 'hasNumbers',
      local: 'noSpecials'
    }
  }
  const results = setup({
    schema,
    strictCard: false,
    max: Infinity,
    min: -Infinity,
    maxLen: 100,
    minLen: 1
  }, methods)

  console.log(results)

  t.truthy(results)
})
