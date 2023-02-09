import * as types from './UserTypes';

export const login = (loginData, loaderCallback, successCallback) => ({
  type: types.LOGIN_REQUEST,
  payload: loginData,
  loaderCallback,
  successCallback,
});

export const createPassword = (data, loaderCallback, successCallback) => ({
  type: types.CREATE_PASSWORD_REQUEST,
  payload: data,
  loaderCallback,
  successCallback,
});

export const resetPassword = (data, loaderCallback, successCallback) => ({
  type: types.RESET_PASSWORD_REQUEST,
  payload: data,
  loaderCallback,
  successCallback,
});

export const inviteUser = (data, loaderCallback, successCallback) => ({
  type: types.INVITE_USER,
  payload: data,
  loaderCallback,
  successCallback,
});

export const validateInvite = (data, loaderCallback, successCallback) => ({
  type: types.VALIDATE_INVITE,
  payload: data,
  loaderCallback,
  successCallback,
});

export const validateInviteSuccess = (data, loaderCallback, successCallback) => ({
  type: types.VALIDATE_INVITE_SUCCESS,
  payload: data,
  loaderCallback,
  successCallback,
});

export const validateInviteError = (data) => ({
  type: types.VALIDATE_INVITE_ERROR,
  payload: data,
});

export const validateInviteRedirect = (data) => ({
  type: types.VALIDATE_INVITE_REDIRECT,
  payload: data,
});

export const logout = (data, loaderCallback, successCallback) => ({
  type: types.LOGOUT_REQUEST,
  loaderCallback,
  successCallback,
});

export const acceptInvite = (data, loaderCallback, successCallback) => ({
  type: types.ACCEPT_INVITE,
  payload: data,
  loaderCallback,
  successCallback,
});

export const acceptInviteResponse = (data, loaderCallback, successCallback) => ({
  type: types.ACCEPT_INVITE_RESPONSE,
  loaderCallback,
  successCallback,
});

export const setShowPendingInviteDialog = (data) => ({
  type: types.SET_SHOW_PENDING_INVITE_DIALOG,
  payload: data,
});

export const loginResponse = () => ({
  type: types.LOGIN_RESPONSE,
});

export const redirectToLogin = () => ({
  type: types.REDIRECT_TO_LOGIN,
});

//USER_REGISTER_REQ action
export const userRegister = (data, loaderCallback, successCallback) => ({
  type: types.USER_REGISTER_REQ,
  payload: data,
  loaderCallback,
  successCallback,
});


