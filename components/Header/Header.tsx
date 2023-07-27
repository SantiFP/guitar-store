import Image from "next/image";
import classes from "./Header.module.css";
import { ReactNode, useEffect, useReducer } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Backdrop } from "../Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { handleAnimation } from "@/store/handleAnimation";

type ActionType = {
  type: string;
  payload?: any;
};

type StateType = {
  sideState: boolean;
};

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
  const {animationA} = useSelector((state:RootState) => state.animation);

  const { pathname } = useRouter();

  const closeBackdrop = () => {
    dispatch({ type: "sideState" });
  };

  useEffect(() => {
    if (cart.length === 0) {
      return;
    }
    dispatchStore(handleAnimation({type:'a',id:0}));
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
                    dispatchStore(handleAnimation({type:'a',id:0}))
                  }}
                  className={` ${
                    animationA.on && classes.cart
                  } lg:cursor-pointer lg:-mb-1`}
                ></Image>
                <p
                  className={`cartCount ${
                    animationA.on && classes.cart
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
            className={`${classes.link} cursor-auto  ${
              pathname === "/" && `${classes.active} underline`
            } lg:cursor-pointer`}
            href="/"
          >
            Home
          </Link>
          <Link
            className={`${classes.link}  cursor-auto  ${
              pathname === "/acoustics" && `${classes.active} underline`
            } lg:cursor-pointer`}
            href="/acoustics"
          >
            Guitarras acústicas
          </Link>
          <Link
            className={`${classes.link} cursor-auto  ${
              pathname === "/electrics" && `${classes.active} underline `
            } lg:cursor-pointer`}
            href="/electrics"
          >
            Guitarras eléctricas
          </Link>

          <Link
            className={`${classes.link} cursor-auto ${
              pathname === "/gadgets" && `${classes.active} underline`
            } lg:cursor-pointer`}
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
