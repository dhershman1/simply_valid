import format from './index';
import test from 'ava';

test('Test foramt', t => {
  const passingTest = {
    zip: { isValid: true },
    address: { isValid: true }
  };
  const failingTest = {
    zip: {
      isValid: false,
      story: [{
        test: 'isNumber',
        value: 'cool'
      }]
    },
    address: { isValid: true }
  };

  const passingResults = format(passingTest);
  const failingResults = format(failingTest);

  t.truthy(passingResults, 'Formatted and returned');
  t.truthy(passingResults.isValid, 'Passing is indeed valid');
  t.is(passingResults.story.length, 0, 'There is no story for the passing test');
  t.truthy(failingResults, 'Failing results returned and formatted');
  t.falsy(failingResults.isValid, 'The failing results are not valid');
  t.is(failingResults.story.length, 1, 'There is a story length in failing results');
  t.deepEqual(failingResults.story[0], {
    test: 'isNumber',
    value: 'cool',
    propName: 'zip'
  }, 'story is equal to a valid formatted object');

});
