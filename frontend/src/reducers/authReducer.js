import { LOGIN, LOGOUT, UPDATEBUDGET } from "../actions/types";

const defaultState = {
  user: null,
  token: null
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN:
      state = {
        user: action.payload.user,
        token: action.payload.token
      };
      return state;
    case LOGOUT:
      return {
        user: null,
        token: null
      };
    case UPDATEBUDGET:
      return {
        ...state,
        budget:action.payload
      }
    default:
      return state;
  }
};