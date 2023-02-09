import * as types from './IndustryType';

export const createIndustryReq = (values, cb) => {
  console.log('We are in action get', values);
  return {
    type: types.SET_NEW_INDUSTRY_REQ,
    paylode: values,
  };
};

export const createIndustryRes = (value) => {
  console.log('user action resp', value);
  return {
    type: types.SET_NEW_INDUSTRY_RES,
  };
};
