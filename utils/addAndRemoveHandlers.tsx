import { ItemObj } from "@/Types/types";

export const add = (cart: ItemObj[], prevCart: ItemObj[], payload: ItemObj) => {
  const { name, amount, price } = payload;
  let already = false;
  if (cart) {
    cart.map((el) => {
      if (el.name === name) {
        el.amount = el.amount + amount;
        el.price = el.price + price;
        already = true;
      }
    });
  }
  !already && (cart = [...prevCart, payload]);
  return cart;
};

export const remove = (cart: ItemObj[], name: string, id: number) => {
  let already = false;
  if (cart) {
    cart.map((el) => {
      if (el.name === name) {
        if (el.amount === 1) return;
        el.price = el.price - el.price / el.amount;
        el.amount--;
        already = true;
      }
    });
  }
  !already && (cart = cart.filter((el) => el.id !== id));
  return cart;
};

export const removeFromDb = async (
  itemName: string,
  id: number,
  loggedUserName: string,
  setIsSendingRequest: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    setIsSendingRequest(true);
    const req = await fetch(
      "https://guitar-store-fa2db-default-rtdb.firebaseio.com/users.json"
    );
    const res = await req.json();
    const usersUpdated = { ...res };
    for (const key in usersUpdated) {
      let user = usersUpdated[key];
      if (user.userName === loggedUserName) {
        user.cart = remove(user.cart, itemName, id);
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
    setIsSendingRequest(false);
  } catch (err) {
    console.log(err);
    setIsSendingRequest(false);
  }
};

export const addToDBCart = async (
  cart: ItemObj[],
  loggedUserName: string,
  payload: ItemObj,
  setSendingRequest: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const { name: newItemName, price, amount, id, img, type } = payload;
    setSendingRequest(true);
    const req = await fetch(
      "https://guitar-store-fa2db-default-rtdb.firebaseio.com/users.json"
    );
    const res = await req.json();
    const usersUpdated = { ...res };
    for (const key in usersUpdated) {
      let user = usersUpdated[key];
      if (user.userName === loggedUserName) {
        user.cart = add(user.cart, cart, {
          name: newItemName,
          price: price * amount,
          id: id,
          img: img,
          type: type,
          amount,
        });

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
    setSendingRequest(false);
  } catch (err) {
    console.log(err);
    setSendingRequest(false);
  }
};
