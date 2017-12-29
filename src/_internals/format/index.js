export default obj => {
  const results = {
    isValid: true,
    story: []
  };

  for (const prop in obj) {
    if (obj[prop].isValid) {
      continue;
    }

    const [story] = obj[prop].story;

    story.propName = prop;
    results.story.push(story);
  }

  if (results.story.length) {
    results.isValid = false;

    return results;
  }

  return results;
};
