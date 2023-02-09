import * as types from './MiscellaneousTypes';

export const languageList = (data, loaderCallback, successCallback) => ({
  type: types.LANGUAGE_LIST,
  payload: data,
  loaderCallback,
  successCallback,
});

export const languageListResponse = (data) => ({
  type: types.LANGUAGE_LIST_RESPONSE,
  payload: data,
});

export const countryList = (data, loaderCallback, successCallback) => ({
  type: types.COUNTRY_LIST,
  payload: data,
  loaderCallback,
  successCallback,
});

export const countryListResponse = (data) => ({
  type: types.COUNTRY_LIST_RESPONSE,
  payload: data,
});

export const stateList = (data, loaderCallback, successCallback) => ({
  type: types.STATE_LIST,
  payload: data,
  loaderCallback,
  successCallback,
});

export const stateListResponse = (data) => ({
  type: types.STATE_LIST_RESPONSE,
  payload: data,
});

export const cityList = (data, loaderCallback, successCallback) => ({
  type: types.CITY_LIST,
  payload: data,
  loaderCallback,
  successCallback,
});

export const cityListResponse = (data) => ({
  type: types.CITY_LIST_RESPONSE,
  payload: data,
});

export const measurementList = (data, loaderCallback, successCallback) => ({
  type: types.MEASUREMENT_LIST,
  payload: data,
  loaderCallback,
  successCallback,
});

export const measurementListResponse = (data) => ({
  type: types.MEASUREMENT_LIST_RESPONSE,
  payload: data,
});
