import { PREFETCH_HOME_DATA, UPDATE_RESPOND } from "./constant";

import { service } from "apiConnect";
import authSession from "utils/authSession";

const prefetchHomeData = () => {
  const session = new authSession();
  const token = session.getToken();

  return dispatch => {
    const data = {
      uid: token
    };

    service
      .post("/page-home", data)
      .then(res => {
        dispatch({
          type: PREFETCH_HOME_DATA,
          payload: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

const updateRespond = e => {
  return {
    type: UPDATE_RESPOND,
    payload: e
  };
};

export default {
  prefetchHomeData,
  updateRespond
};
