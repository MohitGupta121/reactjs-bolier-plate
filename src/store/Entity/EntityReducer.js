import {CategoryModel} from '../../containers/shared/Models/category';
import {
  ADD_CATEGORY_RESPONSE,
  CATEGORY_LIST,
  CATEGORY_LIST_RESPONSE,
  ENTITY_CATEGORY_LIST_RESPONSE,
  GET_ENTITY_BY_ID_RESPONSE,
  UPDATE_FINANICIAL_CODE,
  UPDATE_GENERAL_SETTINGS,
  UPDATE_LOCATION_LABEL,
  GET_ENTITY_UNITS,
  ADD_ENTITY_UNITS_RESPONSE
} from './EntityTypes';

const INITIAL_STATE = {
  categories: [],
  currentEntity: {},
  savedCategories: [],
  allCategories: [],
  entityUnits: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CATEGORY_LIST:
      return {
        ...state,
      };
    case CATEGORY_LIST_RESPONSE: {
      return {
        ...state,
        categories: [...action.payload],
      };
    }
    case ENTITY_CATEGORY_LIST_RESPONSE: {
      let allCategories = [];
      const entityCategory = action.payload;
      action.payload.forEach((category) => {
        if ((!category.tags || !category.tags?.length) && category.addEmptyTag) {
          category.tags = [{ name: '', display_name: '' }];
        }
        const tagIds = category.tags
          .filter((tag) => tag.display_name)
          .map((_tag) => _tag.display_name);
        allCategories = allCategories.concat(tagIds);
      });
      for (let i = action.payload?.length; i < 3; i++) {
        entityCategory.push(new CategoryModel());
      }
      return {
        ...state,
        savedCategories: entityCategory,
        allCategories: allCategories,
      };
    }
    case ADD_CATEGORY_RESPONSE: {
      return {
        ...state,
      };
    }
    case UPDATE_FINANICIAL_CODE: {
      return {
        ...state,
      };
    }
    case UPDATE_GENERAL_SETTINGS: {
      return {
        ...state,
      };
    }
    case UPDATE_LOCATION_LABEL: {
      return {
        ...state,
      };
    }
    case GET_ENTITY_BY_ID_RESPONSE: {
      if (action.payload.location_label.length) {
        action.payload.locationLabel = {};
        action.payload.location_label.map((item) => {
          action.payload.locationLabel[item.key] = item.value;
        });
      }
      return {
        ...state,
        currentEntity: {...action.payload},
      };
    }
	case GET_ENTITY_UNITS:
			return {
				...state,
			};
		case ADD_ENTITY_UNITS_RESPONSE: {

			return {
				...state,
				entityUnits: [...action.payload],
			};
		}

    default:
      return state;
  }
};
