import { useRef, useState } from "react";
import { loginActions } from "@/store/login";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

const LoginForm = () => {
  const [nameInvalid, setNameInvalid] = useState<boolean>(false);
  const [passwordInvalid, setPasswordInvalid] = useState<boolean>(false);
  const [nameFromDb, setNameFromDb] = useState(true);
  const [passwordFromDb, setPasswordFromDb] = useState(true);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = nameRef.current?.value;
    const password = passwordRef.current?.value;
    const nameLength = name && name.trim().length > 2;
    const passwordLength =
      password &&
      (/^(?=.*[a-z])(?=.*\d)[A-Za-z\d.]{4,}$/.test(password.trim()) ||
        password.trim().length > 5);

    if (!nameLength || !passwordLength) {
      !nameLength && setNameInvalid(true);
      !passwordLength && setPasswordInvalid(true);
      return;
    }

    setNameInvalid(false);
    setPasswordInvalid(false);

    try {
      const req = await fetch(
        "https://guitar-store-fa2db-default-rtdb.firebaseio.com/users.json"
      );
      const res = await req.json();
      for (const key in res) {
        const user = res[key];
        if (user.userName === name && user.password === password) {
          dispatch(loginActions.logIn({ name }));
          setLoading(true);
          router.replace("/");
          break;
        } else if (user.userName !== name) {
          setNameFromDb(false);
          setPasswordFromDb(true);
          break;
        } else if (user.password !== password) {
          setPasswordFromDb(false);
          setNameFromDb(true);
          break;
        }
      }
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
