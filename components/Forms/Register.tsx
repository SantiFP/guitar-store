import React, { useReducer, useState } from "react";
import PasswordLevels, { LevelPrompt } from "./PasswordLevels";
import Input from "./Input";
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

const initialFormState: Form = {
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

const RegisterForm = () => {
  const [formState, dispatch] = useReducer(reducer, initialFormState);
  const [completed, setCompleted] = useState(false);
  const [levels, setLevels] = useState(false);
  const [inputsObject, setInputsObject] = useState({
    input1Touched: false,
    input2Touched: false,
    input3Touched: false,
    input4Touched: false,
  });

  const { name, email, password, confirmPassword } = formState;
  const { input1Touched, input2Touched, input3Touched, input4Touched } = inputsObject;

  const registerHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (!completed) {
      return;
    }
    console.log("registro ok");
  };

  const emailIsOK = email.trim().includes(".") && email.trim().includes("@");
  const nameIsOK = name.trim().length >= 3;
  const passwordIsOK =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[/*.])[\w/*\.]{4,}$/.test(
      password.trim()
    );
  const midPassword =
    (/^(?=.*[a-z])(?=.*\d)[A-Za-z\d.]{4,}$/.test(password.trim()) &&
      !passwordIsOK) ||
    (password.length > 5 && !passwordIsOK);
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
      <PasswordLevels levels={levels} />

      {/* //////////////////////////// INPUT USERNAME ///////////////////////////////////////////// */}
      <Input
        dispatch={dispatch}
        setInputsObject={setInputsObject}
        touchedInput="input1Touched"
        type="name"
        inputType="text"
        placeholder="Nombre de usuario"
        setLevels={setLevels}
        className={input1Touched && !emailIsOK ? "input border-red-500" : "input"}
      />
      {input1Touched && !nameIsOK ? (
        <p className="warning text-red-500  border-red-500">
          El nombre debe tener al menos 3 caractéres
        </p>
      ) : (
        <p className="h-[5.4%]"></p>
      )}

      {/* /////////////////////////// INPUT EMAIL //////////////////////////////////////////////// */}
      <Input
        dispatch={dispatch}
        setInputsObject={setInputsObject}
        touchedInput="input2Touched"
        type="email"
        inputType="email"
        placeholder="Email"
        setLevels={setLevels}
        className={input2Touched && !emailIsOK ? "input border-red-500" : "input"}
      />

      {input2Touched && !emailIsOK ? (
        <p className="warning text-red-500  border-red-500">
          El email debe contener un punto y un arroba
        </p>
      ) : (
        <p className="h-[5.4%]"></p>
      )}

      {/* //////////////////////////////// INPUT PASSWORD ////////////////////////////////////////////// */}

      <Input
        dispatch={dispatch}
        setInputsObject={setInputsObject}
        touchedInput="input3Touched"
        type="password"
        inputType="password"
        placeholder="Contraseña"
        setLevels={setLevels}
        className={
          input3Touched
            ? `input ${!passwordIsOK && !midPassword && "border-red-500"} ${
                midPassword
                  ? "border-yellow-400"
                  : passwordIsOK && "border-green-600"
              }`
            : "input"
        }
      />

      {input3Touched ? (
        <LevelPrompt midPassword={midPassword} passwordIsOK={passwordIsOK} />
      ) : (
        <p className="h-[5.4%]"></p>
      )}

      {/* /////////////////////////////  INPUT CONFIRMAR CONTRASEÑA /////////////////////////////////////// */}

      <Input
        dispatch={dispatch}
        setInputsObject={setInputsObject}
        touchedInput={"input4Touched"}
        type="confirmPassword"
        inputType="password"
        placeholder="Confirmar contraseña"
        setLevels={setLevels}
        className={
          input4Touched && !confirmPasswordIsOk ? "input border-red-500" : "input"
        }
      />

      {input4Touched && !confirmPasswordIsOk ? (
        <p className="warning border-red-500 text-red-500">
          Las contraseñas no coinciden
        </p>
      ) : (
        <p className="h-[5.4%]"></p>
      )}

      <div className="text-center pt-4 text-xl">
        <button
          className={
            !completed
              ? "formButton opacity-60 cursor-not-allowed "
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
