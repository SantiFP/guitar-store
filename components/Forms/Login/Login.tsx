import { useRef, useState } from "react";

const LoginForm = () => {
  const [nameInvalid, setNameInvalid] = useState<boolean>(false);
  const [passwordInvalid, setPasswordInvalid] = useState<boolean>(false);

  const login = (e: React.FormEvent) => {
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
    console.log("paso");
  };

  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const warning = (message: string) => {
    return <p className="warning border-red-500 text-red-500">{message}</p>;
  };

  return (
    <form onSubmit={login} className="formDiv">
      <input
        ref={nameRef}
        className="input"
        type="text"
        placeholder="Nombre de usuario"
      />

      {nameInvalid ? (
        warning("Nombre de usuario inválido")
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
        warning("Contraseña inválida")
      ) : (
        <p className="h-[5.4%]"></p>
      )}

      <div className="text-center pt-6 text-xl">
        <button className="formButton">INICIAR SESIÓN</button>
      </div>
    </form>
  );
};
export default LoginForm;
