/* eslint-disable no-mixed-spaces-and-tabs */
import {User} from '../../containers/shared/Models/user';
import {
  CREATE_ORGANIZATION,
  CREATE_ORGANIZATION_ENTITY,
  CREATE_ORGANIZATION_ENTITY_USERS,
  CREATE_ORGANIZATION_ENTITY_USERS_SUCCESS,
  CREATE_ORGANIZATION_USERS,
  CREATE_ORGANIZATION_USERS_SUCCESS,
  DELETE_ORGANIZATION,
  DELETE_ORGANIZATION_USERS,
  EDIT_ORGANIZATION,
  EDIT_ORGANIZATION_USERS,
  ENTITY_LIST_RESPONSE,
  ORGANIZATION_ENTITY_LIST,
  ORGANIZATION_ENTITY_LIST_RESPONSE,
  ORGANIZATION_LIST,
  ORGANIZATION_LIST_RESPONSE,
  ORGANIZATION_USERS_LIST,
  ORGANIZATION_USERS_LIST_RESPONSE,
  SELECT_ORGANIZATION,
} from './OrganizationTypes';

const INITIAL_STATE = {
  currentOrganization: {},
  previousOrganization: {},
  organization: [],
  entities: [],
  pendingEntityList: [],
  pendingOrganizationList: [],
};

const createOrganization = (state) => {
  return {
    ...state,
  };
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_ORGANIZATION:
      return createOrganization(state, action);
    case ORGANIZATION_LIST:
      return {
        ...state,
      };
    case ORGANIZATION_LIST_RESPONSE: {
      const data = {
        ...state,
        organization: [...action.payload],
        pendingOrganizationList: action.payload.filter((org) => org.invite_status === 1),
        previousOrganization: action.payload[0],
      };
      if (!Object.keys(state.currentOrganization).length) {
        data['currentOrganization'] = action.payload[0];
      }

      if (action.payload.length === 0) {
        data.currentOrganization = {id: 'add-organization', users: [new User()]};
      }
      return data;
    }

    case SELECT_ORGANIZATION: {
      let selectedOrg = state.organization.filter(
        (org) => action.payload && org.id === action.payload
      )[0];
      if (selectedOrg) {
        selectedOrg['users'] = action.payload?.id ? state.currentOrganization?.users : [];
      } else if (action.payload === 'add-organization') {
        selectedOrg = {id: 'add-organization', users: [new User()]};
      }
      const updatedData = {
        ...state,
        organization: state.organization,
        currentOrganization: selectedOrg,
      };
      if (state.currentOrganization !== 'add-organization') {
        updatedData['previousOrganization'] = state.currentOrganization;
      }
      return updatedData;
    }

    case EDIT_ORGANIZATION:
      return {
        ...state,
        organization: state.organization.map((content) =>
          content.id === action.payload.id
            ? {
                ...content,
                organizationName: action.payload.organizationName,
              }
            : content
        ),
      };
    case DELETE_ORGANIZATION:
      return {
        ...state,
        organization: state.organization.filter((item) => item.id !== action.payload),
      };
    case CREATE_ORGANIZATION_USERS: {
      return {
        ...state,
      };
    }
    case CREATE_ORGANIZATION_USERS_SUCCESS: {
      state.currentOrganization.users = action.payload;
      return {
        ...state,
      };
    }
    case ORGANIZATION_USERS_LIST:
      return {
        ...state,
      };
    case ORGANIZATION_USERS_LIST_RESPONSE: {
      state.currentOrganization.users = action.payload.users;
      return {
        ...state,
      };
    }
    case EDIT_ORGANIZATION_USERS:
      return {
        ...state,
        organization: state.organization.map((content) =>
          content.id === action.payload.id
            ? {
                ...content,
                organizationName: action.payload.organizationName,
              }
            : content
        ),
      };
    case DELETE_ORGANIZATION_USERS:
      return {
        ...state,
        organization: state.organization.filter((item) => item.id !== action.payload),
      };

    case ORGANIZATION_ENTITY_LIST:
      return {
        ...state,
      };
    case ORGANIZATION_ENTITY_LIST_RESPONSE: {
      state.currentOrganization.entities = action.payload.entities;
      return {
        ...state,
      };
    }

    case ENTITY_LIST_RESPONSE: {
      return {
        ...state,
        entities: action.payload.entities,
        pendingEntityList: action.payload.entities.filter((entity) => entity.invite_status === 1),
      };
    }

    case CREATE_ORGANIZATION_ENTITY_USERS: {
      return {
        ...state,
      };
    }
    case CREATE_ORGANIZATION_ENTITY_USERS_SUCCESS: {
      const temp = state.currentOrganization.entities;
      temp.filter((user) => user.id === action.payload.id)[0].users = action.payload.allUsers;
      state.currentOrganization.entities = temp;
      return {
        ...state,
      };
    }

    case CREATE_ORGANIZATION_ENTITY:
      return {...state};

    default:
      return state;
  }
};
