import { CSSTransition } from "react-transition-group";
import classes from "./Register.module.css";
import { useRef } from "react";

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
      </div>
    </CSSTransition>
  );
};
export default PasswordLevels;
