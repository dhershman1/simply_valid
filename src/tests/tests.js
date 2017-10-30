'use strict';

const test = require('tape');
const simplyValid = require('./dist/index.cjs.js');

const testData = {
  zip: '11445',
  address: '1132 Cool St'
};

test('Test String Schema', t => {
  const validate = simplyValid({
    schema: 'hasValue'
  });

  t.ok(validate);
  t.ok(validate('cool').isValid, 'Validation passed');
  t.notOk(validate('').isValid, 'Empty string is not valid');
  t.end();
});

test('Test Object Schema', t => {
  const validate = simplyValid({
    schema: {
      zip: ['isNumber'],
      address: ['hasLetters', 'hasNumbers']
    }
  });

  t.ok(validate);
  t.ok(validate(testData).isValid, 'Object is a valid object');
  t.notOk(validate({
    zip: 'cool',
    address: '112 test St'
  }).isValid, 'Object is invalid');
  t.end();
});

test('Test Array Schema', t => {
  const validate = simplyValid({
    schema: ['isNumber', 'isPositive']
  });

  t.ok(validate);
  t.ok(validate('5').isValid, 'Number is valid and positive');
  t.notOk(validate('-4').isValid, 'Number is negative and not valid');
  t.end();
});

test('Test nested Object', t => {
  const validate = simplyValid({
    schema: {
      test: ['isPositive'],
      zip: ['hasValue', 'hasNumbers'],
      address: ['hasLetters']
    }
  });

  t.ok(validate);
  t.ok(validate({
    test: '4',
    info: {
      zip: '44432',
      address: '4432 Test St'
    }
  }).isValid, 'Valid nested object');
  t.end();
});

test('Test nested object with arrays', t => {
  const validate = simplyValid({
    schema: {
      arraytest: ['isPositive'],
      zip: ['hasValue', 'hasNumbers'],
      address: ['hasLetters']
    }
  });

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
  });

  t.ok(validate);
  t.ok(results.isValid, 'Is a valid object');
  t.equal(results.story.length, 0, 'There is no story');
  t.end();

});

test('Test validate array of objects', t => {
  const validate = simplyValid({
    schema: {
      zip: ['hasValue', 'hasNumbers'],
      address: ['hasLetters']
    }
  });
  const results = validate([{
    zip: '44532',
    address: '1123 Test St'
  }, {
    zip: '44532',
    address: '1123'
  }]);

  t.ok(results, 'Results are Okay');
  t.notOk(results.isValid, 'Results are invalid since the 2nd object is bad');
  t.equal(results.story.length, 1, 'Story has length');
  t.equal(results.story[0].test, 'hasLetters', 'The test that failed was has letters');
  t.equal(results.story[0].value, '1123', 'The value given was only 1123');

  const passingResults = validate([{
    zip: '44532',
    address: '1123 Test St'
  }, {
    zip: '44532',
    address: '1123 Test Dr'
  }]);

  t.ok(passingResults, 'Passing results are okay');
  t.ok(passingResults.isValid, 'Results that came back are valid');
  t.equal(passingResults.story.length, 0, 'There is no story');

  t.end();
});
