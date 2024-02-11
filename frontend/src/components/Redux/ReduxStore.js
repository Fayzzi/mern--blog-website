import { configureStore } from "@reduxjs/toolkit";
import user from "./Reducers/UserReducers";
import theme from "./ThemeSlice/ThemSlice";
const Store = configureStore({
  reducer: {
    user: user,
    theme: theme,
  },
});
export default Store;
