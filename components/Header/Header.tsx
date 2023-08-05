import Image from "next/image";
import classes from "./Header.module.css";
import { ReactNode, useEffect, useReducer, useState } from "react";
import { Backdrop } from "../Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { handleAnimation } from "@/store/handleAnimation";
import { ActionType, StateType } from "@/Types/types";
import { loginActions } from "@/store/login";
import Link from "next/link";
import Nav from "./Nav";

const initialState: StateType = {
  sideState: false,
};

const reducer = (state: StateType, action: ActionType) => {
  if (action.type === "sideState") {
    return { ...state, sideState: !state.sideState };
  }
  return state;
};

const Header: React.FC<{ children: ReactNode; onShow: () => void }> = (
  props
) => {
  const [reducerState, dispatch] = useReducer(reducer, initialState);
  const dispatchStore = useDispatch<AppDispatch>();
  const cart = useSelector((state: RootState) => state.cart.cart);
  const { animationA } = useSelector((state: RootState) => state.animation);
  const logged = useSelector((state: RootState) => state.login.logged);
  const [isLogged,setIsLogged] = useState('start')

  const closeBackdrop = () => {
    dispatch({ type: "sideState" });
  };

  useEffect(() => {
    if (cart.length === 0) {
      return;
    }
    dispatchStore(handleAnimation({ type: "a", id: 0 }));
  }, [cart]);

  useEffect(() => {
     setIsLogged(localStorage.getItem("logged") || '');
  }, [logged]);

  console.log(logged);
  console.log(isLogged);

  return (
    <>
      {reducerState.sideState && <Backdrop onClose={closeBackdrop} />}
      <div className={logged ? "pb-8" : "-mb-1 lg:pb-4 lg:m-0"}>
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
              {logged && (
                <p
                  onClick={() => {
                    dispatchStore(loginActions.logOut());
                    localStorage.removeItem("logged");
                    localStorage.removeItem("name");
                  }}
                  className="isLogged"
                >
                  Logout
                </p>
              )}
              {!logged && !isLogged && (
                <div className="logAndReg">
                  <Link href="/register">
                    <p className="hover:underline cursor-auto lg:cursor-pointer">
                      Registro
                    </p>
                  </Link>
                  <Link href="/login">
                    <p className="hover:underline cursor-auto lg:cursor-pointer">
                      Login
                    </p>
                  </Link>
                </div>
              )}

              {logged  && (
                <div className="loggedDiv">
                  <Image
                    alt="cart"
                    width={65}
                    height={65}
                    src={"/cart.png"}
                    onClick={() => {
                      props.onShow();
                      dispatchStore(handleAnimation({ type: "a", id: 0 }));
                    }}
                    className={` ${
                      animationA.on && classes.cart
                    } lg:cursor-pointer lg:-mb-1`}
                  ></Image>
                  <p className={`cartCount ${animationA.on && classes.cart}`}>
                    {cart.length}
                  </p>
                </div>
              )}
            </div>

            <Nav className="headLg" />
          </div>
        </div>
        <Nav
          className={` ${classes.sidebar} relative z-10 ${
            !reducerState.sideState && classes.closed
          } sidebar `}
        />
      </div>
      {props.children}
    </>
  );
};
export default Header;
