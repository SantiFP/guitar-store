import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "@/components/Header/Header";
import Cart from "@/components/Cart/Cart";
import { Provider } from "react-redux";
import { store } from "@/store";
import { useEffect, useState } from "react";
import { loginActions } from "@/store/login";
import { getCart } from "@/store/getCart";

let isInitial = true;

export default function App({ Component, pageProps }: AppProps) {
  const [cartIsShown, setIsCartShown] = useState(false);

  const showCart = () => {
    setIsCartShown(true);
  };

  useEffect(() => {
    if (isInitial) {
      const isLogged = localStorage.getItem("logged");
      const userName = localStorage.getItem("name");
      if (isLogged === "true" && userName) {
        store.dispatch(loginActions.logIn({ name: userName }));
        store.dispatch(getCart(userName));
      }
    }
    isInitial = false;
  }, []);

  const hideCart = () => {
    setIsCartShown(false);
  };
  return (
    <Provider store={store}>
      {cartIsShown && <Cart onClose={hideCart} />}
      <Header onShow={showCart}>
        <Component {...pageProps} />
      </Header>
    </Provider>
  );
}
