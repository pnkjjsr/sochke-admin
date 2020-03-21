import { SHOW, HIDE } from "./constant";

const initialState = {
  open: "",
  message: "",
  type: ""
};

const notification = (state = initialState, action) => {
  switch (action.type) {
    case SHOW:
      return Object.assign({}, state, {
        open: "show",
        message: action.payload.message,
        type: action.payload.type
      });
    case HIDE:
      return Object.assign({}, state, {
        open: "",
        message: "",
        type: ""
      });
    default:
      return state;
  }
};

export default notification;
