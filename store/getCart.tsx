import { AppDispatch } from ".";
import { cartActions } from "./cart";

export const getCart = (name: string) => {
  return async (dispatch: AppDispatch) => {
    const req = await fetch(
      "https://guitar-store-fa2db-default-rtdb.firebaseio.com/users.json"
    );
    const res = await req.json();
    for (const key in res) {
      if (name === res[key].userName) {
        res[key].cart
          ? dispatch(cartActions.initialCart(res[key].cart))
          : dispatch(cartActions.initialCart([]));
          break;
      }
    }
  };
};

