import {all, call, put, takeLatest} from 'redux-saga/effects';
import {dispatchToasterError, dispatchToasterSuccess} from '../../../utils/Shared';
import * as ACTIONS from './ContainerAction';
import * as API from './ContainerApis';
import * as MSG from './ContainerMessages';
import * as TYPES from './ContainerTypes';

export function* createContainerSaga(action) {
  try {
    yield call(API.createContainer, action.payload);
    const response = yield call(API.containersList, action.payload);
    yield put(ACTIONS.containersListResponse(response.payload?.containers));
    dispatchToasterSuccess(MSG.containerCreatedSuccess);
  } catch (err) {
    dispatchToasterError(err?.response?.data?.message || MSG.containerCreatedFailed);
  } finally {
    yield call(action.loaderCallback);
  }
}

export function* containersListSaga(action) {
  try {
    const response = yield call(API.containersList, action.payload);
    yield put(ACTIONS.containersListResponse(response.payload));
  } catch (err) {
    dispatchToasterError(err?.response?.data?.message || MSG.containerListFailed);
  } finally {
    yield call(action.loaderCallback);
  }
}

export function* entityContainersListSaga(action) {
  try {
    const response = yield call(API.entityContainersList, action.payload);
    yield put(ACTIONS.containersListResponse(response.payload));
  } catch (err) {
    dispatchToasterError(err?.response?.data?.message || MSG.containerListFailed);
  } finally {
    yield call(action.loaderCallback);
  }
}

export function* editContainerSaga(action) {
  try {
    yield call(API.editContainer, action.payload);
    yield call(action.successCallback);
    dispatchToasterSuccess(MSG.containerEditSuccess);
  } catch (err) {
    dispatchToasterError(err?.response?.data?.message || MSG.containerEditFailed);
  } finally {
    yield call(action.loaderCallback);
  }
}

export function* deleteContainerSaga(action) {
  try {
    yield call(API.deleteContainer, action.payload);
    yield call(action.successCallback);
    dispatchToasterSuccess(MSG.containerDeleteSuccess);
  } catch (err) {
    dispatchToasterError(err?.response?.data?.message || MSG.containerDeleteFailed);
  } finally {
    yield call(action.loaderCallback);
  }
}

export function* addContainerSaga(action) {
  try {
    yield call(API.addContainer, action.payload);
    yield call(action.successCallback);
    dispatchToasterSuccess(MSG.containerAddSuccess);
  } catch (err) {
    dispatchToasterError(err?.response?.data?.message || MSG.containerListFailed);
  } finally {
    yield call(action.loaderCallback);
  }
}

export function* ContainerSagas() {
  yield all([
    takeLatest(TYPES.CREATE_CONTAINER, createContainerSaga),
    takeLatest(TYPES.CONTAINER_LIST, containersListSaga),
    takeLatest(TYPES.ENTITY_CONTAINER_LIST, entityContainersListSaga),
    takeLatest(TYPES.EDIT_CONTAINER, editContainerSaga),
    takeLatest(TYPES.DELETE_CONTAINER, deleteContainerSaga),
    takeLatest(TYPES.ADD_CONTAINER, addContainerSaga),
  ]);
}
