import * as types from './UserType';

export const userRegisterReq = (values, successCallback) => {
  console.log('We are in action get', values);
  return {
    type: types.SET_NEW_USER_REQ,
    paylode: values,
    successCallback,
  };
};

export const userRegisterRes = (value) => {
  console.log('user action resp', value);
  return {
    type: types.SET_NEW_USER_RES,
  };
};

export const userLoginReqEmail = (values, successCallback) => {
  console.log('We are in action', values);
  return {
    type: types.USER_LOGIN_EMAIL_REQ,
    paylode: values,
    successCallback,
  };
};

export const userLoginRespEmail = (value) => {
  console.log('user action resp', value);
  return {
    type: types.USER_LOGIN_EMAIL_RESP,
  };
};
// CHANGE_PASSWORD  action
export const changePassword = (values, loaderCallback, successCallback) => {
  console.log('action', values);
  return {
    type: types.CHANGE_PASSWORD,
    payload: values,
    loaderCallback,
    successCallback,
  };
  // console.log('WE ARE IN ACTION', values)
};

// export const setUsersList = (userList, successcb) => {
//   // console.log('We are in action set');
//   return {
//     type: types.GET_USER_LIST_RESP,
//     payload: userList,
//     successcb,
//   };
// };
// export const getNewUser = (value) => {
//   // console.log('We are in action get');
//   return {
//     type: types.GET_NEW_USER_REQ,
//     value,
//   };
// };
// export const setNewUser = (addUser) => {
//   // console.log('We are in action set', addUser);
//   return {
//     type: types.GET_NEW_USER_RESP,
//     payload: addUser,
//   };
// };
// export const deleteUser = (item) => {
//   console.log('We are in action delete', item);
//   return {
//     // type: types.DELETE_USER_REQ,
//     Id: item.id,
//   };
// };
// export const userDeleted = (removeUser) => {
//   // console.log('We are in action deleted', removeUser);
//   return {
//     type: types.DELETE_USER_RESP,
//     payload: removeUser,
//   };
// };

// export const updateUser = (updatevalue) => {
//   console.log('We are in action update', updatevalue);
//   return {
//     type: types.UPDATE_USER_REQ,
//     updatevalue,
//   };
// };
// export const updateUserResp = (Id) => {
//   console.log('We are in action updateresp', Id);
//   return {
//     type: types.UPDATE_USER_RESP,
//     Id,
//   };
// };
