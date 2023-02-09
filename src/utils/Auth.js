import moment from 'moment';

/**
 * Service to check authentication for user and to signOut
 */
const Auth = {
  isAuth() {
    return localStorage.getItem('authToken');
  },
  getToken() {
    const token = {};
    token.authToken = localStorage.getItem('authToken');
    token.refreshToken = localStorage.getItem('refreshToken');
    return token;
  },
  signIn(payload) {
    const {token} = payload;
    localStorage.setItem('authToken', token.access_token);
    localStorage.setItem('refreshToken', token.refresh_token);
    localStorage.setItem('userData', JSON.stringify(payload.user_data));
    localStorage.setItem('expiryTime', moment().add(token.expires_in, 'seconds'));
  },
  refreshToken(payload) {
    localStorage.setItem('authToken', payload.access_token);
    localStorage.setItem('refreshToken', payload.refresh_token);
    localStorage.setItem('expiryTime', moment().add(payload.expires_in, 'seconds'));
  },
  getRoles() {
    const user = JSON.parse(localStorage.getItem('userData'));
    return user?.roles?.length ? user?.roles : [];
  },
  getLanguage() {
    const user = localStorage.getItem('userData') && JSON.parse(localStorage.getItem('userData'));
    return user?.language?.code;
  },
  signOut() {
    localStorage.clear();
  },
  getLoggedInUser() {
    return localStorage.getItem('userData') && JSON.parse(localStorage.getItem('userData'));
  },
  getExpiryTime() {
    return localStorage.getItem('expiryTime');
  },
  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  },
  setUserData(userData) {
    localStorage.setItem('userData', JSON.stringify(userData));
  },
};
export default Auth;
