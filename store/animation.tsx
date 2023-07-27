import { createSlice } from "@reduxjs/toolkit";

interface Buttons {
  animationA: boolean;
  animationB: boolean;
  animationC: boolean;
}

const initialState: Buttons = {
  animationA: false,
  animationB: false,
  animationC: false,
};

const animationSlice = createSlice({
  name: "animate",
  initialState,
  reducers: {
    toggleAnimation(state, action) {
      action.payload === "a" && (state.animationA = !state.animationA);
      action.payload === "b" && (state.animationB = !state.animationB);
      action.payload === "c" && (state.animationC = !state.animationC);
    },
  },
});

export const animationActions = animationSlice.actions;
export const animationReducer = animationSlice.reducer;
