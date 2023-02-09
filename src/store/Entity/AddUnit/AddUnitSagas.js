import {all, call, put, takeLatest} from 'redux-saga/effects';
import {dispatchToasterError, dispatchToasterSuccess} from '../../../utils/Shared';
import * as ACTIONS from './AddUnitAction';
import * as API from './AddUnitApis';
import * as MSG from './AddUnitMessage';
import * as TYPES from './AddUnitTypes';

export function* getUnitListSaga(action) {
  try {
    const response = yield call(API.getUnitList, action.payload);
    yield put(ACTIONS.unitListResponse(response.payload));
  } catch (err) {
    dispatchToasterError(err?.response?.data?.message || MSG.addUnitFailed);
  } finally {
    yield call(action.loaderCallback);
  }
}

export function* addUnitTagSaga(action) {
  try {
    yield call(API.addUnitTags, action.payload);
    const response = yield call(API.getUnitById, action.payload);
    yield put(ACTIONS.getUnitByIdResponse(response.payload));
    dispatchToasterSuccess(MSG.addUnitTagSuccess);
    yield call(action.successCallback);
  } catch (err) {
    dispatchToasterError(err?.response?.data?.message || MSG.addUnitFailed);
  } finally {
    yield call(action.loaderCallback);
  }
}

export function* getUnitDetailsSaga(action) {
  try {
    yield call(API.getUnitDetails, action.payload);
  } catch (err) {
    dispatchToasterError(err?.response?.data?.message || MSG.addUnitFailed);
  } finally {
    yield call(action.loaderCallback);
  }
}

export function* inviteUsersSaga(action) {
  try {
    yield call(API.inviteUsers, action.payload);
    const response = yield call(API.getUnitById, action.payload);
    yield put(ACTIONS.getUnitByIdResponse(response.payload));
    dispatchToasterSuccess(MSG.inviteUserSuccess);
  } catch (err) {
    dispatchToasterError(err?.response?.data?.message || MSG.inviteUserFailure);
  } finally {
    yield call(action.loaderCallback);
  }
}

export function* getUnitByIdSaga(action) {
  try {
    const response = yield call(API.getUnitById, action.payload);
    yield put(ACTIONS.getUnitByIdResponse(response.payload));
  } catch (err) {
    dispatchToasterError(err?.response?.data?.message || MSG.getUnitByIdFailed);
  } finally {
    yield call(action.loaderCallback);
  }
}

export function* updateUnitSaga(action) {
  try {
    yield call(API.updateUnit, action.payload);
    const response = yield call(API.getUnitById, {unitId: action.payload.id});
    yield put(ACTIONS.getUnitByIdResponse(response.payload));
    yield call(action.successCallback);

    dispatchToasterSuccess(MSG.updateUnitSuccess);
  } catch (err) {
    dispatchToasterError(err?.response?.data?.message || MSG.updateUnitFailed);
  } finally {
    yield call(action.loaderCallback);
  }
}

export function* addUnitSaga(action) {
  try {
    const response = yield call(API.addUnit, action.payload);
    yield put(ACTIONS.addUnitResponse(response.payload));
    yield call(action.successCallback);
    dispatchToasterSuccess(MSG.addUnitSuccess);
  } catch (err) {
    const error = err?.response?.data?.payload?.name[0];
    dispatchToasterError(error || err?.response?.data?.message || MSG.addUnitFailed);
  } finally {
    yield call(action.loaderCallback);
  }
}

export function* unitManagementDetailsSaga(action) {
  try {
    const response = yield call(API.getUnitList, action.payload);
    yield put(ACTIONS.unitManagementResponse(response.payload.units));
  } catch (err) {
    dispatchToasterError(err?.response?.data?.message || MSG.addUnitFailed);
  } finally {
    yield call(action.loaderCallback);
  }
}

export function* entityUnitUsersSearchSaga(action) {
  try {
    const response = yield call(API.entityUnitUserSearch, action.payload);
    yield put(ACTIONS.searchEntityUnitUsersResponse(response.payload));
  } catch (err) {
    dispatchToasterError(err?.response?.data?.message || MSG.addUnitFailed);
  } finally {
    yield call(action.loaderCallback);
  }
}

export function* entityUnitsSearchSaga(action) {
  try {
    const response = yield call(API.entityUnitsSearch, action.payload);
    yield put(ACTIONS.searchEntityUnitsResponse(response.payload));
  } catch (err) {
    dispatchToasterError(err?.response?.data?.message || MSG.addUnitFailed);
  } finally {
    yield call(action.loaderCallback);
  }
}

export function* AddUnitSagas() {
  yield all([
    takeLatest(TYPES.ADD_UNIT, addUnitSaga),
    takeLatest(TYPES.UNIT_LIST, getUnitListSaga),
    takeLatest(TYPES.ADD_UNIT_TAG, addUnitTagSaga),
    takeLatest(TYPES.INVITE_USERS, inviteUsersSaga),
    takeLatest(TYPES.GET_UNIT_BY_ID, getUnitByIdSaga),
    takeLatest(TYPES.UNIT_DETAILS, getUnitDetailsSaga),
    takeLatest(TYPES.ENTITY_UNIT_SEARCH_REQUEST, entityUnitsSearchSaga),
    takeLatest(TYPES.UNIT_MANAGEMENT_REQUEST, unitManagementDetailsSaga),
    takeLatest(TYPES.ENTITY_UNIT_USER_SEARCH_REQUEST, entityUnitUsersSearchSaga),
    takeLatest(TYPES.UPDATE_UNIT, updateUnitSaga),
  ]);
}
