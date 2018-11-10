import { validate } from '../src/index'
import test from 'tape'

const testData = {
  zip: '11445',
  address: '1132 Cool St'
}

test('Test String Schema', t => {
  const valid = validate({
    schema: 'hasValue'
  })

  t.ok(valid)
  t.ok(valid('cool').isValid, 'Validation passed')
  t.notOk(valid('').isValid, 'Empty string is not valid')
  t.end()
})

test('Test Object Schema', t => {
  const valid = validate({
    schema: {
      zip: ['isNumber'],
      address: ['hasLetters', 'hasNumbers']
    }
  })

  t.ok(valid)
  t.ok(valid(testData).isValid, 'Object is a valid object')
  t.notOk(valid({
    zip: 'cool',
    address: '112 test St'
  }).isValid, 'Object is invalid')
  t.end()
})

test('Test Object Schema Omitting values', t => {
  const valid = validate({
    schema: {
      zip: ['hasValue', 'isNumber']
    }
  })

  t.ok(valid)
  t.ok(valid(testData).isValid, 'Object is a valid object')
  t.notOk(valid({
    zip: '',
    address: '112 test St'
  }).isValid, 'Object is invalid')
  t.end()
})

test('Test Array Schema', t => {
  const valid = validate({
    schema: ['isNumber', 'isPositive']
  })

  t.ok(valid)
  t.ok(valid('5').isValid, 'Number is valid and positive')
  t.notOk(valid('-4').isValid, 'Number is negative and not valid')
  t.end()
})

test('Test nested Object', t => {
  const valid = validate({
    schema: {
      test: ['isPositive'],
      info: {
        zip: ['hasValue', 'hasNumbers'],
        address: ['hasLetters']
      }
    }
  })

  t.ok(valid)
  t.ok(valid({
    test: '4',
    info: {
      zip: '44432',
      address: '4432 Test St'
    }
  }).isValid, 'Valid nested object')
  t.end()
})

test('Test nested object with arrays', t => {
  const valid = validate({
    schema: {
      test: {
        arraytest: ['isPositive']
      },
      info: {
        zip: ['hasValue', 'hasNumbers'],
        moreInfo: {
          address: ['hasLetters']
        }
      }
    }
  })

  const results = valid({
    test: {
      arraytest: ['3', '2', '1', '5']
    },
    info: {
      zip: '44564',
      moreInfo: {
        address: '11234 Test Rd'
      }
    }
  })

  t.ok(valid)
  t.ok(results.isValid, 'Is a valid object')
  t.is(results.story.length, 0, 'There is no story')
  t.end()
})

test('Testing Combo Functionality', t => {
  const simple = validate({
    schema: {
      cc: 'creditCard',
      date: 'date',
      cvn: 'cvn',
      zip: 'zipOrPostal'
    }
  })
  const results = simple({
    cc: '4012888888881881',
    date: '01/18',
    cvn: '333',
    zip: '55555'
  })

  t.ok(results)
  t.ok(results.isValid)
  t.end()
})

test('Testing Combo Functionality Mixup', t => {
  const simple = validate({
    schema: {
      cc: 'creditCard',
      date: 'date',
      cvn: 'cvn',
      zip: 'zipOrPostal'
    }
  })
  const results = simple({
    cc: '4012888888881881',
    date: '01/20/18',
    cvn: '3333',
    zip: 'K1A0B1'
  })

  t.ok(results)
  t.ok(results.isValid)
  t.end()
})

test('Test edge case for objects in schema', t => {
  const data = {
    email: 'dusty@gmail.com',
    zip: '44114',
    name: 'firstname',
    phone: {
      area: 'a123',
      local: '-999'
    }
  }
  const schema = {
    email: 'isEmail',
    zip: 'isZip',
    name: ['hasValue', 'hasLetters'],
    phone: {
      area: ['noLetters', 'hasNumbers'],
      local: 'noSpecials'
    }
  }
  const results = validate({ schema }, data)

  t.notOk(results.isValid)
  t.is(results.story[0].test, 'noLetters')
  t.is(results.story[1].test, 'noSpecials')
  t.end()
})

test('Testing main validation for Arrays', t => {
  const results = validate({ schema: ['hasNumbers', 'hasLetters'] }, ['henlo112', 'blep102'])

  t.ok(results.isValid)
  t.end()
})

test('Testing main validation for Strings', t => {
  const results = validate({ schema: 'hasNumbers' }, 'blep')

  t.notOk(results.isValid)
  t.end()
})

test('Throws an error when the schema passed in is invalid', t => {
  try {
    validate({ schema: [] }, 'test')
  } catch (err) {
    t.is(err.message, 'The schema is either invalid or one was not provided for validation')
    t.end()
  }
})

test('Handles if a random invalid option is passed in', t => {
  const validator = validate({ schema: ['isPositive'], hi: 'test' })

  t.ok(validator(1).isValid)
  t.end()
})

test('Handles if certain object props do not exist', t => {
  const valid = validate({
    schema: {
      zip: 'isNumber',
      address: 'hasLetters',
      num: 'isPositive'
    }
  })

  console.log(valid({ zip: 112345, address: '123 test st' }))
  t.end()
})
