import { default as constants } from "./constants";

export const setUser = user => ({
  type: constants.SET_USER,
  payload: user
});

export const clearUser = () => ({
  type: constants.CLEAR_USER,
  payload: null
});
