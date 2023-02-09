import {all, call, put, takeLatest} from 'redux-saga/effects';
import {dispatchToasterError, dispatchToasterSuccess} from '../../utils/Shared';
import * as ACTIONS from './EntityAction';
import * as API from './EntityApis';
import * as MSG from './EntityMessages';
import * as TYPES from './EntityTypes';

export function* updateLocationLabelSaga(action) {
  try {
    yield call(API.updateLocationLabel, action.payload);
    const response = yield call(API.getEntityById, action.payload);
    yield put(ACTIONS.getEntityByIdResponse(response.payload));
    yield call(action.successCallback);
    dispatchToasterSuccess(MSG.updateLocationLabelSuccess);
  } catch (err) {
    dispatchToasterError(err?.response?.data?.message || MSG.updateLocationLabelFailed);
  } finally {
    yield call(action.loaderCallback);
  }
}

export function* updateFinancialCodeSaga(action) {
  try {
    yield call(API.updateFinancialCode, action.payload);
    const response = yield call(API.getEntityById, action.payload);
    yield put(ACTIONS.getEntityByIdResponse(response.payload));
    yield call(action.successCallback);
    dispatchToasterSuccess(MSG.updateFinanicalCodeSuccess);
  } catch (err) {
    dispatchToasterError(err?.response?.data?.message || MSG.updateFinanicalCodeFailed);
  } finally {
    yield call(action.loaderCallback);
  }
}

export function* updateGeneralSettingsSaga(action) {
  try {
    yield call(API.updateGeneralSettings, action.payload);
    const response = yield call(API.getEntityById, action.payload);
    yield put(ACTIONS.getEntityByIdResponse(response.payload));
    yield call(action.successCallback);
    dispatchToasterSuccess(MSG.updateGeneralSettingsSuccess);
  } catch (err) {
    dispatchToasterError(err?.response?.data?.message || MSG.updateGeneralSettingsFailed);
  } finally {
    yield call(action.loaderCallback);
  }
}

export function* categoryListSaga(action) {
  try {
    const response = yield call(API.categoryList, action.payload);
    yield put(ACTIONS.categoryListResponse(response?.payload));
  } catch (err) {
    dispatchToasterError(err?.response?.data?.message || MSG.listCategoryFailed);
  } finally {
    yield call(action.loaderCallback);
  }
}

export function* entityCategoryListSaga(action) {
  try {
    const response = yield call(API.entityCategoryList, action.payload);
    yield put(ACTIONS.entityCategoryListResponse(response?.payload));
    yield call(action.successCallback);
  } catch (err) {
    dispatchToasterError(err?.response?.data?.message || MSG.listCategoryFailed);
  } finally {
    yield call(action.loaderCallback);
  }
}

export function* addCategorySaga(action) {
  try {
    const response = yield call(API.addCategory, action.payload);
    const categoryList = yield call(API.entityCategoryList, action.payload);
    categoryList.payload.map((category) => {
      if (category.id == response.payload.id) {
        category.addEmptyTag = true;
      }
    });
    yield put(ACTIONS.entityCategoryListResponse(categoryList?.payload));
    yield call(action.successCallback);
    dispatchToasterSuccess(MSG.addCategorySuccess);
  } catch (err) {
    dispatchToasterError(err?.response?.data?.message || MSG.addCategoryFailed);
  } finally {
    yield call(action.loaderCallback);
  }
}

export function* addCategoryTagsSaga(action) {
  try {
    yield call(API.addCategoryTag, action.payload);
    const response = yield call(API.entityCategoryList, {id: action.payload.entityId});
    yield put(ACTIONS.entityCategoryListResponse(response?.payload));
    yield call(action.successCallback);
    dispatchToasterSuccess(MSG.addCategoryTagsSuccess);
  } catch (err) {
    dispatchToasterError(err?.response?.data?.message || MSG.addCategoryTagsFailed);
  } finally {
    yield call(action.loaderCallback);
  }
}

export function* getEntityByIdSaga(action) {
  try {
    const response = yield call(API.getEntityById, action.payload);
    yield put(ACTIONS.getEntityByIdResponse(response.payload));
  } catch (err) {
    dispatchToasterError(err?.response?.data?.message || MSG.getEntityByIdFailed);
  } finally {
    yield call(action.loaderCallback);
  }
}

export function* updateSetupStatusSaga(action) {
  try {
    yield call(API.updateSetupStatus, action.payload);
    yield call(action.successCallback);
  } catch (err) {
    dispatchToasterError(err?.response?.data?.message || MSG.getEntityByIdFailed);
  } finally {
    yield call(action.loaderCallback);
  }
}

export function* getEntityUnitsSaga(action) {
  try {
    const response = yield call(API.entityList, action.payload);
    yield put(ACTIONS.addEntityUnitResponse(response?.payload?.units));
  } catch (err) {
    dispatchToasterError(err?.response?.data?.message || MSG.listCategoryFailed);
  }
}

export function* EntitySagas() {
  yield all([
    takeLatest(TYPES.UPDATE_LOCATION_LABEL, updateLocationLabelSaga),
    takeLatest(TYPES.UPDATE_FINANICIAL_CODE, updateFinancialCodeSaga),
    takeLatest(TYPES.UPDATE_GENERAL_SETTINGS, updateGeneralSettingsSaga),
    takeLatest(TYPES.ADD_CATEGORY, addCategorySaga),
    takeLatest(TYPES.CATEGORY_LIST, categoryListSaga),
    takeLatest(TYPES.ADD_CATEGORY_TAG, addCategoryTagsSaga),
    takeLatest(TYPES.GET_ENTITY_BY_ID, getEntityByIdSaga),
    takeLatest(TYPES.ENTITY_CATEGORY_LIST, entityCategoryListSaga),
    takeLatest(TYPES.UPDATE_SETUP_STATUS, updateSetupStatusSaga),
    takeLatest(TYPES.GET_ENTITY_UNITS, getEntityUnitsSaga),

  ]);
}
