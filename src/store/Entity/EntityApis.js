import axiosInstance, {microServices} from '../../network/apis';

const BASE_URL = 'entity';
const LOCATION_LABEL = `${BASE_URL}/update-location`;
const FINANCIAL_CODE = `${BASE_URL}/update-financial-code`;
const GENERAL_SETTINGS = `${BASE_URL}/update-general-setting`;
const UPDATE_SETUP_STATUS = `${BASE_URL}/update-setup-status`;
const ADD_CATEGORY_TAG = 'tag/store';
const CATEGORY_LIST = 'category/list';
const ADD_CATEGORY = 'entity-category/store';
const ENTITY_CATEGORY_LIST = 'entity-category/list';
const UNITS = 'entities/25/units';

export const updateLocationLabel = async (entityData) => {
  return await axiosInstance('put', `${LOCATION_LABEL}/${entityData.id}`, entityData.data, {
    server: microServices.GLOBAL_ADMIN_URL,
  });
};

export const updateFinancialCode = async (entityData) => {
  return await axiosInstance('put', `${FINANCIAL_CODE}/${entityData.id}`, entityData.data, {
    server: microServices.GLOBAL_ADMIN_URL,
  });
};

export const updateGeneralSettings = async (entityData) => {
  return await axiosInstance('put', `${GENERAL_SETTINGS}/${entityData.id}`, entityData.data, {
    server: microServices.GLOBAL_ADMIN_URL,
  });
};

export const addCategory = async (entityData) => {
  return await axiosInstance('put', `${ADD_CATEGORY}/${entityData.id}`, entityData.data, {
    server: microServices.GLOBAL_ADMIN_URL,
  });
};

export const entityCategoryList = async (entityData) => {
  return await axiosInstance('get', `${ENTITY_CATEGORY_LIST}/${entityData.id}`, {
    server: microServices.GLOBAL_ADMIN_URL,
  });
};

export const addCategoryTag = async (categoryData) => {
  return await axiosInstance('put', `${ADD_CATEGORY_TAG}/${categoryData.id}`, categoryData.data, {
    server: microServices.GLOBAL_ADMIN_URL,
  });
};

export const getEntityById = async (entityData) => {
  return await axiosInstance('get', `${BASE_URL}/${entityData.id}`, {
    server: microServices.GLOBAL_ADMIN_URL,
  });
};

export const categoryList = async (data) => {
  return await axiosInstance('get', `${CATEGORY_LIST}/${data.id}`, {
    server: microServices.GLOBAL_ADMIN_URL,
  });
};

export const updateSetupStatus = async (entityData) => {
  return await axiosInstance('put', `${UPDATE_SETUP_STATUS}/${entityData.id}`, entityData.data, {
    server: microServices.GLOBAL_ADMIN_URL,
  });
};

export const entityList = async () => {
  return await axiosInstance('get', `${UNITS}`, {
    server: microServices.GLOBAL_ADMIN_URL,
  });
};
