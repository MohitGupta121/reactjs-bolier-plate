import axios from 'axios';
import config from '../../config';
import { errorHandler, requestHandler, successHandler } from '../interceptors';

const axiosClient = (baseUrl, config) =>
  axios.create({
    baseURL: baseUrl,
    ...config,
  });

const microServicesURLs = {
  TIKIT_TEST: `${config.apiGateway.TEST}`,
  // GLOBAL_ADMIN_URL: `${config.waste_url.ADMIN}`,
};

console.log('config', microServicesURLs);

const clients = {};
const microServices = {};

for (const key in microServicesURLs) {
  const axiosInstance = axiosClient(microServicesURLs[key], {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  microServices[key] = key;
  clients[key] = axiosInstance;

  axiosInstance.interceptors.request.use(
    (request) => requestHandler(request),
    (error) => errorHandler(error)
  );

  axiosInstance.interceptors.response.use(
    (response) => successHandler(response),
    (error) => errorHandler(error)
  );
}

export default (method, uri, data = {}, configs = {}) => {
  const {
    successMessage = null,
    // server = microServices.GLOBAL_ADMIN_URL,
    server = microServices.Test_URL,
    headers = {},
    params = {},
    responseType = 'json',
    handlerEnabled = true,
  } = configs;

  const axiosConfig = {
    headers,
    params,
    handlerEnabled,
  };

  if (responseType) {
    axiosConfig.responseType = responseType;
  }

  if (successMessage) {
    axiosConfig.successMessage = successMessage;
  }

  return clients[server][method](
    uri,
    method === 'delete' ? axiosConfig : data,
    axiosConfig
  );
};

export { microServices };
