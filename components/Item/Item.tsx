import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { AppDispatch } from "@/store";
import classes from "./Item.module.css";
import { cartActions } from "@/store/cart";
import { handleAnimation } from "@/store/handleAnimation";
import { ItemObj } from "@/Types/types";
import { addToDBCart } from "@/utils/addAndRemoveHandlers";
import Link from "next/link";
import { animationActions } from "@/store/animation";

const Item = (props: ItemObj) => {
  const [amount, setAmount] = useState<number>(1);
  const dispatch = useDispatch<AppDispatch>();
  const { animationB, animationD, animationE } = useSelector(
    (state: RootState) => state.animation
  );
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
    <div className={`itemDiv ${!logged && "pb-2"}`}>
      <div className="flex flex-col lg:flex lg:flex-row">
        <img
          width={0}
          height={0}
          className="w-[12rem] h-[12rem] mx-auto"
          alt={props.type}
          src={props.img}
        />

        <div className="flex flex-col space-y-4 text-center mt-4 w-full">
          <p className="name">{props.name}</p>
          {logged && (
            <div className="flex flex-row space-x-3 justify-center">
              <p className="pt-8 text-lg">Total x{amount}</p>
              <div className="selection">
                <button
                  className={`${
                    animationD.on && props.id === animationD.id && classes.add
                  }  bg-zinc-950 text-white px-5 py-1 cursor-auto lg:cursor-pointer`}
                  onClick={() => {
                    amountHandler("+");
                    dispatch(
                      animationActions.toggleAnimation({
                        type: "d",
                        id: props.id,
                      })
                    );
                    setTimeout(() => {
                      dispatch(
                        animationActions.toggleAnimation({
                          type: "d",
                          id: props.id,
                        })
                      );
                    }, 400);
                  }}
                >
                  <span className="relative bottom-[0.2rem]">+</span>
                </button>
                <button
                  className={`${
                    animationE.on && props.id === animationE.id && classes.add
                  }  bg-zinc-950 text-white px-5 py-1 cursor-auto lg:cursor-pointer`}
                  onClick={() => {
                    amountHandler("-");
                    dispatch(
                      animationActions.toggleAnimation({
                        type: "e",
                        id: props.id,
                      })
                    );
                    setTimeout(() => {
                      dispatch(
                        animationActions.toggleAnimation({
                          type: "e",
                          id: props.id,
                        })
                      );
                    }, 400);
                  }}
                >
                  <span className="relative bottom-[0.2rem]">-</span>
                </button>
              </div>
            </div>
          )}

          <div className="py-2">
            <span className="text-2xl bg-zinc-800 px-2 py-1 text-white">
              $ {props.price * amount}
            </span>
          </div>
          <div>
            <span className=" hover:underline lg:cursor-pointer">
              <Link href={`/${props.id}`}>Mas información</Link>
            </span>
          </div>
        </div>
      </div>
      {logged && (
        <div className="text-center text-white mt-5">
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
