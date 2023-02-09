import * as ACTIONS from './IndustryAction';
import * as TYPES from './IndustryType';
import * as API from './IndustryApis';

import { call, put, takeLatest, all } from 'redux-saga/effects';

export function* createNewIndustrySaga(action) {
  console.log('userSaga', action);
  try {
    const response = yield call(API.createIndustryApi, action.paylode);
    yield console.log('saga', response);
    // callfunction
    yield put(ACTIONS.createIndustryRes(response));
    // yield call(action.successcb);
  } catch (err) {
    // error handler
  }
}

export function* IndustrySagas() {
  yield all([takeLatest(TYPES.SET_NEW_INDUSTRY_REQ, createNewIndustrySaga)]);
}
