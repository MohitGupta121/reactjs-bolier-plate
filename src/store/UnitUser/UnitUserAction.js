import * as types from './UnitUserTypes';

export const unitUserList = (filter, loaderCallback, successCallback) => ({
  type: types.UNIT_USER_LIST,
  payload: filter,
  loaderCallback,
  successCallback,
});

export const unitUserListResponse = (filter, loaderCallback, successCallback) => ({
  type: types.UNIT_USER_LIST_RESPONSE,
  payload: filter,
  loaderCallback,
  successCallback,
});

export const unitDetailsById = (filter, loaderCallback, successCallback) => ({
  type: types.UNIT_DETAILS_BY_ID,
  payload: filter,
  loaderCallback,
  successCallback,
});

export const unitDetailsByIdResponse = (filter, loaderCallback, successCallback) => ({
  type: types.UNIT_DETAILS_BY_ID_RESPONSE,
  payload: filter,
  loaderCallback,
  successCallback,
});

export const createKitchen = (filter, loaderCallback, successCallback) => ({
  type: types.CREATE_KITCHEN,
  payload: filter,
  loaderCallback,
  successCallback,
});

export const kitchenList = (data, loaderCallback, successCallback) => ({
  type: types.KITCHEN_LIST,
  payload: data,
  loaderCallback,
  successCallback,
});

export const kitchenListResponse = (data) => ({
  type: types.KITCHEN_LIST_RESPONSE,
  payload: data,
});

export const editKitchen = (data) => ({
  type: types.UPDATE_KITCHEN,
  payload: data,
});

export const deleteKitchen = (data) => ({
  type: types.DELETE_KITCHEN,
  payload: data,
});

export const createKitchenProfile = (filter, loaderCallback, successCallback) => ({
  type: types.CREATE_PROFILE,
  payload: filter,
  loaderCallback,
  successCallback,
});

export const kitchenProfileList = (data, loaderCallback, successCallback) => ({
  type: types.PROFILE_LIST,
  payload: data,
  loaderCallback,
  successCallback,
});

export const kitchenProfileListResponse = (data) => ({
  type: types.PROFILE_LIST_RESPONSE,
  payload: data,
});

export const editKitchenProfile = (data) => ({
  type: types.UPDATE_PROFILE,
  payload: data,
});

export const deleteKitchenProfile = (data) => ({
  type: types.DELETE_PROFILE,
  payload: data,
});
