import {all, call, put, takeLatest} from 'redux-saga/effects';
import {dispatchToasterError} from '../../../utils/Shared';
import * as ACTIONS from './MiscellaneousAction';
import * as API from './MiscellaneousApis';
import * as MSG from './MiscellaneousMessages';
import * as TYPES from './MiscellaneousTypes';

export function* languageListSaga(action) {
  try {
    const response = yield call(API.languageList, action.payload);
    yield put(ACTIONS.languageListResponse(response.payload));
    yield call(action.successCallback);
  } catch (err) {
    dispatchToasterError(err?.response?.data?.message || MSG.organizationListFailed);
  } finally {
    yield call(action.loaderCallback);
  }
}

export function* countryListSaga(action) {
  try {
    const response = yield call(API.countryList, action.payload);
    yield put(ACTIONS.countryListResponse(response.payload));
  } catch (err) {
    dispatchToasterError(err?.response?.data?.message || MSG.organizationListFailed);
  } finally {
    yield call(action.loaderCallback);
  }
}

export function* stateListSaga(action) {
  try {
    const response = yield call(API.stateList, action.payload);
    yield put(ACTIONS.stateListResponse(response.payload));
  } catch (err) {
    dispatchToasterError(err?.response?.data?.message || MSG.organizationListFailed);
  }
}

export function* cityListSaga(action) {
  try {
    const response = yield call(API.cityList, action.payload);
    yield put(ACTIONS.cityListResponse(response.payload));
  } catch (err) {
    dispatchToasterError(err?.response?.data?.message || MSG.organizationListFailed);
  }
}

export function* measurementListSaga(action) {
  try {
    const response = yield call(API.measurementList, action.payload);
    yield put(ACTIONS.measurementListResponse(response.payload));
    yield call(action.successCallback);
  } catch (err) {
    dispatchToasterError(err?.response?.data?.message || MSG.organizationListFailed);
  } finally {
    yield call(action.loaderCallback);
  }
}

export function* MiscellaneousSagas() {
  yield all([
    takeLatest(TYPES.LANGUAGE_LIST, languageListSaga),
    takeLatest(TYPES.COUNTRY_LIST, countryListSaga),
    takeLatest(TYPES.STATE_LIST, stateListSaga),
    takeLatest(TYPES.CITY_LIST, cityListSaga),
    takeLatest(TYPES.MEASUREMENT_LIST, measurementListSaga),
  ]);
}
