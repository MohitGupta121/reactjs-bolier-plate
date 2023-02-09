import * as types from './ContainerTypes';

export const createContainer = (filter, loaderCallback, successCallback) => ({
  type: types.CREATE_CONTAINER,
  payload: filter,
  loaderCallback,
  successCallback,
});

export const containersList = (data, loaderCallback, successCallback) => ({
  type: types.CONTAINER_LIST,
  payload: data,
  loaderCallback,
  successCallback,
});

export const entityContainersList = (
  data,
  loaderCallback,
  successCallback
) => ({
  type: types.ENTITY_CONTAINER_LIST,
  payload: data,
  loaderCallback,
  successCallback,
});

export const selectContainer = (data) => ({
  type: types.SELECT_CONTAINER,
  payload: data,
});

export const containersListResponse = (data) => ({
  type: types.CONTAINER_LIST_RESPONSE,
  payload: data,
});

export const editContainer = (data) => ({
  type: types.EDIT_CONTAINER,
  payload: data,
});

export const deleteContainer = (data) => ({
  type: types.DELETE_CONTAINER,
  payload: data,
});

export const addContainer = (filter, loaderCallback, successCallback) => ({
  type: types.ADD_CONTAINER,
  payload: filter,
  loaderCallback,
  successCallback,
});
