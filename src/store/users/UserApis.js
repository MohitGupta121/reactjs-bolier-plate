import axiosInstance, { microServices } from '../../network/apis';

export const postUserApi = async (payload) => {
  return await axiosInstance('post', '/register', payload, {
    server: microServices.TIKIT_TEST,
    successMessage: 'Hello',
  });
};
export const loginUserEmailApi = async (payload) => {
  return await axiosInstance('post', '/users/login', payload, {
    server: microServices.TIKIT_TEST,
    successMessage: 'Hello',
  });
};
// update password
export const changePassword = async (payload) => {
  return await axiosInstance('put', '/change_password', payload, {
    server: microServices.TIKIT_TEST,
  });
};

// export const getUserApi = async (config) => {
//   return await axios
//     .get('https://jsonplaceholder.typicode.com/users')
//     .then((resp) => {
//       return resp.data;
//     });
// };

export const getNewUserApi = async (userData) => {
  // console.log(userData);
  return await axiosInstance('post', '/users', userData, {
    server: microServices.TIKIT_TEST,
    successMessage: 'Hello',
  });
};
// export const getNewUserApi = async (config) => {
//   return await axios
//     .put('https://jsonplaceholder.typicode.com/users')
//     .then((resp) => {
//       return resp.data;
//     });
// };

export const deleteUserApi = async (id) => {
  console.log('deleteUserApi', id);
  return await axiosInstance('delete', `/users/${id}`, id, {
    server: microServices.TIKIT_TEST,
    successMessage: 'Hello',
  });
};

// export const deleteUserApi = async (id) => {
//   console.log(id);
//   return await axios
//     .delete(`https://jsonplaceholder.typicode.com/users/${id}`)
//     .then((resp) => {
//       return resp.data;
//     });
// };

export const updateUserApi = async (userData) => {
  return await axiosInstance('put', '/users', userData, {
    server: microServices.TIKIT_TEST,
    successMessage: 'Hello',
  });
};
