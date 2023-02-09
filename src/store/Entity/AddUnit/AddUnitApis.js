import axiosInstance, {microServices} from '../../../network/apis';

const BASE_URL = 'entities';
const UNITS = 'units';
const ENTITY_UNITS = 'entity-units';
const TAGS = 'tags';
const DETAILS = 'details';
const INVITE_USERS = 'invite/unit-admin';

export const getUnitList = async (data) => {
  return await axiosInstance(
    'get',
    `${BASE_URL}/${data.entityId}/${UNITS}/?page=${data.unitData.page}&page_size=${data.unitData.page_size}`,
    {
      server: microServices.GLOBAL_ADMIN_URL,
    }
  );
};

export const addUnitTags = async (data) => {
  return await axiosInstance('post', `${ENTITY_UNITS}/${data.unitId}/${TAGS}`, data.tags, {
    server: microServices.GLOBAL_ADMIN_URL,
  });
};

export const getUnitDetails = async (data) => {
  return await axiosInstance('get', `${ENTITY_UNITS}/${data.unitId}/${DETAILS}`, {
    server: microServices.GLOBAL_ADMIN_URL,
  });
};

export const inviteUsers = async (data) => {
  return await axiosInstance('post', `${INVITE_USERS}`, data.requestData, {
    server: microServices.GLOBAL_ADMIN_URL,
  });
};

export const getUnitById = async (unitData) => {
  return await axiosInstance('get', `${ENTITY_UNITS}/${unitData.unitId}/${DETAILS}`, {
    server: microServices.GLOBAL_ADMIN_URL,
  });
};

export const updateUnit = async (entityData) => {
  return await axiosInstance('put', `${ENTITY_UNITS}/${entityData.id}`, entityData.data, {
    server: microServices.GLOBAL_ADMIN_URL,
  });
};

export const addUnit = async (entityData) => {
  return await axiosInstance('post', `${BASE_URL}/${entityData.id}/units`, entityData.data, {
    server: microServices.GLOBAL_ADMIN_URL,
  });
};

export const entityUnitUserSearch = async (entityData) => {
  return await axiosInstance(
    'get',
    `${BASE_URL}/${entityData.id}/units/users/search/?keyword=${entityData.data.keyword}`,
    {
      server: microServices.GLOBAL_ADMIN_URL,
    }
  );
};

export const entityUnitsSearch = async (entityData) => {
  return await axiosInstance(
    'get',
    `${BASE_URL}/${entityData.id}/units/search/?keyword=${entityData.data.keyword}`,
    entityData.data,
    {
      server: microServices.GLOBAL_ADMIN_URL,
    }
  );
};
