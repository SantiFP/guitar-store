import React, { useReducer, useState } from "react";
import PasswordLevels, { LevelPrompt } from "../Warnings/PasswordLevels";
import Input from "../Input/Input";
import Warning from "../Warnings/Warning";
import Checks from "./Checks";
import { Form, ActionType } from "@/Types/types";
import { useRouter } from "next/router";
import registerHandler from "./RegisterHandler";

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
  const router = useRouter();

  const [formState, dispatch] = useReducer(reducer, initialFormState);
  const [levels, setLevels] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputsObject, setInputsObject] = useState({
    input1Touched: false,
    input2Touched: false,
    input3Touched: false,
    input4Touched: false,
  });
  const [userNameExists, setUserNameExists] = useState(false);

  const { name, email, password, confirmPassword } = formState;
  const { input1Touched, input2Touched, input3Touched, input4Touched } =
    inputsObject;

  const {
    nameIsOK,
    emailIsOK,
    passwordIsOK,
    midPassword,
    confirmPasswordIsOk,
    completed,
  } = Checks(name, email, password, confirmPassword);

  const handleSubmit = (e: React.FormEvent) => {
    registerHandler(
      e,
      completed,
      setUserNameExists,
      setLoading,
      name,
      password,
      router
    );
  };

  return (
    <>
      {loading && (
        <div className="flex flex-row space-x-2 items-center justify-center text-xl h-[70vh]">
          <div className="bg-white rounded-full h-8 w-8">
            <img className=" animate-spin " src="/loading.png" alt="loading" />
          </div>
          <p>Redireccionando al login ...</p>
        </div>
      )}
      {!loading && (
        <form onSubmit={handleSubmit} className="formDiv">
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
            className={
              input1Touched && (!nameIsOK || userNameExists)
                ? "input border-red-500"
                : "input"
            }
          />
          <Warning isTouched={input1Touched} isOk={nameIsOK && !userNameExists}>
            {userNameExists
              ? "El usuario ya existe"
              : "El nombre de usuario debe tener al menos 3 caracteres"}
          </Warning>

          {/* /////////////////////////// INPUT EMAIL //////////////////////////////////////////////// */}
          <Input
            dispatch={dispatch}
            setInputsObject={setInputsObject}
            touchedInput="input2Touched"
            type="email"
            inputType="email"
            placeholder="Email"
            setLevels={setLevels}
            className={
              input2Touched && !emailIsOK ? "input border-red-500" : "input"
            }
          />

          <Warning isTouched={input2Touched} isOk={emailIsOK}>
            El email debe contener un punto y un arroba
          </Warning>

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
            <LevelPrompt
              midPassword={midPassword}
              passwordIsOK={passwordIsOK}
            />
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
              input4Touched && !confirmPasswordIsOk
                ? "input border-red-500"
                : "input"
            }
          />

          <Warning isTouched={input4Touched} isOk={confirmPasswordIsOk}>
            Las contraseñas no coinciden
          </Warning>

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
      )}
    </>
  );
};
export default RegisterForm;
