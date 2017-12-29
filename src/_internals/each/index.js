const each = (data, cb) => {
  let i = 0;
  const keys = Object.keys(data);
  const len = keys.length;

  for (i; i < len; i++) {
    const prop = keys[i];

    if (Object.prototype.hasOwnProperty.call(data, prop)) {
      if (typeof data[prop] === 'object') {
        each(data[prop], cb);
        continue;
      }
      cb(data[prop], prop);
    }
  }
};

export default each;
