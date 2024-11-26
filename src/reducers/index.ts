import homeReducer from "./home";
import userReducer from "./user";
import usersReducer from "./users";

const rootReducers = {
  home: homeReducer,
  user: userReducer,
  users: usersReducer
};

export default rootReducers;