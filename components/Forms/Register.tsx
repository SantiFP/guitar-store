import React, { useReducer,  useState } from "react";
import PasswordLevels from "./PasswordLevels";
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
    input1Touch: false,
    input2Touch: false,
    input3Touch: false,
    input4Touch: false,
  });

  const { name, email, password, confirmPassword } = formState;
  const { input1Touch, input2Touch, input3Touch, input4Touch } = inputsObject;

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
      <input
        onBlur={(e) => {
          dispatch({ type: "name", payload: e.target?.value });
          setInputsObject({ ...inputsObject, input1Touch: true });
        }}
        onChange={(e) => {
          dispatch({ type: "name", payload: e.target?.value });
        }}
        className={input1Touch && !nameIsOK ? "badInput" : "input"}
        type="text"
        placeholder="Nombre de usuario"
      />
      {input1Touch && !nameIsOK ? (
        <p className="warning text-red-500  border-red-500">
          El nombre debe tener al menos 3 caractéres
        </p>
      ) : (
        <p className="h-[5.4%]"></p>
      )}

      {/* /////////////////////////// INPUT EMAIL //////////////////////////////////////////////// */}
      <input
        onBlur={(e) => {
          dispatch({ type: "email", payload: e.target?.value });
          setInputsObject({ ...inputsObject, input2Touch: true });
        }}
        onChange={(e) => {
          dispatch({ type: "email", payload: e.target?.value });
        }}
        className={input2Touch && !emailIsOK ? "badInput" : "input"}
        type="email"
        placeholder="Email"
      />
      {input2Touch && !emailIsOK ? (
        <p className="warning text-red-500  border-red-500">
          El email debe contener un punto y un arroba
        </p>
      ) : (
        <p className="h-[5.4%]"></p>
      )}

      {/* //////////////////////////////// INPUT PASSWORD ////////////////////////////////////////////// */}
      <input
        onBlur={(e) => {
          dispatch({ type: "password", payload: e.target?.value });
          setInputsObject({ ...inputsObject, input3Touch: true });
          setLevels(false);
        }}
        onChange={(e) => {
          dispatch({ type: "password", payload: e.target?.value });
          setInputsObject({ ...inputsObject, input3Touch: true });
          setLevels(true);
        }}
        className={
          input3Touch
            ? `input ${!passwordIsOK && !midPassword && "border-red-500"} ${
                midPassword
                  ? "border-yellow-400"
                  : passwordIsOK && "border-green-600"
              }`
            : "input"
        }
        type="password"
        placeholder="Contraseña"
      />
      {input3Touch ? (
        <div
          className={`warning ${
            !passwordIsOK && !midPassword && "border-red-500"
          } ${
            midPassword
              ? "border-yellow-400"
              : passwordIsOK && "border-green-600"
          } `}
        >
          <div
            className={`flex flex-row space-x-2 ${
              !passwordIsOK && !midPassword && "text-red-500"
            } ${
              midPassword ? "text-yellow-400" : passwordIsOK && "text-green-600"
            }`}
          >
            <p>Seguridad</p>
            <span
              className={`w-2 h-2 rounded-full mt-1 ${
                !passwordIsOK && !midPassword && "bg-red-500"
              } ${
                midPassword ? "bg-yellow-400" : passwordIsOK && " bg-green-600"
              }  `}
            ></span>
            <p> {midPassword ? "media" : passwordIsOK ? "alta" : "baja"}</p>
          </div>
        </div>
      ) : (
        <p className="h-[5.4%]"></p>
      )}

      {/* /////////////////////////////  INPUT CONFIRMAR CONTRASEÑA /////////////////////////////////////// */}
      <input
        onBlur={(e) => {
          dispatch({ type: "confirmPassword", payload: e.target?.value });
          setInputsObject({ ...inputsObject, input4Touch: true });
        }}
        onChange={(e) => {
          dispatch({ type: "confirmPassword", payload: e.target?.value });
        }}
        className={input4Touch && !confirmPasswordIsOk ? "badInput" : "input"}
        type="password"
        placeholder="Repetir contraseña"
      />
      {input4Touch && !confirmPasswordIsOk ? (
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
