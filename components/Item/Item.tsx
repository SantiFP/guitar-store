import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { AppDispatch } from "@/store";
import classes from "./Item.module.css";
import { cartActions } from "@/store/cart";
import { handleAnimation } from "@/store/handleAnimation";
import { ItemObj } from "@/Types/types";
import { addToDBCart } from "@/utils/addAndRemoveHandlers";

const Item = (props: ItemObj) => {
  const [amount, setAmount] = useState<number>(1);
  const dispatch = useDispatch<AppDispatch>();
  const { animationB } = useSelector((state: RootState) => state.animation);
  const loginState = useSelector((state: RootState) => state.login);
  const cart = useSelector((state: RootState) => state.cart.cart);
  const [isSendingRequest, setIsSendingRequest] = useState(false);

  const { name: loggedName, logged } = loginState;
  const { name, price, type, id, img } = props;

  const amountHandler = (type: string) => {
    type === "+" && setAmount(amount + 1);
    type === "-" && setAmount(amount === 1 ? amount : amount - 1);
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
            disabled={isSendingRequest}
            onClick={() => {
              addToDBCart(
                cart,
                loggedName,
                {
                  name,
                  amount,
                  price,
                  id,
                  img,
                  type,
                },
                setIsSendingRequest
              );
              dispatch(
                cartActions.addToCart({
                  name: name,
                  price: price * amount,
                  id: id,
                  img: img,
                  type: type,
                  amount,
                })
              );
              dispatch(handleAnimation({ type: "b", id: props.id }));
              dispatch(handleAnimation({ type: "a", id: 0 }));
            }}
            className={`addButton ${
              animationB.on && props.id === animationB.id && classes.add
            } ${isSendingRequest && "cursor-not-allowed"}`}
          >
            Añadir al carrito
          </button>
        </div>
      )}
    </div>
  );
};
export default Item;
