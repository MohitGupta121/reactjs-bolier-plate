import axiosInstance, {microServices} from '../../network/apis';

const BASE_URL = 'entity-units';

export const unitList = async () => {
  return await axiosInstance('get', `${BASE_URL}`, {
    server: microServices.GLOBAL_ADMIN_URL,
  });
};

export const unitDetailsById = async (data) => {
  return await axiosInstance('get', `${BASE_URL}/${data.id}/details`, {
    server: microServices.GLOBAL_ADMIN_URL,
  });
};

export const createKitchen = async (kitchenData) => {
  return await axiosInstance('post', `${BASE_URL}/${kitchenData.id}/kitchens`, kitchenData, {
    server: microServices.GLOBAL_ADMIN_URL,
  });
};

export const kitchenList = async (kitchenData) => {
  return await axiosInstance('get', `${BASE_URL}/${kitchenData.id}/kitchens`, {
    server: microServices.GLOBAL_ADMIN_URL,
  });
};

export const editKitchen = async (kitchenData) => {
  return await axiosInstance('put', `kitchens/${kitchenData.id}`, kitchenData, {
    server: microServices.GLOBAL_ADMIN_URL,
  });
};

export const deleteKitchen = async (kitchenId) => {
  return await axiosInstance('delete', 'kitchen/delete', kitchenId, {
    server: microServices.GLOBAL_ADMIN_URL,
  });
};

export const createProfile = async (kitchenData) => {
  return await axiosInstance('post', `kitchens/${kitchenData.id}/kitchen-profiles`, kitchenData, {
    server: microServices.GLOBAL_ADMIN_URL,
  });
};

export const profileList = async (kitchenData) => {
  return await axiosInstance('get', `kitchens/${kitchenData.id}/kitchen-profiles`, {
    server: microServices.GLOBAL_ADMIN_URL,
  });
};

export const editProfile = async (kitchenData) => {
  return await axiosInstance('put', `kitchen-profiles/${kitchenData.id}`, kitchenData, {
    server: microServices.GLOBAL_ADMIN_URL,
  });
};

export const deleteProfile = async (kitchenId) => {
  return await axiosInstance('delete', 'kitchen-profiles/delete', kitchenId, {
    server: microServices.GLOBAL_ADMIN_URL,
  });
};
