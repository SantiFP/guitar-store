import React, { useReducer, useState } from "react";

interface Form {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface ActionType {
  type: string;
  payload?: any;
}

const initial: Form = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const reducer = (state: Form, action: ActionType) => {
  switch (action.type) {
    case "name":
      return { ...state, name: action.payload };
    case "email":
      return { ...state, email: action.payload };
    case "password":
      return { ...state, password: action.payload };
    case "confirmPassword":
      return { ...state, confirmPassword: action.payload };
    default:
      return state;
  }
};

let isInitial = {
  input1Touch: false,
  input2Touch: false,
  input3Touch: false,
  input4Touch: false,
};

const RegisterForm = () => {
  const [formState, dispatch] = useReducer(reducer, initial);
  const [completed, setCompleted] = useState(false);
  const { name, email, password, confirmPassword } = formState;
  const {input1Touch,input2Touch,input3Touch,input4Touch} = isInitial

  const registerHandler = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("registro ok");
  };

  const emailIsOK = email.trim().includes(".") && email.trim().includes("@");
  const nameIsOK = name.trim().length >= 3;
  const passwordIsOK =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\.)[A-Za-z\d.]{4,}$/.test(
      password.trim()
    );
  const confirmPasswordIsOk = password.trim() === confirmPassword.trim();

  if (
    nameIsOK &&
    emailIsOK &&
    passwordIsOK &&
    confirmPasswordIsOk &&
    !completed
  ) {
    setCompleted(true);
  }

  if (
    (!nameIsOK || !emailIsOK || !passwordIsOK || !confirmPasswordIsOk) &&
    completed
  ) {
    setCompleted(false);
  }

  return (
    <form onSubmit={registerHandler} className="formDiv">
      <input
        onBlur={(e) => {
          dispatch({ type: "name", payload: e.target?.value });
          isInitial.input1Touch = true;
        }}
        onChange={(e) => {
          dispatch({ type: "name", payload: e.target?.value });
        }}
        className={input1Touch && !nameIsOK ? 'badInput' : 'input'}
        type="text"
        placeholder="Nombre de usuario"
        required
      />
      {input1Touch && !nameIsOK ? (
        <p className="text-red-500 text-xs px-3 py-1 w-3/4 mx-auto bg-white lg:w-[35%]">
          El nombre debe tener al menos 3 caractéres
        </p>
      ) : (
        <p className="h-[4.7%]"></p>
      )}
      <input
        onBlur={(e) => {
          dispatch({ type: "email", payload: e.target?.value });
          isInitial.input2Touch = true;
        }}
        onChange={(e) => {
          dispatch({ type: "email", payload: e.target?.value });
        }}
        className={input2Touch && !emailIsOK ? 'badInput' : 'input'}
        type="email"
        placeholder="Email"
        required
      />
      {input2Touch && !emailIsOK ? (
        <p className="text-red-500 text-xs px-3 py-1 w-3/4 mx-auto bg-white lg:w-[35%]">
          El email debe contener un punto y un arroba
        </p>
      ) : (
        <p className="h-[4.7%]"></p>
      )}
      <input
        onBlur={(e) => {
          dispatch({ type: "password", payload: e.target?.value });
          isInitial.input3Touch = true;
        }}
        onChange={(e) => {
          dispatch({ type: "password", payload: e.target?.value });
        }}
        className={input3Touch && !passwordIsOK ? 'badInput' : 'input'}
        type="password"
        placeholder="Contraseña"
        required
      />
      {input3Touch && !passwordIsOK ? (
        <p className="text-red-500 text-xs px-3 py-1 w-3/4 mx-auto bg-white lg:w-[35%]">
          La contraseña debe contener al menos 4 caractéres,una mayúscula,una
          minúscula,un punto y un número
        </p>
      ) : (
        <p className="h-[4.7%]"></p>
      )}

      <input
        onBlur={(e) => {
          dispatch({ type: "confirmPassword", payload: e.target?.value });
          isInitial.input4Touch = true;
        }}
        onChange={(e) => {
          dispatch({ type: "confirmPassword", payload: e.target?.value });
        }}
        className={input4Touch && !confirmPasswordIsOk ? 'badInput' : 'input'}
        type="password"
        placeholder="Repetir contraseña"
        required
      />
      {input4Touch && !confirmPasswordIsOk ? (
        <p className="text-red-500 text-xs px-3 py-1 w-3/4 mx-auto bg-white lg:w-[35%]">
          Las contraseñas no coinciden
        </p>
      ) : (
        <p className="h-[4.7%]"></p>
      )}

      <div className="text-center pt-4 text-xl">
        <button
          disabled={!completed}
          className={
            !completed
              ? "formButton opacity-60 cursor-not-allowed"
              : "formButton"
          }
        >
          REGISTRARSE
        </button>
      </div>
    </form>
  );
};
export default RegisterForm;
