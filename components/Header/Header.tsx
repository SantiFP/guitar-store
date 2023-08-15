import Image from "next/image";
import classes from "./Header.module.css";
import { ReactNode, useEffect, useReducer, useState } from "react";
import Modal, { Backdrop } from "../Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { handleAnimation } from "@/store/handleAnimation";
import { ActionType, StateType } from "@/Types/types";
import { loginActions } from "@/store/login";
import { getCart } from "@/store/getCart";
import { getSessionDuration } from "@/utils/sessionDuration";
import Link from "next/link";
import Nav from "./Nav";
import { cartActions } from "@/store/cart";
import ExpiredSession from "./SessionModal";

let initial = true;

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
  const loginState = useSelector((state: RootState) => state.login);
  const [isLogged, setIsLogged] = useState("start");
  const [expiredSession, setExpiredSession] = useState(false);
  const { name, logged } = loginState;

  const closeBackdrop = () => {
    dispatch({ type: "sideState" });
  };

  const loginOut = () => {
    dispatchStore(loginActions.logOut());
    dispatchStore(cartActions.resetCart());
    localStorage.removeItem("logged");
    localStorage.removeItem("name");
    localStorage.removeItem("expiration");
  };

  useEffect(() => {
    const isLogged = localStorage.getItem("logged");
    const userName = localStorage.getItem("name");
    const remaining = getSessionDuration();

    setIsLogged(isLogged || "");

    if (remaining) {
      if (remaining < 0) {
        loginOut();
        return;
      }
    }

    let leaving: any;

    if (isLogged === "true" && userName) {
      dispatchStore(loginActions.logIn({ name: userName }));
      dispatchStore(getCart(userName));
      leaving = setTimeout(() => {
        loginOut();
        setExpiredSession(true);
      }, remaining);
    }

    return () => {
      clearInterval(leaving);
    };
  }, [logged]);

  useEffect(() => {
    if (initial) {
      dispatchStore(handleAnimation({ type: "a", id: 0 }));
      initial = false;
    }
  }, [logged]);

  return (
    <>
      {reducerState.sideState && <Backdrop onClose={closeBackdrop} />}
      {expiredSession && (
        <ExpiredSession onClose={() => setExpiredSession(false)}>
          <div className="text-center">
            <p className="pb-8">Su sesión expiró</p>
            <Link href="/login">
              <button
                onClick={() => setExpiredSession(false)}
                className="cursor-auto bg-zinc-900 text-white px-5 py-2 lg:cursor-pointer"
              >
                LOGIN
              </button>
            </Link>
          </div>
        </ExpiredSession>
      )}

      <div className={logged ? "pb-6" : "-mb-1 lg:pb-8 lg:m-0"}>
        {logged && (
          <p className="hidden lg:block -mb-[4.7rem] pt-10 text-xl pl-4">
            <span className="bg-white text-black ml-6 px-2 py-1">
              Hola {name}!!
            </span>
          </p>
        )}

        <div>
          <div>
            <Image
              onClick={() => dispatch({ type: "sideState" })}
              className='z-20 fixed bg-zinc-900 rounded-full px-2 py-2 mt-1 ml-1 lg:hidden'
              width={60}
              height={60}
              src={!reducerState.sideState ? "/list.png" : "/exit.png"}
              alt="menu"
            />
          </div>

          <div className="lg:flex lg:flex-row-reverse lg:w-full lg:pr-8">
            <div className="login-cart ">
              {logged && (
                <p
                  onClick={() => {
                    loginOut();
                  }}
                  className="isLogged"
                >
                  Logout
                </p>
              )}
              {!logged && !isLogged ? (
                <div className="logAndReg">
                  <Link href="/register">
                    <p className="hover:underline cursor-auto lg:cursor-pointer">
                      Registro
                    </p>
                  </Link>
                  <Link onClick={() => (initial = true)} href="/login">
                    <p className="hover:underline cursor-auto lg:cursor-pointer">
                      Login
                    </p>
                  </Link>
                </div>
              ) : (
                <div className="h-[5rem] -mb-7"></div>
              )}

              {logged && (
                <div className="loggedDiv ">
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
            {logged && (
              <p className="text-xl text-right -mt-12 pr-2 lg:hidden">
                <span className="bg-white text-black px-2 py-1">
                  Hola {name}!!
                </span>
              </p>
            )}

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
