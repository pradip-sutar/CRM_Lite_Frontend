import { createSlice } from "@reduxjs/toolkit";

const roleAndRightSlice = createSlice({
  name: "permisions",
  initialState: {
    roleAndRights:[]
  },
  reducers:{
    addRoleAndRights: (state, action) => {
      state.roleAndRights = [...action.payload];
    },
    removeRoleAndRights: (state) => {
      state.roleAndRights = state.roleAndRights.length=0;
    },
  }
});
export const roleAndRightReducer=roleAndRightSlice.reducer;
export const{addRoleAndRights,removeRoleAndRights}=roleAndRightSlice.actions;
