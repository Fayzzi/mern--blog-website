import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  theme: localStorage.getItem("theme")
    ? JSON.parse(localStorage.getItem("theme"))
    : "light",
};
const themeSlice = createSlice({
  initialState,
  name: "theme",
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light"; // Update state directly
      localStorage.setItem("theme", JSON.stringify(state.theme));
    },
  },
});
export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
