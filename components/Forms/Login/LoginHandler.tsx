import { NextRouter } from "next/router";
import { RefObject } from "react";
import { loginActions } from "@/store/login";
import { getCart } from "@/store/getCart";
import { AppDispatch } from "@/store";

const loginHandler = async (
  e: React.FormEvent,
  nameRef: RefObject<HTMLInputElement>,
  passwordRef: RefObject<HTMLInputElement>,
  setNameInvalid: React.Dispatch<React.SetStateAction<boolean>>,
  setPasswordInvalid: React.Dispatch<React.SetStateAction<boolean>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setNameFromDb: React.Dispatch<React.SetStateAction<boolean>>,
  setPasswordFromDb: React.Dispatch<React.SetStateAction<boolean>>,
  dispatch:AppDispatch,
  router:NextRouter
) => {
  e.preventDefault();
  const name = nameRef.current?.value.trim().toLowerCase();
  const password = passwordRef.current?.value.trim();
  const nameLength = name && name.trim().length > 2;
  const passwordLength =
    password &&
    (/^(?=.*[a-z])(?=.*\d)[A-Za-z\d.]{4,}$/.test(password.trim()) ||
      password.trim().length > 5);

  if (!nameLength) {
    setNameInvalid(true);
    return;
  }

  if (!passwordLength) {
    setPasswordInvalid(true);
    setNameInvalid(false);
    return;
  }

  setPasswordInvalid(false);

  try {
    const req = await fetch(
      "https://guitar-store-fa2db-default-rtdb.firebaseio.com/users.json"
    );
    const res = await req.json();
    let existingName = false;
    let existingPassword = false;
    for (const key in res) {
      const user = res[key];
      if (user.userName === name && user.password === password) {
        dispatch(loginActions.logIn({ name }));
        dispatch(getCart(name));
        setLoading(true);
        localStorage.setItem("logged", "true");
        localStorage.setItem("name", name);
        const now = new Date();
        now.setMinutes(now.getMinutes() + 10);
        localStorage.setItem("expiration", now.toISOString());
        router.replace("/");
      } else if (user.userName === name) {
        existingName = true;
        setNameInvalid(false);
      } else if (user.password === password && user.name === name) {
        existingPassword = true;
      }
    }
    !existingName ? setNameFromDb(false) : setNameFromDb(true);
    !existingPassword ? setPasswordFromDb(false) : setPasswordFromDb(true);
  } catch (err) {
    console.log(err);
  }
};

export default loginHandler;
