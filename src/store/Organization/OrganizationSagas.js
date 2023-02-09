import {all, call, put, takeLatest} from 'redux-saga/effects';
import Auth from '../../utils/Auth';
import {USER_TYPES} from '../../utils/Enum';
import {dispatchToasterError, dispatchToasterSuccess} from '../../utils/Shared';
import * as ACTIONS from './OrganizationAction';
import * as API from './OrganizationApis';
import * as MSG from './OrganizationMessages';
import * as TYPES from './OrganizationTypes';

export function* createOrganizationSaga(action) {
  try {
    const createOrgResp = yield call(API.createOrganization, action.payload);
    const response = yield call(API.organizationList, action.payload);
    yield put(ACTIONS.organizationListResponse(response.payload?.organizations));
    if (createOrgResp.payload?.organization?.id) {
      yield put(ACTIONS.selectOrganization(createOrgResp.payload?.organization?.id));
    }
    if (action.payload?.users_info?.length) {
      dispatchToasterSuccess(MSG.organizationCreatedAndInvitedSuccess);
    } else {
      dispatchToasterSuccess(MSG.organizationCreatedSuccess);
    }

    yield call(action.successCallback);
  } catch (err) {
    const errorMsg = err.response.data?.payload?.name;
    dispatchToasterError(errorMsg || err?.response?.data?.message || MSG.organizationCreatedFailed);
  } finally {
    yield call(action.loaderCallback);
  }
}

export function* organizationListSaga(action) {
  try {
    const response = yield call(API.organizationList, action.payload);
    yield put(ACTIONS.organizationListResponse(response.payload?.organizations));
    if (
      (response.payload?.organizations.length &&
        !Auth.getRoles().includes(USER_TYPES.ORGANIZATION_ADMIN)) ||
      response.payload?.organizations.length === 1
    ) {
      yield put(ACTIONS.selectOrganization(response.payload?.organizations[0].id));
    }
  } catch (err) {
    dispatchToasterError(err?.response?.data?.message || MSG.organizationListFailed);
  } finally {
    yield call(action.loaderCallback);
  }
}

export function* editOrganizationSaga(action) {
  try {
    yield call(API.editOrganization, action.payload);
    yield call(action.successCallback);
    dispatchToasterSuccess(MSG.organizationEditSuccess);
  } catch (err) {
    dispatchToasterError(err?.response?.data?.message || MSG.organizationEditFailed);
  } finally {
    yield call(action.loaderCallback);
  }
}

export function* deleteOrganizationSaga(action) {
  try {
    yield call(API.deleteOrganization, action.payload);
    yield call(action.successCallback);
    dispatchToasterSuccess(MSG.organizationDeleteSuccess);
  } catch (err) {
    dispatchToasterError(err?.response?.data?.message || MSG.organizationDeleteFailed);
  } finally {
    yield call(action.loaderCallback);
  }
}

export function* createOrganizationUsersSaga(action) {
  try {
    const response = yield call(API.createOrganizationUsers, action.payload);
    const successUsers = yield call(API.organizationUsersList, {
      id: action.payload.requestData.invite_id,
    });
    const erroredUsers = response.payload?.filter((user) => user.error) || [response.message] || [];
    const allUsers = [...successUsers.payload.users, ...erroredUsers];
    yield put(ACTIONS.createOrganizationUsersSuccess(allUsers));
    yield call(action.successCallback);
    if (!erroredUsers.length) {
      dispatchToasterSuccess(MSG.organizationUsersCreatedSuccess);
    }
  } catch (err) {
    dispatchToasterError(err?.response?.data?.message || MSG.organizationUsersCreatedFailed);
  } finally {
    yield call(action.loaderCallback);
  }
}

export function* organizationUsersListSaga(action) {
  try {
    const response = yield call(API.organizationUsersList, action.payload);
    yield put(ACTIONS.organizationUsersListResponse(response.payload));
  } catch (err) {
    dispatchToasterError(err?.response?.data?.message || MSG.organizationUsersListFailed);
  } finally {
    yield call(action.loaderCallback);
  }
}

export function* editOrganizationUsersSaga(action) {
  try {
    yield call(API.editOrganization, action.payload);
    yield call(action.successCallback);
    dispatchToasterSuccess(MSG.organizationUsersEditSuccess);
  } catch (err) {
    dispatchToasterError(err?.response?.data?.message || MSG.organizationUsersEditFailed);
  } finally {
    yield call(action.loaderCallback);
  }
}

export function* deleteOrganizationUsersSaga(action) {
  try {
    yield call(API.deleteOrganizationUsers, action.payload);
    yield call(action.successCallback);
    dispatchToasterSuccess(MSG.organizationUsersDeleteSuccess);
  } catch (err) {
    dispatchToasterError(err?.response?.data?.message || MSG.organizationUsersDeleteSuccess);
  } finally {
    yield call(action.loaderCallback);
  }
}

export function* createOrganizationEntitySaga(action) {
  try {
    yield call(API.createOrganizationEntity, action.payload);
    const response = yield call(API.entityList, {
      id: action.payload.organization_id,
    });
    yield put(ACTIONS.organizationEntityListResponse(response.payload));
    if (action.payload?.users_info?.length) {
      dispatchToasterSuccess(MSG.entityCreatedAndInvitedSuccess);
    } else {
      dispatchToasterSuccess(MSG.entityCreatedSuccess);
    }
    yield call(action.successCallback);
  } catch (err) {
    const errorMsg = err.response.data?.payload?.name;
    dispatchToasterError(errorMsg || err?.response?.data?.message || MSG.entityCreatedFailed);
  } finally {
    yield call(action.loaderCallback);
  }
}

export function* createOrganizationEntityUsersSaga(action) {
  try {
    const response = yield call(API.createOrganizationEntityUsers, action.payload);
    const entityListResponse = yield call(API.entityList, {
      id: action.payload.organization_id,
    });
    const successUsers = entityListResponse.payload.entities.filter(
      (user) => user.id === action.payload.invite_id
    );
    const erroredUsers = response.payload?.filter((user) => user.error);
    const allUsers = [...successUsers[0].users, ...erroredUsers];
    yield put(
      ACTIONS.createOrganizationEntityUsersSuccess({
        allUsers,
        id: action.payload.invite_id,
      })
    );
    yield call(action.successCallback);
    if (!erroredUsers.length) {
      dispatchToasterSuccess(MSG.entityUsersCreatedSuccess);
    }
  } catch (err) {
    dispatchToasterError(err?.response?.data?.message || MSG.entityUsersCreatedFailure);
  } finally {
    yield call(action.loaderCallback);
  }
}

export function* entityListSaga(action) {
  try {
    const response = yield call(API.entityList, action.payload);
    action.payload.id
      ? yield put(ACTIONS.organizationEntityListResponse(response.payload))
      : yield put(ACTIONS.entityListResponse(response.payload));
  } catch (err) {
    dispatchToasterError(err?.response?.data?.message || MSG.organizationUsersListFailed);
  } finally {
    yield call(action.loaderCallback);
  }
}

export function* OrganizationSagas() {
  yield all([
    takeLatest(TYPES.CREATE_ORGANIZATION, createOrganizationSaga),
    takeLatest(TYPES.ORGANIZATION_LIST, organizationListSaga),
    takeLatest(TYPES.EDIT_ORGANIZATION, editOrganizationSaga),
    takeLatest(TYPES.DELETE_ORGANIZATION, deleteOrganizationSaga),
    takeLatest(TYPES.CREATE_ORGANIZATION_USERS, createOrganizationUsersSaga),
    takeLatest(TYPES.ORGANIZATION_USERS_LIST, organizationUsersListSaga),
    takeLatest(TYPES.EDIT_ORGANIZATION_USERS, editOrganizationUsersSaga),
    takeLatest(TYPES.DELETE_ORGANIZATION_USERS, deleteOrganizationUsersSaga),
    takeLatest(TYPES.CREATE_ORGANIZATION_ENTITY, createOrganizationEntitySaga),
    takeLatest(TYPES.CREATE_ORGANIZATION_ENTITY_USERS, createOrganizationEntityUsersSaga),
    takeLatest(TYPES.ORGANIZATION_ENTITY_LIST, entityListSaga),
  ]);
}
