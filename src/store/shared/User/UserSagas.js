import { all, call, put, takeLatest } from 'redux-saga/effects';
import Auth from '../../../utils/Auth';
import { dispatchToasterError, dispatchToasterSuccess } from '../../../utils/Shared';
import * as ACTIONS from './UserAction';
import * as API from './UserApis';
import * as MSG from './UserMessages';
import * as TYPES from './UserTypes';

export function* loginSaga(action) {
  try {
    const response = yield call(API.login, action.payload);
    yield call(Auth.signIn, response?.payload || {});
    if (action.successCallback) {
      yield call(action.successCallback);
    }
    yield put(ACTIONS.loginResponse());
    dispatchToasterSuccess(MSG.loginSuccess);
  } catch (err) {
    yield call(Auth.signOut);
    dispatchToasterError(err?.response?.data?.message || MSG.loginFailed);
  } finally {
    if (action.loaderCallback) {
      yield call(action.loaderCallback);
    }
  }
}

export function* resetPasswordSaga(action) {
  try {
    yield call(API.resetPassword, action.payload);
    dispatchToasterSuccess(MSG.resetPasswordSuccess);
    yield call(action.successCallback);
  } catch (err) {
    dispatchToasterError(err?.response?.data?.message || MSG.resetPasswordFailed);
  } finally {
    yield call(action.loaderCallback);
  }
}



export function* createPasswordSaga(action) {
  try {
    const response = yield call(API.createPassword, action.payload);
    yield call(Auth.signIn, response?.payload || {});
    dispatchToasterSuccess(MSG.createPasswordSuccess);
    yield call(action.successCallback);
  } catch (err) {
    dispatchToasterError(err?.response?.data?.message || MSG.createPasswordFailed);
  } finally {
    yield call(action.loaderCallback);
  }
}

export function* logoutSaga(action) {
  try {
    if (Auth.isAuth) {
      yield call(API.logout, action.payload);
    }
    yield call(Auth.signOut);
    dispatchToasterSuccess(MSG.logoutSuccess);
    if (action.successCallback) {
      yield call(action.successCallback);
    }
  } catch (err) {
    dispatchToasterError(err?.response?.data?.message || MSG.logoutFailed);
  } finally {
    yield call(action.loaderCallback);
  }
}

export function* acceptInviteSaga(action) {
  try {
    yield call(API.acceptInvite, action.payload);
    dispatchToasterSuccess(MSG.acceptInviteSuccess);
    if (action.successCallback) {
      yield call(action.successCallback);
    }
    yield put(ACTIONS.acceptInviteResponse());
    if (action.successCallback) {
      yield call(action.successCallback);
    }
    dispatchToasterSuccess(MSG.loginSuccess);
  } catch (err) {
    yield put(ACTIONS.acceptInviteResponse());
    dispatchToasterError(err?.response?.data?.message || MSG.acceptInviteFailed);
  } finally {
    if (action.loaderCallback) {
      yield call(action.loaderCallback);
    }
  }
}

export function* validateInviteToken(action) {
  try {
    const response = yield call(API.validateInvite, action.payload);
    if (response.success) {
      if (response.payload?.user_data) {
        const loggedInUser = Auth.getLoggedInUser();
        if (loggedInUser?.id !== response.payload?.user_data.id) {
          Auth.signOut();
        } else {
          Auth.setUserData(response.payload?.user_data);
        }
      }
      if (response.payload?.redirect_to_login) {
        yield put(ACTIONS.validateInviteRedirect(response.payload?.redirect_to_login));
      }
      yield put(ACTIONS.validateInviteSuccess(response.payload?.user_data));
    } else {
      yield put(ACTIONS.validateInviteError(response?.payload?.invite_type));
    }
  } catch (err) {
    const error =
      (err?.response?.data?.payload?.invite_type?.length &&
        err?.response?.data?.payload?.invite_type[0]) ||
      err?.response?.data?.message ||
      MSG.invalidInviteToken;
    yield put(ACTIONS.validateInviteError(error));
    dispatchToasterError(error);
  } finally {
    yield call(action.loaderCallback);
  }
}

export function* inviteUser(action) {
  try {
    yield call(API.inviteUser, action.payload);
    yield call(action.successCallback);
    dispatchToasterSuccess(MSG.inviteUserSuccess);
  } catch (err) {
    dispatchToasterError(err?.response?.data?.message || MSG.invalidInviteToken);
  } finally {
    yield call(action.loaderCallback);
  }
}

export function* UserSagas() {
  yield all([
    takeLatest(TYPES.LOGIN_REQUEST, loginSaga),
    takeLatest(TYPES.LOGOUT_REQUEST, logoutSaga),
    takeLatest(TYPES.ACCEPT_INVITE, acceptInviteSaga),
    takeLatest(TYPES.CREATE_PASSWORD_REQUEST, createPasswordSaga),
    takeLatest(TYPES.RESET_PASSWORD_REQUEST, resetPasswordSaga),
    takeLatest(TYPES.VALIDATE_INVITE, validateInviteToken),
    takeLatest(TYPES.INVITE_USER, inviteUser),
  ]);
}
