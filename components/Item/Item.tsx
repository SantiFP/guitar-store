import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { AppDispatch } from "@/store";
import classes from "./Item.module.css";
import { cartActions } from "@/store/cart";
import { handleAnimation } from "@/store/handleAnimation";
import { ItemObj } from "@/Types/types";

const Item = (props: ItemObj) => {
  const [amount, setAmount] = useState<number>(1);
  const dispatch = useDispatch<AppDispatch>();
  const { animationB } = useSelector((state: RootState) => state.animation);
  const loginState = useSelector((state: RootState) => state.login);
  const cart = useSelector((state: RootState) => state.cart.cart);

  const { name, logged } = loginState;

  const amountHandler = (type: string) => {
    type === "+" && setAmount(amount + 1);
    type === "-" && setAmount(amount === 1 ? amount : amount - 1);
  };

  const addToCart = async () => {
    dispatch(
      cartActions.addToCart({
        name: props.name,
        price: props.price * amount,
        id: props.id,
        img: props.img,
        amount,
      })
    );
    try {
      const req = await fetch(
        "https://guitar-store-fa2db-default-rtdb.firebaseio.com/users.json"
      );
      const res = await req.json();
      const usersUpdated = { ...res };
      for (const key in usersUpdated) {
        let user = usersUpdated[key];
        if (user.userName === name) {
          let already = false;
          if (user.cart) {
            user.cart.map((el: any) => {
              if (el.name === props.name) {
                el.amount = el.amount + amount;
                el.price = el.price + props.price;
                already = true;
              }
            });
          }
          !already &&
            (user.cart = [
              ...cart,
              {
                name: props.name,
                price: props.price * amount,
                id: props.id,
                img: props.img,
                amount,
              },
            ]);
          break;
        }
      }
      console.log(usersUpdated);
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
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="itemDiv">
      <div className="flex flex-col lg:flex lg:flex-row">
        <img
          width={0}
          height={0}
          className="w-[14rem] h-[10rem]"
          alt={props.type}
          src={props.img}
        />

        <div className="flex flex-col space-y-2 text-center mt-4 w-full">
          <p className="text-xl">{props.name}</p>
          {logged && (
            <div className="text-3xl">
              <button className="signs" onClick={amountHandler.bind(null, "+")}>
                <span className="relative bottom-[0.2rem]">+</span>
              </button>
              <p>{amount}</p>
              <button className="signs" onClick={amountHandler.bind(null, "-")}>
                <span className="relative bottom-[0.2rem]">-</span>
              </button>
            </div>
          )}

          <p className="pb-2">
            Total x{amount}:{" "}
            <span className="text-2xl">${props.price * amount}</span>{" "}
          </p>
        </div>
      </div>
      {logged && (
        <div className="text-center text-white mt-8">
          <button
            onClick={() => {
              addToCart();
              dispatch(handleAnimation({ type: "b", id: props.id }));
            }}
            className={`addButton ${
              animationB.on && props.id === animationB.id && classes.add
            }`}
          >
            Añadir al carrito
          </button>
        </div>
      )}
    </div>
  );
};
export default Item;
