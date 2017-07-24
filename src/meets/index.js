export const meetsLength = (val, {minLength, maxLength}) => val.length < minLength || val.length > maxLength;

export const meetsMinMax = (val, {min, max}) => isNaN(val) || (Number(val) < min || Number(val) > max);

export const meetsYearStandard = val => !(/(^[0-9]{2}$)|(^[1-2]{1}[0-9]{3}$)/).test(val);

export const meetsCVN = val => val.length !== 3 || !(/[0-9]/).test(val);

export const meetsCVNAmex = val => val.length !== 4 || !(/[0-9]/).test(val);

export const meetsTreadDepth = val => !(/^(([0-1]?[0-9]|2[0-1])(\.[0-9])?|22)$/i).test(val);

export const meetsPassReq = (val, {passwordPattern}) => !passwordPattern.test(val);
