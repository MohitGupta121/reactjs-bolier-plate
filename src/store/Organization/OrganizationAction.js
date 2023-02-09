import * as types from './OrganizationTypes';

export const createOrganization = (filter, loaderCallback, successCallback) => ({
  type: types.CREATE_ORGANIZATION,
  payload: filter,
  loaderCallback,
  successCallback,
});

export const organizationList = (data, loaderCallback, successCallback) => ({
  type: types.ORGANIZATION_LIST,
  payload: data,
  loaderCallback,
  successCallback,
});

export const selectOrganization = (data) => {
  return {
    type: types.SELECT_ORGANIZATION,
    payload: data,
  };
};

export const organizationListResponse = (data) => ({
  type: types.ORGANIZATION_LIST_RESPONSE,
  payload: data,
});

export const editOrganization = (data) => ({
  type: types.EDIT_ORGANIZATION,
  payload: data,
});

export const deleteOrganization = (data) => ({
  type: types.DELETE_ORGANIZATION,
  payload: data,
});

export const createOrganizationUsers = (filter, loaderCallback, successCallback) => ({
  type: types.CREATE_ORGANIZATION_USERS,
  payload: filter,
  loaderCallback,
  successCallback,
});

export const createOrganizationUsersSuccess = (filter) => ({
  type: types.CREATE_ORGANIZATION_USERS_SUCCESS,
  payload: filter,
});

export const organizationUsersList = (data, loaderCallback, successCallback) => ({
  type: types.ORGANIZATION_USERS_LIST,
  payload: data,
  loaderCallback,
  successCallback,
});

export const organizationUsersListResponse = (data) => ({
  type: types.ORGANIZATION_USERS_LIST_RESPONSE,
  payload: data,
});

export const editOrganizationUsers = (data) => ({
  type: types.EDIT_ORGANIZATION_USERS,
  payload: data,
});

export const deleteOrganizationUsers = (data) => ({
  type: types.DELETE_ORGANIZATION_USERS,
  payload: data,
});

export const createOrganizationEntity = (filter, loaderCallback, successCallback) => ({
  type: types.CREATE_ORGANIZATION_ENTITY,
  payload: filter,
  loaderCallback,
  successCallback,
});

export const createOrganizationEntityUsers = (filter, loaderCallback, successCallback) => ({
  type: types.CREATE_ORGANIZATION_ENTITY_USERS,
  payload: filter,
  loaderCallback,
  successCallback,
});

export const createOrganizationEntityUsersSuccess = (filter) => ({
  type: types.CREATE_ORGANIZATION_ENTITY_USERS_SUCCESS,
  payload: filter,
});

export const organizationEntityList = (data, loaderCallback, successCallback) => ({
  type: types.ORGANIZATION_ENTITY_LIST,
  payload: data,
  loaderCallback,
  successCallback,
});

export const organizationEntityListResponse = (data) => ({
  type: types.ORGANIZATION_ENTITY_LIST_RESPONSE,
  payload: data,
});

export const entityListResponse = (data) => ({
  type: types.ENTITY_LIST_RESPONSE,
  payload: data,
});
