import { PREFETCH_DASHBOARD_DATA } from "./constant";

const initialState = {
  data: []
};

const home = (state = initialState, action) => {
  switch (action.type) {
    case PREFETCH_DASHBOARD_DATA:
      return Object.assign({}, state, {
        data: action.payload.data
      });
    default:
      return state;
  }
};

export default home;
