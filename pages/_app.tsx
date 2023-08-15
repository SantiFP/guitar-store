import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "@/components/Header/Header";
import Cart from "@/components/Cart/Cart";
import { Provider } from "react-redux";
import { store } from "@/store";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [cartIsShown, setIsCartShown] = useState(true);

  const showCart = () => {
    setIsCartShown(true);
  };

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
