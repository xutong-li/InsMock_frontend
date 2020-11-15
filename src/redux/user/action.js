import { UserActionTypes } from "./type";

export const setCurrentUser = (user) => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user ? user : false,
});
