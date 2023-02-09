import axiosInstance, {microServices} from '../../network/apis';

const BASE_URL = 'organization';
const ORG_USERS_URL = `${BASE_URL}/admin-list`;
const CREATE_ORGANIZATION = `${BASE_URL}/create`;
const ORGANIZATION_LIST = `${BASE_URL}/list`;
const EDIT_ORGANIZATION = `${BASE_URL}/edit`;
const DELETE_ORGANIZATION = `${BASE_URL}/delete`;

const CREATE_ORGANIZATION_USERS = 'invite';
const ORGANIZATION_USERS_LIST = `${ORG_USERS_URL}`;
const EDIT_ORGANIZATION_USERS = `${ORG_USERS_URL}/edit`;
const DELETE_ORGANIZATION_USERS = `${ORG_USERS_URL}/delete`;

const CREATE_ORGANIZATION_ENTITY = 'entity/store';
const ORGANIZATION_ENTITY_LIST = 'entity/list';
const CREATE_ORGANIZATION_ENTITY_USERS = 'invite/entity-admin';

export const createOrganization = async (orgData) => {
  return await axiosInstance('post', `${CREATE_ORGANIZATION}`, orgData, {
    server: microServices.GLOBAL_ADMIN_URL,
  });
};

export const organizationList = async () => {
  return await axiosInstance('get', `${ORGANIZATION_LIST}`, {
    server: microServices.GLOBAL_ADMIN_URL,
  });
};

export const editOrganization = async (orgData) => {
  return await axiosInstance('put', `${EDIT_ORGANIZATION}`, orgData, {
    server: microServices.GLOBAL_ADMIN_URL,
  });
};

export const deleteOrganization = async (orgId) => {
  return await axiosInstance('delete', `${DELETE_ORGANIZATION}`, orgId, {
    server: microServices.GLOBAL_ADMIN_URL,
  });
};

export const createOrganizationUsers = async (data) => {
  return await axiosInstance(
    'post',
    `${CREATE_ORGANIZATION_USERS}/${data.role}`,
    data.requestData,
    {
      server: microServices.GLOBAL_ADMIN_URL,
    }
  );
};

export const organizationUsersList = async (orgData) => {
  return await axiosInstance('get', `${ORGANIZATION_USERS_LIST}/${orgData.id}`, {
    server: microServices.GLOBAL_ADMIN_URL,
  });
};

export const editOrganizationUsers = async (orgData) => {
  return await axiosInstance('put', `${EDIT_ORGANIZATION_USERS}`, orgData, {
    server: microServices.GLOBAL_ADMIN_URL,
  });
};

export const deleteOrganizationUsers = async (orgId) => {
  return await axiosInstance('delete', `${DELETE_ORGANIZATION_USERS}`, orgId, {
    server: microServices.GLOBAL_ADMIN_URL,
  });
};

export const entityList = async (entityData) => {
  let url = ORGANIZATION_ENTITY_LIST;
  if (entityData.id) {
    url += `/${entityData.id}`;
  }
  return await axiosInstance('get', url, entityData, {
    server: microServices.GLOBAL_ADMIN_URL,
  });
};

export const createOrganizationEntity = async (entityData) => {
  return await axiosInstance('post', `${CREATE_ORGANIZATION_ENTITY}`, entityData, {
    server: microServices.GLOBAL_ADMIN_URL,
  });
};

export const createOrganizationEntityUsers = async (entityData) => {
  return await axiosInstance('post', `${CREATE_ORGANIZATION_ENTITY_USERS}`, entityData, {
    server: microServices.GLOBAL_ADMIN_URL,
  });
};
