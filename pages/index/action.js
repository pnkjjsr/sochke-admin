import { PREFETCH_DASHBOARD_DATA } from "./constant";

import { service } from "utils/apiConnect";
import authSession from "utils/authSession";

const prefetchDashboardData = () => {
  const session = new authSession();
  const token = session.getToken();

  return dispatch => {
    const data = {
      uid: token
    };

    // service
    //   .post("/page-home", data)
    //   .then(res => {
    //     dispatch({
    //       type: PREFETCH_DASHBOARD_DATA,
    //       payload: res.data
    //     });
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  };
};

export default {
  prefetchDashboardData
};
