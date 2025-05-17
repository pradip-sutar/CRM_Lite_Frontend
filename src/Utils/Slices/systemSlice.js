import { createSlice } from "@reduxjs/toolkit";

const systemSlice = createSlice({
  name: "system",
  initialState: {
    activeMenu: null,
  },
  reducers: {
    setActiveMenu: (state, action) => { 
      state.activeMenu = state.activeMenu === action.payload ? {} : action.payload;
    },
  },
});

export const systemReducers = systemSlice.reducer;
export const{setActiveMenu} = systemSlice.actions;
