export default val => {
  if (Array.isArray(val)) {
    return val;
  }

  if (val === void 0) {
    return [];
  }

  return [val];
};
