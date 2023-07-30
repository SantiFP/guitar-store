import { createSlice } from "@reduxjs/toolkit";

interface Logged {
  logged: boolean;
  name: string;
}

const initialState: Logged = {
  logged: false,
  name: "",
};

const logSlice = createSlice({
  name: "log",
  initialState,
  reducers: {
    logIn(state, action) {
      state.logged = true;
      state.name = action.payload.name;
    },
    logOut(state) {
      state.logged = false;
    },
  },
});

export const loginActions = logSlice.actions;
export const loginReducer = logSlice.reducer;
