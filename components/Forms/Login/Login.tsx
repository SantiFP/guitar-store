import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { AppDispatch } from "@/store";
import { useEffect } from "react";
import loginHandler from "./LoginHandler";

const LoginForm = () => {
  const [nameInvalid, setNameInvalid] = useState<boolean>(false);
  const [passwordInvalid, setPasswordInvalid] = useState<boolean>(false);
  const [nameFromDb, setNameFromDb] = useState(true);
  const [passwordFromDb, setPasswordFromDb] = useState(true);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const warning = (message: string) => {
    return <p className="warning border-red-500 text-red-500">{message}</p>;
  };

  const handleSubmit = (e: React.FormEvent) => {
    loginHandler(
      e,
      nameRef,
      passwordRef,
      setNameInvalid,
      setPasswordInvalid,
      setLoading,
      setNameFromDb,
      setPasswordFromDb,
      dispatch,
      router
    );
  };

  useEffect(() => {
    if (nameRef.current) {
      nameRef.current.focus();
    }
  }, []);

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
        <form onSubmit={handleSubmit} className="formDiv">
          <input
            ref={nameRef}
            className={`input ${
              nameInvalid || !nameFromDb ? "border-red-500" : "border-inherit"
            }`}
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
            className={`input ${
              passwordInvalid || !passwordFromDb
                ? "border-red-500"
                : "border-inherit"
            }`}
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

          <div className="text-center pt-3 text-xl">
            <button className="formButton">INICIAR SESIÓN</button>
          </div>
        </form>
      )}
    </>
  );
};
export default LoginForm;
