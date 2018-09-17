import { default as constants } from "./constants";

const initialState = {
  user: null,
};

const userReducer = (stateToModify = initialState, action) => {
  const state = stateToModify;
  switch (action.type) {
    case constants.SET_USER:    
      return {
        ...state,
        user: action.payload
      };
    case constants.CLEAR_USER:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};
export default userReducer;
