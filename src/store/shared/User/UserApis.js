import axiosInstance, { microServices } from '../../../network/apis';

const LOGIN = 'login';
const RESET_PASSWORD = 'reset-password';
const CREATE_PASSWORD = 'create-password';
const LOGOUT = 'logout';
const INVITE = 'invite';
const VALIDATE = 'validate-invite-token';
const ACCEPT_INVITE = 'invite/accept';
const CHANGE_PASSWORD = 'change-password';

export const login = async (loginData) => {
  return await axiosInstance('post', `${LOGIN}`, loginData, {
    server: microServices.GLOBAL_ADMIN_URL,
  });
};

export const createPassword = async (data) => {
  return await axiosInstance('post', `${CREATE_PASSWORD}`, data, {
    server: microServices.GLOBAL_ADMIN_URL,
  });
};

export const resetPassword = async (data) => {
  return await axiosInstance('post', `${RESET_PASSWORD}`, data, {
    server: microServices.GLOBAL_ADMIN_URL,
  });
};



export const logout = async (data) => {
  return await axiosInstance('post', `${LOGOUT}`, data, {
    server: microServices.GLOBAL_ADMIN_URL,
  });
};

export const acceptInvite = async (data) => {
  return await axiosInstance('put', `${ACCEPT_INVITE}`, data, {
    server: microServices.GLOBAL_ADMIN_URL,
  });
};

export const inviteUser = async (data) => {
  return await axiosInstance(
    'post',
    `${INVITE}/${data.role}`,
    data.requestData,
    {
      server: microServices.GLOBAL_ADMIN_URL,
    }
  );
};

export const validateInvite = async (data) => {
  return await axiosInstance('post', `${VALIDATE}`, data, {
    server: microServices.GLOBAL_ADMIN_URL,
  });
};
