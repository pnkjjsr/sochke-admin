import {
  UPDATE,
  UPDATE_PATH,
  HIDE_SEARCH,
  SHOW_SEARCH,
  GET_SEARCH_DATA
} from "./constant";

const initialState = {
  title: "Sochke",
  desc:
    "SochkeApp | Social platform that enables users to connect with different people around them. And it's a digital platform that empowers users to contribute to their constituencies to make it a better place.",
  path: "",
  searchView: false,
  searchMinisters: [],
  searchUsers: []
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE:
      return Object.assign({}, state, {
        home: action.payload
      });
    case UPDATE_PATH:
      return Object.assign({}, state, {
        path: action.payload
      });
    case SHOW_SEARCH:
      return Object.assign({}, state, {
        searchView: true
      });
    case HIDE_SEARCH:
      return Object.assign({}, state, {
        searchView: false,
        searchMinisters: [],
        searchUsers: []
      });
    case GET_SEARCH_DATA:
      return Object.assign({}, state, {
        searchMinisters: action.payload.ministers,
        searchUsers: action.payload.users
      });

    default:
      return state;
  }
};

export default auth;
