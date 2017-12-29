export default val => {
  const numArr = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9];
  const stringVal = String(val);
  let len = stringVal.length;
  let bit = 1;
  let sum = 0;
  let num = 0;

  while (len) {
    num = parseInt(stringVal.charAt(--len), 10);
    sum += (bit ^= 1) ? numArr[num] : num; // eslint-disable-line
  }

  return sum && sum % 10 === 0;
};
