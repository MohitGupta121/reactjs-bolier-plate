import axiosInstance, {microServices} from '../../../network/apis';

const LANGUAGE_LIST = 'language-list';
const COUNTRY_LIST = 'countries';
const STATE_LIST = 'states';
const CITY_LIST = 'cities';
const MEASUREMENT_UNIT = 'get-measurement-system';

export const languageList = async () => {
  return await axiosInstance('get', `${LANGUAGE_LIST}`, {
    server: microServices.GLOBAL_ADMIN_URL,
  });
};

export const countryList = async (data) => {
  return await axiosInstance('get', `${COUNTRY_LIST}`, data.keyword, {
    server: microServices.GLOBAL_ADMIN_URL,
  });
};

export const stateList = async (data) => {
  return await axiosInstance('get', `${STATE_LIST}/${data.countryId}`, data.keyword, {
    server: microServices.GLOBAL_ADMIN_URL,
  });
};

export const cityList = async (data) => {
  return await axiosInstance('get', `${CITY_LIST}/${data.stateId}`, data.keyword, {
    server: microServices.GLOBAL_ADMIN_URL,
  });
};

export const measurementList = async () => {
  return await axiosInstance('get', `${MEASUREMENT_UNIT}`, {
    server: microServices.GLOBAL_ADMIN_URL,
  });
};
