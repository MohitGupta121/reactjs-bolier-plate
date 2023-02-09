import {
  ACCEPT_INVITE_RESPONSE,
  LOGIN_RESPONSE,
  REDIRECT_TO_LOGIN,
  SET_SHOW_PENDING_INVITE_DIALOG,
  VALIDATE_INVITE_ERROR,
  VALIDATE_INVITE_REDIRECT,
  VALIDATE_INVITE_SUCCESS,
  USER_REGISTER_REQ,
  CHANGE_PASSWORD
} from './UserTypes';

const INITIAL_STATE = {
  isLoggedOut: false,
  showPendingInviteDialog: false,
  users: [],
  inviteEmail: '',
  inviteEmailError: '',
  inviteRedirect: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case VALIDATE_INVITE_SUCCESS: {
      return { ...state, inviteEmail: action.payload.email, inviteEmailError: '' };
    }
    case VALIDATE_INVITE_ERROR: {
      return { ...state, inviteEmailError: action.payload };
    }
    case VALIDATE_INVITE_REDIRECT: {
      return { ...state, inviteRedirect: action.payload };
    }
    case REDIRECT_TO_LOGIN: {
      return {
        ...state,
        isLoggedOut: true,
      };
    }
    case LOGIN_RESPONSE: {
      return {
        ...state,
        isLoggedOut: false,
      };
    }
    case ACCEPT_INVITE_RESPONSE: {
      return {
        ...state,
        showPendingInviteDialog: false,
      };
    }
    case SET_SHOW_PENDING_INVITE_DIALOG: {
      return {
        ...state,
        showPendingInviteDialog: action.payload,
      };
    }
    case USER_REGISTER_REQ: {
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    }
    //

    default:
      return state;
  }
};
