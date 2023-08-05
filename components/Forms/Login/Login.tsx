import { useRef, useState } from "react";
import { loginActions } from "@/store/login";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { getCart } from "@/store/getCart";
import { AppDispatch } from "@/store";

const LoginForm = () => {
  const [nameInvalid, setNameInvalid] = useState<boolean>(false);
  const [passwordInvalid, setPasswordInvalid] = useState<boolean>(false);
  const [nameFromDb, setNameFromDb] = useState(true);
  const [passwordFromDb, setPasswordFromDb] = useState(true);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = nameRef.current?.value.trim();
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
        console.log("cava");
        console.log(user);
        if (user.userName === name && user.password === password) {
          console.log("csa");
          dispatch(loginActions.logIn({ name }));
          dispatch(getCart(name));
          setLoading(true);
          localStorage.setItem("logged", "true");
          localStorage.setItem("name", name);
          router.replace("/");
        } else if (user.userName === name) {
          existingName = true;
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

  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const warning = (message: string) => {
    return <p className="warning border-red-500 text-red-500">{message}</p>;
  };

  return (
    <>
      {loading && (
        <div className="flex flex-row space-x-2 items-center justify-center text-xl h-[70vh]">
          <div className="bg-white rounded-full h-8 w-8">
            <img className=" animate-spin " src="/loading.png" alt="loading" />
          </div>
          <p>Redireccionando al inicio ...</p>
        </div>
      )}
      {!loading && (
        <form onSubmit={login} className="formDiv">
          <input
            ref={nameRef}
            className="input"
            type="text"
            placeholder="Nombre de usuario"
          />

          {nameInvalid ? (
            warning("Nombre de usuario inválido")
          ) : !nameFromDb ? (
            warning("El usuario no existe")
          ) : (
            <p className="h-[5.4%]"></p>
          )}

          <input
            ref={passwordRef}
            className="input"
            type="password"
            placeholder="Contraseña"
          />
          {passwordInvalid ? (
            warning("Contraseña invalida")
          ) : !passwordFromDb ? (
            warning("Contraseña incorrecta")
          ) : (
            <p className="h-[5.4%]"></p>
          )}

          <div className="text-center pt-6 text-xl">
            <button className="formButton">INICIAR SESIÓN</button>
          </div>
        </form>
      )}
    </>
  );
};
export default LoginForm;
