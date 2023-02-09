import {all, call, put, takeLatest} from 'redux-saga/effects';
import {dispatchToasterError} from '../../utils/Shared';
import * as ACTIONS from './UnitUserAction';
import * as API from './UnitUserApis';
import * as MSG from './UnitUserMessages';
import * as TYPES from './UnitUserTypes';

export function* unitListSaga(action) {
  try {
    const response = yield call(API.unitList, action.payload);
    yield put(ACTIONS.unitUserListResponse(response.payload));
  } catch (err) {
    dispatchToasterError(err?.response?.data?.message || MSG.unitListFailed);
  } finally {
    yield call(action.loaderCallback);
  }
}

export function* unitDetailsByIdSaga(action) {
  try {
    const response = yield call(API.unitDetailsById, action.payload);
    yield put(ACTIONS.unitDetailsByIdResponse(response.payload));
  } catch (err) {
    dispatchToasterError(err?.response?.data?.message || MSG.unitDetailsByIdFailed);
  } finally {
    yield call(action.loaderCallback);
  }
}

export function* UnitUserSagas() {
  yield all([
    takeLatest(TYPES.UNIT_USER_LIST, unitListSaga),
    takeLatest(TYPES.UNIT_DETAILS_BY_ID, unitDetailsByIdSaga),
  ]);
}
