import * as types from './AddUnitTypes';

export const getUnitList = (data, loaderCallback, successCallback) => ({
  type: types.UNIT_LIST,
  payload: data,
  loaderCallback,
  successCallback,
});

export const addUnitTag = (data, loaderCallback, successCallback) => ({
  type: types.ADD_UNIT_TAG,
  payload: data,
  loaderCallback,
  successCallback,
});

export const inviteUsers = (data, loaderCallback, successCallback) => ({
  type: types.INVITE_USERS,
  payload: data,
  loaderCallback,
  successCallback,
});

export const unitDetails = (data, loaderCallback, successCallback) => ({
  type: types.UNIT_DETAILS,
  payload: data,
  loaderCallback,
  successCallback,
});

export const unitListResponse = (data) => ({
  type: types.UNIT_LIST_RESPONSE,
  payload: data,
});

export const getUnitById = (filter, loaderCallback, successCallback) => ({
  type: types.GET_UNIT_BY_ID,
  payload: filter,
  loaderCallback,
  successCallback,
});

export const getUnitByIdResponse = (filter) => ({
  type: types.GET_UNIT_BY_ID_RESPONSE,
  payload: filter,
});

export const updateUnit = (filter, loaderCallback, successCallback) => ({
  type: types.UPDATE_UNIT,
  payload: filter,
  loaderCallback,
  successCallback,
});

export const addUnit = (filter, loaderCallback, successCallback) => ({
  type: types.ADD_UNIT,
  payload: filter,
  loaderCallback,
  successCallback,
});

export const unitManagement = (filter, loaderCallback, successCallback) => ({
  type: types.UNIT_MANAGEMENT_REQUEST,
  payload: filter,
  loaderCallback,
  successCallback,
});

export const unitManagementResponse = (date) => ({
  type: types.UNIT_MANAGEMENT_RESPONSE,
  payload: date,
});

export const addUnitResponse = (filter, loaderCallback, successCallback) => ({
  type: types.ADD_UNIT_RESPONSE,
  payload: filter,
  loaderCallback,
  successCallback,
});

export const searchEntityUnitUsers = (filter, loaderCallback, successCallback) => ({
  type: types.ENTITY_UNIT_USER_SEARCH_REQUEST,
  payload: filter,
  loaderCallback,
  successCallback,
});

export const searchEntityUnitUsersResponse = (data) => ({
  type: types.ENTITY_UNIT_USER_SEARCH_RESPONSE,
  payload: data,
});

export const searchEntityUnits = (filter, loaderCallback, successCallback) => ({
  type: types.ENTITY_UNIT_SEARCH_REQUEST,
  payload: filter,
  loaderCallback,
  successCallback,
});

export const searchEntityUnitsResponse = (data) => ({
  type: types.ENTITY_UNIT_SEARCH_RESPONSE,
  payload: data,
});

export const currentRoute = (data) => ({
  type: types.CURRENT_ROUTE,
  payload: data,
});
