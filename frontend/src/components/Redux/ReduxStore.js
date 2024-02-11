import { configureStore } from "@reduxjs/toolkit";
import user from "./Reducers/UserReducers";
const Store = configureStore({
  reducer: {
    user: user,
  },
});
export default Store;
