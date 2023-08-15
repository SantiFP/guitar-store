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

export const removeCart = (name: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(cartActions.resetCart());
    const req = await fetch(
      "https://guitar-store-fa2db-default-rtdb.firebaseio.com/users.json"
    );
    const res = await req.json();
    const usersUpdated = { ...res };
    for (const key in usersUpdated) {
      let user = usersUpdated[key];
      if (user.userName === name) {
        user.cart = [];
        break;
      }
    }
    await fetch(
      "https://guitar-store-fa2db-default-rtdb.firebaseio.com/users.json",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usersUpdated),
      }
    );
  };
};
