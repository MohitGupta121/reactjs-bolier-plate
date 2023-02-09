import * as types from './EntityTypes';

export const updateLocationLabel = (filter, loaderCallback, successCallback) => ({
  type: types.UPDATE_LOCATION_LABEL,
  payload: filter,
  loaderCallback,
  successCallback,
});

export const updateFinancialCode = (filter, loaderCallback, successCallback) => ({
  type: types.UPDATE_FINANICIAL_CODE,
  payload: filter,
  loaderCallback,
  successCallback,
});

export const updateGeneralSettings = (filter, loaderCallback, successCallback) => ({
  type: types.UPDATE_GENERAL_SETTINGS,
  payload: filter,
  loaderCallback,
  successCallback,
});

export const categoryList = (data, loaderCallback, successCallback) => ({
  type: types.CATEGORY_LIST,
  payload: data,
  loaderCallback,
  successCallback,
});

export const categoryListResponse = (data) => ({
  type: types.CATEGORY_LIST_RESPONSE,
  payload: data,
});

export const entityCategoryList = (data, loaderCallback, successCallback) => ({
  type: types.ENTITY_CATEGORY_LIST,
  payload: data,
  loaderCallback,
  successCallback,
});

export const entityCategoryListResponse = (data) => ({
  type: types.ENTITY_CATEGORY_LIST_RESPONSE,
  payload: data,
});

export const addCategory = (filter, loaderCallback, successCallback) => ({
  type: types.ADD_CATEGORY,
  payload: filter,
  loaderCallback,
  successCallback,
});

export const addCategoryResponse = (data) => ({
  type: types.ADD_CATEGORY_RESPONSE,
  payload: data,
});

export const addCategoryTag = (filter, loaderCallback, successCallback) => ({
  type: types.ADD_CATEGORY_TAG,
  payload: filter,
  loaderCallback,
  successCallback,
});

export const getEntityById = (filter, loaderCallback, successCallback) => ({
  type: types.GET_ENTITY_BY_ID,
  payload: filter,
  loaderCallback,
  successCallback,
});

export const getEntityByIdResponse = (filter) => ({
  type: types.GET_ENTITY_BY_ID_RESPONSE,
  payload: filter,
});

export const updateSetupStatus = (filter, loaderCallback, successCallback) => ({
  type: types.UPDATE_SETUP_STATUS,
  payload: filter,
  loaderCallback,
  successCallback,
});

export const getEntityUnits = (data, loaderCallback, successCallback) => ({
  type: types.GET_ENTITY_UNITS,
  payload: data,
  loaderCallback,
  successCallback,
});


export const addEntityUnitResponse = (data) => ({
  type: types.ADD_ENTITY_UNITS_RESPONSE,
  payload: data,
});

