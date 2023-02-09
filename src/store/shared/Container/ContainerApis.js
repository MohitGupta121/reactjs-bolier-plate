import axiosInstance, {microServices} from '../../../network/apis';

const BASE_URL = 'containers';
const CREATE_CONTAINER = `${BASE_URL}/create`;
const ENTITY_CONTAINER_LIST = 'entities';
const EDIT_CONTAINER = `${BASE_URL}/edit`;
const DELETE_CONTAINER = `${BASE_URL}/delete`;
const ADD_CONTAINER = 'entities';

export const createContainer = async (containerData) => {
  return await axiosInstance('post', `${CREATE_CONTAINER}`, containerData, {
    server: microServices.GLOBAL_ADMIN_URL,
  });
};

export const containersList = async (containerData) => {
  return await axiosInstance('get', `${BASE_URL}/${containerData.unit}`, {
    server: microServices.GLOBAL_ADMIN_URL,
  });
};

export const entityContainersList = async (containerData) => {
  return await axiosInstance('get', `${ENTITY_CONTAINER_LIST}/${containerData.id}/${BASE_URL}`, {
    server: microServices.GLOBAL_ADMIN_URL,
  });
};

export const editContainer = async (containerData) => {
  return await axiosInstance('put', `${EDIT_CONTAINER}`, containerData, {
    server: microServices.GLOBAL_ADMIN_URL,
  });
};

export const deleteContainer = async (containerId) => {
  return await axiosInstance('delete', `${DELETE_CONTAINER}`, containerId, {
    server: microServices.GLOBAL_ADMIN_URL,
  });
};

export const addContainer = async (data) => {
  return await axiosInstance(
    'post',
    `${ADD_CONTAINER}/${data.entityId}/containers`,
    data.containerData,
    {
      server: microServices.GLOBAL_ADMIN_URL,
    }
  );
};
