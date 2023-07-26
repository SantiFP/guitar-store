import Image from "next/image";
import classes from "./Header.module.css";
import { ReactNode, useEffect, useReducer } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Backdrop } from "../Modal/Modal";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

type ActionType = {
  type: string;
  payload?: any;
};

type StateType = {
  sideState: boolean;
  animate: boolean;
};

const initialState: StateType = {
  sideState: false,
  animate: false,
};

const reducer = (state: StateType, action: ActionType) => {
  if (action.type === "sideState") {
    return { ...state, sideState: !state.sideState };
  }
  if (action.type === "animate") {
    return { ...state, animate: !state.animate };
  }
  return state;
};

const Header: React.FC<{ children: ReactNode; onShow: () => void }> = (
  props
) => {
  const [reducerState, dispatch] = useReducer(reducer, initialState);
  const cart = useSelector((state: RootState) => state.cart);

  const { pathname } = useRouter();

  const closeBackdrop = () => {
    dispatch({ type: "sideState" });
  };

  const animateHandler = () => {
    dispatch({ type: "animate" });
    const timer = setTimeout(() => {
      dispatch({ type: "animate" });
    }, 400);
    setTimeout(() => {
      clearInterval(timer);
    }, 500);
  };

  useEffect(() => {
    if (cart.length === 0) {
      return;
    }
    animateHandler();
  }, [cart]);

  return (
    <>
      {reducerState.sideState && <Backdrop onClose={closeBackdrop} />}
      <div className="pb-8">
        <div>
          <div>
            <Image
              onClick={() => dispatch({ type: "sideState" })}
              className={`z-20 fixed lg:hidden`}
              width={50}
              height={50}
              src={!reducerState.sideState ? "/list.png" : "/exit.png"}
              alt="menu"
            />
          </div>

          <div className="lg:flex lg:flex-row-reverse lg:w-full lg:pr-8">
            <div className="login-cart ">
              <p className=" logout">Logout</p>
              <div className="bg-black rounded-[10rem] px-2 py-3 fixed z-10">
                <Image
                  alt="cart"
                  width={65}
                  height={65}
                  src={"/cart.png"}
                  onClick={() => {
                    props.onShow();
                    animateHandler();
                  }}
                  className={` ${
                    reducerState.animate && classes.cart
                  } lg:cursor-pointer lg:-mb-1`}
                ></Image>
                <p
                  className={`cartIcon ${
                    reducerState.animate && classes.cart
                  }`}
                >
                  {cart.length}
                </p>
              </div>
            </div>

            <div className="headLg">
              <Link
                className={`${classes.link} ${
                  pathname === "/" && `${classes.active} underline mt-1`
                }`}
                href="/"
              >
                Home
              </Link>

              <Link
                className={`${classes.link} ${
                  pathname === "/acoustics" &&
                  `${classes.active} underline mt-1`
                }`}
                href="/acoustics"
              >
                Guitarras acústicas
              </Link>
              <Link
                className={`${classes.link} ${
                  pathname === "/electrics" &&
                  `${classes.active} underline mt-1`
                }`}
                href="/electrics"
              >
                Guitarras eléctricas
              </Link>
              <Link
                className={`${classes.link} ${
                  pathname === "/gadgets" && `${classes.active} underline mt-1`
                }`}
                href="/gadgets"
              >
                Accesorios
              </Link>
            </div>
          </div>
        </div>

        <div
          className={` ${classes.sidebar} relative z-10 ${
            !reducerState.sideState && classes.closed
          } sidebar `}
        >
          <Link
            className={`${classes.link} ${
              pathname === "/" && `${classes.active} underline`
            }`}
            href="/"
          >
            Home
          </Link>
          <Link
            className={`${classes.link} ${
              pathname === "/acoustics" && `${classes.active} underline`
            }`}
            href="/acoustics"
          >
            Guitarras acústicas
          </Link>
          <Link
            className={`${classes.link} ${
              pathname === "/electrics" && `${classes.active} underline `
            }`}
            href="/electrics"
          >
            Guitarras eléctricas
          </Link>

          <Link
            className={`${classes.link} ${
              pathname === "/gadgets" && `${classes.active} underline`
            }`}
            href="/gadgets"
          >
            Accesorios
          </Link>
        </div>
      </div>
      {props.children}
    </>
  );
};
export default Header;
