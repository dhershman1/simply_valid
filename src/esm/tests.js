import simplyValid from './index';
import test from 'ava';

const testData = {
  zip: '11445',
  address: '1132 Cool St'
};

test('Test String Schema', t => {
  const validate = simplyValid({
    schema: 'hasValue'
  });

  t.truthy(validate);
  t.truthy(validate('cool').isValid, 'Validation passed');
  t.falsy(validate('').isValid, 'Empty string is not valid');

});

test('Test Object Schema', t => {
  const validate = simplyValid({
    schema: {
      zip: ['isNumber'],
      address: ['hasLetters', 'hasNumbers']
    }
  });

  t.truthy(validate);
  t.truthy(validate(testData).isValid, 'Object is a valid object');
  t.falsy(validate({
    zip: 'cool',
    address: '112 test St'
  }).isValid, 'Object is invalid');

});

test('Test Array Schema', t => {
  const validate = simplyValid({
    schema: ['isNumber', 'isPositive']
  });

  t.truthy(validate);
  t.truthy(validate('5').isValid, 'Number is valid and positive');
  t.falsy(validate('-4').isValid, 'Number is negative and not valid');

});

test('Test nested Object', t => {
  const validate = simplyValid({
    schema: {
      test: ['isPositive'],
      zip: ['hasValue', 'hasNumbers'],
      address: ['hasLetters']
    }
  });

  t.truthy(validate);
  t.truthy(validate({
    test: '4',
    info: {
      zip: '44432',
      address: '4432 Test St'
    }
  }).isValid, 'Valid nested object');

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

  t.truthy(validate);
  t.truthy(results.isValid, 'Is a valid object');
  t.is(results.story.length, 0, 'There is no story');


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

  t.truthy(results, 'Results are Okay');
  t.falsy(results.isValid, 'Results are invalid since the 2nd object is bad');
  t.is(results.story.length, 1, 'Story has length');
  t.is(results.story[0].test, 'hasLetters', 'The test that failed was has letters');
  t.is(results.story[0].value, '1123', 'The value given was only 1123');

  const passingResults = validate([{
    zip: '44532',
    address: '1123 Test St'
  }, {
    zip: '44532',
    address: '1123 Test Dr'
  }]);

  t.truthy(passingResults, 'Passing results are okay');
  t.truthy(passingResults.isValid, 'Results that came back are valid');
  t.is(passingResults.story.length, 0, 'There is no story');


});
