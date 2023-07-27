import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./cart";
import { animationReducer } from "./animation";


export const store = configureStore({
  reducer: {cart: cartReducer, animation: animationReducer},
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
