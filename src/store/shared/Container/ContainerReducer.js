import {
  CONTAINER_LIST,
  CONTAINER_LIST_RESPONSE,
  CREATE_CONTAINER,
  DELETE_CONTAINER,
  EDIT_CONTAINER,
  SELECT_CONTAINER,
} from './ContainerTypes';

const INITIAL_STATE = {
  selectedContainer: [],
  containers: {},
};

const createContainer = (state) => {
  return {
    ...state,
  };
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_CONTAINER:
      return createContainer(state, action);
    case CONTAINER_LIST:
      return {
        ...state,
      };
    case CONTAINER_LIST_RESPONSE: {
      return {
        ...state,
        containers: {...action.payload},
      };
    }

    case SELECT_CONTAINER: {
      return {
        ...state,
        currentContainer: action.payload,
      };
    }

    case EDIT_CONTAINER:
      return {
        ...state,
        containers: state.organization.map((content) =>
          content.id === action.payload.id
            ? {
                ...content,
              }
            : content
        ),
      };
    case DELETE_CONTAINER:
      return {
        ...state,
        containers: state.containers.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
};
