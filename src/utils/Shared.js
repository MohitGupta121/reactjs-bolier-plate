import store from '../store';
import {
  hideLoaderAction,
  showLoaderAction,
} from '../store/shared/Loader/LoaderAction';
import {
  hideToasterAction,
  showToasterAction,
} from '../store/shared/Toaster/ToasterAction';
import { logout } from '../store/shared/User/UserAction';

export function dispatchToasterError(errorMsg) {
  store.dispatch(showToasterAction(errorMsg, 'error'));
}

export function dispatchToasterSuccess(message) {
  store.dispatch(showToasterAction(message, 'success'));
}

export function dispatchToasterHide() {
  store.dispatch(hideToasterAction());
}

export function signOut() {
  store.dispatch(logout());
}

export function showLoader() {
  store.dispatch(showLoaderAction());
}

export function hideLoader() {
  store.dispatch(hideLoaderAction());
}
