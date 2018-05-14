import simplyValid from '../src/main'
import test from 'ava'

const testData = {
  zip: '11445',
  address: '1132 Cool St'
}

test('Test String Schema', t => {
  const validate = simplyValid({
    schema: 'hasValue'
  })

  t.truthy(validate)
  t.truthy(validate('cool').isValid, 'Validation passed')
  t.falsy(validate('').isValid, 'Empty string is not valid')
})

test('Test Object Schema', t => {
  const validate = simplyValid({
    schema: {
      zip: ['isNumber'],
      address: ['hasLetters', 'hasNumbers']
    }
  })

  t.truthy(validate)
  t.truthy(validate(testData).isValid, 'Object is a valid object')
  t.falsy(validate({
    zip: 'cool',
    address: '112 test St'
  }).isValid, 'Object is invalid')
})

test('Test Object Schema Omitting values', t => {
  const validate = simplyValid({
    schema: {
      zip: ['hasValue', 'isNumber']
    }
  })

  t.truthy(validate)
  t.truthy(validate(testData).isValid, 'Object is a valid object')
  t.falsy(validate({
    zip: '',
    address: '112 test St'
  }).isValid, 'Object is invalid')
})

test('Test Array Schema', t => {
  const validate = simplyValid({
    schema: ['isNumber', 'isPositive']
  })

  t.truthy(validate)
  t.truthy(validate('5').isValid, 'Number is valid and positive')
  t.falsy(validate('-4').isValid, 'Number is negative and not valid')
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

  t.truthy(validate)
  t.truthy(validate({
    test: '4',
    info: {
      zip: '44432',
      address: '4432 Test St'
    }
  }).isValid, 'Valid nested object')
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

  t.truthy(validate)
  t.truthy(results.isValid, 'Is a valid object')
  t.is(results.story.length, 0, 'There is no story')
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

  t.truthy(results)
  t.truthy(results.isValid)
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

  t.truthy(results)
  t.truthy(results.isValid)
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

  t.falsy(results.isValid)
  t.is(results.story[0].test, 'noLetters')
  t.is(results.story[1].test, 'noSpecials')
})

test('Testing main validation for Arrays', t => {
  const results = simplyValid({ schema: ['hasNumbers', 'hasLetters'] }, ['henlo112', 'blep102'])

  t.truthy(results.isValid)
})

test('Testing main validation for Strings', t => {
  const results = simplyValid({ schema: 'hasNumbers' }, 'blep')

  t.falsy(results.isValid)
})
