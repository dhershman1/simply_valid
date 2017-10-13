/* eslint-disable max-len */
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/;

export const meetsMinMax = (val, { min = -Infinity, max = Infinity }) => !isNaN(val) && (Number(val) >= min && Number(val) <= max);

export const meetsYearStandard = val => (/(^[0-9]{2}$)|(^[1-2]{1}[0-9]{3}$)/).test(val);

export const meetsCVN = val => val.length === 3 && (/[0-9]/).test(val);

export const meetsCVNAmex = val => val.length === 4 && (/[0-9]/).test(val);

export const meetsTreadDepth = val => (/^(([0-1]?[0-9]|2[0-1])(\.[0-9])?|22)$/i).test(val);

export const meetsPassReq = (val, pass = passwordRegex) => {
  if (pass.passwordPattern) {
    return pass.passwordPattern.test(val);
  }

  return pass.test(val);
};
