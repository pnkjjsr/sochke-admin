import { combineReducers } from "redux";

import layout from "layout/reducer";
import notification from "components/Notification/reducer";

import login from "pages/login/reducer";
import home from "pages/index/reducer";

const rootReducer = combineReducers({
  layout,
  notification,

  login,
  home
});

export default rootReducer;
