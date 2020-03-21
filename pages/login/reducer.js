import { AUTHENTICATE, DEAUTHENTICATE, USER } from "./constant";

const initialState = {
  token: "",
  user: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return Object.assign({}, state, {
        token: action.payload.id,
        user: action.payload
      });
    case DEAUTHENTICATE:
      return {
        token: null,
        user: {}
      };
    default:
      return state;
  }
};
