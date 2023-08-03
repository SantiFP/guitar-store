import { CSSTransition } from "react-transition-group";
import { useRef } from "react";
import classes from "./Password.module.css";

const PasswordLevels = (props: { levels: boolean }) => {
  const nodeRef = useRef<HTMLDivElement>(null);

  return (
    <CSSTransition
      timeout={500}
      classNames={{
        enterActive: classes.enterActive,
        exitActive: classes.exitActive,
      }}
      nodeRef={nodeRef}
      mountOnEnter
      unmountOnExit
      in={props.levels}
    >
      <div ref={nodeRef} className="levelsDiv">
        <div className="flex flex-row space-x-2 text-green-500">
          <div className="pl-2">
            <p className="ball bg-green-500 "></p>
          </div>
          <p>
            alta: La contraseña incluye mayúsculas,minúsculas, números y
            caracteres especiales como el punto
          </p>
        </div>
        <div className="flex flex-row space-x-2 text-yellow-400 ">
          <div className="pl-2">
            <p className="ball bg-yellow-400 "></p>
          </div>
          <p>
            media: La contraseña tiene al menos 4 caracteres y contiene números,
            o al menos 6 caracteres de cualquier tipo
          </p>
        </div>

        <div className="flex flex-row space-x-2 text-red-500 ">
          <div className="pl-2">
            <p className="ball bg-red-500 "></p>
          </div>
          <p>
            baja: La contraseña solo contiene letras minúsculas y menos de 6
            caracteres
          </p>
        </div>

        <p className="text-black text-center pb-2">La contraseña debe tener al menos seguridad media para avanzar</p>
      </div>
    </CSSTransition>
  );
};

export const LevelPrompt = (props:{
  passwordIsOK : boolean,
  midPassword: boolean,
}) => {
  const {passwordIsOK,midPassword} = props
  return (
    <div
      className={`warning ${
        !passwordIsOK && !midPassword && "border-red-500"
      } ${
        midPassword ? "border-yellow-400" : passwordIsOK && "border-green-600"
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
  );
};

export default PasswordLevels;
