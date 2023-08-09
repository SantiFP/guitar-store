import { createSlice } from "@reduxjs/toolkit";
import { add, remove } from "../utils/addAndRemoveHandlers";
import { ItemObj } from "@/Types/types";
interface initialStateType {
  cart: ItemObj[];
}

const initialState: initialStateType = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      state.cart = add(state.cart, state.cart, action.payload);
    },
    removeFromCart(state, action) {
      state.cart = remove(state.cart, action.payload.name, action.payload.id);
    },
    initialCart(state, action) {
      state.cart = action.payload;
    },
    resetCart(state){
      state.cart = []
    }
  },
});

export const cartActions = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
