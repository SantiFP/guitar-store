import { createSlice } from "@reduxjs/toolkit";
interface Items {
  name: string;
  price: number;
  id: number;
  img: string;
  amount: number;
}

interface initialStateType {
  cart: Items[];
}

const initialState: initialStateType = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      let already = false;
      state.cart.map((el) => {
        if (el.name === action.payload.name) {
          el.amount = el.amount + action.payload.amount;
          el.price = el.price + action.payload.price;
          already = true;
        }
      });
      !already && (state.cart = [...state.cart, action.payload]);
    },
    removeFromCart(state, action) {
      let already = false;
      state.cart.map((el) => {
        if (el.name === action.payload.name) {
          if (el.amount === 1) return;
          el.price = el.price - el.price / el.amount;
          el.amount--;
          already = true;
        }
      });
      !already &&
        (state.cart = state.cart.filter((el) => el.id !== action.payload.id));
    },
    initialCart(state,action){
      state.cart = action.payload
    }
  },
});

export const cartActions = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
