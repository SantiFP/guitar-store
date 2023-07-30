import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./cart";
import { animationReducer } from "./animation";
import { loginReducer } from "./login";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    animation: animationReducer,
    login: loginReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
