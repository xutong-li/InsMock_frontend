import { UserActionTypes } from "./type";

const INITIAL_STATE = {
  currentUser: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state, // spread operator
        currentUser: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;

// spread operator knowledge
const userInfor = {
  name: "xitong",
  age: "1",
  wife: null
};

const newObject = {
  ...userInfor  // shallow clone
}

const anotherNewObject = userInfor;