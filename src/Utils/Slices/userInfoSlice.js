import { createSlice } from "@reduxjs/toolkit";

const userInfoSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: {},
  },
  reducers: {
    addUserInfo: (state, action) => {
      state.userInfo = {...action.payload};
    },
    removeUserInfo: (state) => {
      state.userInfo = state.userInfo.length = 0;
    },
  },
});

export const useInfoReducers = userInfoSlice.reducer;
export const { addUserInfo, removeUserInfo } = userInfoSlice.actions;
