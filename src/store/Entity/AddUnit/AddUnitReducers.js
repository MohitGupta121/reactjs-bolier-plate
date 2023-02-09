import {
  ADD_UNIT_RESPONSE,
  CURRENT_ROUTE,
  ENTITY_UNIT_SEARCH_RESPONSE,
  ENTITY_UNIT_USER_SEARCH_RESPONSE,
  GET_UNIT_BY_ID_RESPONSE,
  UNIT_LIST_RESPONSE,
  UNIT_MANAGEMENT_RESPONSE,
} from './AddUnitTypes';

const INITIAL_STATE = {
  unitList: {
    count: '',
    units: [],
  },
  currentUnit: {},
  unitManagementDetails: {
    categories: [],
  },
  dropdownOptions: {
    units: [],
    categoryTags: {},
    users: [],
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UNIT_LIST_RESPONSE: {
      return {
        ...state,
        unitList: action.payload,
      };
    }
    case CURRENT_ROUTE: {
      return {
        ...state,
        currentRoute: action.payload,
      };
    }
    case GET_UNIT_BY_ID_RESPONSE: {
      return {
        ...state,
        currentUnit: {...action.payload},
      };
    }

    case ADD_UNIT_RESPONSE: {
      return {
        ...state,
        currentUnit: {...action.payload},
      };
    }

    case UNIT_MANAGEMENT_RESPONSE: {
      return {
        ...state,
        currentUnit: {...action.payload},
      };
    }
    case ENTITY_UNIT_USER_SEARCH_RESPONSE: {
      const users = [];
      action.payload.forEach((user) => {
        users.push({
          id: user.id,
          name: `${user.first_name || '---'} ${user.last_name || '---'} (${user.email})`,
        });
      });
      return {
        ...state,
        dropdownOptions: {...state.dropdownOptions, users: users},
      };
    }
    case ENTITY_UNIT_SEARCH_RESPONSE: {
      const unitList = action.payload.map((unit) => {
        return {id: unit.id, name: unit.name};
      });
      return {
        ...state,
        dropdownOptions: {...state.dropdownOptions, units: unitList},
      };
    }
    default:
      return state;
  }
};
