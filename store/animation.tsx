import { createSlice } from "@reduxjs/toolkit";

interface Buttons {
  animationA: { on: boolean; id: number };
  animationB: { on: boolean; id: number };
  animationC: { on: boolean; id: number };
}

const initialState: Buttons = {
  animationA: { on: false, id: 0 },
  animationB: { on: false, id: 0 },
  animationC: { on: false, id: 0},
};

const animationSlice = createSlice({
  name: "animate",
  initialState,
  reducers: {
    toggleAnimation(state, action) {
      action.payload.type === "a" &&
        ((state.animationA.on = !state.animationA.on),
        (state.animationA.id = action.payload.id));
      action.payload.type === "b" &&
        ((state.animationB.on = !state.animationB.on),
        (state.animationB.id = action.payload.id));
      action.payload.type === "c" &&
        ((state.animationC.on = !state.animationC.on),
        (state.animationC.id = action.payload.id));
    },
  },
});

export const animationActions = animationSlice.actions;
export const animationReducer = animationSlice.reducer;
