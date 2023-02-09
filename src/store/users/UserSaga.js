import * as ACTIONS from './UserAction';
import * as TYPES from './UserType';
import * as API from './UserApis';
import * as MSG from './UserMessages';

import { call, put, takeLatest, all } from 'redux-saga/effects';
import {
  dispatchToasterError,
  dispatchToasterSuccess,
} from '../../utils/Shared';

// export function* getUserSaga(action) {
//   // yield console.log('userSaga', action);
//   try {
//     const response = yield call(API.getUserApi, action.payload);
//     // console.log(response);
//     yield put(ACTIONS.setUsersList(response));
//     // yield call(action.successcb);
//   } catch (err) {
//     // error handler
//   }
// }

export function* addNewUserSaga(action) {
  console.log('userSaga', action);
  try {
    const response = yield call(API.postUserApi, action.paylode);
    yield console.log('saga', response);
    if (action.successCallback) {
      yield call(action.successCallback);
    }
    // callfunction
    dispatchToasterSuccess(MSG.createUserdSuccess);
    yield put(ACTIONS.userRegisterRes(response));
    // yield call(action.successcb);
  } catch (err) {
    dispatchToasterError(err?.response?.data?.message || MSG.createUserdFaild);
    // error handler
  }
}
export function* userEmaliLogin(action) {
  console.log('userSaga', action);
  try {
    const response = yield call(API.loginUserEmailApi, action.paylode);
    yield console.log('login saga', response);
    if (action.successCallback) {
      yield call(action.successCallback);
    }
    // callfunction
    dispatchToasterSuccess(MSG.createUserdSuccess);
    yield put(ACTIONS.userRegisterRes(response));
    // yield call(action.successcb);
  } catch (err) {
    dispatchToasterError(err?.response?.data?.message);
    // error handler
  }
}

//CHANGE PASSWORD
export function* changePasswordSaga(action) {
  console.log('saga', action);
  try {
    // debugger
    yield call(API.changePassword, action.payload);
    dispatchToasterSuccess(MSG.changePasswordSuccess);
    yield call(action.successCallback);
  } catch (err) {
    dispatchToasterError(
      err?.response?.data?.message || MSG.changePasswordFailed
    );
  } finally {
    yield call(action.loaderCallback);
  }
}

// export function* deleteUserSaga(action) {
//   // yield console.log('DELETESAGA', action);
//   try {
//     const response = yield call(API.deleteUserApi, action.Id);
//     yield console.log('response', response);
//     yield put(ACTIONS.userDeleted(action.Id));
//   } catch (err) {
//     // error
//   }
// }

// export function* updateUserSaga(action) {
//   // console.log('userSaga', action);
//   try {
//     const response = yield call(API.updateUserApi, action.value);
//     // yield console.log('saga', response);
//     yield put(ACTIONS.updateUserResp(response));
//     // yield call(action.successcb);
//   } catch (err) {
//     // error handler
//   }
// }

export function* UserSagas() {
  yield all([
    takeLatest(TYPES.SET_NEW_USER_REQ, addNewUserSaga),
    takeLatest(TYPES.USER_LOGIN_EMAIL_REQ, userEmaliLogin),
    takeLatest(TYPES.CHANGE_PASSWORD, changePasswordSaga),
    // takeLatest(TYPES.GET_USER_LIST_REQ, getUserSaga),
    // takeLatest(TYPES.DELETE_USER_REQ, deleteUserSaga),
    // takeLatest(TYPES.GET_NEW_USER_REQ, getNewUserSaga),
    // takeLatest(TYPES.UPDATE_USER_REQ, updateUserSaga),
  ]);
}
