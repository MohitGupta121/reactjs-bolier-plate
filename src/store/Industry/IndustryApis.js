import axiosInstance, { microServices } from '../../network/apis';

export const createIndustryApi = async (paylode) => {
  return await axiosInstance('post', '/industry/register', paylode, {
    server: microServices.TIKIT_TEST,
    successMessage: 'Hello',
  });
};
