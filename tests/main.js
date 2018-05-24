import simplyValid from '../src/main'
import test from 'tape'

const testData = {
  zip: '11445',
  address: '1132 Cool St'
}

test('Test String Schema', t => {
  const validate = simplyValid({
    schema: 'hasValue'
  })

  t.ok(validate)
  t.ok(validate('cool').isValid, 'Validation passed')
  t.notOk(validate('').isValid, 'Empty string is not valid')
  t.end()
})

test('Test Object Schema', t => {
  const validate = simplyValid({
    schema: {
      zip: ['isNumber'],
      address: ['hasLetters', 'hasNumbers']
    }
  })

  t.ok(validate)
  t.ok(validate(testData).isValid, 'Object is a valid object')
  t.notOk(validate({
    zip: 'cool',
    address: '112 test St'
  }).isValid, 'Object is invalid')
  t.end()
})

test('Test Object Schema Omitting values', t => {
  const validate = simplyValid({
    schema: {
      zip: ['hasValue', 'isNumber']
    }
  })

  t.ok(validate)
  t.ok(validate(testData).isValid, 'Object is a valid object')
  t.notOk(validate({
    zip: '',
    address: '112 test St'
  }).isValid, 'Object is invalid')
  t.end()
})

test('Test Array Schema', t => {
  const validate = simplyValid({
    schema: ['isNumber', 'isPositive']
  })

  t.ok(validate)
  t.ok(validate('5').isValid, 'Number is valid and positive')
  t.notOk(validate('-4').isValid, 'Number is negative and not valid')
  t.end()
})

test('Test nested Object', t => {
  const validate = simplyValid({
    schema: {
      test: ['isPositive'],
      info: {
        zip: ['hasValue', 'hasNumbers'],
        address: ['hasLetters']
      }
    }
  })

  t.ok(validate)
  t.ok(validate({
    test: '4',
    info: {
      zip: '44432',
      address: '4432 Test St'
    }
  }).isValid, 'Valid nested object')
  t.end()
})

test('Test nested object with arrays', t => {
  const validate = simplyValid({
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

  const results = validate({
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

  t.ok(validate)
  t.ok(results.isValid, 'Is a valid object')
  t.is(results.story.length, 0, 'There is no story')
  t.end()
})

test('Testing Combo Functionality', t => {
  const simple = simplyValid({
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
  const simple = simplyValid({
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
  const results = simplyValid({ schema }, data)

  t.notOk(results.isValid)
  t.is(results.story[0].test, 'noLetters')
  t.is(results.story[1].test, 'noSpecials')
  t.end()
})

test('Testing main validation for Arrays', t => {
  const results = simplyValid({ schema: ['hasNumbers', 'hasLetters'] }, ['henlo112', 'blep102'])

  t.ok(results.isValid)
  t.end()
})

test('Testing main validation for Strings', t => {
  const results = simplyValid({ schema: 'hasNumbers' }, 'blep')

  t.notOk(results.isValid)
  t.end()
})

test('Throws an error when the schema passed in is invalid', t => {
  try {
    simplyValid({ schema: [] }, 'test')
  } catch (err) {
    t.is(err.message, 'The schema is either invalid or one was not provided for validation')
    t.end()
  }
})

test('Handles if a random invalid option is passed in', t => {
  const validator = simplyValid({ schema: ['isPositive'], hi: 'test' })

  t.ok(validator(1).isValid)
  t.end()
})
