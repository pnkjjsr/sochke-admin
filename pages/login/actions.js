import { AUTHENTICATE, DEAUTHENTICATE } from "./constant";

const authenticate = el => {
  return {
    type: AUTHENTICATE,
    payload: el
  };
};
const deauthenticate = el => {
  return {
    type: DEAUTHENTICATE
  };
};

export default {
  authenticate,
  deauthenticate
};
