/* eslint-disable no-mixed-spaces-and-tabs */

import {
  KITCHEN_LIST_RESPONSE,
  PROFILE_LIST_RESPONSE,
  UNIT_DETAILS_BY_ID_RESPONSE,
  UNIT_USER_LIST_RESPONSE,
} from './UnitUserTypes';

const INITIAL_STATE = {
  unitUserList: [],
  pendingUserList: [],
  currentUnit: {},
  locationLabel: {},
};

const setLocationLabel = (user) => {
  const locationLabel = {};
  if (user?.entity && user.entity.location_label.length) {
    user.entity.location_label.map((item) => {
      locationLabel[item.key] = item.value;
    });
  }
  return locationLabel;
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UNIT_USER_LIST_RESPONSE: {
      const unitUserList = [...action.payload];
      return {
        ...state,
        unitUserList,
        locationLabel: setLocationLabel(unitUserList[0]),
        pendingUserList: action.payload.filter((user) => user.invite_status === 1),
      };
    }
    case UNIT_DETAILS_BY_ID_RESPONSE: {
      return {
        ...state,
        currentUnit: action.payload,
        locationLabel: setLocationLabel(action.payload),
      };
    }
    case KITCHEN_LIST_RESPONSE: {
      return {
        ...state,
        kitchens: [...action.payload],
      };
    }
    case PROFILE_LIST_RESPONSE: {
      return {
        ...state,
        kitchens: [...action.payload],
      };
    }
    default:
      return state;
  }
};
