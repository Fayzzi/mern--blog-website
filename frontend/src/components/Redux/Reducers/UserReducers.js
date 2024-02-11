import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  isAuthenticated: false,
  user: null,
  userError: null,
  userLoading: true,
};
const GetUser = createAsyncThunk(
  "user/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/v2/get-user");
      return response.data.getUser;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data.message);
      }
      throw error;
    }
  }
);

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetUser.pending, (state) => {
        state.isAuthenticated = false;
        state.userLoading = true;
      })
      .addCase(GetUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.userLoading = false;
        state.user = action.payload;
        state.userError = null;
      })
      .addCase(GetUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.userError = action.payload;
        state.userLoading = false;
      });
  },
});
export default UserSlice.reducer;
