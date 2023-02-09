import {
  CITY_LIST,
  CITY_LIST_RESPONSE,
  COUNTRY_LIST,
  COUNTRY_LIST_RESPONSE,
  LANGUAGE_LIST,
  LANGUAGE_LIST_RESPONSE,
  MEASUREMENT_LIST_RESPONSE,
  STATE_LIST,
  STATE_LIST_RESPONSE,
} from './MiscellaneousTypes';

const INITIAL_STATE = {
  languageList: [],
  countryList: [],
  stateList: [],
  cityList: [],
  measurementList: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LANGUAGE_LIST: {
      return {
        ...state,
      };
    }
    case LANGUAGE_LIST_RESPONSE: {
      const list = action.payload?.map((language) => {
        language.value = language.code;
        return language;
      });
      return {
        ...state,
        languageList: [...list],
      };
    }
    case COUNTRY_LIST:
      return {
        ...state,
      };
    case COUNTRY_LIST_RESPONSE: {
      return {
        ...state,
        countryList: [...action.payload],
      };
    }
    case STATE_LIST:
      return {
        ...state,
      };
    case STATE_LIST_RESPONSE: {
      return {
        ...state,
        stateList: [...action.payload],
      };
    }
    case CITY_LIST:
      return {
        ...state,
      };
    case CITY_LIST_RESPONSE: {
      return {
        ...state,
        cityList: [...action.payload],
      };
    }
    case MEASUREMENT_LIST_RESPONSE: {
      return {
        ...state,
        measurementList: [...action.payload],
      };
    }
    default:
      return state;
  }
};
